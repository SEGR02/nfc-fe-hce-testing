import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import CompanyBalance from "../../../components/Company/FiatPayments/CompanyBalance";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <CompanyBalance />
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
