
# Lead Distributor Hub - MERN Stack Application

A comprehensive lead management system that allows administrators to manage agents and distribute leads efficiently.

## 🚀 Features

- **Admin Authentication**: Secure JWT-based login system
- **Agent Management**: Complete CRUD operations for managing sales agents
- **Lead Upload & Distribution**: Upload CSV/Excel files and automatically distribute leads among agents
- **Dashboard Analytics**: Visual overview of performance metrics and statistics
- **Responsive Design**: Modern UI built with React and Tailwind CSS

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **React Query** for data fetching
- **Sonner** for toast notifications

### Authentication
- JWT (JSON Web Tokens)
- Local storage for session persistence

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd lead-distributor-hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🔐 Demo Credentials

**Admin Login:**
- Email: `admin@leadhub.com`
- Password: `admin123`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout/         # Layout components
│   ├── ui/            # UI components (shadcn/ui)
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── pages/             # Page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Agents.tsx
│   ├── UploadLeads.tsx
│   └── Settings.tsx
├── hooks/             # Custom hooks
├── lib/               # Utility functions
└── App.tsx            # Main application component
```

## 🎯 Key Features

### 1. Authentication System
- Secure admin login with JWT tokens
- Session persistence
- Protected routes
- Automatic redirection

### 2. Agent Management
- Create, read, update, delete agents
- Agent performance tracking
- Contact information management
- Status management (active/inactive)

### 3. Lead Upload & Distribution
- Support for CSV, XLSX, and XLS files
- File validation and parsing
- Intelligent lead distribution algorithm
- Equal distribution among agents
- Handle remainder leads sequentially

### 4. Dashboard Analytics
- Real-time statistics
- Performance metrics
- Recent upload history
- Agent performance tracking

## 📊 File Format Requirements

When uploading lead files, ensure they contain the following columns:

| Column | Type | Description |
|--------|------|-------------|
| FirstName | Text | Lead's first name |
| Phone | Text | Phone number with country code |
| Notes | Text | Additional notes about the lead |

### Example CSV Format:
```csv
FirstName,Phone,Notes
John Doe,+1-555-0001,Interested in premium package
Jane Smith,+1-555-0002,Follow up next week
Mike Johnson,+1-555-0003,Budget constraints
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Frontend Configuration
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Lead Distributor Hub

# JWT Configuration (for backend)
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Database Configuration (for backend)
MONGODB_URI=mongodb://localhost:27017/leadhub
DB_NAME=leadhub

# Server Configuration (for backend)
PORT=3001
NODE_ENV=development
```

## 🚀 Backend Implementation Guide

To complete the full MERN stack, you'll need to implement the backend. Here's the recommended structure:

### Backend Dependencies
```bash
npm install express mongoose bcryptjs jsonwebtoken cors dotenv multer csv-parser xlsx
```

### Key Backend Models

**Admin Model (models/Admin.js):**
```javascript
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});
```

**Agent Model (models/Agent.js):**
```javascript
const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});
```

**Lead Model (models/Lead.js):**
```javascript
const leadSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  status: { type: String, enum: ['new', 'contacted', 'converted'], default: 'new' },
  uploadBatch: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current user

### Agents
- `GET /api/agents` - Get all agents
- `POST /api/agents` - Create new agent
- `PUT /api/agents/:id` - Update agent
- `DELETE /api/agents/:id` - Delete agent

### Leads
- `POST /api/leads/upload` - Upload and distribute leads
- `GET /api/leads` - Get all leads
- `GET /api/leads/agent/:agentId` - Get leads by agent

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🧪 Testing

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- File type validation for uploads
- CORS configuration

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 UI/UX Features

- Modern, clean interface
- Intuitive navigation
- Loading states and animations
- Toast notifications for user feedback
- Drag & drop file uploads
- Real-time data updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please contact the development team.

---

**Note:** This is the frontend implementation. To complete the full MERN stack application, implement the backend API using Node.js, Express, and MongoDB following the structure outlined above.
