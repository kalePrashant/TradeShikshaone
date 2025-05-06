import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/Courses.module.css';
import Image from 'next/image';

export default function Courses() {
  // This would eventually come from an API
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to Stock Market',
      instructor: 'Rahul Sharma',
      price: 2999,
      discountPrice: 1999,
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.8,
      students: 1250,
      thumbnail: '/images/courses/stock-intro.jpg'
    },
    {
      id: 2,
      title: 'Technical Analysis Masterclass',
      instructor: 'Priya Patel',
      price: 4999,
      discountPrice: 3499,
      level: 'Intermediate',
      duration: '10 weeks',
      rating: 4.9,
      students: 850,
      thumbnail: '/images/courses/technical-analysis.jpg'
    },
    {
      id: 3,
      title: 'Options Trading Strategies',
      instructor: 'Vikram Mehta',
      price: 5999,
      discountPrice: 4499,
      level: 'Advanced',
      duration: '12 weeks',
      rating: 4.7,
      students: 620,
      thumbnail: '/images/courses/options-trading.jpg'
    },
    {
      id: 4,
      title: 'Fundamental Analysis Deep Dive',
      instructor: 'Anjali Desai',
      price: 3999,
      discountPrice: 2999,
      level: 'Intermediate',
      duration: '8 weeks',
      rating: 4.6,
      students: 780,
      thumbnail: '/images/courses/fundamental-analysis.jpg'
    },
  ]);

  const [filters, setFilters] = useState({
    level: '',
    priceRange: '',
    category: ''
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Filter courses based on selected filters
  const filteredCourses = courses.filter(course => {
    if (filters.level && course.level !== filters.level) return false;
    // Add more filter logic as needed
    return true;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Courses | TradeShiksha</title>
        <meta name="description" content="Browse our wide range of share market courses" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}>Explore Our Courses</h1>
        
        <div className={styles.filterSection}>
          <div className={styles.filter}>
            <label htmlFor="level">Level</label>
            <select 
              name="level" 
              id="level" 
              value={filters.level} 
              onChange={handleFilterChange}
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          
          <div className={styles.filter}>
            <label htmlFor="priceRange">Price Range</label>
            <select 
              name="priceRange" 
              id="priceRange" 
              value={filters.priceRange} 
              onChange={handleFilterChange}
            >
              <option value="">All Prices</option>
              <option value="0-2000">₹0 - ₹2,000</option>
              <option value="2000-5000">₹2,000 - ₹5,000</option>
              <option value="5000+">₹5,000+</option>
            </select>
          </div>
          
          <div className={styles.filter}>
            <label htmlFor="category">Category</label>
            <select 
              name="category" 
              id="category" 
              value={filters.category} 
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="stocks">Stocks</option>
              <option value="options">Options</option>
              <option value="futures">Futures</option>
              <option value="technical">Technical Analysis</option>
              <option value="fundamental">Fundamental Analysis</option>
            </select>
          </div>
        </div>
        
        <div className={styles.courseGrid}>
          {filteredCourses.map(course => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <div className={styles.courseCard}>
                <div className={styles.courseImage}>
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title}
                    width={300}
                    height={180}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div className={styles.courseLevel}>{course.level}</div>
                </div>
                <div className={styles.courseContent}>
                  <h3>{course.title}</h3>
                  <p className={styles.instructor}>By {course.instructor}</p>
                  <div className={styles.courseDetails}>
                    <span className={styles.duration}>{course.duration}</span>
                    <span className={styles.rating}>★ {course.rating} ({course.students} students)</span>
                  </div>
                  <div className={styles.priceSection}>
                    <span className={styles.discountPrice}>₹{course.discountPrice}</span>
                    <span className={styles.originalPrice}>₹{course.price}</span>
                    <span className={styles.discount}>
                      {Math.round((1 - course.discountPrice / course.price) * 100)}% off
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Set transparentNav to false for this page
Courses.transparentNav = false;