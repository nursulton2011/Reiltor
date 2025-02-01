import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  text,
  level = 1,
  className,
  ...props
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={className} {...props}>
      {text}
    </Tag>
  );
};
