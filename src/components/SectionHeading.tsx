import type { ReactNode } from 'react'

type SectionHeadingProps = {
  title: ReactNode
  eyebrow?: ReactNode
  description?: ReactNode
  id?: string
  align?: 'start' | 'center'
  className?: string
  reveal?: boolean
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  id,
  align = 'center',
  className = '',
  reveal = true,
}: SectionHeadingProps) {
  return (
    <header
      className={`section-heading section-heading--${align} ${className}`.trim()}
      data-reveal={reveal ? '' : undefined}
    >
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2 id={id} className="display-title">{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
    </header>
  )
}
