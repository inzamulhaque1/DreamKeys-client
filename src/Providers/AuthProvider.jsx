import { createContext, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        setUser(result.user); // Update user state after registration
        setLoading(false);
        return result;
      }
    );
  };

  const updateUserProfile = (user, name, photo) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: photo,
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useState(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    //   if (currentUser) {
    //     // get token and store
    //     const userInfo = {email: currentUser.email}
    //     axiosPublic.post('jwt', userInfo)
    //     .then(res => {
    //       if(res.data.token){
    //         localStorage.setItem('access-token', res.data.token)
    //       }
    //     })
    //   } else {
    //     // do something
    //     localStorage.removeItem('access-token')
    //   }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    createUser,
    setUser,
    loading,
    user,
    updateUserProfile,
    signIn,
    logOut
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
