import { ArrowUp } from "lucide-react";
import { navItems } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 text-sm text-slate-500 dark:text-slate-400 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <p>&copy; {new Date().getFullYear()} Christian Paul Quema</p>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="footer-link">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#home" aria-label="Back to top" className="back-to-top group">
          <ArrowUp size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
