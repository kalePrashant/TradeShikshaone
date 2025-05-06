import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/StudentDashboard.module.css';

export default function StudentDashboard() {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('myCourses');
  
  // This would come from an API in a real application
  const enrolledCourses = [
    {
      id: 1,
      title: 'Technical Analysis Masterclass',
      instructor: 'Priya Patel',
      thumbnail: '/images/courses/technical-analysis.jpg',
      progress: 45,
      lastAccessed: '2023-10-05T14:30:00',
      nextLesson: {
        title: 'Support and Resistance Levels',
        duration: '38:15'
      }
    },
    {
      id: 2,
      title: 'Options Trading Strategies',
      instructor: 'Rahul Sharma',
      thumbnail: '/images/courses/options-trading.jpg',
      progress: 20,
      lastAccessed: '2023-10-02T09:15:00',
      nextLesson: {
        title: 'Understanding Option Greeks',
        duration: '42:30'
      }
    },
    {
      id: 3,
      title: 'Fundamental Analysis for Beginners',
      instructor: 'Anjali Desai',
      thumbnail: '/images/courses/fundamental-analysis.jpg',
      progress: 75,
      lastAccessed: '2023-10-04T18:45:00',
      nextLesson: {
        title: 'Analyzing Financial Statements',
        duration: '55:20'
      }
    }
  ];
  
  const upcomingClasses = [
    {
      id: 1,
      title: 'Live Q&A Session: Technical Analysis',
      instructor: 'Priya Patel',
      date: '2023-10-12T18:00:00',
      duration: '60 mins',
      courseId: 1
    },
    {
      id: 2,
      title: 'Options Trading Workshop',
      instructor: 'Rahul Sharma',
      date: '2023-10-15T11:00:00',
      duration: '90 mins',
      courseId: 2
    }
  ];
  
  const wishlist = [
    {
      id: 4,
      title: 'Intraday Trading Strategies',
      instructor: 'Vikram Mehta',
      thumbnail: '/images/courses/intraday-trading.jpg',
      price: 3999,
      discountPrice: 2499,
      rating: 4.7,
      studentsEnrolled: 1250
    },
    {
      id: 5,
      title: 'Algorithmic Trading with Python',
      instructor: 'Arjun Reddy',
      thumbnail: '/images/courses/algo-trading.jpg',
      price: 5999,
      discountPrice: 4499,
      rating: 4.8,
      studentsEnrolled: 850
    }
  ];
  
  const certificates = [
    {
      id: 1,
      courseTitle: 'Candlestick Patterns Mastery',
      issueDate: '2023-09-15T10:30:00',
      instructor: 'Deepak Gupta'
    }
  ];
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-IN', options);
  };
  
  const calculateTimeLeft = (dateString) => {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate - now;
    
    if (diffTime <= 0) return 'Started';
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} left`;
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} left`;
    }
  };

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <Head>
          <title>Student Dashboard | TradeShiksha</title>
          <meta name="description" content="Manage your courses and learning journey" />
        </Head>

        <div className={styles.dashboardHeader}>
          <div className={styles.dashboardHeaderContent}>
            <h1>My Learning Dashboard</h1>
            <p>Track your progress and manage your learning journey</p>
          </div>
        </div>
        
        <div className={styles.dashboardContent}>
          <div className={styles.dashboardSidebar}>
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>
                <span>RS</span>
              </div>
              <div className={styles.userInfo}>
                <h3>Rajesh Singh</h3>
                <p>rajesh.singh@example.com</p>
              </div>
            </div>
            
            <nav className={styles.dashboardNav}>
              <button 
                className={activeTab === 'myCourses' ? styles.activeNavItem : styles.navItem}
                onClick={() => setActiveTab('myCourses')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>My Courses</span>
              </button>
              
              <button 
                className={activeTab === 'upcomingClasses' ? styles.activeNavItem : styles.navItem}
                onClick={() => setActiveTab('upcomingClasses')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Upcoming Classes</span>
              </button>
              
              <button 
                className={activeTab === 'wishlist' ? styles.activeNavItem : styles.navItem}
                onClick={() => setActiveTab('wishlist')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Wishlist</span>
              </button>
              
              <button 
                className={activeTab === 'certificates' ? styles.activeNavItem : styles.navItem}
                onClick={() => setActiveTab('certificates')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M12 3L4 7V11C4 15.4183 7.58172 19 12 19C16.4183 19 20 15.4183 20 11V7L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Certificates</span>
              </button>
              
              <button 
                className={activeTab === 'accountSettings' ? styles.activeNavItem : styles.navItem}
                onClick={() => setActiveTab('accountSettings')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Account Settings</span>
            </button>
          </nav>
          
          <div className={styles.helpSection}>
            <h3>Need Help?</h3>
            <Link href="/support" className={styles.supportLink}>
              Contact Support
            </Link>
          </div>
        </div>
        
        <div className={styles.dashboardMain}>
          {activeTab === 'myCourses' && (
            <div className={styles.myCoursesTab}>
              <h2>My Enrolled Courses</h2>
              
              {enrolledCourses.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>No courses yet</h3>
                  <p>You haven't enrolled in any courses yet. Browse our catalog to find courses that interest you.</p>
                  <Link href="/courses" className={styles.browseCourseBtn}>
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className={styles.courseGrid}>
                  {enrolledCourses.map(course => (
                    <div key={course.id} className={styles.courseCard}>
                      <div className={styles.courseCardHeader}>
                        <img src={course.thumbnail} alt={course.title} />
                        <div className={styles.courseProgress}>
                          <div 
                            className={styles.progressBar} 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className={styles.courseCardBody}>
                        <h3 className={styles.courseTitle}>
                          <Link href={`/courses/${course.id}`}>{course.title}</Link>
                        </h3>
                        <p className={styles.instructorName}>by {course.instructor}</p>
                        
                        <div className={styles.courseStats}>
                          <div className={styles.progressStat}>
                            <span className={styles.progressValue}>{course.progress}%</span>
                            <span className={styles.progressLabel}>Complete</span>
                          </div>
                          <div className={styles.lastAccessedStat}>
                            <span className={styles.lastAccessedValue}>{formatDate(course.lastAccessed)}</span>
                            <span className={styles.lastAccessedLabel}>Last accessed</span>
                          </div>
                        </div>
                        
                        <div className={styles.nextLesson}>
                          <h4>Continue Learning</h4>
                          <div className={styles.nextLessonInfo}>
                            <span className={styles.lessonTitle}>{course.nextLesson.title}</span>
                            <span className={styles.lessonDuration}>{course.nextLesson.duration}</span>
                          </div>
                        </div>
                        
                        <Link href={`/learn/${course.id}`} className={styles.continueBtn}>
                          Continue Learning
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'upcomingClasses' && (
            <div className={styles.upcomingClassesTab}>
              <h2>Upcoming Live Classes</h2>
              
              {upcomingClasses.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>No upcoming classes</h3>
                  <p>You don't have any upcoming live classes scheduled. Check back later or enroll in courses with live sessions.</p>
                </div>
              ) : (
                <div className={styles.classesList}>
                  {upcomingClasses.map(liveClass => (
                    <div key={liveClass.id} className={styles.classCard}>
                      <div className={styles.classInfo}>
                        <div className={styles.classDateTime}>
                          <div className={styles.classDate}>
                            {formatDate(liveClass.date)}
                          </div>
                          <div className={styles.classTime}>
                            {formatTime(liveClass.date)}
                          </div>
                        </div>
                        
                        <div className={styles.classDetails}>
                          <h3 className={styles.classTitle}>{liveClass.title}</h3>
                          <p className={styles.classInstructor}>with {liveClass.instructor}</p>
                          <div className={styles.classMeta}>
                            <span className={styles.classDuration}>{liveClass.duration}</span>
                            <span className={styles.classTimeLeft}>{calculateTimeLeft(liveClass.date)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.classActions}>
                        <Link href={`/live/${liveClass.id}`} className={styles.joinClassBtn}>
                          Join Class
                        </Link>
                        <Link href={`/courses/${liveClass.courseId}`} className={styles.viewCourseBtn}>
                          View Course
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'wishlist' && (
            <div className={styles.wishlistTab}>
              <h2>My Wishlist</h2>
              
              {wishlist.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Your wishlist is empty</h3>
                  <p>Save courses you're interested in by adding them to your wishlist.</p>
                  <Link href="/courses" className={styles.browseCourseBtn}>
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className={styles.wishlistGrid}>
                  {wishlist.map(course => (
                    <div key={course.id} className={styles.wishlistCard}>
                      <div className={styles.wishlistCardHeader}>
                        <img src={course.thumbnail} alt={course.title} />
                        <button className={styles.removeWishlistBtn}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className={styles.wishlistCardBody}>
                        <h3 className={styles.courseTitle}>
                          <Link href={`/courses/${course.id}`}>{course.title}</Link>
                        </h3>
                        <p className={styles.instructorName}>by {course.instructor}</p>
                        
                        <div className={styles.courseRating}>
                          <span className={styles.ratingValue}>★ {course.rating}</span>
                          <span className={styles.studentsCount}>({course.studentsEnrolled.toLocaleString()} students)</span>
                        </div>
                        
                        <div className={styles.priceSection}>
                          <span className={styles.discountPrice}>₹{course.discountPrice}</span>
                          <span className={styles.originalPrice}>₹{course.price}</span>
                        </div>
                        
                        <div className={styles.wishlistActions}>
                          <button className={styles.addToCartBtn}>Add to Cart</button>
                          <Link href={`/checkout?course=${course.id}`} className={styles.buyNowBtn}>
                            Buy Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'certificates' && (
            <div className={styles.certificatesTab}>
              <h2>My Certificates</h2>
              
              {certificates.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M12 3L4 7V11C4 15.4183 7.58172 19 12 19C16.4183 19 20 15.4183 20 11V7L12 3Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>No certificates yet</h3>
                  <p>Complete a course to earn your first certificate.</p>
                  <Link href="/courses" className={styles.browseCourseBtn}>
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className={styles.certificatesList}>
                  {certificates.map(certificate => (
                    <div key={certificate.id} className={styles.certificateCard}>
                      <div className={styles.certificateIcon}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10M12 3L4 7V11C4 15.4183 7.58172 19 12 19C16.4183 19 20 15.4183 20 11V7L12 3Z" stroke="#0070f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      
                      <div className={styles.certificateInfo}>
                        <h3 className={styles.certificateTitle}>{certificate.courseTitle}</h3>
                        <p className={styles.certificateInstructor}>Instructor: {certificate.instructor}</p>
                        <p className={styles.certificateDate}>Issued on {formatDate(certificate.issueDate)}</p>
                      </div>
                      
                      <div className={styles.certificateActions}>
                        <button className={styles.downloadBtn}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Download</span>
                        </button>
                        <button className={styles.shareBtn}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'accountSettings' && (
            <div className={styles.accountSettingsTab}>
              <h2>Account Settings</h2>
              
              <div className={styles.settingsSection}>
                <h3>Profile Information</h3>
                <form className={styles.profileForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="fullName">Full Name</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        defaultValue="Rajesh Singh" 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        defaultValue="rajesh.singh@example.com" 
                        disabled 
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        defaultValue="+91 9876543210" 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="location">Location</label>
                      <input 
                        type="text" 
                        id="location" 
                        name="location" 
                        defaultValue="Mumbai, India" 
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="bio">About Me</label>
                    <textarea 
                      id="bio" 
                      name="bio" 
                      rows="4" 
                      defaultValue="I'm a stock market enthusiast looking to improve my trading skills and knowledge."
                    ></textarea>
                  </div>
                  
                  <button type="submit" className={styles.saveProfileBtn}>
                    Save Changes
                  </button>
                </form>
              </div>
              
              <div className={styles.settingsSection}>
                <h3>Password</h3>
                <form className={styles.passwordForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="currentPassword">Current Password</label>
                    <input 
                      type="password" 
                      id="currentPassword" 
                      name="currentPassword" 
                    />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="newPassword">New Password</label>
                      <input 
                        type="password" 
                        id="newPassword" 
                        name="newPassword" 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="confirmPassword">Confirm New Password</label>
                      <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className={styles.changePasswordBtn}>
                    Change Password
                  </button>
                </form>
              </div>
              
              <div className={styles.settingsSection}>
                <h3>Notification Preferences</h3>
                <div className={styles.notificationSettings}>
                  <div className={styles.notificationOption}>
                    <div className={styles.notificationInfo}>
                      <h4>Course Updates</h4>
                      <p>Get notified when your enrolled courses are updated</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  
                  <div className={styles.notificationOption}>
                    <div className={styles.notificationInfo}>
                      <h4>Live Class Reminders</h4>
                      <p>Receive reminders before your scheduled live classes</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  
                  <div className={styles.notificationOption}>
                    <div className={styles.notificationInfo}>
                      <h4>Promotional Emails</h4>
                      <p>Receive emails about discounts and new courses</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  
                  <div className={styles.notificationOption}>
                    <div className={styles.notificationInfo}>
                      <h4>Learning Reminders</h4>
                      <p>Get reminders to continue your learning journey</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className={styles.settingsSection}>
                <h3>Account Management</h3>
                <div className={styles.accountActions}>
                  <button className={styles.downloadDataBtn}>
                    Download My Data
                  </button>
                  <button className={styles.deleteAccountBtn}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}