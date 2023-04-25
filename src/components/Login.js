import React from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [credentials, setcredentials] = React.useState({
    lemail: "",
    lpassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   JSON.stringify({
    //     email: credentials.lemail,
    //     password: credentials.lpassword,
    //   })
    // );

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "content-type": "Application/JSON",
      },
      body: JSON.stringify({
        email: credentials.lemail,
        password: credentials.lpassword,
      }),
    });
    const json = await response.json();
    // console.log(json);

    if (json.success) {
      setcredentials({
        lemail: "",
        lpassword: "",
      });
      localStorage.setItem("authtoken", json.authtoken);
      navigate("/");
    } else {
      alert("Incorrect Credientials");
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
          Welcome To myArticle Login Page
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-5">
            <label htmlFor="lemail" style={{ color: "white" }}>
              Email Address :-{" "}
            </label>
            <input
              type="email"
              className="form-control my-1"
              id="lemail"
              name="lemail"
              value={credentials.lemail}
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="lpassword" style={{ color: "white" }}>
              Password :-
            </label>
            <input
              type="password"
              className="form-control my-1"
              id="lpassword"
              name="lpassword"
              value={credentials.lpassword}
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <p className="text-center mt-5">
            <button type="submit" className="btn btn-primary my-3 buttonSt">
              Login
            </button>
          </p>
        </form>
        <p className="text-center">
          <button type="button" class="btn btn-success buttonSt">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/signup`}
            >
              Sign Up
            </Link>
          </button>
        </p>
      </div>
    </>
  );
};
