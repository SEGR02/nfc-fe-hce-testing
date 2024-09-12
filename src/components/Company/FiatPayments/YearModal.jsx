import { AntDesign } from "@expo/vector-icons";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import YellowButton from "../../YellowButton";

const YearModal = ({ show, set, labelSet }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show == "year"}
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
            <YellowButton
              onPress={() => {
                set(false);
                labelSet("2023");
              }}
              label="2023"
            />
            <YellowButton
              onPress={() => {
                set(false);
                labelSet("2024");
              }}
              label="2024"
            />
            <YellowButton
              onPress={() => {
                set(false);
                labelSet("2025");
              }}
              label="2025"
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
    width: "90%",
    padding: 25,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default YearModal;
