import React from 'react';

interface HeadingProps {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6; // Prop for specifying the heading level
}

export const Heading: React.FC<HeadingProps> = ({ text, level = 1 }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements; // Dynamically selecting the heading tag

  return <Tag>{text}</Tag>;
}


