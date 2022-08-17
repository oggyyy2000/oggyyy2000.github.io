import {Avatar, Card, CardContent, Grid, Typography} from '@material-ui/core';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';

const ThietBiLoiSoThietBi = (props) => (
    <Card
        style={{height: '100%'}}
        {...props}
    >
        <CardContent>
            <Grid
                container
                spacing={3}
                style={{justifyContent: 'space-between'}}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h6"
                    >
                        THIẾT BỊ LỖI / SỐ THIẾT BỊ
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        234 / 1120
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        style={{
                            backgroundColor: '#3f51b5',
                            height: 56,
                            width: 56
                        }}
                    >
                        <BuildRoundedIcon/>
                    </Avatar>
                </Grid>
            </Grid>
            {/*<Box style={{ pt: 3 }}>*/}
            {/*  <LinearProgress*/}
            {/*    value={75.5}*/}
            {/*    variant="determinate"*/}
            {/*  />*/}
            {/*</Box>*/}
        </CardContent>
    </Card>
);

export default ThietBiLoiSoThietBi;
