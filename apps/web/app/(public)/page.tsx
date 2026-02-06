import Link from 'next/link'
import { ROUTES } from '@repo/constants'
import { LandingCta } from '@/src/components/LandingCta'

const features = [
  {
    title: 'Secure auth',
    description:
      'Sign up and sign in with email and password, backed by Supabase.',
  },
  {
    title: 'Monorepo',
    description:
      'Shared packages for database, types, and constants across API and web.',
  },
  {
    title: 'Type-safe API',
    description:
      'Hono API with Prisma and shared TypeScript types end to end.',
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-dvh min-h-screen flex-col bg-(--background) text-(--foreground)">
      {/* Header — full width */}
      <header className="sticky top-0 z-50 w-full border-b border-(--border) bg-(--background)/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 md:px-8 lg:px-10">
          <Link
            href={ROUTES.HOME}
            className="text-lg font-semibold tracking-tight sm:text-xl"
          >
            App
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href={ROUTES.AUTH_LOGIN}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-(--muted-foreground) transition-colors hover:bg-(--card) hover:text-(--foreground) sm:px-4"
            >
              Log in
            </Link>
            <Link
              href={ROUTES.AUTH_SIGNUP}
              className="rounded-lg bg-(--accent) px-3 py-2.5 text-sm font-semibold text-(--accent-foreground) transition-opacity hover:opacity-90 sm:px-4"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero — full viewport height minus header */}
        <section className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center sm:min-h-[calc(100dvh-4rem)]">
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-10 lg:py-32">
            <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Build faster with{' '}
                <span className="text-(--accent)">one stack</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-(--muted-foreground) sm:mt-6 sm:text-lg md:text-xl">
                Monorepo with Hono, Next.js, Prisma and Supabase. Shared types
                and constants so you ship without duplication.
              </p>
              <div className="mt-8 sm:mt-10">
                <LandingCta />
              </div>
            </div>
          </div>
        </section>

        {/* Features — full width, responsive grid */}
        <section className="w-full border-t border-(--border) bg-(--card)">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-10 lg:py-28">
            <h2 className="text-center text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              What you get
            </h2>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-(--muted-foreground) sm:mt-3 sm:text-base">
              Everything you need to ship a full-stack app.
            </p>
            <ul className="mx-auto mt-10 grid w-full max-w-5xl gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {features.map((f) => (
                <li
                  key={f.title}
                  className="rounded-xl border border-(--border) bg-(--background) p-5 transition-colors hover:border-(--muted-foreground)/30 sm:p-6"
                >
                  <h3 className="text-base font-semibold sm:text-lg">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--muted-foreground)">
                    {f.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom CTA — full width */}
        <section className="w-full border-t border-(--border)">
          <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-10 lg:py-24">
            <div className="mx-auto w-full max-w-2xl rounded-2xl border border-(--border) bg-(--card) px-6 py-12 text-center sm:px-10 sm:py-14">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                Ready to get started?
              </h2>
              <p className="mt-3 text-sm text-(--muted-foreground) sm:mt-4 sm:text-base">
                Create an account and go to your dashboard in seconds.
              </p>
              <div className="mt-8 sm:mt-10">
                <LandingCta />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer — full width, slim */}
      <footer className="w-full border-t border-(--border)">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-6 sm:px-6 md:px-8 lg:px-10">
          <p className="text-center text-xs text-(--muted-foreground) sm:text-sm">
            Built with Turborepo, Hono, Next.js, Prisma & Supabase.
          </p>
        </div>
      </footer>
    </div>
  )
}
