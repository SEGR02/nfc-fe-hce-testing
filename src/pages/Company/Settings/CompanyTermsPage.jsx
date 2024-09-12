import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import CompanyTerms from "../../../components/Company/Settings/CompanyTerms.jsx";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <CompanyTerms />
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
