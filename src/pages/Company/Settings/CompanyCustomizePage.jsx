import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import CompanyCustomize from "../../../components/Company/Settings/CompanyCustomize";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <CompanyCustomize />
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
