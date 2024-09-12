import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import Navbar from "../Navbar";
import Constants from "expo-constants";
import { useNavigate } from "react-router-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Platform } from "react-native";
import { useUserData } from "../../../context/UserDataContext";

const Pay = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pressedCard, setPressedCard] = useState(null);
  const { cards } = useUserData();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.boldText}>{t("pay_with_your_mobile")}</Text>
        <Text style={styles.lightText}>
          {cards.length > 0
            ? t("select_your_card")
            : t("no_have_available_cards")}
        </Text>
        <View style={styles.cardsContainer}>
          {cards.map(
            (card, index) =>
              !card.isFrozen && (
                <Pressable
                  key={card.id}
                  onPress={() => {
                    const card = cards[index];
                    card.index = index;
                    navigate(`/pay/${JSON.stringify(card)}`);
                  }}
                  onPressIn={() => setPressedCard(card.id)}
                  onPressOut={() => setPressedCard(null)}
                  style={[
                    styles.cardPressable,
                    pressedCard === card.id && styles.cardPressablePressed,
                  ]}
                >
                  <Image style={styles.cardImage} source={card.cardImage} />
                  <Text style={styles.editText}>
                    {cards?.[index]?.name == null
                      ? "Tarjeta digital"
                      : cards?.[index]?.name}
                  </Text>
                </Pressable>
              )
          )}
        </View>
      </ScrollView>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: Constants.statusBarHeight + 30,
  },
  boldText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "CovesBold",
    marginBottom: "10%",
  },
  lightText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "CovesLight",
    marginBottom: "5%",
  },
  cardsContainer: {
    alignItems: "center",
  },
  cardPressable: {
    width: "90%",
    marginBottom: 10,
  },
  cardPressablePressed: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.5,
        shadowColor: "#F1A539",
        shadowRadius: 5,
      },
    }),
    transform: [{ scale: 0.95 }],
  },
  cardImage: {
    width: "100%",
    resizeMode: "contain",
  },
  editText: {
    position: "absolute",
    bottom: 25,
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "CovesBold",
    width: "100%",
  },
});

export default Pay;
