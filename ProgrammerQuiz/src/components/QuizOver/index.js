import React, { Fragment, useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader";

const QuizOver = React.forwardRef((props, ref) => {
  const {
    levelName,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;

  const [asked, setAsked] = useState([]);

  useEffect(() => {
    setAsked(ref.current);

    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      checkDataAge(date);
    }
  }, [ref]);

  const checkDataAge = (date) => {
    const today = Date.now();
    const timeDifference = today - date;

    const daysDifference = timeDifference / (1000 * 3600 * 24);
    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now());
    }
  };

  const averageGarde = maxQuestions / 2;

  if (score < averageGarde) {
    //********** Recommencer le Quiz **********/

    // setTimeout(() => {
    //   loadLevelQuestions(0);
    // }, 3000);

    //************Recharger le niveau *********/

    setTimeout(() => {
      loadLevelQuestions(quizLevel);
    }, 3000);
  }

  const desision =
    score >= averageGarde ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {quizLevel < levelName.length ? (
            <>
              <p className="successMsg">Bravo, passez au niveau suivant !</p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestions(quizLevel)}
              >
                Niveau Suivant
              </button>
            </>
          ) : (
            <>
              <p className="successMsg">
                <GiTrophyCup size="50px" />
                Bravo, vous étes un expert !{" "}
              </p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}
              >
                Accueil
              </button>
            </>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite : {percent}%</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué ! </p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite : {percent}%</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    );

  const questionAnswer =
    score >= averageGarde ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg={"Pas de Réponses"}
            styling={{ textAlign: "center", color: "red" }}
          />
        </td>
      </tr>
    );

  return (
    <Fragment>
      {desision}

      <hr />
      <p>Les réponses aux question posées</p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponses</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
    </Fragment>
  );
});

export default React.memo(QuizOver);
