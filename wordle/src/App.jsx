import { useState, useEffect } from "react";
import "./App.css";

const ans = "APPLE";

function App() {
  const [words, setWords] = useState(["", "", "", "", ""]);
  const [correct, setCorrect] = useState([0, 0, 0, 0, 0]);
  const [include, setInclude] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      // console.log(e.key);
      if (key === "Backspace") {
        const firstEmptyIndex = words.indexOf("");
        const newWords = [...words];
        newWords[firstEmptyIndex - 1] = "";
        setWords(newWords);
      }
      if (key === "Enter") {
        const newCorrect = [...correct];
        const newInclude = [...include];
        words.forEach((word, index) => {
          if (word.toUpperCase() === ans[index]) {
            newCorrect[index] = 1;
          } else if (ans.includes(word.toUpperCase())) {
            newInclude[index] = 1;
          }
        });
        console.log(newInclude);
        setCorrect(newCorrect);
        setInclude(newInclude);
      }
      if (key.length === 1 && key.match(/[a-z]/i)) {
        const firstEmptyIndex = words.indexOf("");
        // console.log(firstEmptyIndex);
        const newWords = [...words];
        newWords[firstEmptyIndex] = key;
        // console.log(newWords);
        setWords(newWords);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
  }, [words, correct]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      <div className="boxs">
        {words.map((word, index) => {
          const boxClass = `${correct[index] ? "correct" : ""} ${
            include[index] ? "include" : ""
          }`.trim();
          return (
            <div className={`box ${boxClass}`} key={index}>
              {word.toUpperCase()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
