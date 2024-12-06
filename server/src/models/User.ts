import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import e from 'express';

interface ICollection extends Document {
  _id: Types.ObjectId;
}
// Define an interface for the User document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  compositions: Types.ObjectId[];
  collection: ICollection[];
  follows: Types.ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema for the User document
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    compositions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Composition',
      },
    ],
    collection: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Composition',
      },
    ],
    follows: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
