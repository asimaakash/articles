import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArticleContext from "../context/article/ArticleContext";

export default function Navbar() {
  const context = useContext(ArticleContext);
  const { getUser, uname } = context;
  const navigate = useNavigate();
  let myArticlePath = `/myArticle/${uname}`;
  let token = localStorage.getItem("authtoken");
  useEffect(() => {
    getUser();
  }, [localStorage.getItem("authtoken")]);
  // console.log("MyName: - ", name);

  const logOut = () => {
    // console.log("Log Out");

    localStorage.setItem("authtoken", "");
  };

  const toHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <>
      {/* Navbar */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand navText" onClick={toHome}>
            My Article
          </div>
          <div className="dropdown mx-5">
            <button
              className="btn btn-danger dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {uname}
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={myArticlePath}>
                  My Articles
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/addArticle">
                  Add New Article
                </Link>
              </li>
              <hr />
              <li>
                <Link className="dropdown-item" onClick={logOut} to="/login">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
