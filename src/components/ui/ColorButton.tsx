type Props = {
  text: string;
  type: "button" | "submit";
  size?: "small" | "big";
  onClick?: () => void;
};

export default function ColorButton({
  text,
  type,
  onClick,
  size = "small",
}: Props) {
  return (
    <div
      className={`rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem] ${
        size === "big" ? "p-[0.3rem]" : "p-[0.15rem]"
      }`}
    >
      <button
        className={`bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity ${
          size === "big" ? "p-4 text-2xl" : "p-[0.3rem] text-base"
        }`}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
