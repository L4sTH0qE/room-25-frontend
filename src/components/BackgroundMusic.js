import React, {useEffect, useRef, useState} from 'react';
import mainTheme from '../assets/sounds/room_25_main_theme.mp3'

const BackgroundMusic = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        const audio = audioRef.current;
        audio.volume = 0.25;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const audio = audioRef.current;


        // Устанавливаем событие на завершение трека для повторного воспроизведения
        const handleEnded = () => {
            audio.currentTime = 0; // Сброс времени
            audio.play(); // Запускаем снова
        };

        audio.addEventListener('ended', handleEnded);

        // Очистка события при размонтировании компонента
        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.pause(); // Останавливаем аудио при размонтировании
        };
    }, []);

    return (
        <div>
            <audio ref={audioRef} loop>
                <source src={mainTheme} type="audio/mpeg"/>
                Your browser does not support the audio tag.
            </audio>
            <button onClick={togglePlay}>
                {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>
        </div>
    );
};

export default BackgroundMusic;
