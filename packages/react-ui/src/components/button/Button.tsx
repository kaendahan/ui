import React from "react";

export interface ButtonProps extends React.ComponentProps<"button"> {
  size: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }) => {
    return <button {...props} />;
  }
);

export default Button;
