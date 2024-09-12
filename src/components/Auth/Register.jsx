import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { apiRegister } from "../../services/apiRegister";
import { useNavigate } from "react-router-native";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const register = async () => {
    if (email == "" || password == "" || confirmPassword == "") {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const response = await apiRegister({
      password: password,
      email: email.toLowerCase(),
    });

    if (response?.status == 201) {
      Alert.alert("Success", "User created");
      navigate("/login");
    } else {
      Alert.alert("Error", "Something wrong");
    }
  };

  return (
    <>
      <Text style={styles.welcomeText}>{t("your_email")}</Text>
      <TextInput
        placeholderTextColor={"#c1c1c1"}
        style={[
          styles.inputText,
          focusedInput === "username" && styles.focusedInput,
        ]}
        placeholder={t("email")}
        onFocus={() => setFocusedInput("username")}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.inputLabel}>{t("enter_your_password")}</Text>
      <TextInput
        secureTextEntry
        placeholderTextColor={"#c1c1c1"}
        style={[
          styles.inputText,
          focusedInput === "password" && styles.focusedInput,
        ]}
        placeholder={t("password")}
        onFocus={() => setFocusedInput("password")}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.inputLabel}>{t("repeat_your_password")}</Text>
      <TextInput
        secureTextEntry
        placeholderTextColor={"#c1c1c1"}
        style={[
          styles.inputText,
          focusedInput === "confirmPassword" && styles.focusedInput,
        ]}
        placeholder={t("password")}
        onFocus={() => setFocusedInput("confirmPassword")}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity onPress={register}>
        <LinearGradient
          colors={["#1F1B17", "#3EE459"]}
          style={styles.buttonGradient}
          start={[0, 1]}
          end={[0, 0]}
        >
          <Text style={styles.buttonText}>{t("sign_up")}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "CovesLight",
    marginTop: 100,
    marginBottom: 10,
  },
  buttonGradient: {
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 12,
    height: 48,
    marginTop: 12,
  },
  buttonText: {
    fontFamily: "CovesBold",
    color: "#fff",
    fontSize: 22,
  },
  inputText: {
    height: 75,
    width: "80%",
    backgroundColor: "#282828",
    borderRadius: 40,
    fontFamily: "CovesBold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 30,
    color: "#c1c1c1",
  },
  inputLabel: {
    color: "#fff",
    fontFamily: "CovesLight",
    fontSize: 20,
    marginBottom: 5,
  },
  focusedInput: {
    borderColor: "#F1A539",
    borderWidth: 2,
  },
});

export default Register;
