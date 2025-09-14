# Leads Dashboard

<img width="1919" height="917" alt="image" src="https://github.com/user-attachments/assets/d35491cf-adfa-4e3d-a0cd-8544b2460410" />


# features and filters
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/e47f6608-127a-4ed1-a567-813467648580" />


<img width="1897" height="912" alt="image" src="https://github.com/user-attachments/assets/27b2bae3-3a9c-4332-a3a5-966750277346" />





# 🚀 CivilGuruji Lead Management System

A modern, full-stack lead management application built with React, Node.js, and MongoDB. This application provides a comprehensive solution for managing leads with advanced filtering, real-time validation, and a beautiful user interface.

![Lead Management Dashboard](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-blue)

---

## ✨ Features

### 🎯 Core Functionality
- **Lead Management**: Create, view, and manage leads efficiently
- **Real-time Validation**: Comprehensive form validation with instant feedback
- **Advanced Filtering**: Multi-criteria filtering with AND/OR logic
- **Search Functionality**: Quick search across name, email, and phone
- **Responsive Design**: Beautiful UI that works on all devices

### 🔍 Advanced Filtering System
- **Multiple Filter Fields**: Name, Contact, Email, Status, Qualification, Interest, Source, Assigned To, City, State
- **Filter Operators**: Equals, Contains, Starts with, Ends with
- **Match Conditions**: AND (all conditions) or OR (any condition)
- **Dynamic Filter Management**: Add/remove filters on the fly
- **Real-time Results**: Filters apply instantly as you type

### 📊 Lead Management Features
- **Lead Status Tracking**: New, Follow-Up, Qualified, Converted
- **Qualification Levels**: High School, Bachelors, Masters, PhD, Other
- **Interest Categories**: Web Development, Mobile Development, Data Science, Digital Marketing, UI/UX Design
- **Source Tracking**: Website, Email Campaign, Cold Call, Social Media
- **Assignment Management**: Assign leads to team members

### 🛡️ Data Validation
- **Email Validation**: Proper email format validation
- **Phone Number Validation**: International phone number support with formatting
- **Required Field Validation**: Ensures data integrity
- **Length Validation**: Prevents data overflow
- **Year Validation**: Validates passout year ranges

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form management and validation
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd civilGuruji-frontend-backend
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../lead-task-fullstack-enhanced
   npm install
   ```

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the connection string in `backend/index.js` if needed
   - Default connection: `mongodb://localhost:27017/civilguruji-leads`

5. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:4000
   ```

6. **Start the Frontend Development Server**
   ```bash
   cd lead-task-fullstack-enhanced
   npm run dev
   # Frontend runs on http://localhost:5173
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

---

## 📁 Project Structure

```
civilGuruji-frontend-backend/
├── backend/                          # Backend API
│   ├── model/
│   │   └── leadSchema.js            # MongoDB schema
│   ├── routes/
│   │   └── leads.js                 # API routes
│   ├── index.js                     # Server entry point
│   └── package.json
├── lead-task-fullstack-enhanced/     # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddLeadModal.tsx     # Lead creation modal
│   │   │   ├── LeadsTable.tsx       # Main leads table
│   │   │   ├── Header.tsx           # App header
│   │   │   └── Sidebar.tsx          # Navigation sidebar
│   │   ├── pages/
│   │   │   └── App.tsx              # Main app component
│   │   ├── services/
│   │   │   └── leadService.ts       # API service layer
│   │   ├── types/
│   │   │   └── lead.ts              # TypeScript interfaces
│   │   └── data/
│   │       └── sampleLeads.ts        # Sample data
│   ├── package.json
│   └── README.md
└── README.md
```

---

## 🔌 API Endpoints

### Lead Management
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create a new lead

### Request/Response Examples

**Create Lead**
```bash
POST /api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "contact": "123-456-7890",
  "email": "john@example.com",
  "qualification": "Bachelors",
  "interest": "Web Development",
  "source": "Website",
  "assignedTo": "Jane Smith"
}
```

**Response**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "contact": "123-456-7890",
    "email": "john@example.com",
    "status": "New",
    "qualification": "Bachelors",
    "interest": "Web Development",
    "source": "Website",
    "assignedTo": "Jane Smith",
    "updatedAt": "Sep 14, 2025 2:30 PM"
  }
}
```

---

## 🎨 UI/UX Features

### Modern Design
- **Clean Interface**: Minimalist design with focus on usability
- **Color-coded Status**: Visual status indicators for quick recognition
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Smooth loading animations and error handling
- **Interactive Elements**: Hover effects and smooth transitions

### User Experience
- **Real-time Validation**: Instant feedback on form inputs
- **Smart Filtering**: Advanced filtering with multiple criteria
- **Keyboard Navigation**: Full keyboard accessibility
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Clear confirmation of actions

---

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd lead-task-fullstack-enhanced
   vercel
   ```

3. **Set Environment Variables**
   - `VITE_API_URL`: Your backend API URL

### Backend Deployment (Railway/Render)
1. **Prepare for deployment**
   - Add `start` script to package.json
   - Set up environment variables
   - Configure MongoDB Atlas

2. **Deploy to Railway**
   ```bash
   cd backend
   railway login
   railway init
   railway up
   ```

### Environment Variables
```env
# Backend
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/civilguruji-leads
PORT=4000

# Frontend
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create new lead with valid data
- [ ] Test form validation with invalid data
- [ ] Verify advanced filtering functionality
- [ ] Test search functionality
- [ ] Check responsive design on different screen sizes
- [ ] Test error handling scenarios

### Test Data
The application includes sample data for testing purposes. You can also create your own test leads using the "Add New Lead" button.

---

## 🔧 Configuration

### MongoDB Configuration
Update the connection string in `backend/index.js`:
```javascript
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/civilguruji-leads';
```

### API Configuration
Update the API base URL in `lead-task-fullstack-enhanced/src/services/leadService.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ by the CivilGuruji development team.

---

## 📞 Support

For support, email support@civilguruji.com or create an issue in the repository.

---

## 🎯 Future Enhancements

- [ ] Lead editing and deletion
- [ ] Bulk operations
- [ ] Export functionality (CSV, PDF)
- [ ] Email notifications
- [ ] Dashboard analytics
- [ ] User authentication
- [ ] Role-based access control
- [ ] API rate limiting
- [ ] Automated testing
- [ ] CI/CD pipeline

---

**Made with ❤️ using React, Node.js, and MongoDB**
