import Link from 'next/link'

import { Button } from './ui/button'

export function NavItems() {
  const items = [
    {
      text: 'Home',
      href: '/',
    },
  ]

  return (
    <nav>
      {items.map((item) => (
        <Button variant={'link'} key={item.href} asChild>
          <Link href={item.href}>{item.text}</Link>
        </Button>
      ))}
    </nav>
  )
}
