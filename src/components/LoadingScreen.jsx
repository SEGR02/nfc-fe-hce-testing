import { ImageBackground, StyleSheet, Text, View } from "react-native";
import LoaderKit from "react-native-loader-kit";
import { BlurView } from "expo-blur";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../assets/generalBg.png")}
      >
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.overlay}>
            {/* ! WHEN BUILD APK */}
            {/* <LoaderKit
              style={{ width: 100, height: 100 }}
              name={"BallClipRotateMultiple"} // Optional: see list of animations below
              color={"#fff"} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
            /> */}
            {/* WHEN DEV */}
            <Text>Loading...</Text>
          </View>
        </BlurView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
