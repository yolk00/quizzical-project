import { useState, useEffect } from "react";
import { nanoid } from "/node_modules/nanoid";
import GetQuestions from "./GetQuestions";
import Question from "./Question";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */ //
export default function QuizList({
  gameSettings,
  handleStartQuiz,
  handleShowQuestionsError,
  isDarkMode,
}) {
  const [questionsArr, setQuestionsArr] = useState([]);
  const [checkAnswerBtn, setCheckAnswerBtn] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const allQuestionsAnswered = questionsArr.every(
    (question) => question.selectedAnswer !== ""
  );

  // fetches api link using gameSettings to retrieve questions
  useEffect(() => {
    GetQuestions(gameSettings).then((questions) => {
      // show error if no questions are rendered, else start quiz
      if (questions.length === 0) {
        handleStartQuiz();
        handleShowQuestionsError(true);
        console.log("something went wrong");
        toast.error(
          "oops! we couldn't find any questions with those options.",
          isDarkMode
            ? {
                style: {
                  background: "#100F0F",
                  color: "#FFFCF0",
                  textAlign: "left",
                },
              }
            : {
                style: {
                  background: "#fff",
                  color: "#100F0F",
                  textAlign: "left",
                },
              }
        );
      } else {
        handleShowQuestionsError(false);
        console.log("start quiz");
      }

      // add id's, selectedAnswer, and showAnswer parameters to each question
      return setQuestionsArr(
        questions.map((question) => {
          return {
            ...question,
            id: nanoid(),
            selectedAnswer: "",
            showAnswer: false,
          };
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // counts correct answers
  useEffect(() => {
    if (questionsArr.length !== 0 && allQuestionsAnswered) {
      let correctAnswers = 0;

      questionsArr.forEach((question) => {
        if (question.correct_answer === question.selectedAnswer) {
          correctAnswers++;
        }
      });
      setCorrectAnswerCount(correctAnswers);
      setCheckAnswerBtn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsArr]);

  // determines what answer is selected
  function handleSelectAnswer(questionId, answer) {
    if (!isGameOver) {
      setQuestionsArr((prevArr) =>
        prevArr.map((question) =>
          question.id === questionId
            ? { ...question, selectedAnswer: answer }
            : question
        )
      );
    }
  }

  // checks answers
  function checkAnswers() {
    if (allQuestionsAnswered) {
      setIsGameOver(true);

      setQuestionsArr((prevArr) =>
        prevArr.map((question) => ({ ...question, showAnswer: true }))
      );
      toast.dismiss();
    } else {
      toast.error(
        "Please answer all questions",
        isDarkMode
          ? {
              style: {
                background: "#100F0F",
                color: "#FFFCF0",
              },
            }
          : {
              style: {
                background: "#fff",
                color: "#100F0F",
              },
            }
      );
    }
  }

  // start new quiz (takes you to select your quiz settings)
  function newQuiz(event) {
    setIsGameOver(false);
    setCheckAnswerBtn(false);
    console.log("start new quiz");

    handleStartQuiz(event);
  }

  // function test() {
  //   // console.log(questionsArr);
  //   console.log(gameSettings);
  //   console.log(isGameOver);
  //   // console.log(checkAnswerBtn);
  //   // console.log(handleStartQuiz);
  //   console.log(isDarkMode);
  //   console.log(startQuiz);
  // }

  // render list of questions
  const questionListElements = questionsArr.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        type={question.type}
        difficulty={question.difficulty}
        category={question.category}
        question={question.question}
        correctAnswer={question.correct_answer}
        incorrectAnswer={question.incorrect_answers}
        selectedAnswer={question.selectedAnswer}
        showAnswer={question.showAnswer}
        handleSelectAnswer={handleSelectAnswer}
      />
    );
  });

  return (
    <div className="quizList-container">
      <h2>Here are your questions...</h2>
      {questionListElements}
      {isGameOver && (
        <h3 className="correct-answer-text">
          Correct answers: {correctAnswerCount}/5
        </h3>
      )}
      <button
        className="primary-btn"
        // disabled={!checkAnswerBtn}
        onClick={isGameOver ? newQuiz : checkAnswers}
      >
        {isGameOver ? "Start new quiz" : "Check answers"}
      </button>
      {/* <button onClick={test}>test</button> */}
      {/* <pre>{JSON.stringify(questionsArr, null, 2)}</pre> */}
    </div>
  );
}
