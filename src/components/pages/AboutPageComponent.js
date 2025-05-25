import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import {lightBlue} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";

/**
 * Functional component that describes About page.
 */
export default function AboutPageComponent() {
    const [openAbout, setOpenAbout] = useState(true);

    const navigate = useNavigate();

    const onToHome = () => {
        setOpenAbout(false);
        navigate("/");
    };

    return (
        <>
            <div className="start-content">
                <Dialog
                    open={openAbout}
                    onClose={onToHome}
                    fullWidth
                    maxWidth="md"
                    PaperProps={{
                        sx: {backgroundColor: 'rgba(35,38,49,0.98)', color: '#f0f0f0', position: 'relative'}
                    }}
                    BackdropProps={{
                        style: {background: 'rgba(25,25,25,0.90)'}
                    }}
                >
                    <DialogContent className="custom-scrollbar">
                        <Paper elevation={3} sx={{
                            mx: 'auto',
                            my: 3,
                            px: {xs: 2, md: 5},
                            py: {xs: 2, md: 4},
                            maxWidth: '900px',
                            background: '#29374e',
                            color: '#f0f0f0'
                        }}>
                            <Typography variant="h3" gutterBottom
                                        sx={{fontFamily: 'Roboto, monospace', fontWeight: 700, color: '#d25b3f'}}>
                                О проекте Room 25
                            </Typography>
                            <Typography variant="subtitle1" sx={{fontFamily: 'Roboto, monospace', mb: 2}}>
                                Онлайн-настольная игра "Room 25" — это браузерное веб-приложение, позволяющее
                                игрокам принимать участие в захватывающих сессиях популярной кооперативной игры через
                                интернет.
                            </Typography>

                            <Divider sx={{my: 2, bgcolor: lightBlue[100]}}/>

                            <Typography variant="h5" gutterBottom
                                        sx={{fontFamily: 'Roboto, monospace', fontWeight: 700, color: '#d25b3f'}}>
                                Требования к оборудованию (Клиент)
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="ОС:"
                                        secondary="Windows, MacOS, Linux"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                                fontWeight: 700
                                            }
                                        }}
                                        secondaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0'
                                            }
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Браузер:"
                                        secondary="Firefox 110+, Opera 91+, Chrome 105+"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                                fontWeight: 700
                                            }
                                        }}
                                        secondaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0'
                                            }
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Оперативная память:"
                                        secondary="1,5 ГБ и более"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                                fontWeight: 700
                                            }
                                        }}
                                        secondaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0'
                                            }
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Видеопамять:"
                                        secondary="2,5 ГБ и более"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                                fontWeight: 700,
                                            }
                                        }}
                                        secondaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0'
                                            }
                                        }}
                                    />
                                    <br/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Свободное место на диске:"
                                        secondary="1 ГБ и более"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                                fontWeight: 700
                                            }
                                        }}
                                        secondaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0'
                                            }
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Интернет:"
                                        secondary="от 5 Мбит/с"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                                fontWeight: 700
                                            }
                                        }}
                                        secondaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0'
                                            }
                                        }}
                                    />
                                </ListItem>
                            </List>

                            <Divider sx={{my: 2, bgcolor: lightBlue[100]}}/>

                            <Typography variant="h5" gutterBottom
                                        sx={{fontFamily: 'Roboto, monospace', fontWeight: 700, color: '#d25b3f'}}>
                                Требования к оборудованию (Сервер)
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Оперативная память:"
                                        secondary="8 ГБ"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                                fontWeight: 700
                                            }
                                        }}
                                        secondaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0'
                                            }
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="SSD:"
                                        secondary="16 ГБ"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                                fontWeight: 700
                                            }
                                        }}
                                        secondaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0'
                                            }
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="2 vCPU:"
                                        secondary="Intel Xeon E5 2620 или AMD EPYC 7402P"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                                fontWeight: 700
                                            }
                                        }}
                                        secondaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0'
                                            }
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Интернет:"
                                        secondary="от 100 Мбит/с"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                                fontWeight: 700
                                            }
                                        }}
                                        secondaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0'
                                            }
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Поддержка:"
                                        secondary="Java 17+, Spring Boot 3.4, PostgreSQL 16.1+"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                                fontWeight: 700
                                            }
                                        }}
                                        secondaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0'
                                            }
                                        }}
                                    />
                                </ListItem>
                            </List>

                            <Divider sx={{my: 2, bgcolor: lightBlue[100]}}/>

                            <Typography variant="h5" gutterBottom
                                        sx={{fontFamily: 'Roboto, monospace', fontWeight: 700, color: '#d25b3f'}}>
                                Поддерживаемые браузеры
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Mozilla Firefox 110+"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                            }
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Opera 91+"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                            }
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Google Chrome 105+"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                            }
                                        }}
                                    />
                                </ListItem>
                            </List>

                            <Divider sx={{my: 2, bgcolor: lightBlue[100]}}/>

                            <Typography variant="h5" gutterBottom
                                        sx={{fontFamily: 'Roboto, monospace', fontWeight: 700, color: '#d25b3f'}}>
                                Распространение и поддержка
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Лицензионных платежей не требуется"
                                        primaryTypographyProps={{
                                            sx: {
                                                fontFamily: 'Roboto, monospace',
                                                color: '#f0f0f0',
                                            }
                                        }}
                                    />
                                </ListItem>
                            </List>

                            <Box sx={{mt: 4, mb: 2, textAlign: 'center'}}>
                                <Button
                                    className="start-game-btn"
                                    sx={{
                                        borderRadius: '12px',
                                        fontFamily: 'Roboto, monospace',
                                        fontSize: '150%',
                                        fontWeight: 700,
                                        color: '#f0f0f0',
                                        backgroundColor: '#334871',
                                        "&:hover": {color: '#ffffff', backgroundColor: '#435881'},
                                        px: 4,
                                        py: 1,
                                        my: 2
                                    }}
                                    onClick={onToHome}
                                >
                                    Вернуться в меню
                                </Button>
                            </Box>
                        </Paper>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}