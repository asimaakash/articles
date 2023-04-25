import React, { useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ArticleContext from "../context/article/ArticleContext";

const SingleArticle = () => {
  const context = useContext(ArticleContext);
  //   console.log("This is ", context);
  const navigate = useNavigate();
  const { getSingleArticle, singleArticle, uname, deleteArticle } = context;

  const { singleArticleId } = useParams();

  const deleteOne = () => {
    deleteArticle(singleArticleId);
    navigate(`/myArticle/${uname}`);
  };

  useEffect(() => {
    getSingleArticle(singleArticleId);
  }, []);

  return singleArticle ? (
    <>
      <div className="container">
        <h1 className="text-center mt-5" style={{ color: "red" }}>
          {singleArticle.title}
        </h1>
        <p className="articleText mt-4" style={{ color: "white" }}>
          {singleArticle.aText}
        </p>
        <br />
        <div className="authName" style={{ color: "white" }}>
          Author Name :- <b> {singleArticle.authName}</b>
        </div>
        <p className="text-center mt-4">
          <button type="button" onClick={deleteOne} class="btn btn-danger">
            Delete
          </button>
        </p>
        <br />

        <p className="text-center">
          <button type="button" class="btn btn-success">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/myArticle/${uname}`}
            >
              My Articles
            </Link>
          </button>
        </p>
      </div>
    </>
  ) : (
    <>
      <h1 className="text-center">
        No such Article with the id :- {singleArticleId} Exists.
        <Link to={`/myArticle/${uname}`}>My Articles</Link>
      </h1>
    </>
  );
};

export default SingleArticle;
