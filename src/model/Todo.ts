import { Schema, model, Types } from 'mongoose';

export interface ITodo {
  user: Types.ObjectId;
  title: string;
  status: boolean;
  createdAt: Date;
}

const todoSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Todo = model<ITodo>('Todo', todoSchema);
