import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      id="game"
      placeholder="Selecione o game que deseja jogar"
      className="bg-zinc-900 py-4 px-3 rounded text-small placeholder:text-zinc-500"
    />
  );
}
