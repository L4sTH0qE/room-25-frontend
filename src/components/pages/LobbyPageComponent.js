import {Button, Stack} from "@mui/material";
import {lightBlue} from "@mui/material/colors";
import React from "react";
import {useNavigate} from "react-router-dom";

/**
 * Functional component that describes Lobby main page.
 */
export default function LobbyPageComponent() {

    const navigate = useNavigate();

    const onToLobbyCreate = () => {
        localStorage.setItem('createByButton', '1');
        navigate("/lobby/create");
    };

    const onToLobbyJoin = () => {
        localStorage.setItem('joinByButton', 'true');
        navigate("/lobby/join");
    };

    const onToHome = () => {
        navigate("/");
    };

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
                                onToLobbyCreate()
                            }}>
                            Создать лобби
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
                                onToLobbyJoin()
                            }}>
                            Присоединиться к лобби
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
                                onToHome();
                            }}>
                            Вернуться в меню
                        </Button>
                    </Stack>
                </div>
            </div>
        </>
    );
}