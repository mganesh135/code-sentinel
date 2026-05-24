// icons.jsx — inline SVG icon library
// All icons render at currentColor; control size via the `size` prop (default 16).

const ico = (size, children, extra = {}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...extra}
  >
    {children}
  </svg>
)

export const Icon = {
  // Brand
  Shield:   ({ size = 16 } = {}) => ico(size, <><path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" /></>),
  Bolt:     ({ size = 16 } = {}) => ico(size, <><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" /></>),

  // Nav / UI
  Home:     ({ size = 16 } = {}) => ico(size, <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>),
  Box:      ({ size = 16 } = {}) => ico(size, <><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v10" /></>),
  Tag:      ({ size = 16 } = {}) => ico(size, <><path d="M20 12l-8 8-9-9V3h8l9 9z" /><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" /></>),
  User:     ({ size = 16 } = {}) => ico(size, <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>),
  Settings: ({ size = 16 } = {}) => ico(size, <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>),
  Book:     ({ size = 16 } = {}) => ico(size, <><path d="M4 4h11a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" /><path d="M4 4v14" /></>),
  Activity: ({ size = 16 } = {}) => ico(size, <><path d="M3 12h4l3-8 4 16 3-8h4" /></>),

  // Actions
  Download:    ({ size = 16 } = {}) => ico(size, <><path d="M12 4v12" /><path d="M7 11l5 5 5-5" /><path d="M5 20h14" /></>),
  ArrowR:      ({ size = 16 } = {}) => ico(size, <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>),
  ArrowL:      ({ size = 16 } = {}) => ico(size, <><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></>),
  Check:       ({ size = 16 } = {}) => ico(size, <><path d="M5 12.5l4.5 4.5L19 7" /></>),
  CheckCircle: ({ size = 16 } = {}) => ico(size, <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>),
  X:           ({ size = 16 } = {}) => ico(size, <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>),
  Copy:        ({ size = 16 } = {}) => ico(size, <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></>),
  Eye:         ({ size = 16 } = {}) => ico(size, <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>),
  EyeOff:      ({ size = 16 } = {}) => ico(size, <><path d="M3 3l18 18" /><path d="M10.6 6.2A10.5 10.5 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.3 4M6.6 6.6C3.7 8.4 2 12 2 12s3.5 7 10 7a10.5 10.5 0 0 0 4.4-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>),
  Plus:        ({ size = 16 } = {}) => ico(size, <><path d="M12 5v14" /><path d="M5 12h14" /></>),
  Logout:      ({ size = 16 } = {}) => ico(size, <><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M9 17l5-5-5-5" /><path d="M14 12H3" /></>),
  Terminal:    ({ size = 16 } = {}) => ico(size, <><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="M6 9l3 3-3 3" /><path d="M12 16h6" /></>),
  Clip:        ({ size = 16 } = {}) => ico(size, <><rect x="8" y="3" width="8" height="4" rx="1" /><path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" /></>),
  Spark:       ({ size = 16 } = {}) => ico(size, <><path d="M12 3l1.8 4.6L18 9.2 13.8 11 12 15.5 10.2 11 6 9.2l4.2-1.6L12 3z" /></>),
  Globe:       ({ size = 16 } = {}) => ico(size, <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></>),
  Lock:        ({ size = 16 } = {}) => ico(size, <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>),
  Card:        ({ size = 16 } = {}) => ico(size, <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 10h19" /></>),
  Chevron:     ({ size = 16 } = {}) => ico(size, <><path d="M6 9l6 6 6-6" /></>),

  // Platforms
  Apple:   ({ size = 16 } = {}) => ico(size, <><path d="M16.3 12.5c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.5 1.2 9.9.8 1.2 1.8 2.5 3.1 2.4 1.3-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.8 1.3-2.9-.1 0-2.7-1-2.7-3.8zM14 4.6c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" fill="currentColor" stroke="none" /></>),
  Linux:   ({ size = 16 } = {}) => ico(size, <><path d="M12 2c-3 0-4.5 2.5-4.5 5.5 0 1.7.4 3 1 4.2-.7 1-1.6 2.3-2.4 3.6-1 1.6-2.1 3.2-2.1 4.4 0 1.3 1.3 2.3 3.2 2.3 1 0 2-.3 2.8-.7.6.3 1.4.5 2 .5s1.4-.2 2-.5c.8.4 1.8.7 2.8.7 1.9 0 3.2-1 3.2-2.3 0-1.2-1.1-2.8-2.1-4.4-.8-1.3-1.7-2.6-2.4-3.6.6-1.2 1-2.5 1-4.2C16.5 4.5 15 2 12 2z" /><circle cx="10" cy="8" r="0.8" fill="currentColor" stroke="none" /><circle cx="14" cy="8" r="0.8" fill="currentColor" stroke="none" /></>),
  Windows: ({ size = 16 } = {}) => ico(size, <><path d="M3 5.5l8-1.2v7.4H3zM12 4.2l9-1.3v9H12zM3 12.3h8v7.4l-8-1.2zM12 12.3h9v9l-9-1.3z" fill="currentColor" stroke="none" /></>),
  Npm:     ({ size = 16 } = {}) => ico(size, <><rect x="3" y="6" width="18" height="12" rx="1" /><path d="M7 18v-8h3v6h2v-6h2v6h2v-6h2v8" fill="currentColor" stroke="none" /></>),
  Brew:    ({ size = 16 } = {}) => ico(size, <><path d="M12 3c-3 0-5 2-5 5 0 1.2.4 2.2 1 3l-1 5c0 1.5 2 3 5 3s5-1.5 5-3l-1-5c.6-.8 1-1.8 1-3 0-3-2-5-5-5z" /><path d="M9 13c1 0 1.5-1 1.5-2.5" /></>),
}
