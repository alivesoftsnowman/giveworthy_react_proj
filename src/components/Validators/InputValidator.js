/* eslint-disable */
import React from 'react';
import Input from '@material-ui/core/Input';
/* eslint-enable */
import { ValidatorComponent } from 'react-form-validator-core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export default class InputValidator extends ValidatorComponent {
    
    render() {
        /* eslint-disable no-unused-vars */
        const {
            error,
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            withRequiredValidator,
            formControlStyle,
            inputLabel,
            ...rest
        } = this.props;
        const { isValid } = this.state;
        return (
            <FormControl style={formControlStyle} >
                <InputLabel>{inputLabel}</InputLabel>
                <Input
                    {...rest}
                    error={!isValid || error}
                />
                <FormHelperText 
                    error={!isValid || error}>
                    {(!isValid && this.getErrorMessage()) || helperText}
                </FormHelperText>
            </FormControl>   
        );
    }
}