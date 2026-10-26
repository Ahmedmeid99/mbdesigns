import type { ReactNode } from 'react'

type PageHeroCopyProps = {
  id: string
  eyebrow: ReactNode
  title: ReactNode
  lead?: ReactNode
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  leadClassName?: string
}

export function PageHeroCopy({
  id,
  eyebrow,
  title,
  lead,
  className = '',
  eyebrowClassName = '',
  titleClassName = '',
  leadClassName = '',
}: PageHeroCopyProps) {
  return (
    <div className={`site-page-hero__copy ${className}`.trim()}>
      <p className={`site-page-hero__eyebrow ${eyebrowClassName}`.trim()}>{eyebrow}</p>
      <h1 id={id} className={`display-title site-page-hero__title ${titleClassName}`.trim()}>{title}</h1>
      {lead && <p className={`site-page-hero__lead ${leadClassName}`.trim()}>{lead}</p>}
    </div>
  )
}
