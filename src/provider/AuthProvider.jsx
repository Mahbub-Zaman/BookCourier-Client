import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

// Create Auth Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Google provider
    const googleProvider = new GoogleAuthProvider();

    // Create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign in with email and password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign in with Google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Update user profile
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    };

    // Reset password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Sign out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Observer for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Auth info to be shared
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        updateUserProfile,
        resetPassword,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;