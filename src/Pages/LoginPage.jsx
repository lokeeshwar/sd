import React, { useState } from "react";
import InputField from "../Components/InputField";
import ButtonComp from "../Components/ButtonComp.jsx";
import "../Assets/LoginPage.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../Redux/User/UserSlice.js";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading , error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value.trim(),
    }));
  };


  const Login = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
        return dispatch(signInFailure('Please fill all the fields'));
      }
      try {
        dispatch(signInStart());
        const res = await axios.post(`http://127.0.0.1:5000/apisd/auth/signin`, formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = res.data;
        console.log(data);

        dispatch(signInSuccess(data));
        navigate('/homepage');
        return

        // if (!res.ok ) {
        //   console.log('struck in failure');
        //   dispatch(signInFailure(data.message));
        //   return;
        // }

        // if (res.ok) {
        //   console.log(`sucess data ${data}`)
        //   dispatch(signInSuccess(data));
        //   navigate('/homepage');
        // }

        // dispatch(signInSuccess(data));
        // navigate('/homepage');
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
  };

  return (
    <div className="LoginMainDiv">
      <div className="LoginBox">
        <div className="InputFieldsDiv">
          <form onSubmit={Login} className="LoginForm">
            <InputField
              Id={"email"}
              Placeholder={"Email"}
              Type={"email"}
              Value={formData.email}
              onChange={handleChange}
              className={"loginInput"}
            />

            <InputField
              Id={"password"}
              Placeholder={"Password"}
              Type={"password"}
              Value={formData.password}
              onChange={handleChange}
              className={"loginInput"}
            />

            <ButtonComp
              Name={
                loading ? (
                  <>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </>
                ) : (
                  "Sign In"
                )
              }
              Type={"submit"}
              className={"LoginButton"}
            />
            {errorMessage && <Alert variant={"warning"}>{errorMessage}</Alert>}
          </form>
          {/* <div className="ForgetPassword">
            <a href="" style={{ color: "blue" }}>
              Forget Pssword ?
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}
