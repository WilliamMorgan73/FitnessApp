import { StyleSheet, View, Dimensions, Text, ScrollView } from 'react-native';
import { ListItem } from '@/components/listItem';

export default function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Workouts</Text>
      <ScrollView>
        <ListItem 
          imageSource={require('@/assets/images/temp.jpg')} 
          title="Workout1" 
          items={['Bicep curl', 'Preacher curl']} 
          description="Test"
        />
        <ListItem 
          imageSource={require('@/assets/images/temp.jpg')} 
          title="Workout2" 
          items={['Bicep curl', 'Preacher curl']} 
          description="Test"
        />
        <ListItem 
          imageSource={require('@/assets/images/temp.jpg')} 
          title="Workout3" 
          items={['Bicep curl', 'Preacher curl']} 
          description="Test"
        />
        <ListItem 
          imageSource={require('@/assets/images/temp.jpg')} 
          title="Workout4" 
          items={['Bicep curl', 'Preacher curl']} 
          description="Test"
        />
        <ListItem 
          imageSource={require('@/assets/images/temp.jpg')} 
          title="Workout5" 
          items={['Bicep curl', 'Preacher curl']} 
          description="Test"
        />
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
});


