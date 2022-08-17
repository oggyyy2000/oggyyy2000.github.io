import {makeStyles} from "@material-ui/core/styles";

export const ListVideoItem_css = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {

        display: 'flex',
    },
    listitemtext: {
        color: 'black',
        fontWeight: 'bold',
        marginBottom: '1px',
        width: '80%',
    }
}));

