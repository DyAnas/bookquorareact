import React from 'react';
import Logo from "../../assets/logo1.png"
import '../../Styles/LoginStyle.css';
import {useForm} from "react-hook-form";
import AuthService from '../../service/Authentication/authUser';
import {Link, TextField} from "@material-ui/core";
import validateEmail from "../../Component/Login/ValidateEmail"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInContainer = (props) => {

    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    // useForm to control form
    const { register, handleSubmit, errors } = useForm();
    // dialog handle
    const [message, setMessage] = React.useState({
        text: "",
        title: ""
    });
    const signIn = () => {
        setTimeout(() => {
            props.history.push("/newBooking");
        }, 2000);
        setLoading(true);
    }

    // handle submit form
    const onSubmit = () => {
        setMessage({
            text: "",

        })

        // check validation before call api
        if (validateEmail(email)) {
            AuthService.login(email, password).then(
                () => {

                    signIn();

                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    if (error.response.status===401) {
                        toast.error("Incorrect email or password", {
                            position: "top-center",
                            autoClose: 8000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }
                    else if (error.response.status===404) {


                        toast.error("Email is not registered", {
                            position: "top-center",
                            autoClose: 8000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }else if(error.response.status===400){


                        toast.info("Email is not actived,", {
                            position: "top-center",
                            autoClose: 8000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        setshowConfirmation(true)
                    }

                    else {
                        toast.error(Response.message, {
                            position: "top-center",
                            autoClose: 8000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }

                }
            );
        } else {
            toast.error("Email must match tietoEvry", {
                position: "top-center",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }//Authentication
    }
    // handle if email is not active
    const resendActivation = () => {
        setMessage({
            text: "",

        })
        setLoading(true);
        AuthService.ResendActivation(email).then(

            Response => {
                setLoading(false)
                toast.success(Response.message, {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
        setshowConfirmation(false);

    }
    const [showConfirmation, setshowConfirmation] = React.useState(false);

    return (<div className=" ipad vh-100 center background   " >
        <div className="col-md-3  box ipad2  ">
            <div>
                <div className="center ">
                    <img src={Logo} alt="logo" />
                </div>

                <div className="mt-2">
                    <h1 className="text  mb-2 justify-content-center">
                        Sign In
                    </h1>
                </div>


                <div className="center">
                    <p id="errorMessage" name="errorMessage" style={{ color: "red" }}>{message.text}
                        {showConfirmation &&
                            <Link style={{ margin: "10px" }} to="#" onClick={resendActivation}>Resend activation </Link>
                        }
                    </p>
                    <ToastContainer
                        position="top-center"
                        autoClose={8000}/>

                </div>
                <div className="center">
                    <form style={{ width:"85%"}} onSubmit={handleSubmit(onSubmit)} id="TestForm" data-test="submit-button" >
                        <TextField
                            name="email"
                            error={!!errors.email}
                            label="Email"
                            inputRef={register({
                                required: "Required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                                    message: "Invalid email"
                                }
                            })}
                           // value={email}
                            helperText={errors.email ? errors.email.message : ""}
                            type="email"
                            fullWidth
                            autocompleted="false"
                            size="small"
                            onChange={e => setEmail(e.target.value)}
                            variant="filled"
                            margin="normal"
                            id="input"
                            className="background_input"

                        />

                        <TextField
                            name="password"
                            error={!!errors.password}
                            label="Password"
                            size="small"
                            inputRef={register({
                                required: "Required",
                                pattern: {
                                    value: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
                                    message: "Must Contain 8 Characters, One Uppercase, One Number and one special character"
                                }
                            })}
                            helperText={errors.password ? errors.password.message : ""}
                            type="password"
                            fullWidth
                            // value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="background_input"
                            variant="filled"
                            margin="normal"
                            id="password"

                        />

                        <div className="center">
                            <button
                                type="submit"
                                id="submit"
                                className="btn btn-info pr-4 pl-4 mt-2 text-light "
                                variant="contained"
                            >
                                Sign In
                            </button>
                        </div>
                        {loading ?
                            <div className="mt-2">
                                <div className="spinner-grow spinner-grow-sm text-info ml-1" role="status">
                                </div>
                                <div className="spinner-grow spinner-grow-sm text-info ml-1" role="status">
                                </div>
                                <div className="spinner-grow spinner-grow-sm text-info ml-1" role="status">
                                </div>
                            </div>
                            : null}
                        <hr />

                    </form>
                </div>
                <div className="d-flex flex-column mb-5 ">
                    <Link id="forgetPassword" href="/forgotPassword" variant="body2" className="text-footer">
                        Forgot password?
                        </Link>
                   
                    <Link href="/signup" variant="body2" className="text-footer" style={{marginTop:"10px"}}>
                        Don't have an account? Sign Up
                        </Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SignInContainer;