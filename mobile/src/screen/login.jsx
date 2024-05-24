import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { LOGIN_MUTATION } from "../mutation/LoginMutation";
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const { setSignIn } = useContext(AuthContext);
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

    const handleLogin = async () => {
        if (!email.trim()) {
            setEmailError("Email is required");
            return;
        }
        if (!password.trim()) {
            setPasswordError("Password is required");
            return;
        }

        try {
            const response = await login({
                variables: { email, password }
            });
            await SecureStore.setItemAsync("access_token", response.data.login.access_token);
            setSignIn(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Image source={require("../../assets/twitter.png")} style={styles.logo} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailError(null); 
                    }}
                    value={email}
                    keyboardType="email-address"
                />
                {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => {
                        setPassword(text);
                        setPasswordError(null);
                    }}
                    value={password}
                    secureTextEntry
                />
                {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
                <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("register")}>
                    <Text style={styles.signupText}>Sign up for X</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 10,
        width: "100%"
    },
    buttonContainer: {
        backgroundColor: "#1DA1F2",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 100,
        marginBottom: 10
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    signupText: {
        color: "#1DA1F2",
        marginTop: 10
    },
    errorText: {
        color: "red",
        marginBottom: 5
    }
});
