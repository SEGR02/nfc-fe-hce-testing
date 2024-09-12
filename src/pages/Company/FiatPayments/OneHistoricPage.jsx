import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import OneHistoric from "../../../components/Company/FiatPayments/OneHistoric";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <OneHistoric />
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
