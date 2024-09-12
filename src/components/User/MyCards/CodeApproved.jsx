import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-native";

const CodeApproved = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={["#2C3B29", "#3EE459"]}
        style={styles.bgGradient}
        start={[1, 1]}
        end={[1, 0]}
      >
        <Image source={require("../../../../assets/TickLogo.png")} />
        <Text style={styles.buttonText}>{t("code_approved")}</Text>
      </LinearGradient>
      <TouchableOpacity onPress={() => navigate("/myCards")}>
        <LinearGradient
          colors={["#F1A539", "#1F1B17"]}
          style={styles.buttonGradient}
          start={[1, 0]}
          end={[0, 1]}
        >
          <Text style={styles.buttonText}>{t("go_back")}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGradient: {
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 12,
    height: 48,
    marginTop: 12,
    width: "50%",
  },
  buttonText: {
    fontFamily: "CovesBold",
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  bgGradient: {
    width: "85%",
    borderRadius: 40,
    padding: 20,
    alignItems: "center",
  },
});

export default CodeApproved;
