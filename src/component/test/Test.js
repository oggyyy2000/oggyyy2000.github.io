import { Helmet } from "react-helmet";
import { Box, Container, Grid, ThemeProvider } from "@material-ui/core";
import Bieudothongke from "./bieudothongke";
import GlobalStyles from "../../asset/css/GlobalStyles";
import theme from "../../theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../../mixins/chartjs";
import { MucDoLoi, ThongTinTBLoi, AnhTBLoi } from "./List";
import { SelectVariants, LoaiTB } from "./dropdownfunc";
import { useEffect, useState } from "react";
import { SelectId } from "./DataFetching";

const test = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* <Box
                style={{
                    backgroundColor: 'background.default',
                    height: '100%',
                    overflow: 'auto',
                    py: 3,
                    paddingTop: 20
                }}
            >
                    <Grid container spacing={3}>

                        <Grid item lg={3} sm={6} xl={3} xs={12}>
                            <BieuDoTron />
                        </Grid>

                        <Grid item lg={3} sm={6} xl={3} xs={12}>
                            <BieuDoTron />
                        </Grid>
                        
                        <Grid item lg={8} md={12} xl={9} xs={12}>
                            <Bieudothongke />
                        </Grid>
                    </Grid>
            </Box> */}

      <Container maxWidth={false}>
        <Box
          style={{
            backgroundColor: "background.default",
            height: "100%",
            py: 3,
            paddingTop: 20,
          }}
        >
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="stretch"
          >
            <Grid item xs={7}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Bieudothongke />
                </Grid>
                <Grid item xs={12}>
                  <MucDoLoi />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={5}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <ThongTinTBLoi />
                </Grid>
                <Grid item xs={12}>
                  <AnhTBLoi />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  </ThemeProvider>
);

export default test;
