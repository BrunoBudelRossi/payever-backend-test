import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  { collection: 'users' },
);
