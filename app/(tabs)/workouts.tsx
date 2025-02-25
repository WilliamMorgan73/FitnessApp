import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ListItem } from '@/components/listItem';
import { getDatabase } from '@/db/database';

export default function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchWorkouts() {
      const database = await getDatabase();
      if (!database) {
        console.error('Database not initialized.');
        return;
      }
      try {
        const results = await database.getAllAsync(`
          SELECT * FROM workout ORDER BY id ASC;
        `);
        setWorkouts(results || []);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Workouts</Text>
      <ScrollView style={styles.listContainer}>
        {workouts.length === 0 ? (
          <Text style={{ color: 'grey' }}>No workouts found</Text>
        ) : (
          workouts.map(workout => (
            <ListItem
              key={workout.id}
              imageSource={require('@/assets/images/temp.jpg')}
              title={workout.name || 'No Workout Name'}
              items={[]} // No additional items for workouts
              description="Workout Entry"
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    flex: 1,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    color: 'grey',
  },
  listContainer: {
    flex: 1,
  },
});


