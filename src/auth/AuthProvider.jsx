import { useContext, createContext } from 'react';
import { useNavigate } from 'react-router';
import useLocalStorage from '@/hooks/useLocalStorage';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage('currentUser', null);
  const [usersStore, setUsersStore] = useLocalStorage('usersStore', {});

  function login(data) {
    const { email, password } = data;
    const user = usersStore[email];
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid credentials');
    }

    setUser(user);
  }

  function signup(data) {
    const { email, name, password } = data;
    if (usersStore[email]) {
      throw new Error('Email already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = { email, name, password: hashedPassword };
    setUsersStore({ ...usersStore, [email]: user });
  }

  function logout() {
    setUser(null);
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
