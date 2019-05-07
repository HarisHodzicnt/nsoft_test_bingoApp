import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import io from 'socket.io-client';
import axios from 'axios';
import SocketInfo from './socketInfo';

const arr=[1,2,3,4,5];

var numOfRepeats = [];
const colors=['rgba(188, 27, 9,0.4)','rgba(22, 130, 7, 0.4)','rgba(10, 19, 178, 0.4)','rgba(91, 1, 67, 0.4)','rgba(201, 64, 14, 0.4)','rgba(218, 229, 9, 0.4)','rgba(255, 133, 20, 0.4)','rgba(2, 0, 0, 0.4)'];
var   _isMounted = false;
var localStoradgeBall=window.localStorage;
var top=-60;
var interval1=0;
var left=0;
var top1=0;
var height=0;
var width=0;
var left1=37;
var div=document.createElement("div");
var span3=document.createElement("span");
var div1=document.createElement("div");

var colors2;
div1.appendChild(span3);
div.appendChild(div1)



function move(){
  left+=4;
  console.log(left)
  if(left<17)
  {
    width+=1;
    height+=1;
    top1+=4;
    left1+=-2

  }
  else if(left>=17 && left <30)
  {
    top1-=3.5;
    width+=40;
    height=width;
    left1+=7.5
  }
  else if(left>=30){

    document.getElementById("text").appendChild(div);

	setTimeout(function(){
	console.log("hej");

   document.getElementById("text").style.display="none";
	 document.getElementById("text").style.left=left1+"%";
  document.getElementById("text").style.top=top1+"%";
  document.getElementById("text").style.width=width+"px";
  document.getElementById("text").style.height=height+"px";
  document.getElementById("text").style.display="inline-block";

}, 1000);
	    clearInterval(interval1);


  }
  document.getElementById("text").style.left=left1+"%";
  document.getElementById("text").style.top=top1+"%";
  document.getElementById("text").style.width=width+"px";
  document.getElementById("text").style.height=height+"px";


}
function interval(a){
  top=-60;
  interval1=0;
   left=0;
  top1=0;
  height=0;
  width=0;
   left1=37;
   colors2=(colors[Math.floor(a%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(a%8-1)];
  div.setAttribute("style", "width:80px; height:80px; position:absolute; left:50%; top:50%; border-radius:50%;transform:translate(-50%,-50%)")
  div.style.background=colors2;
  div1.setAttribute("style", "width:70px; height:70px; background:inherit; position:relative; left:50%; top:50%; border:2px solid white; border-radius:50%;transform:translate(-50%,-50%)")
  span3.setAttribute("style", "font-size:54px; position:absolute; left:50%; top:50%;  border-radius:50%;transform:translate(-50%,-50%)")
  span3.innerHTML=a;
  if(document.getElementById("text").style.border!==undefined && document.getElementById("span")!=undefined)
  document.getElementById("text").style.border='2px solid '+ colors2.replace(/[^,]+(?=\))/, '0.9');
  document.getElementById("text").style.backgroundColor=colors2;

  document.getElementById("span").setAttribute("style", "position:absolute;width: 70px;height: 70px;top: 2%,z-index: 1000;radial-gradient(circle at 40% 40%, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.8) 0%, rgba(0, 0, 0, 0) 50%)");

  interval1=setInterval(move,100)
}
const style = theme  => ({
firstFiveNum:{
position:'relative',
},
topFive:{
  margin:0,
  borderRadius:50,
  height:'4vw',
  width:'4vw',
  textAlign:'center',
  marginTop:4,
  position:'relative',
  background:"rgba(177, 185, 198,0.7)",
  '& span':{
    fontSize:'145%',

  }


},
rounded: {
  borderRadius:50,
  height:'3.3vw',
  width:'3.3vw',
  textAlign:'center',
  position: 'relative',
  display:'inline-block',
  marginTop:4,
  marginLeft:'1%',
  float:'left'
},

middle:{
  margin: 0,
  position: 'absolute',
  top: '50%',
  left: '15%',
  transform: 'translate(-50%, -50%)',
  fontSize:'120%',

},

nineLeftNum:
{
  textAlign:'center',
  '& li':{
  display:'inline-block',
  borderRadius:50,
  height:'3.3vw',
  width:'3.3vw',
background:"rgba(177, 185, 198,0.7)",
  marginLeft:'auto',
  marginRight:'auto',
  marginTop:3,
  fontSize:'145%',
  border:'4px solid transparent'

},

'& div':{
  position:'relative',

}
},
nineRightNum:
{
  textAlign:'center',
  '& li':{
  display:'inline-block',
  borderRadius:50,
  height:'3.3vw',
  width:'3.3vw',
  background:"rgba(177, 185, 198,0.7)",
  marginLeft:'auto',
  marginRight:'auto',
  marginTop:3,
  fontSize:'145%',
  border:'4px solid transparent'

},

'& div':{
  position:'relative',

}
},
nineMidNum:{
  textAlign:'center',
  '& li':{
  display:'inline-block',
  borderRadius:50,
  marginTop:6,
  fontSize:'145%',
  height:'3.3vw',
  width:'3.3vw',
  background:"rgba(177, 185, 198,0.7)",
  marginLeft:'auto',
  marginRight:'auto',
  border:'4px solid transparent'
},
'& span':{
 left:'23%'},

'& div':{
  position:'relative'
}
},
middle2:{
  margin: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize:30,

},
text:{
  position: 'absolute',
  width: 0,
  height: 0,
  zIndex: 2000,
  background: 'red',
  marginTop: '20%',
  left: '50%',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 'inset 0 3px 17px #2d333d',
  display:'inline-block'
},
 shadow:{
    position:'absolute',
    width: 70,
    height: 70,
    top: '2%',
    background: 'radial-gradient(circle at 40% 40%, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.8) 0%, rgba(0, 0, 0, 0) 50%)',
    zIndex: 1000 }

})

class RoundLayout extends Component{
  state={
     stateOfGame:"",
     ball:"",
     time:"",
     arrayBalls:[],
     ballId:"",
     otherBets:[]
  }

  componentDidMount() {
    var h=1;
    var n=0;
    var histArr=[];
    var specArr=[];
    var count=0;

    //if User refresh page without this data would have been lost
    while(window.localStorage.getItem("ticketBall"+h)!==null)
    {
      var arr=[];
      var s=0;
      //saved number bet ( 6 or more numbers)
      while(s<window.localStorage.getItem("ticketBall"+h).length)
      {
        if(window.localStorage.getItem("ticketBall"+h)[s] !== ",")
        { var n=s+1;
          if(window.localStorage.getItem("ticketBall"+h)[s+1]!==",")
          {
            arr.push(window.localStorage.getItem("ticketBall"+h)[s]+""+window.localStorage.getItem("ticketBall"+h)[s+1]);

            s++;
          }
          else{
            arr.push(""+window.localStorage.getItem("ticketBall"+h)[s]);

          }
        }
        s++;
      }

    histArr.push(arr); //histArr holds number bets
    this.props.history.editId=histArr
     h++;
    }
    //this while is for special bets
    while(window.localStorage.getItem("specialBet"+count)!==null)
{
      specArr.push(window.localStorage.getItem("specialBet"+count));
      var element=document.createElement("div");
      element.style.marginTop='2.9%';
      element.style.padding='5px 0px 10px 5px';
      document.getElementById("otherBets").appendChild(element).innerHTML+=window.localStorage.getItem("specialBet"+count)
     this.props.history.specialBets=specArr;
       count++;
    }

    _isMounted = true;
 var url="https://gcm-fra-staging-1.7platform.com:8008/get-lb",
  query='token="token"&clientType="user',
  channel='1d0d6713-b7c9-4f07-ab23-3451a06e8989';
  axios.get(url).then(response=>{
     var socketUrl = response.data.url,
         socket=io(socketUrl, {query:query});
         socket.on('connect', ()=>{
           socket.emit('subscribe', {
             channel:channel,
             subChannels:{
               language:'en',
               deliveryPlatform:'Web',
               playerUuid:null
             }
           })
  });
  socket.on(channel, (response)=>{
    if(response){
      var eventType=response.type;
      var data = response.data;
      switch(eventType){
        case 'state':
        if(_isMounted)
      {this.setState({stateOfGame:data.type})}

          break;
        case 'new':
        if(_isMounted)
       {this.setState({stateOfGame:eventType})}


            break;
        case 'ball':
        if(_isMounted)
{
  interval(data.ball);
  //to mark balls which are drawn while user is on the website
  setTimeout(function(){
    this.setState({stateOfGame:eventType, ball:data.ball, ballId:data.id})
  }.bind(this),560)

 if(document.getElementsByName(data.id+"tcnp")!==null)
 {
  var n=0;
  while(n<document.getElementsByName(data.ball+"tcnp").length)
  {
    document.getElementsByName(data.ball+"tcnp")[n].style.border="4px solid "+((colors[Math.floor(data.ball%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(data.ball%8-1)]).replace(/[^,]+(?=\))/, '0.9');
    document.getElementsByName(data.ball+"tcnp")[n].style.color=((colors[Math.floor(data.ball%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(data.ball%8-1)]).replace(/[^,]+(?=\))/, '0.9');
    document.getElementsByName(data.ball+"tcnp")[n].style.backgroundColor=(colors[Math.floor(data.ball%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(data.ball%8-1)];
    n++;
  }
 }
  setTimeout(function(){window.localStorage.setItem(data.id+"i", data.ball); //saving which numbers are drawn
 this.setState(prevState => ({
arrayBalls: [...prevState.arrayBalls, data.ball]
}))

count=0;
if(this.state.arrayBalls.length<data.id && count==0)
{ var i=1;
 while(i<data.id) //logic behind this is to set arrayBalls to keep track which numbers are drawing while user is still on the page, and if he leaves page numbers wont generate in this variable so data.id will be higher than lengh of that variable
 {
   var ball=window.localStorage.getItem(i+"i");
   document.getElementById(""+i).innerHTML=window.localStorage.getItem(i+"i");
   document.getElementById(""+i).parentElement.style.background=(colors[Math.floor(ball%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(ball%8-1)];
   document.getElementById(""+i).parentElement.style.border="4px solid "+((colors[Math.floor(ball%8-1)]==undefined) ? "rgba(255, 255, 255, 0.9)" : colors[Math.floor(ball%8-1)].replace(/[^,]+(?=\))/, '0.9'));
   document.getElementById(""+i).parentElement.style.color=(colors[Math.floor(ball%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(ball%8-1)].replace(/[^,]+(?=\))/, '0.9');

var n=0;

 while(n<document.getElementsByName(ball+"tcnp").length ) // to mark balls which are drawn after user refreshes the page
 {
   document.getElementsByName(ball+"tcnp")[n].style.border="4px solid "+((colors[Math.floor(ball%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(ball%8-1)]).replace(/[^,]+(?=\))/, '0.9');
   document.getElementsByName(ball+"tcnp")[n].style.color=((colors[Math.floor(ball%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(ball%8-1)]).replace(/[^,]+(?=\))/, '0.9');
   document.getElementsByName(ball+"tcnp")[n].style.backgroundColor=(colors[Math.floor(ball%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(ball%8-1)];
   n++;
 }


i++;
count++;
}
}

//to set drawn balls in their place on screen




}.bind(this), 360);
}

              break;
        case 'result':
               if(_isMounted)
                {this.setState({stateOfGame:eventType, time:data.sentTime%10000})}
                this.props.history.push("/");

                break;
        case 'countdown':

        if(_isMounted)

                window.localStorage.clear();
                 this.props.history.push("/");
                break;

                default:
                      // do nothing
      }
    }
  })
  });
 };
componentWillUnmount(){
  _isMounted = false;
}


  render(){
    const {classes,history}=this.props;
    var top=0;
    var right=0;
    var color = (colors[Math.floor(this.state.ball%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(this.state.ball%8-1)];
    return(
      <div>
      <h5 id="text" className="text" style={{  position: 'absolute',
        width: 0,
        height: 0,
        zIndex: 2000,
        marginTop: '12%',
        left: '40%',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 'inset 0 3px 17px #2d333d',
        shadow:'0px 5px 20px white',
        display:'inline-block'}}>
        <span className="shadow" id="span"></span></h5>

      <Grid container style={{left:'10%'}}>
      <Grid container item xs={8} sm={8} md={8}>
      <Grid item sm={2} md={2} xs={2}>

      <ul className={classes.nineLeftNum} style={{padding:0, color:'white'}} >
          <div ><li><span id="6" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>10000</span></div>
          <div ><li><span id="7" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>7500</span></div>
          <div><li><span id="8" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>5000</span></div>
          <div ><li><span id="9" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>2500</span></div>
          <div ><li><span id="10" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>1000</span></div>
          <div ><li><span id="11" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>500</span></div>
          <div ><li><span id="12" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>300</span></div>
          <div ><li><span id="13" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>250</span></div>
          <div ><li><span id="14" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>150</span></div>
          </ul>

        </Grid>

        <Grid container item sm={9} xs={9} md={9} style={{marginTop:'12%',color:'white'}} className={classes.nineMidNum}>
              <Grid container item sm={12} xs={12} md={12} style={{color:'white', textAlign:'center'}}>
              <Grid item sm={12} md={12} xs ={12}>
              <div id="circle" style={{height:110,width:110,borderRadius:'50%', background:"rgb(242, 106, 235)",top:15, fontSize:30,marginLeft:'auto', marginRight:'auto',textAlign:'center',
 position:'relative'}}>
              {
                this.state.stateOfGame=="ball" && <SocketInfo prop={true} num={this.state.ball} color={color}  />
              }
            </div>
            </Grid>

            <Grid item sm={12} md={12} xs={12} >
            <ul className={classes.firstFiveNum} style={{marginLeft:'22%'}}>
              {
                arr.map(index=>{
                  var marginTops;
                  var marginLefta;
                  switch(index){
                    case 1:
                    marginTops=-80;
                    marginLefta=0;
                    break;
                    case 2:
                    marginTops=-25;
                    marginLefta=35;

                    break;

                    case 3:
                    marginTops=6;
                    marginLefta=3;
                    break;

                    case 4:
                    marginTops=10;
                    marginLefta=10;
                    break;

                    case 5:
                    marginTops=6;
                    marginLefta=10;
                    break;

                  }


                  return (
                    <li key={index+"g"} className={classes.topFive} style={{fontSize:30, marginTop:marginTops, marginLeft:marginLefta,display:'inlineBlock', float:'left' }}><span   id={index} className={classes.middle2} style={{fontSize:30,marginLeft:'23%'}}>{index}</span></li>
                  )
                })
              }
              </ul>
              </Grid>
              </Grid>

              <Grid container item sm={12} xs={12} md={12} style={{marginTop:'10%',color:'white'}}>
              <Grid item sm={3} xs={3} md={3}>
                <div ><li><span id="15" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>100</span></div >
                <div ><li><span id="16" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>90</span></div >
              <div >  <li><span id="17" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>80</span></div >
              </Grid>
              <Grid item sm={3}  xs={3} md={3}>
                  <div ><li><span id="18" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>70</span></div >
                  <div ><li><span id="19" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>60</span></div >
                  <div ><li><span id="20" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>50</span></div >
              </Grid>
              <Grid item sm={3} xs={3} md={3}>
                  <div ><li><span id="21" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>40</span></div >
                  <div ><li><span id="22" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>30</span></div >
                  <div ><li><span id="23" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>25</span></div >
              </Grid>
              <Grid item sm={3} xs={3} md={3}>
                <div ><li><span id="24" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>20</span></div >
              <div >  <li><span id="25" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>15</span></div >
                <div ><li><span id="26" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle}>10</span></div >
              </Grid>
              </Grid>

        </Grid>

        <Grid item sm={1} xs={1} md={1} style={{textAlign:'center',color:'white'}}>
        <ul className={classes.nineRightNum} style={{padding:0}}>
          <div ><li><span id="27" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle} style={{left:'0%'}}>9</span></div >
          <div ><li><span id="28" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle} style={{left:'0%'}}>8</span></div >
          <div ><li><span id="29" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle} style={{left:'0%'}}>7</span></div >
          <div ><li><span id="30" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle} style={{left:'0%'}}>6</span></div >
          <div ><li><span id="31" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle} style={{left:'0%'}}>5</span></div >
          <div ><li><span id="32" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle} style={{left:'0%'}}>4</span></div >
          <div ><li><span id="33" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle} style={{left:'0%'}}>3</span></div >
          <div ><li><span id="34" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle} style={{left:'0%'}}>2</span></div >
          <div ><li><span id="35" style={{position:'absolute',left:'50%', top:'50%',transform: 'translate(-50%, -50%)',}}></span></li><span className={classes.middle} style={{left:'0%'}}>1</span></div >
        </ul>
        </Grid>
        </Grid>
<Grid container item sm={4} md={4} xs={12}>
<Grid item sm={12} md={12} xs={12}>
<h1 style={{textAlign:'center', color:'white'}}>Your bets</h1>
{
  history.editId!==undefined && history.editId!==null  &&  history.editId.map(a=>{
    return(
      <div key={a+"s"}style={{width:'100%', marginTop: '2.9%', height:'60px',clear:'both', textAlign:'center', marginLeft:10, borderBottom:'2px solid white', padding:'4px 0px 1px 0px', borderLeft:'3px solid white'}}>
      {
        a.map(index=>{
          var width=a.length<9 ? '3vw' : '2.5vw';
          width=a.length>9 ? '2.3vw' : width
          return(
            <div className={classes.rounded} name={index+"tcnp"} key={index+"tcnp"}style={{border:"4px solid rgb(99,99,99)",
            color:'rgb(99,99,99)',
          background:'inherit',
          width:width,
          height:width,

        }} >
                  <span className={classes.middle2}>{index}</span>
                  </div>
          )
        })
      }

      </div>
    )
  })
}
{
    history.specialBets!==undefined && history.specialBets!==null && <h4 style={{color:'white', textAlign:'center'}}>Other bets:</h4>
}
<Grid id="otherBets" style={{marginLeft:'4%'}}></Grid>

{

      history.specialBets!==undefined && history.specialBets.map(a=>{
            return(
              <Grid container item sm={12} xs={12} md={12} key={a+"ticket"}>
              </Grid>

        )
    })
}

</Grid>
</Grid>
    </Grid>
      </div>
    )
  }
}


export default withStyles(style)(RoundLayout)
