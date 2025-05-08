import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Stack} from "@mui/material";
import {lightBlue} from "@mui/material/colors";

/**
 * Functional component that describes Game page.
 */
export default function GamePageComponent(props) {

    const navigate = useNavigate();

    const onToHome = () => {
        navigate("/");
    };

    return (
        <>
            <div className="start-content">
                <Stack
                    // Parameters for main content of start page.
                    sx={{
                        height: '100vh',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 1,
                    }}
                >
                    <Button
                        className="start-game-btn"
                        sx={{
                            fontFamily: 'Roboto, monospace',
                            fontSize: '130%',
                            fontWeight: 'bold',
                            color: lightBlue[50],
                            backgroundColor: '#202020',
                            "&:hover": {color: '#f0f0f0', backgroundColor: '#5fbfcc'},
                            px: 4,
                            py: 1,
                            my: 2
                        }}
                        onClick={() => {
                            console.log("Route to Home");
                            onToHome();
                        }}
                    >
                        Вернуться в меню
                    </Button>
                </Stack>
            </div>
        </>
    );
}
