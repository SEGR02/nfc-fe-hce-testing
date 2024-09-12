import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigate, useParams } from "react-router-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PaymentCompleted from "./PaymentCompleted";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { cleanUp } from "../../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../../context/AuthContext";

const PayWithCard = () => {
  const { t } = useTranslation();
  const [havePayDetails, setPayDetails] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState();
  const [cardParsed, setCardParsed] = useState();
  const [isFailed, setIsFailed] = useState();
  const { card } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    NfcManager.start();
    parseCard();
    return () => {
      cleanUp();
    };
  });

  const parseCard = () => {
    if (cardParsed == undefined) {
      let cardParsed = JSON.parse(card);
      setCardParsed(cardParsed);
      writeData(cardParsed);
    }
  };

  const writeData = async (card) => {
    try {
      const privateKey = await AsyncStorage.getItem(
        `privateKey${card.index + 1}fromUser${user.id}`
      );
      let tech = Platform.OS === "ios" ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: "Ready to do some custom Mifare cmd!",
      });

      let fullLength = privateKey.length + 7;
      let payloadLength = privateKey.length + 3;

      let cmd =
        Platform.OS === "ios"
          ? NfcManager.sendMifareCommandIOS
          : NfcManager.transceive;

      resp = await cmd([0xa2, 0x04, 0x03, fullLength, 0xd1, 0x01]);
      resp = await cmd([0xa2, 0x05, payloadLength, 0x54, 0x02, 0x65]);

      let currentPage = 6;
      let currentPayload = [0xa2, currentPage, 0x6e];

      for (let i = 0; i < privateKey.length; i++) {
        currentPayload.push(privateKey.charCodeAt(i));
        if (currentPayload.length === 6) {
          resp = await cmd(currentPayload);
          currentPage += 1;
          currentPayload = [0xa2, currentPage];
        }
      }

      currentPayload.push(254);
      while (currentPayload.length < 6) {
        currentPayload.push(0);
      }

      resp = await cmd(currentPayload);
      alert(resp.toString() == 10 ? "Write Succesfully" : "Error writing");
      setPayDetails(true);
      cleanUp();
    } catch (ex) {
      alert(ex.toString());
      cleanUp();
    }
  };

  if (paymentCompleted == undefined)
    return (
      <>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={() => navigate("/pay")}>
            <Image source={require("../../../../assets/backButton.png")} />
          </TouchableOpacity>
          <View>
            <Image style={styles.image} source={cardParsed?.cardImage} />
            <Text style={styles.editText}>
              {cardParsed?.name == null ? "Tarjeta digital" : cardParsed?.name}
            </Text>
          </View>
          {!havePayDetails && (
            <>
              <Image
                style={styles.image2}
                source={require("../../../../assets/nfcImage.png")}
              />
              <Text style={styles.lightText}>{t("bring_your_phone")}</Text>
            </>
          )}
          {havePayDetails && (
            // <View style={styles.payResumeContainer}>
            //   <Text style={styles.fiatAmount}>
            //     {havePayDetails.fiatAmount} €
            //   </Text>
            //   <View style={styles.line}></View>
            //   <Text style={styles.cryptoAmount}>
            //     {havePayDetails.amount}{" "}
            //     <Text style={styles.cryptoLabel}>{havePayDetails.crypto}</Text>
            //   </Text>
            //   <View style={styles.blockchainRow}>
            //     <Text style={styles.smallLightText}>Blockchain</Text>
            //     <Text style={styles.boldText}>{havePayDetails.blockchain}</Text>
            //   </View>
            <>
              <Image
                style={styles.image2}
                source={require("../../../../assets/nfcImage.png")}
              />
              <Text style={styles.lightText}>
                {t("processing_your_payment")}
              </Text>
            </>
            // </View>
          )}
        </View>
        <Navbar />
      </>
    );
  if (paymentCompleted == true)
    return <PaymentCompleted card={cardParsed} isFailed={isFailed} />; // ! Change to true to show failed payment
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: Constants.statusBarHeight + 30,
    marginHorizontal: 25,
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    marginVertical: 30,
  },
  image2: {
    width: "100%",
    resizeMode: "contain",
    marginBottom: 50,
  },
  lightText: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "CovesLight",
    textAlign: "center",
  },
  fiatAmount: {
    fontSize: 60,
    color: "#fff",
    textAlign: "center",
  },
  line: {
    height: 2,
    backgroundColor: "#000",
    opacity: 0.22,
  },
  cryptoAmount: {
    fontSize: 50,
    color: "#fff",
    textAlign: "center",
  },
  cryptoLabel: {
    fontSize: 40,
  },
  blockchainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: "20%",
  },
  smallLightText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "CovesLight",
  },
  boldText: {
    fontFamily: "CovesBold",
    fontSize: 20,
    color: "#fff",
  },
  payResumeContainer: {
    marginHorizontal: "11%",
    marginTop: "-10%",
  },
  editText: {
    position: "absolute",
    bottom: 60,
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "CovesBold",
    width: "100%",
  },
});

export default PayWithCard;
