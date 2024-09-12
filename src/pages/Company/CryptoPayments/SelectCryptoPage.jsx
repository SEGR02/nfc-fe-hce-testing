import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import SelectCrypto from "../../../components/Company/CryptoPayments/SelectCrypto";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <SelectCrypto />
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
