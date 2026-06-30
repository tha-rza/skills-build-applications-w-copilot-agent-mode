import { Schema, model, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
  team?: Types.ObjectId;
  totalPoints: number;
  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  totalPoints: { type: Number, required: true, default: 0 },
  joinedAt: { type: Date, required: true, default: () => new Date() },
});

export const User = model<IUser>('User', userSchema);
