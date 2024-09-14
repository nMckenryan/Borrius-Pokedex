import "../../global.css";
import { Avatar, Skeleton } from "@rneui/themed";

export default function SpriteAvatar({
  spriteUrl,
  size,
}: {
  spriteUrl: string;
  size: number | "small" | "large" | "medium" | "xlarge";
}) {
  return (
    <>
      {!spriteUrl ? (
        <Skeleton circle width="100%" />
      ) : (
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
      )}
    </>
  );
}
