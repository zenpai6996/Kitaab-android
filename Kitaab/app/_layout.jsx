import {Stack, useRouter, useSegments} from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import {StatusBar} from "expo-status-bar";

export default function RootLayout() {

    const router = useRouter();
    const segments = useSegments();



  return(
      <SafeAreaProvider>
       <SafeScreen>
         <Stack screenOptions={{headerShown:false}}>
           <Stack.Screen name={"(tabs)"}/>
           <Stack.Screen name={"(auth)"}/>
         </Stack>
       </SafeScreen>
        <StatusBar style={"dark"}/>
      </SafeAreaProvider>
  );
}
