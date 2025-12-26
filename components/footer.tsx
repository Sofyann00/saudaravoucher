import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Gift } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col gap-6 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand + short description */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-md">
                <Gift className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                SaudaraVoucher
              </span>
            </div>
            <p className="hidden sm:block text-xs sm:text-sm text-slate-500 max-w-xs">
              Platform top up dan voucher game yang fokus pada keamanan, kecepatan, dan transparansi.
            </p>
          </div>

          {/* Simple nav + contact in one row */}
          <div className="flex flex-col items-start sm:items-end gap-3 text-xs sm:text-sm">
            <nav className="flex flex-wrap gap-x-4 gap-y-2 text-slate-600">
              <Link href="/about" className="hover:text-teal-600 transition-colors">
                Tentang Kami
              </Link>
              <Link href="/terms" className="hover:text-teal-600 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-teal-600 transition-colors">
                Privacy
              </Link>
              <Link href="/refund-policy" className="hover:text-teal-600 transition-colors">
                Refund
              </Link>
              <Link href="/seller-terms" className="hover:text-teal-600 transition-colors">
                Syarat Seller
              </Link>
            </nav>
            <div className="flex flex-wrap items-center gap-3 text-slate-500">
              <a
                href="mailto:admin@SaudaraVoucher.com"
                className="inline-flex items-center gap-1.5 hover:text-teal-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>admin@SaudaraVoucher.com</span>
              </a>
              <span className="hidden sm:inline text-slate-300">•</span>
              <a
                href="https://wa.me/6285811959392"
                className="inline-flex items-center gap-1.5 hover:text-teal-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>0858 1195 9392</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] sm:text-xs text-slate-500">
              © {new Date().getFullYear()} SaudaraVoucher. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
