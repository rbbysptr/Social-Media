import { useQuery } from "@apollo/client"
import { GET_ALL_POSTS } from "../queries/PostQueries"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import PostCard from "../components/PostCard";

export default function Home({ navigation }) {
    
    const { loading, error, data } = useQuery(GET_ALL_POSTS);
    if (loading) {
        return <SafeAreaProvider>
            <SafeAreaView style={[styles.container, {
                justifyContent: "center",
                alignItems: "center"
            }]}>
                <ActivityIndicator
                size={"large"}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    }
    if (error) {
        return <SafeAreaProvider>
            <SafeAreaView style={[styles.container, {
                justifyContent: "center",
                alignItems:"center"
            }]}>
                <ActivityIndicator
                size={"large"}
                />
                <Text>Something went wrong :(</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data.findAllPost}
                    renderItem={({ item }) => <PostCard post={item} />}
                    keyExtractor={item => item._id}
                />
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
        marginBottom: 5,
        color: "#333",
    },
    content: {
        fontSize: 16,
        color: "#666",
    },
});

