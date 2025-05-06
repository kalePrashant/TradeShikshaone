import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Auth.module.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission, API calls, etc.
    console.log('Form submitted:', formData);
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{isLogin ? 'Login' : 'Register'} | TradeShiksha</title>
        <meta name="description" content={isLogin ? 'Login to your TradeShiksha account' : 'Create a new TradeShiksha account'} />
      </Head>

      <main className={styles.main}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p>{isLogin ? 'Login to access your account' : 'Join TradeShiksha to start learning'}</p>
          </div>
          
          <div className={styles.authTabs}>
            <button 
              className={isLogin ? styles.activeTab : ''} 
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={!isLogin ? styles.activeTab : ''} 
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          
          <form className={styles.authForm} onSubmit={handleSubmit}>
            {!isLogin && (
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            {!isLogin && (
              <>
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>I am a</label>
                  <div className={styles.roleOptions}>
                    <label className={styles.roleOption}>
                      <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={formData.role === 'student'}
                        onChange={handleChange}
                      />
                      <span>Student</span>
                    </label>
                    <label className={styles.roleOption}>
                      <input
                        type="radio"
                        name="role"
                        value="instructor"
                        checked={formData.role === 'instructor'}
                        onChange={handleChange}
                      />
                      <span>Instructor</span>
                    </label>
                  </div>
                </div>
              </>
            )}
            
            {isLogin && (
              <div className={styles.forgotPassword}>
                <Link href="/auth/forgot-password">Forgot Password?</Link>
              </div>
            )}
            
            <button type="submit" className={styles.authButton}>
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>
          
          <div className={styles.authDivider}>
            <span>OR</span>
          </div>
          
          <div className={styles.socialAuth}>
            <button className={styles.googleAuth}>
              Continue with Google
            </button>
            <button className={styles.facebookAuth}>
              Continue with Facebook
            </button>
          </div>
          
          <div className={styles.authFooter}>
            {isLogin ? (
              <p>Don't have an account? <button onClick={toggleAuthMode}>Register</button></p>
            ) : (
              <p>Already have an account? <button onClick={toggleAuthMode}>Login</button></p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}