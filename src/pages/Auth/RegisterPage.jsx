import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import RegisterComponent from "../../components/Auth/Register";

const AuthLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../assets/chabitbg2.png")}
    >
      <RegisterComponent />
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

export default AuthLayout;
