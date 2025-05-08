import React, {useEffect, useState} from 'react';
import {Button, Stack} from "@mui/material";
import {lightBlue} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";

/**
 * Functional component that describes Home page.
 */
export default function HomePageComponent(props) {
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const onToRules = () => {
        console.log("Route to Rules");
        navigate("/rules");
    };

    const onToAbout = () => {
        console.log("Route to About");
        navigate("/about");
    };

    const onToLobby = () => {
        console.log("Route to Lobby");
        navigate("/lobby");
    };

    useEffect(() => {
        setUsername(props.username);
    }, [props.username]);

    return (
        <>
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
                        <Button // Button to Join a game.
                            className="menu-btn"
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
                                onToLobby();
                            }}>
                            Играть
                        </Button>
                        <br/>
                        <Button // Button to Read rules.
                            className="menu-btn"
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
                                onToRules();
                            }}>
                            Правила
                        </Button>
                        <br/>
                        <Button // Button to Check Game info.
                            className="menu-btn"
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
                                onToAbout();
                            }}>
                            Об игре
                        </Button>
                    </Stack>
                </div>
            </div>
        </>
    );
}
