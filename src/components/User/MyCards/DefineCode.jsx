import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import {
  TouchableWithoutFeedback,
  TextInput,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigate } from "react-router-native";
import { handleOnPressOut } from "../../../utils";
import { useTranslation } from "react-i18next";

const DefineCode = () => {
  const { t } = useTranslation();
  const [pin, setPin] = useState("");
  const [code, setCode] = useState("");
  const [label, setLabel] = useState(t("write_code"));
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handlePinChange = (input) => {
    const formattedPin = input.replace(/\D/g, "").substring(0, 4);
    setPin(formattedPin);
  };

  useEffect(() => {
    if (pin.length === 4 && !code) {
      setCode(pin);
      setPin("");
      setLabel(t("write_code_again"));
    } else if (pin.length === 4 && code) {
      if (code == pin) {
        navigate("/myCards/codeApproved");
      } else {
        alert("Codigo incorrecto");
        setLabel(t("write_code"));
        setCode("");
        setPin("");
      }
    }
  }, [pin]);

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback
          style={styles.flex}
          onPress={() => handleOnPressOut(inputRef)}
        >
          <View style={styles.centerContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.pinContainer}>
              {[...Array(4)].map((_, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                >
                  <LinearGradient
                    colors={["#F1A539", "#1F1B17"]}
                    style={styles.buttonGradient}
                    start={[1, 0]}
                    end={[0, 1]}
                  >
                    <Text style={styles.pinDigit}>{pin[index] || ""}</Text>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            maxLength={4}
            keyboardType="numeric"
            onChangeText={handlePinChange}
            value={pin}
          />
        </TouchableWithoutFeedback>
      </View>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 30,
    marginHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  pinContainer: {
    flexDirection: "row",
  },
  pinDigitContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  pinDigit: {
    fontSize: 50,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    color: "#fff",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
  },
  buttonGradient: {
    borderRadius: 100,
    height: 70,
    width: 70,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontFamily: "CovesBold",
    fontSize: 22,
    textAlign: "center",
  },
  flex: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
});

export default DefineCode;
