import { connectDatabase, disconnectDatabase } from '../db';
import { Activity } from '../models/activity.model';
import { Leaderboard } from '../models/leaderboard.model';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { Workout } from '../models/workout.model';

const runSeed = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.create([
    {
      name: 'Velocity Squad',
      description: 'A high-energy endurance team chasing weekly milestones.',
      members: [],
      weeklyGoal: '80 km running / 3 strength sessions',
    },
    {
      name: 'Iron Collective',
      description: 'Strength-focused athletes working on power and recovery.',
      members: [],
      weeklyGoal: '4 lifting sessions / 2 mobility workouts',
    },
  ]);

  const users = await User.create([
    {
      name: 'Ariana Wells',
      email: 'ariana.wells@example.com',
      role: 'athlete',
      team: teams[0]._id,
      totalPoints: 1240,
    },
    {
      name: 'Malik Rivera',
      email: 'malik.rivera@example.com',
      role: 'athlete',
      team: teams[0]._id,
      totalPoints: 1085,
    },
    {
      name: 'Elena Park',
      email: 'elena.park@example.com',
      role: 'coach',
      team: teams[0]._id,
      totalPoints: 520,
    },
    {
      name: 'Jonas Ford',
      email: 'jonas.ford@example.com',
      role: 'athlete',
      team: teams[1]._id,
      totalPoints: 1535,
    },
    {
      name: 'Priya Shah',
      email: 'priya.shah@example.com',
      role: 'athlete',
      team: teams[1]._id,
      totalPoints: 1410,
    },
    {
      name: 'Tessa Bloom',
      email: 'tessa.bloom@example.com',
      role: 'coach',
      team: teams[1]._id,
      totalPoints: 690,
    },
  ]);

  teams[0].members = [users[0]._id, users[1]._id, users[2]._id];
  teams[1].members = [users[3]._id, users[4]._id, users[5]._id];
  await Promise.all(teams.map((team) => team.save()));

  const activities = await Activity.create([
    {
      user: users[0]._id,
      team: teams[0]._id,
      type: 'Road Run',
      durationMinutes: 55,
      distanceKm: 12.4,
      caloriesBurned: 920,
      intensity: 'high',
      performedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      notes: 'Morning tempo run with a strong finish.',
    },
    {
      user: users[1]._id,
      team: teams[0]._id,
      type: 'Interval Cycle',
      durationMinutes: 45,
      distanceKm: 18.7,
      caloriesBurned: 640,
      intensity: 'moderate',
      performedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      notes: 'Structured intervals with recovery spins.',
    },
    {
      user: users[3]._id,
      team: teams[1]._id,
      type: 'Strength Circuit',
      durationMinutes: 60,
      distanceKm: 0,
      caloriesBurned: 760,
      intensity: 'high',
      performedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      notes: 'Heavy compound lifts followed by core work.',
    },
    {
      user: users[4]._id,
      team: teams[1]._id,
      type: 'Mobility Flow',
      durationMinutes: 35,
      distanceKm: 0,
      caloriesBurned: 220,
      intensity: 'low',
      performedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      notes: 'Recovery session focusing on hips and shoulders.',
    },
  ]);

  const leaderboardEntries = await Leaderboard.create([
    {
      team: teams[0]._id,
      user: users[0]._id,
      rank: 1,
      points: 1240,
      period: 'weekly',
    },
    {
      team: teams[0]._id,
      user: users[1]._id,
      rank: 2,
      points: 1085,
      period: 'weekly',
    },
    {
      team: teams[1]._id,
      user: users[3]._id,
      rank: 1,
      points: 1535,
      period: 'weekly',
    },
    {
      team: teams[1]._id,
      user: users[4]._id,
      rank: 2,
      points: 1410,
      period: 'weekly',
    },
  ]);

  const workouts = await Workout.create([
    {
      title: 'Full-Body Strength Builder',
      description: 'A balanced strength workout with squats, presses, and core stability circuits.',
      difficulty: 'intermediate',
      durationMinutes: 50,
      focusArea: 'strength',
      estimatedCalories: 560,
      recommendedFor: [users[0]._id, users[3]._id],
    },
    {
      title: 'Recovery Yoga Flow',
      description: 'Gentle mobility and stretching designed to help athletes recover after intense sessions.',
      difficulty: 'beginner',
      durationMinutes: 30,
      focusArea: 'recovery',
      estimatedCalories: 180,
      recommendedFor: [users[1]._id, users[4]._id],
    },
    {
      title: 'Endurance Pace Builder',
      description: 'Steady-state cardio workout for building aerobic capacity over a longer effort.',
      difficulty: 'intermediate',
      durationMinutes: 40,
      focusArea: 'endurance',
      estimatedCalories: 480,
      recommendedFor: [users[0]._id, users[1]._id],
    },
  ]);

  console.log(`Seed complete:`);
  console.log(`  Teams: ${teams.length}`);
  console.log(`  Users: ${users.length}`);
  console.log(`  Activities: ${activities.length}`);
  console.log(`  Leaderboard entries: ${leaderboardEntries.length}`);
  console.log(`  Workouts: ${workouts.length}`);

  await disconnectDatabase();
};

runSeed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
