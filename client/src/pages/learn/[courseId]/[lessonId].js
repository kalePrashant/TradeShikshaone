import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { useAuth } from '../../../contexts/AuthContext';
import styles from '../../../styles/CoursePlayer.module.css';

export default function CoursePlayer() {
  const router = useRouter();
  const { courseId, lessonId } = router.query;
  const { currentUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('content');

  // Fetch course data
  useEffect(() => {
    if (courseId && lessonId) {
      // This would be replaced with an actual API call
      fetchCourseData();
    }
  }, [courseId, lessonId]);

  const fetchCourseData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock course data
      const courseData = {
        id: courseId,
        title: 'Advanced Stock Trading Strategies',
        instructor: 'Rahul Sharma',
        sections: [
          {
            id: 's1',
            title: 'Introduction to Trading',
            lessons: [
              {
                id: 'l1',
                title: 'Welcome to the Course',
                duration: '5:20',
                type: 'video',
                videoUrl: 'https://example.com/video1.mp4',
                completed: true
              },
              {
                id: 'l2',
                title: 'Understanding Market Basics',
                duration: '12:45',
                type: 'video',
                videoUrl: 'https://example.com/video2.mp4',
                completed: true
              }
            ]
          },
          {
            id: 's2',
            title: 'Technical Analysis',
            lessons: [
              {
                id: 'l3',
                title: 'Chart Patterns',
                duration: '18:30',
                type: 'video',
                videoUrl: 'https://example.com/video3.mp4',
                completed: false
              },
              {
                id: 'l4',
                title: 'Technical Indicators',
                duration: '22:15',
                type: 'video',
                videoUrl: 'https://example.com/video4.mp4',
                completed: false
              },
              {
                id: 'l5',
                title: 'Technical Analysis Quiz',
                duration: '10:00',
                type: 'quiz',
                questions: [
                  {
                    id: 'q1',
                    question: 'Which of the following is NOT a chart pattern?',
                    options: [
                      'Head and Shoulders',
                      'Double Top',
                      'Triple Bottom',
                      'Exponential Moving Average'
                    ],
                    correctAnswer: 3
                  },
                  {
                    id: 'q2',
                    question: 'What does RSI stand for?',
                    options: [
                      'Relative Strength Index',
                      'Rapid Stock Indicator',
                      'Resistance Support Indicator',
                      'Real Stock Investment'
                    ],
                    correctAnswer: 0
                  }
                ],
                completed: false
              }
            ]
          },
          {
            id: 's3',
            title: 'Fundamental Analysis',
            lessons: [
              {
                id: 'l6',
                title: 'Financial Statements',
                duration: '15:45',
                type: 'video',
                videoUrl: 'https://example.com/video5.mp4',
                completed: false
              },
              {
                id: 'l7',
                title: 'Valuation Methods',
                duration: '20:10',
                type: 'video',
                videoUrl: 'https://example.com/video6.mp4',
                completed: false
              }
            ]
          }
        ]
      };
      
      setCourse(courseData);
      
      // Find current lesson
      let foundLesson = null;
      let totalCompleted = 0;
      let totalLessons = 0;
      
      courseData.sections.forEach(section => {
        section.lessons.forEach(lesson => {
          totalLessons++;
          if (lesson.completed) {
            totalCompleted++;
          }
          if (lesson.id === lessonId) {
            foundLesson = lesson;
          }
        });
      });
      
      setCurrentLesson(foundLesson);
      setProgress(Math.round((totalCompleted / totalLessons) * 100));
      setIsCompleted(foundLesson?.completed || false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching course data:', error);
      setLoading(false);
    }
  };

  const markAsComplete = async () => {
    try {
      // This would be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsCompleted(true);
      
      // Update progress
      const totalLessons = course.sections.reduce((acc, section) => acc + section.lessons.length, 0);
      const completedLessons = course.sections.reduce((acc, section) => {
        return acc + section.lessons.filter(lesson => {
          if (lesson.id === currentLesson.id) {
            return true; // Count the current lesson as completed
          }
          return lesson.completed;
        }).length;
      }, 0);
      
      setProgress(Math.round((completedLessons / totalLessons) * 100));
      
      // Find next lesson
      let foundCurrentLesson = false;
      let nextLesson = null;
      
      outerLoop:
      for (const section of course.sections) {
        for (const lesson of section.lessons) {
          if (foundCurrentLesson) {
            nextLesson = lesson;
            break outerLoop;
          }
          if (lesson.id === currentLesson.id) {
            foundCurrentLesson = true;
          }
        }
      }
      
      if (nextLesson) {
        // Auto-navigate to next lesson after 3 seconds
        setTimeout(() => {
          router.push(`/learn/${courseId}/${nextLesson.id}`);
        }, 3000);
      }
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    }
  };

  const saveNotes = async () => {
    try {
      // This would be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Notes saved successfully!');
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const handleQuizSubmit = (answers) => {
    // Calculate score
    let correctAnswers = 0;
    currentLesson.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / currentLesson.questions.length) * 100);
    
    if (score >= 70) {
      // Pass
      markAsComplete();
      alert(`Congratulations! You passed the quiz with a score of ${score}%`);
    } else {
      // Fail
      alert(`You scored ${score}%. You need at least 70% to pass. Please try again.`);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading course content...</p>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className={styles.errorContainer}>
        <h2>Lesson not found</h2>
        <p>The lesson you're looking for doesn't exist or you don't have access to it.</p>
        <Link href="/dashboard" className={styles.backButton}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.coursePlayerContainer}>
        <Head>
          <title>{currentLesson.title} | {course.title} | TradeShiksha</title>
        </Head>
        
        <div className={styles.courseHeader}>
          <div className={styles.courseHeaderContent}>
            <Link href="/dashboard" className={styles.backLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Dashboard
            </Link>
            <h1>{course.title}</h1>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className={styles.progressText}>{progress}% complete</span>
            </div>
          </div>
        </div>
        
        <div className={styles.courseContent}>
          <div className={styles.courseSidebar}>
            <div className={styles.courseInfo}>
              <h2>Course Content</h2>
              <div className={styles.sectionsList}>
                {course.sections.map((section) => (
                  <div key={section.id} className={styles.section}>
                    <h3 className={styles.sectionTitle}>{section.title}</h3>
                    <div className={styles.lessonsList}>
                      {section.lessons.map((lesson) => (
                        <Link 
                          href={`/learn/${courseId}/${lesson.id}`}
                          key={lesson.id}
                          className={`${styles.lessonItem} ${lesson.id === currentLesson.id ? styles.activeLesson : ''} ${lesson.completed ? styles.completedLesson : ''}`}
                        >
                          <div className={styles.lessonStatus}>
                            {lesson.completed ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <div className={styles.lessonStatusCircle}></div>
                            )}
                          </div>
                          <div className={styles.lessonInfo}>
                            <span className={styles.lessonTitle}>{lesson.title}</span>
                            <div className={styles.lessonMeta}>
                              <span className={styles.lessonType}>
                                {lesson.type === 'video' ? (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 10L19.5528 7.72361C20.2177 7.39116 21 7.87465 21 8.61803V15.382C21 16.1253 20.2177 16.6088 19.5528 16.2764L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                ) : (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                  </svg>
                                )}
                                <span>{lesson.duration}</span>
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.lessonContainer}>
            <div className={styles.lessonHeader}>
              <h2>{currentLesson.title}</h2>
              <div className={styles.lessonMeta}>
                <span className={styles.lessonType}>
                  {currentLesson.type === 'video' ? 'Video Lesson' : 'Quiz'}
                </span>
                <span className={styles.lessonDuration}>
                  {currentLesson.duration}
                </span>
              </div>
            </div>
            
            <div className={styles.lessonTabs}>
              <button 
                className={`${styles.tabButton} ${activeTab === 'content' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('content')}
              >
                Lesson Content
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'notes' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                My Notes
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'discussion' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('discussion')}
              >
                Discussion
              </button>
            </div>
            
            <div className={styles.lessonContent}>
              {activeTab === 'content' && (
                <>
                  {currentLesson.type === 'video' ? (
                    <div className={styles.videoContainer}>
                      {/* This would be replaced with an actual video player */}
                      <div className={styles.videoPlaceholder}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 10L19.5528 7.72361C20.2177 7.39116 21 7.87465 21 8.61803V15.382C21 16.1253 20.2177 16.6088 19.5528 16.2764L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>Video Player</p>
                      </div>
                      
                      <div className={styles.videoControls}>
                        <div className={styles.controlsLeft}>
                          <button className={styles.playButton}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 4.99999V19C5 19.388 5.22446 19.741 5.57584 19.9056C5.92723 20.0702 6.3421 20.0166 6.64018 19.7682L16.5981 11.7682C16.8418 11.5682 16.9829 11.2703 16.9829 10.955C16.9829 10.6397 16.8418 10.3418 16.5981 10.1418L6.64018 2.14176C6.3421 1.89336 5.92723 1.83981 5.57584 2.00435C5.22446 2.1689 5 2.52197 5 2.90999V4.99999Z" fill="currentColor"/>
                            </svg>
                          </button>
                          <div className={styles.volumeControl}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.5355 8.46448C17.4881 10.4171 17.4881 13.5829 15.5355 15.5355M17.6569 6.34314C20.7812 9.46736 20.7812 14.5326 17.6569 17.6568M6.82843 9.17156L11.6569 4.34314C12.0474 3.95262 12.6805 3.95262 13.0711 4.34314C13.4616 4.73367 13.4616 5.36683 13.0711 5.75736L8.24264 10.5858C7.85212 10.9763 7.85212 11.6095 8.24264 12C8.63317 12.3905 9.26633 12.3905 9.65685 12L14.4853 7.17156C14.8758 6.78103 15.509 6.78103 15.8995 7.17156C16.29 7.56208 16.29 8.19525 15.8995 8.58577L11.0711 13.4142C10.6805 13.8047 10.6805 14.4379 11.0711 14.8284C11.4616 15.219 12.0948 15.219 12.4853 14.8284L17.3137 10C17.7042 9.60947 18.3374 9.60947 18.7279 10C19.1184 10.3905 19.1184 11.0237 18.7279 11.4142L13.8995 16.2426C13.509 16.6332 13.509 17.2663 13.8995 17.6569C14.29 18.0474 14.9232 18.0474 15.3137 17.6569L18.7279 14.2426C19.1184 13.8521 19.7516 13.8521 20.1421 14.2426C20.5327 14.6332 20.5327 15.2663 20.1421 15.6569L16.7279 19.0711C15.1658 20.6332 12.6658 20.6332 11.1037 19.0711L4.92893 12.8963C3.36683 11.3342 3.36683 8.83418 4.92893 7.27208L6.82843 9.17156Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className={styles.timeDisplay}>0:00 / {currentLesson.duration}</span>
                        </div>
                        <div className={styles.controlsRight}>
                          <button className={styles.speedButton}>1x</button>
                          <button className={styles.fullscreenButton}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 16V20C3 20.5523 3.44772 21 4 21H8M21 8V4C21 3.44772 20.5523 3 20 3H16M3 8V4C3 3.44772 3.44772 3 4 3H8M21 16V20C21 20.5523 20.5523 21 20 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.quizContainer}>
                      <Quiz 
                        questions={currentLesson.questions} 
                        onSubmit={handleQuizSubmit} 
                      />
                    </div>
                  )}
                  
                  {!isCompleted && currentLesson.type === 'video' && (
                    <button 
                      className={styles.completeButton}
                      onClick={markAsComplete}
                    >
                      Mark as Complete
                    </button>
                  )}
                </>
              )}
              
              {activeTab === 'notes' && (
                <div className={styles.notesContainer}>
                  <textarea
                    className={styles.notesTextarea}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Take notes for this lesson..."
                  ></textarea>
                  <button 
                    className={styles.saveNotesButton}
                    onClick={saveNotes}
                  >
                    Save Notes
                  </button>
                </div>
              )}
              
              {activeTab === 'discussion' && (
                <div className={styles.discussionContainer}>
                  <div className={styles.discussionHeader}>
                    <h3>Discussion</h3>
                    <button className={styles.newQuestionButton}>
                      Ask a Question
                    </button>
                  </div>
                  
                  <div className={styles.emptyDiscussion}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3>No discussions yet</h3>
                    <p>Be the first to start a discussion about this lesson</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Quiz Component
function Quiz({ questions, onSubmit }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    if (answers.includes(null)) {
      alert('Please answer all questions before submitting.');
      return;
    }
    
    onSubmit(answers);
  };

  return (
    <div className={styles.quiz}>
      <div className={styles.quizProgress}>
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <div className={styles.quizProgressBar}>
          <div 
            className={styles.quizProgressFill} 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className={styles.quizQuestion}>
        <h3>{questions[currentQuestion].question}</h3>
        
        <div className={styles.quizOptions}>
          {questions[currentQuestion].options.map((option, index) => (
            <div 
              key={index}
              className={`${styles.quizOption} ${answers[currentQuestion] === index ? styles.selectedOption : ''}`}
              onClick={() => handleAnswer(currentQuestion, index)}
            >
              <div className={styles.optionSelector}>
                {answers[currentQuestion] === index ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <div className={styles.optionCircle}></div>
                )}
              </div>
              <span>{option}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.quizNavigation}>
        <button 
          className={styles.quizPrevButton}
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        
        {currentQuestion < questions.length - 1 ? (
          <button 
            className={styles.quizNextButton}
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button 
            className={styles.quizSubmitButton}
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}