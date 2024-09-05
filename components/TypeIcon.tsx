import { Image, Text, View } from "react-native";
import { styled } from "nativewind";

export default function TypeIcon({
  typeList,
}: {
  typeList: string | string[];
}) {
  if (Array.isArray(typeList)) {
    return (
      <View className="flex-row">
        {typeList.map((typeItem) => (
          <TypeIconButton key={typeItem} type={typeItem} />
        ))}
      </View>
    );
  } else {
    return <TypeIconButton type={typeList} />;
  }
}

function TypeIconButton({ type }: { type: string }) {
  return (
    <>
      <Text className="mr-1 bg-grass">{type}</Text>
    </>
  );
}
