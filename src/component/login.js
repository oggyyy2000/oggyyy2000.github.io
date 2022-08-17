import React, { useState, useContext } from "react";
import Geocode from "react-geocode";
import { AuthenContext } from "./main/contexts/AuthenContext";

Geocode.setApiKey("AIzaSyDC8AsBAx1cDfV2mNKLiICA0GfnPv9HLDE");

function Login() {
  const { Login } = useContext(AuthenContext);
  const tbUsername = "tbUsername";
  const tbPassword = "tbPassword";

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const onChangeSelectOptions = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === tbUsername) setUsername(value);
    else if (name === tbPassword) setPassword(value);
  };

  const btnDangNhapOnClick = (event) => {
    event.preventDefault();
    Login({ user: Username, pass: Password });

    /*  function fetchPostList() {
      var axios = require("axios");
      var data = JSON.stringify({ username: Username, password: Password });
      console.log(data);
      var config = {
        method: "post",
        url: "http://localhost:8000/htld/user/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    fetchPostList();
    */
  };

  return (
    <div>
      <div className="container">
        <br />
        <br />
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="login-wrap p-4 p-md-5">
              <div className="icon d-flex align-items-center justify-content-center">
                <i className="far fa-user" color="white" />
              </div>
              <h3
                className="text-center mb-4"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                Đăng nhập
              </h3>
              <form action="#" className="login-form">
                <div className="form-group">
                  <input
                    name={tbUsername}
                    type="text"
                    value={Username}
                    onChange={onChangeSelectOptions}
                    className="form-control rounded-left"
                    placeholder="Nhập tài khoản"
                    required
                  />
                </div>
                <div className="form-group d-flex">
                  <input
                    name={tbPassword}
                    type="password"
                    value={Password}
                    onChange={onChangeSelectOptions}
                    className="form-control rounded-left"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>
                <div className="form-group">
                  <button
                    onClick={btnDangNhapOnClick}
                    className="form-control btn btn-primary rounded submit px-3"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
