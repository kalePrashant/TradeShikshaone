import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/CourseDetail.module.css';

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState([0]);
  
  // This would come from an API in a real application
  const [course, setCourse] = useState({
    id: 2,
    title: 'Technical Analysis Masterclass',
    subtitle: 'Learn to analyze price charts and make profitable trading decisions',
    description: `This comprehensive course will teach you how to analyze price charts using technical analysis. You'll learn to identify trends, support and resistance levels, chart patterns, and use various technical indicators to make informed trading decisions.

    Whether you're a beginner or have some experience in trading, this course will provide you with a structured approach to technical analysis that you can apply to stocks, forex, commodities, or cryptocurrencies.`,
    price: 4999,
    discountPrice: 3499,
    rating: 4.9,
    studentsEnrolled: 980,
    lastUpdated: '2023-09-05T14:45:00',
    language: 'Hindi',
    level: 'Intermediate',
    duration: '12 hours',
    thumbnail: '/images/courses/technical-analysis.jpg',
    instructor: {
      id: 101,
      name: 'Priya Patel',
      expertise: 'Technical Analysis, Swing Trading',
      bio: 'Professional trader with 10+ years of experience in Indian stock markets',
      avatar: '/images/instructors/priya-patel.jpg'
    },
    whatYouWillLearn: [
      'Understand the core principles of technical analysis',
      'Identify trends, support and resistance levels',
      'Recognize and trade chart patterns like head and shoulders, double tops, etc.',
      'Use technical indicators like Moving Averages, RSI, MACD, etc.',
      'Develop a trading plan based on technical analysis',
      'Apply risk management techniques to protect your capital',
      'Analyze real-world charts and make trading decisions',
      'Avoid common mistakes made by technical analysts'
    ],
    requirements: [
      'Basic understanding of stock markets and trading',
      'No prior knowledge of technical analysis is required',
      'A computer or laptop with internet connection',
      'Willingness to practice chart analysis regularly'
    ],
    targetAudience: [
      'Beginner traders who want to learn technical analysis',
      'Experienced traders looking to refine their technical analysis skills',
      'Investors who want to time their entries and exits better',
      'Anyone interested in understanding price movements in financial markets'
    ],
    curriculum: [
      {
        title: 'Introduction to Technical Analysis',
        lessons: [
          { title: 'What is Technical Analysis?', duration: '15:30', preview: true },
          { title: 'The Philosophy Behind Technical Analysis', duration: '20:45', preview: false },
          { title: 'Technical vs Fundamental Analysis', duration: '18:20', preview: true },
          { title: 'Setting Up Your Charting Platform', duration: '25:10', preview: false }
        ]
      },
      {
        title: 'Chart Types and Timeframes',
        lessons: [
          { title: 'Line Charts, Bar Charts, and Candlestick Charts', duration: '30:15', preview: true },
          { title: 'Understanding Candlestick Patterns', duration: '45:30', preview: false },
          { title: 'Choosing the Right Timeframe', duration: '22:40', preview: false },
          { title: 'Multiple Timeframe Analysis', duration: '35:15', preview: false }
        ]
      },
      {
        title: 'Trend Analysis',
        lessons: [
          { title: 'Identifying Market Trends', duration: '28:45', preview: false },
          { title: 'Trendlines and Channels', duration: '32:20', preview: false },
          { title: 'Moving Averages', duration: '40:10', preview: false },
          { title: 'Trading with the Trend', duration: '35:30', preview: false }
        ]
      },
      {
        title: 'Support and Resistance',
        lessons: [
          { title: 'Identifying Support and Resistance Levels', duration: '38:15', preview: false },
          { title: 'Dynamic Support and Resistance', duration: '25:40', preview: false },
          { title: 'Trading Bounces and Breakouts', duration: '42:30', preview: false },
          { title: 'Fibonacci Retracements', duration: '50:20', preview: false }
        ]
      },
      {
        title: 'Chart Patterns',
        lessons: [
          { title: 'Continuation Patterns', duration: '45:10', preview: false },
          { title: 'Reversal Patterns', duration: '48:25', preview: false },
          { title: 'Head and Shoulders Pattern', duration: '30:15', preview: false },
          { title: 'Double Tops and Double Bottoms', duration: '28:40', preview: false },
          { title: 'Triangle Patterns', duration: '32:50', preview: false }
        ]
      },
      {
        title: 'Technical Indicators',
        lessons: [
          { title: 'Momentum Indicators (RSI, Stochastic)', duration: '55:20', preview: false },
          { title: 'Trend Indicators (MACD, ADX)', duration: '50:15', preview: false },
          { title: 'Volume Indicators', duration: '35:40', preview: false },
          { title: 'Combining Multiple Indicators', duration: '45:30', preview: false }
        ]
      },
      {
        title: 'Trading Strategies',
        lessons: [
          { title: 'Developing a Trading Plan', duration: '40:25', preview: false },
          { title: 'Entry and Exit Strategies', duration: '48:10', preview: false },
          { title: 'Risk Management Techniques', duration: '38:30', preview: false },
          { title: 'Position Sizing', duration: '30:15', preview: false },
          { title: 'Backtesting Your Strategy', duration: '55:40', preview: false }
        ]
      },
      {
        title: 'Real-World Applications',
        lessons: [
          { title: 'Case Studies: Successful Trades', duration: '60:20', preview: false },
          { title: 'Live Chart Analysis', duration: '75:30', preview: false },
          { title: 'Common Mistakes and How to Avoid Them', duration: '35:45', preview: false },
          { title: 'Continuous Learning and Improvement', duration: '25:10', preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Amit Kumar',
        rating: 5,
        date: '2023-09-18T14:30:00',
        comment: 'Excellent course! Priya explains technical analysis concepts very clearly with practical examples. I have already started applying these techniques in my trading and seeing positive results.'
      },
      {
        id: 2,
        name: 'Sneha Patel',
        rating: 5,
        date: '2023-09-15T09:45:00',
        comment: 'The best investment course I\'ve ever taken. Priya\'s teaching style makes complex concepts easy to understand. I\'ve already recovered my course fee multiple times over with the strategies I learned!'
      },
      {
        id: 3,
        name: 'Rajesh Verma',
        rating: 4,
        date: '2023-09-10T11:20:00',
        comment: 'Excellent content and presentation. The only reason I\'m not giving 5 stars is that I wish there were more practice exercises included. Otherwise, it\'s a fantastic course for learning technical analysis.'
      },
      {
        id: 4,
        name: 'Neha Singh',
        rating: 5,
        date: '2023-09-05T16:40:00',
        comment: 'As someone who had no prior knowledge of technical analysis, this course was perfect for me. The step-by-step approach and real-world examples made learning enjoyable and practical.'
      },
      {
        id: 5,
        name: 'Vikram Mehta',
        rating: 5,
        date: '2023-08-28T10:15:00',
        comment: 'I\'ve been trading for years but never had a structured approach to technical analysis. This course has completely transformed how I analyze charts and make trading decisions. Highly recommended!'
      }
    ]
  });
  
  const toggleSection = (index) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter(i => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };
  
  const calculateTotalLessons = () => {
    return course.curriculum.reduce((total, section) => total + section.lessons.length, 0);
  };
  
  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    
    course.curriculum.forEach(section => {
      section.lessons.forEach(lesson => {
        const [minutes, seconds] = lesson.duration.split(':').map(Number);
        totalMinutes += minutes + (seconds / 60);
      });
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{course.title} | TradeShiksha</title>
        <meta name="description" content={course.subtitle} />
      </Head>

      <div className={styles.courseHeader}>
        <div className={styles.courseHeaderContent}>
          <div className={styles.breadcrumbs}>
            <Link href="/courses">Courses</Link> / <span>{course.title}</span>
          </div>
          
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <p className={styles.courseSubtitle}>{course.subtitle}</p>
          
          <div className={styles.courseStats}>
            <span className={styles.rating}>★ {course.rating} Rating</span>
            <span className={styles.students}>{course.studentsEnrolled.toLocaleString()} students</span>
            <span className={styles.updated}>Last updated: {new Date(course.lastUpdated).toLocaleDateString()}</span>
          </div>
          
          <div className={styles.instructorPreview}>
            <img src={course.instructor.avatar} alt={course.instructor.name} />
            <span>Created by <Link href={`/instructors/${course.instructor.id}`}>{course.instructor.name}</Link></span>
          </div>
        </div>
      </div>
      
      <div className={styles.courseContent}>
        <div className={styles.mainContent}>
          <div className={styles.contentTabs}>
            <button 
              className={activeTab === 'overview' ? styles.activeTab : ''}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={activeTab === 'curriculum' ? styles.activeTab : ''}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button 
              className={activeTab === 'instructor' ? styles.activeTab : ''}
              onClick={() => setActiveTab('instructor')}
            >
              Instructor
            </button>
            <button 
              className={activeTab === 'reviews' ? styles.activeTab : ''}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
          
          {activeTab === 'overview' && (
            <div className={styles.overviewTab}>
              <div className={styles.courseDescription}>
                <h2>About This Course</h2>
                {course.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className={styles.learningPoints}>
                <h2>What You Will Learn</h2>
                <ul>
                  {course.whatYouWillLearn.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.requirements}>
                <h2>Requirements</h2>
                <ul>
                  {course.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.targetAudience}>
                <h2>Who This Course is For</h2>
                <ul>
                  {course.targetAudience.map((audience, index) => (
                    <li key={index}>{audience}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'curriculum' && (
            <div className={styles.curriculumTab}>
              <div className={styles.curriculumHeader}>
                <h2>Course Content</h2>
                <div className={styles.curriculumStats}>
                  <span>{course.curriculum.length} sections</span>
                  <span>{calculateTotalLessons()} lectures</span>
                  <span>{calculateTotalDuration()} total length</span>
                </div>
              </div>
              
              <div className={styles.curriculumSections}>
                {course.curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} className={styles.curriculumSection}>
                    <div 
                      className={styles.sectionHeader}
                      onClick={() => toggleSection(sectionIndex)}
                    >
                      <div className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>
                          {expandedSections.includes(sectionIndex) ? '−' : '+'}
                        </span>
                        <h3>{section.title}</h3>
                      </div>
                      <div className={styles.sectionInfo}>
                        <span>{section.lessons.length} lectures</span>
                      </div>
                    </div>
                    
                    {expandedSections.includes(sectionIndex) && (
                      <div className={styles.sectionLessons}>
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className={styles.lesson}>
                            <div className={styles.lessonInfo}>
                              <span className={styles.lessonIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
                                </svg>
                              </span>
                              <span className={styles.lessonTitle}>{lesson.title}</span>
                            </div>
                            <div className={styles.lessonMeta}>
                              {lesson.preview && (
                                <span className={styles.previewBadge}>Preview</span>
                              )}
                              <span className={styles.lessonDuration}>{lesson.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'instructor' && (
            <div className={styles.instructorTab}>
              <div className={styles.instructorProfile}>
                <div className={styles.instructorAvatar}>
                  <img src={course.instructor.avatar} alt={course.instructor.name} />
                </div>
                <div className={styles.instructorInfo}>
                  <h2>{course.instructor.name}</h2>
                  <p className={styles.instructorExpertise}>{course.instructor.expertise}</p>
                  <div className={styles.instructorStats}>
                    <div className={styles.instructorStat}>
                      <span className={styles.statValue}>4.8</span>
                      <span className={styles.statLabel}>Instructor Rating</span>
                    </div>
                    <div className={styles.instructorStat}>
                      <span className={styles.statValue}>2,500+</span>
                      <span className={styles.statLabel}>Students</span>
                    </div>
                    <div className={styles.instructorStat}>
                      <span className={styles.statValue}>8</span>
                      <span className={styles.statLabel}>Courses</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.instructorBio}>
                <h3>About the Instructor</h3>
                <p>{course.instructor.bio}</p>
                <p>With a passion for teaching and a deep understanding of technical analysis, Priya has helped thousands of students develop profitable trading strategies. Her practical approach focuses on real-world applications rather than theoretical concepts.</p>
                <p>Before becoming a full-time trader and educator, Priya worked in the financial industry for several years, giving her unique insights into market dynamics. She specializes in swing trading and technical analysis, with a particular focus on Indian equity markets.</p>
              </div>
              
              <Link href={`/instructors/${course.instructor.id}`} className={styles.viewProfileButton}>
                View Full Profile
              </Link>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className={styles.reviewsTab}>
              <div className={styles.reviewsHeader}>
                <h2>Student Reviews</h2>
                <div className={styles.overallRating}>
                  <div className={styles.ratingNumber}>
                    <span>{course.rating}</span>
                    <div className={styles.ratingStars}>
                      {'★'.repeat(Math.floor(course.rating))}
                      {course.rating % 1 !== 0 ? '½' : ''}
                      {'☆'.repeat(5 - Math.ceil(course.rating))}
                    </div>
                    <span className={styles.ratingCount}>Course Rating</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.reviewsList}>
                {course.reviews.map(review => (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerInfo}>
                        <div className={styles.reviewerInitial}>
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4>{review.name}</h4>
                          <span className={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className={styles.reviewRating}>
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.courseCard}>
          <div className={styles.coursePreview}>
            <img src={course.thumbnail} alt={course.title} />
            <button className={styles.previewButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
                <path d="M10 8L16 12L10 16V8Z" fill="white"/>
              </svg>
              <span>Preview this course</span>
            </button>
          </div>
          
          <div className={styles.cardContent}>
            <div className={styles.priceSection}>
              <span className={styles.discountPrice}>₹{course.discountPrice}</span>
              <span className={styles.originalPrice}>₹{course.price}</span>
              <span className={styles.discountPercentage}>
                {Math.round((1 - course.discountPrice / course.price) * 100)}% off
              </span>
            </div>
            
            <button className={styles.enrollButton}>Enroll Now</button>
            <p className={styles.moneyBackGuarantee}>30-Day Money-Back Guarantee</p>
            
            <div className={styles.courseIncludes}>
              <h3>This course includes:</h3>
              <ul>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 9L15 12L10 15V9Z" fill="currentColor"/>
                  </svg>
                  <span>{calculateTotalLessons()} on-demand videos</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12H9M15 12H22" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{calculateTotalDuration()} total duration</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 14C19 16.7614 15.866 19 12 19C8.13401 19 5 16.7614 5 14M19 14C19 11.2386 15.866 9 12 9C8.13401 9 5 11.2386 5 14M19 14V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V14M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V8M3 5V8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Access on mobile and desktop</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M12 3L4 7V11C4 15.4183 7.58172 19 12 19C16.4183 19 20 15.4183 20 11V7L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Certificate of completion</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Lifetime access</span>
                </li>
              </ul>
            </div>
            
            <div className={styles.shareButtons}>
              <button className={styles.shareButton}>Share</button>
              <button className={styles.giftButton}>Gift this course</button>
              <button className={styles.applyButton}>Apply Coupon</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}