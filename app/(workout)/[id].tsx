import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function WorkoutDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Workout Session ID: {id}</Text>
    </View>
  );
}
