import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import CustomizeCard from "../../../components/User/MyCards/CustomizeCard";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <CustomizeCard />
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
