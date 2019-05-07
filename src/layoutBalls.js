

import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';



const arrOfNum=[1,2,3,4,5,6];

let pickedBallBets=[];
const styles = theme => ({
    inlineBlocks:{
      margin:'4px 0 0 11px'
    },
    rounded: {
      borderRadius:50,
      height:'3vw',
      width:'3vw',
      textAlign:'center',
      position: 'relative',
      display:'block',
      marginTop:4,
      '&:hover':{
        cursor:'pointer',
      }

    },
    roundColor:{
      width:'3vh',
      height:'3vh',
      borderRadius:50,
      display:'inline-block',
    },
    middle:{
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize:'145%',
      '&:hover':{
        fontWeight:'bold'
      }

    }
})
class BallLayout extends Component {
    state={
      numbersPicked:[],
      value:false,
      ticket:[]
    }
    // function, when user click on number, give that div and span element some style
    handleBallPick(e,color){
      let element;
      let number;
      if(this.props.lengtht<10)
      {
      if(e.target.localName=="span")
      {
        element=e.target.parentElement;
        number = e.target.innerHTML;

      }
     else{
        element=e.target;
        number=e.target.children[0].innerHTML;

    }


    if(element.attributes.name.value=="noOpacity") // i am tracking which numbers are picked, with this attribute / name
    {
      element.style.background="inherit";
      element.style.border="4px solid rgb(99,99,99)";
      element.style.color="rgb(99,99,99)";
      element.attributes.name.value="";
      pickedBallBets=pickedBallBets.filter(e=>{
        return e!==number;
      })
    }
    else{
    element.style.background=color;
    element.style.border="4px solid "+color.replace(/[^,]+(?=\))/, '1');
    element.setAttribute("name","noOpacity");
    element.style.color=color.replace(/[^,]+(?=\))/, '1');
    pickedBallBets.push(number);
}
}
  }

  //function when user is selecting all numbers from one row ( just styling them, in app.js there is another functon for saving value of span element)
  selectAll(e, color){
    var element=e.target.parentElement.children;

for(var i=0;i<element.length-1;i++){
  if(element[i].attributes.name.value=="noOpacity")
  {
    element[i].style.background="inherit";
    element[i].style.border="4px solid rgb(99,99,99)";
    element[i].style.color="rgb(99,99,99)";
    element[i].attributes.name.value="";
    pickedBallBets=pickedBallBets.filter(e=>{
      return e!==parseInt(e.target.parentElement.children.innerHTML);
    })
  }
  else{
    element[i].style.background=color;
    element[i].style.border="4px solid "+color.replace(/[^,]+(?=\))/, '1');
    element[i].setAttribute("name","noOpacity");
    element[i].style.color=color.replace(/[^,]+(?=\))/, '1');
}
}

  }




  render(){
    const {classes} = this.props;
    var historyOfNumbers=this.props.num+1;
    var div='';
    return(
      <div className={classes.inlineBlocks}  >
    {
      arrOfNum.map((val,i)=>{
        if(!i==0)
        {
        historyOfNumbers+=8;
      }

          return(
               <div key={historyOfNumbers+"i"}
               className={classes.rounded}
               style={{border:"4px solid rgb(99,99,99)",color:'rgb(99,99,99)'}}
                 onClick={(e)=>{this.handleBallPick(e, this.props.color)}}
                 name={historyOfNumbers}
               >
                      <span
                        key={historyOfNumbers+"h"}
                        className={classes.middle}
                        name={historyOfNumbers}
                        >
                        {historyOfNumbers}
                      </span>
                </div>
               )
      })
    }
    <div name={this.props.color} className={classes.roundColor} style={{border:'2px solid ' +this.props.color.replace(/[^,]+(?=\))/, '0.9'), margin:'2px 0 0 0px'}} onClick={(e)=>{this.selectAll(e, this.props.color)}}> </div>
</div>
  );
  }

}

export default withStyles(styles)(BallLayout);
