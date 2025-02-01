import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage: string | undefined;
  isError: boolean;
}

export const Input = ({
  type,
  placeholder,
  errorMessage,
  isError,
  ...props
}: InputProps) => {
  return (
    <div>
      <input type={type} placeholder={placeholder} {...props} />
      {isError && (
        <p style={{ color: "red", marginBottom: "4px" }}>{errorMessage}</p>
      )}
    </div>
  );
};
