import { useQuery } from "@apollo/client"
import { LOGIN_USER_CURRENT } from "../queries/LoginUserCurrentQueries"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native"


export default function TabUserProfile({ navigation, route }) {
    const { data, loading, error } = useQuery(LOGIN_USER_CURRENT)
    if (loading) {
        return <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator
                size={"large"}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    }
    if (error) {
        return <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator
                    size={"large"}
                />
                <Text>Something went wrong :( </Text>
            </SafeAreaView>
        </SafeAreaProvider>
    }
    const user = {
        imageUrl: "https://e7.pngegg.com/pngimages/41/168/png-clipart-tom-cat-jerry-mouse-tom-and-jerry-cartoon-tom-and-jerry-tom-jerry-display-mammal-cat-like-mammal.png"
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>My Profile</Text>
                    <Image source={{ uri: user.imageUrl }} style={styles.userImage} />
                    <Text>Name:{data.findLoginUserCurrent.name}</Text>
                    <Text>Username:{data.findLoginUserCurrent.username}</Text>
                    <Text>Email:{data.findLoginUserCurrent.email}</Text>
                    {/* <Text>Following:{data.findLoginUserCurrent.Following.length}</Text>
                    <Text>Followers:{data.findLoginUserCurrent.Followers.length}</Text> */}
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

