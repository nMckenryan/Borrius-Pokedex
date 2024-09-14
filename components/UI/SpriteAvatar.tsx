import "../../global.css";
import { Avatar } from "@rneui/themed";

export default function SpriteAvatar({
  spriteUrl,
  size,
}: {
  spriteUrl: string;
  size: number | "small" | "large" | "medium" | "xlarge";
}) {
  return (
    <Avatar
      size={size}
      rounded
      source={{
        uri: spriteUrl || "../../assets/questionMark.png",
      }}
      containerStyle={{
        backgroundColor: "lightgray",
      }}
    />
  );
}
