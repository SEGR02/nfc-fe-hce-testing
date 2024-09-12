import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import Navbar from "../Navbar";
import Constants from "expo-constants";
import YellowButton from "../../YellowButton";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/AuthContext";

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.colorWhite}>{t("my_profile")}</Text>
        <Image
          style={styles.profileImg}
          source={
            user?.profileImage != null
              ? { uri: `data:image/jpeg;base64,${user.profileImage}` }
              : require("../../../../assets/ProfileLogo.png")
          }
        />
        <YellowButton link="/profile/customize" label={t("customize")} />
        <YellowButton link="/profile/terms" label={t("terms")} />
        <YellowButton
          onPress={() => alert("Linktree")}
          label={t("follow_us")}
        />
        <YellowButton link="/" label={t("log_out")} />
        <YellowButton link="/profile/hceTesting" label={t("Hce testing")} />
      </View>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  colorWhite: {
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "CovesBold",
  },
  mainContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 30,
    marginHorizontal: 25,
    alignItems: "center",
    gap: 8,
  },
  profileImg: {
    marginTop: "7%",
    height: Dimensions.get("window").width * 0.69,
    width: Dimensions.get("window").width * 0.69,
    borderRadius: 160,
  },
});

export default Profile;
