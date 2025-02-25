import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={() => router.replace('/')} />
    </View>
  );
}
