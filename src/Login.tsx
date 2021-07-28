import React, { useState } from "react";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import { Button } from '@rmwc/button';
import '@material/button/dist/mdc.button.css';
// import '@material/textfield/dist/mdc.textfield.css';

import { auth } from "./firebase";
// import { FormField, TextField } from "rmwc";
import '@rmwc/textfield/styles';
import { TextField } from "@rmwc/textfield";
import { useHistory } from "react-router-dom"

// import "./Signin.scss";

function Login() {
    let history = useHistory();
    const [user, setUser] = useState<{ email: string; password: string }>({
        email: "",
        password: "",
    });

    const onChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;

        setUser({ ...user, [name]: value });
    };

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const { email, password } = user;
        const result = await auth.signInWithEmailAndPassword(email, password);
        console.log(result, 'result')
        if (result) {
            history.push({
                pathname: '/todo-form',
                state: {
                    data: "result",
                }
            });
        }
        setUser({
            email: "",
            password: "",
        });
    };
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <TextField
                    label="Email"
                    // outlined
                    // variant="outlined"
                    fullwidth
                    name="email"
                    onChange={onChange}
                />
                <TextField
                    label="Password"
                    // outlined
                    // variant="outlined"
                    fullwidth
                    name="password"
                    onChange={onChange}
                    type="password"
                />
                <Button type="submit" label="Login" raised>
                </Button>
            </form>
        </div>
    );
};

export default Login;