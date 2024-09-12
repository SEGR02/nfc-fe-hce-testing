import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigate } from "react-router-native";
import { useTranslation } from "react-i18next";
import CompanyNavbar from "../CompanyNavbar";
import CurrencyModal from "./CurrencyModal";
import YearModal from "./YearModal";
import MonthModal from "./MonthModal";
import { apiGetTransactionsByCommerce } from "../../../services/apiGetTransactionsByCommerce";

const HistoricBalance = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currency, setCurrency] = useState("USDT");
  const [month, setMonth] = useState(t("january"));
  const [year, setYear] = useState("2024");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const transactions = await apiGetTransactionsByCommerce("Amazon");
    setTransactions(transactions);
  };

  return (
    <>
      <View style={styles.firstBox}>
        <Pressable
          style={styles.grayButton}
          onPress={() => setModalVisible("currency")}
        >
          <Text style={styles.blackText}>{currency}</Text>
        </Pressable>
        <Pressable
          onPress={() => setModalVisible("year")}
          style={styles.grayButton}
        >
          <Text style={styles.blackText}>{year}</Text>
        </Pressable>
        <Pressable
          onPress={() => setModalVisible("month")}
          style={styles.grayButton}
        >
          <Text style={styles.blackText}>{month}</Text>
        </Pressable>
      </View>
      <View style={styles.secondBox}>
        <View style={styles.titleContainer}>
          <Text style={styles.secondCardTitle}>{t("historic")}</Text>
        </View>
        <LinearGradient
          colors={["#996E23", "#FFB73B"]}
          start={[1, 1]}
          end={[0, 1]}
          style={styles.bgGradient2}
        >
          <FlatList
            data={transactions}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigate(`/companyBalance/historic/${item.id}`)}
              >
                <View style={styles.secondCardRow}>
                  <Text style={styles.lightText}>{item.commerce}</Text>
                  <View style={styles.amountRow}>
                    <Text style={styles.boldText}>
                      {item.amount} {item.crypto}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.line2} />}
          />
        </LinearGradient>
        <CurrencyModal
          show={modalVisible}
          set={setModalVisible}
          labelSet={setCurrency}
        />
        <YearModal
          show={modalVisible}
          set={setModalVisible}
          labelSet={setYear}
        />
        <MonthModal
          show={modalVisible}
          set={setModalVisible}
          labelSet={setMonth}
        />
      </View>
      <CompanyNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  firstBox: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 5,
    justifyContent: "space-evenly",
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
    marginBottom: "80%",
  },
  secondCardTitle: {
    fontSize: 20,
    color: "#FCFAF0",
    textAlign: "left",
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
  blackText: {
    color: "#000",
    fontSize: 20,
  },
  grayButton: {
    backgroundColor: "#918772",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  titleContainer: {
    width: "80%",
    alignItems: "start",
  },
});

export default HistoricBalance;
