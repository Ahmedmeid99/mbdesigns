type ArrowDirection = 'up-right' | 'up' | 'down'

export function ArrowIcon({ direction = 'up-right' }: { direction?: ArrowDirection }) {
  const path = direction === 'up'
    ? 'M12 19V5m0 0-5 5m5-5 5 5'
    : direction === 'down'
      ? 'M12 5v14m0 0 5-5m-5 5-5-5'
      : 'M7 17 17 7m0 0H8m9 0v9'

  return (
    <svg className="icon icon-directional" viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}
