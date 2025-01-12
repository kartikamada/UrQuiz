import { useEffect, useMemo, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import { shuffleArray } from '@/utils/utils.js';

export default function useQuiz() {
  const QUIZ_TIME_LIMIT_SECONDS = 300;

  const [quiz, setQuiz] = useLocalStorage('quizState', null);

  const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIME_LIMIT_SECONDS);
  const isTimeCritical = timeRemaining < 60;

  useEffect(() => {
    if (quiz === null || quiz.status !== 'active') {
      return;
    }

    const intervalId = setInterval(() => {
      const elapsed = Math.floor(
        (new Date() - new Date(quiz.startDate)) / 1000
      );
      const remaining = QUIZ_TIME_LIMIT_SECONDS - elapsed;
      if (remaining <= 0) {
        setQuiz((prev) => ({ ...prev, status: 'completed' }));
        clearInterval(intervalId);
      }
      setTimeRemaining(remaining);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const timeRemainingFormatted = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const remainingSeconds = timeRemaining % 60;
    return (
      minutes.toString().padStart(2, '0') +
      ':' +
      remainingSeconds.toString().padStart(2, '0')
    );
  }, [timeRemaining]);

  const currentQuestion = useMemo(() => {
    if (quiz === null || quiz.status !== 'active') {
      return null;
    }

    const data = quiz.questions[quiz.currentQuestion];
    const { question, correct_answer, incorrect_answers } = data;
    const options = [correct_answer, ...incorrect_answers];
    shuffleArray(options);

    return {
      question,
      correct_answer,
      options,
    };
  }, [quiz]);

  async function startQuiz(category = '', difficulty = '', amount = 10) {
    const url = new URL('https://opentdb.com/api.php');

    url.searchParams.append('amount', amount);
    if (category !== '') {
      url.searchParams.append('category', category);
    }
    if (difficulty !== '') {
      url.searchParams.append('difficulty', difficulty);
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        'Failed to fetch quiz questions. Please try again later.'
      );
    }

    const { results } = await response.json();
    setQuiz({
      status: 'active',
      questions: results,
      currentQuestion: 0,
      correctAnswers: 0,
      startDate: new Date(),
    });
  }

  function answerQuestion(answer) {
    if (quiz === null || quiz.status !== 'active') {
      return;
    }

    setQuiz((prev) => {
      let correctAnswers = prev.correctAnswers;
      if (answer === currentQuestion.correct_answer) {
        correctAnswers++;
      }

      const current = prev.currentQuestion + 1;
      let status = 'active';
      if (answer === null || current === quiz.questions.length) {
        status = 'completed';
      }

      return {
        ...prev,
        status: status,
        currentQuestion: current,
        correctAnswers: correctAnswers,
      };
    });
  }

  function finishQuiz() {
    setQuiz(null);
  }

  return {
    quiz,
    timeRemaining: timeRemainingFormatted,
    isTimeCritical,
    answerQuestion,
    currentQuestion,
    startQuiz,
    finishQuiz,
  };
}
