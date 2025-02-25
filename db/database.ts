import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function setupDatabase(): Promise<void> {
  if (db) return; // Prevent reinitialization

  db = await SQLite.openDatabaseAsync('gymapp.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS workout (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS session (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      duration INTEGER NOT NULL,
      workoutId INTEGER NOT NULL,
      FOREIGN KEY (workoutId) REFERENCES workout(id)
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
}

export function getDatabase(): SQLite.SQLiteDatabase | null {
  return db;
}


export const insertSampleData = async () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  
  try {
    // Clear existing data first
    await db.execAsync('DELETE FROM session;');
    await db.execAsync('DELETE FROM workout;');

    // Insert workouts first
    await db.execAsync(`
      INSERT INTO workout (id, name)
      VALUES 
        (1, 'Pushups'),
        (2, 'Bench Press'),
        (3, 'Squats');
    `);

    // Then insert sessions
    await db.execAsync(`
      INSERT INTO session (id, date, duration, workoutId)
      VALUES 
        (1, '2023-10-12', 30, 1),
        (2, '2023-10-13', 45, 2),
        (3, '2023-10-14', 60, 3),
        (4, '2023-10-15', 30, 1),
        (5, '2023-10-16', 45, 2),
        (6, '2023-10-17', 60, 3),
        (7, '2023-10-18', 30, 1),
        (8, '2023-10-19', 45, 2),
        (9, '2023-10-20', 60, 3),
        (10, '2023-10-21', 30, 1);
    `);

    // Verify data insertion with proper error handling
    const workoutResults = await db.getAllAsync('SELECT * FROM workout;');
    console.log('Workouts after insert:', workoutResults);    

    const sessionResults = await db.getAllAsync('SELECT * FROM session;');
    console.log('Sessions after insert:', sessionResults?.[0]);

  } catch (error) {
    console.error('Error in insertSampleData:', error);
    throw error;
  }
};

export default db;
