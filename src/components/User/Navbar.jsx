import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigate, useLocation } from "react-router-native";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => handleNavigate("/userBalance")}>
        <View
          style={[
            styles.linkOption,
            pathname.includes("/userBalance") ? styles.active : null,
          ]}
        >
          <Image
            style={styles.balanceImg}
            source={require("../../../assets/balanceIcon.png")}
          />
          <Text style={styles.textOption}>{t("balance")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate("/myCards")}>
        <View
          style={[
            styles.linkOption,
            pathname.includes("/myCards") ? styles.active : null,
          ]}
        >
          <Image
            style={styles.cardImg}
            source={require("../../../assets/cardToInsertText.png")}
          />
          <Text style={styles.textOption}>{t("my_cards")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate("/pay")}>
        <View
          style={[
            styles.linkOption,
            pathname.includes("/pay") ? styles.active : null,
          ]}
        >
          <Image
            style={styles.tpvImg}
            source={require("../../../assets/tpvImage.png")}
          />
          <Text style={styles.textOption}>{t("pay")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate("/exchange")}>
        <View
          style={[
            styles.linkOption,
            pathname.includes("/exchange") ? styles.exchangeActive : null,
          ]}
        >
          <Image
            style={styles.profileImg}
            source={require("../../../assets/ChabitLogo.png")}
          />
          <Text style={styles.textOption}>{t("exchange")}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "10%",
    width: "100%",
    backgroundColor: "#2f2a21",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  linkOption: {
    alignItems: "center",
  },
  textOption: {
    color: "#fff",
    fontSize: 13,
  },
  active: {
    backgroundColor: "#110f0c",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  exchangeActive: {
    backgroundColor: "#110f0c",
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  profileImg: {
    width: 43,
    height: 43,
    borderRadius: 22,
  },
  cardImg: {
    width: 60,
    height: 38.5,
  },
  tpvImg: {
    width: 35,
    height: 42,
  },
  balanceImg: {
    height: 37,
    width: 19,
  },
});

export default Navbar;
