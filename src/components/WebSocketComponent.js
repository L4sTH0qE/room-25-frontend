import React, {useEffect, useState} from 'react';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {useNavigate} from "react-router-dom";

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [inputMessage, setInputMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Создаем SockJS соединение
        const socket = new SockJS('http://localhost:8080/portfolio');

        // Создаем STOMP клиент
        const client = Stomp.over(socket);
        const token = localStorage.getItem('jwtToken');
        console.log(`Token: ${token}`);
        if (!token) {
            navigate("/");
        }
        // Подключаемся к серверу
        client.connect(
            {Authorization: `Bearer ${token}`},
            (frame) => {
                console.log(`Connected: ${frame}`);

                // Подписываемся на топик
                client.subscribe('/topic/your-topic', (message) => {
                    if (message.body) {
                        setMessages((prevMessages) => [...prevMessages, message.body]);
                    }
                });

                // Сохраняем клиента в состоянии
                setStompClient(client);
            }, (error) => {
                console.error('Error connecting: ' + error);
            }
        );

        // Очистка при размонтировании компонента
        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, []);

    const sendMessage = () => {
        if (stompClient && inputMessage) {
            // Отправляем сообщение на /app/chat
            stompClient.send('/app/chat', {}, JSON.stringify({message: inputMessage}));
            setInputMessage(''); // Очищаем поле ввода после отправки
        }
    };

    return (
        <div>
            <h2>WebSocket Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Введите сообщение"
            />
            <button onClick={sendMessage}>Отправить</button>
        </div>
    );
};

export default WebSocketComponent;
