import { Text, View } from "react-native";
import {Link} from "expo-router";
import {useAuthStore} from "../store/authStore";
import {useEffect} from "react";

export default function Index() {
   const {user , token,checkAuth} = useAuthStore();
    useEffect(() => {
        checkAuth();
    }, []);
    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello{user?.username}</Text>
        <Link href="(auth)/signup">Signup</Link>
        <Link href="(auth)">Login</Link>

    </View>
  );
}
