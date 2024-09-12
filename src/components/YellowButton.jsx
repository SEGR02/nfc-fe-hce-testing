import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";

const YellowButton = ({ link, label, onPress, green = false }) => {
  const navigate = useNavigate();
  const gradientColors = !green
    ? ["#F1A539", "#1F1B17"]
    : ["#1F1B17", "#3EE459"];

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (link) {
      navigate(link);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <LinearGradient
        colors={gradientColors}
        style={styles.buttonGradient}
        start={[1, 0]}
        end={[0, 1]}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonGradient: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    height: 48,
    marginTop: 12,
    width: 280,
  },
  buttonText: {
    fontFamily: "CovesBold",
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
  },
});

export default YellowButton;
