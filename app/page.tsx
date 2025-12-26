"use client"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "@/components/ui/button"
import { ChevronRight, Gamepad2, Gift, CreditCard, ArrowRight, Smartphone, Monitor, Globe, Users, LucideProps, CheckCircle2, Zap, Shield, Sparkles, Search, ShoppingCart, User, LogOut } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { formatPrice } from "@/lib/data"
import { useRef, useState } from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useUser } from "@/contexts/user-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { RedeemCode } from "@/components/redeem-code"

export default function Home() {
  const { user, logout } = useUser()
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [openQna, setOpenQna] = useState<number | null>(null);
  const [points, setPoints] = useState(0)

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setShowSearchResults(query.length > 0)
  }

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 30,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const servicesRef = useRef<HTMLDivElement>(null)
  
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const categories = [
    { name: "PC Gaming", icon: (props: LucideProps) => <Monitor {...props} /> },
    { name: "Console Gaming", icon: (props: LucideProps) => <Gamepad2 {...props} /> },
    { name: "Mobile Gaming", icon: (props: LucideProps) => <Smartphone {...props} /> },
    { name: "Online Gaming", icon: (props: LucideProps) => <Globe {...props} /> },
  ]

  const heroSlides = [
    {
      key: "slide1",
      bg: "/banner_01.jpg",
      title: "Mobile Legends: Bang Bang",
      subtitle: "Get your Starlight, Diamonds, and more!",
    },
    {
      key: "slide2",
      bg: "/banner_02.jpg",
      title: "Free Fire",
      subtitle: "Top up your Diamonds and enjoy the battle!",
    },
    {
      key: "slide3",
      bg: "/banner_03.jpg",
      title: "PUBG Mobile",
      subtitle: "Get your UC and dominate the battleground!",
    },
    {
      key: "slide4",
      bg: "/banner_04.webp",
      title: "Honor of Kings",
      subtitle: "Ultimate 5v5 Hero Battle Game",
    },
    {
      key: "slide5",
      bg: "/banner_05.jpg",
      title: "Ragnarok Guild Championship",
      subtitle: "Join the adventure and win rewards!",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    centerMode: true,
    centerPadding: "0",
    swipeToSlide: true,
    swipe: true,
    touchMove: true,
    customPaging: () => (
      <div className="my-4 h-2 transition-all duration-300">
        <div
          className="!mx-[4px] h-2 w-2 rounded-full bg-white/30 \
          hover:bg-white/50 [.slick-active_&]:w-8 [.slick-active_&]:bg-white"
        />
      </div>
    ),
    dotsClass: "slick-dots flex justify-center w-full",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
          centerMode: false,
        },
      },
    ],
  };

  const marketplaceFeatures = [
    {
      name: 'Top Up Game Credits',
      description: 'Instantly top up your favorite games with a variety of payment methods.',
      icon: <Gamepad2 className="h-8 w-8 text-blue-400" />,
    },
    {
      name: 'Gift Cards',
      description: 'Purchase digital gift cards for popular platforms and games.',
      icon: <Gift className="h-8 w-8 text-purple-400" />,
    },
    {
      name: 'Fast Delivery',
      description: 'Receive your codes and credits within seconds after payment.',
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
    },
    {
      name: 'Secure Payment',
      description: 'Shop with confidence using our secure and trusted payment system.',
      icon: <CreditCard className="h-8 w-8 text-green-400" />,
    },
    {
      name: '24/7 Support',
      description: 'Our support team is ready to help you anytime, anywhere.',
      icon: <Users className="h-8 w-8 text-pink-400" />,
    },
    {
      name: 'Promos & Discounts',
      description: 'Enjoy regular promotions and exclusive discounts for members.',
      icon: <Sparkles className="h-8 w-8 text-orange-400" />,
    },
  ];

  const qnaList = [
    {
      question: "Apakah Diamonds/Chips/Item Game dari SaudaraVoucher.com Legal?",
      answer: (
        <span>
          Semua Diamonds, item dalam game, dan voucher yang dijual di SaudaraVoucher.com <b>100% legal dan bersumber dari developer/publisher</b>. Jangan khawatir, berbelanja di SaudaraVoucher.com dijamin aman.
        </span>
      ),
    },
    {
      question: "Bagaimana Cara Top-Up Diamonds atau Beli Voucher?", 
      answer: (
        <span>
          Cukup pilih game Anda, pilih item atau voucher yang diinginkan, masukkan ID pemain, dan selesaikan pembayaran. Pesanan Anda akan diproses secara instan!
        </span>
      ),
    },
    {
      question: "Apakah Bisa Bayar Menggunakan QRIS?",
      answer: (
        <span>
          Ya, SaudaraVoucher.com mendukung berbagai metode pembayaran termasuk QRIS dan Virtual Account.
        </span>
      ),
    },
    {
      question: "Pembayaran Berhasil, Tapi Item Belum Diterima?",
      answer: (
        <span>
          Silakan hubungi layanan pelanggan kami dengan detail pesanan Anda. Kami akan membantu menyelesaikan masalah Anda secepatnya.
        </span>
      ),
    },
    {
      question: "Mengapa Harus Beli di SaudaraVoucher.com?",
      answer: (
        <span>
          Kami menawarkan pengiriman cepat, pembayaran aman, dan hanya produk resmi dan legal. Kepuasan dan keamanan Anda adalah prioritas kami!
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO + QUICK SEARCH */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-white via-slate-50 to-slate-100/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[3fr,2fr] gap-10 lg:gap-14 items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-[11px] sm:text-xs font-medium text-teal-700 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-teal-500" />
                <span>Top up game resmi, instan, dan aman</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
                  Satu tempat untuk
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500">
                    semua top up game kamu
                  </span>
                </h1>
                <p className="max-w-xl text-sm sm:text-base text-slate-600 leading-relaxed">
                  Cari game favoritmu, pilih nominal, dan bayar dengan QRIS atau metode lain
                  dalam beberapa detik. Tanpa ribet, tanpa takut saldo hilang.
                </p>
              </div>

              {/* Inline quick search to jump into product list */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari Mobile Legends, Free Fire, PUBG Mobile, dan lainnya..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition-all duration-150 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
                  />
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
                  <span className="font-medium text-slate-600">Pencarian populer:</span>
                  {["Mobile Legends", "Free Fire", "PUBG Mobile", "Ragnarok M"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setSearchQuery(item)
                        setShowSearchResults(true)
                      }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 hover:border-teal-400 hover:text-teal-700 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-500" />
                  <span className="text-xs text-slate-600">Produk resmi & legal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span className="text-xs text-slate-600">Proses instan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-sky-500" />
                  <span className="text-xs text-slate-600">Pembayaran aman</span>
                </div>
              </div>
            </div>

            {/* Visual area: small carousel-like cards, but lighter */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {heroSlides.slice(0, 4).map((slide, index) => (
                  <div
                    key={slide.key}
                    className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200 ${
                      index === 0 ? "col-span-2" : ""
                    }`}
                  >
                    <div className="relative w-full h-28 sm:h-32 overflow-hidden">
                      <img 
                        src={slide.bg} 
                        alt={slide.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-slate-700 shadow-sm">
                        Game populer
                      </div>
                      <h3 className="mt-1 text-xs sm:text-sm font-semibold text-white drop-shadow">
                        {slide.title}
                      </h3>
                      <p className="mt-0.5 text-[10px] sm:text-[11px] text-slate-100/90 line-clamp-1">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-emerald-800">Promo awal pengguna</p>
                  <p className="text-[11px] text-emerald-700">
                    Diskon hingga 10% untuk top up pertama kamu.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={scrollToServices}
                  className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-xs px-4 py-1.5"
                >
                  Mulai top up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS AS MAIN SECTION */}
      <section ref={servicesRef} className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-teal-500 uppercase mb-2">
              PRODUK TERPOPULER
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-3">
              Pilih Game Favoritmu
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Top up Diamonds, UC, atau voucher lain dengan harga transparan. Produk yang
              ditandai siap dibeli instan, yang lain segera hadir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {products
              .filter((product) =>
                !searchQuery
                  ? true
                  : product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((product) => {
                const isHighlighted =
                  product.name.toLowerCase().includes("mobile legends") ||
                  product.name.toLowerCase().includes("free fire diamonds") ||
                  product.name.toLowerCase().includes("pubg mobile") ||
                  product.name.toLowerCase().includes("ragnarok m classic")

                return (
                  <div
                    key={product.id}
                    className={`group relative ${!isHighlighted ? "cursor-not-allowed" : ""}`}
                  >
                    {!isHighlighted && (
                      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
                        <span className="rounded-full bg-slate-900/90 px-4 py-1.5 text-xs font-medium text-slate-100">
                          Coming Soon
                        </span>
                      </div>
                    )}
                    <Link
                      href={isHighlighted ? `/products/${product.id}` : "#"}
                      className={!isHighlighted ? "pointer-events-none" : ""}
                    >
                      <div
                        className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-teal-300 group-hover:shadow-md ${
                          !isHighlighted ? "opacity-70" : ""
                        }`}
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/5 to-transparent" />
                          <div className="absolute top-3 right-3">
                            <div className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
                              {formatPrice(product.price)}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 sm:p-5">
                          <h3 className="mb-1.5 line-clamp-1 text-sm sm:text-base font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="mb-3 line-clamp-2 text-xs sm:text-sm text-slate-500">
                            {product.description}
                          </p>
                          <Button
                            className="w-full rounded-full bg-teal-500 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-teal-600 hover:shadow-md transition-all duration-150 group-hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                            disabled={!isHighlighted}
                          >
                            {isHighlighted ? "Beli Sekarang" : "Coming Soon"}
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
          </div>
        </div>
      </section>

      {/* FEATURES / TRUST SECTION */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase mb-2">
              KEUNGGULAN PLATFORM
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-3">
              Top up sekali klik, tanpa rasa khawatir
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Kami merancang pengalaman seperti aplikasi keuangan modern: transparan, cepat,
              dan mudah dipahami.
            </p>
          </div>
          
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {marketplaceFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-300 hover:shadow-md"
              >
                <div className="relative flex items-center gap-3 mb-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-500 ring-1 ring-teal-100">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                    {feature.name}
                  </h3>
                </div>
                <p className="relative text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase mb-2">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
              Pertanyaan Umum
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Jawaban singkat seputar legalitas, pembayaran, dan proses top up di SaudaraVoucher.
            </p>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {qnaList.map((qna, idx) => (
              <div
                key={qna.question}
                className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/80 shadow-sm"
              >
                <button
                  className={`flex w-full items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 text-left transition-all duration-150 ${
                    openQna === idx
                      ? "bg-white"
                      : "hover:bg-white"
                  }`}
                  onClick={() => setOpenQna(openQna === idx ? null : idx)}
                >
                  <h3 className="pr-4 text-sm sm:text-base font-medium text-slate-900">
                    {qna.question}
                  </h3>
                  <ChevronRight
                    className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-150 ${
                      openQna === idx ? "rotate-90" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-150 ${
                    openQna === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-5 pb-4 text-sm text-slate-700">
                      {qna.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <p className="mb-3 text-sm text-slate-600">Masih ada yang ingin ditanyakan?</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://wa.me/6285811959392"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm hover:border-teal-400 hover:text-teal-700 transition-all"
              >
                <img src="/wa_img.png" alt="WhatsApp" className="w-5 h-5" />
                Chat via WhatsApp
              </a>
              <Link
                href="/refund-policy"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-teal-600 transition-all"
              >
                Kebijakan Refund
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: SELL VOUCHER */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 via-emerald-50 to-sky-50 px-6 py-8 sm:px-8 sm:py-9 text-center">
            <div className="relative space-y-3 sm:space-y-4">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-teal-600 uppercase">
                JUAL VOUCHER GAME
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                Ubah voucher nganggur jadi saldo
              </h2>
              <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-700">
                Kirim voucher game yang tidak terpakai, dapatkan saldo ke rekening atau e-wallet
                tujuan setelah transaksi sukses. Proses dipantau dan transparan.
              </p>
            </div>
            
            <div className="relative mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              {user ? (
                <Link href="/sell-voucher">
                  <Button className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 sm:px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-teal-600">
                    Jual Sekarang
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 sm:px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-teal-600">
                    Login untuk Jual
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Button 
                variant="outline"
                className="rounded-full border-slate-300 bg-white px-6 sm:px-7 py-3 text-sm sm:text-base font-medium text-slate-800 hover:border-teal-300 hover:text-teal-700"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    name: 'Instant Delivery',
    description: 'Get your game vouchers and credits instantly after purchase.',
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    benefits: [
      'Digital delivery within minutes',
      'No waiting time',
      '24/7 availability'
    ]
  },
  {
    name: 'Secure Payments',
    description: 'Shop with confidence using our secure payment system.',
    icon: <Shield className="h-6 w-6 text-blue-400" />,
    benefits: [
      'Multiple payment methods',
      'SSL encryption',
      'Secure checkout process'
    ]
  },
  {
    name: 'Wide Selection',
    description: 'Access to all major gaming platforms and titles.',
    icon: <Gamepad2 className="h-6 w-6 text-blue-400" />,
    benefits: [
      'All major gaming platforms',
      'Popular game titles',
      'Regular new additions'
    ]
  },
]