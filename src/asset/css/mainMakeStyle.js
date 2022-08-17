import {makeStyles} from "@material-ui/core/styles";

export const mainMakeStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
        "&:hover":{
            overflowY: 'scroll',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
                width: '5px',
                background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#ced0d4',
            },
        },
        '&::-webkit-scrollbar': {
            width: '5px',
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
        },
    },
}));
