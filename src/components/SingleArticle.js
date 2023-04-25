import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ArticleContext from "../context/article/ArticleContext";

const SingleArticle = () => {
  const context = useContext(ArticleContext);
  //   console.log("This is ", context);

  const { getSingleArticle, singleArticle } = context;

  const { singleArticleId } = useParams();

  useEffect(() => {
    getSingleArticle(singleArticleId);
  }, []);

  return singleArticle ? (
    <>
      <div className="container">
        <h1 className="mt-5 text-center" style={{ color: "red" }}>
          {singleArticle.title}
        </h1>
        <p className="articleText mt-4" style={{ color: "white" }}>
          {singleArticle.aText}
        </p>
        <br />
        <div className="authName" style={{ color: "white" }}>
          Author Name :- <b>{singleArticle.authName}</b>
        </div>
        <p className="text-center">
          <button type="button" class="btn btn-success mt-5">
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Back to Home
            </Link>
          </button>
        </p>
      </div>
    </>
  ) : (
    <>
      <h1 className="text-center">
        No such Article with the id :- {singleArticleId} Exists.
      </h1>
    </>
  );
};

export default SingleArticle;
