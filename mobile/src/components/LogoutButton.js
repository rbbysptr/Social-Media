import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useApolloClient } from "@apollo/client";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function LogoutButton() {
    const { setSignIn } = useContext(AuthContext);
    const client = useApolloClient();
    return (
        <TouchableOpacity
            style={StyleSheet.button}
            onPress={async () => {
                await SecureStore.deleteItemAsync("access_token");
                setSignIn(false);
                await client.resetStore();
            }}
        >
            <Text style={StyleSheet.buttonText}>Logout</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});