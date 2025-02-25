import { Pressable, Text, StyleSheet } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  height?: number;
  width?: number;
  backgroundColor?: string;
  textColor?: string;
}

export function CustomButton({
  title,
  onPress,
  height,
  width,
}: CustomButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        {
          height: height || 50,
          width: width || 50,
        },
      ]}
      onPress={onPress}
    >
    <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent', // removed opaque background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 5,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: "center",
    fontSize: 32,
    color: 'grey',
    fontWeight: 'bold',
    
  },
});
