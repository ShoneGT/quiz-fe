import React, {useEffect, useState} from 'react';
import questionsData from '../data/questions.json';
// import answersData from './data/answers.json';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import './quiz.style.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [timer, setTimer] = useState(10);
    const [disabled, setDisabled] = useState(false);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        console.log(questionsData)
        setQuestions(questionsData);

        let time = 3;
        const interval = setInterval(() => {
            time -= 1;
            if (time > -1) {
                setTimer(time);
            } else {
                clearInterval(interval);
                setDisabled(true);
                setCurrentQuestion(currentQuestion + 1)
                resetValues()
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const answer = (answer) => {
        answer.userAnswered = true;

        setDisabled(true);
        setAnswers([...answers]);
    };

    const resetValues = () => {
        setDisabled(false)
        setTimer(10)
    }
    return (
        <div className="container">
            {/*<CircularProgress value={80} />*/}
            <div className="timer-wrapper">
                <div className="timer">{timer}</div>
            </div>
            <div>
                <h1 className="question">{questions[currentQuestion]?.question}</h1>
            </div>
            <ul>
                {questions[currentQuestion]?.answers.map((a) => {
                    return (
                        <li className="list">
                            <button
                                onClick={() => answer(a)}
                                className={` ${a.correct && disabled ? 'correct' : ''}
                                ${disabled && !a.correct ? 'disabled' : ''}
                                `}
                                disabled={disabled}
                            >
                                <div className="answer-wrapper">
                                    {a.userAnswered && <div className="user-badge"></div>}
                                    <div className="answer-text">{a.answer}</div>
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Quiz;
