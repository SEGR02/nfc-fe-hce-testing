import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import UserBalance from "../../../components/User/Balance/UserBalance";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <UserBalance />
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
