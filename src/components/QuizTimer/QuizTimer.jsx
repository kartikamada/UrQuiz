import css from './QuizTimer.module.css';

export default function QuizTimer({ timeRemaining, isTimeCritical }) {
  return (
    <div className={`${css.quizTimer} ${isTimeCritical ? css.critical : ''}`}>
      {timeRemaining}
    </div>
  );
}
