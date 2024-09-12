import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Navbar from "../Navbar";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigate } from "react-router-native";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { apiGetTransactionsByUserId } from "../../../services/apiGetTransactionsByUserId";
import { useAuth } from "../../../context/AuthContext";

const UserBalance = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const transactions = await apiGetTransactionsByUserId(user.id);
    setTransactions(transactions);
  };

  return (
    <>
      <View style={styles.firstBox}>
        <LinearGradient
          colors={["#996E23", "#FFB73B"]}
          style={styles.bgGradient}
          start={[1, 1]}
          end={[0, 1]}
        >
          <View style={styles.cardData}>
            <Text style={styles.boldText}>{t("spent_this_month")}</Text>
            <View style={styles.line}></View>
            <Text style={styles.balance}>{transactions?.[0]?.amount} $</Text>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.secondBox}>
        <LinearGradient
          colors={["#996E23", "#FFB73B"]}
          start={[1, 1]}
          end={[0, 1]}
          style={styles.bgGradient2}
        >
          <Text style={styles.secondCardTitle}>{t("transactions_list")}</Text>
          <View style={styles.line2}></View>
          <FlatList
            data={transactions}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigate(`/myCards/transactions/${item.id}`)}
              >
                <View style={styles.secondCardRow}>
                  <Text style={styles.lightText}>{item?.commerce}</Text>
                  <View style={styles.amountRow}>
                    <Text style={styles.boldText}>
                      {item.amount} {item.crypto}
                    </Text>
                    <Image
                      source={
                        item?.isFailed
                          ? require("../../../../assets/smallRedLogo.png")
                          : require("../../../../assets/smallGreenLogo.png")
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.key}
            ItemSeparatorComponent={() => <View style={styles.line2} />}
          />
        </LinearGradient>
      </View>
      <Navbar />
    </>
  );
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
  },
  bgGradient2: {
    width: "90%",
    borderRadius: 40,
    padding: 20,
    height: "240%",
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
  },
  cardData: {
    alignItems: "center",
    gap: 15,
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
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#b17e28",
    margin: 5,
  },
  secondBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
    marginBottom: "80%",
  },
  secondCardTitle: {
    fontSize: 22,
    color: "#FCFAF0",
    fontFamily: "CovesBold",
    textAlign: "center",
    marginBottom: 15,
  },
  secondCardDataContainer: {
    gap: 6,
  },
  line2: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#b17e28",
    marginVertical: 5,
  },
  secondCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountRow: {
    flexDirection: "row",
    gap: 10,
  },
});

export default UserBalance;
