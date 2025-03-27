import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello</Text>
        <Link href="(auth)/signup">Signup</Link>
        <Link href="(auth)">Login</Link>

    </View>
  );
}
