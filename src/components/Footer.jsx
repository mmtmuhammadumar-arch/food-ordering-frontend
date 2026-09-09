export default function Footer() {
  return (
    <footer className="border-t border-ink/10 py-8">
      <div className="mx-auto max-w-5xl px-6 text-sm text-muted flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>&copy; {new Date().getFullYear()} Tandoor House. All rights reserved.</p>
        <p>Open daily, 11am &ndash; 11pm</p>
      </div>
    </footer>
  );
}
