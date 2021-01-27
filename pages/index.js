import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  console.log(`Retorno do useState ${name} e ${setName}`);

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/quiz?name=${name}`);
    console.log('Fazendo uma subimissão por meio do react');
  }

  function handleInput(event) {
    console.log(event.target.value);
    // state
    // name = event.target.value;
    setName(event.target.value);
  }

  return (
    <>
      <Head>
        <title>Greys Quiz</title>
        <meta property="og:title" content={db.title} key="title" />
        <meta property="og:image" content={db.bg} key="ogimage" />
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <form onSubmit={handleSubmit}>
                <input placeholder="Nome do sofredor" onChange={handleInput} />
                {/* eslint-disable-next-line react/button-has-type */}
                <button type="submit" disabled={name.length === 0}>
                  Bora sofrer, ops! Jogar {name}
                </button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <h1>Quiz Grey's!</h1>

              <p>Criado por Aninha e Alura!</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/Beaaninhar/imersaoReactAlura" />
      </QuizBackground>
    </>
  );
}
