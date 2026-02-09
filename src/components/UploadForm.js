// src/components/UploadForm.js
import React, { useState } from "react";
import { storage, rtdb } from "./firebase";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push, set, serverTimestamp } from "firebase/database";
import "./UploadForm.css";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";


export default function UploadForm({ onUpload }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    file: null,
    title: "",
    category: "",
    description: "",
    author: "",
    rating: 5
  });
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, file }));

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpload = async () => {
    if (!formData.file) return alert("Select an image!");

    try {
      setUploading(true);
      const fileRef = storageRef(storage, `Feedbacks/${Date.now()}_${formData.file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, formData.file);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          console.error("Upload failed:", error);
          alert("Upload failed! Check console.");
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const feedbackRef = dbRef(rtdb, "Feedbacks");
          const newFeedbackRef = push(feedbackRef);

          await set(newFeedbackRef, {
            id: newFeedbackRef.key,
            src: downloadURL,
            category: formData.category,
            title: formData.title,
            description: formData.description,
            author: formData.author,
            rating: Number(formData.rating),
            approved: false,
            created: serverTimestamp()
          });

          alert("Feedback submitted successfully 🚀");

          setFormData({
            file: null,
            title: "",
            category: "",
            description: "",
            author: "",
            rating: 5
          });
          setPreview(null);
          setUploading(false);

          if (onUpload) onUpload();
          // navigate back to previous page after successful upload
          try { navigate(-1); } catch (e) { /* ignore if navigation fails */ }
        }
      );
    } catch (err) {
      console.error(err);
      alert("Upload failed! Check console.");
      setUploading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <div className="upload-card">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Back">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          

        </button>
        <h2 className="upload-title">Share Your Feedback</h2>

        <div className="file-input-container">
          <input type="file" id="fileInput" onChange={handleFileChange} />
          {preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <label htmlFor="fileInput" className="file-placeholder">
              📁 Click or Drag Image
            </label>
          )}
        </div>

        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} />
        
{/* Star rating input */}
<StarRating
  rating={formData.rating}
  onChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
/>



        <button className="submit-btn" onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Submit Feedback"}
        </button>
      </div>
    </div>
  );
}
