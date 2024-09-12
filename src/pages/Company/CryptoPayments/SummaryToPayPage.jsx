import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import SummaryToPay from "../../../components/Company/CryptoPayments/SummaryToPay";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <SummaryToPay />
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
