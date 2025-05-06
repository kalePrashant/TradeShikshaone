import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Checkout.module.css';

export default function Checkout() {
  const router = useRouter();
  const { courseId } = router.query;
  
  // This would come from an API in a real application
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
    couponCode: ''
  });
  
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  
  // Simulate fetching course data
  useEffect(() => {
    if (courseId) {
      // This would be an API call in a real application
      setTimeout(() => {
        setCourse({
          id: courseId,
          title: 'Technical Analysis Masterclass',
          instructor: 'Priya Patel',
          price: 4999,
          discountPrice: 3499,
          thumbnail: '/images/courses/technical-analysis.jpg',
          features: [
            'Lifetime access to course materials',
            'Certificate of completion',
            'Live doubt clearing sessions',
            'Access to community forum',
            'Real-world trading examples'
          ]
        });
        setLoading(false);
      }, 500);
    }
  }, [courseId]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };
  
  const applyCoupon = () => {
    // This would be an API call in a real application
    if (formData.couponCode.toUpperCase() === 'WELCOME20') {
      setAppliedCoupon({
        code: 'WELCOME20',
        discount: 20,
        discountAmount: Math.round(course.discountPrice * 0.2)
      });
    } else {
      alert('Invalid coupon code');
    }
  };
  
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setFormData({
      ...formData,
      couponCode: ''
    });
  };
  
  const calculateTotal = () => {
    if (!course) return 0;
    
    let total = course.discountPrice;
    
    if (appliedCoupon) {
      total -= appliedCoupon.discountAmount;
    }
    
    return total;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // This would handle payment processing in a real application
    alert('Payment successful! Redirecting to your course...');
    router.push(`/courses/${courseId}`);
  };
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Checkout | TradeShiksha</title>
        <meta name="description" content="Complete your purchase and start learning" />
      </Head>

      <main className={styles.main}>
        <div className={styles.checkoutContainer}>
          <div className={styles.checkoutForm}>
            <h1 className={styles.title}>Checkout</h1>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formSection}>
                <h2>Personal Information</h2>
                
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formSection}>
                <h2>Payment Method</h2>
                
                <div className={styles.paymentMethods}>
                  <div 
                    className={`${styles.paymentMethod} ${paymentMethod === 'card' ? styles.active : ''}`}
                    onClick={() => handlePaymentMethodChange('card')}
                  >
                    <div className={styles.paymentIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <span>Credit/Debit Card</span>
                  </div>
                  
                  <div 
                    className={`${styles.paymentMethod} ${paymentMethod === 'upi' ? styles.active : ''}`}
                    onClick={() => handlePaymentMethodChange('upi')}
                  >
                    <div className={styles.paymentIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>UPI</span>
                  </div>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className={styles.paymentDetails}>
                    <div className={styles.formGroup}>
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="cardExpiry">Expiry Date</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="cardCvv">CVV</label>
                        <input
                          type="text"
                          id="cardCvv"
                          name="cardCvv"
                          placeholder="123"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'upi' && (
                  <div className={styles.paymentDetails}>
                    <div className={styles.formGroup}>
                      <label htmlFor="upiId">UPI ID</label>
                      <input
                        type="text"
                        id="upiId"
                        name="upiId"
                        placeholder="yourname@upi"
                        value={formData.upiId}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className={styles.formSection}>
                <div className={styles.couponContainer}>
                  {!appliedCoupon ? (
                    <>
                      <div className={styles.formGroup}>
                        <label htmlFor="couponCode">Have a coupon?</label>
                        <div className={styles.couponInput}>
                          <input
                            type="text"
                            id="couponCode"
                            name="couponCode"
                            placeholder="Enter coupon code"
                            value={formData.couponCode}
                            onChange={handleChange}
                          />
                          <button 
                            type="button" 
                            className={styles.applyCouponButton}
                            onClick={applyCoupon}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={styles.appliedCoupon}>
                      <div className={styles.couponInfo}>
                        <span className={styles.couponCode}>{appliedCoupon.code}</span>
                        <span className={styles.couponDiscount}>{appliedCoupon.discount}% OFF</span>
                      </div>
                      <button 
                        type="button" 
                        className={styles.removeCouponButton}
                        onClick={removeCoupon}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <button type="submit" className={styles.payButton}>
                Pay ₹{calculateTotal().toLocaleString()}
              </button>
              
              <p className={styles.securePayment}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 11H5V21H19V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Secure payment - Your payment information is encrypted
              </p>
            </form>
          </div>
          
          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>
            
            <div className={styles.coursePreview}>
              <img src={course.thumbnail} alt={course.title} />
              <div className={styles.courseInfo}>
                <h3>{course.title}</h3>
                <p>By {course.instructor}</p>
              </div>
            </div>
            
            <div className={styles.courseFeatures}>
              <h4>This course includes:</h4>
              <ul>
                {course.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className={styles.priceSummary}>
              <div className={styles.priceRow}>
                <span>Original Price</span>
                <span>₹{course.price.toLocaleString()}</span>
              </div>
              
              <div className={styles.priceRow}>
                <span>Discount</span>
                <span>-₹{(course.price - course.discountPrice).toLocaleString()}</span>
              </div>
              
              {appliedCoupon && (
                <div className={styles.priceRow}>
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>-₹{appliedCoupon.discountAmount.toLocaleString()}</span>
                </div>
              )}
              
              <div className={`${styles.priceRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
            
            <div className={styles.guaranteeNote}>
              <p>30-Day Money-Back Guarantee</p>
              <p>Full refund if you're not satisfied with the course</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}