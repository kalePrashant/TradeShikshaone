import { useRef } from 'react';
import styles from '../styles/Certificate.module.css';

export default function Certificate({ student, course, date, certificateId }) {
  const certificateRef = useRef(null);

  const downloadCertificate = () => {
    // In a real implementation, this would use a library like html2canvas or jsPDF
    // to generate a PDF or image of the certificate
    alert('Certificate download functionality would be implemented here');
  };

  const shareCertificate = () => {
    // In a real implementation, this would open a share dialog
    // with options to share on social media or via email
    alert('Certificate sharing functionality would be implemented here');
  };

  return (
    <div className={styles.certificateWrapper}>
      <div className={styles.certificateActions}>
        <button 
          className={styles.downloadButton}
          onClick={downloadCertificate}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download
        </button>
        <button 
          className={styles.shareButton}
          onClick={shareCertificate}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.68387 13.3419C8.88616 12.9381 9 12.4824 9 12C9 11.5176 8.88616 11.0619 8.68387 10.6581M8.68387 13.3419C8.19134 14.3251 7.17449 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.17449 9 8.19134 9.67492 8.68387 10.6581M8.68387 13.3419L15.3161 16.6581M8.68387 10.6581L15.3161 7.34193M15.3161 7.34193C15.8087 8.32508 16.8255 9 18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 6.48237 15.1138 6.93815 15.3161 7.34193ZM15.3161 16.6581C15.1138 17.0619 15 17.5176 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.8255 15 15.8087 15.6749 15.3161 16.6581Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Share
        </button>
      </div>
      
      <div className={styles.certificate} ref={certificateRef}>
        <div className={styles.certificateHeader}>
          <img src="/logo.png" alt="TradeShiksha Logo" className={styles.certificateLogo} />
          <h1 className={styles.certificateTitle}>Certificate of Completion</h1>
        </div>
        
        <div className={styles.certificateBody}>
          <p className={styles.certificateText}>This is to certify that</p>
          <h2 className={styles.studentName}>{student.name}</h2>
          <p className={styles.certificateText}>has successfully completed the course</p>
          <h3 className={styles.courseName}>{course.title}</h3>
          <p className={styles.certificateDetails}>
            with a duration of {course.duration} hours on {new Date(date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className={styles.certificateFooter}>
          <div className={styles.signature}>
            <div className={styles.signatureLine}></div>
            <p>{course.instructor}</p>
            <p className={styles.signatureTitle}>Instructor</p>
          </div>
          
          <div className={styles.certificateSeal}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8L15 13.5L21 14.5L16.5 18.5L17.5 24L12 21.5L6.5 24L7.5 18.5L3 14.5L9 13.5L12 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className={styles.signature}>
            <div className={styles.signatureLine}></div>
            <p>Rajesh Kumar</p>
            <p className={styles.signatureTitle}>Director, TradeShiksha</p>
          </div>
        </div>
        
        <div className={styles.certificateId}>
          Certificate ID: {certificateId}
        </div>
      </div>
    </div>
  );
}