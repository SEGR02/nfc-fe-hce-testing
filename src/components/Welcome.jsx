import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import NfcManager, { NfcTech, Ndef, NfcEvents } from "react-native-nfc-manager";
import { useEffect } from "react";

const Welcome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    checkNfc();
  }, []);

  const checkNfc = async () => {
    const supported = await NfcManager.isSupported();
    if (supported) {
      const isEnabled = await NfcManager.isEnabled();
      if (!isEnabled) alert("NFC is not enabled");
    } else alert("NFC is not supported");
  };

  return (
    <>
      <Text style={styles.welcomeText}>{t("welcome_to_chabit")}</Text>
      <TouchableOpacity onPress={() => handleNavigate("/login")}>
        <LinearGradient
          colors={["#F1A539", "#1F1B17"]}
          style={styles.buttonGradient}
          start={[1, 0]}
          end={[0, 1]}
        >
          <Text style={styles.buttonText}>{t("log_in")}</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate("/register")}>
        <Text style={styles.registerText}>{t("sign_up")}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "CovesLight",
    marginTop: "130%",
  },
  buttonText: {
    fontFamily: "CovesBold",
    color: "#fff",
    fontSize: 22,
  },
  registerText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "CovesLight",
    marginTop: 12,
  },
  buttonGradient: {
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 12,
    height: 48,
    marginTop: 12,
  },
});

export default Welcome;
