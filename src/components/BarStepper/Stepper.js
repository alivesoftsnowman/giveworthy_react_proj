import React, { PureComponent } from 'react';
import Step from './Step';
import { hot } from 'react-hot-loader';



export class Stepper extends PureComponent {

  render() {
    const { 
        steps
    } = this.props;
    const styles = {
        root:{
            flexDirection:'row',
            width:"100%",
            display:"flex",
            marginTop:50
        }
    }
    return (
      <div style={styles.root}>
        {steps.map((stepActive, index)=>{
            return(
                <Step active={stepActive} key={index} flexGrow={steps.length} />
            )
        })}
      </div>
    );
  }
}

export default hot(module)(Stepper);