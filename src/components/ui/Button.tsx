"use client";
type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
};
export default function Button({ text, onClick, red = false }: Props) {
  return (
    <button
      className={`border-none outline-0 py-2 px-8 text-white font-bold leading-4 rounded-md ${
        red ? "bg-red-500" : "bg-sky-500"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
