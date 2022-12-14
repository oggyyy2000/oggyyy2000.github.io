import React from "react";
import "../../asset/css/generalObject/BC1.css";
import { getTextDisplay } from "../../util/GetTenTuyen";
import {  useSelector } from "react-redux";

const BCNGay = (props) => {
  const post = props.data ? props.data : "";
  var date = post ? new Date(post.ngay_kiem_tra) : "";
  /////
  const Tempvalue = useSelector((state) => state.tempvalue);
  const obj1 = props.obj1 ? props.obj1 : "";
  const obj2 = props.obj2 ? props.obj2 : "";
  const obj3 = props.obj3 ? props.obj3 : "";
  const obj4 = props.obj4 ? props.obj4 : "";
  ////
  var newdate =
    typeof date.getMonth === "function"
      ? (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        "/" +
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "/" +
        date.getFullYear()
      : "";
  return (
    <>
      <div style={{ color: "black", width: "fit-content", display: "inline" }}>
        <div className="book">
          <div className="page">
            <div className="subpage">
              <h5
                style={{
                  margin: "0in",
                  textAlign: "right",
                  lineHeight: "120%",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textDecoration: "underline",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  BM 07- 03
                </span>
              </h5>
              <table
                style={{
                  border: "none",
                  width: "487.35pt",
                  borderCollapse: "collapse",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "147.15pt",
                        padding: "0in 5.4pt",
                        height: "68.05pt",
                        verticalAlign: "top",
                      }}
                    >
                      <p
                        style={{
                          marginTop: "12.0pt",
                          marginRight: "0in",
                          marginBottom: "24.0pt",
                          marginLeft: "0in",
                          textAlign: "center",
                          textIndent: "0in",
                          background: "transparent",
                          fontSize: "18px",
                          fontFamily: '"Times New Roman",serif',
                          fontWeight: "bold",
                          margin: "0in",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            fontWeight: "normal",
                            color: "black",
                          }}
                        >
                          T???NG C??NG TY
                        </span>
                      </p>
                      <p
                        style={{
                          marginTop: "12.0pt",
                          marginRight: "0in",
                          marginBottom: "24.0pt",
                          marginLeft: "0in",
                          textAlign: "center",
                          textIndent: "0in",
                          background: "transparent",
                          fontSize: "18px",
                          fontFamily: '"Times New Roman",serif',
                          fontWeight: "bold",
                          margin: "0in",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            fontWeight: "normal",
                            color: "black",
                          }}
                        >
                          ??I???N L???C TP H?? N???I
                        </span>
                      </p>
                      <p
                        style={{
                          marginTop: "12.0pt",
                          marginRight: "0in",
                          marginBottom: "24.0pt",
                          marginLeft: "0in",
                          textAlign: "center",
                          textIndent: "0in",
                          background: "transparent",
                          fontSize: "18px",
                          fontFamily: '"Times New Roman",serif',
                          fontWeight: "bold",
                          margin: "0in",
                          lineHeight: "normal",
                        }}
                      >
                        <span style={{ fontSize: "17px", color: "black" }}>
                          C??NG TY L?????I ??I???N
                        </span>
                      </p>
                      <p
                        style={{
                          marginTop: "12.0pt",
                          marginRight: "0in",
                          marginBottom: "24.0pt",
                          marginLeft: "0in",
                          textAlign: "center",
                          textIndent: "0in",
                          background: "transparent",
                          fontSize: "18px",
                          fontFamily: '"Times New Roman",serif',
                          fontWeight: "bold",
                          margin: "0in",
                          lineHeight: "normal",
                        }}
                      >
                        <span style={{ fontSize: "17px", color: "black" }}>
                          CAO TH??? H?? N???I
                        </span>
                      </p>
                      <p
                        style={{
                          marginTop: "12.0pt",
                          marginRight: "0in",
                          marginBottom: "24.0pt",
                          marginLeft: "0in",
                          textAlign: "center",
                          textIndent: "0in",
                          background: "transparent",
                          fontSize: "18px",
                          fontFamily: '"Times New Roman",serif',
                          fontWeight: "bold",
                          margin: "0in",
                          lineHeight: "normal",
                        }}
                      >
                        <span style={{ fontSize: "16px", color: "black" }}>
                          ?????I ???????NG D??Y
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "340.2pt",
                        padding: "0in 5.4pt",
                        height: "68.05pt",
                        verticalAlign: "top",
                      }}
                    >
                      <p
                        style={{
                          marginTop: "2.0pt",
                          marginRight: "0in",
                          marginBottom: "0in",
                          marginLeft: "0in",
                          textAlign: "center",
                          textIndent: "0in",
                          background: "transparent",
                          fontSize: "18px",
                          fontFamily: '"Times New Roman",serif',
                          fontWeight: "bold",
                          lineHeight: "normal",
                        }}
                      >
                        <span style={{ fontSize: "17px", color: "black" }}>
                          C???NG H??A X?? H???I CH??? NGH??A VI???T NAM
                        </span>
                      </p>
                      <p
                        style={{
                          marginTop: "2.0pt",
                          marginRight: "0in",
                          marginBottom: "0in",
                          marginLeft: "0in",
                          textAlign: "center",
                          textIndent: "0in",
                          background: "transparent",
                          fontSize: "18px",
                          fontFamily: '"Times New Roman",serif',
                          fontWeight: "bold",
                          lineHeight: "normal",
                        }}
                      >
                        <span style={{ fontSize: "17px", color: "black" }}>
                          ?????c l???p - T??? do - H???nh ph??c
                        </span>
                      </p>
                      <p
                        style={{
                          marginTop: "2.0pt",
                          marginRight: "0in",
                          marginBottom: "0in",
                          marginLeft: "0in",
                          textAlign: "center",
                          textIndent: "0in",
                          background: "transparent",
                          fontSize: "18px",
                          fontFamily: '"Times New Roman",serif',
                          fontWeight: "bold",
                          lineHeight: "normal",
                        }}
                      >
                        &nbsp;
                      </p>
                      <table style={{ float: "left" }}>
                        <tbody>
                          <tr>
                            <td>
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <br />
                            </td>
                            <td>
                              <br />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      &nbsp;<span style={{ fontSize: "17px" }}>&nbsp;</span>
                      <p>
                        <br />
                      </p>
                      <p
                        style={{
                          marginTop: "2.0pt",
                          marginRight: "0in",
                          marginBottom: "0in",
                          marginLeft: "0in",
                          textAlign: "center",
                          textIndent: "0in",
                          background: "transparent",
                          fontSize: "18px",
                          fontFamily: '"Times New Roman",serif',
                          fontWeight: "bold",
                          lineHeight: "normal",
                        }}
                      >
                        <em>
                          <span
                            style={{ fontSize: "17px", fontWeight: "normal" }}
                          >
                            &nbsp;
                          </span>
                        </em>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                style={{
                  margin: "0in",
                  textAlign: "center",
                  lineHeight: "120%",
                  fontSize: "19px",
                  fontFamily: '".VnTimeH",sans-serif',
                  fontWeight: "bold",
                  marginTop: "8.0pt",
                  marginRight: "0in",
                  marginBottom: "8.0pt",
                  marginLeft: "0in",
                }}
              >
                <span
                  style={{
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  PHI???U KI???M TRA NG??Y ???????NG D??Y CAO TH???
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span style={{ fontFamily: '"Times New Roman",serif' }}>
                  Phi???u s???:&nbsp;
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .............................................................
                </span>
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  &nbsp;&nbsp;
                </span>
                <span style={{ fontFamily: '"Times New Roman",serif' }}>
                  Ng??y ki???m tra:&nbsp;
                </span>
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  {newdate}
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  T??n tuy???n ???????ng d??y:{" "}
                </span>
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  {getTextDisplay(post.ma_tuyen)}
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span style={{ fontFamily: '"Times New Roman",serif' }}>
                  Ph????ng th???c ki???m tra
                </span>
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  :
                  .............................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span style={{ fontFamily: '"Times New Roman",serif' }}>
                  ??o???n ???????ng d??y ki???m tra:
                </span>
                <span style={{ fontSize: "17px", lineHeight: "120%" }}>
                  &nbsp;
                </span>
                <span style={{ fontFamily: '"Times New Roman",serif' }}>
                  T??? VT&nbsp;
                </span>
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  {post.bat_dau_doan}&nbsp;
                </span>
                <span style={{ fontFamily: '"Times New Roman",serif' }}>
                  ?????n VT&nbsp;
                </span>
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  {post.ket_thuc_doan}
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "3.0pt",
                  marginRight: "0in",
                  marginBottom: "3.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <strong>
                  <span
                    style={{
                      fontSize: "17px",
                      lineHeight: "120%",
                      fontFamily: '"Times New Roman",serif',
                    }}
                  >
                    Danh s??ch nh??m ki???m tra:
                  </span>
                </strong>
              </p>
              <table
                style={{
                  width: "480.3pt",
                  borderCollapse: "collapse",
                  border: "none",
                  color: "black",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "33.75pt",
                        border: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                        }}
                      >
                        <strong>
                          <span
                            style={{
                              fontSize: "17px",
                              fontFamily: '"Times New Roman",serif',
                            }}
                          >
                            TT
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "198.45pt",
                        border: "solid windowtext 1.0pt",
                        borderLeft: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                        }}
                      >
                        <strong>
                          <span
                            style={{
                              fontSize: "17px",
                              fontFamily: '"Times New Roman",serif',
                            }}
                          >
                            H??? v?? t??n
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "92.15pt",
                        border: "solid windowtext 1.0pt",
                        borderLeft: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                        }}
                      >
                        <strong>
                          <span
                            style={{
                              fontSize: "17px",
                              fontFamily: '"Times New Roman",serif',
                            }}
                          >
                            Ch???c danh
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "81.2pt",
                        border: "solid windowtext 1.0pt",
                        borderLeft: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                        }}
                      >
                        <strong>
                          <span
                            style={{
                              fontSize: "17px",
                              fontFamily: '"Times New Roman",serif',
                            }}
                          >
                            B???c th???
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "74.75pt",
                        border: "solid windowtext 1.0pt",
                        borderLeft: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                        }}
                      >
                        <strong>
                          <span
                            style={{
                              fontSize: "17px",
                              fontFamily: '"Times New Roman",serif',
                            }}
                          >
                            B???c AT
                          </span>
                        </strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "33.75pt",
                        border: "solid windowtext 1.0pt",
                        borderTop: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >
                          1
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "198.45pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >
                          {obj1.name}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "92.15pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >                          
                          {obj1.chucdanh}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "81.2pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >
                          {obj1.battho}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "74.75pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >                          
                          {obj1.batat}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "33.75pt",
                        border: "solid windowtext 1.0pt",
                        borderTop: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >
                          2
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "198.45pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >                          
                          {obj2.name}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "92.15pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >            
                          {obj2.chucdanh}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "81.2pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >             
                        {obj2.battho}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "74.75pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >             
                        {obj2.batat}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "33.75pt",
                        border: "solid windowtext 1.0pt",
                        borderTop: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >
                          3
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "198.45pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >             
                        {obj3.name}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "92.15pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >  
                        {obj3.chucdanh}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "81.2pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >  
                        {obj3.battho}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "74.75pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >  
                        {obj3.batat}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "33.75pt",
                        border: "solid windowtext 1.0pt",
                        borderTop: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >
                          4
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "198.45pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >  
                        {obj4.name}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "92.15pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >  
                        {obj4.chucdanh}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "81.2pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >
                        {obj4.battho}
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "74.75pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                        height: "19.85pt",
                      }}
                    >
                      <p
                        style={{
                          margin: "0in",
                          fontSize: "19px",
                          fontFamily: '".VnTime",sans-serif',
                          textAlign: "center",
                          lineHeight: "120%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            lineHeight: "120%",
                            fontFamily: '"Times New Roman",serif',
                          }}
                        >
                        {obj4.batat}
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "8.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <strong>
                  <span
                    style={{
                      fontFamily: '"Times New Roman",serif',
                      color: "black",
                    }}
                  >
                    1 .&nbsp;
                  </span>
                </strong>
                <strong>
                  <span style={{ fontFamily: '"Times New Roman",serif' }}>
                    N???i dung ki???m tra:
                  </span>
                </strong>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "115%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "115%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  -&nbsp;
                </span>
                <span style={{ fontFamily: '"Times New Roman",serif' }}>
                  H??nh lang tuy???n:&nbsp;
                </span>
                <em>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "115%",
                      fontFamily: '"Times New Roman",serif',
                    }}
                  >
                    (ghi c??c t???n t???i trong h??nh lang tuy???n, ngo??i h??nh lang
                    tuy???n c?? kh??? n??ng g??y s??? c???.v.v. v?? c??c n???i dung c???n x??? l??).
                  </span>
                </em>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  {Tempvalue === "1" ? "V???t th??? l??? m???c v??o ???????ng d??y": "B??nh Th?????ng"}
                  {/*...............................................................................................................................................................*/}
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  ...............................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  ...............................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  ...............................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "115%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "115%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  -&nbsp;
                </span>
                <span style={{ fontFamily: '"Times New Roman",serif' }}>
                  C???t :
                </span>
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "115%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  &nbsp;
                </span>
                <em>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "115%",
                      fontFamily: '"Times New Roman",serif',
                    }}
                  >
                    (ghi c??c v??? tr?? c???t nghi??ng, bi???n d???ng, n???t, m???t thanh
                    gi???ng, bi???n b??o.....v?? c??c n???i dung c???n x??? l??)
                  </span>
                </em>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  
                  {Tempvalue === "9" || Tempvalue === "10" ? "B???t th?????ng ??? c???t: ": "B??nh th?????ng"}
                  {Tempvalue === "9" ? "C???t ??i???n b??? b??m v???t l???" :""}
                  {Tempvalue === "10" ? "C???t ??i???n b??? han r???" :""}
                  {/*...............................................................................................................................................................*/}
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  ...............................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  ...............................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "115%",
                }}
              >
                <span style={{ fontFamily: '"Times New Roman",serif' }}>
                  - M??ng c???t:&nbsp;
                </span>
                <em>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "115%",
                      fontFamily: '"Times New Roman",serif',
                    }}
                  >
                    (ghi c??c v??? tr?? l??n, n???t, x??i l??? v?? c?? t??nh tr???ng b???t
                    th?????ng, c??c khu v???c xung quanh m??ng c???t......c??c n???i dung
                    c???n x??? l?? )
                  </span>
                </em>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >                 
                  {Tempvalue === "11" || Tempvalue === "12" ? "B???t th?????ng ??? m??ng: ": "B??nh th?????ng"}
                  {Tempvalue === "11" ? "M??ng c???t b??? n???t b?? t??ng" :""}
                  {Tempvalue === "12" ? "S???t l??? ?????t xung quanh m??ng c???t" :""}
                 {/* ............................................................................................................................................................... */}
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  ...............................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  ...............................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  ...............................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span style={{ fontFamily: '"Times New Roman",serif' }}>
                  - C??c k???t c???u x?? v?? gi?? ?????
                </span>
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  :&nbsp;
                </span>
                <em>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "120%",
                      fontFamily: '"Times New Roman",serif',
                    }}
                  >
                    ( ghi c??c v??? tr?? c???n x??? l?? - n???i dung c???n x??? l?? )
                  </span>
                </em>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  ...............................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  ...............................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  ...............................................................................................................................................................
                </span>
              </p>
            </div>
          </div>
          <div className="page">
            <div className="subpage">
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "115%",
                }}
              >
                <span
                  style={{
                    lineHeight: "115%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  - S??? c??ch ??i???n :&nbsp;
                </span>
                <em>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "115%",
                      fontFamily: '"Times New Roman",serif',
                    }}
                  >
                    (ghi c??c t???n t???i nh?? v???, n???t, ph??ng ??i???n, b???i b???n, ph??? ki???n
                    chu???i s???, c??c hi???n t?????ng b???t th?????ng kh??c v?? n???i dung c???n x???
                    l?? )
                  </span>
                </em>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  
                  {Tempvalue === "5" || Tempvalue === "6" || Tempvalue === "7" || Tempvalue === "8" ? "B???t th?????ng ??? s??? c??ch ??i???n: ": "B??nh th?????ng"}
                  {Tempvalue === "5" ? "C??ch ??i???n th???y tinh b??? m???t (v???) b??t" :""}
                  {Tempvalue === "6" ? "C??ch ??i???n silicon b??? r??ch t??n" :""}
                  {Tempvalue === "7" ? "C??ch ??i???n b??? b??m v???t l???" :""}
                  {Tempvalue === "8" ? "Tu???t h??m d??y tr??n chu???i c??ch ??i???n" :""}
                  {/*.....................................................................................................................................................*/}
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "115%",
                }}
              >
                <span
                  style={{
                    lineHeight: "115%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  - D??y d???n:
                </span>
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "115%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  &nbsp;
                </span>
                <em>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "115%",
                      fontFamily: '"Times New Roman",serif',
                    }}
                  >
                    (ghi c??c v??? tr?? d??y b??? t???n th????ng, ?????t s???i, v???n xo???n, qu???n
                    t??p, v???t l??? b??m v??o ???????ng d??y, ????? v??ng, c??c hi???n t?????ng b???t
                    th?????ng c???a m???i n???i v?? c??c n???i dung c???n x??? l??)
                  </span>
                </em>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  
                  {Tempvalue === "2" || Tempvalue === "3" ? "B???t th?????ng ??? ???????ng d??y: ": "B??nh th?????ng"}
                  {Tempvalue === "2" ? "D??y d???n b??? t??a (?????t s???i)" :""}
                  {Tempvalue === "3" ? "Qu?? nhi???t m???i n???i" :""}
                  {/*.....................................................................................................................................................*/}
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  - C??c k???t c???u ti???p ?????a, t??nh tr???ng ti???p ?????a:&nbsp;
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  - D??y n??o, m??ng n??o :
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  - C??c thi???t b??? ch???ng s??t :
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  - T??? b?? ??? T??? ch???ng rung:
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                   {Tempvalue === "4" ? "Tr??i t??? ch???ng rung" :"B??nh th?????ng"}
                  {/*.....................................................................................................................................................*/}
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <strong>
                  <span
                    style={{
                      lineHeight: "120%",
                      fontFamily: '"Times New Roman",serif',
                    }}
                  >
                    2- C??c t???n t???i ???? x??? l?? ngay trong ki???m tra :
                  </span>
                </strong>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <strong>
                  <span
                    style={{
                      lineHeight: "120%",
                      fontFamily: '"Times New Roman",serif',
                    }}
                  >
                    3- C??c ki???n ngh??? sau ki???m tra :&nbsp;
                  </span>
                </strong>
                <em>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "120%",
                      fontFamily: '"Times New Roman",serif',
                    }}
                  >
                    (ph???n n??y do T??? tr?????ng v???n h??nh ghi)
                  </span>
                </em>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  .....................................................................................................................................................
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    lineHeight: "120%",
                    fontFamily: '"Times New Roman",serif',
                  }}
                >
                  &nbsp;
                </span>
              </p>
              <p
                style={{
                  margin: "0in",
                  fontSize: "19px",
                  fontFamily: '".VnTime",sans-serif',
                  textAlign: "justify",
                  lineHeight: "120%",
                }}
              >
                <strong>
                  <span
                    style={{
                      lineHeight: "120%",
                      fontFamily: '"Times New Roman",serif',
                    }}
                  >
                    ?????i ???????ng d??y &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; T???
                    QLVH &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Nh??m ki???m tra
                  </span>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BCNGay;
