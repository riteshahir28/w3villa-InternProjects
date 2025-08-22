# Image Gallery - React Frontend

A beautiful, responsive React frontend for the Multer Image Upload application, built with Bootstrap 5 and modern UI/UX principles.

## ✨ Features

- **Modern Bootstrap Design**: Clean, responsive interface using Bootstrap 5 components
- **Image Upload**: Drag & drop or click to upload images with real-time feedback
- **Image Gallery**: Beautiful grid layout with hover effects and animations
- **Image Preview**: Click on images to view them in a modal with full-size preview
- **Delete Functionality**: Remove images with confirmation dialogs
- **Loading States**: Smooth loading indicators and progress feedback
- **Error Handling**: User-friendly error messages and validation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Accessibility**: WCAG compliant with proper focus management and screen reader support

## 🎨 Design Highlights

- **Gradient Background**: Beautiful purple gradient background
- **Card-based Layout**: Modern card design with shadows and hover effects
- **Smooth Animations**: CSS transitions and keyframe animations
- **Bootstrap Icons**: Professional iconography throughout the interface
- **Custom Styling**: Enhanced Bootstrap components with custom CSS
- **Dark Navigation**: Elegant dark navbar with image counter

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd Frontend/multerFrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 📦 Dependencies

- **React 19**: Latest React with hooks and modern features
- **Bootstrap 5**: CSS framework for responsive design
- **React Bootstrap**: Bootstrap components for React
- **Axios**: HTTP client for API communication
- **Vite**: Fast build tool and development server

## 🎯 Usage

### Uploading Images

1. Click the "Choose Image File" button or drag an image to the upload area
2. Select an image file (JPG, PNG, GIF, WebP supported)
3. Click "Upload Image" to upload to the server
4. The image will appear in the gallery below

### Viewing Images

- Click on any image thumbnail to open it in a preview modal
- Use the "Open in New Tab" button to view the full-size image
- Images are displayed in a responsive grid layout

### Managing Images

- Hover over images to see the delete button
- Click the trash icon to remove an image (with confirmation)
- The image counter in the navbar shows the total number of images

## 🎨 Customization

### Colors and Themes

The app uses a custom color scheme defined in `App.css`:

- **Primary Gradient**: `#667eea` to `#764ba2`
- **Card Shadows**: Subtle shadows with hover effects
- **Button Styling**: Custom border radius and hover animations

### Responsive Breakpoints

- **Mobile**: 1 column layout
- **Tablet**: 2-3 column layout
- **Desktop**: 4-5 column layout
- **Large Desktop**: 5+ column layout

## 🔧 Development

### Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Custom styles and animations
├── index.css        # Global styles and resets
└── main.jsx         # Application entry point
```

### Key Components

- **Upload Section**: File input and upload button with validation
- **Image Gallery**: Responsive grid of uploaded images
- **Image Modal**: Full-size image preview with actions
- **Navigation**: Header with app title and image counter
- **Alerts**: Success, error, and warning messages

### API Integration

The frontend communicates with the backend API:

- `GET /images` - Fetch all uploaded images
- `POST /upload` - Upload a new image
- `DELETE /images/:id` - Delete an image by ID

## 🎉 Features in Detail

### Upload Experience

- **File Validation**: Only image files are accepted
- **Progress Feedback**: Loading spinner during upload
- **Success Messages**: Clear feedback on successful upload
- **Error Handling**: User-friendly error messages

### Gallery Experience

- **Responsive Grid**: Automatically adjusts to screen size
- **Hover Effects**: Cards lift and scale on hover
- **Quick Actions**: Delete button appears on hover
- **Empty State**: Helpful message when no images exist

### Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG AA compliant color ratios

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
