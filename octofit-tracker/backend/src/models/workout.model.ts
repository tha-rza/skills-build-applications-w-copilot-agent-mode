import { Schema, model, Types } from 'mongoose';

export interface IWorkout {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focusArea: 'strength' | 'endurance' | 'mobility' | 'recovery';
  estimatedCalories: number;
  recommendedFor: Types.ObjectId[];
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  durationMinutes: { type: Number, required: true },
  focusArea: { type: String, required: true, enum: ['strength', 'endurance', 'mobility', 'recovery'], default: 'strength' },
  estimatedCalories: { type: Number, required: true },
  recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, required: true, default: () => new Date() },
});

export const Workout = model<IWorkout>('Workout', workoutSchema);
