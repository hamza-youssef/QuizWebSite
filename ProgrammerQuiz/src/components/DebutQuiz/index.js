import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../Firebase";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import Logout from "../Logout";
import Quiz from "../Quiz";

import retour from "../../images/return.png";

const DebutQuiz = (props) => {
  const firebase = useContext(FirebaseContext);
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/");
    });
    if (!!userSession) {
      firebase
        .user(userSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            setUserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

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
    <div className="quiz-bg">
      <div className="container">
        <Link className="return" to="/welcome">
          <img src={retour} alt="retour" />
        </Link>
        <Logout />
        <Quiz userData={userData} quiz={props.location.state.quiz} />
      </div>
    </div>
  );
};

export default DebutQuiz;
