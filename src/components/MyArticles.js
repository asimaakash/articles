import React, { useContext, useEffect, useState } from "react";
import ArticleContext from "../context/article/ArticleContext";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const MyArticles = () => {
  const context = useContext(ArticleContext);
  const [loading, setLoading] = useState(true);
  const {
    getUserArticle,
    userArticle,
    checkAuthentic,
    uname,
    search,
    searchArticles,
  } = context;

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentic().then((success) => {
      setLoading(false);
      console.log(success);
      if (!success) {
        console.log("not authenticated");
        navigate("/login");
      }
    });
  }, []);

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
        <div
          key={article._id}
          className="col col-lg-auto col-md-auto col-sm-auto"
        >
          <Card
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

  return loading ? (
    <div className="container">
      <h1 className="text-center">Loading..</h1>
    </div>
  ) : userArticle.length === 0 ? (
    <div className="container">
      <h1 className="text-center">No Article To display</h1>
    </div>
  ) : (
    <div className="container">
      <h1 className="text-center pageHeading">Your Articles</h1>
      {cardEle}
    </div>
  );

  //     userArticle.length === 0 ? (

  //   ) : (
  //     <>

  //     </>
  //   );
  //   }
};

export default MyArticles;
