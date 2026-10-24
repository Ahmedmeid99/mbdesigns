import type { HTMLAttributes, ReactNode } from 'react'

type ContainerElement = 'div' | 'section' | 'main' | 'header' | 'footer' | 'article'

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ContainerElement
  children: ReactNode
  fluid?: boolean
  size?: 'wide' | 'content' | 'narrow'
}

export function Container({
  as: Element = 'div',
  children,
  className = '',
  fluid = false,
  size = 'wide',
  ...props
}: ContainerProps) {
  return (
    <Element className={`layout-container layout-container-${size}${fluid ? ' layout-container-fluid' : ''} ${className}`.trim()} {...props}>
      {children}
    </Element>
  )
}
