import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { useContext } from "react";
import { AuthenContext } from "../main/contexts/AuthenContext";

const AccountProfile = (props) => {
  const {
    authState: { user },
  } = useContext(AuthenContext);
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user && user.avatar}
            sx={{
              height: 100,
              width: 100,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user && user.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user && user.city} ${user && user.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${moment().format("hh:mm A")} ${user && user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text" component={"C"}>
          Tải ảnh lên
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
