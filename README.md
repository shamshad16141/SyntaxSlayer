# SyntaxSlayer

A web application for learning and practicing coding syntax.

## Project Structure

```
SyntaxSlayer/
├── index.html              # Main frontend entry point
├── css/
│   └── style.css          # Frontend styles
├── assets/                 # Static assets
│   ├── audio/
│   ├── img/
│   └── video/
└── syntax-slayer-backend/  # Node.js backend server
    ├── package.json
    └── server.js
```

## Local Setup

### Prerequisites

- Node.js (v14 or higher)
- Git
- A code editor (VS Code recommended)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd syntax-slayer-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

The backend server will run on the configured port (check `server.js` for details).

### Frontend Setup

1. Open `index.html` in your browser, or
2. Use a local server to serve the files:
   ```bash
   npx http-server
   ```
   Then navigate to `http://localhost:8080` (or the port shown in terminal)

## Git Workflow

### Initialize Git Repository (First Time Only)

If the project is not already a git repository:

```bash
git init
```

### Make Changes and Commit

1. Make changes to your files
2. Stage changes:
   ```bash
   git add .
   ```
   Or stage specific files:
   ```bash
   git add path/to/file
   ```

3. Commit your changes:
   ```bash
   git commit -m "Your descriptive commit message"
   ```



## Development

- Edit HTML files in the root directory
- Update styles in `css/style.css`
- Add media files to `assets/` subdirectories
- Modify backend logic in `syntax-slayer-backend/server.js`

## Troubleshooting

- **Port already in use**: Change the port in `server.js` or kill the process using the port
- **Module not found**: Run `npm install` in the backend directory
- **Git authentication**: Use SSH keys or personal access tokens if pushing fails

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is free and permissive, allowing you to use, modify, and distribute this software freely.
