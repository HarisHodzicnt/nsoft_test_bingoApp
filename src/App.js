import React, { Component } from 'react';
import LayoutBalls from './layoutBalls';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const colors=['rgba(188, 27, 9,0.3)','rgba(22, 130, 7, 0.3)','rgba(40, 94, 240, 0.3)','rgba(111, 31, 145, 0.3)','rgba(94, 57, 15, 0.3)','rgba(234, 210, 3, 0.3)','rgba(194, 88, 1, 0.3)','rgba(255,255, 255, 0.3)'];
const colors2=["RED", "GREEN", "BLUE","PURPLE","BROWN","YELLOW","ORANGE","WHITE"]
var   _isMounted = false; // Handle set state in componentDidMount
var stateTime; // To set time ( current time - time which I get from json)
var updatedTime=false;
var closeModal=""; // to handle modals ( special bets)

const styles = theme => ({
   App:{
     backgroundColor:'rgb(23,23,23)',
     '& Grid':{
       margin:0
     }
   },
    inlineBlocks:{
        borderRight:'3px solid rbg(23,23,23)',
      padding:20,
    },
    currentRound:{
        marginLeft:2,
        borderLeft:'3px solid rbg(23,23,23)',
        height:470,
        height:'100%',
        color:'white'
    },
    rounded: {
      borderRadius:50,
      height:'3vw',
      width:'3vw',
      textAlign:'center',
      position: 'relative',
      display:'inline-block',
      marginTop:4,
      marginLeft:'2%',
      float:'left'
    },
    middle:{
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize:'145%',

    },
    buttonBets:{
      padding:10,
      height:20,
      '& Grid':{
        marginTop:10,

      },
      '& button':{
        backgroundColor:'rgba(95, 91, 91,0.9)',
        border:'3px solid transparent',
        color:'white',
        fontWeight:'bold',
        shadow:'3px 3px black',
        boxShadow:'0 6px 6px -3px black',
        '&:hover':{
          cursor:'pointer',
        }

      },


    },
    paper: {
   position: 'absolute',
   width: theme.spacing.unit * 50,
   backgroundColor: theme.palette.background.paper,
   boxShadow: theme.shadows[5],
   padding: theme.spacing.unit * 4,
   outline: 'none',
   left:'7%',
   top:'40%'
 },
 pickingNumber:{
   border:'2px solid black',
   top:30,
   display:'block',
   padding:10,
   height:'4.5vw'
 },
 bettingPanel:{
   '& form':{
     marginTop:'30px'
   },
   '& button':{
     padding:'1% 3% 1% 3%',
     marginLeft:'2%',
     marginRight:'2%'
   },
   '& input':{
       padding:'4px 20px 4px 20px',
       textAlign:'center'

   }
 },
 infoRound:{
   borderBottom:'2px solid rgb(22,22,22)',
   color:'white',
   padding:5
 },
 rounds:{
   borderBottom:'15px solid rgb(22,22,22)',
   padding:10

 },
 preballs:{
   '& h4':{
   color:'white'
  }
},
bonusBalls:{
  '& h4':{
    color:'white'
  }
},
inputs:{

  '& button':{
    '&:hover':{
      cursor:'pointer',
    }
  }
},
inputBet:{
  fontWeight:'bold',
  '&:hover':{
    cursor:'pointer',
  }
},


})
class App extends Component {
  state={
     stateOfGame:"",
     ball:"",
     time:"",
     ballId:"",
     ticket:[],
     openEO:false,
     openUO:false,
     openMagic:false,
     openOtherBets:false,
     open:false,
     betValue:1,
     otherBets:"",
     minValue:0.5,
     lastTenRounds:[],
     rounds:[],
     preballs:[],
     bonusBalls:[],
     specialBets:[],
     wholeBetGameRound:[],
     otherGames:[],
  }
  //Function for time ( next round) update
myInterval(){
  var s=144-this.state.time;
  this.myInterval=setInterval(()=>{

    this.setState(time=>({
      time:s--
    }))
    updatedTime=true;
  },1000)

}
 componentDidMount() {
   _isMounted=true;
var a=0;
if(_isMounted)
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
     console.log(response);

     switch(eventType){
       case 'state':
         var date=new Date(data.time);
         stateTime=date.getMinutes()*60+date.getSeconds();
         var currentTime=new Date().getMinutes()*60+new Date().getSeconds();
         if(_isMounted)
         {this.setState({stateOfGame:data.type, time:currentTime-stateTime})
         this.myInterval();}
         if(a==0) //calling function lastTenRounds
         this.lastTenRounds();
         a++;
         break;
       case 'new':
           if(_isMounted)
           {this.setState({stateOfGame:eventType})
           const {history}=this.props;
               history.editId=this.state.wholeBetGameRound; //Passing data to gameRoundGame component, i could not find other way to do it
               history.specialBets=this.state.otherGames;
               this.props.history.push('./gameRoundGame');

            }
           break;
       case 'ball':
             if(_isMounted)
{
             this.setState({stateOfGame:eventType, ball:data.ball, ballId:data.id})

          window.localStorage.setItem("state", "true");

            this.props.history.push('/gameRoundGame');
  }

             break;
       case 'result':
               if(_isMounted)
               {
                 this.setState({stateOfGame:eventType})
               this.lastTenRounds();
                }
               break;
       case 'countdown':

               if(_isMounted)
               break;
               default:
            // do nothing

     }
   }
 })
 });
};

lastTenRounds(){
  var lastTenRoundArray=[];
  var timeAndRoundId=[];
  var preballs=[];
  var bonusBalls=[];
  var specialBets=[];
 axios.get('https://services-staging.7platform.com/web/events/1d0d6713-b7c9-4f07-ab23-3451a06e8989.json?count=11').then(response=>{
 for(var a in response.data)
 {
   bonusBalls.push(response.data[a].bonusBalls);
   var even=0;
   var odd=0;
   var roundArray=[];
   var specialBetsBets=[];
   var sum=0;
   //Time for each event in last 10 rounds
   timeAndRoundId.push([response.data[a].eventId, new Date(response.data[a].eventTime).toISOString().substring(0, 10).replace('T', ' ')+" "+new Date(response.data[a].eventTime).getHours() + ":" + new Date(response.data[a].eventTime).getMinutes() ]);
   console.log(new Date(response.data[a].eventTime))
   var firstFiveNum=[];
   for(var ball in response.data[a].balls)
   {
     if(response.data[a].balls[ball].id<2)
     {
       sum=response.data[a].balls[0].ball + response.data[a].balls[1].ball +response.data[a].balls[2].ball +response.data[a].balls[3].ball +response.data[a].balls[4].ball; //Sum for first five numbers
      var color=(colors2[Math.floor(response.data[a].balls[ball].ball%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors2[Math.floor(response.data[a].balls[ball].ball%8-1)]
      //Pushing into array to have all events / bets in one array
       specialBetsBets.push(["First Ball Color",color],["Pre Numbers Sum (-122.5+)", sum],["First Number Even/Odd", response.data[a].balls[ball].ball%2==0 ? "EVEN" : "ODD" ],["First Number (-24.5+)",response.data[a].balls[ball].ball<25 ? 'UNDER':"OVER"])
     }
     if(response.data[a].balls[ball].id<6)
     {
       response.data[a].balls[ball].ball%2==0 ? even++ : odd++;  // Checking first five numbers / even>odd or even<odd
       firstFiveNum.push(response.data[a].balls[ball].ball);

     }
    roundArray.push(response.data[a].balls[ball].ball)// All 10 rounds, in each round 35 numbers
 }
 specialBetsBets.push(["Even/Odd Pre Numbers", even>odd ? "EVEN" : "ODD"]);
 specialBets.push(specialBetsBets);
 preballs.push(firstFiveNum);
 lastTenRoundArray.push(roundArray);
}
this.setState({lastTenRounds:lastTenRoundArray, rounds:timeAndRoundId, preballs:preballs,bonusBalls:bonusBalls, specialBets:specialBets});
})
}

componentWillUnmount(){
    _isMounted = false;
}

//This function is to display picked bets
showTickets(a){
  var arr=this.state.ticket;
  //this.state.ticket --> picked numbers
  if(document.getElementById("pickingBet").children.length==1 && this.state.ticket.length<1)
  {
    document.getElementById("pickingBet").removeChild(document.getElementById("pickingBet").childNodes[0])
  }
  //if user just press
  if(document.getElementById("pickingBet").children.length>0 && a.target.previousSibling!==null && a.target.previousSibling.attributes.name.value=="")
  {
    this.setState({ticket:[]})
    return;
  }

  if(a.target.attributes.name!==undefined)
  {

  if(colors.indexOf(a.target.attributes.name.value)!==-1)
  {
    var sum=colors.indexOf(a.target.attributes.name.value)+1;
    if(this.state.ticket.length<=5) //to prevent more than 10 numbers picked
    {
      //when user wants to pick row with same color (1,9,17,25,33,41 for example)
      for(var i=0;i<6;i++)
      {
        if(arr.indexOf(sum)!==-1)
        {
          arr.pop();
        }
        else{
      arr.push(sum);
      sum+=8;
  }
      }
    }

    this.setState({ticket:arr})
    return;
  }

  var val;

if(a.target !==undefined) // when user manualy pick number
{
  if(a.target.localName==="span") //if user press on span or div
  {
    val=parseInt(a.target.innerHTML);

  }
 else{
    val=parseInt(a.target.children[0].innerHTML);
}

//if user undo number
if(arr.indexOf(val)!==-1){
arr=arr.filter(a=>{return a!==val})
}
else{
  arr.push(val);
}

this.setState({ticket:arr})
}
}
}

//close modal
handleClose = (e) => {
   this.setState({ [closeModal]: false });
 };


//open modal
handleOpen = (e) => {
  closeModal="open"+e.target.name;//sending  name of div element ==>which modal to open
  this.setState({ ["open"+e.target.name]: true, open:true})
};

//function for picking money in input element
handelBet=(e)=>{
  e.preventDefault();
var sum=e.target.name == 'minus' ?   parseFloat(document.getElementById("money").value)-0.10 : parseFloat(document.getElementById("money").value)+0.10;
if(sum<this.state.minValue)
{
  return false;
}
sum=sum.toFixed(1);

this.setState({betValue:sum})
}

// function for taking bets from special bets ( evem/odd/under/over)
takeBet=(e)=>{
  e.preventDefault();
  var divElement=document.createElement("div");
  var spanElement=document.createElement("span");
  spanElement.style.color="white";
  var spanBett=document.createElement("span");
  this.setState({minValue:2, betValue:2})

  divElement.style.marginTop="14px";

   if(document.getElementById("pickingBet").children.length>1 && this.state.ticket.length>1)
   {
     for(var i=0;i<this.state.ticket.length;i++)
     {
       document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.style.background="inherit";
       document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.style.border='4px solid rgb(99,99,99)';
       document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.style.color="rgb(99,99,99)";
       document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.attributes.name.value=document.getElementById("pickingBet").children[i].children[0].innerHTML;
     }
   }
   if(document.getElementById("pickingBet").children.length==1 && this.state.ticket.length<1)
   {
     document.getElementById("pickingBet").removeChild(document.getElementById("pickingBet").childNodes[0])
   }

   if(e.target.name == 'Odd')
  {
    spanElement.innerHTML=e.target.previousSibling.previousSibling.innerHTML;
    spanBett.innerHTML=" Your bet: ODD";
    spanBett.style.color="red";
    spanBett.style.marginLeft="2%";

    divElement.appendChild(spanElement);
    divElement.appendChild(spanBett);
    divElement.style.color="white"
    divElement.style.marginTop="4.5%"
    divElement.setAttribute("name", e.target.previousSibling.innerHTML);

    document.getElementById("pickingBet").appendChild(divElement);
    this.handleClose("EO")
  }
  else if(e.target.name=="Even")
   {
     spanElement.innerHTML=e.target.previousSibling.innerHTML;
     spanBett.innerHTML= " Your bet: EVEN";
     spanBett.style.color="red";
     spanBett.style.marginLeft="2.%";
     divElement.style.marginTop="4.5%"
     divElement.appendChild(spanElement);
     divElement.appendChild(spanBett);
     divElement.setAttribute("name", e.target.previousSibling.innerHTML);

     document.getElementById("pickingBet").appendChild(divElement);
     this.handleClose("EO")
   }
   else if(e.target.name=="Over")
    {
      spanElement.innerHTML=e.target.previousSibling.previousSibling.innerHTML;
      spanBett.innerHTML= " Your bet: OVER";
      spanBett.style.color="red";
      spanBett.style.marginLeft="2%";
      divElement.style.marginTop="4.5%"
      divElement.appendChild(spanElement);
      divElement.appendChild(spanBett);
      divElement.setAttribute("name", e.target.previousSibling.innerHTML);


      document.getElementById("pickingBet").appendChild(divElement);
      this.handleClose("OU")
    }
    else if(e.target.name=="Under")
     {
       spanElement.innerHTML=e.target.previousSibling.innerHTML;
       spanBett.innerHTML= " Your bet: UNDER";
       spanBett.style.color="red";
       spanBett.style.marginLeft="2%";
       divElement.style.marginTop="4.5%"

       divElement.appendChild(spanElement);
       divElement.appendChild(spanBett);
       divElement.setAttribute("name", spanElement.innerHTML+" "+spanBett.innerHTML);
       document.getElementById("pickingBet").appendChild(divElement);
       this.handleClose("OU")
     }
     this.setState({ticket:[]})
}

//function for placing user bets in div for showing users tickets
takeBetToTicketPlace=(e)=>{
  e.preventDefault();
  var arr=[];
  var arr1=[];
  var otherBets=[];
  var class1=document.getElementById("1id").children[0].children[0].className;
  var class2=document.getElementById("1id").children[0].children[0].children[0].className; //taking class from div ( ball ) elements

  var divElement=document.createElement("div");
  divElement.style.borderBottom="2px solid rgb(99,99,99)";
  divElement.style.marginTop="2%"
  var pickingBet=document.getElementById("pickingBet");
  var pickingBetLenght=document.getElementById("pickingBet").children.length;
  if(pickingBetLenght>1 && this.state.ticket.length>5)
  {
    var span3=document.createElement("span");
    span3.setAttribute("style", "display:inline-block;margin-left:3%; color:white; font-size:100%; position:absolute; margin-top:25px");

    this.setState({minValue:0.5})
    for(var i=0;i<pickingBetLenght;i++) // numbers
    {
      var span=document.createElement("span");
      var element=document.createElement("div");
      var color=(colors[Math.floor(parseInt(pickingBet.children[i].outerText)%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(parseInt(pickingBet.children[i].outerText)%8-1)]
      document.getElementsByName(pickingBet.children[i].attributes.name.value)[0].parentElement.style.background='inherit';
      document.getElementsByName(pickingBet.children[i].attributes.name.value)[0].parentElement.style.color='rgb(99,99,99)';
      document.getElementsByName(pickingBet.children[i].attributes.name.value)[0].parentElement.style.border='4px solid rgb(99,99,99)';
      document.getElementsByName(pickingBet.children[i].attributes.name.value)[0].parentElement.attributes.name.value=pickingBet.children[i].attributes.name.value;
      span.classList.add(class2);
      span.innerHTML=pickingBet.children[i].children[0].innerHTML;
      arr1.push(pickingBet.children[i].children[0].innerHTML)
      element.classList.add(class1);
      element.setAttribute("style", "display:inline-block;margin-left:1%");
      element.appendChild(span);
      element.style.background=color;
      element.style.border="4px solid "+color.replace(/[^,]+(?=\))/, '0.9');
      element.style.color=color.replace(/[^,]+(?=\))/, '0.9');
      divElement.appendChild(element);
      divElement.setAttribute("name", "ticketBball");

    }
    span3.innerHTML="- "+document.getElementById("money").value + " KM";
    divElement.appendChild(span3);
    divElement.style.position='relative';
    document.getElementById("ticketsInPlay").appendChild(divElement);
    window.localStorage.setItem("ticketBall"+ document.getElementsByName("ticketBball").length, this.state.ticket);

  }
  else if(pickingBetLenght==1 && this.state.ticket.length==0) // special bets
  {
    divElement.setAttribute("name", "specBet");

    window.localStorage.setItem("specialBet"+document.getElementsByName("specBet").length, pickingBet.children[0].innerHTML);

    var setStateGame=[pickingBet.children[0].children[0].innerHTML,pickingBet.children[0].children[1].innerHTML ];
    pickingBet.children[0].innerHTML+="<span style='display:inline-block;position:absolute; margin-left:3%; font-size:100%; margin-top:0px;color:white'>- "+document.getElementById("money").value+" KM</span>";
    divElement.appendChild(pickingBet.children[0])
    divElement.style.position='relative';
    divElement.style.padding='5px 0px 10px 5px';
    document.getElementById("ticketsInPlay").appendChild(divElement);
    this.setState(prev=>({
      otherGames:[...prev.otherGames, setStateGame]
    }))

   return;
  }
  //if user press on bet without picking any bet
  else{
    return false;
  }
  this.setState({ticket:arr});
  this.setState(prev=>({
    wholeBetGameRound:[...prev.wholeBetGameRound, this.state.ticket]
  }))

  document.getElementById("money").value=this.state.betValue;

}

//lucky 6 bet
randomTicketNumbers=(e)=>{

  var length=0;
  var number=0;
 var arr=[];
 if(document.getElementById("pickingBet").children.length==1 && this.state.ticket.length==0) //making sure to clear div to display picked numbers
{
  document.getElementById("pickingBet").removeChild(document.getElementById("pickingBet").childNodes[0])
}
  if(e.target.attributes.name!==undefined && e.target.attributes.name.nodeValue=='lucky6') //User have 2 layouts for picking random numbers ( lucky6 and magic), with this if i am figuring out what length is he picking
  {
    length=6;
  }
  else{
    length=parseInt(e.target.innerHTML);
  }
  for(var i=0;i<document.getElementById("pickingBet").children.length;i++)//removing color from numbers which are not selected
  {
    var color=(colors[Math.floor(parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML)%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML)%8-1)];

    document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.style.background="inherit";
    document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.style.border='4px solid rgb(99,99,99)';
    document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.style.color="rgb(99,99,99)";
    document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.attributes.name.value=document.getElementById("pickingBet").children[i].children[0].innerHTML;


  }
for(var i=0;i<length;i++) //generating numbers / random 6 or more
{
  number= Math.floor(Math.random() * 48) + 1;

  while(arr.indexOf(number)!==-1)
  {
    number= Math.floor(Math.random() * 48) + 1;
  }
  var color=(colors[Math.floor(number%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(number%8-1)];

  if(document.getElementsByName(""+number)[0].tagName!=="SPAN")
  {
    document.getElementsByName(""+number)[0].style.background=color;
    document.getElementsByName(""+number)[0].style.color=color.replace(/[^,]+(?=\))/, '1');
    document.getElementsByName(""+number)[0].style.border='4px solid '+color.replace(/[^,]+(?=\))/, '1');
    document.getElementsByName(""+number)[0].attributes.name.value="noOpacity";
  }
  else{
    document.getElementsByName(""+number)[0].style.background=color;
    document.getElementsByName(""+number)[0].style.color=color.replace(/[^,]+(?=\))/, '1');
    document.getElementsByName(""+number)[0].parentElement.attributes.name.value="noOpacity";
  }

arr.push(number);

}
this.setState({ticket:arr});

arr=[];
this.handleClose("Magic")
}

//function to clear pickingBet DIV
clearField=(e)=>{
  e.preventDefault();
if(document.getElementById("pickingBet").children.length==1 && this.state.ticket.length<0)
{
  document.getElementById("pickingBet").removeChild(document.getElementById("pickingBet").childNodes[0])
  return;
}
  for(var i=0;i<this.state.ticket.length;i++)
  {
    document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.style.background="inherit";
    document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.style.border='4px solid rgb(99,99,99)';
    document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.style.color="rgb(99,99,99)";
    document.getElementsByName(""+parseInt(document.getElementById("pickingBet").children[i].children[0].innerHTML))[0].parentElement.attributes.name.value=document.getElementById("pickingBet").children[i].children[0].innerHTML;
  }

  this.setState({ticket:[]});
}
  render() {
    console.log(window.localStorage)

    const{classes}=this.props;
    return (
      <div className="App" id="App" >
      {
        this.state.time==0 && <h1 style={{position:'absolute', left:'50%', top:'50%',color:'white'}}>Loading . . .</h1>
      }
      {
      this.state.time>0 && updatedTime &&  <div style={{background:'rgb(36,36,36)', color:'white', padding:'5px 15px 5px 15px'}}>
      <h4>Next game starts in : {Math.floor(this.state.time/60)} min, {this.state.time%60} seconds.</h4>
      </div>
      }
  { this.state.time>0 && updatedTime && <Grid container  className="App" style={{ textAlign:'center', marginTop:5}}>
      <Grid item sm={6} md={6} className={classes.inlineBlocks} style={{margin:0, background:'rgb(36,36,36)'}}>

                {
                      colors.map((num,i)=>{
                      return(
                        <Grid item sm={2} id={i+"id"} style={{float:'left'}} onClick={(a)=>{this.showTickets(a)}} key={i}>
                      <LayoutBalls
                                num={i}
                                color={colors[i]}
                                key={i}
                                lengtht={this.state.ticket.length}
                             />
                        </Grid>
                           )
                                  })

                }
                <Grid container item xs={12} md={12} className={classes.buttonBets}>
                <Grid item xs={3} md={3}>
                <button name="EO" style={{padding:'3% 7% 3% 7%'}} onClick={(a)=>{this.handleOpen(a)}}>E/O</button>
                </Grid>
                <Grid item xs={3} md={3}>
                <button name="UO" style={{padding:'3% 7% 3% 7%'}} onClick={(a)=>{this.handleOpen(a)}}>U/O</button>
                </Grid>
                <Grid item xs={3} md={3}>
                <button style={{padding:'3% 7% 3% 7%'}} onClick={(e)=>{this.randomTicketNumbers(e)}} name="lucky6">Lucky 6</button>
                </Grid>
                <Grid item xs={3} md={3}>
                <button style={{padding:'3% 7% 3% 7%'}} name="Magic" onClick={(a)=>{this.handleOpen(a)}}>MAGIC</button>
                </Grid>

                </Grid>
        <div className={classes.pickingNumber} id="pickingBet">


                  { this.state.ticket.length>0 &&
                  this.state.ticket.sort(function(a, b){return a-b}).map(index=>{
                    return (
                      <div name={index} key={index+"s"} className={classes.rounded} style={{marginLeft:'1%',marginTop:'2.9%',
                      color:(colors[Math.floor(index%8-1)]==undefined) ? "rgba(255, 255, 255, 0.9)" :colors[Math.floor(index%8-1)].replace(/[^,]+(?=\))/, '0.9'),
                      border:"4px solid "+((colors[Math.floor(index%8-1)]==undefined) ? "rgba(255, 255, 255, 0.9)" :colors[Math.floor(index%8-1)].replace(/[^,]+(?=\))/, '0.9')),
                      background:(colors[Math.floor(index%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(index%8-1)]}} >
                      <span className={classes.middle}>{index}</span></div>

                    )
                  })
                }

                </div>

        <div className={classes.bettingPanel}>
        <form className={classes.inputs}>
        <button style={{background:"rgb(137,7,0)", color:'white', border:'2px solid transparent', fontWeight:'bold', padding:'8px 15px 8px 15px'}} onClick={(e)=>{this.clearField(e)}}>CLEAR</button>

        <button style={{background:"rgb(241,0,6)", color:'white', border:'2px solid transparent'}} name="minus" onClick={(e)=>{this.handelBet(e)}}>-</button>

 <label style={{color:'white'}}>
   <input id="money" type="text" style={{width:60, '&:hover':{cursor:'alias'}}} name="name" value={this.state.betValue} onChange={(e)=>{this.setState({betValue:e.target.value})}}/> Km
 </label>
 <button style={{background:"rgb(21,156,7)", color:'white', border:'2px solid transparent'}} name="plus" onClick={(e)=>{this.handelBet(e)}}>+</button>
 <input style={{background:"rgb(10,110,0)", color:'white', border:'2px solid transparent',padding:'8px 15px 8px 15px'}} className={classes.inputBet} type="submit" value="BET" onClick={(e)=>{this.takeBetToTicketPlace(e)}}/>
</form>
        </div>
                </Grid>
 <Grid item sm={6} md={6} className={classes.currentRound} style={{margin:0}}>
<div><h2 style={{textAlign:'center'}}>Tickets in play</h2> </div>
<div id="ticketsInPlay" style={{textAlign:'left'}}>
</div>
</Grid>
</Grid>
}
{
  this.state.time>0 && updatedTime &&<div style={{background:'rgb(0,102,174)',color:'white', padding:10, borderBottom:'15px solid rgb(23,23,23)',borderTop:'15px solid rgb(23,23,23)'}}><h2>Last 10 rounds</h2></div>
}
{
  this.state.time>0 && updatedTime && <Grid container style={{background:'rgb(36,36,36)'}}>
  {
    this.state.lastTenRounds.map((a,index)=>{
      return (
        <Grid container item sm={12} md={12} key={a[index]+"holdr"+index}>
        <Grid item xs={8} sm={8} md={8} key={a[index]+"ltrs"} className={classes.rounds}>
        <div className={classes.infoRound}><span>Event {this.state.rounds[index][0]} |</span><span> {this.state.rounds[index][1]}</span></div>
        <Grid container item sm={12} md={12}>
        <Grid item sm={6} md={6} className={classes.preballs}>
          <h4>Preballs</h4>
          <div>
          {
            this.state.preballs[index].map(number=>{
              return (
                 <div key={number+"pr"+index} className={classes.rounded} style={{marginLeft:'1%',color:(colors[Math.floor(number%8-1)]==undefined) ? "rgba(255, 255, 255, 0.9)" : colors[Math.floor(number%8-1)].replace(/[^,]+(?=\))/, '0.9'),
                 border:"4px solid "+((colors[Math.floor(number%8-1)]==undefined) ? "rgba(255, 255, 255, 0.9)" : colors[Math.floor(number%8-1)].replace(/[^,]+(?=\))/, '0.9')),
                 background:(colors[Math.floor(number%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(number%8-1)]}}><span className={classes.middle}>{number}</span></div>
               )

          })
          }
          </div>
          </Grid>
          <Grid item sm={6} md={6} className={classes.bonusBalls}>
          <h4>Bonus</h4>
          <div>
          {
            this.state.bonusBalls[index].map(number=>{
              return (
                 <div key={number+"bb"+index} className={classes.rounded} style={{marginLeft:'1%', color:(colors[Math.floor(number%8-1)]==undefined) ? "rgba(255, 255, 255, 0.9)" : colors[Math.floor(number%8-1)].replace(/[^,]+(?=\))/, '0.9'),
                 border:"4px solid "+((colors[Math.floor(number%8-1)]==undefined) ? "rgba(255, 255, 255, 0.9)" : colors[Math.floor(number%8-1)].replace(/[^,]+(?=\))/, '0.9')),
                 background:(colors[Math.floor(number%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(number%8-1)]}}><span className={classes.middle}>{number}</span></div>
               )

          })
          }
          </div>
          </Grid>
          </Grid>

        <div style={{clear:'both', marginTop:20,color:'white'}}> Drawn balls </div>

        {

          a.map((number, index)=>{
          return (
            <div key={a[index]+"ltr"+index} className={classes.rounded} style={{marginLeft:'1%', color:(colors[Math.floor(a[index]%8-1)]==undefined) ? "rgba(255, 255, 255, 0.9)" : colors[Math.floor(a[index]%8-1)].replace(/[^,]+(?=\))/, '0.9'),
            border:"4px solid "+((colors[Math.floor(a[index]%8-1)]==undefined) ? "rgba(255, 255, 255, 0.9)" : colors[Math.floor(a[index]%8-1)].replace(/[^,]+(?=\))/, '0.9')),
            background:(colors[Math.floor(a[index]%8-1)]==undefined) ? "rgba(255, 255, 255, 0.3)" : colors[Math.floor(a[index]%8-1)]}}><span className={classes.middle}>{a[index]}</span></div>
          )
        })
      }

      </Grid>
      <Grid item xs={4} sm={4} md={4}  className={classes.rounds}>
      <div className={classes.infoRound} style={{height:19}}></div>

        {
          this.state.specialBets[index].map(number=>{
            return (
              <Grid key={number[0]+"bnp"} container item sm={12} md={12}>
                  <Grid item sm={6} md={6} style={{margin:'20px 0 0 0', color:'rgb(26,75,131)',fontWeight:'bold'}}>
                    <span style={{fontSize:'15px'}}>{number[0]}</span>
                  </Grid>
                  <Grid item sm={6} md={6} style={{color:'rgb(26,75,131)', margin:'20px 0 0 0'}}>
                    <span style={{marginLeft:'2%'}}>{number[1]}</span>
                  </Grid>
              </Grid>
             )

        })
        }

        </Grid>
    </Grid>
    )
    })



  }
  </Grid>
}




<Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openEO}
          onClose={(e)=>{this.handleClose(e)}}
          name="EO"
        >
          <div  className={classes.paper} style={{textAlign:'center'}}>
            <Typography variant="h6" id="modal-title">
              <p name="First ball">First Ball</p>
              <button style={{padding:'4px 15px 4px 15px'}} name="Even" onClick={(e)=>{this.takeBet(e)}}>EVEN</button><button style={{marginLeft:10, padding:'4px 15px 4px 15px'}} name="Odd" onClick={(e)=>{this.takeBet(e)}}>ODD</button>
            </Typography>
            <hr/>
            <Typography variant="h6" id="simple-modal-description">
            <p name="All">ALL</p>
            <button style={{padding:'4px 15px 4px 15px'}} name="Even" onClick={(e)=>{this.takeBet(e)}}>EVEN</button><button style={{marginLeft:10, padding:'4px 15px 4px 15px'}} name="Odd" onClick={(e)=>{this.takeBet(e)}}>ODD</button>
            </Typography>
          </div>
        </Modal>
<Modal
aria-labelledby="simple-modal-title"
aria-describedby="simple-modal-description"
open={this.state.openUO}
  onClose={(e)=>{this.handleClose(e)}}
name="UO"
                  >
                    <div  className={classes.paper} style={{textAlign:'center'}}>
                      <Typography variant="h6" id="modal-title">
                        <p name="First ball">First Ball ( - /24.5/ + )</p>
                        <button style={{padding:'4px 15px 4px 15px'}} name="Under" onClick={(e)=>{this.takeBet(e)}}>UNDER</button><button style={{marginLeft:10, padding:'4px 15px 4px 15px'}} name="Over" onClick={(e)=>{this.takeBet(e)}}>OVER</button>
                      </Typography>
                      <hr/>
                      <Typography variant="h6" id="simple-modal-description">
                      <p name="First five balls">First five balls ( - / 122.5 / +)</p>
                      <button style={{padding:'4px 15px 4px 15px'}} name="Under" onClick={(e)=>{this.takeBet(e)}}>UNDER</button><button style={{marginLeft:10, padding:'4px 15px 4px 15px'}} name="Over" onClick={(e)=>{this.takeBet(e)}}>OVER</button>
                      </Typography>
                    </div>
</Modal>
<Modal
aria-labelledby="simple-modal-title"
aria-describedby="simple-modal-description"
open={this.state.openMagic}
  onClose={(e)=>{this.handleClose(e)}}
name="Magic"
                  >
                    <div  className={classes.paper} style={{textAlign:'center'}}>
                      <Typography variant="h6" id="modal-title">
                        <button style={{padding:'4px 17px 4px 17px'}}  onClick={(e)=>{this.randomTicketNumbers(e)}}>10</button><button style={{marginLeft:10, padding:'4px 20px 4px 20px'}} onClick={(e)=>{this.randomTicketNumbers(e)}}>9</button><button style={{marginLeft:10, padding:'4px 20px 4px 20px'}} onClick={(e)=>{this.randomTicketNumbers(e)}}>8</button>
                      </Typography>
                      <Typography variant="h6" id="simple-modal-description">
                      <button style={{padding:'4px 20px 4px 20px'}} onClick={(e)=>{this.randomTicketNumbers(e)}}>6</button><button style={{marginLeft:10, padding:'4px 20px 4px 20px'}} onClick={(e)=>{this.randomTicketNumbers(e)}}>7</button>
                      </Typography>
                    </div>
</Modal>

</div>
    );
  }
}

export default withStyles(styles)(App);
