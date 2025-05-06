import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../styles/InstructorDashboard.module.css';

export default function InstructorDashboard() {
  // This would come from an API in a real application
  const [instructor, setInstructor] = useState({
    id: 101,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    avatar: '/images/instructors/rahul-sharma.jpg',
    totalCourses: 8,
    totalStudents: 5200,
    totalRevenue: 1250000,
    averageRating: 4.8
  });
  
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to Stock Market',
      students: 1250,
      rating: 4.8,
      revenue: 250000,
      status: 'published',
      lastUpdated: '2023-08-10T10:30:00',
      thumbnail: '/images/courses/stock-intro.jpg'
    },
    {
      id: 2,
      title: 'Technical Analysis Masterclass',
      students: 980,
      rating: 4.9,
      revenue: 343000,
      status: 'published',
      lastUpdated: '2023-09-05T14:45:00',
      thumbnail: '/images/courses/technical-analysis.jpg'
    },
    {
      id: 3,
      title: 'Options Trading Strategies',
      students: 750,
      rating: 4.7,
      revenue: 337500,
      status: 'published',
      lastUpdated: '2023-07-20T09:15:00',
      thumbnail: '/images/courses/options-trading.jpg'
    },
    {
      id: 4,
      title: 'Advanced Chart Patterns',
      students: 0,
      rating: 0,
      revenue: 0,
      status: 'draft',
      lastUpdated: '2023-09-18T16:20:00',
      thumbnail: '/images/courses/chart-patterns.jpg'
    }
  ]);
  
  const [upcomingClasses, setUpcomingClasses] = useState([
    {
      id: 101,
      title: 'Live Trading Session: Intraday Strategies',
      date: '2023-09-25T10:00:00',
      duration: '2 hours',
      enrolledStudents: 45,
      course: 'Technical Analysis Masterclass'
    },
    {
      id: 102,
      title: 'Q&A: Introduction to Stock Markets',
      date: '2023-09-27T15:00:00',
      duration: '1 hour',
      enrolledStudents: 32,
      course: 'Introduction to Stock Market'
    }
  ]);
  
  const [recentReviews, setRecentReviews] = useState([
    {
      id: 201,
      studentName: 'Amit Kumar',
      course: 'Introduction to Stock Market',
      rating: 5,
      comment: 'Excellent course! The concepts are explained very clearly.',
      date: '2023-09-18T14:30:00'
    },
    {
      id: 202,
      studentName: 'Sneha Patel',
      course: 'Technical Analysis Masterclass',
      rating: 5,
      comment: 'The best investment course I\'ve ever taken. Rahul\'s teaching style makes complex concepts easy to understand.',
      date: '2023-09-15T09:45:00'
    },
    {
      id: 203,
      studentName: 'Rajesh Verma',
      course: 'Options Trading Strategies',
      rating: 4,
      comment: 'Excellent content and presentation. The only reason I\'m not giving 5 stars is that I wish there were more practice exercises included.',
      date: '2023-09-10T11:20:00'
    }
  ]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Instructor Dashboard | TradeShiksha</title>
        <meta name="description" content="Manage your courses and track your performance" />
      </Head>

      <main className={styles.main}>
        <div className={styles.dashboardHeader}>
          <div className={styles.instructorWelcome}>
            <div className={styles.instructorAvatar}>
              <img src={instructor.avatar} alt={instructor.name} />
            </div>
            <div className={styles.welcomeText}>
              <h1>Welcome back, {instructor.name}!</h1>
              <p>Manage your courses and track your performance</p>
            </div>
          </div>
          
          <div className={styles.statsCards}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{instructor.totalCourses}</div>
              <div className={styles.statLabel}>Total Courses</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{instructor.totalStudents.toLocaleString()}</div>
              <div className={styles.statLabel}>Total Students</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>₹{(instructor.totalRevenue / 100000).toFixed(1)}L</div>
              <div className={styles.statLabel}>Total Revenue</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>★ {instructor.averageRating}</div>
              <div className={styles.statLabel}>Average Rating</div>
            </div>
          </div>
        </div>
        
        <div className={styles.dashboardContent}>
          <div className={styles.contentSection}>
            <div className={styles.sectionHeader}>
              <h2>My Courses</h2>
              <Link href="/dashboard/instructor/create-course" className={styles.createCourseBtn}>
                Create New Course
              </Link>
            </div>
            
            <div className={styles.courseGrid}>
              {courses.map(course => (
                <div key={course.id} className={styles.courseCard}>
                  <div className={styles.courseImage}>
                    <img src={course.thumbnail} alt={course.title} />
                    <div className={`${styles.statusBadge} ${styles[course.status]}`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </div>
                  </div>
                  <div className={styles.courseContent}>
                    <h3>{course.title}</h3>
                    
                    <div className={styles.courseStats}>
                      <div className={styles.courseStat}>
                        <span className={styles.statValue}>{course.students}</span>
                        <span className={styles.statLabel}>Students</span>
                      </div>
                      <div className={styles.courseStat}>
                        <span className={styles.statValue}>
                          {course.rating > 0 ? `★ ${course.rating}` : 'N/A'}
                        </span>
                        <span className={styles.statLabel}>Rating</span>
                      </div>
                      <div className={styles.courseStat}>
                        <span className={styles.statValue}>
                          ₹{(course.revenue / 100000).toFixed(1)}L
                        </span>
                        <span className={styles.statLabel}>Revenue</span>
                      </div>
                    </div>
                    
                    <div className={styles.lastUpdated}>
                      Last updated: {new Date(course.lastUpdated).toLocaleDateString()}
                    </div>
                    
                    <div className={styles.courseActions}>
                      <Link href={`/dashboard/instructor/courses/${course.id}`}>
                        <button className={styles.editButton}>Edit Course</button>
                      </Link>
                      <Link href={`/dashboard/instructor/courses/${course.id}/analytics`}>
                        <button className={styles.analyticsButton}>Analytics</button>
                      </Link>
                    </div>
                  </div>
                </div>
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
                        <p className={styles.classCourse}>From: {cls.course}</p>
                        <div className={styles.classDetails}>
                          <span className={styles.classDate}>
                            {new Date(cls.date).toLocaleDateString()} at {new Date(cls.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className={styles.classDuration}>{cls.duration}</span>
                        </div>
                        <p className={styles.enrolledStudents}>{cls.enrolledStudents} students enrolled</p>
                      </div>
                      <button className={styles.startButton}>Start Class</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noClasses}>No upcoming classes scheduled</p>
              )}
              
              <div className={styles.scheduleButtonContainer}>
                <button className={styles.scheduleButton}>Schedule New Class</button>
              </div>
            </div>
            
            <div className={styles.sidebarSection}>
              <h2>Recent Reviews</h2>
              
              {recentReviews.length > 0 ? (
                <div className={styles.reviewsList}>
                  {recentReviews.map(review => (
                    <div key={review.id} className={styles.reviewCard}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewerInfo}>
                          <h3>{review.studentName}</h3>
                          <p className={styles.reviewCourse}>{review.course}</p>
                        </div>
                        <div className={styles.reviewRating}>
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                      </div>
                      <p className={styles.reviewComment}>{review.comment}</p>
                      <p className={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noReviews}>No reviews yet</p>
              )}
              
              <Link href="/dashboard/instructor/reviews" className={styles.viewAllLink}>
                View All Reviews
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}