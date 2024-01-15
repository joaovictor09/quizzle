import { NavItems } from './nav-items'
import { ToggleTheme } from './toggle-theme'

export function Header() {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-muted px-4">
      <div className="flex items-center gap-10">
        <h1 className="text-lg font-bold">Quizzles</h1>
        <NavItems />
      </div>

      <ToggleTheme />
    </header>
  )
}
