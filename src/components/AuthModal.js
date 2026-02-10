import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./AuthModal.css";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser && currentUser.displayName) {
        const parts = currentUser.displayName.split(" ");
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
      } else {
        setFirstName("");
        setLastName("");
      }

      // Load additional profile info from Firestore
      if (currentUser) {
        const ref = doc(db, "users", currentUser.uid);
        getDoc(ref)
          .then((snap) => {
            if (snap.exists()) {
              const data = snap.data();
              setPhone(data.phone || "");
              setGender(data.gender || "");
              setDob(data.dob || "");
            }
          })
          .catch(() => {});
      } else {
        setPhone("");
        setGender("");
        setDob("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Sign in
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Register
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const displayName = `${firstName.trim()} ${lastName.trim()}`.trim();

        if (displayName) {
          await updateProfile(cred.user, { displayName });
        }

        // Save extra profile fields to Firestore
        try {
         await setDoc(doc(db, "users", cred.user.uid), {
  firstName: firstName,
  lastName: lastName,
  email: cred.user.email,
  phone: phone || "",
  gender: gender || "",
  dob: dob || "",
});


        } catch (e) {
          // ignore write errors
        }
      }

      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };




  const handleGoogleLogin = async () => {
  setError("");
  setLoading(true);

  try {
    const provider = new GoogleAuthProvider();

    // Login with Google
    const result = await signInWithPopup(auth, provider);
  const gUser = result.user;

  const names = (gUser.displayName || "").split(" ");

  await setDoc(
    doc(db, "users", gUser.uid),
    {
      firstName: names[0] || "",
      lastName: names.slice(1).join(" ") || "",
      email: gUser.email,
    },
    { merge: true }
  );


  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!auth.currentUser) throw new Error("Not signed in");
      const displayName = `${firstName.trim()} ${lastName.trim()}`.trim();

      await updateProfile(auth.currentUser, { displayName });

      // Save extra profile fields to Firestore
      try {
        await setDoc(
          doc(db, "users", auth.currentUser.uid),
          {
            phone: phone || "",
            gender: gender || "",
            dob: dob || "",
          },
          { merge: true }
        );
      } catch (e) {}

      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ✕
        </button>

        {user ? (
          // Logged in state
          <div className="auth-logged-in">
            <div className="user-profile">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User Avatar" className="user-avatar" />
              ) : (
                <div className="user-initials">
                  {(user.displayName || user.email || "")
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
              )}

              <h3 className="user-name">{user.displayName || user.email}</h3>
              <p className="user-email">{user.email}</p>
            </div>

            {editing ? (
              <form onSubmit={handleUpdateProfile} className="edit-profile-form">
                <div className="form-row">
                  <input
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="edit-actions">
                  <button type="submit" className="auth-submit-btn" disabled={loading}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="auth-google-btn"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="auth-actions">
                <button className="auth-primary-btn" onClick={() => setEditing(true)}>
                  Edit Profile
                </button>
                <button className="auth-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Login/Register state
          <div className="auth-form">
            <h2 className="auth-modal-title">{isLogin ? "Login" : "Register"}</h2>

            {/* Google Login Button */}
            <button
              className="auth-google-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              {isLogin ? "Login with Google" : "Sign up with Google"}
            </button>

            <div className="auth-divider">OR</div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailAuth}>
              {!isLogin && (
                <div className="form-row">
                  <input
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? "Loading..." : isLogin ? "Login" : "Create Account"}
              </button>
            </form>

            {/* Toggle between Login and Register */}
            <div className="auth-toggle">
              {isLogin ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="auth-toggle-btn"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="auth-toggle-btn"
                  >
                    Login here
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
