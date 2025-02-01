import React, {useEffect, useState,} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Snackbar, Stack} from "@mui/material";
import CustomDialog from "./components/CustomDialog";
import CustomTextField from "./components/CustomTextField";
import {lightBlue} from "@mui/material/colors";

export default function App(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [logIn, setLogIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [userSubmitted, setUserSubmitted] = useState(false);
    const [userRegistered, setUserRegistered] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    /*    useEffect(() => {
            if (location.pathname === "/room") {
                navigate("/");
            }
        }, [location, navigate]);*/

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            // Установите токен в заголовки для последующих запросов
            fetch('http://localhost:8080/auth/get', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Unauthorized');
                    }
                })
                .then(data => {
                    console.log('Protected data:', data);
                    setUsername(data.username);
                    setUserSubmitted(true);
                })
                .catch(error => {
                    console.log('Token expired, please log in again.');
                    localStorage.removeItem('jwtToken')
                });
        }
    }, []);

    // Hook to show Successful registration message for 5 seconds.
    useEffect(() => {
        if (userRegistered) {
            const timer = setTimeout(() => {
                setUserRegistered(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [userRegistered]);

    /**
     * Function to check user input for logging in.
     * @param {string} userInput - username
     * @param {string} passwordInput - password
     */
    async function checkLogInInput(userInput, passwordInput) {
        try {
            const response = await loginUser(userInput, passwordInput);

            if (response) {
                setLogIn(false); // close dialog
                setUserSubmitted(true); // indicate that user authorized
                setPassword("");
                localStorage.setItem('jwtToken', response.token);
            }
        } catch (error) {
            console.error("Error during authorization:", error);
            if (error.message === "no user found with such username") {
                setUsernameError(error.message);
                setPasswordError("")
            } else if (error.message === "password is incorrect") {
                setUsernameError("");
                setPasswordError(error.message)
            } else {
                setUsernameError("must be not blank string");
                setPasswordError("must be between 8-64 characters and contain uppercase letter, lowercase letter, number and special character");
            }
        }
    }

    /**
     * Function to check user input for signing up.
     * @param {string} userInput - username
     * @param {string} passwordInput - password
     */
    async function checkSignUpInput(userInput, passwordInput) {
        try {
            const response = await registerUser(userInput, passwordInput);

            if (response) {
                setSignUp(false); // close dialog
                setUserRegistered(true); // indicate that user has registered
                setPassword("");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.message === "username is already in use") {
                setUsernameError(error.message);
                setPasswordError("")
            } else {
                setUsernameError("must be not blank string");
                setPasswordError("must be between 8-64 characters and contain uppercase letter, lowercase letter, number and special character");
            }
        }
    }

    /**
     * Function to send Login HTTP POST request.
     * @param {string} username
     * @param {string} password
     * @returns {Promise<Object>} - Response from the server (with token in body)
     */
    async function loginUser(username, password) {
        console.log("Login request");

        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        });

        const responseBody = await response.json();
        if (!response.ok) {
            throw new Error(responseBody.error || 'Unknown error occurred');
        }
        return responseBody;
    }

    /**
     * Function to send Register HTTP POST request.
     * @param {string} username
     * @param {string} password
     * @returns {Promise<Object>} - Response from the server
     */
    async function registerUser(username, password) {
        console.log("Register request");

        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        });

        const responseBody = await response.json();
        if (!response.ok) {
            throw new Error(responseBody.error || 'Unknown error occurred');
        }
        return responseBody;
    }

    return (
        <>
{/*            {location.pathname === "/game-options"  && usernameSubmitted ? <div className="bg"></div> : <div className="bg-main"></div>}
            <Layout>
                <Routes>
                    <Route key={true} path='/' element={usernameSubmitted ? <Home username={username} wins={wins}/> : <> </>} />;
                    <Route path='/rules' element={usernameSubmitted ? <Rules username={username}/> : <> </>} />;
                    <Route path='/game-options' element={usernameSubmitted ? <InitGame username={username}/> : <> </>} />;
                    <Route path='/game-room' element={usernameSubmitted ? <GameOptions username={username}/> : <> </>} />;
                </Routes>
            </Layout>*/}
            {userSubmitted ? <></> :
                <div className="start-content">
                    <div>
                        <Stack
                            // Parameters for main content of start page.
                            sx={{
                                height: '100vh',
                                justifyContent: 'center',
                                alignItems: 'center',
                                py: 1,
                            }}
                        >
                            <CustomDialog // Login Dialog.
                                open={logIn} // leave open if username or password has not been selected
                                title="Log In"
                                contentText=""
                                handleContinue={() => { // fired when Continue is clicked
                                    if (!username || !password) return; // if username or password hasn't been entered, do nothing
                                    checkLogInInput(username, password);
                                }}
                                handleClose={() => { // fired when Close is clicked
                                    setLogIn(false);
                                    setUsername("");
                                    setPassword("");
                                }}
                            >
                                <CustomTextField  // Input for username.
                                    autoFocus // automatically set focus on input (make it active).
                                    margin="dense"
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={username}
                                    required
                                    onChange={(e) => setUsername(e.target.value)} // update username state with value
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    error={Boolean(usernameError)}
                                    helperText={
                                        !usernameError ? "must be not blank string" : `${usernameError}`
                                    }
                                />
                                <CustomTextField  // Input for password.
                                    margin="dense"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)} // update password state with value
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                    error={Boolean(passwordError)}
                                    helperText={
                                        !passwordError ? "must be between 8-64 characters and contain uppercase letter, lowercase letter, number and special character" : `${passwordError}`
                                    }
                                />
                            </CustomDialog>
                            <CustomDialog // Sign up Dialog.
                                open={signUp} // leave open if username or password has not been selected
                                title="Sign Up"
                                contentText=""
                                handleContinue={() => { // fired when Continue is clicked
                                    if (!username || !password) return; // if username or password hasn't been entered, do nothing
                                    checkSignUpInput(username, password);
                                }}
                                handleClose={() => { // fired when Close is clicked
                                    setSignUp(false);
                                    setUsername("");
                                    setPassword("");
                                }}
                            >
                                <CustomTextField  // Input for username.
                                    autoFocus // automatically set focus on input (make it active).
                                    margin="dense"
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={username}
                                    required
                                    onChange={(e) => setUsername(e.target.value)} // update username state with value
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    error={Boolean(usernameError)}
                                    helperText={
                                        !usernameError ? "must be not blank string" : `${usernameError}`
                                    }
                                />
                                <CustomTextField  // Input for password.
                                    margin="dense"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)} // update password state with value
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                    error={Boolean(passwordError)}
                                    helperText={
                                        !passwordError ? "must be between 8-64 characters and contain uppercase letter, lowercase letter, number and special character" : `${passwordError}`
                                    }
                                />
                            </CustomDialog>

                            <Button
                                className="sgn-btn"
                                sx={{ // Button to Log In.
                                    fontFamily: 'Roboto, monospace',
                                    fontSize: '150%',
                                    fontWeight: 'bold',
                                    color: lightBlue["50"],
                                    backgroundColor: '#202020',
                                    "&:hover": {color: '#f0f0f0', backgroundColor: '#5fbfcc'}
                                }}
                                variant="text"
                                onClick={() => {
                                    setLogIn(true);
                                }}>
                                Log in
                            </Button>
                            <br/>
                            <Button
                                className="sgn-btn"
                                sx={{ // Button to Sign Up.
                                    fontFamily: 'Roboto, monospace',
                                    fontSize: '150%',
                                    fontWeight: 'bold',
                                    color: lightBlue["50"],
                                    backgroundColor: '#202020',
                                    "&:hover": {color: '#f0f0f0', backgroundColor: '#5fbfcc'}
                                }}
                                variant="text"
                                onClick={() => {
                                    setSignUp(true);
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Snackbar
                            ContentProps={{
                                style: {
                                    backgroundColor: '#303030', // Задайте желаемый цвет фона
                                    color: '#f0f0f0', // Задайте желаемый цвет текста
                                    fontFamily: 'Roboto, monospace',
                                    fontSize: '110%',
                                    fontWeight: 'bold',
                                    boxShadow: '0 0 10px #000000',
                                },
                            }}
                            open={userRegistered}
                            autoHideDuration={5000}
                            onClose={() => setUserRegistered(false)}
                            message="Registration successful. You can authorize now!"
                        />
                    </div>
                </div>
            }
        </>
    );
}
