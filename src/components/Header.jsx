import { useTheme } from '../context/ThemeContext'
import {
  MdDashboard,
  MdHistory,
  MdAnalytics,
  MdLightMode,
  MdDarkMode
} from 'react-icons/md'
import { motion } from 'framer-motion'

const pages = [
  { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
  { id: 'history', label: 'History', icon: MdHistory },
  { id: 'analytics', label: 'Analytics', icon: MdAnalytics }
]

export default function Header({ currentPage, onNavigate }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <motion.div
        className="header-content"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* LEFT: Brand */}
        <div className="header-brand">
          <div className="header-logo-lockup">
            <div className="header-logo">🦏</div>
            <div className="header-title-block">
              <h1 className="header-title">RhinoGuardians</h1>
              <p className="header-subtitle">
                Real-time Wildlife Protection Console
              </p>
            </div>
          </div>
        </div>

        {/* CENTER: Nav */}
        <nav className="header-nav">
          {pages.map((page, index) => {
            const Icon = page.icon
            const isActive = currentPage === page.id
            return (
              <motion.button
                key={page.id}
                className={`nav-button ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(page.id)}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Icon className="nav-icon" size={18} />
                <span className="nav-label">{page.label}</span>
              </motion.button>
            )
          })}
        </nav>

        {/* RIGHT: Status + Theme */}
        <div className="header-info">
          <div className="status-indicator">
            <span className="status-dot status-online" />
            <span className="status-text">Live feed</span>
          </div>

          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === 'light' ? 'dark' : 'light'
            } mode`}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.18 }}
          >
            {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </motion.button>
        </div>
      </motion.div>
    </header>
  )
}
