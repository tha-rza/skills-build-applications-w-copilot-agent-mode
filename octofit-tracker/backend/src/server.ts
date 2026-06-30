import express = require('express');
import { connectDatabase } from './config/database';
import { Activity } from './models/activity.model';
import { Leaderboard } from './models/leaderboard.model';
import { Team } from './models/team.model';
import { User } from './models/user.model';
import { Workout } from './models/workout.model';

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

const getAPIUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  return `http://localhost:${port}`;
};

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    apiUrl: getAPIUrl(),
  });
});

app.get('/api/users/', async (_req, res) => {
  try {
    const users = await User.find().populate('team').lean();
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users' });
  }
});

app.post('/api/users/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user', details: error instanceof Error ? error.message : error });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('team').lean();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ data: user });
  } catch (error) {
    res.status(400).json({ error: 'Unable to update user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: `Deleted user ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete user' });
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members').lean();
    res.json({ data: teams });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load teams' });
  }
});

app.post('/api/teams/', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ data: team });
  } catch (error) {
    res.status(400).json({ error: 'Unable to create team' });
  }
});

app.get('/api/teams/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members').lean();
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ data: team });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load team' });
  }
});

app.put('/api/teams/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ data: team });
  } catch (error) {
    res.status(400).json({ error: 'Unable to update team' });
  }
});

app.delete('/api/teams/:id', async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: `Deleted team ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete team' });
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user team').sort({ performedAt: -1 }).lean();
    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load activities' });
  }
});

app.post('/api/activities/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ data: activity });
  } catch (error) {
    res.status(400).json({ error: 'Unable to create activity' });
  }
});

app.get('/api/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('user team').lean();
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ data: activity });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load activity' });
  }
});

app.put('/api/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ data: activity });
  } catch (error) {
    res.status(400).json({ error: 'Unable to update activity' });
  }
});

app.delete('/api/activities/:id', async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: `Deleted activity ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete activity' });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().populate('team user').sort({ points: -1 }).lean();
    res.json({ data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load leaderboard' });
  }
});

app.get('/api/leaderboard/team/:teamId', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find({ team: req.params.teamId }).populate('user').sort({ points: -1 }).lean();
    res.json({ data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load team leaderboard' });
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('recommendedFor').lean();
    res.json({ data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workouts' });
  }
});

app.post('/api/workouts/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ data: workout });
  } catch (error) {
    res.status(400).json({ error: 'Unable to create workout' });
  }
});

app.get('/api/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('recommendedFor').lean();
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workout' });
  }
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API URL: ${getAPIUrl()}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
