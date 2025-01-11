export interface ButtonProps {
  variant: "primary" | "secondry";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: any;
  endIcon?: any;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  return <button></button>;
};
