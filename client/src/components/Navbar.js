import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

// Temporary auth context until you implement authentication
const useAuth = () => {
  return {
    currentUser: null,
    logout: () => console.log('Logout clicked')
  };
};

export default function Navbar({ transparent = false }) {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${transparent ? styles.transparent : ''}`}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.svg" alt="TradeShiksha Logo" />
          <span><span className={styles.tradePart}>Trade</span><span className={styles.shikshaPart}>Shiksha</span></span>
        </Link>
        
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
          <Link href="/" className={router.pathname === '/' ? styles.active : ''}>
            Home
          </Link>
          <Link href="/courses" className={router.pathname.startsWith('/courses') ? styles.active : ''}>
            Courses
          </Link>
          <Link href="/webinars" className={router.pathname.startsWith('/webinars') ? styles.active : ''}>
            Webinars
          </Link>
          <Link href="/blog" className={router.pathname.startsWith('/blog') ? styles.active : ''}>
            Blog
          </Link>
          <Link href="/about" className={router.pathname.startsWith('/about') ? styles.active : ''}>
            About
          </Link>
        </div>
        
        <div className={styles.navbarActions}>
          {currentUser ? (
            <div className={styles.userDropdown}>
              <button className={styles.userButton} onClick={toggleDropdown}>
                <div className={styles.userAvatar}>
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt={currentUser.displayName} />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                <span className={styles.userName}>
                  {currentUser.displayName || 'User'}
                </span>
              </button>
              
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/dashboard" className={styles.dropdownItem}>
                    Dashboard
                  </Link>
                  <Link href="/profile" className={styles.dropdownItem}>
                    Profile
                  </Link>
                  <button onClick={logout} className={styles.dropdownItem}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className={styles.loginButton}>
                Login
              </Link>
              <Link href="/signup" className={styles.signupButton}>
                Sign Up
              </Link>
            </>
          )}
          
          <button className={styles.menuButton} onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
}