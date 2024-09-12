import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigate } from "react-router-native";
import { apiLogin } from "../../services/apiLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { useAuth } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import { useUserData } from "../../context/UserDataContext";

const Login = () => {
  const { t } = useTranslation();
  const { refreshUser } = useAuth();
  const { refreshCards } = useUserData();
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useLoader();

  useEffect(() => {
    getAsyncStorage();
  }, []);

  const getAsyncStorage = async () => {
    try {
      const [username, password] = await Promise.all([
        AsyncStorage.getItem("username"),
        AsyncStorage.getItem("password"),
      ]);

      if (username && password) {
        setUsername(username);
        setPassword(password);
        handleBiometricAuth(username, password);
      }
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  const login = async (isBiometric, username, password) => {
    setIsLoading(true);

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 10000)
    );

    try {
      const result = await Promise.race([
        apiLogin({
          email: username.toLowerCase(),
          password: password,
        }),
        timeout,
      ]);

      if (result?.status === 200) {
        if (!isBiometric) {
          await AsyncStorage.setItem("username", username);
          await AsyncStorage.setItem("password", password);
          await AsyncStorage.setItem(
            "isCompany",
            result?.data?.isCompany ? "yes" : "no"
          );
          await AsyncStorage.setItem("userId", String(result?.data?.id));
        }
        await refreshUser();
        await refreshCards();
        result?.data?.isCompany
          ? navigate("/companyBalance")
          : navigate("/userBalance");
      } else {
        throw new Error("invalid_credentials");
      }
    } catch (error) {
      if (error.message === "Request timed out") {
        Alert.alert("Error", t("request_timeout"));
      } else if (error.message === "network_error") {
        Alert.alert("Error", t("network_error"));
      } else if (error.response) {
        Alert.alert("Error", t("invalid_credentials"));
      } else {
        Alert.alert("Error", t("unexpected_error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = async (username, password) => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Chabit Login",
    });
    if (result.success) {
      await login(true, username, password);
    } else {
      Alert.alert("Error", t("biometric_auth_failed"));
    }
  };

  return (
    <>
      <Text style={styles.welcomeText}>{t("log_in_on_chabit")}</Text>
      <TextInput
        placeholderTextColor={"#c1c1c1"}
        style={[
          styles.inputText,
          focusedInput === "username" && styles.focusedInput,
        ]}
        placeholder={t("email")}
        onFocus={() => setFocusedInput("username")}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
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
        value={password}
      />
      <TouchableOpacity onPress={() => login(false, username, password)}>
        <LinearGradient
          colors={["#3EE459", "#1F1B17"]}
          style={styles.buttonGradient}
          start={[1, 0]}
          end={[0, 1]}
        >
          <Text style={styles.buttonText}>{t("log_in")}</Text>
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
    marginBottom: 50,
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
  focusedInput: {
    borderColor: "#F1A539",
    borderWidth: 2,
  },
  buttonGradient: {
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 12,
    height: 48,
    marginTop: 12,
  },
});

export default Login;
