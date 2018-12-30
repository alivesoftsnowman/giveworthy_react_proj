import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import landingBanner from '@assets/images/landing-ad.png';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grayTextSection:{
    border:"1px solid #a6a6a6",
    padding:"50px 30px 30px 40px",
    background:"#e8e8e8",
    borderRadius:5
  },
  button:{
    marginTop:20,
    background:"white"
  }
})


export class Home extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className="root main-container">
        <Grid container spacing={40}>
          <Grid item xs={12} sm={4}>
            <Typography variant="display1" align="center">
              Social Proof here  
            </Typography>
            <Typography variant="subheading" align="center">
              Sub text to support 
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="display1" align="center">
              Social Proof here  
            </Typography>
            <Typography variant="subheading" align="center">
              Sub text to support 
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="display1" align="center">
              Social Proof here  
            </Typography>
            <Typography variant="subheading" align="center">
              Sub text to support 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img src={landingBanner}></img>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.grayTextSection}>
              <Typography variant="display3" align="left" gutterBottom>
                Giveworthy 
              </Typography>
              <Typography variant="headline" align="left" gutterBottom>
                Some supporting text why we are good.
              </Typography>
              <Button variant="contained" className={classes.button} component={Link} to="/login">
                Get Started
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default hot(module)(withStyles(styles)(Home));