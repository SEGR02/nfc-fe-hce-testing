import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import CompanyNavbar from "../CompanyNavbar";
import { useEffect, useState } from "react";
import AfterPay from "./AfterPay";
import { useNavigate, useParams } from "react-router-native";
import {
  cleanUp,
  getCommerceWallet,
  getCrypto,
  getTokenAddress,
} from "../../../utils";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { apiGetPublicAddresses } from "../../../services/apiGetPublicAddresses";
import { apiEjectTransaction } from "../../../services/apiEjectTransaction";
import { useUserData } from "../../../context/UserDataContext";
import { apiSaveTransaction } from "../../../services/apiSaveTransaction";
import { useAuth } from "../../../context/AuthContext";
import { apiGetCardByWallet } from "../../../services/apiGetCardByWallet";

const SummaryToPay = () => {
  const { t } = useTranslation();
  const [isPaymentFailed, setIsPaymentFailed] = useState();
  const [isFirstCharge, setIsFirstCharge] = useState(true);
  const { payload } = useParams();
  const parts = payload.split(",");
  const cryptoCurrency = getCrypto(parseInt(parts[1], 10));
  const navigate = useNavigate();
  const { refreshCards } = useUserData();
  const { user } = useAuth();
  const [transactionId, setTransactionId] = useState();

  useEffect(() => {
    NfcManager.start();
    if (isFirstCharge == true) {
      setIsFirstCharge(false);
      readData();
    }
    return () => {
      cleanUp();
    };
  });

  const readData = async () => {
    try {
      let tech = Platform.OS === "ios" ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: "Ready to do some custom Mifare cmd!",
      });

      let cmd =
        Platform.OS === "ios"
          ? NfcManager.sendMifareCommandIOS
          : NfcManager.transceive;

      resp = await cmd([0x3a, 4, 4]);
      let payloadLength = parseInt(resp.toString().split(",")[1]);
      let payloadPages = Math.ceil(payloadLength / 4);
      let startPage = 5;
      let endPage = startPage + payloadPages - 1;

      resp = await cmd([0x3a, startPage, endPage]);
      let bytes = resp.toString().split(",");
      let text = "";

      for (let i = 0; i < bytes.length; i++) {
        if (i < 5) {
          continue;
        }

        if (parseInt(bytes[i]) === 254) {
          break;
        }

        text = text + String.fromCharCode(parseInt(bytes[i]));
      }

      await pay(text);
      cleanUp();
    } catch (ex) {
      alert(ex);
      cleanUp();
    }
  };

  const pay = async (privateKey) => {
    const body = await getRequeriments(privateKey);
    // ? validate balance
    await validateBalance();
    // ? swap if is neccesary
    await swap();
    // * EJECT TRANSACTION
    await ejectTransaction(body);
  };

  const getRequeriments = async (privateKey) => {
    const publicAddress = await apiGetPublicAddresses({
      privateKey1: privateKey,
    });
    const walletTo = getCommerceWallet(1);
    const tokenAddress = getTokenAddress(parseInt(parts[1], 10));
    const body = {
      walletFrom: publicAddress.privateKey1,
      privateKey,
      walletTo,
      tokenAddress,
      amount: String(parseFloat(parts[3])),
    };
    return body;
  };
  const validateBalance = async () => {};
  const swap = async () => {};
  const ejectTransaction = async (body) => {
    try {
      const result = await apiEjectTransaction(body);
      if (result?.status != 201) {
        saveTransaction(true, body.walletFrom);
        await refreshCards();
        return setIsPaymentFailed(true);
      } else {
        if (result?.data?.transactionHash) {
          saveTransaction(false, body.walletFrom);
          await refreshCards();
          return setIsPaymentFailed(false);
        } else {
          saveTransaction(true, body.walletFrom);
          await refreshCards();
          return setIsPaymentFailed(true);
        }
      }
    } catch (error) {
      saveTransaction(true, body.walletFrom);
      await refreshCards();
      setIsPaymentFailed(true);
      alert(error);
    }
  };

  const findCardId = async (wallet) => {
    const result = await apiGetCardByWallet(wallet);
    return result.id;
  };

  const saveTransaction = async (isFailed, wallet) => {
    try {
      const result = await apiSaveTransaction(user.id, {
        isFailed: isFailed,
        amount: parseFloat(parts[3]),
        blockchain: "BNB Chain",
        crypto: cryptoCurrency,
        commerce: "Amazon",
        cardId: await findCardId(wallet),
      });
      setTransactionId(result.id);
    } catch (error) {
      alert(error);
    }
  };

  if (isPaymentFailed == undefined)
    return (
      <>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => navigate(`/companyPay/selectAmount/${payload}`)}
          >
            <Image source={require("../../../../assets/backButton.png")} />
          </TouchableOpacity>
          <View style={styles.summaryBox}>
            <Text style={styles.smallBold}>{t("you_gonna_pay")}</Text>
            <Text style={styles.bigBold}>{parseFloat(parts[2], 10)} €</Text>
            <Text style={styles.smallBold}>{t("equivalent_to")}</Text>
            <Text style={styles.bigBold}>
              {parseFloat(parts[3], 10)}{" "}
              <Text style={styles.cryptoCurrency}>{cryptoCurrency}</Text>
            </Text>
          </View>
          <View style={styles.downContainer}>
            <Text style={styles.lightText}>{t("bring_your_phone")}</Text>
            <Image source={require("../../../../assets/nfcImage.png")} />
          </View>
        </View>
        <CompanyNavbar />
      </>
    );

  if (isPaymentFailed !== undefined)
    return (
      <AfterPay
        isFailed={isPaymentFailed}
        payload={payload}
        transactionId={transactionId}
      />
    );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: Constants.statusBarHeight + 30,
  },
  summaryBox: {
    backgroundColor: "#262019",
    width: "100%",
    alignItems: "center",
    paddingVertical: 30,
    marginVertical: 20,
  },
  smallBold: {
    fontSize: 20,
    fontFamily: "CovesBold",
    color: "#fff",
  },
  bigBold: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
  },
  lightText: {
    color: "#fff",
    fontFamily: "CovesLight",
    fontSize: 40,
    marginHorizontal: 40,
    textAlign: "center",
  },
  downContainer: {
    alignItems: "center",
    gap: 20,
  },
  cryptoCurrency: {
    fontSize: 40,
  },
  backArrow: {
    marginHorizontal: 25,
  },
});

export default SummaryToPay;
