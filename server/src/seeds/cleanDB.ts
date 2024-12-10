import { Composition, User } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents from Composition Library
    await Composition.collection.drop();
    console.log('Composition library cleaned.');

    // Delete documents from User library
    await User.collection.drop();
    console.log('User library cleaned.');

  } catch (err) {
    console.error('Error cleaning library:', err);
    process.exit(1);
  }
};

export default cleanDB;