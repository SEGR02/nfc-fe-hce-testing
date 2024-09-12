import { AntDesign } from "@expo/vector-icons";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import YellowButton from "../../YellowButton";
import { useTranslation } from "react-i18next";

const MonthModal = ({ show, set, labelSet }) => {
  const { t } = useTranslation();
  const months = [
    { name: t("january"), key: "1" },
    { name: t("february"), key: "2" },
    { name: t("march"), key: "3" },
    { name: t("april"), key: "4" },
    { name: t("may"), key: "5" },
    { name: t("june"), key: "6" },
    { name: t("july"), key: "7" },
    { name: t("august"), key: "8" },
    { name: t("september"), key: "9" },
    { name: t("october"), key: "10" },
    { name: t("november"), key: "11" },
    { name: t("december"), key: "12" },
  ];
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show == "month"}
      onRequestClose={() => set(false)}
    >
      <TouchableWithoutFeedback onPress={() => set(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => set(false)}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <FlatList
              data={months}
              renderItem={({ item }) => (
                <YellowButton
                  label={item.name}
                  onPress={() => {
                    set(false);
                    labelSet(item.name);
                  }}
                />
              )}
              keyExtractor={(item) => item.key}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "92%",
    padding: 25,
    maxHeight: "80%",
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default MonthModal;
