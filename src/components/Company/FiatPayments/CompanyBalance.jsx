import { ScrollView, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import CompanyNavbar from "../CompanyNavbar";
import YellowButton from "../../YellowButton";
import { useUserData } from "../../../context/UserDataContext";
import { formatWallet } from "../../../utils";

const CompanyBalance = () => {
  const { t } = useTranslation();
  const { originalCards } = useUserData();

  return (
    <>
      <View style={styles.secondBox}>
        <Text style={styles.title}>{t("your_profits")}</Text>
        <LinearGradient
          colors={["#996E23", "#FFB73B"]}
          start={[1, 1]}
          end={[0, 1]}
          style={styles.bgGradient}
        >
          <Text style={styles.lightText}>{t("your_fiat_available")}</Text>
          <View style={styles.line2}></View>
          <Text style={styles.fiatAvailable}>
            {originalCards?.[0]?.balance?.tokens?.[1]?.balance} €
          </Text>
          <View style={styles.line2}></View>
          <Text style={styles.lightText}>
            {originalCards?.[0]?.balance?.wallet
              ? formatWallet(originalCards?.[0]?.balance?.wallet)
              : null}
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={["#996E23", "#FFB73B"]}
          start={[1, 1]}
          end={[0, 1]}
          style={styles.bgGradient}
        >
          <View>
            <ScrollView style={styles.secondCardDataContainer}>
              <Text style={styles.lightText}>{t("your_crypto_available")}</Text>
              <View style={styles.line2}></View>
              <Text style={styles.secondCardTitle}>BNB Chain</Text>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[0]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[0]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[0]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[1]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[1]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[1]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[2]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[2]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[2]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[3]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[3]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[3]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[4]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[4]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[4]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[5]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[5]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[5]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[6]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[6]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[6]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[7]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[7]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[7]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <Text style={styles.secondCardTitle}>Polygon</Text>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[8]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[8]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[8]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[9]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[9]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[9]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[10]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[10]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[10]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[11]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[11]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[11]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>
                  {originalCards?.[0]?.balance?.tokens?.[12]?.name}
                </Text>
                <Text style={styles.boldText}>
                  {originalCards?.[0]?.balance?.tokens?.[12]?.balance}{" "}
                  {originalCards?.[0]?.balance?.tokens?.[12]?.name}
                </Text>
              </View>
              <View style={styles.line2}></View>
            </ScrollView>
          </View>
        </LinearGradient>
        <YellowButton link="/companyBalance/historic" label={t("historic")} />
      </View>
      <CompanyNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  bgGradient: {
    width: "90%",
    borderRadius: 40,
    padding: 20,
    marginBottom: 20,
  },
  boldText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CovesBold",
  },
  balance: {
    color: "#fff",
    fontSize: 48,
    fontFamily: "CovesBold",
    marginVertical: -3,
  },
  lightText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CovesLight",
    textAlign: "center",
  },
  cardData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImg: {
    width: 120,
    height: 120,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyLogo: {
    marginLeft: 20,
  },
  secondBox: {
    flex: 1,
    alignItems: "center",
    marginTop: Constants.statusBarHeight + 30,
  },
  secondCardTitle: {
    fontSize: 22,
    color: "#FCFAF0",
    fontFamily: "CovesBold",
    textAlign: "center",
    marginVertical: 10,
  },
  secondCardDataContainer: {
    gap: 6,
    height: 350,
  },
  line2: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#b17e28",
    marginVertical: 5,
  },
  secondCardRow: {
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "CovesBold",
    textAlign: "center",
    marginBottom: 20,
  },
  fiatAvailable: {
    fontSize: 48,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "-3%",
  },
});

export default CompanyBalance;
