import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';



const styles = theme => ({
  rounded: {
    borderRadius:50,
    height:60,
    width:60,
    textAlign:'center',
    position: 'relative',
    display:'inline-block',
    marginTop:4,
    marginLeft:'4%',
    float:'left'
  },
  rounded2: {
    borderRadius:50,
    height:60,
    width:60,
    textAlign:'center',
    position: 'relative',
    display:'inline-block',
  },
  middle:{
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize:30,
    '&:hover':{
      fontSize:38,
      fontWeight:'bold'
    }
  },
  middle2:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize:30,

  },
})


class Game extends Component {


  render(){
    const{classes}=this.props;


    return (
      <div>

{/*
  this.props.arrayOfNumbers.map(a=>{
  color  = (colors[Math.floor(a%8-1)]==undefined) ? "rgba(2, 0, 0, 0.4)" : colors[Math.floor(a%8-1)];
    console.log(a);
  return ( */
}
{
  this.props.prop!==undefined &&
  <div className={classes.rounded2} style={{border:"4px solid "+this.props.color.replace(/[^,]+(?=\))/, '0.9'), background:this.props.color, color:this.props.color.replace(/[^,]+(?=\))/, '0.9'), marginTop:'20%' }} >
        <span className={classes.middle2} style={{marginLeft:'25%'}}>{this.props.num}</span>
        </div>
}
{
  this.props.prop==undefined &&
  <div className={classes.rounded} style={{border:"4px solid "+this.props.color.replace(/[^,]+(?=\))/, '0.9'), background:this.props.color, color:this.props.color.replace(/[^,]+(?=\))/, '0.9')}} >
        <span className={classes.middle}>{this.props.num}</span>
        </div>
}

{
  /*
)
    })
  }
  */
}


</div>
    );
  }
}

export default withStyles(styles)(Game);
