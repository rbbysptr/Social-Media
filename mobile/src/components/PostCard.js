import { useNavigation } from "@react-navigation/native"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PostCard({ post }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.push("DetailPost",{_id: post._id})}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.push("DetailProfile",{authorId:post.authorId})
                }
                >
                    <Image
                        src={"https://www.internetmatters.org/wp-content/uploads/2022/09/x-formerly-twitter-article-hero.webp"}
                        style={styles.userImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.push("DetailProfile",{authorId:post.authorId})
                }
                >
                    <Text style={styles.userName}>
                        {post.author ? post.author.name: "Unknown User"}
                </Text>
                </TouchableOpacity>
            </View>
            <Image source={{ uri: post.imgUrl }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{post.content}</Text>
                <Text style={styles.tags}>{post.tags.join(", ")}</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.iconContainer}>
                    <Feather name="thumbs-up" size={20} color="#333" />
                    <Text style={styles.iconText}>{post.likes.length} Likes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconContainer}>
                    <Feather name="message-circle" size={20} color="#333" />
                    <Text style={styles.iconText}>{post.comments.length} Comments</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 15,
        marginRight: 20,
        backgroundColor: "tomato",
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 10,
        marginBottom: 10,
    },
    textContainer: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    tags: {
        color: "#666",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderColor: "#eee",
        paddingTop: 10,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconText: {
        marginLeft: 5,
        color: "#333",
    },
});
