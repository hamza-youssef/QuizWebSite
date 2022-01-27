import React from "react";
import erreur from "../../images/erreur.png";

const centerH2 = {
  textAlign: "center",
  marginTop: "50px",
};

const centerImg = {
  display: "block",
  margin: "0 auto",
};

const ErrorPage = () => {
  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 style={centerH2}>Oups, cette page n'existe pas!</h2>
        <img style={centerImg} src={erreur} alt="error page" />
      </div>
    </div>
  );
};

export default ErrorPage;
