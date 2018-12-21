import { Document, Schema, model } from 'mongoose';

export interface IType extends Document{
  name: {
    type: String,
    required: Boolean 
  },
  created: {
    type: Date,
    default: Date
  }
}

const typeSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  created: {
    type: Date,
    default: Date.now
  },
});

export default model<IType>('Type', typeSchema);