import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import CompanyPay from "../../../components/Company/CryptoPayments/CompanyPay";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <CompanyPay />
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
