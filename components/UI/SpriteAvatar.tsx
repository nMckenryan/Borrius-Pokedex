import "../../global.css";
import { Avatar, Skeleton } from "@rneui/themed";

export default function SpriteAvatar({
  spriteUrl,
  size,
}: {
  spriteUrl: string;
  size: number | "small" | "large" | "medium" | "xlarge";
}) {
  const avatarSize = window.innerWidth < 768 ? "small" : size;
  return (
    <>
      {!spriteUrl ? (
        <Skeleton circle width="100%" />
      ) : (
        <Avatar
          size={avatarSize}
          rounded
          source={{
            uri: spriteUrl || "../../assets/questionMark.png",
          }}
          containerStyle={{
            backgroundColor: "#e7e5e4",
          }}
        />
      )}
    </>
  );
}
