import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input/input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

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
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <form onSubmit={handleSubmit}>
                <Input
                  name={name}
                  value={name}
                  placeholder="Nome do sofredor"
                  onChange={handleInput}
                />
                {/* eslint-disable-next-line react/button-has-type */}
                <Button type="submit" disabled={name.length === 0}>
                  {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                  Bora sofrer, ops! Jogar {name}
                </Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget
            as={motion.section}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Content>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <h1>Quiz Grey's!</h1>
              <p>Criado por Aninha e Alura!</p>
              <ul>
                {db.external.map((linkExterno) => {
                  const [projectName, githubUser] = linkExterno
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.');

                  return (
                    <li key={linkExterno}>
                      <Widget.Topic
                        as={Link}
                        href={`/quiz/${projectName}___${githubUser}`}
                      >
                        {`${githubUser}/${projectName}`}
                      </Widget.Topic>
                    </li>
                  );
                })}
              </ul>
            </Widget.Content>
          </Widget>
          <Footer 
            as={motion.footer}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/Beaaninhar/imersaoReactAlura" />
      </QuizBackground>
    </>
  );
}
