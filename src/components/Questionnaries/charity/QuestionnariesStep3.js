import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import {getActivePageInfo } from '@selectors/questionnaires';
import {setActiveQuestionnaire,
        nextPage,
        prevPage} from '@actions/questionnaires';

import {updateCause, saveCause, uploadFile} from  '@actions/cause';
import { Button } from '@material-ui/core';
//import DropZone from 'react-dropzone';
import Stepper from '@components/BarStepper';
import getCause from '@selectors/getCause';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
//import IconButton from '@material-ui/core/IconButton';
//import DeleteIcon from '@material-ui/icons/Delete';
//import UploadIcon from '@material-ui/icons/CloudUpload';
//import PreviewIcon from '@material-ui/icons/Visibility';
//import Alert from '@components/utils/Alert';
//import VideoPlayDialog from '@components/utils/VideoPlayDialog';
import getStatus from '@selectors/getStatus';
//import CircularProgress from '@material-ui/core/CircularProgress';
import LinkIcon from '@material-ui/icons/Link';
import YoutubePlayer from 'react-player'
//import { Player,BigPlayButton } from 'video-react';
const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'0 auto',
        position:"relative"
    },
    form:{
      width:300, 
      margin:'30px auto',
      display:'block'
    },
    formControl:{
      width:"100%",
    },
    backBtn:{
      fontSize:20,
      fontWeight:400,
      margin: "10px auto",
      color:"#ADADAD",
      textTransform: "initial",
      left:"-20%",
      top:0,
      position:"absolute",
    },
    skipBtn:{
      textAlign:'center',
      fontSize:16,
      margin: "40px auto",
      display: "block",
      color:"#ADADAD",
      textTransform: "initial"
   },
   dropZone:{
    position : 'relative',
    width: "100%",
    border: "2px dashed ",
    borderColor:"#BDBDBD",
    height: 200,
    borderRadius: 5,
    background:"#eaeaea"
   },
   videoplayArea:{
    height:300,
    width:"100%",
    outline:"none",
    marginTop:20,
    border: "2px",
    borderColor:"#BDBDBD",
    borderRadius: 5,
    background:"#eaeaea"
   },
   activeDrag:{
     borderColor:"rgb(127, 154, 68)"
   },
   uploadMessage:{
    margin:"75px auto",
    marginBottom:10,
    textAlign:"center", 
    color:"#a6a6a6", 
    fontWeight:"400"},
  uploadButtonsArea:{
    width:100,
    margin:"0 auto"
  }
}

export const mapStateToProps = createSelector(
  getActivePageInfo,
  getCause,
  getStatus,
  ( activePageInfo, cause, status) => ({
    activePageInfo,
    cause,
    status
  })
);

export class QuestionnarieComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { cause, setActiveQuestionnaire } = props;
    
    this.state={
      primaryVideoLink:cause.primaryVideoLink||null,
      fileContent:null,
      isUploaded:cause.primaryVideoLink&&cause.primaryVideoLink.length>0?true:false,
      isOpenedDialog:false,
      isOpenedVideoPlayDialog:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleUploadVideo = this.handleUploadVideo.bind(this);
    this.handleDeleteFileContent = this.handleDeleteFileContent.bind(this);
    this.openAlertDialog = this.openAlertDialog.bind(this);
    this.openVidoPlayDialog = this.openVidoPlayDialog.bind(this);
    this.closeVidoPlayDialog = this.closeVidoPlayDialog.bind(this);
    this.onDrop = this.onDrop.bind(this);
    setActiveQuestionnaire(3);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  
  handleSubmit(){
    const { nextPage, 
      cause,
      updateCause,
      saveCause } = this.props;
    const state = this.state;
    
    if(this.state.primaryVideoLink){
      updateCause('primaryVideoLink',state.primaryVideoLink);
      saveCause({
        id:cause.get("id"),
        primaryVideoLink:state.primaryVideoLink
      })
      nextPage();
      this.props.history.push('/charity-questionnarie-step-4'); 
    }
  }
  handleBack(){
    const { prevPage } = this.props;
    prevPage();
    this.props.history.push('/charity-questionnarie-step-2'); 
  }
  handleSkip(){
    const { nextPage} = this.props;
    nextPage();
    this.props.history.push('/charity-questionnarie-step-4'); 
  }
  handleUploadVideo(b){
    this.setState({isOpenedDialog:false});
    const { cause, 
      updateCause,
      uploadFile } = this.props;
    if(b){
      const data = new FormData();
      data.append('file', this.state.fileContent);
      data.append('id', cause.id);
      data.append('key','primaryVideoLink');
      const self = this;
      uploadFile(data, 'primaryVideoLink', function(link){
        if (link){
          self.setState({"isUploaded":true, primaryVideoLink:link});
          updateCause('primaryVideoLink',link);
        }
      });
      
    }
  }
  openAlertDialog(e){
    e.stopPropagation();
    this.setState({isOpenedDialog:true});
  }
  openVidoPlayDialog(e){
    e.stopPropagation();
    this.setState({isOpenedVideoPlayDialog:true});
  }
  closeVidoPlayDialog(){
    this.setState({isOpenedVideoPlayDialog:false});
  }
  
  handleDeleteFileContent(e){
    e.stopPropagation();
    this.setState({
      fileContent: null, 
      isUploaded:false,
      primaryVideoLink:null
    });
    const {updateCause} = this.props;
    updateCause('primaryVideoLink',null);
  }
  onDrop(accepted){
    if (accepted.length>0){
      this.setState({fileContent: accepted[0], isUploaded:false,primaryVideoLink:null});
    }
  }
  render() {
    const { 
      activePageInfo,
      status
    } = this.props;
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Add a video message
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Video message about the cause and thanking donors
        </Typography>
        <div style={styles.formControl}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <LinkIcon />
            </Grid>
            <Grid item xs={11}>
              <FormControl style={styles.formControl} >
                <InputLabel htmlFor="primaryVideoLink">Video link</InputLabel>
                <Input id="primaryVideoLink" value={this.state.primaryVideoLink||""} onChange={this.handleChange("primaryVideoLink")} />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div style={styles.videoplayArea}>
          <YoutubePlayer
            playsinline
            url={this.state.primaryVideoLink||""}
            controls = {true}
            width ={"100%"}
            height ={"100%"}
          >
          </YoutubePlayer>
        </div>
          {/* <DropZone
            style={styles.dropZone}
            accept="video/*"
            activeStyle={styles.activeDrag}
            onDrop={this.onDrop}
          >
            <Typography variant="title" color="default" style={styles.uploadMessage}  gutterBottom>
            {this.state.fileContent && this.state.fileContent.name&&`Selected video file: ${this.state.fileContent.name}`}
            {(!this.state.fileContent) && "Upload a video message."}
            </Typography>

            
             <div style={styles.uploadButtonsArea}>
              {this.state.primaryVideoLink&&(<IconButton  aria-label="Preview" onClick={this.openVidoPlayDialog}>
                <PreviewIcon />
              </IconButton>)}
              {this.state.fileContent&&!this.state.isUploaded&&(
                <IconButton  aria-label="Upload" onClick={this.openAlertDialog} disabled={status}>
                {!status&&<UploadIcon />}  {status&&<CircularProgress size={20}/>}
                </IconButton>)}
              {(this.state.primaryVideoLink||this.state.fileContent)&&(
                <IconButton  aria-label="Delete" onClick={this.handleDeleteFileContent} disabled={status}>
                  <DeleteIcon />
                </IconButton>
              )}
            </div> 
            
            
          </DropZone> */}
          
          <Button type="submit" variant="contained" onClick={this.handleSubmit}  className="login-button email-signin-button">
          Next
          </Button>

        <Button  style={styles.skipBtn} onClick={this.handleSkip} >
        Skip
        </Button>
        <Button  style={styles.backBtn} onClick={this.handleBack}>
          &lt; Back
        </Button>
        <Stepper steps={activePageInfo}/>
        {/* <Alert
          open={this.state.isOpenedDialog}
          title={"Upload Confirmation"}
          description={"Would you like to upload this video message?"}
          onBtnClick={this.handleUploadVideo}
        />
        <VideoPlayDialog
          open={this.state.isOpenedVideoPlayDialog}
          onClose = {this.closeVidoPlayDialog}
          src={this.state.primaryVideoLink}
        />     */}
      </div>
    );
  }
}



export default hot(module)(connect(mapStateToProps,{
  nextPage, 
  prevPage,
  updateCause,
  saveCause,
  uploadFile,
  setActiveQuestionnaire
})(QuestionnarieComponent));