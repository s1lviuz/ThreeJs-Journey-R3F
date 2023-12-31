import type { Metadata } from 'next'
import NavButtons from './navButtons'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-[100vh]'>
        {children}
        <NavButtons />
    </div>
  )
}