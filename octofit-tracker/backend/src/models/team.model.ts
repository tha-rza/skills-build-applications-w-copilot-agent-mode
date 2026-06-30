import { Schema, model, Types } from 'mongoose';

export interface ITeam {
  name: string;
  description: string;
  members: Types.ObjectId[];
  weeklyGoal: string;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  weeklyGoal: { type: String, required: true },
  createdAt: { type: Date, required: true, default: () => new Date() },
});

export const Team = model<ITeam>('Team', teamSchema);
