import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  username: {
    type: string,
    required: boolean,
    unique: boolean
  },
  password: string
  created: {
    type: Date,
    default: Date
  }
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String },
  created: {
    type: Date,
    default: Date.now
  }
});

export default model<IUser>('User', userSchema);