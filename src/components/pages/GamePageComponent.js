import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, CardContent, Grid, Paper, Stack, ToggleButton, Typography} from "@mui/material";
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

import lookImg from '../../assets/images/actions/LOOK.png'
import moveImg from '../../assets/images/actions/MOVE.png'
import pushImg from '../../assets/images/actions/PUSH.png'
import controlImg from '../../assets/images/actions/CONTROL.png'
import noneImg from '../../assets/images/actions/NONE.png'
import arrowImg from '../../assets/images/actions/CONTROL_DIRECTION.png'

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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

    const [selectedActions, setSelectedActions] = useState([null, null]);
    const [isReady, setIsReady] = useState(false);
    const [waitingActions, setWaitingActions] = useState(false);

    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [selectableCells, setSelectableCells] = useState([]);
    const [selectablePlayers, setSelectablePlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [actionRequest, setActionRequest] = useState(null);

    const [lookDialogOpen, setLookDialogOpen] = useState(false);
    const [lookedCell, setLookedCell] = useState(null);

    const [noneDialogOpen, setNoneDialogOpen] = useState(false);

    const [controlDialogOpen, setControlDialogOpen] = useState(false);
    const [controlType, setControlType] = useState(null);
    const [controlIdx, setControlIdx] = useState(0);
    const [controlDirection, setControlDirection] = useState("NONE");
    const [controlOptions, setControlOptions] = useState([
        {value: "ROW", label: "Ряд"},
        {value: "COLUMN", label: "Столбец"}
    ]);
    const [controlRowOptions, setControlRowOptions] = useState([
        {value: "LEFT", label: "Влево"},
        {value: "RIGHT", label: "Вправо"}
    ]);
    const [controlColumnOptions, setControlColumnOptions] = useState([
        {value: "UP", label: "Вверх"},
        {value: "DOWN", label: "Вниз"}
    ]);

    const [arrowInfo, setArrowInfo] = useState(null);

    const [gameStatus, setGameStatus] = useState(null);
    const [keyFound, setKeyFound] = useState(false);

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

    const onToHome = () => {
        navigate("/");
    };

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
                    setArrowInfo({
                        idx: roomData.controlData.row,
                        direction: roomData.controlData.orientation
                    });
                    setGameStatus(roomData.status);
                    setKeyFound(roomData.keyFound);

                    if (roomData.currentPhase === 1) {
                        setIsReady(false);
                    } else {
                        setWaitingActions(false);
                        const curPlayer = roomData.players[(roomData.currentPlayer + ((1 - roomData.currentTurn) % roomData.numberOfPlayers + roomData.numberOfPlayers)) % roomData.numberOfPlayers];
                        setCurrentPlayer(curPlayer);
                        if (curPlayer.clientName === props.username) {
                            let playerAction = roomData.currentPhase - 2 === 0 ? curPlayer.playerAction.firstAction : curPlayer.playerAction.secondAction;
                            handleAction(curPlayer, playerAction, roomData);
                        }
                    }
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

    const actionList = [
        {value: "LOOK", label: "Смотреть", icon: lookImg},
        {value: "MOVE", label: "Перейти", icon: moveImg},
        {value: "PUSH", label: "Толкнуть", icon: pushImg},
        {value: "CONTROL", label: "Управлять", icon: controlImg},
        {value: "NONE", label: "Ничего не делать", icon: noneImg},
    ];

    function handleSubmitActions() {
        if (selectedActions[0] === null || selectedActions[1] === null || waitingActions || room.currentPhase !== 1) return;
        let myPlayer = room.players.find(p => p.clientName === props.username);
        setIsReady(true);
        setWaitingActions(true);
        stompClient.send(`/app/room/${id}/preparation`, {},
            JSON.stringify({
                player: myPlayer.clientName,
                actions: [selectedActions[0], selectedActions[1]]
            }),
        );
        setSheetOpen(false);
    }

    function handleAction(curPlayer, actionType, roomData) {
        let myPlayer = roomData.players.find(pl => pl.clientName === props.username);
        if (myPlayer.status === "TRAPPED" && actionType !== "MOVE") {
            roomData.players = roomData.players.map(pl =>
                pl.clientName === props.username ? {...pl, status: "DEAD"} : pl
            );
            roomData.status = "lost";
            setGameStatus("lost");
            setRoom(roomData);
            goToNextAction(roomData);
        } else if (actionType === "LOOK" || actionType === "MOVE") {
            if (actionType === "MOVE" && myPlayer.status === "IMPRISONED") {
                const availableCells = getImprisonedCells(myPlayer, roomData);
                if (availableCells.length === 0) {
                    setNoneDialogOpen(true);
                } else {
                    setSelectableCells(availableCells);
                    setActionRequest({type: actionType, myPlayer});
                }
            } else if (actionType === "LOOK" && myPlayer.status === "BLIND") {
                setNoneDialogOpen(true);
            } else {
                setSelectableCells(getAdjacentCells(myPlayer, roomData));
                setActionRequest({type: actionType, myPlayer});
            }
        } else if (actionType === "PUSH") {
            const candidatesFound = roomData.players.some(p => p.coordX === myPlayer.coordX && p.coordY === myPlayer.coordY && p.clientName !== myPlayer.clientName && myPlayer.status !== "IMPRISONED" && myPlayer.coordX !== 2 && myPlayer.coordY !== 2);
            if (candidatesFound) {
                const candidates = roomData.players.filter(p => p.coordX === myPlayer.coordX && p.coordY === myPlayer.coordY && p.clientName !== myPlayer.clientName);
                setSelectablePlayers(candidates);
                setActionRequest({type: "PUSH", myPlayer});
            } else {
                setNoneDialogOpen(true);
            }
        } else if (actionType === "CONTROL") {
            setControlDialogOpen(true);
            if (myPlayer.coordX !== 2) {
                setControlType("ROW");
                setControlIdx(myPlayer.coordX);
                setControlDirection("LEFT");
            } else if (myPlayer.coordY !== 2) {
                setControlType("COLUMN");
                setControlIdx(myPlayer.coordY);
                setControlDirection("UP");
            }
            setActionRequest({type: "CONTROL", myPlayer});
        } else if (actionType === "NONE") {
            setNoneDialogOpen(true);
        }
    }

    function getAdjacentCells(player, roomData) {
        const cells = [];
        const dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let d = 0; d < 4; d++) {
            const nx = player.coordX + dx[d];
            const ny = player.coordY + dy[d];
            if (roomData.board?.[nx]?.[ny]) {
                cells.push({i: nx, j: ny});
            }
        }
        return cells;
    }

    function getImprisonedCells(player, roomData) {
        const cells = [];
        const dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let d = 0; d < 4; d++) {
            const nx = player.coordX + dx[d];
            const ny = player.coordY + dy[d];
            if (roomData.board?.[nx]?.[ny] && (roomData.players.some(p => p.coordX === nx && p.coordY === ny) || (nx === 2 && ny === 2))) {
                cells.push({i: nx, j: ny});
            }
        }
        return cells;
    }

    function getAllCells() {
        const cells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                cells.push({i: i, j: j});
            }
        }
        return cells;
    }

    function getHiddenCells(roomData) {
        const cells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (roomData.board?.[i]?.[j] && (roomData.board?.[i]?.[j].faceUp === false)) {
                    cells.push({i: i, j: j});
                }
            }
        }
        return cells;
    }

    function resolveActionOnCell(i, j) {
        let myPlayer = room.players.find(p => p.clientName === props.username);
        if (actionRequest.type === "LOOK") {
            setLookedCell({
                i, j,
                cell: room.board[i][j]
            });
            setLookDialogOpen(true);
        } else if (actionRequest.type === "MOVE") {
            const p = myPlayer;
            let newRoom = {...room};
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === p.clientName ? {...pl, coordX: i, coordY: j} : pl
            );
            newRoom.board[i][j] = {...newRoom.board[i][j], faceUp: true};

            resolveRoomFunction(newRoom, p, i, j);
        } else if (actionRequest.type === "PUSH") {
            const p = selectedPlayer;
            let newRoom = {...room};
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === p.clientName ? {...pl, coordX: i, coordY: j} : pl
            );
            newRoom.board[i][j] = {...newRoom.board[i][j], faceUp: true};

            /*resolveRoomFunction(newRoom, p, i, j);*/
        } else if (actionRequest.type === "SWAP") {
            let newRoom = {...room};
            let x = myPlayer.coordX;
            let y = myPlayer.coordY
            const temp = newRoom.board[x][y];
            newRoom.board[x][y] = newRoom.board[i][j];
            newRoom.board[i][j] = temp;
            newRoom.players = newRoom.players.map(pl =>
                pl.coordX === x && pl.coordY === y ? {...pl, coordX: i, coordY: j} : pl
            );
            setRoom(newRoom);
            goToNextAction(newRoom);
        }
    }

    /* Здесь нужно обрабатывать все обновления статусов после движения */
    function resolveRoomFunction(newRoom, player, i, j) {
        if (newRoom.board[i][j].type === "EMPTY_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "NORMAL"} : pl
            );
        } else if (newRoom.board[i][j].type === "OBSERVER_ROOM") {
            setSelectableCells(getAllCells());
            setActionRequest({type: "LOOK", player});
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "NORMAL"} : pl
            );
            setRoom(newRoom);
            return;
        } else if (newRoom.board[i][j].type === "MOVING_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "NORMAL"} : pl
            );
            let hiddenCells = getHiddenCells(newRoom);
            if (hiddenCells.length > 0) {
                setSelectableCells(hiddenCells);
                setActionRequest({type: "SWAP", player});
                setRoom(newRoom);
                return;
            }
        } else if (newRoom.board[i][j].type === "WHIRLPOOL_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, coordX: 2, coordY: 2, status: "NORMAL"} : pl
            );
        } else if (newRoom.board[i][j].type === "JAIL_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "IMPRISONED"} : pl
            );
        } else if (newRoom.board[i][j].type === "DARK_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "BLIND"} : pl
            );
        } else if (newRoom.board[i][j].type === "FREEZER_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "FROZEN"} : pl
            );
        } else if (newRoom.board[i][j].type === "ACID_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.coordX === i && pl.coordY === j ? {...pl, status: "DEAD"} : pl
            );
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "NORMAL"} : pl
            );

            if (newRoom.players.some(pl => pl.status === "DEAD")) {
                newRoom.status = "lost";
                setGameStatus("lost");
            }
        } else if (newRoom.board[i][j].type === "TRAP_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "TRAPPED"} : pl
            );
        } else if (newRoom.board[i][j].type === "DEATH_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "DEAD"} : pl
            );
            newRoom.status = "lost";
            setGameStatus("lost");
        } else if (newRoom.board[i][j].type === "CENTRAL_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "NORMAL"} : pl
            );
        } else if (newRoom.board[i][j].type === "KEY_ROOM") {
            setKeyFound(true);
            newRoom.keyFound = true;
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "NORMAL"} : pl
            );
        } else if (newRoom.board[i][j].type === "ROOM_25") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "NORMAL"} : pl
            );
        } else if (newRoom.board[i][j].type === "CONTROL_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "NORMAL"} : pl
            );
        }  else if (newRoom.board[i][j].type === "TUNNEL_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "NORMAL"} : pl
            );
        } else if (newRoom.board[i][j].type === "CORRIDOR_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "NORMAL"} : pl
            );
        } else if (newRoom.board[i][j].type === "FLOODED_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "FLOODED_FIRST"} : pl
            );
        } else if (newRoom.board[i][j].type === "TORTURE_ROOM") {
            newRoom.players = newRoom.players.map(pl =>
                pl.clientName === player.clientName ? {...pl, status: "NORMAL"} : pl
            );
        }
        setRoom(newRoom);
        goToNextAction(newRoom);
    }

    function resolveControlAction() {

        let newRoom = {...room};
        if (controlType === "ROW") {
            const idx = controlIdx;
            if (controlDirection === "LEFT") {
                const first = newRoom.board[idx][0];
                for (let c = 0; c < 4; c++) newRoom.board[idx][c] = newRoom.board[idx][c + 1];
                newRoom.board[idx][4] = first;
                newRoom.players = newRoom.players.map(pl =>
                    pl.coordX === idx ? {...pl, coordX: pl.coordX, coordY: (pl.coordY + 4) % 5} : pl
                );
                newRoom.controlData.row = idx;
                newRoom.controlData.orientation = "LEFT";

                if (newRoom.keyFound === true && first.type === "ROOM_25") {
                    const allPlayersOnCell = newRoom.players.every(p => p.coordX === idx && p.coordY === 0);
                    if (allPlayersOnCell === true) {
                        newRoom.status = "won";
                        setGameStatus("won");
                    }
                }
            } else if (controlDirection === "RIGHT") {
                const last = newRoom.board[idx][4];
                for (let c = 4; c > 0; c--) newRoom.board[idx][c] = newRoom.board[idx][c - 1];
                newRoom.board[idx][0] = last;
                newRoom.players = newRoom.players.map(pl =>
                    pl.coordX === idx ? {...pl, coordX: pl.coordX, coordY: (pl.coordY + 1) % 5} : pl
                );
                newRoom.controlData.row = idx;
                newRoom.controlData.orientation = "RIGHT";

                if (newRoom.keyFound === true && last.type === "ROOM_25") {
                    const allPlayersOnCell = newRoom.players.every(p => p.coordX === idx && p.coordY === 4);
                    if (allPlayersOnCell === true) {
                        newRoom.status = "won";
                        setGameStatus("won");
                    }
                }
            }
            setArrowInfo({
                idx: controlIdx,
                direction: controlDirection
            });
        } else if (controlType === "COLUMN") {
            const idx = controlIdx;
            if (controlDirection === "UP") {
                const first = newRoom.board[0][idx];
                for (let r = 0; r < 4; r++) newRoom.board[r][idx] = newRoom.board[r + 1][idx];
                newRoom.board[4][idx] = first;
                newRoom.players = newRoom.players.map(pl =>
                    pl.coordY === idx ? {...pl, coordX: (pl.coordX + 4) % 5, coordY: pl.coordY} : pl
                );
                newRoom.controlData.row = idx;
                newRoom.controlData.orientation = "UP";

                if (newRoom.keyFound === true && first.type === "ROOM_25") {
                    const allPlayersOnCell = newRoom.players.every(p => p.coordX === 0 && p.coordY === idx);
                    if (allPlayersOnCell === true) {
                        newRoom.status = "won";
                        setGameStatus("won");
                    }
                }
            } else if (controlDirection === "DOWN") {
                const last = newRoom.board[4][idx];
                for (let r = 4; r > 0; r--) newRoom.board[r][idx] = newRoom.board[r - 1][idx];
                newRoom.board[0][idx] = last;
                newRoom.players = newRoom.players.map(pl =>
                    pl.coordY === idx ? {...pl, coordX: (pl.coordX + 1) % 5, coordY: pl.coordY} : pl
                );
                newRoom.controlData.row = idx;
                newRoom.controlData.orientation = "DOWN";

                if (newRoom.keyFound === true && last.type === "ROOM_25") {
                    const allPlayersOnCell = newRoom.players.every(p => p.coordX === 4 && p.coordY === idx);
                    if (allPlayersOnCell === true) {
                        newRoom.status = "won";
                        setGameStatus("won");
                    }
                }
            }
            setArrowInfo({
                idx: controlIdx,
                direction: controlDirection
            });
        } else {
            setArrowInfo(null);
        }

        setRoom(newRoom);
        setControlDialogOpen(false);
        goToNextAction(newRoom);
    }

    function goToNextAction(roomData) {
        setSelectableCells([]);
        setSelectablePlayers([]);
        setLookedCell(null);
        setLookDialogOpen(false);
        setNoneDialogOpen(false);

        if (stompClient !== null) {
            stompClient.send(`/app/room/${id}/action`, {},
                JSON.stringify(roomData),
            );
        }
    }

    return (
        <div className="gamepage-background">
            <Box sx={{minHeight: '100vh', py: 4, px: 2, color: '#f0f0f0', fontFamily: 'Roboto, monospace'}}>

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
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: -8,
                    mb: 5,
                    position: "relative"
                }}>
                    <Box sx={{position: "relative", width: 640, height: 140}}>
                        <img src={turnPanelImg} alt="action panel" height="140"
                             style={{width: "100%", objectFit: "contain", boxShadow: '0 0 30px #202020'}}/>
                        {room.players.map((p, idx) => (
                            <img
                                key={p.clientId}
                                src={p.status === 'DEAD' ? characterDeadTokens[p.character] : characterAliveTokens[p.character]}
                                alt="token"
                                style={{
                                    position: 'absolute',
                                    left: 175 + (room.numberOfPlayers - idx - 1) * 40 + (room.currentTurn === 1 ? 0 : (idx === (room.numberOfPlayers - ((room.currentTurn - 1) % room.numberOfPlayers))) * room.numberOfPlayers * 40 + Math.floor((room.currentTurn - 1) / room.numberOfPlayers) * room.numberOfPlayers * 40),
                                    top: 60,
                                    width: 40, height: 70,
                                    border: "2px solid #202020",
                                    background: '#232631'
                                }}/>
                        ))}
                    </Box>
                </Box>


                {/* Две колонки: инфа по игрокам слева, поле справа */}
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={3} lg={2}>
                        <Typography variant="h6"
                                    sx={{
                                        mb: 2,
                                        color: lightBlue[300],
                                        fontWeight: 'bold',
                                        textAlign: "center",
                                        fontSize: '140%',
                                        textShadow: '0 0 10px #4fc3f7'
                                    }}>
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
                                           boxShadow: p.status === "NORMAL" ? "0 0 10px #7ffa7f" : p.status === "BLIND" ? "0 0 10px #4b0082" : p.status === "FROZEN" ? "0 0 10px #c1e1f7" : (p.status === "FLOODED_FIRST" || p.status === "FLOODED_SECOND") ? "0 0 10px #2b578c" : p.status === "IMPRISONED" ? "0 0 10px #ffe462" : p.status === "TRAPPED" ? "0 0 10px #d25b3f" : p.status === "DEAD" ? "0 0 10px #fd7077" : "0 0 10px #fd7077",
                                           border: p.status === "NORMAL" ? "2px solid #7ffa7f" : p.status === "BLIND" ? "2px solid #4b0082" : p.status === "FROZEN" ? "2px solid #c1e1f7" : (p.status === "FLOODED_FIRST" || p.status === "FLOODED_SECOND") ? "2px solid #2b578c" : p.status === "IMPRISONED" ? "2px solid #ffe462" : p.status === "TRAPPED" ? "2px solid #d25b3f" : p.status === "DEAD" ? "2px solid #fd7077" : "2px solid #fd7077",
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
                                        {(p.status === "FLOODED_FIRST" || p.status === "FLOODED_SECOND") &&
                                            <span style={{color: "#2b578c", marginLeft: 8}}>(утопление)</span>}
                                        {p.status === "IMPRISONED" &&
                                            <span style={{color: "#ffe462", marginLeft: 8}}>(в заключении)</span>}
                                        {p.status === "TRAPPED" &&
                                            <span style={{color: "#d25b3f", marginLeft: 8}}>(в ловушке)</span>}
                                        {p.status === "DEAD" &&
                                            <span style={{color: "#fd7077", marginLeft: 8}}>(мертв)</span>}
                                    </Typography>
                                    <Typography fontSize={14} sx={{opacity: 0.9}}>
                                        Координаты: [{p.coordX},{p.coordY}]<br/>
                                    </Typography>
                                </Paper>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} lg={7}
                          sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {/* Игровое поле */}
                        <Grid container spacing={1} justifyContent="center" alignItems="center"
                              sx={{mb: 2, mx: "auto"}}>
                            {room.board.map((row, i) =>
                                <Grid item xs={12} key={i} sx={{display: 'flex', justifyContent: 'center'}}>
                                    {row.map((cell, j) => {
                                        const isSelectable = selectableCells.some(c => c.i === i && c.j === j);
                                        return (
                                            <Paper key={j} elevation={5}
                                                   sx={{
                                                       width: 105, height: 105,
                                                       display: "flex", alignItems: "center", justifyContent: "center",
                                                       borderRadius: "20%",
                                                       boxShadow: "0 1px 8px #0f0c12",
                                                       position: "relative",
                                                       cursor: isSelectable ? "pointer" : "default",
                                                       mr: 1
                                                   }}
                                                   onClick={() => {
                                                       if (isSelectable) {
                                                           resolveActionOnCell(i, j);
                                                       }
                                                   }}>
                                                <img
                                                    src={cell.faceUp ? cellTypeImages[cell.type] : faceDownImg}
                                                    alt={cell.type}
                                                    style={{
                                                        width: 105,
                                                        height: 105,
                                                        borderRadius: "5%",
                                                        border: isSelectable ? "1px solid #79eaff" : "1px solid #202020",
                                                        boxShadow: isSelectable ? "0 0 5px #79eaff" : "0 0 1px #202020",
                                                    }}
                                                />
                                                {room.players.filter(p => p.coordX === i && p.coordY === j).map((playerOnCell, idx) => {
                                                        const isSelectablePlayer = selectablePlayers.some(player => player.clientName === playerOnCell.clientName);
                                                        return (<img key={playerOnCell.clientId + idx}
                                                                     src={playerOnCell.status === 'DEAD' ? characterDeadTokens[playerOnCell.character] : characterAliveTokens[playerOnCell.character]}
                                                                     alt="token" style={{
                                                            width: 30,
                                                            height: 50,
                                                            position: "absolute",
                                                            left: 12 + idx * 11,
                                                            top: 40 - 20 * ((room.numberOfPlayers - idx - 1) % 2),
                                                            border: isSelectablePlayer ? '2px solid #79eaff' : '1px solid #f0f0f0',
                                                            borderRadius: '15%',
                                                            background: '#191919',
                                                            boxShadow: '0 0 4px #79eaff',
                                                            zIndex: 2,
                                                            cursor: isSelectablePlayer ? "pointer" : "default",
                                                        }}
                                                                     onClick={() => {
                                                                         if (isSelectablePlayer) {
                                                                             setSelectablePlayers([]);
                                                                             let player = selectablePlayers.find(player => player.clientName === playerOnCell.clientName);
                                                                             setSelectedPlayer(player);
                                                                             setSelectableCells(getAdjacentCells(myPlayer, room));
                                                                         }
                                                                     }}
                                                        />);
                                                    }
                                                )}
                                            </Paper>
                                        );
                                    })}
                                </Grid>
                            )}
                        </Grid>

                        {/* Панель хода */}
                        <Grid item mb={36} lg={5}>
                            <Typography variant="h6"
                                        sx={{
                                            mb: 2,
                                            color: lightBlue[300],
                                            fontWeight: 'bold',
                                            textAlign: "center",
                                            fontSize: '140%',
                                            textShadow: '0 0 10px #4fc3f7'
                                        }}>
                                Информация:
                            </Typography>
                            <Stack direction="column" spacing={2}>
                                <Box sx={{
                                    my: 2,
                                    fontSize: '1.18em',
                                    textAlign: 'center',
                                    color: "#f0f0f0",
                                    background: "#444247",
                                    borderRadius: 3,
                                    py: 2,
                                    mb: 2,
                                    boxShadow: '0 0 10px #4fc3f7',
                                    border: '3px solid #4fc3f7',
                                }}>
                            <span style={{fontWeight: "bold", fontSize: '1.15em', display: 'block'}}>
                                Раунд: {room.currentTurn} / {room.totalTurns}
                            </span>
                                    <span style={{opacity: 0.75, fontWeight: "bold", display: 'block'}}>
                                Фаза: {room.currentPhase === 1 ? "подготовка действий" : room.currentPhase === 2 ? "выполнение 1 действия" : "выполнение 2 действия"}
                            </span>
                                    <span style={{color: "#4fc3f7", fontWeight: 700, display: 'block'}}>
                                Текущий игрок: {room.currentPhase !== 1 ? currentPlayer?.clientName || "(нет)" : "(нет)"}
                            </span>
                                </Box>

                                {/* Кнопка персонажа */}
                                <Button variant="contained"
                                        sx={{
                                            fontFamily: 'Roboto, monospace',
                                            fontSize: '140%',
                                            fontWeight: 'bold',
                                            color: lightBlue["50"],
                                            backgroundColor: '#2f3851',
                                            borderRadius: 3,
                                            border: '3px solid #4fc3f7',
                                            boxShadow: '0 0 10px #4fc3f7',
                                            "&:hover": {color: '#f0f0f0', backgroundColor: '#5fbfcc'}
                                        }}
                                        disabled={room.status !== "started"}
                                        onClick={() => setSheetOpen(true)}>
                                    Карточка вашего персонажа
                                </Button>
                            </Stack>
                        </Grid>


                        {/* Стрелка наплавления сдвига */}
                        {arrowInfo && (
                            (arrowInfo.direction === "LEFT" || arrowInfo.direction === "RIGHT") && (
                                <img
                                    src={arrowImg}
                                    alt="arrow"
                                    style={{
                                        position: "absolute",
                                        left: arrowInfo.direction === "LEFT" ? `65%` : `32.8%`,
                                        top: 360 + arrowInfo.idx * 113,
                                        pointerEvents: "none",
                                        zIndex: 30,
                                        width: 40,
                                        boxShadow: "0 0 5px #4fc3f7",
                                        border: '1px solid #4fc3f7',
                                        transform: arrowInfo.direction === "LEFT" ? "rotate(270deg)" : "rotate(90deg)",
                                    }}
                                />
                            )
                        )}
                        {arrowInfo && (
                            (arrowInfo.direction === "UP" || arrowInfo.direction === "DOWN") && (
                                <img
                                    src={arrowImg}
                                    alt="arrow"
                                    style={{
                                        position: "absolute",
                                        left: `${36.7 + arrowInfo.idx * 6}%`,
                                        top: arrowInfo.direction === "UP" ? 885 : 287,
                                        pointerEvents: "none",
                                        zIndex: 30,
                                        width: 40,
                                        boxShadow: "0 0 5px #4fc3f7",
                                        border: '1px solid #4fc3f7',
                                        transform:
                                            arrowInfo.direction === "UP"
                                                ? "rotate(360deg)"
                                                : arrowInfo.direction === "DOWN"
                                                    ? "rotate(180deg)"
                                                    : "",
                                    }}
                                />
                            )
                        )}

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
                        <Stack gap={2} alignItems="center">
                            {myPlayer && (
                                <>
                                    <img src={characterSheets[myPlayer.character.toUpperCase()]} alt="character"
                                         width="1012"/>
                                    <Typography sx={{
                                        fontFamily: 'Roboto, monospace',
                                        color: '#d25b3f',
                                        textAlign: "center",
                                        mt: 2,
                                        fontWeight: 700,
                                        fontSize: '140%',
                                        textShadow: '0 0 10px #d25b3f'
                                    }}>
                                        Выбор действий:
                                    </Typography>
                                    <Typography sx={{
                                        fontFamily: 'Roboto, monospace',
                                        color: '#f0f0f0',
                                        textAlign: "center",
                                        mt: 2,
                                        fontWeight: 700,
                                        fontSize: '120%',
                                        textShadow: '0 0 5px #d25b3f'
                                    }}>
                                        Действие 1
                                    </Typography>
                                    <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
                                        {actionList
                                            .filter(a => a.value !== selectedActions[1])
                                            .map(a => (
                                                <Box
                                                    key={a.value}
                                                    component="button"
                                                    onClick={() => {
                                                        if (!isReady && room.currentPhase === 1) {
                                                            if (myPlayer.status === "FROZEN") {
                                                                if (a.value === "NONE") {
                                                                    setSelectedActions([a.value, "LOOK"]);
                                                                } else {
                                                                    setSelectedActions([a.value, "NONE"]);
                                                                }
                                                            } else {
                                                                setSelectedActions([a.value, selectedActions[1]]);
                                                            }
                                                        }
                                                    }
                                                    }
                                                    sx={{
                                                        border: a.value === selectedActions[0] ? '3px solid #4fc3f7' : "3px solid #4D220E",
                                                        boxShadow: a.value === selectedActions[0] ? '0 0 15px #4fc3f7' : '0 0 0px #4D220E',
                                                        borderRadius: 2,
                                                        background: "none",
                                                        p: 0,
                                                        outline: 'none',
                                                        mr: 1,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <img src={a.icon} alt={a.label} width={128}
                                                         style={{display: "block", borderRadius: 5}}/>
                                                </Box>
                                            ))}
                                    </Stack>
                                    <Typography sx={{
                                        fontFamily: 'Roboto, monospace',
                                        color: '#f0f0f0',
                                        textAlign: "center",
                                        mt: 2,
                                        fontWeight: 700,
                                        fontSize: '120%',
                                        textShadow: '0 0 5px #d25b3f'
                                    }}>
                                        Действие 2
                                    </Typography>
                                    <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
                                        {actionList
                                            .filter(a => a.value !== selectedActions[0])
                                            .map(a => (
                                                <Box
                                                    key={a.value}
                                                    component="button"
                                                    onClick={() => {
                                                        if (!isReady && room.currentPhase === 1) {
                                                            if (myPlayer.status === "FROZEN") {
                                                                if (a.value === "NONE") {
                                                                    setSelectedActions(["LOOK", a.value]);
                                                                } else {
                                                                    setSelectedActions(["NONE", a.value]);
                                                                }
                                                            } else {
                                                                setSelectedActions([selectedActions[0], a.value]);
                                                            }
                                                        }
                                                    }
                                                    }
                                                    sx={{
                                                        border: a.value === selectedActions[1] ? '3px solid #4fc3f7' : "3px solid #4D220E",
                                                        boxShadow: a.value === selectedActions[1] ? '0 0 15px #4fc3f7' : '0 0 0px #4D220E',
                                                        borderRadius: 2,
                                                        background: "none",
                                                        p: 0,
                                                        outline: 'none',
                                                        mr: 1,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <img src={a.icon} alt={a.label} width={128}
                                                         style={{display: "block", borderRadius: 5}}/>
                                                </Box>
                                            ))}
                                    </Stack>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            fontFamily: 'Roboto, monospace',
                                            fontSize: '140%',
                                            fontWeight: 'bold',
                                            color: lightBlue["50"],
                                            backgroundColor: '#202020',
                                            "&:hover": {color: '#f0f0f0', backgroundColor: '#5fbfcc'}
                                        }}
                                        onClick={handleSubmitActions}
                                        disabled={selectedActions[0] === null || selectedActions[1] === null || waitingActions === true || room.currentPhase !== 1}
                                    >Готов!</Button>
                                </>
                            )}
                        </Stack>
                        {waitingActions && room.currentPhase === 1 && (
                            <Typography sx={{
                                fontFamily: 'Roboto, monospace',
                                color: '#d25b3f',
                                textAlign: "center",
                                mt: 2,
                                fontWeight: 700,
                                textShadow: '0 0 10px #d25b3f'
                            }}>
                                Ждём других игроков...
                            </Typography>
                        )}
                        {room.currentPhase !== 1 && (
                            <Typography sx={{
                                fontFamily: 'Roboto, monospace',
                                color: '#d25b3f',
                                textAlign: "center",
                                mt: 2,
                                fontWeight: 700,
                                textShadow: '0 0 10px #d25b3f'
                            }}>
                                Ждём завершения фазы действий...
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSheetOpen(false)} sx={{
                            borderRadius: '12px',
                            width: '120px',
                            color: '#f0f0f0',
                            backgroundColor: '#2e415f',
                            fontFamily: 'Roboto, monospace',
                            fontSize: '100%',
                            fontWeight: 'bold',
                            "&:hover": {color: '#ffffff', backgroundColor: '#334871'}
                        }}>Закрыть</Button>
                    </DialogActions>
                </Dialog>

                {/* Просмотр поля после LOOK */}
                <Dialog
                    PaperProps={{
                        sx: {backgroundColor: 'rgba(35,38,49,0.98)', color: '#f0f0f0', position: 'relative'}
                    }}
                    open={lookDialogOpen}
                    onClose={() => {
                        setLookDialogOpen(false);
                        goToNextAction(room);
                    }}>
                    <DialogContent className="custom-scrollbar" sx={{
                        background: "#29374e",
                        color: "#f0f0f0",
                        borderRadius: "0%",
                        borderColor: "#29374e"
                    }}>
                        <Stack gap={2} alignItems="center">
                            {lookedCell && (
                                <>
                                    <Typography sx={{fontSize: 24, fontWeight: 700, mb: 2}}>
                                        {`Вы посмотрели комнату [${lookedCell.i + 1} ряд, ${lookedCell.j + 1} столбец]:`}
                                    </Typography>
                                    <img
                                        src={cellTypeImages[lookedCell.cell.type]}
                                        alt={lookedCell.cell.type}
                                        style={{
                                            width: 130,
                                            marginBottom: 12,
                                            marginTop: 6,
                                            borderRadius: 12,
                                            boxShadow: "0 0 8px #78eefa"
                                        }}
                                    />
                                </>
                            )}
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{background: "#29374e", color: "#f0f0f0"}}>
                        <Button
                            onClick={() => {
                                setLookDialogOpen(false);
                                goToNextAction(room);
                            }}
                            sx={{
                                borderRadius: '12px',
                                width: '120px',
                                color: '#f0f0f0',
                                backgroundColor: '#334871',
                                fontFamily: 'Roboto, monospace',
                                fontSize: '100%',
                                fontWeight: 'bold',
                                "&:hover": {color: '#ffffff', backgroundColor: '#435881'}
                            }}
                        >
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* Модальное окно, если действие NONE */}
                <Dialog
                    PaperProps={{
                        sx: {backgroundColor: 'rgba(35,38,49,0.98)', color: '#f0f0f0', position: 'relative'}
                    }}
                    open={noneDialogOpen}
                    onClose={() => {
                        setNoneDialogOpen(false);
                        goToNextAction(room);
                    }}>
                    <DialogContent className="custom-scrollbar" sx={{
                        background: "#29374e",
                        color: "#f0f0f0",
                        borderRadius: "0%",
                        borderColor: "#29374e",
                        minHeight: '200px',
                    }}>
                        <Stack gap={2} alignItems="center">
                            <>
                                <Typography sx={{fontSize: 24, fontWeight: 700, mb: 2}}>
                                    {`[Пропуск хода] Вы решили отдохнуть и подумать о том, как вы до этого всего докатились...`}
                                </Typography>
                            </>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{background: "#29374e", color: "#f0f0f0"}}>
                        <Button
                            onClick={() => {
                                setNoneDialogOpen(false);
                                goToNextAction(room);
                            }}
                            sx={{
                                borderRadius: '12px',
                                width: '120px',
                                color: '#f0f0f0',
                                backgroundColor: '#334871',
                                fontFamily: 'Roboto, monospace',
                                fontSize: '100%',
                                fontWeight: 'bold',
                                "&:hover": {color: '#ffffff', backgroundColor: '#435881'}
                            }}
                        >
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* Модальное окно, если действие CONTROL */}
                <Dialog
                    PaperProps={{
                        sx: {backgroundColor: 'rgba(35,38,49,0.98)', color: '#f0f0f0', position: 'relative'}
                    }}
                    open={controlDialogOpen}
                    onClose={() => setControlDialogOpen(false)} maxWidth="xs" fullWidth>
                    <DialogContent sx={{
                        background: "#29374e",
                        color: "#f0f0f0",
                        borderRadius: "0%",
                        borderColor: "#29374e"
                    }}>
                        <Box sx={{mb: 3, textAlign: 'center'}}>
                            <Typography sx={{
                                color: '#d25b3f',
                                fontFamily: 'Roboto, monospace',
                                fontWeight: 'bold',
                                fontSize: '140%',
                                mb: 1
                            }}>Линия сдвига (кроме центра)</Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'start',
                                gap: 3,
                                width: '100%'
                            }}>
                                {controlOptions.map(md => (
                                    <Box key={md.value}
                                         sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <ToggleButton
                                            value={md.value}
                                            selected={controlType === md.value}
                                            onClick={() => {
                                                if (md.value === "ROW") {
                                                    if (myPlayer.coordX !== 2) {
                                                        setControlType("ROW");
                                                        setControlIdx(myPlayer.coordX);
                                                        if (room.controlData.row === myPlayer.coordX && room.controlData.orientation === "RIGHT") {
                                                            setControlDirection("RIGHT");
                                                        } else {
                                                            setControlDirection("LEFT");
                                                        }
                                                    }
                                                } else {
                                                    if (myPlayer.coordY !== 2) {
                                                        setControlType("COLUMN");
                                                        setControlIdx(myPlayer.coordY);
                                                        if (room.controlData.row === myPlayer.coordY && room.controlData.orientation === "DOWN") {
                                                            setControlDirection("DOWN");
                                                        } else {
                                                            setControlDirection("UP");
                                                        }
                                                    }
                                                }
                                            }
                                            }
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

                        {/*                        <Typography sx={{ mb: 1 }}>
                            {controlType==="ROW" ? "Выберите ряд:" : "Выберите столбец:"}
                        </Typography>
                        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
                            {(controlType === "ROW" ? rows : cols).map(idx =>
                                <Button
                                    key={idx}
                                    variant={controlIdx === idx ? "contained" : "outlined"}
                                    onClick={()=>setControlIdx(idx)}
                                >
                                    {idx+1}
                                </Button>
                            )}
                        </Stack>*/}

                        <Box sx={{mb: 3, textAlign: 'center'}}>
                            <Typography sx={{
                                color: '#d25b3f',
                                fontFamily: 'Roboto, monospace',
                                fontWeight: 'bold',
                                fontSize: '140%',
                                mb: 1
                            }}>Направление сдвига</Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'start',
                                gap: 3,
                                width: '100%'
                            }}>
                                {controlType === "ROW" ?
                                    controlRowOptions.map(md => (
                                        <Box key={md.value}
                                             sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                            <ToggleButton
                                                value={md.value}
                                                selected={controlDirection === md.value}
                                                onClick={() => {
                                                    if (md.value === "LEFT") {
                                                        if (!(room.controlData.row === myPlayer.coordX && room.controlData.orientation === "RIGHT")) {
                                                            setControlDirection("LEFT");
                                                        }
                                                    } else {
                                                        if (!(room.controlData.row === myPlayer.coordX && room.controlData.orientation === "LEFT")) {
                                                            setControlDirection("RIGHT");
                                                        }
                                                    }
                                                }
                                                }
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
                                                    '&.Mui-selected:hover': {
                                                        color: '#f0f0f0',
                                                        backgroundColor: '#5fbfcc'
                                                    }
                                                }}
                                            >
                                                {md.label}
                                            </ToggleButton>
                                        </Box>
                                    )) :
                                    controlColumnOptions.map(md => (
                                        <Box key={md.value}
                                             sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                            <ToggleButton
                                                value={md.value}
                                                selected={controlDirection === md.value}
                                                onClick={() => {
                                                    if (md.value === "UP") {
                                                        if (!(room.controlData.row === myPlayer.coordY && room.controlData.orientation === "DOWN")) {
                                                            setControlDirection("UP");
                                                        }
                                                    } else {
                                                        if (!(room.controlData.row === myPlayer.coordY && room.controlData.orientation === "UP")) {
                                                            setControlDirection("DOWN");
                                                        }
                                                    }
                                                }
                                                }
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
                                                    '&.Mui-selected:hover': {
                                                        color: '#f0f0f0',
                                                        backgroundColor: '#5fbfcc'
                                                    }
                                                }}
                                            >
                                                {md.label}
                                            </ToggleButton>
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{background: "#29374e", color: "#f0f0f0"}}>
                        <Button
                            onClick={() => {
                                resolveControlAction();
                            }}
                            sx={{
                                borderRadius: '10px',
                                width: '120px',
                                color: '#f0f0f0',
                                backgroundColor: '#334871',
                                fontFamily: 'Roboto, monospace',
                                fontSize: '110%',
                                fontWeight: 'bold',
                                "&:hover": {color: '#ffffff', backgroundColor: '#436881'}
                            }}
                        >Сдвинуть</Button>
                    </DialogActions>
                </Dialog>

                {/* Модальное окно, если победа */}
                <Dialog
                    PaperProps={{
                        sx: {backgroundColor: 'rgba(35,38,49,0.98)', color: '#f0f0f0', position: 'relative'}
                    }}
                    open={gameStatus === "won"}>
                    <DialogContent className="custom-scrollbar" sx={{
                        background: "#29374e",
                        color: "#f0f0f0",
                        borderRadius: "0%",
                        borderColor: "#29374e",
                        minHeight: '200px',
                    }}>
                        <Stack gap={2} alignItems="center">
                            <>
                                <Typography sx={{fontSize: 24, fontWeight: 700, mb: 2}}>
                                    {`Вы выиграли! Но шоу должно продолжаться...`}
                                </Typography>
                            </>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{background: "#29374e", color: "#f0f0f0"}}>
                        <Button
                            onClick={() => {
                                onToHome();
                            }}
                            sx={{
                                borderRadius: '12px',
                                width: '120px',
                                color: '#f0f0f0',
                                backgroundColor: '#334871',
                                fontFamily: 'Roboto, monospace',
                                fontSize: '100%',
                                fontWeight: 'bold',
                                "&:hover": {color: '#ffffff', backgroundColor: '#435881'}
                            }}
                        >
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Модальное окно, если проигрыш */}
                <Dialog
                    PaperProps={{
                        sx: {backgroundColor: 'rgba(35,38,49,0.98)', color: '#f0f0f0', position: 'relative'}
                    }}
                    open={gameStatus === "lost"}>
                    <DialogContent className="custom-scrollbar" sx={{
                        background: "#29374e",
                        color: "#f0f0f0",
                        borderRadius: "0%",
                        borderColor: "#29374e",
                        minHeight: '200px',
                    }}>
                        <Stack gap={2} alignItems="center">
                            <>
                                <Typography sx={{fontSize: 24, fontWeight: 700, mb: 2}}>
                                    {`Вы проиграли! Впрочем, это было даже интересно...`}
                                </Typography>
                            </>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{background: "#29374e", color: "#f0f0f0"}}>
                        <Button
                            onClick={() => {
                                onToHome();
                            }}
                            sx={{
                                borderRadius: '12px',
                                width: '120px',
                                color: '#f0f0f0',
                                backgroundColor: '#334871',
                                fontFamily: 'Roboto, monospace',
                                fontSize: '100%',
                                fontWeight: 'bold',
                                "&:hover": {color: '#ffffff', backgroundColor: '#435881'}
                            }}
                        >
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}
