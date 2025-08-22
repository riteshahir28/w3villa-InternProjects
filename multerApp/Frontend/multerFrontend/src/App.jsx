import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
  Modal,
  Badge,
  Navbar,
  Nav
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/images");
      setImages(res.data);
      setMessage({ text: "", type: "" });
    } catch (error) {
      setMessage({ text: "Failed to fetch images", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setMessage({ text: "Please select an image file", type: "warning" });
        return;
      }
      setFile(selectedFile);
      setMessage({ text: `Selected: ${selectedFile.name}`, type: "info" });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ text: "Please select a file first", type: "warning" });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      setMessage({ text: "File uploaded successfully!", type: "success" });
      fetchImages();
      document.getElementById('fileInput').value = '';
    } catch (error) {
      setMessage({ text: "Upload failed. Please try again.", type: "danger" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(`http://localhost:5000/images/${id}`);
        setMessage({ text: "Image deleted successfully!", type: "success" });
        fetchImages();
      } catch (error) {
        setMessage({ text: "Delete failed. Please try again.", type: "danger" });
      }
    }
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <>
      {/* Simple Header */}
      <div className="bg-primary text-white py-3 mb-4">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Image Gallery</h4>
            <Badge bg="light" text="dark">
              {images.length} Images
            </Badge>
          </div>
        </Container>
      </div>

      <Container className="py-2">
        {/* Upload Section */}
        <Row className="mb-4">
          <Col lg={8} md={10} className="mx-auto">
            <Card className="border">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Upload New Image</h5>
              </Card.Header>
              <Card.Body>
                {message.text && (
                  <Alert variant={message.type} dismissible onClose={() => setMessage({ text: "", type: "" })}>
                    {message.text}
                  </Alert>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Choose Image File</Form.Label>
                  <Form.Control
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                  <small className="text-muted">Supported: JPG, PNG, GIF, WebP</small>
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="w-100"
                >
                  {uploading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Uploading...
                    </>
                  ) : (
                    "Upload Image"
                  )}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Images Gallery */}
        <Row>
          <Col>
            <h5 className="mb-3 text-center">Image Gallery</h5>

            {loading ? (
              <div className="text-center py-4">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-2">Loading images...</p>
              </div>
            ) : images.length === 0 ? (
              <Card className="text-center py-4 border">
                <Card.Body>
                  <h6 className="text-muted">No images uploaded yet</h6>
                  <p className="text-muted mb-0">Upload your first image to get started!</p>
                </Card.Body>
              </Card>
            ) : (
              <Row xs={2} sm={3} md={4} lg={5} className="g-3">
                {images.map((img) => (
                  <Col key={img.id}>
                    <Card className="h-100 border">
                      <div className="position-relative">
                        <Card.Img
                          variant="top"
                          src={img.url}
                          alt="Uploaded image"
                          style={{
                            height: '150px',
                            objectFit: 'cover',
                            cursor: 'pointer'
                          }}
                          onClick={() => openImageModal(img)}
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          className="position-absolute top-0 end-0 m-1"
                          onClick={() => handleDelete(img.id)}
                          style={{ zIndex: 10, padding: '2px 6px' }}
                        >
                          ×
                        </Button>
                      </div>
                      <Card.Body className="p-2">
                        <small className="text-muted d-block text-truncate">
                          {img.id}
                        </small>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      {/* Image Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <img
              src={selectedImage.url}
              alt="Full size"
              className="img-fluid"
              style={{ maxHeight: '60vh' }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {selectedImage && (
            <Button
              variant="primary"
              onClick={() => {
                window.open(selectedImage.url, '_blank');
                setShowModal(false);
              }}
            >
              Open in New Tab
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
