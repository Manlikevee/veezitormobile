import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { VeeContext } from "@/components/Veecontext";
import { ToastAndroid } from "react-native";
const Qrpopup = ({ visible, onClose }) => {
  const { axiosInstance, fetchQrCode } = useContext(VeeContext);
  const colorScheme = useColorScheme();
  const [id, setId] = useState("abt");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (id.startsWith("abt")) {
      setId(inputValue);
    } else {
      setId("abt" + inputValue.slice(3));
    }
  };

  const postData = {
    qrcodeid: id,
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Perform submission logic here

    axiosInstance
      .post("/createuserqrcard", postData)
      .then((response) => {
        console.log("Response:", response.data);

        fetchQrCode();
        onClose();
        // toggle();
        // toast.success(`Successful`);
        ToastAndroid.show(`Successfully Created ${id}`, ToastAndroid.SHORT);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        ToastAndroid.show(
          error?.response?.data?.detail || "An Error Occured",
          ToastAndroid.SHORT
        );
        setIsLoading(false);
      });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ThemedView style={styles.modalOverlay} lightColor="">
        <ThemedView style={styles.modalContent} lightColor="#fff">
          <ThemedView style={styles.jc} lightColor="transparent">
            <ThemedText style={styles.sectiontitle}>New Qrcode</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <AntDesign
                name="closecircleo"
                size={24}
                color={Colors[colorScheme ?? "light"].icon}
              />
            </TouchableOpacity>
          </ThemedView>
          <ThemedText style={styles.sectionbody} darkColor="#aaaaaa">
            Fill The Below Details To Create A Tag
          </ThemedText>

          <ThemedView
            style={[
              {
                borderColor: Colors[colorScheme ?? "light"].cardborderColor,
              },
              styles.textinp,
            ]}
          >
            <ThemedView>
              <MaterialIcons
                name="qr-code-scanner"
                size={20}
                color={Colors[colorScheme ?? "light"].icon}
              />
            </ThemedView>
            <ThemedView style={{ flexGrow: 1 }}>
              <TextInput
                autoCapitalize="none"
                placeholder="Tag Number"
                value={id}
                onChangeText={(text) => {
                  setId(text);
                }}
                maxLength={13}
                placeholderTextColor={Colors[colorScheme ?? "light"].icon}
                style={{ color: Colors[colorScheme ?? "light"].qrcolor }}
              />
            </ThemedView>
          </ThemedView>
          <TouchableOpacity
            style={{ padding: 12, backgroundColor: "#6a1039", borderRadius: 5 }}
            onPress={handleSubmit}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <ThemedText style={{ color: "white", textAlign: "center" }}>
                Submit
              </ThemedText>
            )}
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

export default Qrpopup;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sectiontitle: {
    fontFamily: "SpaceGroteskMedium",
    fontSize: 19,
  },
  modalContent: {
    width: "100%",
    // flex: 0.7,
    // backgroundColor: '#fff',
    gap: 10,
    padding: 20,
    borderRadius: 3,
    alignItems: "start",
  },
  jc: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  sectionbody: {
    fontSize: 14,
  },
  textinp: {
    borderWidth: 1,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  myinp: {
    width: "100%",
  },
});
