import React from "react";
import {useForm} from "react-hook-form";
import Logo from "../../assets/logo1.png";
import {Button, TextField} from "@material-ui/core";

const VerifyCode = (props) => {

    return (<div className=" ipad vh-100 center background   ">
            <div className="col-md-3  box ipad2  ">
                <div>
                    <div className="center ">
                        <img src={Logo} alt="logo"/>
                    </div>
                    <h1 className="text  mb-2 justify-content-center">
                        Verify Code
                    </h1>
                    <div className="center">
                        <form onSubmit={props.onSubmit} id="TestForm" data-test="submit-button">
                            <TextField
                                name="code"
                                error={props.error}
                                label="Entre Activation code"
                                inputRef={props.inputRef}
                                value={props.code}
                                helperText={props.helperText}
                                type="text"
                                fullWidth
                                autocompleted="false"
                                size="small"
                                onChange={props.onChange}
                                variant="filled"
                                margin="normal"
                                id="input"
                                className="background_input"

                            />
                            <div className="center">
                                <Button
                                    type="submit"
                                    id="submit"
                                    className="btn-color mt-4"
                                    variant="contained"
                                >
                                    Verify Code
                                </Button>

                            </div>
                            <div className="center">
                                <Button
                                    type="submit"

                                    id="submit"
                                    onClick={props.cancel}
                                    className="btn-color mt-4"
                                    variant="contained"
                                >
                                    Cancel
                                </Button>

                            </div>
                            <hr/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VerifyCode;