import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { apiGetTransactionById } from "../../../services/apiGetTransactionById";
import { apiGetCardById } from "../../../services/apiGetCardById";

const OneTransaction = () => {
  const { transactionId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);
  const [card, setCard] = useState([]);

  useEffect(() => {
    getTransactionAndCard();
  }, []);

  const getTransactionAndCard = async () => {
    const transaction = await apiGetTransactionById(transactionId);
    const card = await apiGetCardById(transaction.cardId);
    setTransaction(transaction);
    setCard(card);
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigate("/myCards/transactions")}>
          <Image source={require("../../../../assets/backButton.png")} />
        </TouchableOpacity>
        <LinearGradient
          colors={["#996E23", "#FFB73B"]}
          start={[1, 1]}
          end={[0, 1]}
          style={styles.bgGradient}
        >
          <View style={styles.row}>
            <Text style={styles.lightText}>{t("transaction_approved")}</Text>
            <Image source={require("../../../../assets/greenLogo.png")} />
          </View>
          <View style={styles.row}>
            <Text style={styles.lightText}>
              {transaction?.createdAt?.slice(0, 10)}
            </Text>
            <Text style={styles.lightText}>
              {transaction?.createdAt?.slice(11, 19)}
            </Text>
          </View>
          <View style={styles.line} />
          <Text style={styles.amountText}>{transaction?.amount} $</Text>
          <View style={styles.line} />
          <Text style={styles.amountText2}>
            {transaction?.amount}{" "}
            <Text style={styles.amountCoin}>{transaction?.crypto}</Text>
          </Text>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.lightText}>Blockchain</Text>
            <Text style={styles.semiBoldText}>{transaction?.blockchain}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.lightText}>{t("currency")}</Text>
            <Text style={styles.semiBoldText}>{transaction?.crypto}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.lightText}>{t("commerce")}</Text>
            <Text style={styles.semiBoldText}>{transaction?.commerce}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.lightText}>ID</Text>
            <Text style={styles.semiBoldText}>{transactionId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.lightText}>{t("card")}</Text>
            <Text style={styles.semiBoldText}>{transaction?.cardId}</Text>
          </View>
        </LinearGradient>
      </View>
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
  bgGradient: {
    width: "100%",
    borderRadius: 40,
    padding: 20,
    marginTop: "10%",
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
  },
  semiBoldText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "CovesBold",
  },
  amountText: {
    color: "#fff",
    fontSize: 60,
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
});

export default OneTransaction;
