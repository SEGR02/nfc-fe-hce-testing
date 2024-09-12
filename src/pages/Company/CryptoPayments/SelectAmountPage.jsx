import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import SelectAmount from "../../../components/Company/CryptoPayments/SelectAmount";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <SelectAmount />
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
