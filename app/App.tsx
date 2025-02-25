import React, { useEffect } from 'react';
import { setupDatabase, insertSampleData } from '@/db/database';
import { Stack } from 'expo-router';

export default function App() {
  useEffect(() => {
    setupDatabase();
    insertSampleData();
  }, []);

  return <Stack />;
}
