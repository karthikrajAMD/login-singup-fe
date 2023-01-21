import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import env from "../env";
import axios from "axios";
function Forgot() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [validated2, setValidated2] = useState(false);
  const [but1, setBut1] = useState(false);
  const [but2, setBut2] = useState(false);
  const [otpSent, setOtpSent] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [otp, setOtp] = useState();
  const handleSubmit1 = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setBut1(true);
      forgot();
    }

    setValidated(true);
  };
  const handleSubmit2 = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setBut2(true);
      reset();
    }

    setValidated2(true);
  };
  async function forgot() {
    const userSendResetString = await axios.post(
      `${env.API_URL}/users/sendrandomstring`,
      {
        email,
      }
    );
    console.log(userSendResetString);
    if (userSendResetString.data.status === 200) {
      setOtpSent(false);
      setBut1(false);
    } else {
      toast.error(userSendResetString.data.message);
      setBut1(false);
    }
  }
  async function reset() {
    try {
      if (password === cpassword) {
        const userSendResetString = await axios.post(
          `${env.API_URL}/users/passwordreset`,
          {
            email,
            password,
            otp,
          }
        );
        console.log(userSendResetString);
        if (userSendResetString.data.status === 200) {
          toast.success(userSendResetString.data.message);
          setBut2(false);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error(userSendResetString.data.message);
          setBut2(false);
        }
      } else {
        toast.error("password doesn't match");
        setPassword("");
        setCpassword("");
        setBut2(false);
      }
    } catch (error) {
      setBut2(false);
      toast.error("Internal server error");
      setPassword("");
      setCpassword("");
      setOtp("");
      console.log(error);
    }
  }
  return (
    <div className="main-body">
      <div className="wrapper-mid">
        <div className="signup-forms-mid">
          {otpSent ? (
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit1}
              style={{ textAlign: "initial" }}
            >
              <Form.Floating className="mb-3" controlId="floatingInputEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  id="floatingInputEmail"
                  aria-describedby="inputGroupPrepend"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label htmlFor="floatingInputEmail">Email</label>
                <Form.Control.Feedback type="invalid">
                  Enter a valid email id.
                </Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating>
                <Button type="submit" disabled={but1}>
                  Send
                </Button>
              </Form.Floating>
            </Form>
          ) : (
            <Form
              noValidate
              validated={validated2}
              onSubmit={handleSubmit2}
              style={{ textAlign: "initial" }}
            >
              <p style={{ color: "green" }}>*OTP sent to {email}</p>
              <Form.Floating className="mb-3" controlId="floatingInputPassword">
                <Form.Control
                  type="password"
                  id="floatingInputPassword"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingInputPassword">Password</label>
                <Form.Control.Feedback type="invalid">
                  Please provide a Password.
                </Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating
                className="mb-3"
                controlId="floatingInputCpassword"
              >
                <Form.Control
                  type="password"
                  id="floatingInputCpassword"
                  placeholder="Re-Enter to Confirm Password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  required
                />
                <label htmlFor="floatingInputCpassword">Confirm Password</label>
                <Form.Control.Feedback type="invalid">
                  Confirm Password.
                </Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating
                className="mb-3"
                controlId="floatingInputCpassword"
              >
                <Form.Control
                  type="text"
                  id="floatingInputOtp"
                  placeholder="Enter Otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <label htmlFor="floatingInputOtp">OTP</label>
                <Form.Control.Feedback type="invalid">
                  OTP Required
                </Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating>
                <Button type="submit" disabled={but2}>
                  Send
                </Button>
              </Form.Floating>
            </Form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Forgot;
