import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import HistoricBalance from "../../../components/Company/FiatPayments/HistoricBalance";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <HistoricBalance />
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
