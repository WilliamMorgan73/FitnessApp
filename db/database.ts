import { openDatabaseAsync } from 'expo-sqlite';

let db: Awaited<ReturnType<typeof openDatabaseAsync>> | null = null;

export const setupDatabase = async () => {
  try {
    db = await openDatabaseAsync('fitnessApp.db');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS workout (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS session (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        duration INTEGER,
        workoutId INTEGER
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS exercise (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        muscleGroup TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sessionexercise (
        sessionId INTEGER,
        exerciseId INTEGER,
        sets INTEGER,
        reps INTEGER,
        weight REAL
      );
    `);

    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const insertSampleData = async () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  try {
    await db.execAsync(`
      INSERT INTO workout (name)
      VALUES ('Pushups'),
             ('Bench Press'),
             ('Squats');
    `);

    await db.execAsync(`
      INSERT INTO session (date, duration, workoutId)
      VALUES ('2023-10-12', 30, 1),
             ('2023-10-13', 45, 2);
    `);

    console.log('Sample data inserted successfully.');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

export default db;
