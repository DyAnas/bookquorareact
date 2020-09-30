import React, {useState}from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Logo from "../../assets/logo1.png"
import './StyleSignIn.css';
import * as Mui from '@material-ui/core';
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {ErrorMessage} from "@hookform/error-message";



function SignIn(props)   {
    const   schema = Yup.object().shape({
        email: Yup.string().matches().required(),
        password: Yup.string().matches().required('Password is required'),

    })
    const { register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    });
   const classes = makeStyles(theme => ({
        paper: {
            marginTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(3),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },


    }));
    const signup=()=> {
         props.history.push('signup');
     }

    const onSubmit=(e) =>{
        e.preventDefault()//blocks the postback event of the page
        console.log('email: '+email)
        console.log('password: '+password)
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div className="root"  >
            <div className="row">
                <div className="col-md-6 mt-5">
                    <Mui.Container  maxWidth="xs" >
            <Mui.CssBaseline/>
            <div className={classes.paper}>
                <div className="item1">
                    <img src={Logo}/>
                </div>

                <Mui.Typography className="text mt-5  justify-content-center">
                    Sign in
                </Mui.Typography>


                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Mui.TextField
                        inputRef={register}
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        label="E-post"
                        name="email"
                        autoComplete="email"
                        className="background_input"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        error={errors.email ? true : false}
                    />
                    <ErrorMessage errors={errors} name="email" />
                    <Mui.TextField
                        inputRef={register}
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        className="background_input"
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={errors.email ? true : false}
                    />
                    <ErrorMessage errors={errors} name="email" />
                    <Mui.FormControlLabel
                        control={<Mui.Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <br/>
                    <Mui.Button
                        type="submit"
                        variant="contained"
                        className="btn-submit mt3"
                    >
                        Sign In
                    </Mui.Button>
                    <br/>
                    <hr/>
                    <Mui.Grid container>
                        <Mui.Grid item xs>
                            <Mui.Link href="#" variant="body2">
                                Forgot password?
                            </Mui.Link>
                        </Mui.Grid>
                            <Mui.Grid item>
                                <Mui.Link href="#" onClick={signup} variant="body2">
                                    Don't have an account? Sign Up
                                </Mui.Link>
                            </Mui.Grid>

                    </Mui.Grid>
                </form>
            </div>
            <Mui.Box mt={4}>

            </Mui.Box>
        </Mui.Container>
                </div>
                <div className="col-md-6 item2 ">

                        <div className="">
                            <img src={Logo}/>
                        </div>

                </div>
            </div>
        </div>
    );

}

export default SignIn;