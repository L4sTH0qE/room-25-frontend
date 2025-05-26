import React, {useEffect, useState,} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {Button, Snackbar, Stack} from "@mui/material";
import CustomDialog from "./components/CustomDialog";
import CustomTextField from "./components/CustomTextField";
import {lightBlue} from "@mui/material/colors";
import HomePageComponent from "./components/pages/HomePageComponent";
import logoutIcon from './assets/images/icons/logout.png'
import AboutPageComponent from "./components/pages/AboutPageComponent";
import RulesPageComponent from "./components/pages/RulesPageComponent";
import LobbyPageComponent from "./components/pages/LobbyPageComponent";
import LobbyCreatePageComponent from "./components/pages/LobbyCreatePageComponent";
import LobbyJoinPageComponent from "./components/pages/LobbyJoinPageComponent";
import GamePageComponent from "./components/pages/GamePageComponent";

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

    // User log out function.
    const logout = () => {
        localStorage.removeItem('jwtToken');
        setUserSubmitted(false);
        navigate("/");
    };

    const onToHome = () => {
        navigate("/");
    };

    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, []);

    // Hook to get user jwtToken from local storage or check whether there is no one.
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            // Установите токен в заголовки для последующих запросов
            fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/get`, {
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
            if (error.message === "пользователь с таким логином не найден") {
                setUsernameError("пользователя с таким ником не существует");
                setPasswordError("")
            } else if (error.message === "неверный пароль") {
                setUsernameError("");
                setPasswordError("неверный пароль")
            } else {
                setUsernameError("не должен быть пустой строкой и содержать буквы, отличные от латинских");
                setPasswordError("должен быть длиной от 8 до 64 символов и содержать строчную и заглавную латинские буквы, цифру и специальный символ");
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
            if (error.message === "логин занят") {
                setUsernameError("данный ник уже занят");
                setPasswordError("")
            } else {
                setUsernameError("не должен быть пустой строкой и содержать буквы, отличные от латинских");
                setPasswordError("должен быть длиной от 8 до 64 символов и содержать строчную и заглавную латинские буквы, цифру и специальный символ");
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

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
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

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
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
            <Routes>
                <Route key={true} path='/' element={userSubmitted ? <HomePageComponent username={username}/> : <> </>}/>;
                <Route path='/rules' element={userSubmitted ? <RulesPageComponent/> : <> </>}/>;
                <Route path='/about' element={userSubmitted ? <AboutPageComponent/> : <> </>}/>;
                <Route path='/lobby' element={userSubmitted ? <LobbyPageComponent username={username}/> : <> </>}/>;
                <Route path='/lobby/create'
                       element={userSubmitted ? <LobbyCreatePageComponent username={username}/> : <> </>}/>;
                <Route path='/lobby/join'
                       element={userSubmitted ? <LobbyJoinPageComponent username={username}/> : <> </>}/>;
                <Route path='/game/:id' element={userSubmitted ? <GamePageComponent username={username}/> : <> </>}/>;
            </Routes>
            {userSubmitted && !location.pathname.startsWith("/game") ?
                <div>
                    <button className="logout-btn" onClick={logout}>
                        <img src={logoutIcon} alt={'Log Out'}/>
                    </button>
                    <p className="logout-msg">{username}</p>
                </div> : !userSubmitted ?
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
                                    title="Войти"
                                    contentText=""
                                    handleContinue={() => { // fired when Continue is clicked
                                        if (!username || !password) return; // if username or password hasn't been entered, do nothing
                                        checkLogInInput(username, password);
                                    }}
                                    handleClose={() => { // fired when Close is clicked
                                        setLogIn(false);
                                        setUsername("");
                                        setPassword("");
                                        setUsernameError("");
                                        setPasswordError("");
                                    }}
                                >
                                    <CustomTextField  // Input for username.
                                        autoFocus // automatically set focus on input (make it active).
                                        margin="dense"
                                        id="username"
                                        label="Ник пользователя"
                                        name="username"
                                        value={username}
                                        required
                                        onChange={(e) => setUsername(e.target.value)} // update username state with value
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(usernameError)}
                                        helperText={
                                            !usernameError ? "не должен быть пустой строкой и содержать буквы, отличные от латинских" : `${usernameError}`
                                        }
                                    />
                                    <CustomTextField  // Input for password.
                                        margin="dense"
                                        id="password"
                                        label="Пароль"
                                        name="password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)} // update password state with value
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(passwordError)}
                                        helperText={
                                            !passwordError ? "должен быть длиной от 8 до 64 символов и содержать строчную и заглавную латинские буквы, цифру и специальный символ" : `${passwordError}`
                                        }
                                    />
                                </CustomDialog>
                                <CustomDialog // Sign up Dialog.
                                    open={signUp} // leave open if username or password has not been selected
                                    title="Зарегистрироваться"
                                    contentText=""
                                    handleContinue={() => { // fired when Continue is clicked
                                        if (!username || !password) return; // if username or password hasn't been entered, do nothing
                                        checkSignUpInput(username, password);
                                    }}
                                    handleClose={() => { // fired when Close is clicked
                                        setSignUp(false);
                                        setUsername("");
                                        setPassword("");
                                        setUsernameError("");
                                        setPasswordError("");
                                    }}
                                >
                                    <CustomTextField  // Input for username.
                                        autoFocus // automatically set focus on input (make it active).
                                        margin="dense"
                                        id="username"
                                        label="Ник пользователя"
                                        name="username"
                                        value={username}
                                        required
                                        onChange={(e) => setUsername(e.target.value)} // update username state with value
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(usernameError)}
                                        helperText={
                                            !usernameError ? "не должен быть пустой строкой и содержать буквы, отличные от латинских" : `${usernameError}`
                                        }
                                    />
                                    <CustomTextField  // Input for password.
                                        margin="dense"
                                        id="password"
                                        label="Пароль"
                                        name="password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)} // update password state with value
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(passwordError)}
                                        helperText={
                                            !passwordError ? "должен быть длиной от 8 до 64 символов и содержать строчную и заглавную латинские буквы, цифру и специальный символ" : `${passwordError}`
                                        }
                                    />
                                </CustomDialog>
                                <Button // Button to Log In.
                                    className="main-btn"
                                    sx={{
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
                                    Войти
                                </Button>
                                <br/>
                                <Button // Button to Sign Up.
                                    className="main-btn"
                                    sx={{
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
                                    Зарегистрироваться
                                </Button>
                            </Stack>
                            <Snackbar // Sign Up snackbar
                                ContentProps={{
                                    style: {
                                        backgroundColor: '#303030',
                                        color: '#f0f0f0',
                                        fontFamily: 'Roboto, monospace',
                                        fontSize: '110%',
                                        fontWeight: 'bold',
                                        boxShadow: '0 0 10px #000000',
                                    },
                                }}
                                open={userRegistered}
                                autoHideDuration={5000}
                                onClose={() => setUserRegistered(false)}
                                message="Регистрация прошла успешно. Теперь вы можете войти!"
                            />
                        </div>
                    </div> : <div></div>
            }
        </>
    );
}
