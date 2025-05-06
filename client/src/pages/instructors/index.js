import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/Instructors.module.css';

export default function Instructors() {
  // This would eventually come from an API
  const [instructors, setInstructors] = useState([
    {
      id: 101,
      name: 'Rahul Sharma',
      expertise: 'Technical Analysis, Options Trading',
      experience: '15+ years',
      courses: 8,
      students: 5200,
      rating: 4.8,
      bio: 'Professional trader with extensive experience in Indian stock markets. Specializes in technical analysis and options strategies.',
      avatar: '/images/instructors/rahul-sharma.jpg'
    },
    {
      id: 102,
      name: 'Priya Patel',
      expertise: 'Fundamental Analysis, Value Investing',
      experience: '12+ years',
      courses: 6,
      students: 3800,
      rating: 4.9,
      bio: 'Certified financial analyst with a focus on value investing and long-term wealth creation through equity markets.',
      avatar: '/images/instructors/priya-patel.jpg'
    },
    {
      id: 103,
      name: 'Vikram Mehta',
      expertise: 'Derivatives Trading, Risk Management',
      experience: '18+ years',
      courses: 10,
      students: 6500,
      rating: 4.7,
      bio: 'Former hedge fund manager specializing in derivatives trading and advanced risk management techniques.',
      avatar: '/images/instructors/vikram-mehta.jpg'
    },
    {
      id: 104,
      name: 'Anjali Desai',
      expertise: 'Behavioral Finance, Trading Psychology',
      experience: '10+ years',
      courses: 5,
      students: 2900,
      rating: 4.6,
      bio: 'Combines psychology and finance to help traders overcome emotional biases and improve decision-making.',
      avatar: '/images/instructors/anjali-desai.jpg'
    },
  ]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Our Instructors | TradeShiksha</title>
        <meta name="description" content="Learn from the best stock market experts in India" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Meet Our Expert Instructors</h1>
        <p className={styles.subtitle}>Learn from India's top stock market professionals with years of experience</p>
        
        <div className={styles.instructorGrid}>
          {instructors.map(instructor => (
            <Link href={`/instructors/${instructor.id}`} key={instructor.id}>
              <div className={styles.instructorCard}>
                <div className={styles.instructorAvatar}>
                  <img src={instructor.avatar} alt={instructor.name} />
                </div>
                <div className={styles.instructorInfo}>
                  <h2>{instructor.name}</h2>
                  <p className={styles.expertise}>{instructor.expertise}</p>
                  <p className={styles.bio}>{instructor.bio}</p>
                  
                  <div className={styles.instructorStats}>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>{instructor.experience}</span>
                      <span className={styles.statLabel}>Experience</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>{instructor.courses}</span>
                      <span className={styles.statLabel}>Courses</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>{instructor.students.toLocaleString()}</span>
                      <span className={styles.statLabel}>Students</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>★ {instructor.rating}</span>
                      <span className={styles.statLabel}>Rating</span>
                    </div>
                  </div>
                  
                  <button className={styles.viewProfileButton}>View Profile</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}