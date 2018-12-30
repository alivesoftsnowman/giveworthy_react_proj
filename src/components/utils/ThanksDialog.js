import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import {FaTwitter,FaFacebook,FaGooglePlus,FaEnvelope, FaLinkedin} from "react-icons/fa";
import {
    // base components (unstyled)
    ShareButton,
    ShareBlock,
  
    // styled button components
    ShareButtonRoundSquare,
    ShareButtonRectangle,
    ShareButtonCircle,
    ShareButtonIconOnly,
    ShareButtonOutline,
  
    // styled block components
    ShareBlockStandard,
  } from 'react-custom-share';
const styles= {
    gridContainer:{
        marginTop:30
    }    
};
const ShareComponent = props => {
    // create object with props for shareBlock
    const {url, text, longText} = props;
    const shareBlockProps = {
      url: url||'https://mywebsite.com/page-to-share/',
      button: ShareButtonCircle,
      buttons: [
        { network: 'Twitter', icon: FaTwitter },
        { network: 'Facebook', icon: FaFacebook },
        { network: 'GooglePlus', icon: FaGooglePlus },
        { network: 'Email', icon: FaEnvelope },
        { network: 'Linkedin', icon: FaLinkedin },
      ],
      text: text|| `Give it a try - mywebsite.com `,
      longtext: longText || `Take a look at this super website I have just found.`,
    };
  
    return <ShareBlockStandard {...shareBlockProps} />;
  };
export default class ThanksDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        //this.handleChange = this.handleChange.bind(this);
        this.shareOnSocialMedia = this.shareOnSocialMedia.bind(this);
    }  
    shareOnSocialMedia=()=>{
        const {callback} = this.props;
        callback&&callback();
    }
    handleOKClose=()=>{
        const {callback} = this.props;
        callback&&callback();
    }
    render() {
        const {open,causes, username, amount} = this.props;
        const url = process.env.HOST;
        const text = "Give it a try -  Donation: " ;
        var longText = `I just donated $${amount.toFixed(2)} each of these charities: `;
        var arr=[];
        causes.forEach(item => {
            if (item.checked){
                arr.push(item.name||"Charity name"); 
            }
        });
        longText += arr.join(",");
        return (
        <div>
            <Dialog
            open={open}
            maxWidth = "sm"
            fullWidth = {true}
            onClose={this.handleOKClose}
            aria-labelledby="form-dialog-title"
            >
                <DialogContent >
                    <Typography variant="display3" align="center" gutterBottom>
                        {"Thanks " + username +"!"} 
                    </Typography>
                    <Typography variant="headline" align="center" gutterBottom>
                        {"You just donated $" + amount.toFixed(2) +" each of these charities!"} 
                    </Typography>
                    <div style={styles.gridContainer}>
                        <Grid container spacing={40}>
                            {causes.map((item, id)=>{
                                return (
                                    item.checked&&(<Grid item xs={12} sm={6} key={id}>
                                        <Typography variant="subheading" align="center">
                                        {item.name||"Charity name"}
                                        </Typography>
                                    </Grid>)
                                )
                            })}
                        </Grid>
                    </div>
                </DialogContent>

                <DialogActions>
                    <div style={{margin:"0 auto"}}>
                        <Typography align="center" variant="subheading">Share on social media</Typography>
                        <ShareComponent url={url} text={text} longText={longText} />
                    </div>
                </DialogActions>
            </Dialog>
        </div>
        );
    }
}