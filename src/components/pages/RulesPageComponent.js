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
import noneAction from '../../assets/images/actions/NONE.png'

import {useNavigate} from "react-router-dom";
import {lightBlue} from "@mui/material/colors";

/**
 * Functional component that describes Rules page.
 */
export default function RulesPageComponent() {
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
                                В режиме Подозрение среди игроков могут быть тайные предатели!
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
                                        secondary="Хост настраивает параметры игровой комнаты: режим, сложность, количество игроков, выбор персонажа."
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
                                        secondary="Игроки входят в комнату по уникальному ID, полученному от хоста, и выбирают своего персонажа."
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
                                        primary="Подготовка игрового поля"
                                        secondary="Игровое поле строится из случайных комнат (сложность игры влияет на то, какие комнаты будут в генерации). Одна комната — стартовая, одна — Room 25 (выход), остальные могут как таить в себе опасности, так и быть полезными для игроков."
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
                                        secondary="В каждом раунде игроки выбирают по два действия (перемещение, исследование, контроль или выталкивание). Можете обсудить свои мысли с другими игроками — но будьте осторожны с доверием!"
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
                                        secondary="Для спасения из комплекса игроки должны:
                                         Активировать ключевую комнату (только в режиме Кооперации),
                                         Найти комнату 25 и вместе зайти в нее,
                                         Выдвинуть комнату 25 вместе со всеми заключенными через Зону выхода при помощи действия Контроль, пока не закончилось число ходов. В режиме подозрения — будьте внимательны: среди вас также может быть Надзиратель, который должен помешать вам в побеге!"
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
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Перемещение"
                                        secondary="Переместите своего персонажа в соседнюю комнату. Если эта комната все еще скрыта, то она переворачивается и остается открытой до конца игры. Затем сразу же выполните эффект этой комнаты. Эффект комнаты срабатывает каждый раз, когда в нее заходит персонаж."
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
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Исследование"
                                        secondary="Выберите скрытую соседнюю комнату и втайне посмотрите на нее. Остальным игрокам вы можете назвать только цвет комнаты: красный, зеленый, желтый или голубой. Вы НЕ можете сообщать другим игрокам ее название."
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
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Контроль"
                                        secondary="Выберите ряд или столбец комплекса из 5 комнат, в который входит комната с вашим персонажем, и выберите направление сдвига. Все комнаты в этом ряду сдвигаются на одну клетку вместе с находящимися в них персонажами. Вышедшая за пределы комплекса комната сдвигается в начало ряда. Жетон направления у сдвинутого ряда будет показывать направление его движения. За время одного раунда ряд можно сдвинуть несколько раз, но только в одном направлении. Центральную комнату НЕЛЬЗЯ сдвигать, поэтому вы НЕ МОЖЕТЕ использовать это действие на ряду или столбце с центральной комнатой."
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
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Выталкивание"
                                        secondary="Переместите в соседнюю комнату другого персонажа, стоящего с вами в одной комнате. Если комната была скрыта, она открывается. После этого персонаж выполняет эффект комнаты, в которой он оказался. ЗАПРЕЩЕНО толкать персонажей ИЗ центральной комнаты, но не запрещается толкать персонажей В центральную комнату."
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
                                    <img src={pushAction} alt="Выталкивание" style={{
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
                                    my: 2
                                }}>
                                    <ListItemText
                                        primary="Ничешл не делать"
                                        secondary="Одним своим действием вы можете выбрать отсутствие действия. Это позволит вам пропустить ход, если вы не хотите чего-то делать или собираетесь подождать действий остальных игроков."
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
                                    <img src={noneAction} alt="Ничего не делать" style={{
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
                                        secondary="Все игроки — одна команда. Цель — сбежать вместе."
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
                                        secondary="В игре могут быть Надзиратели, задача которых — помешать другим выбраться."
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