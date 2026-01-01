import { useState } from 'react';
import ChangePassword from '../ChangePassword';
import ForgotPassword from '../ForgotPassword';
import Home from '../Home';
import Login from '../Login';
import Register from '../Register';

type Screen =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'home'
  | 'change-password';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleForgotPassword = () => setCurrentScreen('forgot-password');
  const handleBackToLogin = () => setCurrentScreen('login');
  const handleGoRegister = () => setCurrentScreen('register');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const handleChangePassword = () => setCurrentScreen('change-password');
  const handleBackToHome = () => setCurrentScreen('home');

  if (isLoggedIn) {
    if (currentScreen === 'change-password') {
      return <ChangePassword onBack={handleBackToHome} />;
    }
    return (
      <Home
        onLogout={handleLogout}
        onChangePassword={handleChangePassword}
      />
    );
  }

  if (currentScreen === 'forgot-password') {
    return <ForgotPassword onBack={handleBackToLogin} />;
  }

  if (currentScreen === 'register') {
    return <Register onBackToLogin={handleBackToLogin} />;
  }

  return (
    <Login
      onForgotPassword={handleForgotPassword}
      onLoginSuccess={handleLogin}
      onGoRegister={handleGoRegister}
    />
  );
}
