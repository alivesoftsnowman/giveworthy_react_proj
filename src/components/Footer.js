import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';
import { Grid, Typography } from '@material-ui/core';
import logo from '@assets/images/giveworthy-footer-logo.png';
import { SocialIcon } from 'react-social-icons'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  footer: {

    borderTop: "1px solid",
    bottom: 0,
    height: 365,
    width: "100%",
    
  },
  footerContent: {
    padding: "30px 10px",
    position: 'relative'
  },
  textColor: {
    color: "grey",
    textAlign: "center"
  },
  socialIcons: {
    color: "white",
    paddingLeft: 30,
    textAlign: "center"
  },
  bottomLine: {
    padding: "30px 10px 0px 10px",
    color: "white"
  },
  bottomMenu: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
  bottomMenuli: {
    float: "right",
    padding: "0px 10px"
  }

})


export class Footer extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className="root">
        <div className={classes.footer}>
          <div className={classes.footerContent}>
            <Grid container >
              <Grid item xs={12}>
                <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
                  Footer  </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(withStyles(styles)(Footer));