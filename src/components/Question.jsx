import { nanoid } from "nanoid";
import { decode } from "html-entities";
import "./Question.css";
import checkIcon from "../assets/circle-check-solid.svg";
import xIcon from "../assets/circle-xmark-solid.svg";

export default function Question(props) {
  // classNames: answer-btn (general btn), correct-answer (style when showing answer), incorrect-answer (style when showing answer), selected-answer (style before showing answer when btn is selected)

  /* eslint-disable react/prop-types */ //

  // adds incorrect answers to answersArr
  // const answersArr = props.incorrectAnswer;

  // rnd num to randomize position of correct answer being spliced into answerArr
  // let rndPosition = Math.floor(Math.random() * 4);

  // adds correct answer to arr of incorrect answers to make the answerArr
  // answersArr.splice(rndPosition, 0, props.correctAnswer);

  // boolean answers always ordered "true" then "false"
  // if (props.type === "boolean") {
  //   answersArr.sort().reverse();
  // }

  // renders each answer as a btn
  // const questionElement = answersArr.map((answer) => (
  //   <button
  //     key={nanoid()}
  //     className="answer-btn"
  //     // onClick={props.handleSelectAnswer(props.id, answer)}
  //   >
  //     {decode(answer)}
  //   </button>
  // ));

  // const incorrectAnswerElement = props.incorrectAnswer.map((answer) => {
  //   const incorrectClassName = `
  //   ${
  //     props.selectedAnswer === props.incorrectAnswer
  //       ? "selected-answer"
  //       : "answer-btn"
  //   }
  //   ${
  //     props.showAnswer &&
  //     props.selectedAnswer === props.incorrectAnswer &&
  //     "answer-incorrect"
  //   }`;

  //   return (
  //     <button
  //       key={nanoid()}
  //       className={incorrectClassName}
  //       onClick={props.handleSelectAnswer(props.id, answer)}
  //     >
  //       {decode(answer)}
  //     </button>
  //   );
  // });

  // const correctAnswerClassName = `${
  //   props.selectedAnswer === props.correctAnswer
  //     ? "selected-answer"
  //     : "answer-btn"
  // }
  // ${props.showAnswer && "answer-correct"}`;

  // const correctAnswerElement = (
  //   <button
  //     key={nanoid()}
  //     className={correctAnswerClassName}
  //     onClick={props.handleSelectAnswer(props.id, props.correctAnswer)}
  //   >
  //     {decode(props.correctAnswer)}
  //   </button>
  // );

  // const answersElement = incorrectAnswerElement.splice(
  //   rndPosition,
  //   0,
  //   correctAnswerElement
  // );

  const incorrectAnswerElements = props.incorrectAnswer.map((answer) => {
    const incorrectAnswerClassName = `
    ${props.selectedAnswer === answer ? "selected-answer" : "answer-btn"}
    ${props.showAnswer && props.selectedAnswer === answer && "answer-incorrect"}
    `;

    return (
      <button
        key={nanoid()}
        className={incorrectAnswerClassName}
        onClick={() => props.handleSelectAnswer(props.id, answer)}
      >
        {decode(answer)}
      </button>
    );
  });

  const correctAnswerClassName = `
  ${
    props.selectedAnswer === props.correctAnswer
      ? "selected-answer"
      : "answer-btn"
  }
  ${props.showAnswer && "answer-correct"}
  `;

  const correctAnswerElement = (
    <button
      key={nanoid()}
      className={correctAnswerClassName}
      onClick={() => props.handleSelectAnswer(props.id, props.correctAnswer)}
    >
      {decode(props.correctAnswer)}
    </button>
  );

  incorrectAnswerElements.push(correctAnswerElement);

  // sorts answers alphabetically
  const answerElements = incorrectAnswerElements.sort((a, b) =>
    a.props.children.localeCompare(b.props.children)
  );

  // boolean answers always ordered "true" then "false"
  if (props.type === "boolean") {
    incorrectAnswerElements.sort().reverse();
  }

  // FIXME: this way of rendering answers changes question on refresh. why?
  // FIXME: when answer selected it moves arr positions left
  // FIXME: change the className from answerElements to incorrectAnswerElements
  // // random position
  // let rndPosition = Math.floor(Math.random() * 4);

  // // insert correct answer into random position of incorrect answer array
  // incorrectAnswerElements.splice(rndPosition, 0, correctAnswerElement);

  // // if true false, render true first
  // if (props.type === "boolean") [incorrectAnswerElements.sort().reverse()];

  // console.log(incorrectAnswerElements);

  return (
    <div className="questions-container">
      <div className="qa-container">
        <h1 className="question">{decode(props.question)}</h1>
        <div className="answer-wrapper">{answerElements}</div>
        <hr />
      </div>
      <div className="answer-status">
        {props.showAnswer &&
          (props.selectedAnswer === props.correctAnswer ? (
            <img
              src={checkIcon}
              width={30}
              className="svg-green"
              alt="check mark, answer correct"
            />
          ) : (
            <img
              src={xIcon}
              width={30}
              className="svg-red"
              alt="X mark, answer incorrect"
            />
          ))}
      </div>
    </div>
  );
}
