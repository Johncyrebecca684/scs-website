// =======================================
//          FIREBASE CONFIG & INITIALIZATION
// =======================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-analytics.js";
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZFbh0Va71dix-xduSjbk8LqTCqlOcLo4",
  authDomain: "scs-website-3b2ea.firebaseapp.com",
  projectId: "scs-website-3b2ea",
  storageBucket: "scs-website-3b2ea.firebasestorage.app",
  messagingSenderId: "27172686800",
  appId: "1:27172686800:web:3da19c4c42c5fe7a0a07d5",
  measurementId: "G-WTZERLPXQ1"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Operational variables
let confirmationResult = null;
let isPhoneVerified = false;

// =======================================
//          RECAPTCHA & OTP LOGIC
// =======================================

// Setup the invisible security check on the container element
if (document.getElementById('recaptcha-container')) {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    'size': 'invisible'
  });
}

// Send OTP triggered by user
const sendOTPBtn = document.getElementById('sendOTPBtn');
if (sendOTPBtn) {
  sendOTPBtn.addEventListener('click', () => {
    const phoneNumber = document.getElementById('phone').value.trim();
    const appVerifier = window.recaptchaVerifier;

    if (!phoneNumber.startsWith('+')) {
      alert("Please enter your phone number with your country code (e.g., +919876543210)");
      return;
    }

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((result) => {
        confirmationResult = result;
        // Reveal the OTP entry box
        const otpBox = document.getElementById('otpBox');
        if (otpBox) otpBox.style.display = 'block';
        alert("OTP sent successfully!");
      }).catch((error) => {
        alert("Error sending SMS: " + error.message);
      });
  });
}

// Verify OTP typed by user
const verifyOTPBtn = document.getElementById('verifyOTPBtn');
if (verifyOTPBtn) {
  verifyOTPBtn.addEventListener('click', () => {
    const code = document.getElementById('otpCode').value.trim();

    if (!confirmationResult) {
      alert("Please request an OTP first.");
      return;
    }

    confirmationResult.confirm(code)
      .then((result) => {
        isPhoneVerified = true;
        alert("Phone number verified successfully! ✅");
        
        const otpBox = document.getElementById('otpBox');
        if (otpBox) otpBox.style.display = 'none';
        
        // Form submission safety release
        const submitFormBtn = document.getElementById('submitFormBtn');
        if (submitFormBtn) {
          submitFormBtn.disabled = false;
        }
      }).catch((error) => {
        alert("Invalid OTP code. Please check and try again.");
      });
  });
}

// Prevent form submission if not verified
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    if (!isPhoneVerified) {
      e.preventDefault();
      alert("Please verify your phone number via OTP before submitting.");
    }
  });
}