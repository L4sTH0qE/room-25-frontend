import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Chip, Grid, Paper, Stack, Typography} from "@mui/material";
import {lightBlue} from "@mui/material/colors";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

/**
 * Functional component that describes Game page.
 */
export default function GamePageComponent(props) {
    const { id } = useParams(); // id комнаты
    const navigate = useNavigate();
    const [stompClient, setStompClient] = useState(null);
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

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
                    console.log(message);
                    const roomData = JSON.parse(message.body);
                    setRoom(roomData);
                    setLoading(false);
                });

                setStompClient(client);
            }, (error) => {
                setLoading(false);
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

    if (loading || !room) return <div>Загрузка...</div>;

    // Отрисовка игрового состояния
    return (
        <div>
            <h2>Статус: {room.status}</h2>
            <h3>Игроки:</h3>
            <ul>
                {room.players.map(p => (
                    <li key={p.clientId}>
                        <b>{p.clientName}</b> ({p.character}) - [{p.coordX},{p.coordY}] {p.status} {p.isAlive ? "" : "(мертв)"}
                    </li>
                ))}
            </ul>
            <h3>Игровое поле:</h3>
            <table>
                <tbody>
                {room.board.map((row, i) =>
                    <tr key={i}>
                        {row.map((cell, j) =>
                            <td key={j} style={{border:"1px solid #ace", width:40, height:40,
                                background: cell.isFaceUp ? "#cdf" : "#333" }}>
                                {cell.type}
                            </td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
            <div>
                Текущий ход: {room.currentTurn} / {room.totalTurns}, фаза: {room.currentPhase}
            </div>
            <div>
                Активный игрок: {
                room.players[room.currentPlayer]
                    ? room.players[room.currentPlayer].clientName
                    : "(нет)"
            }
            </div>
        </div>
    );
}
