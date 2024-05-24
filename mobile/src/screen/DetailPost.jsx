import { useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GET_POSTS_BY_ID } from "../queries/PostByIdQueries";
import { Image } from "react-native";
import { COMMENT_ADD } from "../mutation/CommentMutation";
import { ADD_LIKE } from "../mutation/LikeMutation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function DetailPost({ navigation, route }) {
    const { _id } = route.params;
    const { loading, error, data } = useQuery(GET_POSTS_BY_ID, {
        variables: { id: _id }
    });
    const [commentContent, setCommentContent] = useState("");
    const [likes, setLikes] = useState(data?.findPostById?.likes?.length || 0);
    const [addComment] = useMutation(COMMENT_ADD, {
        refetchQueries: [
            GET_POSTS_BY_ID,
        ],
        onCompleted: () => {
            navigation.navigate("DetailPost", { _id:_id })
            setCommentContent("")
        }
    });
    const [addLike] = useMutation(ADD_LIKE, {
        refetchQueries: [
            GET_POSTS_BY_ID,
        ],
        onCompleted: () => {
            setLikes(likes + 1);
        }
    });
    if (loading) {
        return (
            <SafeAreaView style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        )
    }
    if (error || !data.findPostById) {
        return (
            <SafeAreaView style={[styles.container, styles.center]}>
                <Text>Something went wrong :( </Text>
            </SafeAreaView>
        )
    }
    const { content, tags, imgUrl, author, comments } = data.findPostById;
    return (
        <SafeAreaView style={styles.container} >
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>POST BY:</Text>
                    <Text style={styles.name}>Name: {author.name}</Text>
                    <Text style={styles.content}>{content}</Text>
                    <Text style={styles.tags}>Tags: {tags.join(", ")}</Text>
                    <View style={styles.likeContainer}>
                        <TouchableOpacity style={styles.likeButton}
                            onPress={async() => {
                                await addLike({
                                    variables: {
                                        "likeNew": {
                                            "postId": _id
                                        },
                                    },
                                });
                            }}>
                            <Feather name="thumbs-up" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.likes}>{likes}</Text>
                    </View>
                    <Image source={{ uri: imgUrl }} style={styles.imgUrl} />
                    <Text style={styles.commentTitle}>Comments:</Text>
                    {comments.map((comment, index) => (
                        <View key={index} style={styles.commentContainer}>
                            <Text style={styles.commentContent}>{comment.content}</Text>
                            <Text style={styles.commentAuthor}>By: {comment.username}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.commentForm}>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Add comment..."
                        value={commentContent}
                        onChangeText={(text) => setCommentContent(text)}
                    />
                    <TouchableOpacity style={styles.commentButton}
                        onPress={async() => {
                            await addComment({
                                variables: {
                                    "commentNew": {
                                        "content": commentContent,
                                        "postId": _id
                                    },
                                },
                            });
                        }}>
                        <Text style={styles.commentButtonText}>Comment</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </ SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 15,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24,
    },
    tags: {
        fontSize: 16,
        fontStyle: "italic",
        marginBottom: 10,
        color: "#666",
    },
    imgUrl: {
        height: 250,
        width: "100%",
        marginBottom: 10,
        borderRadius: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    commentContainer: {
        backgroundColor: "#f9f9f9",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    commentContent: {
        fontSize: 14,
        marginBottom: 5,
    },
    commentAuthor: {
        fontSize: 12,
        color: "#666",
    },
    commentForm: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    },
    commentButton: {
        backgroundColor: "#333",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
    },
    commentButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    likeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    likeButton: {
        backgroundColor: "#318bfb",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        marginRight: 10,
    },
    likes: {
        fontSize: 16,
        color: "#333",
    },
});