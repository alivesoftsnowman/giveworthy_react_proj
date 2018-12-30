import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            link:""
        };
        this.handleChange = this.handleChange.bind(this);
    }  
   
    handleOKClose=()=>{
        const {callback} = this.props;
        callback&&callback(true, this.state.link);
    }
    handleCancelClose=()=>{
        const {callback} = this.props;
        callback&&callback(false, null);
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    render() {
        const {title, label,open,contentText} = this.props;
        return (
        <div>
            <Dialog
            open={open}
            onClose={this.handleCancelClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent style={{width:400}}>
                <DialogContentText>
                {contentText}
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="input"
                value={this.state.link}
                label={label}
                type="text"
                fullWidth
                onChange={this.handleChange("link")}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleCancelClose} color="primary">
                Cancel
                </Button>
                <Button onClick={this.handleOKClose} color="primary">
                Add
                </Button>
            </DialogActions>
            </Dialog>
        </div>
        );
    }
}