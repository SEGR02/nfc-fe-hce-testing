import { useNavigate } from "react-router-native";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import YellowButton from "../../YellowButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as LocalAuthentication from "expo-local-authentication";
import { useTranslation } from "react-i18next";

const PinCode = () => {
  const { t } = useTranslation();
  const [focusedInput, setFocusedInput] = useState("");
  const navigate = useNavigate();

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Chabit PIN",
    });
    if (result.success) {
      navigate("/myCards/defineCode");
    } else {
      Alert.alert("Error", t("biometric_auth_failed"));
    }
  };

  useEffect(() => {
    handleBiometricAuth();
  }, []);

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TouchableOpacity onPress={() => navigate("/myCards")}>
            <Image source={require("../../../../assets/backButton.png")} />
          </TouchableOpacity>
          <View style={styles.centerContainer}>
            <TouchableWithoutFeedback onPress={handleBiometricAuth}>
              <Text style={styles.boldText}>{t("or_use_fingerprint")}</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.ligthText}>{t("write_your_password")}</Text>
            <TextInput
              placeholderTextColor={"#c1c1c1"}
              style={[
                styles.inputText,
                focusedInput === "unique" && styles.focusedInput,
              ]}
              placeholder={t("password")}
              onFocus={() => setFocusedInput("unique")}
              onBlur={() => setFocusedInput("")}
            />
            <View style={styles.buttonContainer}>
              <YellowButton link="/myCards/defineCode" label={t("continue")} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {!focusedInput && <Navbar />}
    </>
  );
};

const styles = StyleSheet.create({
  ligthText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    fontFamily: "CovesBold",
  },
  mainContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 30,
    marginHorizontal: 25,
  },
  boldText: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputText: {
    height: 75,
    width: "100%",
    backgroundColor: "#282828",
    borderRadius: 40,
    fontFamily: "CovesBold",
    fontSize: 22,
    textAlign: "center",
    marginTop: 30,
    color: "#c1c1c1",
    marginBottom: 100,
  },
  focusedInput: {
    borderColor: "#F1A539",
    borderWidth: 2,
  },
  centerContainer: {
    alignItems: "center",
    marginTop: "50%",
  },
  buttonContainer: {
    marginBottom: 200,
  },
});

export default PinCode;
