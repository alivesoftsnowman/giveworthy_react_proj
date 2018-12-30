import React, {PureComponent} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { hot } from 'react-hot-loader';
import AvatarImageCropper from 'react-avatar-image-cropper';
import { Button } from '@material-ui/core';
export class AvartarCropDialog extends PureComponent {
    handleApply=(file)=>{
        const {callback} = this.props;
        callback&&callback(file);
    }
    render() {
        const {open} = this.props;

        return (
            <div>
                <Dialog
                    open={open||false}
                    onClose={this.handleApply}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">

                    <DialogTitle id="alert-dialog-title">Avartar Image Cropper</DialogTitle>

                    <DialogContent>
                        <div style={{width:'256px',height:'256px',margin:'auto', marginBottom:20, marginTop:20}}>
                            <AvatarImageCropper apply={this.handleApply.bind(this)} isBack={true}/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleApply}>
                        Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default hot(module)(AvartarCropDialog);
