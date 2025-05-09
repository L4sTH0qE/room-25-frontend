import React, {useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Slider,
    Snackbar,
    ToggleButton,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";

import frankIcon from '../../assets/images/characters/frank/FRANK_TOKEN.png'
import kevinIcon from '../../assets/images/characters/kevin/KEVIN_TOKEN.png'
import maxIcon from '../../assets/images/characters/max/MAX_TOKEN.png'
import emmettIcon from '../../assets/images/characters/emmett/EMMETT_TOKEN.png'
import aliceIcon from '../../assets/images/characters/alice/ALICE_TOKEN.png'
import jenniferIcon from '../../assets/images/characters/jennifer/JENNIFER_TOKEN.png'
import {lightBlue} from "@mui/material/colors";


const modes = [
    {value: "COOP", label: "Кооперация"},
    {value: "SUSPECT", label: "Подозрение"}
];
const difficulties = [
    {value: "EASY", label: "Легко"},
    {value: "MEDIUM", label: "Средне"},
    {value: "HARD", label: "Сложно"}
];
const characters = [
    {name: "Франк", img: frankIcon, nick: "frank"},
    {name: "Кевин", img: kevinIcon, nick: "kevin"},
    {name: "Макс", img: maxIcon, nick: "max"},
    {name: "Эммет", img: emmettIcon, nick: "emmett"},
    {name: "Алиса", img: aliceIcon, nick: "alice"},
    {name: "Дженнифер", img: jenniferIcon, nick: "jennifer"}
];

/**
 * Functional component that describes Create lobby page.
 */
export default function LobbyCreatePageComponent() {
    const [openLobbyCreate, setOpenLobbyCreate] = useState(true);
    const [createLobbyError, setCreateLobbyError] = useState(false);
    const [mode, setMode] = useState("COOP");
    const [difficulty, setDifficulty] = useState("EASY");
    const [players, setPlayers] = useState(4);
    const [character, setCharacter] = useState(characters[0].name);
    const [characterName, setCharacterName] = useState(characters[0].nick);

    const navigate = useNavigate();

    const onToLobby = () => {
        setOpenLobbyCreate(false);
        navigate("/lobby");
    };

    async function handleCreate() {
        try {
            const response = await createLobby(mode, difficulty, players, characterName);

            if (response) {
                setOpenLobbyCreate(false); // close dialog
                navigate(`/game/${response.id}`)
            }
        } catch (error) {
            console.error("Error during lobby creation:", error);
            setOpenLobbyCreate(false); // close dialog
            setCreateLobbyError(true);
        }
    }

    async function createLobby(mode, difficulty, players, characterName) {
        console.log("Create lobby request");
        const token = localStorage.getItem('jwtToken');

        const response = await fetch('http://localhost:8080/room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                gameMode: mode,
                difficulty: difficulty,
                numberOfPlayers: players,
                character: characterName
            })
        });

        const responseBody = await response.json();
        if (!response.ok) {
            throw new Error('unknown error occurred');
        }
        return responseBody;
    }

    return (
        <>
            <Dialog
                open={openLobbyCreate}
                onClose={onToLobby}
                maxWidth={false}
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        boxShadow: '0px 0px 30px 5px rgb(41, 55, 78)',
                        backgroundColor: '#29374e',
                        color: '#f0f0f0'
                    }
                }}
            >
                <DialogTitle sx={{
                    textAlign: "center",
                    color: '#f0f0f0',
                    fontFamily: 'Roboto, monospace',
                    fontWeight: 700,
                    fontSize: '180%'
                }}>
                    Создать комнату
                </DialogTitle>
                <DialogContent sx={{p: 3}}>
                    <Box sx={{mb: 3, textAlign: 'center'}}>
                        <Typography sx={{
                            color: '#d25b3f',
                            fontFamily: 'Roboto, monospace',
                            fontWeight: 'bold',
                            fontSize: '140%',
                            mb: 1
                        }}>Режим игры</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: 3,
                            width: '100%'
                        }}>
                            {modes.map(md => (
                                <Box key={md.value}
                                     sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <ToggleButton
                                        value={md.value}
                                        selected={mode === md.value}
                                        onClick={() => setMode(md.value)}
                                        sx={{
                                            minWidth: 150,
                                            maxWidth: 150,
                                            color: lightBlue["50"],
                                            backgroundColor: '#202020',
                                            borderColor: '#4b8493',
                                            borderRadius: 2,
                                            fontFamily: 'Roboto, monospace',
                                            fontSize: '110%',
                                            fontWeight: 'bold',
                                            mb: 0,
                                            '&.Mui-selected': {color: '#f0f0f0', backgroundColor: '#5fbfcc'},
                                            '&.Mui-selected:hover': {color: '#f0f0f0', backgroundColor: '#5fbfcc'}
                                        }}
                                    >
                                        {md.label}
                                    </ToggleButton>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{mb: 3, textAlign: 'center'}}>
                        <Typography sx={{
                            color: '#d25b3f',
                            fontFamily: 'Roboto, monospace',
                            fontWeight: 'bold',
                            fontSize: '140%',
                            mb: 1
                        }}>Сложность</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: 3,
                            width: '100%'
                        }}>
                            {difficulties.map(df => (
                                <Box key={df.value}
                                     sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <ToggleButton
                                        value={df.value}
                                        selected={difficulty === df.value}
                                        onClick={() => setDifficulty(df.value)}
                                        sx={{
                                            minWidth: 150,
                                            maxWidth: 150,
                                            color: lightBlue["50"],
                                            backgroundColor: '#202020',
                                            borderColor: '#4b8493',
                                            borderRadius: 2,
                                            fontFamily: 'Roboto, monospace',
                                            fontSize: '110%',
                                            fontWeight: 'bold',
                                            mb: 0,
                                            '&.Mui-selected': {color: '#f0f0f0', backgroundColor: '#5fbfcc'},
                                            '&.Mui-selected:hover': {color: '#f0f0f0', backgroundColor: '#5fbfcc'}
                                        }}
                                    >
                                        {df.label}
                                    </ToggleButton>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{mb: 3, textAlign: 'center'}}>
                        <Typography
                            sx={{
                                color: '#d25b3f',
                                fontFamily: 'Roboto, monospace',
                                fontWeight: 'bold',
                                fontSize: '140%'
                            }}
                            gutterBottom>Число игроков: <span
                            style={{color: '#f0f0f0'}}>{players}</span></Typography>
                        <Slider
                            value={players}
                            onChange={(_, v) => setPlayers(Number(v))}
                            valueLabelDisplay="auto"
                            min={2}
                            max={6}
                            step={1}
                            marks
                            sx={{
                                color: "#5fbfcc",
                                '& .MuiSlider-thumb': {borderRadius: "6px", bgcolor: "#334871"}
                            }}
                        />
                    </Box>
                    <Box sx={{mb: 2, textAlign: 'center'}}>
                        <Typography fontWeight="bold" gutterBottom sx={{
                            color: '#d25b3f',
                            fontFamily: 'Roboto, monospace',
                            fontSize: '140%'
                        }}>Выбор персонажа</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: 3,
                            width: '100%'
                        }}>
                            {characters.map(char => (
                                <Box key={char.name}
                                     sx={{
                                         display: 'flex',
                                         flexDirection: 'column',
                                         alignItems: 'center',
                                         minWidth: 130
                                     }}>
                                    <ToggleButton
                                        value={char.name}
                                        selected={character === char.name}
                                        onClick={() => {
                                            setCharacter(char.name);
                                            setCharacterName(char.nick);
                                        }}
                                        sx={{
                                            minWidth: 150,
                                            maxWidth: 150,
                                            color: lightBlue["50"],
                                            backgroundColor: '#202020',
                                            borderColor: '#4b8493',
                                            borderRadius: 2,
                                            fontFamily: 'Roboto, monospace',
                                            fontSize: '110%',
                                            fontWeight: 'bold',
                                            mt: 1,
                                            mb: 1,
                                            '&.Mui-selected': {color: '#f0f0f0', backgroundColor: '#5fbfcc'},
                                            '&.Mui-selected:hover': {color: '#f0f0f0', backgroundColor: '#5fbfcc'}
                                        }}
                                    >
                                        {char.name}
                                    </ToggleButton>
                                    <Paper
                                        elevation={character === char.name ? 8 : 2}
                                        sx={{
                                            borderRadius: '50%',
                                            border: character === char.name ? '3px solid #4cb4f8' : '2px solid #334871',
                                            boxShadow: character === char.name ? '0 0 16px #72e0ff' : '0 2px 8px #233',
                                            cursor: 'pointer',
                                            background: "#151d29",
                                            display: "flex", alignItems: "center", justifyContent: "center"
                                        }}
                                        onClick={() => {
                                            setCharacter(char.name);
                                            setCharacterName(char.nick);
                                        }}
                                    >
                                        <img
                                            src={char.img}
                                            alt={char.name}
                                            style={{
                                                width: "100%", height: "100%", objectFit: "cover",
                                            }}
                                        />
                                    </Paper>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{justifyContent: "space-between", px: 3, pb: 2}}>
                    <Button onClick={onToLobby}
                            sx={{
                                borderRadius: '12px',
                                width: '160px',
                                height: '50px',
                                color: '#f0f0f0',
                                backgroundColor: '#2e415f',
                                fontFamily: 'Roboto, monospace',
                                fontSize: '100%',
                                fontWeight: 'bold',
                                "&:hover": {color: '#ffffff', backgroundColor: '#334871'}
                            }}
                    >Закрыть</Button>
                    <Button onClick={handleCreate}
                            sx={{
                                borderRadius: '12px',
                                width: '160px',
                                height: '50px',
                                color: '#f0f0f0',
                                backgroundColor: '#2e415f',
                                fontFamily: 'Roboto, monospace',
                                fontSize: '100%',
                                fontWeight: 'bold',
                                "&:hover": {color: '#ffffff', backgroundColor: '#334871'}
                            }}
                    >Продолжить</Button>
                </DialogActions>
            </Dialog>
            <Snackbar // Create lobby error snackbar
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
                open={createLobbyError}
                autoHideDuration={5000}
                onClose={() => setCreateLobbyError(false)}
                message="Возникла ошибка во время создания игровой сессии. Попробуйте позже!"
            />
        </>
    );
}