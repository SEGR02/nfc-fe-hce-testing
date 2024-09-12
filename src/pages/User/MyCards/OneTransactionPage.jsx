import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import OneTransaction from "../../../components/User/MyCards/OneTransaction";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <OneTransaction />
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
