"use client"

import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { User, LogOut, Search, Menu, X, Gift } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/data"

export function Navbar() {
  const { user, logout } = useUser()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setShowSearchResults(query.length > 0)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl shadow-[0_4px_18px_rgba(15,23,42,0.04)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 md:h-18 flex items-center justify-between gap-4">
          {/* Centered main cluster: logo + search, with spacers on sides to keep it visually centered */}
          <div className="hidden md:flex w-20" />

          <div className="flex flex-1 items-center justify-center gap-4 md:gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                <Gift className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
                SaudaraVoucher
              </span>
            </Link>

            {/* Compact desktop search */}
            <div className="relative hidden md:block min-w-[220px] max-w-xs flex-1">
              <input
                type="text"
                placeholder="Cari game atau voucher..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-3.5 py-2 pl-9 rounded-full border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 shadow-inner shadow-white outline-none transition-all duration-150 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15 focus:bg-white hover:bg-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-900/5">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <Link 
                        key={product.id} 
                        href={`/products/${product.id}`}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors"
                        onClick={() => {
                          setSearchQuery("")
                          setShowSearchResults(false)
                        }}
                      >
                        <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-xs sm:text-sm font-medium text-slate-900">
                            {product.name}
                          </p>
                          <p className="truncate text-[11px] text-slate-500">
                            {product.category}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs sm:text-sm text-slate-500">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side: auth + mobile menu */}
          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs sm:text-sm hover:bg-slate-50 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-teal-600 ring-1 ring-teal-100">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="hidden text-xs sm:text-sm font-medium text-slate-800 sm:inline">
                      {user.name}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout()
                      router.push("/")
                    }}
                    className="cursor-pointer text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link 
                  href="/login"
                  className="hidden md:flex px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="hidden md:flex px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-white bg-teal-500 rounded-full hover:bg-teal-600 hover:shadow-md hover:shadow-teal-400/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Daftar
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 md:top-18 border-t border-slate-100 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur-xl md:hidden">
          <div className="px-4 py-4">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 pl-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              
              {/* Mobile Search Results */}
              {showSearchResults && searchQuery && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-slate-100 bg-white shadow-lg shadow-slate-900/5">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <Link 
                        key={product.id} 
                        href={`/products/${product.id}`}
                        className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-50 transition-colors"
                        onClick={() => {
                          setSearchQuery("")
                          setShowSearchResults(false)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {product.name}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {product.category}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-slate-500 text-center">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="block rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      router.push("/")
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex w-full items-center rounded-xl px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50/80"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-teal-400/30 hover:bg-teal-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}