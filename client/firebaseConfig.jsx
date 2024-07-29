import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCAVJmsyvsGrd6TACUwFT9R5u0cHdjjwoE',
  authDomain: 'community-marketplace-7a998.firebaseapp.com',
  projectId: 'community-marketplace-7a998',
  storageBucket: 'community-marketplace-7a998.appspot.com',
  messagingSenderId: '777965208034',
  appId: '1:777965208034:web:63d71c74ccd5812c42f9bb',
  measurementId: 'G-54CDMSBGBB',
}
// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// export const analytics = getAnalytics(app)
