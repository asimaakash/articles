import React, { useContext, useEffect, useState } from "react";
import ArticleContext from "../context/article/ArticleContext";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const MyArticles = () => {
  const context = useContext(ArticleContext);
  const {
    getUserArticle,
    userArticle,
    checkAuthentic,
    uname,
    search,
    searchArticles,
  } = context;

  const navigate = useNavigate();

  //   if (!checkAuthentic()) {
  //     console.log(checkAuthentic());

  //     navigate("/login");
  //   }

  const [cardEle, setCardEle] = useState([]);
  //   let cardEle = [];

  useEffect(() => {
    getUserArticle();
    // checkAuthentic();
    // console.log("Called jere");

    let searchedArticles = searchArticles(userArticle);
    let cards = [];
    if (searchedArticles.length) {
      cards = searchedArticles.map((article) => (
        <div className="col col-lg-auto col-md-auto col-sm-auto">
          <Card
            key={article._id}
            title={article.title}
            aText={article.aText}
            id={article._id}
            url={`/myArticle/${uname}/${article._id}`}
            authname={article.authName}
          />
        </div>
      ));
    }
    // console.log(allArticle);

    setCardEle(
      <div className="container">
        <div className="row">{cards}</div>
      </div>
    );
    // cardEle = (
    //   <div className="container">
    //     <div className="row">{cards}</div>
    //   </div>
    // );
  }, [search, userArticle.length]);

  return userArticle.length === 0 ? (
    <div className="container">
      <h1 className="text-center">No Article To display</h1>
    </div>
  ) : (
    <>
      <div className="container">
        <h1 className="text-center" style={{ color: "white" }}>
          Your Articles
        </h1>
        {cardEle}
      </div>
    </>
  );
};

export default MyArticles;
