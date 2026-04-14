export default function Footer() {
  return (
    <footer className="px-6 py-10 text-sm text-neutral-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} ACAB</p>
        <p>Alle Rechte vorbehalten</p>
      </div>
    </footer>
  );
}
