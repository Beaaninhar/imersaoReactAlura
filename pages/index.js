import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
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
              <form>
                {/* MINUTO 36:46 */}
                <input placeholder="Nome" />
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
