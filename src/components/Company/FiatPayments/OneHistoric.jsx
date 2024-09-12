import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import CompanyNavbar from "../CompanyNavbar";
import YellowButton from "../../YellowButton";
import { useEffect, useState } from "react";
import { apiGetTransactionById } from "../../../services/apiGetTransactionById";
import { apiGetCardById } from "../../../services/apiGetCardById";
import { formatWallet } from "../../../utils";
import { useUserData } from "../../../context/UserDataContext";

const OneHistoric = () => {
  const { historicId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [transaction, setTransaction] = useState([]);
  const [card, setCard] = useState([]);
  const { originalCards } = useUserData();

  useEffect(() => {
    getTransactionAndCard();
  }, []);

  const getTransactionAndCard = async () => {
    const transaction = await apiGetTransactionById(historicId);
    const card = await apiGetCardById(transaction.cardId);
    setTransaction(transaction);
    setCard(card);
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigate("/companyBalance/historic")}>
          <Image source={require("../../../../assets/backButton.png")} />
        </TouchableOpacity>
        <LinearGradient
          colors={["#996E23", "#FFB73B"]}
          start={[1, 1]}
          end={[0, 1]}
          style={styles.bgGradient}
        >
          <View style={styles.walletIconContainer}>
            <Image source={require("../../../../assets/walletIcon.png")} />
          </View>
          <Text style={styles.amountText}>
            {transaction?.amount} {transaction?.crypto}
          </Text>
          <Text style={styles.lightText}>
            {transaction?.createdAt?.slice(0, 10)} |{" "}
            {transaction?.createdAt?.slice(11, 19)}
          </Text>
          <Text style={styles.greenText}>
            {transaction?.isFailed == true ? "REJECTED" : "APPROVED"}
          </Text>
          <View style={styles.row}>
            <Text style={styles.lightText}></Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.lightText}>Client</Text>
            <Text style={styles.semiBoldText}>
              {card?.wallet ? formatWallet(card?.wallet) : null}
            </Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.lightText}>ID</Text>
            <Text style={styles.semiBoldText}>{transaction?.id}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.lightText}>{t("card")}</Text>
            <Text style={styles.semiBoldText}>{transaction?.cardId}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.lightText}>{t("commerce")}</Text>
            <Text style={styles.semiBoldText}>
              {formatWallet(originalCards?.[0]?.wallet)}
            </Text>
          </View>
          <View style={styles.line} />
          <View style={styles.buttonContainer}>
            <YellowButton link="/companyBalance" label={t("refund")} />
          </View>
        </LinearGradient>
      </View>
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
  bgGradient: {
    width: "100%",
    borderRadius: 40,
    padding: 20,
    marginTop: "3%",
    gap: 10,
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#b17e28",
    margin: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  lightText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "CovesLight",
    textAlign: "center",
  },
  semiBoldText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "CovesBold",
  },
  amountText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  amountText2: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  amountCoin: {
    color: "#fff",
    fontSize: 40,
  },
  walletIconContainer: {
    alignItems: "center",
  },
  greenText: {
    color: "#0EB400",
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OneHistoric;
