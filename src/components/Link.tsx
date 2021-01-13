import Link from 'next/link'
import { useRouter } from 'next/router'

import { Children, cloneElement, ReactElement } from 'react'

interface ActiveLinkProps {
  children: ReactElement
  activeClassName: string
  href: string
  as?: string
}

export default function ActiveLink({
  children,
  activeClassName,
  ...props
}: ActiveLinkProps): ReactElement {
  const { asPath } = useRouter()

  const child = Children.only(children)
  const childClassName = child.props.className || ''

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link href={props.href} {...props}>
      {cloneElement(child, {
        className: className || null
      })}
    </Link>
  )
}
