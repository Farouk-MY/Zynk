import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";


const FormField = ({
  title,
  handleChangeText,
  otherStyles,
  placeHolder,
  value,
  ...props
}) => {

    const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 text-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput className="flex-1 text-white font-psemibold text-base"
            placeholder={placeHolder}
            value={value}
            onChangeText={handleChangeText}
            placeholderTextColor="#7b7b8b"
            secureTextEntry={title==='Password' && !showPassword}
        />
        {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className="h-8 w-8" resizeMode="contain"/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
