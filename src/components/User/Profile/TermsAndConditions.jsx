import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigate("/profile")}>
          <Image source={require("../../../../assets/backButton.png")} />
        </TouchableOpacity>
        <LinearGradient
          colors={["#996E23", "#FFB73B"]}
          style={styles.bgGradient}
          start={[1, 1]}
          end={[0, 1]}
        >
          <Text style={styles.boldText}>{t("terms")}</Text>
          <View style={styles.line}></View>
          <Text style={styles.lightText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation
          </Text>
        </LinearGradient>
      </View>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: Constants.statusBarHeight + 30,
    marginHorizontal: 25,
    gap: 30,
  },
  bgGradient: {
    width: "100%",
    borderRadius: 40,
    padding: 20,
    gap: 12,
  },
  boldText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "CovesBold",
    textAlign: "center",
  },
  lightText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "CovesLight",
  },
  line: {
    height: 1,
    backgroundColor: "#000",
    opacity: 0.22,
  },
});

export default TermsAndConditions;
