import Container from './ui/Container'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 py-8 text-sm text-gray-600 dark:text-gray-400">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} JobGhor. All rights reserved.</p>
        <p>
          Built with <span className="text-brand-600">React</span> & Tailwind.
        </p>
      </Container>
    </footer>
  )
}
