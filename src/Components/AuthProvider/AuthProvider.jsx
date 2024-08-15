import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import userAxiosPublic from "../Hook/userAxiosPublic";
import { auth } from "../../Firebase/Firebase.config";

export const AuthContext = createContext(null);
const axiosSecure = userAxiosPublic();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // User create
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google sign in
  const googleSignIn = (role) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider,role);
  };

  // Sign out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // JWT start
      if (currentUser) {
        // Get token and store on client
        const userInfo = { email: currentUser.email };
        axiosSecure.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
              setLoading(false);
            }
          })
          .catch(err => {
            console.error('Error fetching JWT token:', err);
            setLoading(false);
          });
      } else {
        // Remove token if user is not logged in
        localStorage.removeItem('access-token');
        setLoading(false);
      }
      // JWT end

      console.log("Current user: ", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [axiosSecure]);

  // Send user info
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
