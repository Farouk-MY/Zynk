import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.zynk}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] h-[300px] w-full"
            resizeMode="contain"
          />

          <View className="relative mt-2">
            <Text className="text-2xl text-white font-bold text-center">
              Discover Endless Possibilities With {' '}
              <Text className="text-secondary-200">Zynk</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8 "
              resizeMode="contain"
            />
          </View>
            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Where Creativity meets innovation: Embark On A Journey Of Limitless Exploration
              With Zynk
            </Text>
            <CustomButton
              title={"Continue With Email"}
              handlePress={()=>router.push('/sign-in')}
              containerStyles={"w-full mt-7"}
            />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
}
