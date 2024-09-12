// import React from 'react';
// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   SafeAreaView,
//   ScrollView,
//   useColorScheme,
//   Alert,
// } from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';
// import NfcManager, {NfcTech} from 'react-native-nfc-manager';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
// import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
// NfcManager.start();
// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [value, onChangeText] = React.useState('00a404000e325041592e5359532e444446303100;00A4040007A000000003101000;00a404000e325041592e5359532e444446303100;00A4040007A000000003101000');
//   const [tag, setTag] = React.useState<any[]>([]);
//
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };
//
//   function hexStringToBytes(hexString: string) {
//     const bytes = [];
//     for (let i = 0; i < hexString.length; i += 2) {
//       bytes.push(parseInt(hexString.substr(i, 2), 16));
//     }
//     return bytes;
//   }
//
//   function bytesToHexString(bytes: any[]) {
//     return bytes
//         .map(byte => {
//           return ('0' + (byte & 0xff).toString(16)).slice(-2);
//         })
//         .join('');
//   }
//
//   async function sendAPDU() {
//     try {
//       // console.log('Apdu:', value);
//       // let byte = hexStringToBytes(value);
//       // // const byteArray = arrNumbers.map(num => num & 0xff);
//       // // console.log(byte, byteArray);
//       // // await NfcManager.requestTechnology([NfcTech.IsoDep]);
//       // let values = await NfcManager.transceive(byte);
//       // let strHexResp = bytesToHexString(values);
//       // console.log('Resp:', strHexResp);
//       // setTag([...tag, `Apdu: ${value}`, `Resp: ${strHexResp}`]);
//
//       console.log('input:', value);
//       let values = [];
//       if (value.includes(';')) {
//         const commands = value.split(';');
//         for (let i = 0; i < commands.length; i++) {
//           const command = commands[i].toUpperCase();
//           const byte = hexStringToBytes(command);
//           console.log('Apdu:', command);
//           const response = await NfcManager.transceive(byte);
//           const strHexResp = bytesToHexString(response).toUpperCase();
//           console.log('Resp:', strHexResp);
//           // values.push(strHexResp);
//           setTag(prevTag => [...prevTag, `APDU:\n${command}`, `RESP:\n${strHexResp}`]);
//         }
//       } else {
//         console.log('Apdu:', value);
//         const byte = hexStringToBytes(value);
//         values = await NfcManager.transceive(byte);
//         const strHexResp = bytesToHexString(values);
//         console.log('Resp:', strHexResp);
//         setTag([...tag, `Apdu:\n${value.toUpperCase()}`, `Resp:\n${strHexResp.toUpperCase()}`]);
//       }
//     } catch (ex) {
//       console.warn('Error!', ex);
//       setTag([...tag, `${ex}`]);
//       await NfcManager.cancelTechnologyRequest();
//     }
//   }
//
//   // 检查nfc是否可用
//   async function checkNfc() {
//     try {
//       const isEnabled = await NfcManager.isEnabled();
//       if (isEnabled) {
//         await NfcManager.requestTechnology(NfcTech.IsoDep);
//         let tags = await NfcManager.getTag();
//         setTag([...tag, JSON.stringify(tags)]);
//       } else {
//         setTag([]);
//       }
//     } catch (ex) {
//       console.warn('Error!', ex);
//     }
//   }
//
//   const copyToClipboard = () => {
//     const tagsString = tag.join('\n');
//     Clipboard.setString(tagsString);
//     Alert.alert('Tips', 'Copied to clipboard');
//   };
//
//   const clearNfc = async () => {
//     await NfcManager.clearBackgroundTag();
//     await NfcManager.cancelTechnologyRequest();
//     setTag([]);
//   };
//
//   React.useEffect(() => {
//     const checkNfcStatus = async () => {
//       try {
//         const isEnabled = await NfcManager.isEnabled();
//         console.log('NFC is ok?:', isEnabled);
//         if (tag?.length <= 0) {
//           // 如果 tag 为空，则继续执行检查 NFC
//           await checkNfc();
//         } else {
//           clearInterval(intervalId);
//         }
//       } catch (error) {
//         console.error('Check nfc enable:', error);
//       }
//     };
//     checkNfcStatus();
//     const intervalId = setInterval(checkNfcStatus, 5000);
//     return () => clearInterval(intervalId);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tag]);
//
//   return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar
//             barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//             backgroundColor={backgroundStyle.backgroundColor}
//         />
//         <View style={styles.content}>
//           <View style={[styles.row]}>
//             <Text style={{paddingRight: 5}}>APDU:</Text>
//             <TextInput
//                 value={value}
//                 style={styles.inputStyle}
//                 multiline={true}
//                 onChangeText={text => onChangeText(text)}
//             />
//           </View>
//
//           <View style={styles.row_}>
//             <TouchableOpacity
//                 style={[
//                   styles.button,
//                   tag.length <= 0 && {
//                     backgroundColor: '#ccc',
//                   },
//                 ]}
//                 onPress={() => {
//                   tag.length > 0 && sendAPDU();
//                 }}>
//               <Text style={styles.buttonText}>Send Command</Text>
//             </TouchableOpacity>
//           </View>
//
//           <View style={[styles.row, {justifyContent: 'space-between', gap: 10}]}>
//             <TouchableOpacity
//                 style={[styles.button, styles.clearButton]}
//                 onPress={() => clearNfc()}>
//               <Text style={styles.buttonText}>Clear</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={[styles.button, styles.copyButton]}
//                 onPress={copyToClipboard}>
//               <Text style={styles.buttonText}>Copy to Clipboard</Text>
//             </TouchableOpacity>
//           </View>
//
//           <View style={{flex: 1, marginTop: 10}}>
//             <ScrollView
//                 style={{
//                   flex: 1,
//                   height: 200,
//                   backgroundColor: '#000',
//                   borderRadius: 5,
//                   padding: 5,
//                 }}>
//               {tag.length <= 0 && <Text style={{color: '#fff'}}>Waiting</Text>}
//               {(tag ?? []).map((r, index) => (
//                   <Text key={index} style={{color: '#fff'}}>
//                     {r}
//                   </Text>
//               ))}
//             </ScrollView>
//           </View>
//         </View>
//       </SafeAreaView>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  Alert,
  ToastAndroid,
} from "react-native";
// import Clipboard from '@react-native-clipboard/clipboard';
import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  HCESession,
  NFCTagType4NDEFContentType,
  NFCTagType4,
} from "react-native-hce";

function App() {
  const isDarkMode = useColorScheme() === "dark";
  const [value, onChangeText] = useState("Hello world");
  const [tag, setTag] = useState([]);
  const [session, setSession] = (useState < HCESession) | (null > null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const startSession = async () => {
    try {
      const nfcTag = new NFCTagType4({
        type: NFCTagType4NDEFContentType.Text,
        content: value,
        writable: false,
      });
      const hceSession = await HCESession.getInstance();
      hceSession.setApplication(nfcTag);
      await hceSession.setEnabled(true);
      setSession(hceSession);
      setTag((prevTag) => [...prevTag, "HCE session started"]);
    } catch (error) {
      console.error("Error starting HCE session:", error);
      // @ts-ignore
      setTag((prevTag) => [...prevTag, `Error: ${error.message}`]);
    }
  };

  const stopSession = async () => {
    if (session) {
      await session.setEnabled(false);
      setSession(null);
      setTag((prevTag) => [...prevTag, "HCE session stopped"]);
    }
  };

  const listen = async () => {
    if (session) {
      const removeListener = session.on(
        HCESession.Events.HCE_STATE_READ,
        () => {
          ToastAndroid.show(
            "The tag has been read! Thank You.",
            ToastAndroid.LONG
          );
          setTag((prevTag) => [...prevTag, "Tag has been read"]);
        }
      );
      setTag((prevTag) => [...prevTag, "Listening for HCE read events"]);
      // To remove the listener later: removeListener();
    }
  };

  useEffect(() => {
    startSession();
    return () => {
      stopSession();
    };
  }, []);

  const copyToClipboard = () => {
    //   const tagsString = tag.join('\n');
    //   Clipboard.setString(tagsString);
    Alert.alert("Tips", "Copied to clipboard");
  };

  const clearLogs = () => {
    setTag([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.content}>
        <View style={[styles.row]}>
          <Text style={{ paddingRight: 5 }}>HCE Content:</Text>
          <TextInput
            value={value}
            style={styles.inputStyle}
            multiline={true}
            onChangeText={(text) => onChangeText(text)}
          />
        </View>

        <View style={styles.row_}>
          <TouchableOpacity style={styles.button} onPress={startSession}>
            <Text style={styles.buttonText}>Start HCE Session</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row_}>
          <TouchableOpacity style={styles.button} onPress={stopSession}>
            <Text style={styles.buttonText}>Stop HCE Session</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row_}>
          <TouchableOpacity style={styles.button} onPress={listen}>
            <Text style={styles.buttonText}>Listen for Read Events</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[styles.row, { justifyContent: "space-between", gap: 10 }]}
        >
          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={clearLogs}
          >
            <Text style={styles.buttonText}>Clear Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.copyButton]}
            onPress={copyToClipboard}
          >
            <Text style={styles.buttonText}>Copy to Clipboard</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, marginTop: 10 }}>
          <ScrollView
            style={{
              flex: 1,
              height: 200,
              backgroundColor: "#000",
              borderRadius: 5,
              padding: 5,
            }}
          >
            {tag.length <= 0 && (
              <Text style={{ color: "#fff" }}>No logs yet</Text>
            )}
            {(tag ?? []).map((r, index) => (
              <Text key={index} style={{ color: "#fff" }}>
                {r}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 10,
    flex: 1,
    padding: 20,
  },

  row_: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginBottom: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginBottom: 5,
  },
  inputStyle: {
    marginTop: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    height: 90,
    textAlignVertical: "top",
    width: 64 * 8,
  },
  searchButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#007bff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    flex: 1,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    height: 40,
  },
  clearButton: {
    backgroundColor: "#dc3545",
  },
  copyButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default App;
