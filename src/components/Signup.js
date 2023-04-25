import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [credentials, setcredentials] = React.useState({
    sname: "",
    semail: "",
    spassword: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.spassword !== credentials.cpassword) {
      alert("Password and C-Password donot match.");
      return;
    }

    const response = await fetch("http://localhost:5000/auth/createuser", {
      method: "POST",
      headers: {
        "content-type": "Application/JSON",
      },
      body: JSON.stringify({
        name: credentials.sname,
        email: credentials.semail,
        password: credentials.spassword,
      }),
    });
    const json = await response.json();
    // console.log(json);

    if (json.success) {
      localStorage.setItem("authtoken", json.authtoken);
      navigate("/");
    } else {
      alert("This email has been already used, Try Another!");
    }
  };

  const onChange = (e) => {
    // console.log([e.target.name]);

    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <h1 className="my-3 text-center" style={{ color: "white" }}>
          Welcome To myArticle Signup Page
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-5">
            <label htmlFor="sname" style={{ color: "white" }}>
              Email Name :-{" "}
            </label>
            <input
              type="text"
              className="form-control my-1"
              id="sname"
              name="sname"
              value={credentials.sname}
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="semail" style={{ color: "white" }}>
              Email Address :-{" "}
            </label>
            <input
              type="email"
              className="form-control my-1"
              id="semail"
              name="semail"
              value={credentials.semail}
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="spassword" style={{ color: "white" }}>
              Password :-
            </label>
            <input
              type="password"
              className="form-control my-1"
              id="spassword"
              name="spassword"
              value={credentials.spassword}
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="cpassword" style={{ color: "white" }}>
              Confirm Password :-
            </label>
            <input
              type="password"
              className="form-control my-1"
              id="cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              placeholder="Confirm Password"
            />
          </div>
          <p className="text-center mt-5">
            <button type="submit" className="btn btn-primary my-3 buttonSt">
              Sign Up
            </button>
          </p>
        </form>
        <p className="text-center">
          <button type="button" class="btn btn-success buttonSt">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/login`}
            >
              Login
            </Link>
          </button>
        </p>
      </div>
    </>
  );
};
