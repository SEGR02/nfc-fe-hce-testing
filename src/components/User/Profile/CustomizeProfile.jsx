import { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigate } from "react-router-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import YellowButton from "../../YellowButton";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../../context/AuthContext";
import { apiUpdateProfileImage } from "../../../services/apiUpdateProfileImage";

const CustomizeProfile = () => {
  const { t, i18n } = useTranslation();
  const { user, refreshUser } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const updateProfileImage = async () => {
    if (!image) {
      alert("No image selected");
      return;
    }

    const result = await apiUpdateProfileImage(user.id, image);
    if (result.status == 200) {
      await refreshUser();
      setImage(undefined);
      alert("Profile image updated successfully");
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigate("/profile")}>
          <Image source={require("../../../../assets/backButton.png")} />
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <Image
            style={styles.profileImg}
            source={
              image !== undefined
                ? { uri: image.uri }
                : user?.profileImage != null
                ? { uri: `data:image/jpeg;base64,${user.profileImage}` }
                : require("../../../../assets/ProfileLogo.png")
            }
          />
        </View>
        <View style={styles.buttonsContainer}>
          {image == undefined ? (
            <YellowButton
              onPress={pickImage}
              label={t("change_profile_picture")}
            />
          ) : (
            <YellowButton
              label={t("confirm")}
              green={true}
              onPress={updateProfileImage}
            />
          )}
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
  },
  profileImg: {
    marginVertical: 30,
    height: 308,
    width: 308,
    borderRadius: 160,
  },
  buttonsContainer: {
    gap: 8,
    alignItems: "center",
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

export default CustomizeProfile;
