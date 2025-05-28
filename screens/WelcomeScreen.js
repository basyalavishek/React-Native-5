import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [fetchedData, setFetchedData] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    axios
      .get(
        "https://react-native---expense-tracker-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=" +
          token
      )
      .then((response) => {
        setFetchedData(response.data);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedData}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
