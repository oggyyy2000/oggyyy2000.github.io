import {makeStyles} from "@material-ui/core/styles";

export const ImageFromFile_css = makeStyles((theme) => ({
    center_child: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    root:{
        height:'100%'
    },
    rootTop:{
        backgroundColor:'gray',
        height:'40%'
    },
    rootTopItem1:{
        height:'80%',
        backgroundColor:'#545454'
        // backgroundColor:'gray',
        // height:250
    },
    rootTopItem1Image:{
      height:'100%'
    },
    rootTopItem2:{
        height:'20%'

        // backgroundColor:'gray',
        // height:250
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    btnContainer:{
        width:'100%',
        padding:2,
        height:'10%',
        justifyContent:'space-around'
    }
}));


export const Photo_Container_css = makeStyles((theme) => ({
    center_child: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    photo_container: {
        height: '100%',
        width:'100%',
        overflow:'auto'
    },
    tabpanel_container:{
        // height:'100%',
        background:'orange'
    }
}));