import { Document, Schema, model } from 'mongoose';
import{ SoftDeleteModel, SoftDeleteDocument } from 'mongoose-delete';
const mongooseDelete = require('mongoose-delete');

export interface ITask extends SoftDeleteDocument {
  title: {
    type: String;
    required: Boolean;
  };
  text: String;
  period: String;
  goal: Number;
  created: {
    type: Date;
    default: Date;
  };
}

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  period: String,
  goal: Number,
  types: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Type'
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

taskSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: ['count', 'find']
});

export default model<ITask, SoftDeleteModel<ITask>>('Task', taskSchema);
