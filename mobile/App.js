import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from "expo-secure-store";
import { AuthContext } from './src/context/auth';
import { ApolloProvider } from '@apollo/client';
import client from './src/config/apolloClient';
import MyStack from './src/navigators/MyStack';


export default function App() {
  const [isSignIn, setSignIn] = useState(false);

  useEffect(() => {
    async function restoreToken() {
      const formSecureStore = await SecureStore.getItemAsync("access_token")
      if (formSecureStore) {
        setSignIn(true)
      }
    }
    restoreToken()
  }, []);

  return (
    <AuthContext.Provider value={{ isSignIn, setSignIn }}>
      <ApolloProvider client={client}>
        <MyStack />
      </ApolloProvider>
    </AuthContext.Provider>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
