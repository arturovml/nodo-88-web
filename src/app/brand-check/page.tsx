const assets = [
  { label: "favicon.ico", href: "/favicon.ico" },
  { label: "favicon.svg", href: "/favicon.svg" },
  { label: "apple-touch-icon.png", href: "/apple-touch-icon.png" },
  { label: "og.png", href: "/og.png" },
];

export default function BrandCheckPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl tracking-tight mb-6">Brand check</h1>
        <ul className="space-y-3">
          {assets.map((asset) => (
            <li key={asset.href}>
              <a
                href={asset.href}
                className="text-sm text-zinc-300 hover:text-white underline underline-offset-4"
              >
                {asset.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
