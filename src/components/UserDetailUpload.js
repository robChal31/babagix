import { View, Text, Image } from "react-native";
import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { colors } from "../global";

export default function UserDetailUpload() {
  const { user } = useAuthContext();
  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: user.user.avatar }}
          style={{ width: 50, height: 50, borderRadius: 10 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "400", fontSize: 15 }}>
            {user.user.username}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 12,
              color: colors.secondaryText,
            }}
          >
            {user.user.email}
          </Text>
        </View>
      </View>
      <Text
        style={{
          marginLeft: 5,
          marginTop: 8,
          marginBottom: 5,
          color: colors.secondaryText,
          fontSize: 12,
        }}
      >
        mau babagix apa hari ini?
      </Text>
    </>
  );
}
