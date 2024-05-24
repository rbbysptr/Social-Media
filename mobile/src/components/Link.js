import { Pressable, StyleSheet, Text } from "react-native"


export default function Link({ title, onPress }) {
    return (
        <Pressable style={styles.link} onPress={onPress} >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    link: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "red",
        fontWeight: "bold",
        letterSpacing: 0.25,
        fontSize: 16,
    }
})