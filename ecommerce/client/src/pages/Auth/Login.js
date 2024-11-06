import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { useSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );

      if (res && res.data.success) {
        // toast.success(res.data && res.data.message);
        const message = res.data && res.data.message;
        enqueueSnackbar(message, { variant: "success" });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        // toast.error(res.data.message);
        enqueueSnackbar(res.data.message, { variant: "error" });
      }
    } catch (error) {
      console.log("Register Error", error);
      // toast.error("Register Error");
      enqueueSnackbar("Register Error", { variant: "error" });
    }
  };

  return (
    <Layout title={"Regiser Ecommerce App"}>
      <div className="form-container">
        <h1>LOGIN FORM</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
