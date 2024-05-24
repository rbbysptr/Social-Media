import { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useMutation } from "@apollo/client";
import { ADD_FOLLOW } from "../mutation/FollowMutation";

export default function Follow({ authorId }) {
    const [isFollowing, setFollowing] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState("");
    const [addFollow, setAddFollow] = useState(true);

    const [follow, { data: dataFollow, loading: loadingFollow, error: errorFollow }] = useMutation(ADD_FOLLOW, {
        refetchQueries: [GET_USER_BY_USERNAME],
    });

    const handleFollow = (authorId) => {
        follow({
            variables: {
                followingId: authorId,
            },
        });
        setAddFollow(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    placeholder={"Search username"}
                    style={styles.inputStyle}
                    onChangeText={setSearch}
                    value={search}
                />
                <TouchableOpacity
                    onPress={() => {
                        setIsSearch(true);
                    }}
                    style={styles.buttonSearch}
                >
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
            {isSearch && (
                <>
                    <Text style={styles.followText}>Search Results</Text>
                    <FlatList
                        data={data?.findUserByUsername}
                        keyExtractor={(item) => item?._id}
                        renderItem={({ item }) => (
                            <View style={styles.follow}>
                                <Image
                                    style={styles.profile}
                                    source={{
                                        uri: "https://www.internetmatters.org/wp-content/uploads/2022/09/x-formerly-twitter-article-hero.webp",
                                    }}
                                />
                                <View style={styles.followList}>
                                    <Text style={styles.followName}>{item?.name}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleFollow(item?._id)}
                                    style={styles.followButton}
                                >
                                    <Text style={styles.followButtonText}>Follow</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1.9,
        backgroundColor: "#f9f9f9",
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    followButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    leftButton: {
        flex: 1,
        marginRight: 10,
    },
    rightButton: {
        flex: 1,
        marginLeft: 10,
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        borderWidth: 0,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
    },
    activeButton: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
    },
    follow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginBottom: 10,
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    followList: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        paddingBottom: 5,
    },
    followName: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
    followText: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },
    unfollow: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
    followButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
    },
    unfollowText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
    followButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
    textFollower: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    inputStyle: {
        flex: 1,
        height: 50,
        padding: 10,
        borderRadius: 15,
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        backgroundColor: "gray",
    },
    buttonFollower: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 15,
        width: 100,
        height: 50,
        backgroundColor: "green",
    },
});
