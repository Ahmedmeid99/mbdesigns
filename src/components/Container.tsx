import type { HTMLAttributes, ReactNode } from 'react'

type ContainerElement = 'div' | 'section' | 'main' | 'header' | 'footer' | 'article'

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ContainerElement
  children: ReactNode
  size?: 'wide' | 'content' | 'narrow'
}

export function Container({
  as: Element = 'div',
  children,
  className = '',
  size = 'wide',
  ...props
}: ContainerProps) {
  return (
    <Element className={`layout-container layout-container-${size} ${className}`.trim()} {...props}>
      {children}
    </Element>
  )
}
