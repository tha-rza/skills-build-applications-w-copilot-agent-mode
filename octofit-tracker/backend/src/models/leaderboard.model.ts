import { Schema, model, Types } from 'mongoose';

export interface ILeaderboardEntry {
  team: Types.ObjectId;
  user: Types.ObjectId;
  rank: number;
  points: number;
  period: 'weekly' | 'monthly' | 'all-time';
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
  period: { type: String, required: true, enum: ['weekly', 'monthly', 'all-time'], default: 'weekly' },
  updatedAt: { type: Date, required: true, default: () => new Date() },
});

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
