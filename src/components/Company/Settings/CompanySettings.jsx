import { Image, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import YellowButton from "../../YellowButton";
import { useTranslation } from "react-i18next";
import CompanyNavbar from "../CompanyNavbar";

const CompanySettings = () => {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.mainContainer}>
        <Image
          style={styles.profileImg}
          source={require("../../../../assets/tpvImage.png")}
        />
        <View style={styles.downContainer}>
          <Text style={styles.colorWhite}>POS N12345</Text>
          <YellowButton
            link="/companySettings/customize"
            label={t("customize")}
          />
          <YellowButton link="/companySettings/terms" label={t("terms")} />
          <YellowButton link="/" label={t("log_out")} />
        </View>
      </View>
      <CompanyNavbar />
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
    width: "90%",
    resizeMode: "contain",
  },
  downContainer: {
    marginTop: "-5%",
    gap: 5,
  },
});

export default CompanySettings;
