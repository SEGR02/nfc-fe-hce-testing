import { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import YellowButton from "../../YellowButton";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import CompanyNavbar from "../CompanyNavbar";
import { useNavigate } from "react-router-native";

const CompanyProfile = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigate("/companySettings")}>
          <Image source={require("../../../../assets/backButton.png")} />
        </TouchableOpacity>
        <Image
          style={styles.profileImg}
          source={require("../../../../assets/tpvImage.png")}
        />
        <View style={styles.buttonsContainer}>
          <YellowButton label={t("change_profile_picture")} />
          <YellowButton
            onPress={() => setModalVisible(true)}
            label={t("change_language")}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <YellowButton
                onPress={() => changeLanguage("es")}
                label={t("spanish")}
              />
              <YellowButton
                onPress={() => changeLanguage("en")}
                label={t("english")}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <CompanyNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: Constants.statusBarHeight + 30,
    marginHorizontal: 25,
  },
  profileImg: {
    width: "90%",
    resizeMode: "contain",
  },
  buttonsContainer: {
    gap: 8,
    alignItems: "center",
    marginTop: "-5%",
  },
  languageButton: {
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    padding: 25,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default CompanyProfile;
