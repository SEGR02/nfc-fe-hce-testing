import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

function CarouselComponent({ cards, currentIndex, setCurrentIndex }) {
  return (
    <View style={styles.mainContainer}>
      <Carousel
        loop
        width={Dimensions.get("window").width * 0.78}
        height={135}
        data={cards}
        scrollAnimationDuration={250}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item?.cardImage} style={styles.image} />
            <Text style={styles.editText}>
              {cards?.[currentIndex]?.name == null
                ? "Tarjeta digital"
                : cards?.[currentIndex]?.name}
            </Text>
            <View style={styles.pointsContainer}>
              {cards?.map((point, index) => (
                <View
                  key={index}
                  style={[
                    styles.point,
                    {
                      backgroundColor: currentIndex == index ? "#fff" : "#888",
                    },
                  ]}
                ></View>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: 200,
    height: 200,
    marginTop: -35,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 280,
    height: 130,
    resizeMode: "contain",
  },
  point: {
    width: 5,
    height: 5,
    borderRadius: 50,
  },
  pointsContainer: {
    flexDirection: "row",
    gap: 5,
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

export default CarouselComponent;
