import React, {useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    ToggleButton,
    Typography
} from "@mui/material";
import {lightBlue} from "@mui/material/colors";

import frankIcon from '../../assets/images/characters/frank/FRANK_TOKEN.png'
import kevinIcon from '../../assets/images/characters/kevin/KEVIN_TOKEN.png'
import maxIcon from '../../assets/images/characters/max/MAX_TOKEN.png'
import emmettIcon from '../../assets/images/characters/emmett/EMMETT_TOKEN.png'
import aliceIcon from '../../assets/images/characters/alice/ALICE_TOKEN.png'
import jenniferIcon from '../../assets/images/characters/jennifer/JENNIFER_TOKEN.png'
import {useNavigate} from "react-router-dom";
import CustomTextField from "../CustomTextField";

const allCharacters = [
    {name: "Франк", img: frankIcon, nick: "frank"},
    {name: "Кевин", img: kevinIcon, nick: "kevin"},
    {name: "Макс", img: maxIcon, nick: "max"},
    {name: "Эммет", img: emmettIcon, nick: "emmett"},
    {name: "Алиса", img: aliceIcon, nick: "alice"},
    {name: "Дженнифер", img: jenniferIcon, nick: "jennifer"}
];

export default function LobbyJoinPageComponent() {
    const [openLobbyJoin, setOpenLobbyJoin] = useState(true);

    const [step, setStep] = useState(1);

    const [roomId, setRoomId] = useState("");
    const [roomError, setRoomError] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const [availableCharacters, setAvailableCharacters] = useState([]);
    const [character, setCharacter] = useState(null);
    const [characterName, setCharacterName] = useState(null);
    const [characterError, setCharacterError] = useState("");

    const navigate = useNavigate();

    const onToLobby = () => {
        setOpenLobbyJoin(false);
        navigate("/lobby");
    };

    function isUUID(s) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s.trim());
    }

    async function checkRoom() {
        console.log("check room id");
        setRoomError("");
        setIsFetching(true);
        setAvailableCharacters([]);
        setCharacter(null);
        setCharacterName(null);

        if (!isUUID(roomId)) {
            setRoomError("введите корректный UUID комнаты");
            setIsFetching(false);
            return;
        }

        const token = localStorage.getItem('jwtToken');

        try {
            const response = await fetch(`http://localhost:8080/room/check/${roomId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseBody = await response.json();
            if (!response.ok) {
                setRoomError(responseBody.error);
                setIsFetching(false);
                return;
            }
            if (!responseBody.exists) {
                setRoomError("комната с таким ID не найдена");
            }
            if (responseBody.already_joined && responseBody.status !== "finished") {
                setOpenLobbyJoin(false);
                navigate(`/game/${roomId}`)
            }
            if (responseBody.status !== "waiting") {
                setRoomError("в эту комнату уже нельзя присоединиться");
            }
            if (responseBody.characters.length === 0) {
                setRoomError("нет доступных персонажей")
            }

            const characters = responseBody.characters.map(nick => {
                return allCharacters.find(character => character.nick === nick);
            }).filter(Boolean);
            setAvailableCharacters(characters);
            setStep(2);
        } catch (e) {
            console.log(e, e.stack);
            setRoomError("ошибка соединения с сервером, попробуйте ещё раз");
        }
        setIsFetching(false);
    }

    async function handleCharacterContinue() {
        if (!character) {
            setCharacterError("выберите персонажа");
            return;
        }
        setCharacterError("");
        // финальный шаг — можно сразу звать onJoin
        console.log("join lobby");

        const token = localStorage.getItem('jwtToken');

        try {
            const response = await fetch(`http://localhost:8080/room/join/${roomId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({character: characterName})
            });
            if (!response.ok) {
                const responseBody = await response.json();
                setCharacterError(responseBody.error);
                return;
            }
            setOpenLobbyJoin(false);
            navigate(`/game/${roomId}`)
        } catch (e) {
            setCharacterError("ошибка соединения с сервером, попробуйте ещё раз");
        }
    }

    function onClose() {
        setStep(1);
        setRoomError("");
        setCharacterError("");
        setRoomId("");
        setCharacter(null);
        setAvailableCharacters([]);
        onToLobby();
    }

    return (
        <Dialog
            open={openLobbyJoin}
            onClose={onClose}
            maxWidth={false}
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    minWidth: 400,
                    maxWidth: 900,
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
                Присоединиться к комнате
            </DialogTitle>
            <DialogContent sx={{p: 3, minHeight: 220}}>
                {step === 1 &&
                    <Box>
                        <CustomTextField
                            label="ID комнаты (UUID)"
                            variant="standard"
                            value={roomId}
                            onChange={e => setRoomId(e.target.value)}
                            fullWidth
                            autoFocus
                            required
                            error={Boolean(roomError)}
                            helperText={!roomError ? "ожидается uuid комнаты, полученный от администратора, для присоединения к сессии" : `${roomError}`}
                            inputProps={{
                                style: {color: "#f0f0f0", fontFamily: "Roboto, monospace", fontWeight: "bold"},
                                maxLength: 36,
                                autoComplete: "off"
                            }}
                            sx={{mb: 3}}
                            onKeyDown={e => (e.key === "Enter" && checkRoom())}
                        />
                    </Box>
                }
                {step === 2 &&
                    <Box>
                        <Typography fontWeight="bold" gutterBottom sx={{
                            color: '#d25b3f',
                            fontFamily: 'Roboto, monospace',
                            fontSize: '140%',
                            textAlign: "center"
                        }}>
                            Выбор персонажа
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: 3,
                            width: '100%',
                            mb: 2
                        }}>
                            {availableCharacters.map(char => (
                                <Box key={char.name} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    minWidth: 150
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
                                            overflow: 'hidden',
                                            borderRadius: '50%',
                                            border: character === char.name ? '3px solid #4cb4f8' : '2px solid #334871',
                                            boxShadow: character === char.name ? '0 0 16px #72e0ff' : '0 2px 8px #233',
                                            transition: "border 0.2s, box-shadow 0.2s",
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
                                                width: "100%", height: "100%", objectFit: "cover"
                                            }}
                                        />
                                    </Paper>
                                </Box>
                            ))}
                        </Box>
                        {characterError && <Typography color="#d25b3f" sx={{
                            fontWeight: "bold",
                            mt: 1,
                            textAlign: "center"
                        }}>{characterError}</Typography>}
                    </Box>
                }
            </DialogContent>
            <DialogActions sx={{justifyContent: "space-between", px: 3, pb: 2}}>
                <Button
                    onClick={onClose}
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
                    }}>
                    {"Закрыть"}
                </Button>
                <Button
                    onClick={step === 1 ? checkRoom : handleCharacterContinue}
                    disabled={step === 1 && isFetching}
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
                    }}>
                    {isFetching ? <CircularProgress size={22} sx={{color: "#5fbfcc"}}/> : "Продолжить"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}