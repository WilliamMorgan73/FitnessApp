import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, ScrollView } from 'react-native';
import { CustomButton } from '@/components/button';
import { ListItem } from '@/components/listItem';
import db, { setupDatabase, insertSampleData } from '@/db/database';

export default function HomeScreen() {
  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth / 2 - 20;
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        await setupDatabase();        // Initialize DB
        await insertSampleData();     // Then insert sample data
        // Wait a short delay to ensure transactions commit
        setTimeout(async () => {
          await fetchRecentSessions();  // Then fetch sessions
        }, 100);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  async function fetchRecentSessions() {
    if (!db) return;
    try {
      const results: any = await db.execAsync(`
        SELECT s.id, s.date, s.duration, w.name AS workoutName
        FROM session s
        LEFT JOIN workout w ON s.workoutId = w.id
        ORDER BY s.date DESC
        LIMIT 10;
      `);
      const rows = results?.[0]?.rows || [];
      setSessions(rows);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Gym App</Text>
      
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Quick Workout</Text>
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <CustomButton 
            title="Empty Workout" 
            onPress={() => {}} 
            width={buttonWidth} 
            height={110}
          />
          <CustomButton 
            title="Select Workout" 
            onPress={() => {}} 
            width={buttonWidth} 
            height={110}
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Workout History</Text>
      <ScrollView style={styles.historyContainer}>
        {sessions.length === 0 ? (
          <Text style={{ color: 'grey' }}>No workouts found</Text>
        ) : (
          sessions.map((session) => (
            <ListItem
              key={session.id}
              imageSource={require('@/assets/images/temp.jpg')}
              title={session.workoutName || 'No Workout Name'}
              items={[`Date: ${session.date}`, `Duration: ${session.duration || 0} min`]}
              description="Most recent sessions"
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
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    color: 'grey'
  },
  gridContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    width: '100%',
  },
  sectionTitle: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  historyContainer: {
    maxHeight: 430, // Adjust height as needed
  },
});


