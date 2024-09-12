import React from "react";
import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/utils/i18n";
import { AuthProvider } from "./src/context/AuthContext";
import { LoaderProvider, useLoader } from "./src/context/LoaderContext";
import Main from "./src/Main";
import LoadingScreen from "./src/components/LoadingScreen";
import { UserDataProvider } from "./src/context/UserDataContext";
// import { HCESessionProvider } from "react-native-hce";

const AppContent = () => {
  const { isLoading } = useLoader();

  if (isLoading) {
    return <LoadingScreen />;
  } else return <Main />;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    CovesLight: require("./assets/fonts/Coves Light.otf"),
    CovesBold: require("./assets/fonts/Coves Bold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView>
        <StatusBar style="light" />
        {/* <HCESessionProvider> */}
        <UserDataProvider>
          <AuthProvider>
            <LoaderProvider>
              <NativeRouter>
                <AppContent />
              </NativeRouter>
            </LoaderProvider>
          </AuthProvider>
        </UserDataProvider>
        {/* </HCESessionProvider> */}
      </GestureHandlerRootView>
    </I18nextProvider>
  );
}
