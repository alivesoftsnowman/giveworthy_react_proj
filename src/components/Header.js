import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import logo from '@assets/images/giveworthy-logo.png';
import avatar from '@assets/images/if_male_628288.svg';
import getCurrentUser from '@selectors/getCurrentUser';
import { hot } from 'react-hot-loader';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import IconButton from '@material-ui/core/IconButton';
import UserAvatar from 'react-user-avatar';
import { logOut } from '@actions/users';

import { delCause } from '@actions/cause';
import { dismissStatus } from '@actions/status';
import { dismissError } from '@actions/errors';
import { withRouter } from 'react-router';

import jss from 'jss';
import preset from 'jss-preset-default';

const styles = {
  button: {
    paddingLeft: 5,
    paddingRight: 5,
    textTransform: "capitalize",
    fontSize: 18,
    color: "#757575",
    fontWeight: "400",
    paddingBottom: 10
  },
  username: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "400",
    marginLeft: 10,
    marginRight: 10,
    lineHeight: "2.5em"
  },
  anchor: {
    marginLeft: 20,
    marginRight: 20
  },
  active: {
    border: "1px solid",
    borderRadius: "10px",

  },
  head_style: {
    paddingBottom: 10
  }
}


// jss.setup(preset());
// const my_old_styles = {
//   button: {
//     background: 'red',
//     color: 'white',
//     fontSize: 12
//   },
//   ctaButton: {
//     composes: '$button',
//     background: 'blue',
//     fontWeight: 'bold'
//   }
// };


// const { myclasses } = jss.createStyleSheet(my_old_styles).attach();


export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.checkPath = this.checkPath.bind(this);
    this.changePath = this.changePath.bind(this);
  }

  handleMenu = event => {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };
  handleLogOut() {
    this.setState({ anchorEl: null });
    const { logOut, delCause, dismissError, dismissStatus } = this.props;
    logOut();
    delCause();
    dismissStatus();
    dismissError();
    this.changePath();
  }
  checkPath(path) {
    const { history } = this.props
    return history.location.pathname.indexOf(path) > -1 ? true : false;
  }
  changePath() {
    this.forceUpdate();
  }
  componentDidMount() {
    const self = this;
    this.unlisten = this.props.history.listen(location => {
      self.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    const { currentUser } = this.props;
    const { anchorEl } = this.state;
    var username = currentUser ? currentUser.fullName || "A" : "A";
    const open = Boolean(anchorEl);
    const auth = currentUser && currentUser.id;
    const type = currentUser.type;

    return (
      <div className='root'>
        <AppBar position="fixed" color="default"
          style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Toolbar className="main-container" >
            <Typography variant="title" color="primary" className="flex" >
              <Link to="/" className="link-button">
                <img src={logo} />
              </Link>
            </Typography>
            <div>
              {auth && (
                <Link to="/dashboard" className="link-button" >
                  <Button style={styles.button} onClick={this.changePath} style={this.checkPath("dashboard") ? { ...styles.active, ...styles.anchor } : styles.anchor}>Dashboard </Button>
                </Link>)}
              {auth && type == 'charity' && (
                <Link to="/causes" className="link-button" >
                  <Button style={styles.button} onClick={this.changePath} style={this.checkPath("causes") ? { ...styles.active, ...styles.anchor } : styles.anchor}>Causes</Button>
                </Link>)}
              {auth && type == 'admin' && (
                <Link to="/users" className="link-button"  >
                  <Button style={styles.button} style={this.checkPath("users") ? { ...styles.active, ...styles.anchor } : styles.anchor} onClick={this.changePath}>Users </Button>
                </Link>)}
              <Link to="/about" className="link-button" >
                <Button style={styles.button} onClick={this.changePath} style={this.checkPath("about") ? { ...styles.active, ...styles.anchor } : styles.anchor}>About</Button>
              </Link>
              {!auth && (
                <Link to="/other" className="link-button" >
                  <Button style={styles.button} onClick={this.changePath} style={this.checkPath("other") ? { ...styles.active, ...styles.anchor } : styles.anchor}>Other...</Button>
                </Link>)}
              {!auth && (
                <Link to="/login" className='link-button'>
                  <Button style={styles.button} onClick={this.changePath} style={this.checkPath("login") ? { ...styles.active, ...styles.anchor } : styles.anchor}>Login </Button>
                </Link>)}
              {auth && (
                <div style={{ display: 'inline-flex', "verticalAlign": "middle" }}>
                  <Typography variant="subheading" style={styles.username}>{currentUser.firstName || currentUser.lastName || currentUser.fullName}</Typography>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <UserAvatar
                      size="48"
                      name={username}
                      src={currentUser.imageURL || avatar}
                      colors={['#BDBDBD']}
                    />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <Link to={`/${currentUser.type}-profile`} className="link-button"><MenuItem onClick={this.changePath} >Profile</MenuItem></Link>
                    <Link to={"/"} className="link-button"><MenuItem onClick={this.handleLogOut}>Log out</MenuItem></Link>
                  </Menu>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
/*
export class Header extends PureComponent {
  render() {
    const { currentUser } = this.props;

    return (
      <div className="header-container">
        <div className="header">
          <div className="logo">
            <img src={logo} />
          </div>
          <nav className="main-navbar">
          {currentUser.role > 0 &&
            <div className="standard-option admin">
              <p>Admin</p>
            </div>
          }
            <div className="standard-option">
              <p>Dashboard</p>
            </div>
            <div className="standard-option">
              <p>Discover</p>
            </div>
          </nav>
          <div className="avatar-menu-container">
            <div className="avatar-menu">
              <img src={avatar} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
*/

export const mapStateToProps = createSelector(
  getCurrentUser,
  (currentUser) => ({
    currentUser
  })
);

export default hot(module)(connect(mapStateToProps, {
  logOut,
  delCause,
  dismissStatus,
  dismissError
})(withRouter(Header)));