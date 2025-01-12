import { useAuth } from '@/auth/AuthProvider';
import { Link, useNavigate } from 'react-router';
import AuthTemplate from '../../../components/AuthTemplate/AuthTemplate';
import { toast } from 'react-toastify';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      signup({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      });
      navigate('/auth/login');
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <AuthTemplate title='Sign Up'>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Enter your name'
            required
          />
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
        <button type='submit'>Sign Up</button>
        <p>
          Already have an account? <Link to='/auth/login'>Login</Link>
        </p>
      </form>
    </AuthTemplate>
  );
}
