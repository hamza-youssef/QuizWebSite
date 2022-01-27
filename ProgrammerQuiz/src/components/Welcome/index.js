import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../Firebase";
import { Link } from "react-router-dom";
import Logout from "../Logout";
import Loader from "../Loader";
import { QuizHtml, QuizCss, QuizJs } from "../quizProg";

import html from "../../images/html.png";
import css from "../../images/css.png";
import js from "../../images/js.png";

const Welcome = (props) => {
  const firebase = useContext(FirebaseContext);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/");
    });
    return () => {
      listener();
    };
  }, [userSession, firebase, props.history]);
  return userSession === null ? (
    <Loader
      loadingMsg={"Authentification ..."}
      styling={{ textAlign: "center", color: "#FFFFFF" }}
    />
  ) : (
    <div className="containerwlc">
      <div className="log">
        <Logout />
      </div>
      <h2>Choose A Topic :</h2>
      <div className="welcome">
        <div>
          <Link
            to={{
              pathname: "/DebutQuiz",
              state: { quiz: QuizHtml },
            }}
          >
            <img src={html} alt="html" />
          </Link>
          <h3>QUIZ HTML</h3>
        </div>
        <div>
          <Link
            to={{
              pathname: "/DebutQuiz",
              state: { quiz: QuizCss },
            }}
          >
            <img src={css} alt="css" />
          </Link>
          <h3>QUIZ CSS</h3>
        </div>
        <div>
          <Link
            to={{
              pathname: "/DebutQuiz",
              state: { quiz: QuizJs },
            }}
          >
            <img src={js} alt="js" />
          </Link>
          <h3>QUIZ JavaScript</h3>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
