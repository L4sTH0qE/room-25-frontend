import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, CardContent, Grid, Paper, Stack, Typography} from "@mui/material";
import {lightBlue} from "@mui/material/colors";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

import centralRoomImg from '../../assets/images/rooms/general/CENTRAL_ROOM.png';
import room25Img from '../../assets/images/rooms/general/ROOM_25.png';
import keyRoomImg from '../../assets/images/rooms/general/KEY_ROOM.png';
import emptyRoomImg from '../../assets/images/rooms/save/EMPTY_ROOM.png';
import tunnelRoomImg from '../../assets/images/rooms/save/TUNNEL_ROOM.png';
import movingRoomImg from '../../assets/images/rooms/save/MOVING_ROOM.png';
import observationRoomImg from '../../assets/images/rooms/save/OBSERVATION_ROOM.png';
import controlRoomImg from '../../assets/images/rooms/save/CONTROL_ROOM.png';
import darkRoomImg from '../../assets/images/rooms/neutral/DARK_ROOM.png';
import freezerRoomImg from '../../assets/images/rooms/neutral/FREEZER_ROOM.png';
import jailRoomImg from '../../assets/images/rooms/neutral/JAIL_ROOM.png';
import whirlpoolRoomImg from '../../assets/images/rooms/neutral/WHIRLPOOL_ROOM.png';
import corridorRoomImg from '../../assets/images/rooms/neutral/CORRIDOR_ROOM.png';
import trapRoomImg from '../../assets/images/rooms/dangerous/TRAP_ROOM.png';
import floodedRoomImg from '../../assets/images/rooms/dangerous/FLOODED_ROOM.png';
import acidRoomImg from '../../assets/images/rooms/dangerous/ACID_ROOM.png';
import tortureRoomImg from '../../assets/images/rooms/dangerous/TORTURE_ROOM.png';
import deathRoomImg from '../../assets/images/rooms/dangerous/DEATH_ROOM.png';
import faceDownImg from '../../assets/images/rooms/FACE_DOWN.png';

import copyImg from '../../assets/images/general/COPY.png';
import turnPanelImg from '../../assets/images/general/TURN_PANEL.png';

import frankAliveImg from '../../assets/images/characters/frank/FRANK_ALIVE.png';
import frankDeadImg from '../../assets/images/characters/frank/FRANK_DEAD.png';
import kevinAliveImg from '../../assets/images/characters/kevin/KEVIN_ALIVE.png';
import kevinDeadImg from '../../assets/images/characters/kevin/KEVIN_DEAD.png';
import maxAliveImg from '../../assets/images/characters/max/MAX_ALIVE.png';
import maxDeadImg from '../../assets/images/characters/max/MAX_DEAD.png';
import emmettAliveImg from '../../assets/images/characters/emmett/EMMETT_ALIVE.png';
import emmettDeadImg from '../../assets/images/characters/emmett/EMMETT_DEAD.png';
import aliceAliveImg from '../../assets/images/characters/alice/ALICE_ALIVE.png';
import aliceDeadImg from '../../assets/images/characters/alice/ALICE_DEAD.png';
import jenniferAliveImg from '../../assets/images/characters/jennifer/JENNIFER_ALIVE.png';
import jenniferDeadImg from '../../assets/images/characters/jennifer/JENNIFER_DEAD.png';

import frankSheetImg from '../../assets/images/characters/frank/FRANK_SHEET.png';
import kevinSheetImg from '../../assets/images/characters/kevin/KEVIN_SHEET.png';
import maxSheetImg from '../../assets/images/characters/max/MAX_SHEET.png';
import emmettSheetImg from '../../assets/images/characters/emmett/EMMETT_SHEET.png';
import aliceSheetImg from '../../assets/images/characters/alice/ALICE_SHEET.png';
import jenniferSheetImg from '../../assets/images/characters/jennifer/JENNIFER_SHEET.png';
import {Modal} from "reactstrap";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

/**
 * Functional component that describes Game page.
 */
export default function GamePageComponent(props) {
    const {id} = useParams(); // id комнаты
    const navigate = useNavigate();
    const [stompClient, setStompClient] = useState(null);
    const [room, setRoom] = useState(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const cellTypeImages = {
        CENTRAL_ROOM: centralRoomImg,
        ROOM_25: room25Img,
        KEY_ROOM: keyRoomImg,
        EMPTY_ROOM: emptyRoomImg,
        TUNNEL_ROOM: tunnelRoomImg,
        MOVING_ROOM: movingRoomImg,
        OBSERVATION_ROOM: observationRoomImg,
        CONTROL_ROOM: controlRoomImg,
        DARK_ROOM: darkRoomImg,
        FREEZER_ROOM: freezerRoomImg,
        JAIL_ROOM: jailRoomImg,
        WHIRLPOOL_ROOM: whirlpoolRoomImg,
        CORRIDOR_ROOM: corridorRoomImg,
        TRAP_ROOM: trapRoomImg,
        FLOODED_ROOM: floodedRoomImg,
        ACID_ROOM: acidRoomImg,
        TORTURE_ROOM: tortureRoomImg,
        DEATH_ROOM: deathRoomImg,
    }

    const characterAliveTokens = {
        FRANK: frankAliveImg,
        KEVIN: kevinAliveImg,
        MAX: maxAliveImg,
        EMMETT: emmettAliveImg,
        ALICE: aliceAliveImg,
        JENNIFER: jenniferAliveImg,
    }

    const characterDeadTokens = {
        FRANK: frankDeadImg,
        KEVIN: kevinDeadImg,
        MAX: maxDeadImg,
        EMMETT: emmettDeadImg,
        ALICE: aliceDeadImg,
        JENNIFER: jenniferDeadImg,
    }

    const characterSheets = {
        FRANK: frankSheetImg,
        KEVIN: kevinSheetImg,
        MAX: maxSheetImg,
        EMMETT: emmettSheetImg,
        ALICE: aliceSheetImg,
        JENNIFER: jenniferSheetImg,
    }

    useEffect(() => {
        // Создаем SockJS соединение.
        const socket = new SockJS('http://localhost:8080/portfolio');

        // Создаем STOMP клиент.
        const client = Stomp.over(socket);
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate("/");
        }

        client.connect(
            {Authorization: `Bearer ${token}`},
            (frame) => {
                console.log(`Connected: ${frame}`);

                // Подписываемся на топик с игрой.
                client.subscribe(`/topic/room/${id}`, (message) => {
                    const roomData = JSON.parse(message.body);
                    setRoom(roomData);
                });

                setStompClient(client);
            }, (error) => {
                console.error(`Error connecting: ${error}`);
            }
        );

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, [id, navigate]);

    useEffect(() => {
        if (stompClient) {
            // Отправляем сообщение на /app/room/:id
            stompClient.send(`/app/room/${id}`, {});
        }
    }, [id, stompClient]);

    if (!room) return (
        <div className="gamepage-background">
        </div>
    );

    const myPlayer = room.players.find(p => p.clientName === props.username);

    return (
        <div className="gamepage-background">
            <Box sx={{minHeight:'100vh', py:4, px:2, color:'#f0f0f0', fontFamily:'Roboto, monospace'}}>

                {/* Карточка с инфой по комнате */}
                <CardContent sx={{
                    color: '#202020',
                    backgroundColor: '#444247',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 5,
                    border: '3px solid #4fc3f7',
                    boxShadow: '0 0 10px #4fc3f7',
                    maxWidth: '1000px',
                    margin: 'auto',
                    marginTop: '3.5%',
                    transform: 'translateY(-80%)',
                }}>
                    <Typography variant="h4" sx={{color: "#f0f0f0", fontWeight: 700, opacity: 0.75}}>
                        Комната: {id}
                        {room.status === "waiting" ? <span style={{
                                color: "#d25b3f", fontWeight: 'bold', fontSize: '60%', display: 'flex',

                            }}>{`Ожидание игроков (еще ${room.numberOfPlayers - room.players.length}). Передайте остальным участникам ID комнаты.`}</span> :
                            <span style={{
                                color: "#d25b3f", fontWeight: 'bold', fontSize: '60%', display: 'flex',

                            }}>{`Передайте остальным участникам ID комнаты.`}</span>}
                    </Typography>
                    <Button className="copy-btn" sx={{
                        borderRadius: 5,
                        border: '3px solid #4fc3f7',
                        backgroundColor: '#30485e',
                        "&:hover": {color: '#202020', backgroundColor: '#29374e'}
                    }} variant="text" onClick={() => {
                        navigator.clipboard.writeText(id)
                    }}>
                        <img src={copyImg} alt="copy" height="48px"/>
                    </Button>
                </CardContent>

                {/* Панель ходов */}
                <Box sx={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center', mt:-8, mb:5, position:"relative"}}>
                    <Box sx={{position:"relative", width: 640, height:140}}>
                        <img src={turnPanelImg} alt="action panel" height="140"
                             style={{width:"100%", objectFit:"contain", boxShadow: '0 0 30px #202020'}}/>
                        {room.players.map((p, idx) => (
                            <img
                                key={p.clientId}
                                src={p.status === 'NORMAL' ? characterAliveTokens[p.character] : characterDeadTokens[p.character]}
                                alt="token"
                                style={{
                                    position: 'absolute',
                                    left: 175 + (room.numberOfPlayers - idx - 1) * 40 + (room.currentTurn === 1 ? 0 : (idx === ((room.numberOfPlayers - ((room.currentTurn - 1) % room.numberOfPlayers)) % room.numberOfPlayers)) * room.numberOfPlayers * 40),
                                    top: 60,
                                    width:40, height:70,
                                    border: "2px solid #202020",
                                    background:'#232631'
                                }}/>
                        ))}
                    </Box>
                </Box>


                {/* Две колонки: инфа по игрокам слева, поле справа */}
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={3} lg={2}>
                        <Typography variant="h6"
                                    sx={{ mb: 2, color: lightBlue[300], fontWeight: 'bold', textAlign:"center", fontSize: '140%', textShadow: '0 0 10px #4fc3f7' }}>
                            Игроки:
                        </Typography>
                        <Stack direction="column" spacing={2}>
                            {room.players.map(p => (
                                <Paper key={p.clientId}
                                       sx={{
                                           py: 1, px: 2,
                                           background: "#444247",
                                           borderRadius: 4,
                                           color: "#f0f0f0",
                                           boxShadow: p.status === "NORMAL" ? "0 0 10px #7ffa7f" : p.status === "BLIND" ? "0 0 10px #4b0082" : p.status === "FROZEN" ? "0 0 10px #c1e1f7" : p.status === "FLOODED" ? "0 0 10px #2b578c" : p.status === "IMPRISONED" ? "0 0 10px #ffe462" : p.status === "TRAPPED" ? "0 0 10px #d25b3f" : p.status === "DEAD" ? "0 0 10px #fd7077" : "0 0 10px #fd7077",
                                           border: p.status === "NORMAL" ? "2px solid #7ffa7f" : p.status === "BLIND" ? "2px solid #4b0082" : p.status === "FROZEN" ? "2px solid #c1e1f7" : p.status === "FLOODED" ? "2px solid #2b578c" : p.status === "IMPRISONED" ? "2px solid #ffe462" : p.status === "TRAPPED" ? "2px solid #d25b3f" : p.status === "DEAD" ? "2px solid #fd7077" : "2px solid #fd7077",
                                       }}>
                                    <Typography fontWeight="bold">
                                        {p.clientName}
                                        <span style={{
                                            fontSize: "0.93em",
                                            opacity: 0.75,
                                            marginLeft: 8
                                        }}>({p.character})</span>
                                        {p.status === "NORMAL" &&
                                            <span style={{color: "#7ffa7f", marginLeft: 8}}>(здоров)</span>}
                                        {p.status === "BLIND" &&
                                            <span style={{color: "#4b0082", marginLeft: 8}}>(слепота)</span>}
                                        {p.status === "FROZEN" &&
                                            <span style={{color: "#c1e1f7", marginLeft: 8}}>(обморожение)</span>}
                                        {p.status === "FLOODED" &&
                                            <span style={{color: "#2b578c", marginLeft: 8}}>(утопление)</span>}
                                        {p.status === "IMPRISONED" &&
                                            <span style={{color: "#ffe462", marginLeft: 8}}>(в заключении)</span>}
                                        {p.status === "TRAPPED" &&
                                            <span style={{color: "#d25b3f", marginLeft: 8}}>(в ловушке)</span>}
                                        {p.status === "DEAD" && <span style={{color: "#fd7077", marginLeft: 8}}>(мертв)</span>}
                                    </Typography>
                                    <Typography fontSize={14} sx={{opacity: 0.9}}>
                                        Координаты: [{p.coordX},{p.coordY}]<br/>
                                    </Typography>
                                </Paper>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={9} lg={7} sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {/* Игровое поле */}
                        <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{mb: 2, mx: "auto"}}>
                            {room.board.map((row, i) =>
                                <Grid item xs={12} key={i} sx={{display: 'flex', justifyContent: 'center'}}>
                                    {row.map((cell, j) => (
                                        <Paper key={j} elevation={5}
                                               sx={{
                                                   width: 105, height: 105,
                                                   display: "flex", alignItems: "center", justifyContent: "center",
                                                   borderRadius: "20%",
                                                   boxShadow: "0 1px 8px #0f0c12",
                                                   position:"relative",
                                                   mr: 1
                                               }}>
                                            <img
                                                src={cell.faceUp ? cellTypeImages[cell.type] : faceDownImg}
                                                alt={cell.type}
                                                style={{
                                                    width: 105,
                                                    height: 105,
                                                    borderRadius: "5%",
                                                }}
                                            />
                                            {room.players.filter(p=>p.coordX===i && p.coordY===j).map((playerOnCell, idx) =>
                                                <img key={playerOnCell.clientId + idx}
                                                     src={playerOnCell.status === 'NORMAL' ? characterAliveTokens[playerOnCell.character] : characterDeadTokens[playerOnCell.character]}
                                                     alt="token" style={{
                                                    width:30,
                                                    height:50,
                                                    position:"absolute",
                                                    left: 12 + idx * 11,
                                                    top: 40 - 20 * ((room.numberOfPlayers - idx - 1) % 2),
                                                    border:'1px solid #f0f0f0',
                                                    borderRadius:'15%',
                                                    background:'#191919',
                                                    boxShadow:'0 0 4px #5fbfcc',
                                                    zIndex:2,
                                                }}/>
                                            )}
                                        </Paper>
                                    ))}
                                </Grid>
                            )}
                        </Grid>

                        <Grid item xs={12}  lg={5}>
                            <Stack direction="column" spacing={2}>
                                {/* Панель хода */}
                                <Box sx={{
                                    my: 2, fontSize: '1.18em', textAlign: 'center', color: lightBlue[300],
                                    background: "rgba(44,54,86,0.93)", borderRadius:3, py:2, mb:2
                                }}>
                            <span style={{fontWeight:700, fontSize:'1.13em', display: 'block'}}>
                                Раунд {room.currentTurn} / {room.totalTurns}
                            </span>

                            <span style={{marginLeft: 16, fontWeight:700, display: 'block'}}>
                                Фаза: {room.currentPhase}
                            </span>

                            <span style={{marginLeft: 16, color:'#ffcf73', fontWeight:700, display: 'block'}}>
                                Активный игрок: {room.players[room.currentPlayer]?.clientName || "(нет)"}
                            </span>
                                </Box>

                                {/* Кнопка персонажа */}
                                <Button variant="contained"
                                        sx={{
                                            fontFamily: 'Roboto, monospace',
                                            fontSize: '140%',
                                            fontWeight: 'bold',
                                            color: lightBlue["50"],
                                            backgroundColor: '#444247',
                                            borderRadius: 3,
                                            border: '3px solid #4fc3f7',
                                            boxShadow: '0 0 10px #4fc3f7',
                                            "&:hover": {color: '#f0f0f0', backgroundColor: '#5fbfcc'}
                                        }}
                                        onClick={()=>setSheetOpen(true)}>
                                    Карточка вашего персонажа
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Карточка персонажа */}
                <Dialog
                    open={sheetOpen}
                    onClose={() => setSheetOpen(false)}
                    maxWidth
                    PaperProps={{
                        sx: {
                            backgroundColor: "#2f3851",
                            color: "#f0f0f0",
                            borderRadius: 2,
                            boxShadow: 24
                        }
                    }}
                    BackdropProps={{
                        style: {background: 'rgba(25,25,25,0.90)'}
                    }}
                >
                    <DialogContent className="custom-scrollbar">
                        {myPlayer && (
                            <Stack direction="column">
                                <img src={characterSheets[myPlayer.character]} alt="character" width={1012} />
                                {/* Выбор действий */}
                                <Stack direction="row" gap={2} mt={2}>
                                    <Button variant="outlined" sx={{ borderColor: "#5fbfcc", color: '#5fbfcc', fontWeight:800, minWidth: 120 }}>Действие 1</Button>
                                    <Button variant="outlined" sx={{ borderColor: "#5fbfcc", color: '#5fbfcc', fontWeight:800, minWidth: 120 }}>Действие 2</Button>
                                </Stack>
                            </Stack>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSheetOpen(false)} sx={{
                            color:"#f0f0f0",
                            fontWeight:"bold",
                            fontFamily:"Roboto, monospace"
                        }}>Закрыть</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}
