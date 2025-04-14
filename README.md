> **Note:** If you're looking for legacy v1.0.0 version of this project, please check [here](https://github.com/akhshyganesh/HapiTS-PostgresStarter/tree/legacy/v1.0.0) or visit https://github.com/akhshyganesh/HapiTS-PostgresStarter/tree/legacy/v1.0.0.

# Hapi PostgreSQL TypeScript Starter Kit

A production-ready starter kit for building RESTful APIs with Hapi.js, PostgreSQL, and TypeScript. Includes a React client application for testing and interacting with the API.

## Features

### Server
- **Framework**: Hapi.js
- **Database**: PostgreSQL with MikroORM
- **Language**: TypeScript
- **Authentication**: JWT
- **Authorization**: Role-based access control
- **Validation**: Joi
- **Error Handling**: Centralized with structured responses
- **Logging**: Winston for logging and request tracking
- **Testing**: Jest for unit and integration testing
- **Linting**: ESLint with Prettier
- **Git Hooks**: Husky for pre-commit linting

### Client
- **Framework**: React
- **Routing**: React Router
- **HTTP Client**: Axios
- **UI**: Tailwind CSS with responsive design
- **Authentication**: JWT token storage and management
- **Form Validation**: Client-side validation

## Project Structure
```
├── src/                  # Server-side code
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── entities/         # Database entity models
│   ├── middleware/       # Custom middleware
│   │   ├── auth/         # Authentication middleware
│   │   └── logging/      # Logging middleware
│   ├── migrations/       # Database migrations
│   ├── routes/           # API routes
│   ├── schemas/          # Validation schemas
│   ├── seeders/          # Database seeders
│   ├── services/         # Business logic
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
│       └── response/     # Response formatters
│
├── client/               # Client-side code
│   ├── public/           # Static files
│   └── src/
│       ├── components/   # React components
│       └── services/     # API service layer
│
├── tests/                # Test files
├── .env.example          # Environment variables example
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── jest.config.js        # Jest configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL (v14 or higher)

### Server Installation

1. Clone the repository
```bash
git clone https://github.com/akhshyganesh/HapiTS-PostgresStarter.git
cd HapiTS-PostgresStarter
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit the .env file with your configuration
```

4. Start the development server
```bash
npm run dev
```

### Client Installation

1. Navigate to the client directory
```bash
cd client
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The client will run on http://localhost:3001 by default, while the API server runs on http://localhost:3000.

### Scripts

#### Server
- `npm run build` - Build the project
- `npm run start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run mikro:create-migration` - Create a new database migration
- `npm run mikro:migrate` - Run database migrations
- `npm run mikro:revert` - Revert the last migration
- `npm run mikro:pending` - Show pending migrations

#### Client
- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm run test` - Run tests

## API Documentation

### Authentication

- `POST /api/auth/login` - User login
  - Request body: `{ email: string, password: string }`
  - Response: `{ token: string, user: { id: string, email: string, firstName: string, lastName: string, role: string } }`

### Users

- `GET /api/users` - Get all users (Admin only)
  - Response: `[{ id: string, email: string, firstName: string, lastName: string, role: string, isActive: boolean }]`

- `GET /api/users/{id}` - Get user by ID
  - Response: `{ id: string, email: string, firstName: string, lastName: string, role: string, isActive: boolean }`

- `POST /api/users` - Create a new user (Admin only)
  - Request body: `{ email: string, password: string, firstName: string, lastName: string, role: "user"|"admin", isActive: boolean }`
  - Response: `{ id: string, email: string, firstName: string, lastName: string, role: string, isActive: boolean }`

- `PUT /api/users/{id}` - Update user (Admin only)
  - Request body: `{ email?: string, firstName?: string, lastName?: string, role?: "user"|"admin", isActive?: boolean }`
  - Response: `{ id: string, email: string, firstName: string, lastName: string, role: string, isActive: boolean }`

- `DELETE /api/users/{id}` - Delete user (Admin only)
  - Response: `{ message: "User deleted successfully" }`

### Health Check

- `GET /health` - Check API health status
  - Response: `{ status: "ok", timestamp: string, uptime: number }`

## Response Format

All API responses follow this structure:

```json
{
  "isOk": true|false,
  "data": {},
  "error": {
    "message": "Error message",
    "code": 400,
    "details": {}
  }
}
```

## Client Application

The included React client application provides a user interface for interacting with the API:

- **Authentication**: Login screen with JWT token management
- **User Management**: View, create, update, and delete users
- **Health Check**: Check the API health status
- **Role-Based UI**: Different UI elements based on user permissions
- **Responsive Design**: Built with Tailwind CSS for a responsive layout

### Client Features

- **Protected Routes**: Routes that require authentication
- **Automatic Token Handling**: JWT tokens are automatically added to requests
- **Error Handling**: Appropriate error display and handling
- **Form Validation**: Client-side validation before submission
- **Logout**: Proper session termination

## Security Considerations

- JWT authentication for secure API access
- Role-based authorization for user actions
- Password hashing with bcrypt
- CORS configuration for API security
- Client-side token storage with proper expiration handling

## Development Considerations

### Server
- TypeScript for type safety
- ESLint and Prettier for code quality
- Jest for testing
- Winston for logging
- MikroORM for database operations with PostgreSQL
- Path aliases for cleaner imports (e.g., `@/controllers` instead of `../../../controllers`)

#### Path Aliases
The project uses TypeScript path aliases for cleaner imports:
- Configure in `tsconfig.json` with the `paths` option
- For Jest tests, these aliases are mapped in `jest.config.js` using `moduleNameMapper`

#### Database Configuration
The project uses MikroORM with PostgreSQL:
- Entity definitions in `src/entities/`
- Database configuration in `src/config/mikro-orm.config.ts`
- Migration files in `src/migrations/`
- Seeders for initial data in `src/seeders/`

#### Testing Configuration
For proper test configuration:
- Tests are organized in `tests/` directory
- Integration tests use a test database specified in the `.env.test` file
- `tests/setup.ts` configures the test environment
- The test environment uses a separate database to avoid conflicts with development

Example Jest configuration:
```js
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  testTimeout: 30000,
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts'
  ],
  coverageReporters: ['text', 'lcov'],
  testMatch: ['**/*.test.ts'],
  setupFilesAfterEnv: ['./tests/setup.ts']
};
```

### Client
- React Hooks for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- Component-based architecture

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```
Feel free to modify this content to better suit your specific needs and project details.
Please do not forget to include this project license
```
