# Lanka Web

A comprehensive web application designed for LAN party communities to manage announcements and sitting arrangements.

## Description

Lanka Web is a full-stack application that provides LAN party organizers with tools to:
- Create and manage announcements using a rich text editor
- Design and organize sitting orders with an interactive canvas
- Authenticate users with JWT-based security
- Store and retrieve content with a SQLite database

## Tech Stack

### Frontend
- React 19.2.0 with TypeScript 5.9.3
- Remirror 3.0.3 for rich text editing
- Fabric.js 6.7.1 for canvas manipulation
- Bootstrap 5.3.8 for UI components
- Axios for HTTP requests
- JWT authentication

### Backend
- Node.js with Express 5.1.0
- SQLite3 5.1.7 for database
- JWT for authentication
- CORS enabled
- Multer for file uploads

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Git

**Or for Docker:**
- Docker
- Docker Compose

## Installation

### Option 1: Docker (Recommended for Production)

1. Clone the repository:
```bash
git clone https://github.com/Stef4nBr/lanka-web.git
cd lanka-web
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Edit `.env` and update the values (especially JWT_SECRET and ADMIN_PASSWORD)

4. Build and run with Docker Compose:
```bash
docker-compose up -d
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000`

5. To stop the application:
```bash
docker-compose down
```

6. To view logs:
```bash
docker-compose logs -f
```

### Option 2: Manual Installation

### Clone the Repository

```bash
git clone https://github.com/Stef4nBr/lanka-web.git
cd lanka-web
```

### Install Dependencies

Install concurrently globally (for running both servers):
```bash
npm run install-concurrently
```

Install all project dependencies:
```bash
npm run install-all
```

Or install manually:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

## Running the Application

### Run Both Frontend and Backend

```bash
npm run both
```

### Run Frontend Only

```bash
npm run frontend
```

The frontend will be available at `http://localhost:3000`

### Run Backend Only

```bash
npm run backend
```

The backend API will be available at `http://localhost:4000`

## Project Structure

```
lanka-web/
├── frontend/                 # React TypeScript application
│   ├── public/              # Static files
│   └── src/                 # Source code
│       ├── AuthModal.tsx    # Login modal component
│       ├── Fabric.tsx       # Canvas editor for sitting orders
│       ├── LeandingPage.tsx # Main application page
│       ├── MdxEditor.tsx    # Rich text editor component
│       ├── NavBar.tsx       # Navigation bar
│       ├── Logo.tsx         # Logo component
│       └── utils/           # Utility functions
├── backend/                 # Node.js Express API
│   ├── routes/             # API route handlers
│   │   ├── auth.js         # Authentication routes
│   │   └── content.js      # Content management routes
│   ├── database.js         # Database configuration
│   ├── data.db            # SQLite database file
│   ├── index.js           # Express server entry point
│   └── .env               # Environment variables (not in git)
└── package.json           # Root package configuration
```

## Features

### Announcements System
- Rich text editor with comprehensive formatting options
- Bold, italic, underline, strikethrough, code formatting
- Headings, lists, blockquotes
- Tables with full editing capabilities
- Links and images
- Text highlighting and alignment
- Line height and indentation controls
- Auto-save to localStorage
- Server-side persistence

### Sitting Order Manager
- Interactive canvas-based editor
- Drag and drop positioning
- Add custom shapes and text
- Image library for common items
- Clone and delete controls
- Color customization
- Save and load layouts
- Export and share arrangements

### Authentication
- JWT-based authentication
- Secure login system
- Token validation
- User-specific content management

## API Endpoints

### Authentication
- `POST /api/auth/sign-in` - User login

### Content Management
- `GET /api/content/load/:username` - Load user content
- `POST /api/content/save` - Save user content

## Development

### Build Frontend for Production

```bash
npm run frontend:build
```

The optimized build will be created in the `frontend/build` directory.

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
# JWT Configuration
JWT_SECRET=your_secret_key_here

# Database Configuration
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password

# Server Configuration
PORT=4000
```

**Important:** The `.env` file contains sensitive information and should never be committed to version control. Make sure it's listed in your `.gitignore` file.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License

## Author

StefanBr

## Repository

https://github.com/Stef4nBr/lanka-web

## Issues

Report issues at: https://github.com/Stef4nBr/lanka-web/issues

## Acknowledgments

- Remirror for the excellent rich text editing framework
- Fabric.js for powerful canvas manipulation
- The LAN party community for inspiration
