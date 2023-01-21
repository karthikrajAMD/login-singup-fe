import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import env from "../env";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      console.log(login);
      login();
    }

    setValidated(true);
  };
  async function login() {
    console.log(email, password);
    const userLogin = await axios.post(`${env.API_URL}/users/login`, {
      email,
      password,
    });

    if (userLogin.data.statusCode === 200) {
      toast.success(userLogin.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      toast.error(userLogin.data.message);
    }
    console.log(userLogin.data.statusCode);
    console.log();
  }
  return (
    <div className="main-body">
      <div className="wrapper-mid">
        <div className="signup-forms-mid">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
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

            <Form.Floating>
              <Button type="submit">Login</Button>
              <div>
                Not having Account? <Link to={"/"}>Signup here</Link>
              </div>
              <div>
                <Link to={"/forgot"}>Forgot Password?</Link>
              </div>
            </Form.Floating>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
