import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../styles/StudentDashboard.module.css';

export default function StudentDashboard() {
  // This would come from an API in a real application
  const [user, setUser] = useState({
    id: 1,
    name: 'Aditya Singh',
    email: 'aditya.singh@example.com',
    avatar: '/images/users/aditya-singh.jpg',
    enrolledCourses: 4,
    completedCourses: 2,
    certificatesEarned: 2
  });
  
  const [enrolledCourses, setEnrolledCourses] = useState([
    {
      id: 1,
      title: 'Introduction to Stock Market',
      instructor: 'Rahul Sharma',
      progress: 100,
      completed: true,
      lastAccessed: '2023-09-15T10:30:00',
      thumbnail: '/images/courses/stock-intro.jpg'
    },
    {
      id: 2,
      title: 'Technical Analysis Masterclass',
      instructor: 'Priya Patel',
      progress: 75,
      completed: false,
      lastAccessed: '2023-09-18T14:45:00',
      thumbnail: '/images/courses/technical-analysis.jpg'
    },
    {
      id: 3,
      title: 'Options Trading Strategies',
      instructor: 'Vikram Mehta',
      progress: 100,
      completed: true,
      lastAccessed: '2023-09-10T09:15:00',
      thumbnail: '/images/courses/options-trading.jpg'
    },
    {
      id: 4,
      title: 'Fundamental Analysis Deep Dive',
      instructor: 'Anjali Desai',
      progress: 30,
      completed: false,
      lastAccessed: '2023-09-20T16:20:00',
      thumbnail: '/images/courses/fundamental-analysis.jpg'
    }
  ]);
  
  const [upcomingClasses, setUpcomingClasses] = useState([
    {
      id: 101,
      title: 'Live Trading Session: Intraday Strategies',
      instructor: 'Rahul Sharma',
      date: '2023-09-25T10:00:00',
      duration: '2 hours',
      course: 'Technical Analysis Masterclass'
    },
    {
      id: 102,
      title: 'Q&A: Options Strategies for Volatile Markets',
      instructor: 'Vikram Mehta',
      date: '2023-09-27T15:00:00',
      duration: '1 hour',
      course: 'Options Trading Strategies'
    }
  ]);
  
  const [certificates, setCertificates] = useState([
    {
      id: 201,
      title: 'Introduction to Stock Market',
      issueDate: '2023-08-20T00:00:00',
      instructor: 'Rahul Sharma'
    },
    {
      id: 202,
      title: 'Options Trading Strategies',
      issueDate: '2023-09-12T00:00:00',
      instructor: 'Vikram Mehta'
    }
  ]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Student Dashboard | TradeShiksha</title>
        <meta name="description" content="Manage your courses and track your progress" />
      </Head>

      <main className={styles.main}>
        <div className={styles.dashboardHeader}>
          <div className={styles.userWelcome}>
            <div className={styles.userAvatar}>
              <img src={user.avatar} alt={user.name} />
            </div>
            <div className={styles.welcomeText}>
              <h1>Welcome back, {user.name}!</h1>
              <p>Continue your learning journey today</p>
            </div>
          </div>
          
          <div className={styles.statsCards}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{user.enrolledCourses}</div>
              <div className={styles.statLabel}>Enrolled Courses</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{user.completedCourses}</div>
              <div className={styles.statLabel}>Completed Courses</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{user.certificatesEarned}</div>
              <div className={styles.statLabel}>Certificates Earned</div>
            </div>
          </div>
        </div>
        
        <div className={styles.dashboardContent}>
          <div className={styles.contentSection}>
            <div className={styles.sectionHeader}>
              <h2>My Courses</h2>
              <Link href="/courses" className={styles.viewAllLink}>Browse More Courses</Link>
            </div>
            
            <div className={styles.courseGrid}>
              {enrolledCourses.map(course => (
                <Link href={`/courses/${course.id}`} key={course.id}>
                  <div className={styles.courseCard}>
                    <div className={styles.courseImage}>
                      <img src={course.thumbnail} alt={course.title} />
                      {course.completed && <div className={styles.completedBadge}>Completed</div>}
                    </div>
                    <div className={styles.courseContent}>
                      <h3>{course.title}</h3>
                      <p className={styles.instructor}>By {course.instructor}</p>
                      
                      <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill} 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className={styles.progressText}>{course.progress}% complete</span>
                      </div>
                      
                      <div className={styles.lastAccessed}>
                        Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                      </div>
                      
                      <button className={styles.continueButton}>
                        {course.completed ? 'Review Course' : 'Continue Learning'}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className={styles.sidebarSections}>
            <div className={styles.sidebarSection}>
              <h2>Upcoming Live Classes</h2>
              
              {upcomingClasses.length > 0 ? (
                <div className={styles.classesList}>
                  {upcomingClasses.map(cls => (
                    <div key={cls.id} className={styles.classCard}>
                      <div className={styles.classInfo}>
                        <h3>{cls.title}</h3>
                        <p className={styles.classInstructor}>By {cls.instructor}</p>
                        <p className={styles.classCourse}>From: {cls.course}</p>
                        <div className={styles.classDetails}>
                          <span className={styles.classDate}>
                            {new Date(cls.date).toLocaleDateString()} at {new Date(cls.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className={styles.classDuration}>{cls.duration}</span>
                        </div>
                      </div>
                      <button className={styles.joinButton}>Join Class</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noClasses}>No upcoming classes scheduled</p>
              )}
            </div>
            
            <div className={styles.sidebarSection}>
              <h2>My Certificates</h2>
              
              {certificates.length > 0 ? (
                <div className={styles.certificatesList}>
                  {certificates.map(cert => (
                    <div key={cert.id} className={styles.certificateCard}>
                      <div className={styles.certificateIcon}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#0070f3" strokeWidth="2"/>
                          <path d="M12 15V23M12 23L16 19M12 23L8 19" stroke="#0070f3" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className={styles.certificateInfo}>
                        <h3>{cert.title}</h3>
                        <p>Instructor: {cert.instructor}</p>
                        <p>Issued on: {new Date(cert.issueDate).toLocaleDateString()}</p>
                      </div>
                      <button className={styles.downloadButton}>Download</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noCertificates}>Complete courses to earn certificates</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}