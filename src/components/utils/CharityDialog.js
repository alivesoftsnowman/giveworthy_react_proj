import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import YoutubePlayer from 'react-player'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PhotoGallery from '@components/utils/PhotoGallery';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
    
    paper: {
      padding: theme.spacing.unit ,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginLeft:theme.spacing.unit * 2,
      marginRight:theme.spacing.unit * 2, 
      height:"100%"
    },
    subContainer:{
        paddingLeft:theme.spacing.unit * 3,
        paddingRight:theme.spacing.unit * 3, 
    },
    formControl: {
        margin: theme.spacing.unit,
        width:"96%"
    },
    grayTextSection:{
        border:"1px solid #a6a6a6",
        height:200,
        background:"#e8e8e8",
        display:"table",
        position:"relative",
        overflow:"auto",
        borderRadius:5,
        width:"100%"
    },
    verticalMiddleAlign:{
        verticalAlign:"middle",
        display:"table-cell",
        fontSize:22,
        padding:"0 5px"
    },
    rightTopIcon:{
        position:"absolute",
        right:0,
        top:0
    },
    photoSection:{
        height:"40vh",
        overflow:"auto",
        maxHeight:400
    },
    input: {
        display: 'none',
    },
    leftSpacing: {
        marginLeft: theme.spacing.unit,
    },
    rightSpacing: {
        marginRight: theme.spacing.unit,
    },
});
export class CharityDialog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            videoHeight:300
        };
        this.onShowTaxFile = this.onShowTaxFile.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.videoCardRef = React.createRef();
    }  
    updateDimensions() {
        if (this.videoCardRef.current)
            this.setState({videoHeight: this.videoCardRef.current.offsetWidth*9/16 });
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    handleOKClose=()=>{
        const {callback} = this.props;
        callback&&callback();
    }
    onShowTaxFile=()=>{
        const {cause} = this.props;
        if (cause.financialDocLink&&cause.financialDocLink.length>0){
            window.open(cause.financialDocLink);
        }
    }
    render() {
        const {cause, open, classes} = this.props;
        this.updateDimensions();
        return (
        <div>
           {cause&& <Dialog
            open={open}
            onClose={this.handleOKClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Charity profile</DialogTitle>
            <DialogContent >
                <Grid container spacing={40}>
                    
                    <Grid item xs={12}>
                        <div ref={this.videoCardRef} style={{height:this.state.videoHeight}}>
                            <Paper className={classes.paper} >
                                <YoutubePlayer
                                    playsinline
                                    url={cause.primaryVideoLink||""}
                                    controls = {true}
                                    width ={"100%"}
                                    height ={"100%"}
                                />
                            </Paper>
                        </div>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Grid container className = {classes.subContainer} spacing={32}>
                            <Grid item xs={12} sm={8} >
                                <Grid container spacing={8} alignItems="flex-end">
                                    <Grid item xs={12}>
                                       <Typography variant="title" color="default"  gutterBottom>
                                        {cause.name || "Charity Name"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} >
                                       <Typography variant="subheading" color="default"  gutterBottom>
                                            {cause.webLink&&cause.webLink!=""?cause.webLink:'charitywebsite.com'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                
                            </Grid>
                            <Grid item xs={12} >
                                <div className={classes.grayTextSection}>
                                    <Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                        {cause.description||"Misson statement"}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} >
                                <div className={classes.grayTextSection}>
                                    <Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                        {cause.percentile||0}% of founds going to core causes
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}  >
                                <div className={classes.grayTextSection}>
                                    <Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                        {cause.summary||"Short-term funding goals"}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} >
                                <div className={classes.grayTextSection}>
                                    <Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                        {cause.details||"Initiatives that you are trying to fund at the moment"}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={[classes.grayTextSection, classes.photoSection].join(" ")}>
                                    <div style={{margin:20}}> 
                                        <PhotoGallery photos={cause.photoLinks||[]} />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
            </DialogContent>
            <DialogActions>
                {(cause.financialDocLink&&cause.financialDocLink.length>0)&&<Button variant="contained" align="center" onClick={this.onShowTaxFile}>
                                Show Tax/Financial Info</Button>}
                <Button onClick={this.handleOKClose} variant="contained">
                close
                </Button>
            </DialogActions>
            </Dialog>}
        </div>
        );
    }
}

export default hot(module)(withStyles(styles)(CharityDialog));