import css from './QuestionProgressBar.module.css';

export default function QuestionProgressBar({
  currentQuestion,
  totalQuestions,
}) {
  const percentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className={css.progressBar}>
      <div className={css.progressBarBackground}>
        <div
          className={css.progressBarFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={css.progressText}>
        {currentQuestion}/{totalQuestions}
      </p>
    </div>
  );
}
