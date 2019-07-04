import { Document, Schema, model } from 'mongoose';
import { string } from 'prop-types';
import { NextFunction } from 'express';

export interface IUser extends Document {
  username: {
    type: string;
    required: boolean;
    unique: boolean;
  };
  password: string;
  created: {
    type: Date;
    default: Date;
  };
  stravaToken: String;
  packages: string[];
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
  },
  stravaToken: String,
  packages: Array
});

export default model<IUser>('User', userSchema);
