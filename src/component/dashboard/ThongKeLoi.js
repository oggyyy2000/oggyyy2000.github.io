import {Avatar, Box, Card, CardContent, Grid, Typography} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {red} from '@material-ui/core/colors';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';

const ThongKeLoi = (props) => (
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
                        SỐ LỖI TRONG THÁNG
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        112
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        style={{
                            backgroundColor: red[600],
                            height: 56,
                            width: 56
                        }}
                    >
                        <ErrorRoundedIcon/>
                    </Avatar>
                </Grid>
            </Grid>
            <Box
                style={{
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <ArrowDownwardIcon style={{color: red[900]}}/>
                <Typography
                    style={{
                        color: red[900],
                        mr: 1
                    }}
                    variant="body2"
                >
                    12%
                </Typography>
                &nbsp;
                <Typography
                    color="textSecondary"
                    variant="caption"
                >
                    So với tháng trước
                </Typography>
            </Box>
        </CardContent>
    </Card>
);

export default ThongKeLoi;
