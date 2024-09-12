import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import CompanySettings from "../../../components/Company/Settings/CompanySettings.jsx";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <CompanySettings />
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
