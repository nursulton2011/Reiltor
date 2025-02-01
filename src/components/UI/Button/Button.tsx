interface ButtonProps{
  text:string;
  type?: "button" | "submit" | "reset"
}

export const Button = ({text,type="button"}: ButtonProps) => {
  return (
    <button type={type}>{text}</button>
  )
}
