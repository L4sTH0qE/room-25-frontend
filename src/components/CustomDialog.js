import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../App.css";
import {Box} from "@mui/material";

/**
 * Functional component that describes custom modal dialog.
 */
const CustomDialog = ({open, children, title, contentText, handleClose, handleContinue}) => {
    return (
        <Dialog
            // Global modal dialog rendering settings.
            open={open}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '16px',
                    width: '800px',
                    height: '40%',
                    boxShadow: '0px 0px 30px 5px rgb(41, 55, 78)',
                    backgroundColor: '#29374e'
                }

            }}>
            <DialogTitle
                // Title rendering settings.
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f0f0f0',
                    fontFamily: 'Roboto, monospace',
                    fontSize: '150%',
                    fontWeight: 'bold'
                }}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText
                    // Body rendering settings.
                    sx={{color: '#f0f0f0', fontFamily: 'Roboto, monospace', fontWeight: 'bold'}}>
                    {contentText}
                </DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Box
                    // Global buttons rendering settings.
                    display="flex"
                    justifyContent="space-between"
                    position="absolute"
                    bottom={8}
                    right={8}
                    left={8}>
                    <Button
                        // Close Button settings.
                        sx={{
                            borderRadius: '12px',
                            width: '120px',
                            color: '#f0f0f0',
                            backgroundColor: '#2e415f',
                            fontFamily: 'Roboto, monospace',
                            fontSize: '120%',
                            fontWeight: 'bold',
                            "&:hover": {color: '#ffffff', backgroundColor: '#334871'}
                        }} onClick={handleClose}>Закрыть</Button>
                    <Button
                        // Continue Button settings.
                        sx={{
                            borderRadius: '12px',
                            width: '120px',
                            color: '#f0f0f0',
                            backgroundColor: '#2e415f',
                            fontFamily: 'Roboto, monospace',
                            fontSize: '120%',
                            fontWeight: 'bold',
                            "&:hover": {color: '#ffffff', backgroundColor: '#334871'}
                        }} onClick={handleContinue}>Продолжить</Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
        ;
}

export default CustomDialog;
