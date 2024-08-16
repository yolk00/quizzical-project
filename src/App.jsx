import { useState, useId } from "react";
import "./App.css";
import QuizList from "./components/QuizList";
import toast, { Toaster } from "react-hot-toast";
// import sunSolid from "./assets/sun-solid.svg";
import sunIcon from "./assets/sun-regular.svg";
import moonSolid from "./assets/moon-solid.svg";
// import moonIcon from "./assets/moon-regular.svg";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizSetupData, setQuizSetupData] = useState({
    category: "",
    difficulty: "",
    type: "",
  });
  const [showQuestionsError, setShowQuestionsError] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  if (!isDarkMode) {
    document.documentElement.className = "light";
  } else if (isDarkMode) {
    document.documentElement.className = "dark";
  }

  // function testing() {
  //   console.log("testing");
  //   // console.log(setStartQuiz);
  //   // console.log(startQuiz);
  //   // console.log(isDarkMode);
  //   console.log(quizSetupData);
  // }

  // used to give id to questions
  const id = useId();

  // handles change of setup data
  function handleChange(event) {
    const { name, value } = event.target;
    setQuizSetupData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    // console.log(quizSetupData);
  }

  // submits setup data to fetch correct api link and start quiz
  function handleSubmit(event) {
    event.preventDefault();

    if (quizSetupData.category === "") {
      setStartQuiz(false);
      console.log("choose category");
      toast.error(
        "Please choose a category",
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
    } else {
      setStartQuiz((prevState) => !prevState);
      toast.dismiss();
    }
  }

  function handleShowQuestionsError(boolean) {
    setShowQuestionsError(boolean);
  }

  return (
    <div className="">
      {/* conditionally render the questions and unrender the setup to start the quiz */}
      <div className="top-right noselect">
        <label className="switch">
          <input
            name="mode-switch"
            type="checkbox"
            onChange={() => setIsDarkMode((prevState) => !prevState)}
          />
          <span className="slider round icon-container">
            <img
              src={moonSolid}
              alt="moon icon"
              width={10}
              className={isDarkMode ? "" : "fade-out"}
            />
            <img
              src={sunIcon}
              alt="sun icon"
              width={10}
              className={isDarkMode ? "fade-out" : ""}
            />
          </span>
        </label>
      </div>
      {startQuiz ? (
        <QuizList
          gameSettings={quizSetupData}
          handleStartQuiz={handleSubmit}
          handleShowQuestionsError={handleShowQuestionsError}
          isDarkMode={isDarkMode}
        />
      ) : (
        <div className="border">
          <h1>Quizzical</h1>
          <h3 className="sub-title">Test your knowledge!</h3>
          {showQuestionsError && (
            <h3>Oops! we could not find any questions with these options</h3>
          )}
          <form className="form" onSubmit={handleSubmit}>
            <div className="dropdowns custom-select">
              <label htmlFor={id + "-category"}>Category:</label>
              <select
                name="category"
                id={id + "-category"}
                value={quizSetupData.category}
                onChange={handleChange}
                className="select"
              >
                <option value="">--Choose category--</option>
                <option value="9">General knowledge</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="25">Art</option>
              </select>
            </div>
            <div className="dropdowns custom-select">
              <label htmlFor={id + "-difficulty"}>Difficulty:</label>
              <select
                name="difficulty"
                id={id + "-difficulty"}
                value={quizSetupData.difficulty}
                onChange={handleChange}
                className="select"
              >
                <option value="">Any difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="dropdowns custom-select">
              <label htmlFor={id + "-type"}>Question type</label>
              <select
                name="type"
                id={id + "-type"}
                value={quizSetupData.type}
                onChange={handleChange}
                className="select"
              >
                <option value="">Any type</option>
                <option value="boolean">True / False</option>
                <option value="multiple">Multiple Choice</option>
              </select>
            </div>
            <button className="primary-btn">Start Quiz!</button>
          </form>
          {/* <button onClick={testing}>test</button> */}
        </div>
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          error: {
            iconTheme: isDarkMode
              ? {
                  primary: "#AF3029",
                }
              : {
                  primary: "#D14D41",
                },
          },
        }}
      />
    </div>
  );
}

export default App;
