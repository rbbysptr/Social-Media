import { useMutation } from "@apollo/client";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { POST_ADD } from "../mutation/PostMutation";
import { GET_ALL_POSTS } from "../queries/PostQueries";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";

export default function CreatePost({ navigation }) {
    const [content, setContent] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [addPost, { data, loading, error }] = useMutation(POST_ADD, {
        refetchQueries: [
            GET_ALL_POSTS
        ],
        onCompleted: () => {
            navigation.navigate("Home")
        }
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>What's happening?</Text>
                <TextInput
                    style={styles.input}
                    value={content}
                    onChangeText={setContent}
                    placeholder="Write something..."
                    placeholderTextColor="#ccc"
                    multiline={true}
                />
                <TextInput
                    style={styles.input}
                    value={imgUrl}
                    onChangeText={setImgUrl}
                    placeholder="Image URL (Optional)"
                    placeholderTextColor="#ccc"
                />
                <Button
                    title="Tweet"
                    onPress={() => {
                        addPost({
                            variables: {
                                "postNew": {
                                    "tags": [],
                                    "content": content,
                                    "imgUrl": imgUrl
                                }
                            }
                        });
                    }}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
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
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
        color: "#333",
    },
});
