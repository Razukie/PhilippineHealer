import React, { useEffect, useState } from "react";
import "./UploadDashboard.css";
import { rtdb } from "../firebase";
import { ref as dbRef, onValue, update, remove } from "firebase/database";

export default function UploadDashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const feedbacksRef = dbRef(rtdb, "Feedbacks");
    const unsubscribe = onValue(feedbacksRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map((key) => ({ key, ...data[key] }));
      setItems(list.reverse());
    }, (err) => console.error(err));

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

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Dashboard</h2>
      <p>Approve or remove submitted feedback before it appears on the Gallery.</p>
      <div>
        {items.length === 0 && <p>No submissions yet.</p>}
        {items.map((it) => (
          <div key={it.key} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12, borderRadius: 8 }}>
            <div style={{ display: "flex", gap: 12 }}>
              {it.src && <img src={it.src} alt={it.title} style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }} />}
              <div style={{ flex: 1 }}>
                <strong>{it.title || "(no title)"}</strong>
                <div style={{ fontSize: 13, color: "#666" }}>{it.category}</div>
                <div style={{ marginTop: 8 }}>{it.description}</div>
                <div style={{ marginTop: 8, fontSize: 13 }}>
                  Author: {it.author || "—"} • Rating: {it.rating || "—"}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {!it.approved && (
                  <button onClick={() => handleApprove(it.key)} style={{ background: "#16a34a", color: "white", border: "none", padding: "8px 12px", borderRadius: 6 }}>
                    Approve
                  </button>
                )}
                <button onClick={() => handleDelete(it.key)} style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 12px", borderRadius: 6 }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
