import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Auth.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setError('');
      setMessage('');
      setLoading(true);
      
      const result = await requestPasswordReset(email);
      
      if (result.success) {
        setMessage(result.message);
        setEmail('');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <Head>
        <title>Forgot Password | TradeShiksha</title>
        <meta name="description" content="Reset your TradeShiksha password" />
      </Head>
      
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Link href="/">
            <img src="/logo.png" alt="TradeShiksha Logo" className={styles.logo} />
          </Link>
          <h1>Reset your password</h1>
          <p>Enter your email and we'll send you a link to reset your password</p>
        </div>
        
        {error && <div className={styles.errorAlert}>{error}</div>}
        {message && <div className={styles.successAlert}>{message}</div>}
        
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.authButton}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className={styles.authFooter}>
          <p>Remember your password? <Link href="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}