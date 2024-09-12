import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import CustomizeProfile from "../../../components/User/Profile/CustomizeProfile";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <CustomizeProfile />
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
