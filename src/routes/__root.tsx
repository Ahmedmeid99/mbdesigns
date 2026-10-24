import type { ReactNode } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { SiteFooter } from '../components/SiteFooter'
import stylesHref from '../styles.css?url'

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
      { rel: 'stylesheet', href: stylesHref },
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
        {children}
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}
