import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleContext from "./ArticleContext";

const ArticleState = (props) => {
  const host = "http://localhost:5000";
  let authtoken = localStorage.getItem("authtoken");

  const [allArticle, setAllArticle] = useState([]);
  const [user, setuser] = useState({});
  const [uname, setUname] = useState("username");
  const [userArticle, setUserArticle] = useState([]);
  const [singleArticle, setSingleArticle] = useState({});
  // const [isLogged,setIsLogged] = useState(false);
  const [isAuthentic, setIsAuthentic] = useState(false);
  const [search, setSearch] = useState({ text: "", by: "heading" });

  const getAllArticle = async () => {
    const response = await fetch(`${host}/api/allArticle`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      setAllArticle(json.allArticle);
    }
  };

  const searchArticles = (articles) => {
    let searchedArticles = [];
    if (search.by === "heading") {
      searchedArticles = articles.filter((article) => {
        if (article.title.toLowerCase().includes(search.text.toLowerCase())) {
          return article;
        }
      });
    } else {
      searchedArticles = articles.filter((article) => {
        if (
          article.authName.toLowerCase().includes(search.text.toLowerCase())
        ) {
          return article;
        }
      });
    }
    return searchedArticles;
  };

  const getUserArticle = async () => {
    const response = await fetch(`${host}/api/userArticle`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const json = await response.json();
    if (json.success) {
      setUserArticle(json.allUserArticle);
    }
  };

  const getUser = async () => {
    const response = await fetch(`${host}/auth/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const json = await response.json();
    let name = json.email.split("@")[0];
    // console.log(name);
    setUname(name);
    setuser(json);
    // return uname;
  };

  const getSingleArticle = async (id) => {
    // console.log(JSON.stringify({ id }));

    const response = await fetch(`${host}/api/singleArticle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    // console.log("JSON ", json);
    if (json.success) {
      setSingleArticle(json.article);
    }
  };

  const deleteArticle = async (id) => {
    // console.log(JSON.stringify({ id }));

    const response = await fetch(`${host}/api/deleteOne`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    if (json.success) {
      return true;
    }
    return false;
  };

  const checkAuthentic = async () => {
    if (localStorage.getItem("authtoken").length === 0) {
      setIsAuthentic(false);
      return;
    }
    const response = await fetch(`${host}/auth/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const json = await response.json();
    // const navigate = useNavigate();
    // console.log(json);
    // setIsAuthentic(json.success);
    return json.success;
  };

  return (
    <ArticleContext.Provider
      value={{
        allArticle,
        getAllArticle,
        getUser,
        user,
        uname,
        getUserArticle,
        userArticle,
        getSingleArticle,
        singleArticle,
        deleteArticle,
        searchArticles,
        search,
        setSearch,
        checkAuthentic,
        isAuthentic,
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleState;
