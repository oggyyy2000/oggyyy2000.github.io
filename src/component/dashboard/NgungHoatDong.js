import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
const NgungHoatDong = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        style={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            NGƯNG HOẠT ĐỘNG
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            13
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: "gray",
              height: 56,
              width: 56
            }}
          >
            <BuildRoundedIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default NgungHoatDong;
