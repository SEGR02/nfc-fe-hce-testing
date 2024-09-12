import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import Welcome from "../components/Welcome";

const WelcomePage = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/chabitbg.png")}
    >
      <Welcome />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomePage;
