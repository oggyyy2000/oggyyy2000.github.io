import { useState, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import { AuthenContext } from "../main/contexts/AuthenContext";

const states = [
  {
    value: "hanoi",
    label: "Hà Nội",
  },
  {
    value: "hochiminh",
    label: "Hồ Chí Minh",
  },
  {
    value: "haiphong",
    label: "Hải Phòng",
  },
];

const AccountProfileDetails = (props) => {
  const {
    authState: { user },
  } = useContext(AuthenContext);

  const [values, setValues] = useState(user);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader
          subheader="Thông tin của bạn có thể được sửa đổi tại đây"
          title="THÔNG TIN CÁ NHÂN"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Họ và tên đêm"
                name="firstName"
                onChange={handleChange}
                required
                value={values && values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tên"
                name="lastName"
                onChange={handleChange}
                required
                value={values && values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ email"
                name="email"
                onChange={handleChange}
                required
                value={values && values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values && values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nước"
                name="country"
                onChange={handleChange}
                required
                value={values && values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Chọn Tỉnh/Thành Phố"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values && values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Lưu
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
