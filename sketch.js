// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8kp6kExlCblFKlkxbZJXTu06Ew6Mnkvo",
  authDomain: "invitation-18808.firebaseapp.com",
  projectId: "invitation-18808",
  storageBucket: "invitation-18808.firebasestorage.app",
  messagingSenderId: "483893238370",
  appId: "1:483893238370:web:7c5cee74b7acbe34004f3b",
  measurementId: "G-LGMXH9XQRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load and display all RSVPs from Firebase
async function loadRSVPs() {
  const rsvpList = document.getElementById('rsvpList');
  rsvpList.innerHTML = '';
  
  try {
    const q = query(collection(db, 'rsvps'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      rsvpList.innerHTML += `<div>${data.name}</div>`;
    });
  } catch (error) {
    console.error('Error loading RSVPs: ', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Load existing RSVPs when page loads
  loadRSVPs();
  
  // Handle RSVP form submission
  document.getElementById('rsvpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    
    try {
      // Save to Firebase
      await addDoc(collection(db, 'rsvps'), {
        name: name,
        timestamp: new Date()
      });
      
      // Reload the list
      loadRSVPs();
      
      // Clear the form
      document.getElementById('name').value = '';
    } catch (error) {
      console.error('Error adding RSVP: ', error);
      alert('Error submitting RSVP. Please try again.');
    }
  });
});