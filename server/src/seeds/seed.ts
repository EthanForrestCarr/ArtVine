import db from '../config/connection.js';
import { Composition, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import userData from './userData.json' with { type: 'json'};
import { seedCompositions } from './createSeed.js';

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    const data = await seedCompositions()

    await Composition.insertMany(data);
    for (let user of userData) {
      const userSeed = new User(user);

      await userSeed.save()
  }
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
