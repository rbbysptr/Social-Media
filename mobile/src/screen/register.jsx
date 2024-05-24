import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../mutation/RegisterMutation";

export default function Register({ navigation }) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);

    const [register, { loading }] = useMutation(REGISTER_MUTATION, {
        onCompleted: () => {
            navigation.navigate("login");
        },
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Create your account</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        onChangeText={setName}
                        value={name}
                    />
                    {errorMessages.includes("name is required") && (
                        <Text style={styles.errorText}>Name is required</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={setUsername}
                        value={username}
                    />
                    {errorMessages.includes("username is required") && (
                        <Text style={styles.errorText}>Username is required</Text>
                    )}
                    {errorMessages.includes("username must be unique") && (
                        <Text style={styles.errorText}>Username must be unique</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                    />
                    {errorMessages.includes("email is required") && (
                        <Text style={styles.errorText}>Email is required</Text>
                    )}
                    {errorMessages.includes("email must be unique") && (
                        <Text style={styles.errorText}>Email must be unique</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                    />
                    {errorMessages.includes("password is required") && (
                        <Text style={styles.errorText}>Password is required</Text>
                    )}
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={async () => {
                            try {
                                await register({
                                    variables: {
                                        userNew: {
                                            name,
                                            username,
                                            email,
                                            password,
                                        },
                                    },
                                });

                                navigation.navigate("login");
                            } catch (error) {
                                if (error.graphQLErrors.length > 0) {
                                    const messages = error.graphQLErrors.map(err => err.message);
                                    setErrorMessages(messages);
                                } else {
                                    console.log(error);
                                }
                            }
                        }}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>Sign up</Text>
                    </TouchableOpacity>
                    <Text style={styles.termsText}>
                        By signing up, you agree to the Terms of Service and Privacy Policy,
                        including Cookie Use.
                    </Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    formContainer: {
        width: "100%",
        maxWidth: 400,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: "#1DA1F2",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 100,
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    termsText: {
        fontSize: 12,
        color: "#777",
        textAlign: "center",
        marginTop: 10,
    },
    errorText: {
        color: "red",
        marginBottom: 5,
    },
});
