import { Alert, Button, StyleSheet, Text, View, Pressable } from "react-native";

function BadgerLogoutScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginTop: -100 }}>
        Are you sure you're done?
      </Text>
      <Text>Come back soon!</Text>
      <Text />
      <Pressable style={styles.button} onPress={() => props.setIsGuest(false)}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
          Signup
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "50%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    backgroundColor: "#B10F33",
    borderRadius: 8,
  },
});

export default BadgerLogoutScreen;
