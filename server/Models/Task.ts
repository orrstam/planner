import { Document, Schema, model } from 'mongoose';

export interface ITask extends Document{
  title: {
    type: String,
    requirec: Boolean 
  }
  text: String,
  created: {
    type: Date,
    default: Date
  },
}

const taskSchema = new Schema({
  title: {
    type: String,
    required: true 
  },
  text: String,
  created: {
    type: Date,
    default: Date.now
  },
});

export default model<ITask>('Task', taskSchema);