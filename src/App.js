import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [answers, setAnswers] = useState({ main: 0, num1: 0, num2: 0, choices:[{ value: "0", output: ""}] })
  const [score, setScore] = useState(0)
  const [inGame, setInGame] = useState(false)

  useEffect(() => {
    generateData()
    },[]);

  const generateData = () => {
    let mainGen = Math.floor(Math.random() * 10) + 1
        let num1Gen = Math.floor(Math.random() * mainGen) + 1
        let num2Gen = mainGen - num1Gen
        setAnswers({
          main: mainGen,
          num1: num1Gen,
          num2: num2Gen,
          choices: [
            { value: "0", output: num1Gen.toString() + " + " + num2Gen.toString()},
            { value: "1", output: num1Gen.toString() + " + " + (num2Gen+1).toString()},
            { value: "2", output: (num1Gen-1).toString() + " + " + num2Gen.toString()},
            { value: "3", output: (num1Gen+1).toString() + " + " + num2Gen.toString()},
          ],
        });
  }

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  console.log(array)
  return array;
}

const handleClick = (value) => {
  if (value === "0") {
    setScore(score + 100);
    generateData();
  } else {
    setInGame(false); 
    setScore(0);
  }
}

const renderChoice = ({ value, output }) => (

    <button class="button" key={value} onClick={() => handleClick(value)}>{output}</button>

);

  if (inGame) {
    return (
      <div className="App">
        <>
        <h3>Score: {score}</h3>
        <h1>{answers.main}</h1>
        <div className="wrapper">
          {shuffle(answers.choices).map(renderChoice)}
        </div>
        </>
      </div>
    );
  }
  return (
    <div className="App">
      <>
        <h1>Addition Game</h1>
        <button onClick={() => setInGame(true)}>Play</button>
      </>
    </div>
  );
}

export default App;
