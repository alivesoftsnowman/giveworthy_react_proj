import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { createSelector } from 'reselect';
import getCurrentUser from '@selectors/getCurrentUser';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {getCausesByOwnerID, deleteCauses, getCauseByID} from '@api';
import moment from 'moment';
import { Button } from '@material-ui/core';
import {saveCause, addCause} from '@actions/cause';
import CauseModel from '@models/Cause';
import CircularProgress from '@material-ui/core/CircularProgress';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'id', numeric: false, disablePadding: true, label: 'Cause ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Created at' }
];
class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
      const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
  
      return (
          <TableHead>
              <TableRow>
                  <TableCell padding="checkbox">
                      <Checkbox
                          indeterminate={numSelected > 0 && numSelected < rowCount}
                          checked={numSelected>0 && numSelected === rowCount}
                          onChange={onSelectAllClick}
                      />
                  </TableCell>
                  {rows.map(row => {
                      return (
                          <TableCell
                          key={row.id}
                          numeric={row.numeric}
                          padding={row.disablePadding ? 'none' : 'default'}
                          sortDirection={orderBy === row.id ? order : false}
                          >
                          <Tooltip
                              title="Sort"
                              placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                              enterDelay={300}
                          >
                              <TableSortLabel
                                  active={orderBy === row.id}
                                  direction={order}
                                  onClick={this.createSortHandler(row.id)}
                              >
                              {row.label}
                              </TableSortLabel>
                          </Tooltip>
                          </TableCell>
                      );
                  }, this)}
              </TableRow>
          </TableHead>
      );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 80%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, onDeleteItem, onEditItem, onAddCause } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Causes
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected ==0 && (
          <Tooltip title="Add a cause">
            <Button variant="contained" onClick={event=>onAddCause(event)}>Add a Cause</Button>
          </Tooltip>
        )}  
      </div>
      <div className={classes.actions}>
        {numSelected ==1 && (
          <Tooltip title="Edit a cause">
            <IconButton aria-label="Edit" onClick={event=>onEditItem(event)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}  
      </div>
      <div className={classes.actions}>
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={event=>onDeleteItem(event)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
  },
  table: {
      minWidth: 400,
  },
  tableWrapper: {
      overflowX: 'auto',
  },
});
export class CausesMng extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      order: 'desc',
      orderBy: 'created_at',
      selected: [],
      causes: [],
      page: 0,
      rowsPerPage: 5,
      isLoadingItems:false
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
};

handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.causes.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
};

handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
};

handleChangePage = (event, page) => {
    this.setState({ page });
};

handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
};
handleDeleteCauses = event=>{
    const self = this;
    deleteCauses({causeIds:this.state.selected}).then((res)=>{
        if (res.msg=="success"){
            self.updateCauses();
        }
    });
}
handleEditCause = event=>{
  const self = this;
  const {addCause} = this.props;
  getCauseByID({id:this.state.selected[0]}).then((res)=>{
    if (res.msg=="success"&& res.cause){
      addCause(CauseModel.fromJS(res.cause));
      self.props.history.push('/editcause'); 
    }
  });
}
handleAddCause = event=>{
  const {user, saveCause} = this.props;
  saveCause({
    ownerId:user.id
  });
  this.props.history.push('/charity-questionnarie-step-1'); 
}
updateCauses(){
    const self = this;
    const {user} = this.props;
    this.setState({isLoadingItems:true});
    getCausesByOwnerID({ownerId:user.id}).then((res)=>{
        if (res.msg == 'success'){
            self.setState({causes:res.causes, selected:[]});
            self.forceUpdate();
        }
        self.setState({isLoadingItems:false});
    });
}
isSelected = id => this.state.selected.indexOf(id) !== -1;
componentWillMount(){
    this.updateCauses();
}
render() {
    const { classes } = this.props;
    const { causes, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, causes.length - page * rowsPerPage);
    return (
        <div className="root main-container">
            <Paper className={classes.root}>
                <EnhancedTableToolbar 
                  numSelected={selected.length} 
                  onDeleteItem={this.handleDeleteCauses}
                  onEditItem={this.handleEditCause}
                  onAddCause={this.handleAddCause} />
                <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={causes.length}
                    />
                    <TableBody>
                    {!this.state.isLoadingItems&& stableSort(causes, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(n => {
                        const isSelected = this.isSelected(n.id);
                        return (
                            <TableRow
                                hover
                                onClick={event => this.handleClick(event, n.id)}
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={n.id}
                                selected={isSelected}
                                >
                                <TableCell padding="checkbox">
                                    <Checkbox checked={isSelected} />
                                </TableCell>
                                <TableCell component="th" scope="row" padding="none">
                                    {n.id}
                                </TableCell>
                                <TableCell >{n.name}</TableCell>
                                <TableCell >{n.status}</TableCell>
                                <TableCell >{moment(n.created_at).format("YYYY/MM/DD HH:mm:ss")}</TableCell>
                            </TableRow>
                          );
                        })}
                    {emptyRows > 0 && !this.state.isLoadingItems&& (
                        <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={4} />
                        </TableRow>
                    )}
                    {this.state.isLoadingItems&&(
                      <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={5} style={{textAlign:'center'}}>
                          <CircularProgress/>
                        </TableCell>  
                      </TableRow>
                    )}
                    </TableBody>
                </Table>
                </div>
                <TablePagination
                    component="div"
                    count={causes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
  }
}
const mapStateToProps =createSelector(
  getCurrentUser,
  (user) => ({
    user
  })
);

export default hot(module)(connect(mapStateToProps,{
  saveCause,
  addCause
})(withStyles(styles)(CausesMng)));