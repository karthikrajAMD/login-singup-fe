import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import env from "../env";
import axios from "axios";
import "./login_signup.css";
import "./door.css";
function Home() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      signup();
    }

    setValidated(true);
  };
  async function signup() {
    console.log(fname, email, password, cpassword);
    const userRegister = await axios.post(`${env.API_URL}/users/signup`, {
      fname,
      email,
      password,
      cpassword,
    });

    if (userRegister.data.statusCode === 200) {
      toast.success(userRegister.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      toast.error(userRegister.data.message);
    }
    console.log(userRegister.data.statusCode);
    console.log();
  }
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 768);

  const updateMedia = () => {
    setDesktop(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  return (
    <div className="main-body">
      {isDesktop ? (
        <div class="wrapper">
          {/* <div className="signup-form"> */}
          <div className="signup-forms ">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              style={{ textAlign: "initial" }}
            >
              <Form.Floating className="mb-3" controlId="validationCustomName">
                <Form.Control
                  type="text"
                  id="floatingInputCustom"
                  placeholder="Full name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
                <label htmlFor="floatingInputCustom">Full Name</label>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Floating>
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
              {/* <div> */}
              <Form.Floating>
                <Button type="submit" className="signup-button">
                  Sign-up
                </Button>
                <div>
                  Having Account? <Link to={"/login"}>Login here</Link>
                </div>
              </Form.Floating>
              {/* </div> */}
            </Form>
          </div>
          <div id="left-door" class="door">
            <div class="shape1">Sign-up</div>
            <div class="shape"></div>
            <div id="left-knob" class="knob"></div>
          </div>
          <div id="right-door" class="door">
            {/* <div> */}
            <div class="shape"></div>
            <div class="shape"></div>
            <div id="right-knob" class="knob"></div>
            {/* <div></div> */}
          </div>
        </div>
      ) : (
        <div className="wrapper-mid">
          <div className="signup-forms-mid">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              style={{ textAlign: "initial" }}
            >
              <Form.Floating className="mb-3" controlId="validationCustomName">
                <Form.Control
                  type="text"
                  id="floatingInputCustom"
                  placeholder="Full name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
                <label htmlFor="floatingInputCustom">Full Name</label>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Floating>
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
              {/* <div> */}
              <Form.Floating>
                <Button type="submit">Signup</Button>
                <div>
                  Having Account? <Link to={"/login"}>Login here</Link>
                </div>
              </Form.Floating>
            </Form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;
