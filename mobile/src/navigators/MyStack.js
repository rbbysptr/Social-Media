import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LogoutButton from "../components/LogoutButton";
import MyTabs from "./MyTabs";
import DetailPost from "../screen/DetailPost";
import CreatePost from "../screen/CreatePost";
import DetailProfile from "../screen/DetailProfile";
import login from "../screen/login";
import register from "../screen/register";


const Stack = createNativeStackNavigator();

export default function MyStack() {
    const { isSignIn } = useContext(AuthContext);
    
    return (
        <>
        <NavigationContainer>
            <Stack.Navigator>
                {isSignIn ? (
                    <>
                        <Stack.Screen
                            name="Twitter"
                            options={{ headerTitleAlign: "center", headerRight: () => <LogoutButton /> }}
                            component={MyTabs}
                        />
                        <Stack.Screen name="DetailPost" component={DetailPost} />
                        <Stack.Screen name="CreatePost" component={CreatePost} />
                        <Stack.Screen name="DetailProfile" component={DetailProfile} />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="login"
                            options={{ headerShown: false }}
                            component={login}
                        />
                        <Stack.Screen
                            name="register"
                            options={{ headerShown: false }}
                            component={register}
                        />
                    </>
                )}
            </Stack.Navigator>
            </NavigationContainer>
           
        </>
    );
}