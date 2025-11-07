import { motion } from 'framer-motion'

/**
 * PillRail - Canonical pill navigation component
 *
 * Single source of truth for all pill-based navigation in the app.
 * Used in: header nav, page tabs/filters, anywhere pills are needed.
 *
 * Non-negotiable rules:
 * - Same pill shape, height, radius, typography, motion EVERYWHERE
 * - Same active/hover/focus tokens EVERYWHERE
 * - Icons optional, never required
 * - Works identically in light/dark; no one-off overrides
 *
 * If any nav element doesn't use PillRail, it's a bug.
 */

/**
 * @typedef {Object} PillItem
 * @property {string} id - Route/item key
 * @property {string} label - Display label
 * @property {React.ComponentType} [icon] - Optional React icon component
 * @property {number} [badgeCount] - Optional badge count
 * @property {boolean} [disabled] - Whether pill is disabled
 */

/**
 * PillRail Component
 *
 * @param {Object} props
 * @param {PillItem[]} props.items - Array of pill items
 * @param {string} props.activeId - Currently active item ID
 * @param {(id: string) => void} props.onChange - Callback when pill is clicked
 * @param {'sm' | 'md'} [props.size='sm'] - Pill size (sm for header, md for page body)
 * @param {'left' | 'center' | 'justify'} [props.align='left'] - Alignment of pills
 * @param {boolean} [props.scrollable=false] - Enable horizontal scrolling
 * @param {boolean} [props.elevated=false] - Add subtle card feel for plain backgrounds
 */
export default function PillRail({
  items,
  activeId,
  onChange,
  size = 'sm',
  align = 'left',
  scrollable = false,
  elevated = false
}) {
  // Size-specific height classes (fixed, never deviate)
  const heightClass = size === 'sm' ? 'h-9' : 'h-10'

  // Horizontal padding based on size
  const paddingClass = size === 'sm' ? 'px-4' : 'px-5'

  // Font size based on size
  const fontClass = size === 'sm' ? 'text-sm' : 'text-base'

  // Icon size based on size
  const iconClass = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'

  // Container alignment
  const alignmentClass = {
    left: 'justify-start',
    center: 'justify-center',
    justify: 'justify-between'
  }[align]

  // Container classes
  const containerClass = `
    flex items-center gap-2
    ${alignmentClass}
    ${scrollable ? 'overflow-x-auto no-scrollbar touch-pan-x' : 'flex-wrap'}
    ${elevated ? 'bg-white/50 dark:bg-neutral-900/50 rounded-full p-1 shadow-soft' : ''}
  `.trim()

  return (
    <nav className={containerClass} role="navigation">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeId === item.id
        const isDisabled = item.disabled

        return (
          <button
            key={item.id}
            onClick={() => !isDisabled && onChange(item.id)}
            disabled={isDisabled}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={isDisabled}
            className={`
              inline-flex items-center justify-center gap-2
              ${heightClass}
              ${paddingClass}
              ${fontClass}
              rounded-full
              font-medium
              whitespace-nowrap
              transition-all duration-200
              focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2
              ${
                isDisabled
                  ? 'bg-transparent text-neutral-400 dark:text-neutral-400 cursor-not-allowed pointer-events-none'
                  : isActive
                  ? `
                    bg-brand-600 dark:bg-brand-500
                    text-white
                    shadow-soft
                    hover:shadow-md
                  `.trim()
                  : `
                    bg-transparent
                    text-neutral-500 dark:text-neutral-400
                    hover:bg-neutral-100 dark:hover:bg-neutral-800
                    hover:text-neutral-800 dark:hover:text-neutral-100
                  `.trim()
              }
            `}
          >
            {Icon && <Icon className={`${iconClass} flex-shrink-0`} />}
            <span>{item.label}</span>
            {item.badgeCount !== undefined && item.badgeCount > 0 && (
              <span
                className="
                  inline-flex items-center justify-center
                  min-w-[18px] h-[18px]
                  px-1.5
                  text-[10px] font-bold
                  bg-white/20
                  rounded-full
                "
              >
                {item.badgeCount > 99 ? '99+' : item.badgeCount}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}
