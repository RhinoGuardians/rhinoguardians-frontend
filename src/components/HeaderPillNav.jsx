import * as React from 'react'
import { LayoutGroup, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { MdLightMode, MdDarkMode, MdShield } from 'react-icons/md'

/**
 * HeaderPillNav - Integrated header with FLIP-animated pill navigation
 *
 * Features:
 * - Logo + slogan always visible on ≥sm, smallest screens show ONLY the logo
 * - FLIP animation for pill selection using Framer Motion layoutId
 * - Keyboard accessible (arrow keys)
 * - Dark mode friendly
 * - Responsive from 360px → desktop
 * - Slightly rounded (rounded-xl), not fully circular
 */
export default function HeaderPillNav({
  items = [],
  value,
  onChange,
  logo,
  slogan = 'Wildlife Protection',
  ariaLabel = 'Primary navigation',
  className = '',
}) {
  const { activeTheme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = React.useState(false)
  const { scrollY } = useScroll()

  // Detect scroll for header elevation effect
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20)
  })

  const selectedIndex = Math.max(
    0,
    items.findIndex((i) => i.id === value)
  )

  const handleKeyDown = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    if (!items.length) return
    const dir = e.key === 'ArrowRight' ? 1 : -1
    const next = (selectedIndex + dir + items.length) % items.length
    onChange(items[next].id)
  }

  const activeId = value ?? (items[0]?.id ?? '')

  return (
    <header
      className={[
        'sticky top-0 z-40 w-full',
        'px-3 py-2 md:px-6 md:py-3',
        'backdrop-blur-xl',
        'border-b border-neutral-200/70 dark:border-neutral-900/80',
        'transition-shadow duration-300',
        scrolled ? 'shadow-soft' : '',
        className,
      ].join(' ')}
      style={{
        background:
          activeTheme === 'light'
            ? 'linear-gradient(to bottom, rgb(250 250 250 / 0.97) 0%, rgb(250 250 250 / 0.95) 100%)'
            : 'linear-gradient(to bottom, rgb(10 10 10 / 0.97) 0%, rgb(10 10 10 / 0.95) 100%)',
      }}
    >
      <div
        className={[
          'mx-auto max-w-6xl',
          'flex flex-col gap-3',
          'sm:flex-row sm:items-center sm:gap-4',
        ].join(' ')}
      >
        {/* BRAND: logo always, slogan >= sm only */}
        <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
          <motion.div
            className={[
              'h-9 w-9 md:h-10 md:w-10',
              'flex items-center justify-center',
              'rounded-xl',
              'bg-gradient-to-br from-brand-600 to-brand-700',
              'text-white text-lg font-semibold',
              'shadow-soft',
              'transition-shadow duration-200',
            ].join(' ')}
            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {logo ?? <MdShield className="h-5 w-5 md:h-6 md:w-6" />}
          </motion.div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-sm md:text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              RhinoGuardians
            </span>
            {slogan && (
              <span
                className={[
                  'hidden sm:inline',
                  'text-[10px] md:text-xs',
                  'text-neutral-500 dark:text-neutral-400',
                  'truncate',
                ].join(' ')}
              >
                {slogan}
              </span>
            )}
          </div>
        </div>

        {/* NAV PILL RAIL + ACTIONS */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <LayoutGroup id="pill-rail">
            <div className="flex-1 sm:min-w-0" onKeyDown={handleKeyDown}>
              <nav
                aria-label={ariaLabel}
                className={[
                  'w-full max-w-full',
                  'rounded-2xl border',
                  'border-neutral-200/75 dark:border-neutral-800/85',
                  'bg-white/75 dark:bg-neutral-950/65',
                  'backdrop-blur supports-[backdrop-filter]:bg-white/60',
                  'px-1.5 py-1.5',
                ].join(' ')}
              >
                <div
                  role="tablist"
                  aria-orientation="horizontal"
                  className={[
                    'flex items-stretch gap-1',
                    'overflow-x-auto',
                    'snap-x snap-mandatory',
                    'sm:justify-center',
                    'p-0.5 rounded-xl',
                    'no-scrollbar',
                  ].join(' ')}
                >
                  {items.map((item) => {
                    const Icon = item.icon
                    const active = item.id === activeId
                    return (
                      <div
                        key={item.id}
                        className="relative snap-center"
                        role="presentation"
                      >
                        <button
                          type="button"
                          role="tab"
                          aria-selected={active}
                          aria-current={active ? 'page' : undefined}
                          onClick={() => onChange(item.id)}
                          className={[
                            'relative isolate',
                            'h-9 md:h-10 px-3 md:px-4',
                            'rounded-xl', // hard-ish corners, not full pill
                            'inline-flex items-center gap-2',
                            'text-xs md:text-sm font-medium',
                            active
                              ? 'text-neutral-900 dark:text-neutral-50'
                              : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white',
                            'transition-colors',
                            'focus:outline-none',
                            'focus-visible:ring-2 focus-visible:ring-offset-0',
                            'focus-visible:ring-brand-600/70 dark:focus-visible:ring-brand-500/70',
                            'whitespace-nowrap',
                          ].join(' ')}
                        >
                          {active && (
                            <motion.span
                              layoutId="active-pill-bg"
                              transition={{
                                type: 'spring',
                                stiffness: 480,
                                damping: 38,
                                mass: 0.5,
                              }}
                              className={[
                                'absolute inset-0 -z-10',
                                'rounded-xl',
                                'bg-gradient-to-b from-white to-neutral-100',
                                'dark:from-neutral-850 dark:to-neutral-900',
                                'shadow-[0_1px_3px_rgba(15,23,42,.16)]',
                                'dark:shadow-[0_1px_3px_rgba(0,0,0,.75)]',
                                'border border-neutral-200/85 dark:border-neutral-700/85',
                              ].join(' ')}
                            />
                          )}

                          {Icon && (
                            <span
                              aria-hidden
                              className="flex items-center justify-center"
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                          )}
                          <span>{item.label}</span>
                        </button>
                      </div>
                    )
                  })}
                </div>
              </nav>
            </div>
          </LayoutGroup>

          {/* RIGHT: Status + Theme toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Status pill */}
            <div
              className={[
                'flex items-center gap-2',
                'px-3 py-1.5 rounded-full',
                'h-9',
                'bg-neutral-100/80 dark:bg-neutral-900/80',
                'border border-neutral-200 dark:border-neutral-800',
              ].join(' ')}
            >
              <span
                className={[
                  'h-2 w-2 rounded-full bg-emerald-500',
                  'shadow-[0_0_8px_rgb(16_185_129)]',
                  'animate-pulse',
                ].join(' ')}
              />
              <span
                className={[
                  'text-xs font-medium',
                  'text-neutral-700 dark:text-neutral-300',
                  'hidden sm:inline',
                ].join(' ')}
              >
                Live
              </span>
            </div>

            {/* Theme toggle */}
            <button
              className={[
                'flex items-center justify-center',
                'h-9 w-9 rounded-full',
                'bg-neutral-100/80 dark:bg-neutral-900/80',
                'border border-neutral-200 dark:border-neutral-800',
                'text-neutral-600 dark:text-neutral-400',
                'hover:text-neutral-900 dark:hover:text-neutral-50',
                'hover:bg-neutral-200 dark:hover:bg-neutral-800',
                'hover:border-neutral-300 dark:hover:border-neutral-700',
                'transition-all duration-200',
                'focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2',
              ].join(' ')}
              onClick={toggleTheme}
              aria-label={`Switch to ${activeTheme === 'light' ? 'dark' : 'light'} mode`}
            >
              {activeTheme === 'light' ? (
                <MdDarkMode className="h-5 w-5" />
              ) : (
                <MdLightMode className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
