# HapiTS-PostgresMikro

Welcome to **HapiTS-PostgresMikro**! This repository provides a starting template for building applications with Hapi, TypeScript, Postgres, and MikroORM.

## Features

- **Hapi**: A rich framework for building applications and services.
- **TypeScript**: Strongly typed JavaScript that enhances code quality and developer productivity.
- **Postgres**: A powerful, open-source relational database.
- **MikroORM**: A TypeScript ORM for Node.js based on Data Mapper, Unit of Work, and Identity Map patterns.

## Getting Started

Follow these steps to get up and running with the HapiTS-PostgresMikro template.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later)
- [PostgreSQL](https://www.postgresql.org/) (you can use a local instance or a cloud service)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akhshyganesh/HapiTS-PostgresStarter.git
   cd HapiTS-PostgresMikro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your PostgreSQL connection string:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/your-database-name
   ```

### Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`. You should see your Hapi application running.

### Building for Production

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## Project Structure

```
.
├── src
│   ├── controllers
│   ├── entities
│   ├── routes
│   ├── services
│   ├── index.ts
│   ├── server.ts
│   └── ...
├── .env
├── .eslint.config.js
├── .gitignore
├── package.json
├── tsconfig.json
└── ...
```

- **src/controllers**: Handlers for your routes.
- **src/entities**: MikroORM entities.
- **src/routes**: Application routes.
- **src/services**: Business logic and services.
- **src/index.ts**: Entry point of the application.
- **src/index.ts**: Server logic of the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```
Feel free to modify this content to better suit your specific needs and project details.
Please do not forget to include this project license
```
