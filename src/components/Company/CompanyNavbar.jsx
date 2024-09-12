import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigate, useLocation } from "react-router-native";

const CompanyNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => handleNavigate("/companyPay")}>
        <View
          style={[
            styles.linkOption,
            pathname.includes("/companyPay") ? styles.active : null,
          ]}
        >
          <Image
            style={styles.img}
            source={require("../../../assets/TpvLogo.png")}
          />
          <Text style={styles.textOption}>{t("crypto_payments")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate("/companyBalance")}>
        <View
          style={[
            styles.linkOption,
            pathname.includes("/companyBalance") ? styles.active : null,
          ]}
        >
          <Image
            style={styles.img}
            source={require("../../../assets/laptopNavbar.png")}
          />
          <Text style={styles.textOption}>{t("fiat_payments")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate("/companySettings")}>
        <View
          style={[
            styles.linkOption,
            pathname.includes("/companySettings") ? styles.active : null,
          ]}
        >
          <Image
            style={styles.img}
            source={require("../../../assets/currencyNavbar.png")}
          />
          <Text style={styles.textOption}>{t("settings")}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "10%",
    width: "100%",
    backgroundColor: "#242120",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  linkOption: {
    alignItems: "center",
  },
  textOption: {
    color: "#fff",
    fontFamily: "CovesBold",
    fontSize: 12,
  },
  active: {
    backgroundColor: "#D09530",
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  img: {
    height: 45,
  },
});

export default CompanyNavbar;
