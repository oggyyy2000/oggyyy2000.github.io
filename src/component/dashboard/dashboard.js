import {Helmet} from 'react-helmet';
import {Box, Container, Grid, ThemeProvider} from '@material-ui/core';
import ThongKeLoi from './ThongKeLoi';
import ThietBi from './ThietBi';
import Loi from './Loi';
import Sales from './Sales';
import ThietBiLoiSoThietBi from './ThietBiLoiSoThietBi';
import ThietBiDaSua from './ThietBiDaSua';
import NgungHoatDong from './NgungHoatDong';
import SoLoiTrenSoThietBi from './SoLoiTrenSoThietBi';
import GlobalStyles from "../../asset/css/GlobalStyles";
import theme from "../../theme";
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../mixins/chartjs';
import Sua from "./Sua";

const Dashboard = () => (
    <ThemeProvider theme={theme}>
        <GlobalStyles/>
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Box
                style={{
                    backgroundColor: 'background.default',
                    height: '100%',
                    overflow: 'auto',
                    py: 3,
                    paddingTop: 20
                }}
            >
                <Container maxWidth={false}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <ThongKeLoi/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <ThietBiDaSua/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <ThietBiLoiSoThietBi/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <NgungHoatDong style={{height: '100%'}}/>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            <Sales/>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            <SoLoiTrenSoThietBi style={{height: '100%'}}/>
                        </Grid>
                        <Grid
                            item
                            lg={6}
                            md={6}
                            xl={6}
                            xs={12}
                        >
                            <Loi style={{height: '100%'}}/>
                        </Grid>
                        <Grid
                            item
                            lg={6}
                            md={6}
                            xl={6}
                            xs={12}
                        >
                            <Sua style={{height: '100%'}}/>
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xl={12}
                            xs={12}
                        >
                            <ThietBi/>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    </ThemeProvider>
);

export default Dashboard;
