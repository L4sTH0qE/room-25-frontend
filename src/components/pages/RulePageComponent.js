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
} from '@mui/material';

import generalRooms from '../../assets/images/rooms/GENERAL.png'
import saveRooms from '../../assets/images/rooms/SAVE.png'
import neutralRooms from '../../assets/images/rooms/NEUTRAL.png'
import dangerousRooms from '../../assets/images/rooms/DANGEROUS.png'

import lookAction from '../../assets/images/actions/LOOK.png'
import moveAction from '../../assets/images/actions/MOVE.png'
import pushAction from '../../assets/images/actions/PUSH.png'
import controlAction from '../../assets/images/actions/CONTROL.png'

import {useNavigate} from "react-router-dom";
import {lightBlue} from "@mui/material/colors";

/**
 * Functional component that describes Rules page.
 */
export default function RulePageComponent() {
    const [openRules, setOpenRules] = useState(true);
    const navigate = useNavigate();

    const onToHome = () => {
        setOpenRules(false);
        navigate("/");
    };

    return (
        <>
            <div className="start-content">
                <Dialog
                    open={openRules}
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
                                Room 25: Правила игры
                            </Typography>
                            <Typography variant="subtitle1" sx={{fontFamily: 'Roboto, monospace', mb: 2}}>
                                Добро пожаловать в «Room 25» — кооперативную приключенческую игру на выживание, в
                                которой
                                каждый ход
                                может стать последним!
                            </Typography>

                            <Divider sx={{my: 2, bgcolor: lightBlue[100]}}/>

                            <Typography variant="h5" gutterBottom
                                        sx={{fontFamily: 'Roboto, monospace', fontWeight: 700, color: '#d25b3f'}}>
                                Общее описание
                            </Typography>
                            <Typography sx={{fontFamily: 'Roboto, monospace', mb: 3}}>
                                <b>Room 25</b> — это онлайн-адаптация одноимённой настольной игры, где 1–6 игроков
                                пытаются
                                спастись из загадочного комплекса, наполненного ловушками, сюрпризами и тайнами. Играть
                                можно
                                бесплатно со своими друзьями с предварительной регистрацией.
                            </Typography>
                            <List>
                                <ListItem><ListItemText
                                    primary="1. Создавайте или присоединяйтесь к игровым комнатам"
                                    primaryTypographyProps={{
                                        sx: {
                                            fontFamily: 'Roboto, monospace',
                                            fontWeight: 500,
                                            color: '#f0f0f0'
                                        }
                                    }}/>
                                </ListItem>
                                <ListItem><ListItemText
                                    primary="2. Выбирайте персонажа, сложность и игровой режим"
                                    primaryTypographyProps={{
                                        sx: {
                                            fontFamily: 'Roboto, monospace',
                                            fontWeight: 500,
                                            color: '#f0f0f0'
                                        }
                                    }}/>
                                </ListItem>
                                <ListItem><ListItemText
                                    primary="3. Оценивайте статистику своих прошлых игр"
                                    primaryTypographyProps={{
                                        sx: {
                                            fontFamily: 'Roboto, monospace',
                                            fontWeight: 500,
                                            color: '#f0f0f0'
                                        }
                                    }}/>
                                </ListItem>
                            </List>

                            <Divider sx={{my: 2, bgcolor: lightBlue[100]}}/>

                            <Typography variant="h5" gutterBottom
                                        sx={{fontFamily: 'Roboto, monospace', fontWeight: 700, color: '#d25b3f'}}>
                                Цель игры
                            </Typography>
                            <Typography sx={{fontFamily: 'Roboto, monospace', mb: 3}}>
                                Найти выход — комнату 25 — и выбраться всей командой до конца последнего раунда.<br/>
                                В некоторых режимах среди игроков могут быть тайные предатели!
                            </Typography>

                            <Divider sx={{my: 2, bgcolor: lightBlue[100]}}/>

                            <Typography variant="h5" gutterBottom
                                        sx={{fontFamily: 'Roboto, monospace', fontWeight: 700, color: '#d25b3f'}}>
                                Кратко о процессе
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Создание комнаты"
                                        secondary="Хост настраивает параметры: режим, сложность, количество игроков, выбор персонажей."
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
                                        primary="Присоединение"
                                        secondary="Игроки входят в комнату по уникальному ID, полученному от хоста."
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
                                        primary="Игровое поле"
                                        secondary="Строится из случайных комнат (тайная карта). Одна комната — стартовая, одна — Room 25 (выход), остальные содержат опасности или являются нейтральными."
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
                                        primary="Ходы"
                                        secondary="В каждый раунд игроки выбирают по два действия (перемещение, исследование, сдвиг комнаты или выталкивание). Можете обсудить свои мысли с другими игроками — но будьте осторожны с доверием!"
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
                                        primary="Победа или поражение"
                                        secondary="Для победы: всей командой оказаться в Room 25, пока не кончилось число ходов. В режиме подозрения — будьте внимательны: среди вас может быть Надзиратель!"
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
                                        sx={{fontFamily: 'Roboto, monospace', fontWeight: 700, color: '#d25b3f'}}>Доступные
                                действия</Typography>
                            <List>
                                <ListItem sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 3,
                                    alignItems: 'flex-start',
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Перемещение"
                                        secondary="Переход в открытую соседнюю комнату (по вертикали/горизонтали)."
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
                                                color: '#f0f0f0',
                                                maxWidth: 300
                                            }
                                        }}
                                    />
                                    <img src={moveAction} alt="Перемещение" style={{
                                        maxWidth: "25%",
                                        borderRadius: "18px",
                                        marginBottom: "14px",
                                        boxShadow: '0 0 18px #172916'
                                    }}/>
                                </ListItem>
                                <ListItem sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 3,
                                    alignItems: 'flex-start',
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Исследование"
                                        secondary="Посмотреть тип закрытой соседней комнаты (информация остается только у вас)."
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
                                                color: '#f0f0f0',
                                                maxWidth: 400
                                            }
                                        }}
                                    />
                                    <br/>
                                    <img src={lookAction} alt="Исследование" style={{
                                        maxWidth: "25%",
                                        borderRadius: "18px",
                                        marginBottom: "14px",
                                        boxShadow: '0 0 18px #172916'
                                    }}/>
                                </ListItem>
                                <ListItem sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 3,
                                    alignItems: 'flex-start',
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Контроль"
                                        secondary="Передвинуть выбранную строку или столбец поля, изменяя расположение комнат лабиринта."
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
                                                color: '#f0f0f0',
                                                maxWidth: 400
                                            }
                                        }}
                                    />
                                    <img src={controlAction} alt="Контроль" style={{
                                        maxWidth: "25%",
                                        borderRadius: "18px",
                                        marginBottom: "14px",
                                        boxShadow: '0 0 18px #172916'
                                    }}/>
                                </ListItem>
                                <ListItem sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 3,
                                    alignItems: 'flex-start',
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Выталкивание"
                                        secondary="Передвинуть другого игрока в соседнюю комнату."
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
                                    <img src={pushAction} alt="Выталкивание" style={{
                                        maxWidth: "25%",
                                        borderRadius: "18px",
                                        marginBottom: "14px",
                                        boxShadow: '0 0 18px #172916'
                                    }}/>
                                </ListItem>
                            </List>

                            <Divider sx={{my: 2, bgcolor: lightBlue[100]}}/>

                            <Typography variant="h5" gutterBottom
                                        sx={{fontFamily: 'Roboto, monospace', fontWeight: 700, color: '#d25b3f'}}>
                                Основные типы комнат
                            </Typography>
                            <List>
                                <ListItem sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 3,
                                    justifyContent: 'left',
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Специальные комнаты"
                                        secondary="Особые комнаты, которые напрямую влияют на победу в игре."
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
                                    <img src={generalRooms} alt="Специальные комнаты" style={{
                                        maxWidth: "60%",
                                        borderRadius: "18px",
                                        marginBottom: "14px",
                                        boxShadow: '0 0 18px #172916'
                                    }}/>
                                </ListItem>
                                <ListItem sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 3,
                                    justifyContent: 'left',
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Безопасные комнаты"
                                        secondary="Не содержат ловушек — просто пусты или имеют полезные для победы в игре свойства"
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
                                    <img src={saveRooms} alt="Безопасные комнаты" style={{
                                        maxWidth: "100%",
                                        borderRadius: "18px",
                                        marginBottom: "14px",
                                        boxShadow: '0 0 18px #172916'
                                    }}/>
                                </ListItem>
                                <ListItem sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 3,
                                    justifyContent: 'left',
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Нейтральные комнаты"
                                        secondary="Не содержат ловушек, но могут препятствовать в достижении победы."
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
                                    <img src={neutralRooms} alt="Нейтральные комнаты" style={{
                                        maxWidth: "100%",
                                        borderRadius: "18px",
                                        marginBottom: "14px",
                                        boxShadow: '0 0 18px #172916'
                                    }}/>
                                </ListItem>
                                <ListItem sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 3,
                                    justifyContent: 'left',
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Опасные комнаты"
                                        secondary="Могут приводить к мгновенному проигрышу, перемещению или другим негативным эффектам. Проверяйте исследованием!"
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
                                    <img src={dangerousRooms} alt="Опасные комнаты" style={{
                                        maxWidth: "100%",
                                        borderRadius: "18px",
                                        marginBottom: "14px",
                                        boxShadow: '0 0 18px #172916'
                                    }}/>
                                </ListItem>
                            </List>

                            <Divider sx={{my: 2, bgcolor: lightBlue[100]}}/>

                            <Typography variant="h5" gutterBottom
                                        sx={{fontFamily: 'Roboto, monospace', fontWeight: 700, color: '#d25b3f'}}>
                                Режимы игры
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Кооперация"
                                        secondary="Все игроки — одна команда, не подозревают друг друга. Цель — сбежать вместе."
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
                                        primary="Подозрение (будет позже)"
                                        secondary="В игре могут быть скрытые предатели, задача которых — помешать другим выбраться."
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