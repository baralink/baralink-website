const footerLinks = {
  Product: ["Features", "Pricing", "Integrations"],
  Company: ["About", "Customers", "Careers"],
  Resources: ["Blog", "Help Center", "Contact"],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1AE6] text-sm font-black text-white">
                B
              </div>
              <span className="text-xl font-bold text-slate-900">BaraLink</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Helping ambitious teams turn marketing interest into measurable growth with less friction and faster follow-up.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                {title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition hover:text-[#1A1AE6]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 BaraLink. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-[#1A1AE6]">
              Privacy
            </a>
            <a href="#" className="hover:text-[#1A1AE6]">
              Terms
            </a>
            <a href="#" className="hover:text-[#1A1AE6]">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
