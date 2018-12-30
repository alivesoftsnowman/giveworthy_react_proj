import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dropzone from 'react-dropzone';

const styles={
    dropZone:{
        position : 'relative',
        width: "100%",
        border: "2px dashed ",
        borderColor:"#BDBDBD",
        height: 200,
        borderRadius: 5,
        background:"#eaeaea"
    },
    activeDrag:{
        borderColor:"rgb(127, 154, 68)"
    },
    desc:{
        marginTop:20
    }
}
export default class UploadTaxFormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open||false,
            files: []
        };
    }  
    onDrop(files) {
        this.setState({
          files
        });
    }
    handleOKClose=()=>{
        if (this.state.files.length>0){
            const {callback} = this.props;
            callback&&callback(true, this.state.files[0]);
        }
    }
    handleCancelClose=()=>{
        const {callback} = this.props;
        callback&&callback(false, null);
    }
    render() {
        const {open} = this.props;
        return (
        <div>
            <Dialog
            open={open}
            onClose={this.handleCancelClose}
            aria-labelledby="form-dialog-title"
            >
            <Typography variant="display3" align="center" style={{marginTop:20,marginBottom:20}}>Upload/Submit tax/financial info</Typography>
            <DialogContent >
                <Typography variant="display1" align="center" style={{marginTop:20,marginBottom:20}}>Some information about the financial verification process...</Typography> 
                <Dropzone 
                    style={styles.dropZone} 
                    activeStyle={styles.activeDrag}
                    onDrop={this.onDrop.bind(this)} accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf ">
                    <Typography variant="body1" align="center" style={styles.desc}>Try dropping tax/financial documentation file here, or click to select files to upload. *.pdf and *.doc, *.docx will be accepted.</Typography>
                    {this.state.files.length>0&&<Typography variant="body1" align="center" style={styles.desc}>{`File name : ${this.state.files[0].name}`}</Typography>}
                </Dropzone> 
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleOKClose} variant="contained">
                Upload
                </Button>
                <Button onClick={this.handleCancelClose} variant="contained">
                Cancel
                </Button>
            </DialogActions>
            </Dialog>
        </div>
        );
    }
}