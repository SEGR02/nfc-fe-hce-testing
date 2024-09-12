import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import CodeApproved from "../../../components/User/MyCards/CodeApproved";

const GeneralLayout = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../../assets/generalBg.png")}
    >
      <CodeApproved />
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
