import { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Pendu from "./Pendu";
import HiddenWord from "./HiddenWord";
import KeyboardComponent from "./KeyboardComponent";
import randomWords from "random-words";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f4f4f4;
  }
`;

const LETTERS = new Set([
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]);

const WORD_MAX_LENGTH = 5;
const MAX_ATTEMPTS = 10;

function App() {
  const [currentState, setState] = useState({
    usedLetters: new Set(),
    numberOfAttempts: 0,
    gameState: "ongoing",
    currentWord: randomWords({
      exactly: 1,
      wordsPerString: 1,
      wordLength: WORD_MAX_LENGTH,
      formatter: (word) => word.toUpperCase(),
    })[0],
  });

  function computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g, (letter) =>
      usedLetters.has(letter) ? letter : "_"
    );
  }

  function checkWord(usedLetters, currentWord) {
    let result = [...currentWord].every(function (wordLetter) {
      return usedLetters.has(wordLetter);
    });

    return result;
  }

  function Reset() {
    setTimeout(() => {
      setState({
        usedLetters: new Set(),
        numberOfAttempts: 0,
        gameState: "ongoing",
        currentWord: randomWords({
          exactly: 1,
          wordsPerString: 1,
          wordLength: WORD_MAX_LENGTH,
          formatter: (word) => word.toUpperCase(),
        })[0],
      });
    }, 3000);
    return null;
  }

  function clickHandle(pressedKey) {
    let usedLetters = currentState.usedLetters;
    let numberOfAttempts = currentState.numberOfAttempts;
    let gameState = currentState.gameState;
    let foundLetterIndex = currentState.currentWord.indexOf(pressedKey);

    if (foundLetterIndex !== undefined) {
      usedLetters.add(pressedKey);
    }

    numberOfAttempts++;

    if (checkWord(usedLetters, currentState.currentWord)) {
      gameState = "Won";
    } else {
      if (numberOfAttempts === MAX_ATTEMPTS) {
        gameState = "Lost";
      }
    }

    setState((previous) => {
      return {
        ...previous,
        usedLetters: usedLetters,
        numberOfAttempts: numberOfAttempts,
        gameState: gameState,
      };
    });
  }

  return (
    <div>
      <GlobalStyle />

      <Container>
        <Row>
          <Col className="text-center">
            <Pendu
              pourcentage={Math.round(
                (6 * currentState.numberOfAttempts) / MAX_ATTEMPTS
              )}
            />
          </Col>
        </Row>
        <Row className="my-5">
          <Col className="text-center">
            {currentState.gameState === "ongoing" && (
              <HiddenWord
                display={computeDisplay(
                  currentState.currentWord,
                  currentState.usedLetters
                )}
              />
            )}

            {currentState.gameState === "Won" && (
              <div>
                <HiddenWord display="Gagné !" />
                <Reset />
              </div>
            )}

            {currentState.gameState === "Lost" && (
              <div>
                <HiddenWord display="Perdu !" />
                <Reset />
              </div>
            )}
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <KeyboardComponent
              alphabet={LETTERS}
              usedLetters={currentState.usedLetters}
              clickHandler={clickHandle}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
