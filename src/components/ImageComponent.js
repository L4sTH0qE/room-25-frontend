import React, {useEffect, useState} from 'react';

const ImageComponent = ({imagePath}) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch('http://localhost:8080/image?imagePath=' + imagePath, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBbGV4YW5kZXIiLCJpYXQiOjE3Mzc1NjA1NDIsImV4cCI6MTczNzY0Njk0Mn0.hzhbU5FFQCsQ2CiXa36nxTbJgZgYQiRQNIU2CLccW7w'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImageSrc(url);
            } catch (error) {
                console.error('Error fetching the image:', error);
            }
        };

        fetchImage();
    }, [imagePath]);

    return (
        <div>
            {imageSrc ? (
                <img src={imageSrc} className="App-logo" alt="Fetched from server" loading="lazy"/>
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default ImageComponent;
