import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import PayWithCard from "../../../components/User/Pay/PayWithCard";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <PayWithCard />
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
