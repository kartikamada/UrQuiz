import { useAuth } from '@/auth/AuthProvider';
import DashboardTemplate from '@/components/DashboardTemplate/DashboardTemplate';
import useQuiz from '@/hooks/useQuiz';
import { useNavigate } from 'react-router';
import css from './Dashboard.module.css';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { quiz, startQuiz } = useQuiz();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isLoading) return;
    setLoading(true);

    const formData = new FormData(e.target);
    try {
      await startQuiz(formData.get('category'), formData.get('difficulty'));
      navigate('/quiz');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  if (quiz) {
    return (
      <DashboardTemplate
        title='Welcome back to Urquiz'
        user={user}
        logout={logout}
      >
        <div className={css.formInput}>
          <h2 className={css.selectLabel + ' ' + css.continueHeading}>
            {quiz.status === 'completed'
              ? 'You have completed the quiz!'
              : 'Ready to dive back into your quiz?'}
          </h2>
        </div>
        <button className={css.startButton} onClick={() => navigate('/quiz')}>
          {quiz.status === 'completed' ? 'See Results' : 'Continue Quiz'}
        </button>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate title='Welcome to Urquiz' user={user} logout={logout}>
      <form onSubmit={handleSubmit}>
        <div className={css.formInput}>
          <label className={css.selectLabel} htmlFor='category'>
            Choose your category!
          </label>
          <select className={css.formSelect} id='category' name='category'>
            <option disabled value=''>
              Select a quiz
            </option>
            <option value=''>Any Category</option>
            <option value='9'>General Knowledge</option>
            <option value='10'>Books</option>
            <option value='11'>Film</option>
            <option value='12'>Music</option>
            <option value='13'>Musicals &amp; Theatres</option>
            <option value='14'>Television</option>
            <option value='15'>Video Games</option>
            <option value='16'>Board Games</option>
            <option value='17'>Science &amp; Nature</option>
            <option value='18'>Computers</option>
            <option value='19'>Mathematics</option>
            <option value='20'>Mythology</option>
            <option value='21'>Sports</option>
            <option value='22'>Geography</option>
            <option value='23'>History</option>
            <option value='24'>Politics</option>
            <option value='25'>Art</option>
            <option value='26'>Celebrities</option>
            <option value='27'>Animals</option>
            <option value='28'>Vehicles</option>
            <option value='29'>Comics</option>
            <option value='30'>Gadgets</option>
            <option value='31'>Japanese Anime &amp; Manga</option>
            <option value='32'>Cartoon &amp; Animations</option>
          </select>

          <label className={css.selectLabel} htmlFor='difficulty'>
            Choose your difficulty!
          </label>
          <select className={css.formSelect} id='difficulty' name='difficulty'>
            <option value=''>Any Difficulty</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
        <button className={css.startButton} type='submit' disabled={isLoading}>
          Start Quiz!
        </button>
      </form>
    </DashboardTemplate>
  );
}
