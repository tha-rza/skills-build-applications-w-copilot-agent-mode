"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS middleware
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (_req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
// Codespaces-aware API URL support
const getAPIUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    return `http://localhost:${port}`;
};
// Health check endpoint
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        apiUrl: getAPIUrl(),
    });
});
// Users routes
app.get('/api/users/', (_req, res) => {
    res.json({ message: 'Get all users', data: [] });
});
app.post('/api/users/', (req, res) => {
    res.json({ message: 'Create new user', data: req.body });
});
app.get('/api/users/:id', (req, res) => {
    res.json({ message: `Get user ${req.params.id}`, data: {} });
});
app.put('/api/users/:id', (req, res) => {
    res.json({ message: `Update user ${req.params.id}`, data: req.body });
});
app.delete('/api/users/:id', (req, res) => {
    res.json({ message: `Delete user ${req.params.id}` });
});
// Teams routes
app.get('/api/teams/', (_req, res) => {
    res.json({ message: 'Get all teams', data: [] });
});
app.post('/api/teams/', (req, res) => {
    res.json({ message: 'Create new team', data: req.body });
});
app.get('/api/teams/:id', (req, res) => {
    res.json({ message: `Get team ${req.params.id}`, data: {} });
});
app.put('/api/teams/:id', (req, res) => {
    res.json({ message: `Update team ${req.params.id}`, data: req.body });
});
app.delete('/api/teams/:id', (req, res) => {
    res.json({ message: `Delete team ${req.params.id}` });
});
// Activities routes
app.get('/api/activities/', (_req, res) => {
    res.json({ message: 'Get all activities', data: [] });
});
app.post('/api/activities/', (req, res) => {
    res.json({ message: 'Log new activity', data: req.body });
});
app.get('/api/activities/:id', (req, res) => {
    res.json({ message: `Get activity ${req.params.id}`, data: {} });
});
app.put('/api/activities/:id', (req, res) => {
    res.json({ message: `Update activity ${req.params.id}`, data: req.body });
});
app.delete('/api/activities/:id', (req, res) => {
    res.json({ message: `Delete activity ${req.params.id}` });
});
// Leaderboard routes
app.get('/api/leaderboard/', (_req, res) => {
    res.json({ message: 'Get leaderboard', data: [] });
});
app.get('/api/leaderboard/team/:teamId', (req, res) => {
    res.json({ message: `Get leaderboard for team ${req.params.teamId}`, data: [] });
});
// Workouts routes
app.get('/api/workouts/', (_req, res) => {
    res.json({ message: 'Get suggested workouts', data: [] });
});
app.post('/api/workouts/', (req, res) => {
    res.json({ message: 'Create new workout', data: req.body });
});
app.get('/api/workouts/:id', (req, res) => {
    res.json({ message: `Get workout ${req.params.id}`, data: {} });
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API URL: ${getAPIUrl()}`);
});
