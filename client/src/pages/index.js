import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import HeroSlideshow from '../components/HeroSlideshow';

export default function Home() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [popularCourses, setPopularCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch popular courses and testimonials
    const fetchData = async () => {
      try {
        // This would be replaced with actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const coursesData = [
          {
            id: 'c1',
            title: 'Stock Market Fundamentals',
            instructor: 'Rahul Sharma',
            rating: 4.8,
            reviews: 245,
            price: 1999,
            discountPrice: 999,
            image: '/images/courses/stock-fundamentals.jpg',
            category: 'Beginner'
          },
          {
            id: 'c2',
            title: 'Technical Analysis Masterclass',
            instructor: 'Priya Patel',
            rating: 4.9,
            reviews: 189,
            price: 2499,
            discountPrice: 1499,
            image: '/images/courses/technical-analysis.jpg',
            category: 'Intermediate'
          },
          {
            id: 'c3',
            title: 'Options Trading Strategies',
            instructor: 'Vikram Mehta',
            rating: 4.7,
            reviews: 156,
            price: 2999,
            discountPrice: 1799,
            image: '/images/courses/options-trading.jpg',
            category: 'Advanced'
          },
          {
            id: 'c4',
            title: 'Intraday Trading Techniques',
            instructor: 'Anjali Singh',
            rating: 4.6,
            reviews: 132,
            price: 1799,
            discountPrice: 999,
            image: '/images/courses/intraday-trading.jpg',
            category: 'Intermediate'
          }
        ];
        
        const testimonialsData = [
          {
            id: 't1',
            name: 'Rajesh Kumar',
            role: 'Full-time Trader',
            image: '/images/testimonials/user1.jpg',
            content: 'TradeShiksha completely transformed my trading journey. The courses are well-structured and the instructors explain complex concepts in a simple manner. I\'ve seen a significant improvement in my trading results.',
            rating: 5
          },
          {
            id: 't2',
            name: 'Sneha Gupta',
            role: 'IT Professional & Part-time Investor',
            image: '/images/testimonials/user2.jpg',
            content: 'As someone who works full-time in IT, I was looking for a platform to learn trading at my own pace. TradeShiksha provided exactly what I needed. The weekend webinars are particularly helpful.',
            rating: 4.5
          },
          {
            id: 't3',
            name: 'Arjun Reddy',
            role: 'College Student',
            image: '/images/testimonials/user3.jpg',
            content: 'I started learning about the stock market during my college days, and TradeShiksha made it so accessible. The affordable pricing and comprehensive content make it perfect for students like me.',
            rating: 5
          }
        ];
        
        setPopularCourses(coursesData);
        setTestimonials(testimonialsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>TradeShiksha - Learn Stock Market Trading & Investing</title>
        <meta name="description" content="India's premier platform for stock market education. Learn trading, investing, and financial analysis from expert traders." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Master the Stock Market with <span className={styles.highlight}>TradeShiksha</span></h1>
            <p className={styles.heroSubtitle}>
              Learn trading strategies, technical analysis, and investment techniques from India's top traders and financial experts.
            </p>
            <div className={styles.heroCta}>
              <Link href="/courses" className={styles.primaryButton}>
                Explore Courses
              </Link>
              <Link href="/about" className={styles.secondaryButton}>
                Learn More
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10,000+</span>
                <span className={styles.statLabel}>Students</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Courses</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>4.8</span>
                <span className={styles.statLabel}>Average Rating</span>
              </div>
            </div>
          </div>
          <div className={styles.heroImage}>
            {/* Removed HeroSlideshow from here */}
            <img src="/images/hero-image.jpg" alt="Trading Education" />
          </div>
          <div className={styles.slideshowContainer}>
            <HeroSlideshow />
          </div>

        </section>

        {/* Features Section */}
        {/* Features Section */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.heroTitle}>Why Choose TradeShiksha?</h2>
              <p className={styles.heroSubtitle}>Our platform offers comprehensive learning resources designed for traders of all levels</p>
            </div>
            
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Expert-Led Courses</h3>
                <p>Learn from professional traders with years of market experience and proven track records.</p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 14V17M12 14V17M16 14V17M3 21H21M3 10H21M3 7L12 3L21 7M4 10V21H20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Structured Learning Path</h3>
                <p>Follow a carefully designed curriculum that takes you from basics to advanced trading strategies.</p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 10L19.5528 7.72361C20.2177 7.39116 21 7.87465 21 8.61803V15.382C21 16.1253 20.2177 16.6088 19.5528 16.2764L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Video Lessons & Live Webinars</h3>
                <p>Access high-quality video content and participate in interactive live sessions with instructors.</p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Practical Assignments</h3>
                <p>Apply what you learn through practical exercises, paper trading, and real-world market analysis.</p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Community Support</h3>
                <p>Join a community of like-minded traders to share insights, strategies, and market opportunities.</p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12H15M12 9V15M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Lifetime Access</h3>
                <p>Once enrolled, get lifetime access to course materials and free updates as content is refreshed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className={styles.coursesSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.heroTitle1}>Popular Courses</h2>
            <p className={styles.heroSubtitle2}>Start your trading journey with our most in-demand courses</p>
            <Link href="/courses" className={styles.viewAllLink}>
              View All Courses
              <svg width="50" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          
          <div className={styles.coursesGrid}>
            {isLoading ? (
              // Loading skeleton
              Array(4).fill(0).map((_, index) => (
                <div key={index} className={`${styles.courseCard} ${styles.skeleton}`}>
                  <div className={styles.courseImageSkeleton}></div>
                  <div className={styles.courseContentSkeleton}>
                    <div className={styles.skeletonLine}></div>
                    <div className={styles.skeletonLine}></div>
                    <div className={styles.skeletonLine}></div>
                  </div>
                </div>
              ))
            ) : (
              popularCourses.map(course => (
                <Link href={`/courses/${course.id}`} key={course.id} className={styles.courseCard}>
                  <div className={styles.courseImage}>
                    <img src={course.image || '/images/course-placeholder.jpg'} alt={course.title} />
                    <div className={styles.courseCategory}>{course.category}</div>
                  </div>
                  <div className={styles.courseContent}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <p className={styles.courseInstructor}>by {course.instructor}</p>
                    <div className={styles.courseRating}>
                      <div className={styles.stars}>
                        {Array(5).fill(0).map((_, i) => (
                          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(course.rating) ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ))}
                      </div>
                      <span>{course.rating} ({course.reviews} reviews)</span>
                    </div>
                    <div className={styles.coursePrice}>
                      <span className={styles.discountPrice}>₹{course.discountPrice}</span>
                      <span className={styles.originalPrice}>₹{course.price}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          </div>
        </section>

        {/* Browse by Category Section */}
        <section className={styles.categorySectionBrowseByCategory}>
        <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleBrowseByCategory}>Browse by Category</h2>
            <p className={styles.heroSubtitle3}>
              Explore our wide range of trading and investment courses categorized by topics
            </p>
          </div>
          
          <div className={styles.categoryGridBrowseByCategory}>
            <Link href="/courses?category=stocks">
              <div className={styles.categoryCardBrowseByCategory}>
                <div className={styles.categoryImageBrowseByCategory}>
                  <img src="/images/categories/stocks.jpg" alt="Stocks" />
                </div>
                <div className={styles.categoryContentBrowseByCategory}>
                  <h3>Stocks</h3>
                  <p>Learn the fundamentals of stock market investing and trading strategies.</p>
                  <span className={styles.categoryCountBrowseByCategory}>12 Courses</span>
                </div>
              </div>
            </Link>
            
            <Link href="/courses?category=options">
              <div className={styles.categoryCardBrowseByCategory}>
                <div className={styles.categoryImageBrowseByCategory}>
                  <img src="/images/categories/options.jpg" alt="Options" />
                </div>
                <div className={styles.categoryContentBrowseByCategory}>
                  <h3>Options Trading</h3>
                  <p>Master options trading strategies for both beginners and advanced traders.</p>
                  <span className={styles.categoryCountBrowseByCategory}>8 Courses</span>
                </div>
              </div>
            </Link>
            
            <Link href="/courses?category=technical">
              <div className={styles.categoryCardBrowseByCategory}>
                <div className={styles.categoryImageBrowseByCategory}>
                  <img src="/images/categories/technical.jpg" alt="Technical Analysis" />
                </div>
                <div className={styles.categoryContentBrowseByCategory}>
                  <h3>Technical Analysis</h3>
                  <p>Learn to analyze price charts and identify profitable trading opportunities.</p>
                  <span className={styles.categoryCountBrowseByCategory}>10 Courses</span>
                </div>
              </div>
            </Link>
            
            <Link href="/courses?category=fundamental">
              <div className={styles.categoryCardBrowseByCategory}>
                <div className={styles.categoryImageBrowseByCategory}>
                  <img src="/images/categories/fundamental.jpg" alt="Fundamental Analysis" />
                </div>
                <div className={styles.categoryContentBrowseByCategory}>
                  <h3>Fundamental Analysis</h3>
                  <p>Discover how to evaluate companies and make informed investment decisions.</p>
                  <span className={styles.categoryCountBrowseByCategory}>7 Courses</span>
                </div>
              </div>
            </Link>
            </div>
            </div>
            </section>

        {/* Testimonials Section */}
        <section className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleBrowseByCategory}>What Our Students Say</h2>
            <p className={styles.heroSubtitle3}>Success stories from traders who transformed their skills with TradeShiksha</p>
          </div>
          
          <div className={styles.testimonialsGrid}>
            {isLoading ? (
              // Loading skeleton
              Array(4).fill(0).map((_, index) => (
                <div key={index} className={`${styles.testimonialCard} ${styles.skeleton}`}>
                  <div className={styles.testimonialHeaderSkeleton}>
                    <div className={styles.testimonialAvatarSkeleton}></div>
                    <div className={styles.testimonialInfoSkeleton}>
                      <div className={styles.skeletonLine}></div>
                      <div className={styles.skeletonLine}></div>
                    </div>
                  </div>
                  <div className={styles.testimonialContentSkeleton}>
                    <div className={styles.skeletonLine}></div>
                    <div className={styles.skeletonLine}></div>
                    <div className={styles.skeletonLine}></div>
                  </div>
                </div>
              ))
            ) : (
              testimonials.map(testimonial => (
                <div key={testimonial.id} className={styles.testimonialCard}>
                  <div className={styles.testimonialContent}>
                    <p>"{testimonial.content}"</p>
                  </div>
                  <div className={styles.testimonialFooter}>
                    <div className={styles.testimonialAvatar}>
                      <img src={testimonial.image || '/images/avatar-placeholder.jpg'} alt={testimonial.name} />
                    </div>
                    <div className={styles.testimonialInfo}>
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                      <div className={styles.testimonialRating}>
                        {Array(5).fill(0).map((_, i) => (
                          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(testimonial.rating) ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.testimonialsSection1}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContainer}>
            <div className={styles.ctaContent}>
            <h1 className={styles.heroTitle}>Ready to Start Your Trading Journey?</h1>
              <p className={styles.heroSubtitle}>Join thousands of successful traders who have transformed their skills with TradeShiksha.</p>
              <div className={styles.ctaButtons}>
                <Link href="/signup" className={styles.primaryButton}>
                  Get Started Today
                </Link>
                <Link href="/courses" className={styles.secondaryButton}>
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}