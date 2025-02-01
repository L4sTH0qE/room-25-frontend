import {TextField} from "@mui/material";
import {withStyles} from "@mui/styles";

/**
 * Style for custom text field.
 */
const CustomTextField = withStyles({
    root: {
        // Стили для непонятно чего, но пусть будут.
        '& label.Mui-focused': {
            color: '#f0f0f0',
            fontFamily: 'Roboto, monospace',
        },

        // Input underline styles.
        '& .MuiInput-underline:before': {
            borderBottomColor: '#f0f0f0'
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#30485e'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#ffffff'
        },

        // Autofill styles.
        '& .MuiInput-input:-webkit-autofill': {
            WebkitBoxShadow: "0 0 0 1000px #2e415f inset",
            WebkitTextFillColor: '#f0f0f0',
        },

        // Input styles.
        '& .MuiInput-input': {
            color: '#f0f0f0',
            fontFamily: 'Roboto, monospace',
        },

        // Label styles (including *).
        '& .MuiFormLabel-root': {
            color: '#f0f0f0',
            fontFamily: 'Roboto, monospace',
        },
        '& .MuiFormLabel-root.Mui-error': {
            color: '#f0f0f0',
            fontFamily: 'Roboto, monospace',
        },
        '& .MuiFormLabel-asterisk.Mui-error': {
            color: '#d25b3f',
        },

        // Helper text styles.
        '& .MuiFormHelperText-root': {
            color: '#a0a0a0',
            fontFamily: 'Roboto, monospace',
            fontWeight: 'bold'
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: '#d25b3f',
            fontFamily: 'Roboto, monospace',
            fontWeight: 'bold'
        },
    },
})(TextField);

export default CustomTextField;
