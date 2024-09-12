import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Navbar from "../Navbar";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import CarouselComponent from "./Carousel";
import { useTranslation } from "react-i18next";
import { copyToClipboard, formatWallet } from "../../../utils";
import { useAuth } from "../../../context/AuthContext";
import LoadingScreen from "../../LoadingScreen";
import { useUserData } from "../../../context/UserDataContext";
import { useNavigate } from "react-router-native";

const UserBalance = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuth();
  const { cards } = useUserData();
  const navigate = useNavigate();

  const formatBalance = (index, isMainBalance) => {
    const parsedBalance = Number(
      cards?.[currentIndex]?.balance?.tokens?.[index]?.balance
    );

    if (isNaN(parsedBalance) || parsedBalance === 0) {
      return "0.0";
    }

    if (isMainBalance) return parsedBalance.toFixed(4).replace(/\.?0+$/, "");
    return parsedBalance.toFixed(6).replace(/\.?0+$/, "");
  };

  if (cards)
    return (
      <>
        <View style={styles.firstBox}>
          <View style={styles.bgGradient}>
            <View style={styles.cardData}>
              <View>
                <Text style={styles.boldText}>{t("you_have_available")}</Text>
                <View style={styles.line}></View>
                <Text style={styles.balance}>{formatBalance(1, true)} €</Text>
                <View style={styles.line}></View>
                {cards?.[currentIndex]?.wallet && (
                  <Text style={styles.boldText}>{t("your_wallet")}</Text>
                )}
              </View>
              <TouchableOpacity onPress={() => navigate("/profile")}>
                <Image
                  style={styles.profileImg}
                  source={
                    user?.profileImage != null
                      ? { uri: `data:image/jpeg;base64,${user.profileImage}` }
                      : require("../../../../assets/ProfileLogo.png")
                  }
                />
                <Image
                  style={styles.settingsIcon}
                  source={require("../../../../assets/settingsIcon.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.addressContainer}>
              {cards?.[currentIndex]?.wallet && (
                <>
                  <Text style={styles.lightText}>
                    {cards?.[currentIndex]?.wallet
                      ? formatWallet(cards?.[currentIndex]?.wallet)
                      : "0xA53............8482D"}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      copyToClipboard(`${cards?.[currentIndex]?.wallet}`)
                    }
                  >
                    <Image
                      style={styles.copyLogo}
                      source={require("../../../../assets/copyLogo.png")}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
        <View style={styles.secondBox}>
          <View style={styles.bgGradient2}>
            <CarouselComponent
              cards={cards}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            <ScrollView style={styles.secondCardDataContainer}>
              <Text style={styles.secondCardTitle}>BNB Chain</Text>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>USDT</Text>
                <Text style={styles.boldText}>
                  {`${formatBalance(1)} ${
                    cards?.[currentIndex]?.balance?.tokens?.[1]?.name || "USDT"
                  }`}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>USDC</Text>
                <Text style={styles.boldText}>
                  {`${formatBalance(6)} ${
                    cards?.[currentIndex]?.balance?.tokens?.[6]?.name || "USDC"
                  }`}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>WBNB</Text>
                <Text style={styles.boldText}>{`${formatBalance(0)} ${
                  cards?.[currentIndex]?.balance?.tokens?.[0]?.name || "BNB"
                }`}</Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>CB8</Text>
                <Text style={styles.boldText}>{`${formatBalance(4)} ${
                  cards?.[currentIndex]?.balance?.tokens?.[4]?.name || "CB8"
                }`}</Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>BNB</Text>
                <Text style={styles.boldText}>{`${formatBalance(5)} ${
                  cards?.[currentIndex]?.balance?.tokens?.[5]?.name || "BNB"
                }`}</Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>BTC</Text>
                <Text style={styles.boldText}>{`${formatBalance(7)} ${
                  cards?.[currentIndex]?.balance?.tokens?.[7]?.name || "BTC"
                }`}</Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>TK1</Text>
                <Text style={styles.boldText}>{`${formatBalance(2)} ${
                  cards?.[currentIndex]?.balance?.tokens?.[2]?.name || "TK1"
                }`}</Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>TK2</Text>
                <Text style={styles.boldText}>{`${formatBalance(3)} ${
                  cards?.[currentIndex]?.balance?.tokens?.[3]?.name || "TK2"
                }`}</Text>
              </View>
              <View style={styles.line2}></View>
              <Text style={styles.secondCardTitle}>Polygon</Text>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>USDT</Text>
                <Text style={styles.boldText}>
                  {`${formatBalance(8)} ${
                    cards?.[currentIndex]?.balance?.tokens?.[8]?.name || "USDT"
                  }`}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>USDC</Text>
                <Text style={styles.boldText}>
                  {`${formatBalance(9)} ${
                    cards?.[currentIndex]?.balance?.tokens?.[9]?.name || "USDC"
                  }`}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>BTC</Text>
                <Text style={styles.boldText}>
                  {`${formatBalance(10)} ${
                    cards?.[currentIndex]?.balance?.tokens?.[10]?.name || "BTC"
                  }`}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>MATIC</Text>
                <Text style={styles.boldText}>
                  {`${formatBalance(11)} ${
                    cards?.[currentIndex]?.balance?.tokens?.[11]?.name ||
                    "MATIC"
                  }`}
                </Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.secondCardRow}>
                <Text style={styles.lightText}>BNB</Text>
                <Text style={styles.boldText}>
                  {`${formatBalance(12)} ${
                    cards?.[currentIndex]?.balance?.tokens?.[12]?.name || "BNB"
                  }`}
                </Text>
              </View>
              <View style={styles.line2}></View>
            </ScrollView>
          </View>
        </View>
        <Navbar />
      </>
    );
  else return <LoadingScreen />;
};

const styles = StyleSheet.create({
  firstBox: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 5,
    justifyContent: "start",
    alignItems: "center",
  },
  bgGradient: {
    width: "90%",
    borderRadius: 40,
    padding: 20,
    backgroundColor: "#00000075",
  },
  bgGradient2: {
    width: "90%",
    borderRadius: 40,
    padding: 20,
    backgroundColor: "#00000030",
  },
  boldText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CovesBold",
    paddingLeft: 5,
  },
  balance: {
    color: "#fff",
    fontSize: 48,
    fontFamily: "CovesBold",
    marginVertical: -3,
    paddingLeft: 1,
  },
  lightText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CovesLight",
    paddingLeft: 5,
  },
  cardData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyLogo: {
    marginLeft: 20,
  },
  line: {
    width: "150%",
    height: 1.5,
    backgroundColor: "#000",
    margin: 5,
  },
  secondBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
    marginBottom: 240,
  },
  secondCardTitle: {
    fontSize: 22,
    color: "#FCFAF0",
    fontFamily: "CovesBold",
    textAlign: "center",
    marginBottom: 10,
  },
  secondCardDataContainer: {
    marginTop: -50,
    gap: 6,
  },
  line2: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
    marginVertical: 5,
  },
  secondCardRow: {
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingsIcon: {
    height: 25,
    width: 25,
    position: "absolute",
    right: 0,
  },
});

export default UserBalance;
