import { PropsWithChildren } from "react";
import styled from "styled-components";
import Spinner from "../components/spinner";

const StyledButton = styled.button.attrs((props) => ({
  className:
    "flex justify-center gap-4 rounded-lg from-primary-700 to-primary-550 uppercase text-white p-3.5 font-semibold shadow-3xl bg-gradient-to-l " +
    (props.disabled ? "to-primary-700" : "hover:bg-gradient-to-t"),
}))``;

interface ButtonProps extends PropsWithChildren<any> {
  disabled?: boolean;
  showSpinner?: boolean;
}

export default function Button({
  disabled = false,
  showSpinner = true,
  children,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
      {showSpinner && disabled ? <Spinner className="h-5 w-5" /> : null}
    </StyledButton>
  );
}
