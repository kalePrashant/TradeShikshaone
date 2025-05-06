import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import Certificate from '../../components/Certificate';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/CertificatePage.module.css';

export default function CertificatePage() {
  const router = useRouter();
  const { certificateId } = router.query;
  const { currentUser } = useAuth();
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (certificateId) {
      // This would be replaced with an actual API call
      fetchCertificateData();
    }
  }, [certificateId]);

  const fetchCertificateData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock certificate data
      const data = {
        id: certificateId,
        student: {
          id: currentUser?.id || '1',
          name: currentUser?.name || 'Demo User',
        },
        course: {
          id: 'c1',
          title: 'Advanced Stock Trading Strategies',
          instructor: 'Rahul Sharma',
          duration: 20
        },
        issueDate: new Date().toISOString(),
        completionDate: new Date().toISOString()
      };
      
      setCertificateData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching certificate data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading certificate...</p>
      </div>
    );
  }

  if (!certificateData) {
    return (
      <div className={styles.errorContainer}>
        <h2>Certificate not found</h2>
        <p>The certificate you're looking for doesn't exist or you don't have access to it.</p>
        <Link href="/dashboard" className={styles.backButton}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.certificatePageContainer}>
        <Head>
          <title>Course Certificate | TradeShiksha</title>
        </Head>
        
        <div className={styles.certificatePageHeader}>
          <div className={styles.certificatePageHeaderContent}>
            <Link href="/dashboard" className={styles.backLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Dashboard
            </Link>
            <h1>Course Certificate</h1>
          </div>
        </div>
        
        <div className={styles.certificatePageContent}>
          <Certificate 
            student={certificateData.student}
            course={certificateData.course}
            date={certificateData.completionDate}
            certificateId={certificateData.id}
          />
          
          <div className={styles.certificateInfo}>
            <h2>About this Certificate</h2>
            <p>
              This certificate represents successful completion of the {certificateData.course.title} course on TradeShiksha. 
              It verifies your proficiency in the skills and knowledge covered in the course.
            </p>
            
            <div className={styles.certificateDetails}>
              <div className={styles.detailItem}>
                <h3>Issue Date</h3>
                <p>{new Date(certificateData.issueDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              
              <div className={styles.detailItem}>
                <h3>Course Duration</h3>
                <p>{certificateData.course.duration} hours</p>
              </div>
              
              <div className={styles.detailItem}>
                <h3>Certificate ID</h3>
                <p>{certificateData.id}</p>
              </div>
            </div>
            
            <div className={styles.certificateActions}>
              <h3>Share Your Achievement</h3>
              <div className={styles.socialButtons}>
                <button className={styles.linkedinButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  LinkedIn
                </button>
                <button className={styles.twitterButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Twitter
                </button>
                <button className={styles.facebookButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
            
            <div className={styles.certificateVerify}>
              <h3>Verify Certificate</h3>
              <p>
                Anyone can verify the authenticity of this certificate by visiting the link below:
              </p>
              <div className={styles.verifyLink}>
                <input 
                  type="text" 
                  value={`https://tradeshiksha.com/verify/${certificateData.id}`} 
                  readOnly 
                />
                <button className={styles.copyButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M10 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}