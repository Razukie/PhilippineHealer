import React, { useEffect, useState } from "react";
import "./UploadDashboard.css";
import { rtdb, auth} from "../firebase"; // make sure db is Firestore
import { ref as dbRef, onValue, update, remove } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";




export default function UploadDashboardModern() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("All");
  

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch feedbacks
  useEffect(() => {
    const feedbacksRef = dbRef(rtdb, "Feedbacks");
    const unsubscribe = onValue(
      feedbacksRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.keys(data).map((key) => ({ key, ...data[key] }));
        setItems(list.reverse());
      },
      (err) => console.error(err)
    );
    return () => unsubscribe();
  }, []);

  


  const handleApprove = async (key) => {
    try {
      await update(dbRef(rtdb, `Feedbacks/${key}`), { approved: true });
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  

  const handleDelete = async (key) => {
    if (!window.confirm("Delete this feedback?")) return;
    try {
      await remove(dbRef(rtdb, `Feedbacks/${key}`));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Filtered for main table
  const filteredItems =
    filter === "All"
      ? items
      : items.filter((it) =>
          filter === "Approved" ? it.approved : !it.approved
        );

  return (
    <div className="dashboard-modern">
      <aside className="sidebar">
        <div className="brand">Upload Dashboard</div>
        <ul className="sidebar-menu">
          <li
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All Feedbacks
          </li>
          <li
            className={filter === "Approved" ? "active" : ""}
            onClick={() => setFilter("Approved")}
          >
            Approved
          </li>
          <li
            className={filter === "Pending" ? "active" : ""}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          {user && (
            <div className="user-info">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" />
              ) : (
                <div className="user-initials">
                  {(user.displayName || user.email)
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
              )}
              <span>{user.displayName || user.email}</span>
            </div>
          )}
        </header>

        {/* Main Feedbacks Table */}
        <div className="table-container">
          <h2>All Feedbacks</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Author</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No feedbacks found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((it) => (
                  <tr key={it.key}>
                    <td>{it.title}</td>
                    <td>{it.category}</td>
                    <td>{it.description}</td>
                    <td>{it.author || "—"}</td>
                    <td
                      className={
                        it.approved ? "status-approved" : "status-pending"
                      }
                    >
                      {it.approved ? "Approved" : "Pending"}
                    </td>
                    <td>
                      {!it.approved && (
                        <button
                          className="btn-approve"
                          onClick={() => handleApprove(it.key)}
                        >
                          Approve
                        </button>
                      )}
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(it.key)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        


      </main>
    </div>
  );
}
