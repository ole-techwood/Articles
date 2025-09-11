import useSound from "use-sound";
import buttonSound from "../public/button.mp3";
import type { FC } from "react";
import { type ButtonProps, Button as ButtonStyled } from "./button.styled";

export const Button: FC<ButtonProps> = (props) => {
  const [play] = useSound(buttonSound);

  return <ButtonStyled {...props} onClick={() => play()}></ButtonStyled>;
};
