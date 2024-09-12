import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import Pay from "../../../components/User/Pay/Pay";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <Pay />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});

export default GeneralLayout;
