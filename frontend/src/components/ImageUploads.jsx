import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

/**
 * Handles selecting a file, uploading it to /api/upload,
 * and returning the uploaded image URL to the parent.
 */
function ImageUpload({ onUpload }) {
  const { token } = useAuth(); // <- need token because route is protected
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");

  // 🔼 When the user picks a file
  const handleSelect = (e) => {
    const chosen = e.target.files[0];
    setFile(chosen);
    setPreview(URL.createObjectURL(chosen)); // local preview
  };

  // 🔼 Upload to backend
  const handleUpload = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✔️ JWT header
        },
      });

      setMsg("Uploaded successfully");
      onUpload(res.data.fileUrl); // <- Gives parent the URL (/uploads/filename.jpg)
    } catch (err) {
      console.error(err);
      setMsg("Upload failed");
    }
  };

  return (
    <>
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="img-fluid mb-2"
          style={{ maxHeight: 200 }}
        />
      )}
      <input
        type="file"
        onChange={handleSelect}
        className="form-control mb-2"
        accept="image/*"
      />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleUpload}
      >
        📸 Upload Image
      </button>
      {msg && <p className="small text-muted mt-1">{msg}</p>}
    </>
  );
}

export default ImageUpload;
