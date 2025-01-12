import useQuiz from '@/hooks/useQuiz';
import { Navigate, useNavigate } from 'react-router';
import present from '../../assets/present.png';
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import QuestionProgressBar from '../../components/QuestionProgressBar/QuestionProgressBar.jsx';
import QuizTimer from '../../components/QuizTimer/QuizTimer.jsx';
import { decodeHtml } from '../../utils/utils.js';
import css from './Quiz.module.css';

export default function Quiz() {
  const navigate = useNavigate();

  const {
    quiz,
    currentQuestion,
    answerQuestion,
    timeRemaining,
    isTimeCritical,
    finishQuiz,
  } = useQuiz();

  if (!quiz) {
    return <Navigate to='/' />;
  }

  if (quiz?.status === 'completed') {
    return (
      <main className={css.completeContainer}>
        <header>
          <img src={present} alt='Quiz Complete' />
          <h1>Result of Your Quiz</h1>
        </header>
        <section>
          <table>
            <tbody>
              <tr>
                <th scope='row'>Correct Answers</th>
                <td>{quiz.correctAnswers}</td>
              </tr>
              <tr>
                <th scope='row'>Incorrect Answers</th>
                <td>{quiz.questions.length - quiz.correctAnswers}</td>
              </tr>
              <tr>
                <th scope='row'>Score</th>
                <td>{(quiz.correctAnswers / quiz.questions.length) * 100}%</td>
              </tr>
            </tbody>
          </table>
        </section>
        <footer>
          <button
            onClick={() => {
              finishQuiz();
              navigate('/');
            }}
          >
            Return to Dashboard
          </button>
        </footer>
      </main>
    );
  }

  return (
    <main className={css.container}>
      <header className={css.header}>
        <div className={css.title}>
          <div>
            <QuizTimer
              timeRemaining={timeRemaining}
              isTimeCritical={isTimeCritical}
            />
          </div>
          <div>
            <h2>Urquiz</h2>
          </div>
          <div>
            <button onClick={() => navigate('/')} className={css.quitButton}>
              ✕
            </button>
          </div>
        </div>
        <div className={css.progress}>
          <QuestionProgressBar
            currentQuestion={quiz.currentQuestion}
            totalQuestions={quiz.questions.length}
          />
        </div>
      </header>
      <section className={css.question}>
        <h1>{decodeHtml(currentQuestion.question)}</h1>
      </section>
      <section className={css.answers}>
        {currentQuestion.options.map((option, i) => (
          <OptionButton
            key={i}
            selected={false}
            optionText={decodeHtml(option)}
            onClick={() => answerQuestion(option)}
          />
        ))}
      </section>
    </main>
  );
}
