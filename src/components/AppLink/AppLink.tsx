interface AppLinkProps {
  text: string
  href: string
}

export const AppLink = ({text,href} :AppLinkProps) => {
  return (
    <a href={href}>{text}</a>
  )
}
