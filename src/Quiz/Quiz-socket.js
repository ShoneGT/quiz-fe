import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const server = 'http://localhost:3009'

const socket = io(server);

function Quizz() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    socket.on('connect', (a) => {
      console.log(a);
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    socket.on('findAllQuiz', response =>
      {
        console.log('Quizzz:', response)
        setQuestions(response.questions)
        setAnswers(response.answers)

      }
    );

    socket.emit('findAllQuiz', 0, response =>
      {
        console.log('Quizzz:', response)
        setQuestions(response.questions)
        setAnswers(response.answers)

      }
    );
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  
  const sendAnswer = (answer) => {
    socket.emit('updateQuiz', {answer})
  }

  const sendPing = () => {
    socket.emit('ping');
  }

  return (
    <div>
      <p>Connected: { '' + isConnected }</p>
      {/* <p>Last pong: { lastPong || '-' }</p> */}
      <p> Questions:</p>
      <div>
        {questions.map(q => (
          <div key={q.id}>
            <p>{q.id}: {q.question}</p>
            
          </div>
        ))}
      </div>
      <hr />
      <p>Answers: </p>
      <div>
        {answers.map((q, index) => (
          <div key={index}>
            <p>{q.answer}</p>
            
          </div>
        ))}
      </div>
      <hr />
      <button onClick={() => sendAnswer('2022')}>Answer 1</button>
      <button onClick={() => sendAnswer('2024')}>Answer 2</button>
    </div>
  );
}

export default Quizz;