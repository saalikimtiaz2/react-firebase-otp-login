import { initializeApp } from 'firebase/app';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const apiKey = import.meta.env.VITE_APP_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_APP_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_APP_FIREBASE_APP_ID;
const measurementId = import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID;

const firebaseConfig: any = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Login() {
  const [phone, setPhone] = useState<any>();
  const [OTP, setOTP] = useState();
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(window.localStorage.getItem('user'));
    if (window.localStorage.getItem('user') !== null) {
      navigate('/');
    }
  }, []);

  const handleOnCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            handleLogin();
          },
          'expired-callback': () => {},
        },
        auth,
      );
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    handleOnCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatedPhoneNumber = '+' + phone;
    signInWithPhoneNumber(auth, formatedPhoneNumber, appVerifier)
      .then((confirmation) => {
        window.confirmationResult = confirmation;
        toast.success('OTP sent successfully!');
        setLoading(false);
        setShowOtpInput(true);
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });
  };

  const handleVerifyOTP = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(OTP)
      .then(async (resp: any) => {
        window.localStorage.setItem('user', JSON.stringify(resp._tokenResponse));
        toast.success('Logged in successfully!');
        setLoading(false);

        navigate('/');
      })
      .catch((error: any) => {
        console.log(error);
        toast.error('Invalid OTP!');
      });
  };

  return (
    <>
      <div id="recaptcha-container" />
      <main className=" bg-gradient-to-b from-blue-500 to-purple-500 flex items-center justify-center h-screen">
        <div className="max-w-sm bg-white bg-opacity-20 backdrop-blur-sm shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl text-center font-semibold mb-6">Login</h2>
          <p className=" text-center mb-2">Login using OTP</p>

          {showOtpInput ? (
            <>
              <OtpInput
                value={OTP}
                onChange={(evt: any) => setOTP(evt)}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                inputStyle="rounded flex-1 !mr-0 text-2xl h-8 inline-blocks outline-none text-black border border-white focus:border-rose-500"
                containerStyle="mb-2 gap-x-2"
                shouldAutoFocus
              />
              <div className="flex items-center justify-center text-[12px] text-white gap-x-2 mb-4">
                +{phone}{' '}
                <button
                  className="text-[12px] text-black"
                  onClick={() => setShowOtpInput(false)}
                >
                  Change Number
                </button>
              </div>
              <button
                className="w-full flex items-center justify-center gap-x-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => handleVerifyOTP()}
                disabled={!OTP || loading}
              >
                {loading && <TailSpin height="20px" width="20px" color="white" />}
                Verify Code
              </button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <PhoneInput
                  country="pk"
                  value={phone}
                  onChange={(evt: any) => {
                    setPhone(evt);
                  }}
                />
              </div>
              <button
                className="w-full flex items-center justify-center gap-x-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
                disabled={!phone || loading}
              >
                {loading && <TailSpin height="20px" width="20px" color="white" />}
                Send Code via SMS
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Login;
