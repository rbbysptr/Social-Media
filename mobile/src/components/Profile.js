import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export default function Profile({ user }) {
    const User = {
        imageUrl: "https://e7.pngegg.com/pngimages/41/168/png-clipart-tom-cat-jerry-mouse-tom-and-jerry-cartoon-tom-and-jerry-tom-jerry-display-mammal-cat-like-mammal.png"
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>Profile</Text>
                    <Image source={{ uri: User?.imageUrl }} style={styles.userImage} />
                    <Text style={styles.text}>Name: {user?.name}</Text>
                    <Text style={styles.text}>Username: {user?.username}</Text>
                    <Text style={styles.text}>Email: {user?.email}</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    postItem: {
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
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 50,
        color: "#333",
        textAlign: "center",
    },
    content: {
        fontSize: 16,
        color: "#666",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: "#eee",
    }
});