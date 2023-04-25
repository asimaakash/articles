import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ArticleContext from "../context/article/ArticleContext";

export default function NewArticle() {
  const context = useContext(ArticleContext);
  //   console.log("This is ", context);

  const navigate = useNavigate();
  const { checkAuthentic } = context;
  if (!checkAuthentic()) {
    navigate("/login");
  }

  const [data, setData] = React.useState({
    newTitle: "",
    newArticleText: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        title: data.newTitle,
        aText: data.newArticleText,
      })
    );
    const token = localStorage.getItem("authtoken");
    const response = await fetch("http://localhost:5000/api/addArticle", {
      method: "POST",
      headers: {
        "content-type": "Application/JSON",
        "auth-token": token,
      },
      body: JSON.stringify({
        title: data.newTitle,
        aText: data.newArticleText,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // localStorage.setItem("authtoken", json.authtoken);
      alert("Successfully Added");
      navigate("/");
    } else {
      alert("Some Error Occured");
    }
  };

  const onChange = (e) => {
    console.log(data);

    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="newTitle" className="form-label my-3">
              Enter Title :{" "}
            </label>
            <input
              type="text"
              name="newTitle"
              className="form-control"
              id="newTitle"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newArticleText" className="form-label my-3">
              Example textarea
            </label>
            <textarea
              name="newArticleText"
              className="form-control"
              id="newArticleText"
              rows={3}
              onChange={onChange}
            ></textarea>

            <button type="submit" className="btn btn-primary my-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
