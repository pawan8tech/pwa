import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ useNavigate replaces useRouter
import "./login.css";
import { eventBus } from "../../utils/eventbus";
import { authService } from "../../services/auth.service";

const Login = () => {
  const navigate = useNavigate(); // ⬅️ react-router-dom
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({});

  const handleLoginData = (event) => {
    switch (event["event_name"]) {
      case "USER_REGISTER_SUCCESSFULLY":
        setIsLogin(true);
        break;
      case "Login_Succecssfully":
        console.log(event);
        navigate("/dashboard"); // ⬅️ push replaced with navigate
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    eventBus.on("APP_Auth", handleLoginData);
    return () => eventBus.off("APP_Auth", handleLoginData);
  }, []);

  const onInputChange = (event) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onLoginChange = () => {
    setLoginData({});
    setIsLogin(!isLogin);
  };

  const onLogin = () => {
    authService.loginUser(loginData);
  };

  const onRegister = () => {
    authService.registerUser(loginData);
  };

  return (
    <div className={"loginContainer"}>
      {isLogin ? (
        <div className={"inputContainer"}>
          <div className={"inputField"}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData?.email || ""}
              placeholder="Enter Email"
              onChange={onInputChange}
              className={"input"}
              required
            />
          </div>
          <div className={"inputField"}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData?.password || ""}
              placeholder="Enter Password"
              onChange={onInputChange}
              className={"input"}
              required
            />
          </div>
          <button type="button" onClick={onLogin} className={"button"}>
            Login
          </button>
          <div>
            <span>Don't have an account?</span>
            <span onClick={onLoginChange} className={"linkWord"}>
              Register
            </span>
          </div>
        </div>
      ) : (
        <div className={"inputContainer"}>
          <div className={"inputField"}>
            <label>User Name</label>
            <input
              type="text"
              name="userName"
              value={loginData?.userName || ""}
              placeholder="Enter User Name"
              onChange={onInputChange}
              className={"input"}
              required
            />
          </div>
          <div className={"inputField"}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData?.email || ""}
              placeholder="Enter Email"
              onChange={onInputChange}
              className={"input"}
              required
            />
          </div>
          <div className={"inputField"}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData?.password || ""}
              placeholder="Enter Password"
              onChange={onInputChange}
              className={"input"}
              required
            />
          </div>
          <button onClick={onRegister} className={"button"}>
            Register
          </button>
          <div>
            <span>Already have an account?</span>
            <span onClick={onLoginChange} className={"linkWord"}>
              Login
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
