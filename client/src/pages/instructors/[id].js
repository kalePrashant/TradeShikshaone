import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/InstructorDetail.module.css';

export default function InstructorDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  // This would come from an API in a real application
  const [instructor, setInstructor] = useState({
    id: 101,
    name: 'Rahul Sharma',
    expertise: 'Technical Analysis, Options Trading',
    experience: '15+ years',
    courses: 8,
    students: 5200,
    rating: 4.8,
    bio: 'Professional trader with extensive experience in Indian stock markets. Specializes in technical analysis and options strategies.',
    longBio: `Rahul Sharma is a seasoned trader and financial educator with over 15 years of experience in the Indian stock markets. After completing his MBA in Finance from a top-tier institution, Rahul worked with leading financial institutions before becoming an independent trader and educator.

    His trading journey began in 2005, and over the years, he has developed a unique approach that combines technical analysis with options strategies to generate consistent returns. Rahul's teaching philosophy focuses on practical, real-world applications rather than theoretical concepts.

    As an instructor at TradeShiksha, Rahul has helped thousands of students transform their trading approach and achieve financial independence. His courses are known for their clarity, depth, and actionable insights.`,
    avatar: '/images/instructors/rahul-sharma.jpg',
    socialMedia: {
      twitter: 'https://twitter.com/rahulsharma',
      linkedin: 'https://linkedin.com/in/rahulsharma',
      youtube: 'https://youtube.com/c/rahulsharma'
    },
    achievements: [
      'Ranked among top 5% of traders on a leading trading platform',
      'Featured in Business Today magazine as an expert on options trading',
      'Author of "Technical Analysis Simplified" e-book',
      'Conducted over 200 live trading workshops across India'
    ],
    teachingStyle: [
      'Practical, hands-on approach with real market examples',
      'Focus on risk management and psychology',
      'Regular live trading sessions',
      'Personalized feedback on trading strategies'
    ],
    courses: [
      {
        id: 1,
        title: 'Introduction to Stock Market',
        students: 1250,
        rating: 4.8,
        price: 2999,
        discountPrice: 1999,
        thumbnail: '/images/courses/stock-intro.jpg'
      },
      {
        id: 2,
        title: 'Technical Analysis Masterclass',
        students: 980,
        rating: 4.9,
        price: 4999,
        discountPrice: 3499,
        thumbnail: '/images/courses/technical-analysis.jpg'
      },
      {
        id: 3,
        title: 'Options Trading Strategies',
        students: 750,
        rating: 4.7,
        price: 5999,
        discountPrice: 4499,
        thumbnail: '/images/courses/options-trading.jpg'
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Amit Kumar',
        rating: 5,
        date: 'August 15, 2023',
        comment: 'Rahul sir\'s technical analysis course completely changed my approach to trading. His explanations are clear and the strategies actually work in real market conditions.'
      },
      {
        id: 2,
        name: 'Sneha Patel',
        rating: 5,
        date: 'July 28, 2023',
        comment: 'The best investment course I\'ve ever taken. Rahul\'s teaching style makes complex concepts easy to understand. I\'ve already recovered my course fee multiple times over!'
      },
      {
        id: 3,
        name: 'Rajesh Verma',
        rating: 4,
        date: 'June 10, 2023',
        comment: 'Excellent content and presentation. The only reason I\'m not giving 5 stars is that I wish there were more practice exercises included.'
      }
    ]
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>{instructor.name} | TradeShiksha Instructor</title>
        <meta name="description" content={`Learn share market trading from ${instructor.name}, expert in ${instructor.expertise}`} />
      </Head>

      <main className={styles.main}>
        <div className={styles.instructorHeader}>
          <div className={styles.instructorProfile}>
            <div className={styles.instructorAvatar}>
              <img src={instructor.avatar} alt={instructor.name} />
            </div>
            <div className={styles.instructorInfo}>
              <h1>{instructor.name}</h1>
              <p className={styles.expertise}>{instructor.expertise}</p>
              
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
              
              <div className={styles.socialLinks}>
                {Object.entries(instructor.socialMedia).map(([platform, url]) => (
                  <a href={url} target="_blank" rel="noopener noreferrer" key={platform} className={styles.socialLink}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.instructorContent}>
          <div className={styles.contentTabs}>
            <button className={styles.activeTab}>About</button>
            <button>Courses</button>
            <button>Reviews</button>
          </div>
          
          <div className={styles.aboutSection}>
            <div className={styles.bioSection}>
              <h2>About {instructor.name}</h2>
              <div className={styles.longBio}>
                {instructor.longBio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className={styles.infoSections}>
              <div className={styles.infoSection}>
                <h3>Achievements</h3>
                <ul>
                  {instructor.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.infoSection}>
                <h3>Teaching Style</h3>
                <ul>
                  {instructor.teachingStyle.map((style, index) => (
                    <li key={index}>{style}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className={styles.coursesSection}>
            <h2>Courses by {instructor.name}</h2>
            <div className={styles.courseGrid}>
              {instructor.courses.map(course => (
                <Link href={`/courses/${course.id}`} key={course.id}>
                  <div className={styles.courseCard}>
                    <div className={styles.courseImage}>
                      <img src={course.thumbnail} alt={course.title} />
                    </div>
                    <div className={styles.courseContent}>
                      <h3>{course.title}</h3>
                      <div className={styles.courseStats}>
                        <span>★ {course.rating}</span>
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                      <div className={styles.priceSection}>
                        <span className={styles.discountPrice}>₹{course.discountPrice}</span>
                        <span className={styles.originalPrice}>₹{course.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className={styles.reviewsSection}>
            <h2>Student Reviews</h2>
            <div className={styles.reviewsList}>
              {instructor.reviews.map(review => (
                <div key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerInfo}>
                      <h4>{review.name}</h4>
                      <span className={styles.reviewDate}>{review.date}</span>
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
        </div>
      </main>
    </div>
  );
}