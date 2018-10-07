import React from "react"
import {Button, FormControl, FormHelperText, IconButton, InputAdornment, TextField, withStyles} from "@material-ui/core"
import {Visibility, VisibilityOff} from "@material-ui/icons"
import classNames from "classnames"
import PropTypes from "prop-types"
import Validator from "validator"

const styles = theme => ({
    textField: {
        flexBasis: 200
    },
    margin: {
        margin: theme.spacing.unit
    },
    loginForm: {
        display: "flex",
        flexWrap: "wrap"
    }
})

class LoginForm extends React.Component {
    state = {
        data: {},
        loading: false,
        errors: {},
        showPassword: false
    }

    onSubmit = () => {
        const errors = this.validate(this.state.data)
        this.setState({errors},
            () => {
            if (Object.keys(errors).length === 0){
                this.props.submit(this.state.data)
            }
        })
    }

    handleChange = e => {
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        })
    }

    handleShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword})
    }

    validate = (data) => {
        const errors = {}
        if (!data.email) {
            errors.email = "Can't be blank"
        } else if (!Validator.isEmail(data.email)) errors.email = "Invalid email"
        if (!data.password) errors.password = "Can't be blank"
        return errors
    }

    render() {
        const {classes} = this.props
        const {data, errors} = this.state
        return (
            <div className={classes.loginForm}>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                    <TextField
                        label="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        placeholder="example@example.com"
                        value={data.email === undefined ? "" : data.email}
                        onChange={this.handleChange}
                        error={!!errors.email}
                    />
                    {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                </FormControl>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                    <TextField
                        label="password"
                        name="password"
                        type={this.state.showPassword ? "text" : "password"}
                        autoComplete="password"
                        margin="normal"
                        variant="outlined"
                        value={data.password === undefined ? "" : data.password}
                        onChange={this.handleChange}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton onClick={this.handleShowPassword}>
                                        {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                        }}
                        error={!!errors.password}
                    />
                    {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                </FormControl>
                <Button onClick={this.onSubmit}>Login</Button>
            </div>
        )
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line
    submit: PropTypes.func.isRequired
}

export default withStyles(styles)(LoginForm)