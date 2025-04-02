import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Alert,
  AppState,
  Platform,
} from "react-native";
import Permissions from "react-native-permissions";

export default function GetPermission() {
  const [types, setTypes] = useState([]);
  const [status, setStatus] = useState({});
  const [canOpenSettings, setCanOpenSettings] = useState(false);
  const [isAlways, setIsAlways] = useState(false);

  useEffect(() => {
    async function fetchPermissions() {
      let permissionTypes = await Permissions.getTypes();
      let settingsAvailable = await Permissions.canOpenSettings();
      
      setTypes(permissionTypes);
      setCanOpenSettings(settingsAvailable);
      updatePermissions(permissionTypes);
    }

    fetchPermissions();
    const appStateListener = AppState.addEventListener("change", handleAppStateChange);
    
    return () => {
      appStateListener.remove();
    };
  }, []);

  const handleAppStateChange = (appState) => {
    if (appState === "active") {
      updatePermissions(types);
    }
  };

  const openSettings = () => {
    Permissions.openSettings().then(() => Alert.alert("Back to app!"));
  };

  const updatePermissions = async (permissions) => {
    try {
      let currentStatus = await Permissions.checkMultiple(permissions);
      
      if (isAlways) {
        let locationStatus = await Permissions.check("location", "always");
        currentStatus = { ...currentStatus, location: locationStatus };
      }

      setStatus(currentStatus);
    } catch (error) {
      console.warn("Error checking permissions:", error);
    }
  };

  const requestPermission = async (permission) => {
    try {
      let options = permission === "location" ? (isAlways ? "always" : "whenInUse") : undefined;
      let res = await Permissions.request(permission, options);

      setStatus((prevStatus) => ({ ...prevStatus, [permission]: res }));

      if (res !== "authorized") {
        let buttons = [{ text: "Cancel", style: "cancel" }];

        if (canOpenSettings) {
          buttons.push({ text: "Open Settings", onPress: openSettings });
        }

        Alert.alert(
          "Permission Required",
          "There was a problem getting permission. Please enable it from settings.",
          buttons
        );
      }
    } catch (error) {
      console.warn("Error requesting permission:", error);
    }
  };

  const toggleLocationType = () => {
    setIsAlways(!isAlways);
    updatePermissions(types);
  };

  return (
    <View style={styles.container}>
      {types.map((p) => (
        <TouchableHighlight
          key={p}
          style={[styles.button, styles[status[p]]]}
          onPress={() => requestPermission(p)}
        >
          <View>
            <Text style={styles.text}>
              {Platform.OS === "ios" && p === "location"
                ? `Location (${isAlways ? "Always" : "When In Use"})`
                : p}
            </Text>
            <Text style={styles.subtext}>{status[p]}</Text>
          </View>
        </TouchableHighlight>
      ))}

      <View style={styles.footer}>
        <TouchableHighlight style={styles[`footer_${Platform.OS}`]} onPress={toggleLocationType}>
          <Text style={styles.text}>Toggle Location Type</Text>
        </TouchableHighlight>

        {canOpenSettings && (
          <TouchableHighlight onPress={openSettings}>
            <Text style={styles.text}>Open Settings</Text>
          </TouchableHighlight>
        )}
      </View>

      <Text style={styles[`footer_${Platform.OS}`]}>
        Note: Microphone permission may not work on the iOS simulator.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  text: {
    textAlign: "center",
  },
  subtext: {
    textAlign: "center",
  },
  button: {
    margin: 5,
    borderColor: "black",
    borderWidth: 3,
    overflow: "hidden",
  },
  authorized: {
    backgroundColor: "#C5E1A5",
  },
  denied: {
    backgroundColor: "#EF9A9A",
  },
  undetermined: {
    backgroundColor: "#E0E0E0",
  },
  footer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer_android: {
    height: 0,
    width: 0,
  },
});
