/**
 * Public layout: landing, login, signup. No auth required.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
