/* eslint-disable */
import React from 'react';
import Input from '@material-ui/core/Input';
/* eslint-enable */
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {  CardNumberElement, CardCVCElement, CardExpiryElement} from 'react-stripe-elements';
const styles = {
    borderBottom: {
        borderBottom:"1px solid rgba(0,0,0,0.42)",
        padding: "6px 0 7px"
    }
}
export default class StripeElemntValidator extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            error:undefined,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = event => {
        this.setState({
            error:event.error,
        });
        const {
            type,
            onChangeCallback
        } = this.props;
        onChangeCallback(type, event);
    };
    render() {
        /* eslint-disable no-unused-vars */
        const {
            type,
            onChangeCallback,
            ...rest
        } = this.props;
        return (
            <FormControl style={{width:"100%"}} >
                <div style={styles.borderBottom}>
                    {type=="cardnumber"&&
                        <CardNumberElement
                            {...rest}
                            style={{base: {fontSize: '16px'}}}
                            onChange={this.handleChange}
                        />
                    }
                    {type=="cardexpiry"&&
                        <CardExpiryElement
                            {...rest}
                            style={{base: {fontSize: '16px'}}}
                            onChange={this.handleChange}
                        />
                    }
                    {type=="cardcvc"&&
                        <CardCVCElement
                            {...rest}
                            style={{base: {fontSize: '16px'}}}
                            onChange={this.handleChange}
                        />
                    }
                </div>
                <FormHelperText 
                    error={this.state.error?true:false}>
                    {this.state.error?this.state.error.message:""}
                </FormHelperText>
            </FormControl>   
        );
    }
}