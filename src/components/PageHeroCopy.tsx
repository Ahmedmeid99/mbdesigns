import { Fragment, type ReactNode } from 'react'

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

type EditorialTitleProps = {
  lines: readonly string[]
}

export function EditorialTitle({ lines }: EditorialTitleProps) {
  if (lines.length === 0) return null

  const lastLine = lines[lines.length - 1].trim()
  const lastSpace = lastLine.lastIndexOf(' ')
  const lastWord = lastSpace === -1 ? lastLine : lastLine.slice(lastSpace + 1)
  const lastLinePrefix = lastSpace === -1 ? '' : lastLine.slice(0, lastSpace)

  return (
    <>
      {lines.slice(0, -1).map((line, index) => (
        <Fragment key={`${line}-${index}`}>
          {line}
          <br />
        </Fragment>
      ))}
      {lastLinePrefix && `${lastLinePrefix} `}
      <em>{lastWord}</em>
    </>
  )
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
