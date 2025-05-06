import { useState } from 'react';
import styles from '../styles/Quiz.module.css';

export default function Quiz({ questions, onSubmit }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

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
    
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(calculatedScore);
    setShowResults(true);
    
    // Call the onSubmit callback with the answers and score
    if (onSubmit) {
      onSubmit(answers, calculatedScore);
    }
  };

  const handleRetry = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrentQuestion(0);
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    return (
      <div className={styles.quizResults}>
        <div className={styles.scoreCard}>
          <div className={styles.scoreHeader}>
            <h2>Quiz Results</h2>
            <div className={styles.scoreCircle}>
              <span className={styles.scoreValue}>{score}%</span>
            </div>
          </div>
          
          <div className={styles.scoreMessage}>
            {score >= 70 ? (
              <>
                <h3>Congratulations!</h3>
                <p>You've passed the quiz successfully.</p>
              </>
            ) : (
              <>
                <h3>Keep Learning</h3>
                <p>You need at least 70% to pass. Try again after reviewing the material.</p>
              </>
            )}
          </div>
          
          <div className={styles.resultsSummary}>
            <div className={styles.summaryItem}>
              <span>Total Questions</span>
              <span>{questions.length}</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Correct Answers</span>
              <span>{Math.round((score / 100) * questions.length)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Incorrect Answers</span>
              <span>{questions.length - Math.round((score / 100) * questions.length)}</span>
            </div>
          </div>
          
          <div className={styles.resultsActions}>
            {score < 70 && (
              <button 
                className={styles.retryButton}
                onClick={handleRetry}
              >
                Retry Quiz
              </button>
            )}
            <button 
              className={styles.reviewButton}
              onClick={() => setShowResults(false)}
            >
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

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