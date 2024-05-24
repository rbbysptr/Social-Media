import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../queries/ProfileQueries";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import Profile from "../components/Profile";
import Follow from "../components/Follow";

export default function DetailProfile({ route }) {
    const { authorId } = route.params;
    const { loading, error, data } = useQuery(GET_PROFILE, {
        variables: { _id: authorId }
    });

    if (loading) {
        return <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size={"large"}/>
            </SafeAreaView>
        </SafeAreaProvider>
    }

    if (error) {
        return <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <Text>Something went wrong:( </Text>
            </SafeAreaView>
        </SafeAreaProvider>
    }

    return (
        <SafeAreaProvider>
            <SafeAreaProvider style={styles.container}>
                <Profile user={data?.findUserById} />
                <Follow authorId={authorId}/>
            </SafeAreaProvider>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    }
})