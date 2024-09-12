import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import TermsAndConditions from "../../../components/User/Profile/TermsAndConditions";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <TermsAndConditions />
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
