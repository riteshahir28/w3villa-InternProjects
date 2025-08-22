const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());  
app.use(express.json());

 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

 
const uploadFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

 
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage: storage });

 
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ message: "File uploaded successfully", file: req.file.filename });
});

 
app.get("/images", (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) return res.status(500).json({ message: "Cannot read files" });
    const images = files.map((file) => ({
      id: file, // file ka unique ID
      url: `http://localhost:5000/uploads/${file}`, // static URL serve
    }));
    res.json(images);
  });
});

// 3️⃣ Delete image
app.delete("/images/:id", (req, res) => {
  const filePath = path.join(uploadFolder, req.params.id);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ message: "Delete failed" });
    res.json({ message: "File deleted successfully" });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
