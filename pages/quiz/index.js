/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizBackground from '../../src/components/QuizBackground';
import QuizLogo from '../../src/components/QuizLogo';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import AlternativesForm from '../../src/components/AlternativesForm';
import BackLinkArrow from '../../src/components/BackLinkArrow';

function ResultgWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>RESULTADOS!</Widget.Header>

      <Widget.Content>
        <p>
          {'Você acertou: '}
          {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;

            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)}
          {' perguntas'}
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {' '}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src="https://icon-library.com/images/ajax-loading-icon/ajax-loading-icon-16.jpg"
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  questions,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubimeted, setIsQuestionSubimeted] = useState(false);
  const questionId = `question_${questionIndex}`;
  const isCorrect = selectedAlternative === questions.answer;
  const hasAltenativeSelected = selectedAlternative !== undefined;

  function preventSubmit(event) {
    event.preventDefault();
    setIsQuestionSubimeted(true);
    setTimeout(() => {
      addResult(isCorrect);
      onSubmit();
      setIsQuestionSubimeted(false);
      setSelectedAlternative(undefined);
    }, 3 * 1000);
  }

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={questions.image}
      />
      <Widget.Content>
        <h1>{questions.title}</h1>
        <p>{questions.description}</p>

        <AlternativesForm onSubmit={preventSubmit}>
          {questions.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                onChange={() => setSelectedAlternative(alternativeIndex)}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubimeted && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
          {JSON.stringify(questions, null, 4)}
        </pre> */}

          <Button type="submit" disabled={!hasAltenativeSelected}>CONFIRMAR</Button>

          {isQuestionSubimeted && isCorrect && <p>Acetou!</p>}
          {isQuestionSubimeted && !isCorrect && <p>Errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const totalQuestions = db.questions.length;
  const questions = db.questions[questionIndex];

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  function addResult(result) {
    setResults([...results, result]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.QUIZ && (
          <QuestionWidget
            questions={questions}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
          )}
          {screenState === screenStates.LOADING && <LoadingWidget />}

          {screenState === screenStates.RESULT && <ResultgWidget results={results} />}
        </QuizContainer>
      </QuizBackground>
    </>
  );
}
