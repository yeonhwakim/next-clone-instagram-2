type AvatarSize = "small" | "medium" | "large" | "xlarge";
type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};
export default function Avatar({
  image,
  size = "large",
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        className={`bg-white object-cover rounded-full ${
          getImageSizeStyle(size).image
        }`}
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = "rounded-full flex justify-center items-center";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const { container } = getImageSizeStyle(size);
  return `${baseStyle} ${highlightStyle} ${container}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
};
function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  switch (size) {
    case "small":
      return { container: "w-9 h-9", image: "w-[34px] h-[34px]" };
    case "medium":
      return { container: "w-11 h-11", image: "w-[42px] h-[42px]" };
    case "large":
      return { container: "w-[68px] h-[68px]", image: "w-16 h-16" };
    case "xlarge":
      return { container: "w-[142px] h-[142px]", image: "w-[138px] h-[138px]" };
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}
