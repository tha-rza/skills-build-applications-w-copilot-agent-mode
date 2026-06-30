import { Schema, model, Types } from 'mongoose';

export interface IActivity {
  user: Types.ObjectId;
  team: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm: number;
  caloriesBurned: number;
  intensity: 'low' | 'moderate' | 'high';
  performedAt: Date;
  notes: string;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  intensity: { type: String, required: true, enum: ['low', 'moderate', 'high'], default: 'moderate' },
  performedAt: { type: Date, required: true },
  notes: { type: String, required: true, default: '' },
});

export const Activity = model<IActivity>('Activity', activitySchema);
