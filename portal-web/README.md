# Warranty Tracer Portal - Web Frontend

React-based web application for the Warranty Tracer Portal. This frontend provides a modern, responsive interface for warranty management and tracking.

## Features

- User Authentication (Login/Register)
- Email Verification Flow
- Protected Routes
- Dashboard Interface
- Context-based State Management
- Responsive Design

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Build Tool:** Create React App
- **Styling:** CSS (with potential for UI library integration)

## Prerequisites

- Node.js 16+ and NPM
- Running Laravel backend API on http://localhost:8000

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The app is pre-configured to connect to the Laravel API at `http://localhost:8000`. If you need to change this, update the API base URL in your axios configuration or environment files.

### 3. Start Development Server

```bash
npm start
```

The application will open at: **http://localhost:3000**

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

The page will reload when you make changes. You may also see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

This command will remove the single build dependency from your project and copy all configuration files.

## Project Structure

```
portal-web/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/        # React components
│   ├── contexts/          # Context providers (AuthContext, etc.)
│   ├── App.js            # Main application component
│   ├── App.css           # Application styles
│   ├── index.js          # Application entry point
│   └── index.css         # Global styles
├── package.json
└── README.md
```

## Key Features

### Authentication Context

The application uses React Context API for managing authentication state across the app. This includes:
- User login/logout
- Token management
- Authentication state persistence
- Protected route handling

### Components

#### Existing Components
- Authentication components (Login, Register)
- Protected route wrapper
- Dashboard interface

### API Integration

The frontend communicates with the Laravel backend API at `http://localhost:8000/api`. Key endpoints used:
- `/register` - User registration
- `/login` - User authentication
- `/logout` - User logout
- `/user` - Get authenticated user
- `/dashboard` - Protected dashboard data

## Development Workflow

1. **Start the Backend API** (in a separate terminal):
   ```bash
   cd ../portal-api
   php artisan serve
   ```

2. **Start the React App**:
   ```bash
   npm start
   ```

3. **Access the Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Testing the Application

### Manual Testing Flow

1. Open http://localhost:3000
2. Click "Register" or "Create a new account"
3. Fill in registration details
4. Check Laravel logs for email verification link: `../portal-api/storage/logs/laravel.log`
5. Copy verification URL and open in browser
6. Login with your credentials
7. Access the protected dashboard

### Testing with Browser DevTools

Use the browser's Developer Tools (F12) to:
- Monitor network requests
- Check authentication tokens in localStorage/sessionStorage
- Debug component state
- View console errors

## Configuration

### API Base URL

To change the API endpoint, locate the axios configuration in your source files (typically in a service or config file) and update the base URL.

### Environment Variables

Create a `.env` file in the root if needed:
```env
REACT_APP_API_URL=http://localhost:8000
```

Then use in your code:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

## Common Issues

### CORS Errors
- Ensure the Laravel backend is running
- Verify CORS configuration in Laravel (`config/cors.php`)
- Check `SANCTUM_STATEFUL_DOMAINS` in Laravel's `.env`

### Authentication Issues
- Clear browser localStorage/sessionStorage
- Check if the token is being sent in request headers
- Verify the Laravel API is accepting the token

### Build Errors
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Check Node.js version compatibility

## Production Build

To create a production build:

```bash
npm run build
```

This creates an optimized production build in the `build` folder. The build is minified and ready for deployment.

### Deployment Options

- **Static Hosting:** Netlify, Vercel, GitHub Pages
- **Traditional Hosting:** Apache/Nginx server
- **Cloud Platforms:** AWS S3 + CloudFront, Azure Static Web Apps

## Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Router Documentation](https://reactrouter.com/)

## Support

For issues or questions:
1. Check browser console for errors
2. Review network tab for failed API requests
3. Ensure backend API is running and accessible
4. Check CORS configuration

## License

Proprietary software. All rights reserved.
