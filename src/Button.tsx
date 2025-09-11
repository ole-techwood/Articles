import useSound from "use-sound";
import buttonSound from "../public/button.mp3";
import type { FC } from "react";
import { type ButtonProps, Styled } from "./button.styled";

export const Button: FC<ButtonProps> = (props) => {
  const [play] = useSound(buttonSound);

  return <Styled.Button {...props} onClick={() => play()}></Styled.Button>;
};
