import React, { useState } from "react";
import { Button } from '@rmwc/button';
import '@material/button/dist/mdc.button.css';
import { auth } from "./firebase";
import '@rmwc/textfield/styles';
import { TextField } from "@rmwc/textfield";
import { useHistory } from "react-router-dom";
import '@rmwc/card/styles';
import { Card } from "@rmwc/card";


function Login() {
    let history = useHistory();
    const [user, setUser] = useState<{ email: string; password: string }>({
        email: "",
        password: "",
    });

    const onChange = (e: any) => {
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
        <div style={{ display: "flex", justifyContent: "center", margin: "40px" }}>
            <Card style={{ width: '60rem' }}>
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <TextField
                        label="Email"
                        fullwidth
                        name="email"
                        onChange={(e) => onChange(e)}
                    />
                    <TextField
                        label="Password"
                        fullwidth
                        name="password"
                        onChange={(e) => onChange(e)}
                        type="password"
                    />
                    <div style={{ display: "flex", justifyContent: "center", margin: "40px" }}>
                        <Button type="submit" label="Login" raised>
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Login;