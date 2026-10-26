import type { ReactNode } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import stylesHref from '../styles.css?url'
import designSystemHref from '../design-system.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'MB Designs — award-winning architecture and interior design in Cairo and Dubai.',
      },
      { title: 'MB Designs | Architecture & Interior Design' },
    ],
    links: [
      { rel: 'preload', as: 'font', href: '/assets/fonts/cal-sans-semibold.woff2', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/assets/fonts/league-spartan-bold.woff2', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', as: 'image', href: '/assets/branding/mb-designs-logo-white.png' },
      { rel: 'stylesheet', href: stylesHref },
      { rel: 'stylesheet', href: designSystemHref },
      { rel: 'preload', as: 'image', href: '/assets/images/hero.webp' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}
