import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  ThemeProvider,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import axios from "axios";
import GlobalStyles from "../../asset/css/GlobalStyles";
import theme from "../../theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../../mixins/chartjs";
import Bieudothongke from "./bieudothongke";
import Loading from "./Loading";
import { MucDoLoi } from "./List";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import anhcdttgoc from "./icon/Data_test_vobat_divat/DJI_0627_379.jpg";
import noterrorinsuTT from "./icon/not_error_insuTT.png";

function Testdiv() {
  function getIMG() {
    return (
      <div>
        <img src={anhcdttgoc} height={75} width={40} />
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "7%",
                  border: "1px solid black",
                  borderRadius: "13px",
                  overflow: "hidden",
                  minWidth: "7%",
                }}
                onClick={getIMG}
              >
                <img src={noterrorinsuTT} height={75} width={40} />
              </div>
            </Grid>
          </Box>
        </Container>
      </>
    </ThemeProvider>
  );
}

export default Testdiv;

// function createProject() {
//   const item = this.state.itemArray;
//   const title = "";
//   const text = "";
//   item.push({ title, text });
//   this.setState({ itemArray: item });

//   return (
//     <div className="Overview">
//       <p>Overview</p>
//       <button onClick={this.createProject.bind(this)}>New Project</button>
//       <Project />
//       <div>
//         {this.state.itemArray.map((item, index) => {
//           return (
//             <div className="box" key={index}>
//               <div>
//                 <h2>{item.title}</h2>
//                 <p>{item.text}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default createProject;

// import React from "react";
// import ReactDOM from "react-dom";

// const title = React.createElement("h1", {}, "My First React Code");

// ReactDOM.render(title, document.getElementById("global"));
