import React, {PureComponent} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { hot } from 'react-hot-loader';
import { Player,BigPlayButton } from 'video-react';
import withMobileDialog from '@material-ui/core/withMobileDialog';

export class VideoPlayDialog extends PureComponent {
    constructor(props) {
        super(props);
        this.state ={
            open:false
        }
    }
   
    handleClose=()=>{
        const {onClose} = this.props;
        onClose&&onClose();
    }
    render() {
        const {src,open} = this.props;

        return (
            <div>
                <Dialog
                    open={open}
                    PaperProps={{style:{overflow:'initial'}}}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle>Preview Video </DialogTitle>
                    <DialogContent style={{width:500, height:300}}>
                    <Player
                        playsInline
                        src={src}
                    />
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={this.handleClose}  color="primary">
                        Close
                        </Button>
                    </DialogActions> */}
                </Dialog>
            </div>
        );
    }
}

export default hot(module)(withMobileDialog()(VideoPlayDialog));
