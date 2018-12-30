import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';
import { createSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import UserAvatar from 'react-user-avatar';
import msg from '@assets/i18n/en';
import { Button, CircularProgress } from '@material-ui/core';
import getCurrentUser from '@selectors/getCurrentUser';
import avatar from '@assets/images/if_male_628288.svg';
import ArrowLeftIcon from '@material-ui/icons/NavigateBefore';
import ArrowRightIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';
import VideoPlayer from 'react-player';
import Paper from '@material-ui/core/Paper';
import noImage from '@assets/images/no-image.png';
import {getDontionSumByUserId, getMatchedCauses, getPostInfoForCause} from '@api';

const styles= theme => ({
  fbFriends:{
    padding:0,
    paddingLeft:theme.spacing.unit * 5,
    paddingBottom:theme.spacing.unit * 3,
  },
  graySection:{
    background:"#DDD",
    border:"1px solid #BDBDBD",
    textAlign:"center",
    marginLeft:theme.spacing.unit * 3,
    marginRight:theme.spacing.unit * 3,
    paddingBottom:theme.spacing.unit * 5,
    paddingTop:theme.spacing.unit * 7,
    paddingLeft:theme.spacing.unit*2,
    paddingRight:theme.spacing.unit*2
  },
  section:{
    margin:40,
    minHeight:360,
    textAlign:'center'
  },
  carouselContainer:{
    minHeight:360,
    position:"relative",
    "overflow-x":"hidden",
    "overflow-y":"overlay",
    textAlign:'center'
  },
  carouselItemsSection:{
    position:"absolute",
    left:0,
    top:0,
    display:"flex"
  },
  carouselItem:{
    width:300,
    padding:10
  },
  carouselButtons:{
    display: "flex",
    justifyContent: "flex-end"
  },
  infoDesc:{
    fontSize:26,
    fontWeight:'400',
    color:"#757575"
  },
  postDesc:{
    fontSize:30,
    fontWeight:'400',
    color:"#757575",
    "text-overflow": "ellipsis",
    "white-space": "nowrap"
  },
  videoDesc:{
    fontSize:16,
    fontWeight:'400',
    color:"#757575",
    lineHeight:"1.8em",
    textAlign:"left"
  },
  userinfo:{
    marginBottom:30
  },
  post:{
    marginBottom:30,
  },
  paper:{
    height:300,
    border:"1px solid #BDBDBD",
    background:"#DFDFDF",
    borderRadius:5,
    padding:10
  }
});

export class GiverDashboard extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      sliderLeft:0,
      totalDonatedAmount:0,
      totalCauese:0,
      percentile:0,
      donatedItems:[],
      charities:[],
      posts:[],
      loadingCharities:false,
      loadingDonationInfo:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCarouselDir = this.handleCarouselDir.bind(this);
    this.getDonationSum = this.getDonationSum.bind(this);
    this.getMatchedCauses = this.getMatchedCauses.bind(this);
    this.getPostsInfo = this.getPostsInfo.bind(this);
  }

  componentDidMount(){
    this.getDonationSum();
    this.getMatchedCauses();
    this.getPostsInfo();
  }
  getDonationSum(){
    const {user} = this.props;
    const self = this;
    this.setState({loadingCharities:true});
    getDontionSumByUserId({userId:user.id}).then((res)=>{
      if (res.msg == msg.SUCCESS){
        self.setState({
          totalDonatedAmount:res.sum||0,
          totalCauese:res.cn || 0,
          donatedItems:res.causes
        });
      }
      self.setState({loadingCharities:false});
    });
  }
  getMatchedCauses(){
    const {user} = this.props;
    const self = this;
    this.setState({loadingCharities:true});
    const causes = getMatchedCauses({
      userId:user.id,
      start:this.state.start,
      limit:10
    });
    causes.then(function(res){
      if (res.msg == msg.SUCCESS){
        self.setState({charities:res.causes});
      }
      self.setState({loadingCharities:false});
    })
  }
  getPostsInfo(){
    const self = this;
    getPostInfoForCause().then((res)=>{
      if (res.msg == msg.SUCCESS){
        self.setState({posts:res.items});
      }
    });
  }
  handleChange = prop => event => {
    
  };
  handleCarouselDir= dir => event =>{
    if (this.state.charities.length==0) return;
    const itemsEl = ReactDom.findDOMNode(this.refs.carouselSection),
          containerEl = ReactDom.findDOMNode(this.refs.carouselContainer),
          step = 100;
    if(!itemsEl) return;
    const ws = itemsEl.getBoundingClientRect().width, 
          wc = containerEl.getBoundingClientRect().width;
    var v = this.state.sliderLeft-dir*step;
    if(wc-v>ws) v= wc-ws;
    if (v>0 ) v= 0;
    this.setState({sliderLeft:v});
  }
  render() {
    const {classes, user} = this.props;
    const self = this;
    var username = user.fullName||user.familyName||user.givenName;
    var {totalDonatedAmount, percentile, totalCauese, donatedItems,charities, posts} = this.state;
        
    return (
      <div className="main-container">
        <div className={classes.fbFriends} >
          <Typography variant="subheading">
            Maybe a list of your FB friends who donated could scroll here?
          </Typography>
        </div>
       
        <div className={classes.graySection}>
          <div className={classes.userinfo}>
            <Grid container spacing={40}>
              <Grid item xs={12} sm={1}>
              </Grid>
              <Grid item xs={12} sm={3}>
                <UserAvatar 
                    size="240" 
                    name={username} 
                    src={user.imageURL} 
                    colors={['#BDBDBD']} 
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={40}>
                  <Grid item xs={12}>
                    <Typography variant="display2" align="left">
                      {`Hi ${username}!`}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={40}>
                  <Grid item xs={12} sm={5}>
                    <Typography className={classes.infoDesc} align="left">
                      you're given
                    </Typography>
                    <Typography variant="display3" align="left">
                      {`$${totalDonatedAmount.toFixed(2)}`}
                    </Typography>
                    <Typography className={classes.infoDesc} align="left">
                      {`to ${totalCauese} Causes`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography className={classes.infoDesc} align="left">
                      you're in the top
                    </Typography>
                    <Typography variant="display3" align="left">
                      {`${percentile}%`}
                    </Typography>
                    <Typography className={classes.infoDesc} align="left">
                      Of givers your age
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className={classes.post}>
            {posts.map((item, id)=>{
              return(
                <div key={id} style={{padding:'10px 0'}}>
                  <div className='inline-flex'>
                     <UserAvatar 
                      size="48" 
                      name={item.name} 
                      src={item.imageURL} 
                      colors={['#BDBDBD']} 
                    />
                    <Typography className={classes.postDesc}>
                      {item.content}
                    </Typography>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={classes.section}>
            <Typography variant="display1" align="center">
              See what you helped achieve
            </Typography>
            <div className={classes.carouselButtons} >
              <IconButton
                onClick={this.handleCarouselDir(1)}
                color="inherit"
              >
                <ArrowLeftIcon/>
              </IconButton>
              <IconButton
                onClick={this.handleCarouselDir(-1)}
                color="inherit"
              >
                <ArrowRightIcon/>
              </IconButton>
            </div>
            <div className={classes.carouselContainer} ref="carouselContainer">
              {this.state.loadingCharities? <CircularProgress style={{marginTop:20}}/> :charities.length==0?
                <Typography variant="display1" align="left">No items to show you</Typography>:(<div className={classes.carouselItemsSection} ref="carouselSection" style={{left:this.state.sliderLeft}}>
                {charities.map((item, id)=>{
                  return (
                    <div key={id} className = {classes.carouselItem}>
                      <div style={{textAlign:"center"}}>
                        <div className='inline-flex'>
                          <UserAvatar 
                            size="48" 
                            name={item.name || "Charity Name"} 
                            src={item.imageURL} 
                            colors={['#BDBDBD']} 
                          />
                          <Typography className={classes.postDesc} >
                            {item.name|| "Charity Name"}
                          </Typography>
                        </div>
                      </div>
                      <div style={{marginTop:20}}>
                        {item.primaryVideoLink&&item.primaryVideoLink.length>0&&<VideoPlayer
                            playsinline
                            url={item.primaryVideoLink}
                            controls
                            width ={"100%"}
                            height ={"100%"}
                        />}
                      </div>
                      <div>
                        <p className={classes.videoDesc}>
                          {item.description.length>60?(item.description.substr(0,60)+"..."):item.description}&nbsp;&nbsp;&nbsp;
                          {item.description.length>60 && <Button variant="outlined" size="small"> Read More</Button>}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>)}
            </div>
        </div>    
        <div className={classes.section}>
            <Typography variant="display1" align="center" style={{marginBottom:15}}>
              Who you've donated to:
            </Typography>
            {this.state.loadingDonationInfo?<CircularProgress style={{marginTop:20}}/>:donatedItems.length>0?(
              <Grid container spacing={40}>
                { donatedItems.map((item,id)=>{
                  return (
                    <Grid item xs={12} sm={4} key={id}>
                      <Paper className={classes.paper}>
                        <img src={item.photoLinks[0]||noImage} width={"100%"} height={200}/>
                        <Typography variant="subheading" gutterBottom align="left">{(!item.name||item.name.length==0)?"Charity Name":item.name}</Typography>
                        <Typography variant="subheading" gutterBottom align="left">{(!item.webLink||item.webLink.length==0)?"Charitewebsite.com":item.webLink}</Typography>
                      </Paper>
                    </Grid>
                  )
                })
                }
              </Grid>
            ):<Typography variant="display1" align="left">No items to show you</Typography>}
            
        </div>
      </div>
    );
  }
}
const mapStateToProps =createSelector(
  getCurrentUser,
  (user) => ({
    user
  })
);

export default hot(module)(connect(mapStateToProps)(withStyles(styles)(GiverDashboard)));