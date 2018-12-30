import React, {PureComponent} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { hot } from 'react-hot-loader';

export class AlertDialog extends PureComponent {
    constructor(props) {
        super(props);
        this.state ={
            open:false
        }
    }
    handleOKClose=()=>{
        const {onBtnClick} = this.props;
        onBtnClick&&onBtnClick(true);
    }
    handleCancelClose=()=>{
        const {onBtnClick} = this.props;
        onBtnClick&&onBtnClick(false);
    }
    render() {
        const {title, description,open} = this.props;

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={this.handleCancelClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">

                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancelClose}  color="primary">
                        Disagree
                        </Button>
                        <Button onClick={this.handleOKClose} color="primary" autoFocus>
                        Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default hot(module)(AlertDialog);
