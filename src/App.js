import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import './App.css';
import CurrentLocation from './currentLocation';
import Chatbot from './Chatbot';
import { getDatabase, ref, push } from 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDLT5VGNrm5_Ks9gs8YlBvvS9rKrKjD2sY",
  authDomain: "climate-check-360.firebaseapp.com",
  databaseURL: "https://climate-check-360-default-rtdb.firebaseio.com",
  projectId: "climate-check-360",
  storageBucket: "climate-check-360.appspot.com",
  messagingSenderId: "491332887364",
  appId: "1:491332887364:web:6da35e591994f98f54ad11",
  measurementId: "G-WL33DTYDFY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [feedback, setFeedback] = useState('');
  const [weatherOption, setWeatherOption] = useState('');

 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUsername(user.email);
      } else {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

const handleSubmit = async () => {
    const dbRef = ref(db, 'feedbacks');

    const feedbackData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      feedback,
      weatherOption
    };

    try {
      await push(dbRef, feedbackData);

      // Clear form fields and state
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setFeedback('');
      setWeatherOption('');

      console.log('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
   <div className="app-container">
      <div className="container">
        {/* Assuming CurrentLocation and Chatbot components are imported */}
        <CurrentLocation />
        <Chatbot />
      </div>
      <div className="darkBackground">
        <h1>Weather Information</h1>
        <h2>UV Index</h2>
        <h5>High UV index regions in India:</h5>
        <p>Coastal regions such as Goa, Kerala, and parts of Tamil Nadu experience higher UV index values due to their proximity to the equator and ample sunlight.</p>
        <p><em>High UV Index (India):</em> 9-11 (during summer months)</p>
        <h5>Low UV index regions in India:</h5>
        <p>Northern regions like Himachal Pradesh, Jammu and Kashmir, and areas with frequent cloud cover such as Meghalaya generally have lower UV index values.</p>
        <p><em>Low UV Index (India):</em> 2-4 (during winter months)</p>
        <h5>Worldwide:</h5>
        <p><em>High UV Index:</em> Tropical areas near the equator like Brazil, Australia, and parts of Africa.</p>
        <p><em>Low UV Index:</em> Polar regions such as Antarctica and areas with frequent cloud cover like Northern Europe.</p>

        <h2>Temperature</h2>
        <h5>High temperature regions in India:</h5>
        <p>Northwestern states like Rajasthan and Gujarat experience scorching temperatures during summer.</p>
        <p><em>High Temperature (India):</em> 40-50°C (during peak summer)</p>
        <h5>Low temperature regions in India:</h5>
        <p>Northern mountainous regions such as Ladakh and parts of Himachal Pradesh experience extremely low temperatures in winter.</p>
        <p><em>Low Temperature (India):</em> Below -20°C (during winter)</p>
        <h5>Worldwide:</h5>
        <p><em>High Temperature:</em> Deserts like the Sahara Desert in Africa or the Arabian Desert in the Middle East.</p>
        <p><em>Low Temperature:</em> Polar regions like Antarctica or the Arctic Circle.</p>

        <h2>Air Quality</h2>
        <h5>Regions with poor air quality in India:</h5>
        <p>Major cities like Delhi, Mumbai, and Kolkata face severe air pollution issues, especially during winter.</p>
        <p><em>Poor Air Quality (India):</em> AQI levels exceeding 200 (during winter months)</p>
        <h5>Regions with good air quality in India:</h5>
        <p>Northeastern states like Sikkim and parts of Assam generally have better air quality due to lower population density.</p>
        <p><em>Good Air Quality (India):</em> AQI levels below 100</p>
        <h5>Worldwide:</h5>
        <p><em>Poor Air Quality:</em> Big cities in countries like China and India.</p>
        <p><em>Good Air Quality:</em> Rural areas in Canada or parts of Scandinavia.</p>

              <h2>Wind</h2>
        <h5>High wind regions in India:</h5>
        <p>Coastal areas along the Arabian Sea and the Bay of Bengal experience strong winds during the monsoon season.</p>
        <p><em>High Wind (India):</em> Up to 60-70 km/h (during monsoon)</p>
        <h5>Low wind regions in India:</h5>
        <p>Inland regions, particularly in central and southern India, may experience relatively calmer winds.</p>
        <p><em>Low Wind (India):</em> 10-20 km/h (during non-monsoon season)</p>
        <h5>Worldwide:</h5>
        <p><em>High Wind:</em> Coastal areas like Cape Town in South Africa or Wellington in New Zealand.</p>
        <p><em>Low Wind:</em> Valleys in Switzerland or parts of the Amazon rainforest.</p>

        <h2>Precipitation</h2>
        <h5>High precipitation regions in India:</h5>
        <p>Western Ghats regions like Kerala and parts of Karnataka receive heavy rainfall during the monsoon season.</p>
        <p><em>High Precipitation (India):</em> 2000-4000 mm annually (in Western Ghats)</p>
        <h5>Low precipitation regions in India:</h5>
        <p>Northwestern regions like Rajasthan and parts of Gujarat experience arid conditions with minimal rainfall.</p>
        <p><em>Low Precipitation (India):</em> Less than 500 mm annually (in arid regions)</p>
        <h5>Worldwide:</h5>
        <p><em>High Precipitation:</em> Rainforests like the Amazon Rainforest in South America or the Congo Rainforest in Africa.</p>
        <p><em>Low Precipitation:</em> Deserts such as the Sahara Desert in Africa or the Atacama Desert in South America.</p>

        <h2>Humidity</h2>
        <h5>High humidity regions in India:</h5>
        <p>Coastal regions like Mumbai and Chennai experience high humidity levels, especially during the monsoon season.</p>
        <p><em>High Humidity (India):</em> 70-90% RH (during monsoon)</p>
        <h5>Low humidity regions in India:</h5>
        <p>Inland areas, particularly in northwestern India, have lower humidity levels, especially during the dry season.</p>
        <p><em>Low Humidity (India):</em> 20-40% RH (during dry season)</p>
        <h5>Worldwide:</h5>
        <p><em>High Humidity:</em> Places near the equator like Southeast Asia or the Amazon Basin.</p>
        <p><em>Low Humidity:</em> Deserts like the Sahara or the Middle East.</p>

        <h2>Sunset and Sunrise Time</h2>
        <h5>Extreme daylight variations in India:</h5>
        <p>Near the Himalayan region, there can be noticeable variations in daylight hours between summer and winter.</p>
        <p><em>Extreme Daylight Variation (India):</em> Daylight hours ranging from 9 hours in winter to 15 hours in summer (in northern regions)</p>
        <h5>Worldwide:</h5>
        <p><em>Extreme Daylight Variation:</em> Near the North and South Poles, where daylight can last for months in summer and be absent for months in winter.</p>
      </div>
      <div className="feedback-form">
        <h2>Feedback Form</h2>
        {/* Feedback Form fields */}
        <div className="input-group">
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        {/* ... (other input groups) */}
        <div className="input-group">
          <label>Weather Option:</label>
          <select value={weatherOption} onChange={(e) => setWeatherOption(e.target.value)}>
            <option value="thunderstorm">Thunderstorm</option>
            <option value="rain">Rain</option>
            <option value="sunny">Sunny</option>
            <option value="cloudy">Cloudy</option>
            <option value="alloption">All Options</option>
          </select>
        </div>
        <div className="input-group">
          <label>Feedback:</label>
          <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Submit Feedback</button>
      </div>

   {!isLoggedIn ? (
      <div className="auth-section">
        <h2>Login</h2>
        <div className="input-group">
          <label>Email:</label>
          <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={() => signInWithEmailAndPassword(auth, username, password)}>Login</button>
        <button onClick={() => createUserWithEmailAndPassword(auth, username, password)}>Register</button>
      </div>
    ) : (
      <div className="logout-section">
        <h2>Welcome, {username}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )}
  </div>
);
}

export default App;
