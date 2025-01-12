import { useAuth } from '@/auth/AuthProvider';
import { Link, useNavigate } from 'react-router';
import AuthTemplate from '../../../components/AuthTemplate/AuthTemplate';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      login({
        email: formData.get('email'),
        password: formData.get('password'),
      });
      navigate('/');
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <AuthTemplate title='Login'>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter your email'
            required
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter your password'
            required
          />
        </div>
        <button type='submit'>Login</button>
        <p>
          Don't have an account? <Link to='/auth/signup'>Sign up</Link>
        </p>
      </form>
    </AuthTemplate>
  );
}
