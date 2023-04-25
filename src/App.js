import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCards from "./components/AllCards";
import NewArticle from "./components/NewArticle";
import SearchBy from "./components/SearchBy";
import { NotFound } from "./components/NotFound";
import ArticleState from "./context/article/ArticleState";
import Navbar from "./components/Navbar";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import SingleArticle from "./components/SingleArticle";
import MyArticles from "./components/MyArticles";
import MySingleArticle from "./components/MySingleArticle";

function App() {
  return (
    <>
      <ArticleState>
        <div className="App">
          <Router>
            <Routes>
              <Route
                path="/"
                element={[<Navbar />, <SearchBy />, <AllCards />]}
              />
              {/* <Route path="/" element={<SearchBy />} /> */}
              {/* <Route path="/" element={cards} /> */}
              <Route path="addArticle" element={[<Navbar />, <NewArticle />]} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route
                path="myArticle/:uname"
                element={[<Navbar />, <SearchBy />, <MyArticles />]}
              />
              <Route
                path="myArticle/:uname/:singleArticleId"
                element={[<Navbar />, <MySingleArticle />]}
              />
              <Route
                path=":singleArticleId"
                element={[<Navbar />, <SingleArticle />]}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </ArticleState>
    </>
  );
}

export default App;
