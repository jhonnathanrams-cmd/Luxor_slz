import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  BadgeCheck,
  Ship,
  CreditCard,
  ShieldCheck,
  Clock3,
  Star,
  Trash2,
  Menu,
  X,
  Instagram,
  PhoneCall,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// -----------------------------
// Demo Data (replace with your CMS/DB later)
// -----------------------------
const PRODUCTS = [
  {
    id: "pp-nautilus",
    name: "Nautilus Blue Dial",
    brand: "Patek Philippe",
    price: 129900,
    image:
      "https://images.unsplash.com/photo-1548171916-c0dea59df7eb?q=80&w=1600&auto=format&fit=crop",
    tags: ["Automatic", "Stainless Steel"],
  },
  {
    id: "rolex-sub",
    name: "Submariner Date Black",
    brand: "Rolex",
    price: 74900,
    image:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1600&auto=format&fit=crop",
    tags: ["Diver", "Ceramic Bezel"],
  },
  {
    id: "ap-royal-oak",
    name: "Royal Oak 41 Silver",
    brand: "Audemars Piguet",
    price: 159900,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1600&auto=format&fit=crop",
    tags: ["Integrated Bracelet", "Iconic"],
  },
  {
    id: "omega-speedmaster",
    name: "Speedmaster Moonwatch",
    brand: "Omega",
    price: 38900,
    image:
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=1600&auto=format&fit=crop",
    tags: ["Chronograph", "Manual Wind"],
  },
  {
    id: "tag-carrera",
    name: "Carrera Calibre 5",
    brand: "TAG Heuer",
    price: 12900,
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1600&auto=format&fit=crop",
    tags: ["Everyday", "Automatic"],
  },
  {
    id: "tissot-prx",
    name: "PRX Powermatic 80",
    brand: "Tissot",
    price: 4499,
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa0?q=80&w=1600&auto=format&fit=crop",
    tags: ["Value", "Integrated"],
  },
];

// Utility to format BRL currency (edit for your currency/locale)
const formatBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

// -----------------------------
// Main Component
// -----------------------------
export default function WatchStore() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.tags.join(" ").toLowerCase().includes(q)
    );
  }, [search]);

  const total = useMemo(() => {
    return Object.entries(cart).reduce((acc, [id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id);
      return acc + (p ? p.price * qty : 0);
    }, 0);
  }, [cart]);

  const addToCart = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id: string) =>
    setCart((c) => {
      const next = { ...c } as Record<string, number>;
      if (!next[id]) return next;
      if (next[id] === 1) delete next[id];
      else next[id] = next[id] - 1;
      return next;
    });

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Top Announcement Bar */}
      <div className="w-full bg-neutral-900 text-white text-sm py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ship className="h-4 w-4" />
          <span>Fast, insured shipping in Brazil & worldwide</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <BadgeCheck className="h-4 w-4" />
          <span>Pix • Visa • Master • Amex • Installments</span>
        </div>
      </div>

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-wide text-lg">
            LUXOR <span className="font-extrabold">SLZ</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#collection" className="hover:opacity-70">Collection</a>
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#payments" className="hover:opacity-70">Payments</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search models…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 hidden sm:block"
            />

            {/* Cart Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="rounded-2xl">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart {Object.keys(cart).length ? `(${Object.values(cart).reduce((a, b) => a + b, 0)})` : ""}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-3">
                  {Object.keys(cart).length === 0 && (
                    <p className="text-sm text-neutral-500">Your cart is empty.</p>
                  )}
                  {Object.entries(cart).map(([id, qty]) => {
                    const p = PRODUCTS.find((x) => x.id === id)!;
                    return (
                      <div key={id} className="flex items-center gap-3 border rounded-xl p-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-16 w-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{p.brand} — {p.name}</div>
                          <div className="text-xs text-neutral-500">Qty: {qty}</div>
                          <div className="text-sm">{formatBRL(p.price * qty)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" onClick={() => removeFromCart(id)} className="rounded-xl">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Subtotal</span>
                  <span className="font-semibold">{formatBRL(total)}</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-4 rounded-2xl">Proceed to Checkout</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Demo Checkout</DialogTitle>
                      <DialogDescription>
                        Connect your payment provider (Pix/Stripe/Mercado Pago) to enable real checkout.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="text-sm space-y-2">
                      <p>
                        • For Pix, generate a QR code at checkout. <br />• For cards, integrate with Stripe or Mercado Pago. <br />• For WhatsApp orders, redirect with a prefilled message.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen((s) => !s)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t px-4 py-2 space-y-2">
            <a href="#collection" className="block">Collection</a>
            <a href="#about" className="block">About</a>
            <a href="#payments" className="block">Payments</a>
            <a href="#contact" className="block">Contact</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1526045431048-71e5e0b216fa?q=80&w=2000&auto=format&fit=crop"
            className="h-full w-full object-cover opacity-20"
            alt="Hero background"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Sophisticated & Classic Timepieces
          </motion.h1>
          <p className="mt-4 max-w-2xl text-neutral-600">
            Curated collection of luxury and premium watches. Authenticity guaranteed. Fast, insured delivery.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#collection">
              <Button className="rounded-2xl">Shop the Collection</Button>
            </a>
            <a href="https://wa.me/5598999999999?text=Hi%2C%20I%20want%20to%20buy%20a%20watch" target="_blank" rel="noreferrer">
              <Button variant="outline" className="rounded-2xl">WhatsApp Order</Button>
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <Feature icon={<ShieldCheck className="h-4 w-4" />} text="Authenticity & Warranty" />
            <Feature icon={<Ship className="h-4 w-4" />} text="Insured Worldwide Shipping" />
            <Feature icon={<CreditCard className="h-4 w-4" />} text="Pix • Cards • Installments" />
            <Feature icon={<Clock3 className="h-4 w-4" />} text="30-Day Returns" />
          </div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Collection</h2>
            <p className="text-neutral-600 text-sm mt-1">Watches and refined accessories for any occasion.</p>
          </div>
          <div className="hidden sm:block">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search models, brands…" />
          </div>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <Card key={p.id} className="rounded-2xl overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative">
                  <img src={p.image} alt={p.name} className="h-64 w-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium">
                    {p.brand}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-base">{p.name}</CardTitle>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 bg-neutral-100 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 font-semibold">{formatBRL(p.price)}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center gap-2">
                <Button className="flex-1 rounded-xl" onClick={() => addToCart(p.id)}>
                  <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-xl">Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{p.brand} — {p.name}</DialogTitle>
                      <DialogDescription>Authenticity guaranteed. Includes original box and papers where indicated.</DialogDescription>
                    </DialogHeader>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Condition: New / Like New</li>
                      <li>Movement: Automatic / Manual (varies by model)</li>
                      <li>Water Resistance: As per manufacturer</li>
                      <li>Warranty: 12 months store warranty</li>
                    </ul>
                    <div className="mt-4 flex gap-2">
                      <Button className="rounded-xl" onClick={() => addToCart(p.id)}>
                        <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                      </Button>
                      <a
                        href={`https://wa.me/5598999999999?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(
                          `${p.brand} ${p.name}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button variant="outline" className="rounded-xl">Ask on WhatsApp</Button>
                      </a>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-neutral-50 border-y">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-bold">Why LUXOR SLZ</h3>
            <p className="mt-3 text-neutral-600">
              We curate sophisticated and classic timepieces from the world’s most respected brands. Every watch is
              authenticated and shipped with care. Whether you’re investing in a grail or choosing your first premium watch,
              our specialists are here to help.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Star className="h-4 w-4" /> 4.9/5 customer satisfaction</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Authenticity & warranty</li>
              <li className="flex items-center gap-2"><Ship className="h-4 w-4" /> Insured worldwide delivery</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              className="rounded-2xl object-cover h-48 w-full"
              src="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop"
              alt="Showcase 1"
            />
            <img
              className="rounded-2xl object-cover h-48 w-full"
              src="https://images.unsplash.com/photo-1518544801976-3e188ea0e6f0?q=80&w=1200&auto=format&fit=crop"
              alt="Showcase 2"
            />
            <img
              className="rounded-2xl object-cover h-48 w-full"
              src="https://images.unsplash.com/photo-1526045612240-29d8a8f9bef7?q=80&w=1200&auto=format&fit=crop"
              alt="Showcase 3"
            />
            <img
              className="rounded-2xl object-cover h-48 w-full"
              src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop"
              alt="Showcase 4"
            />
          </div>
        </div>
      </section>

      {/* Payments & Shipping */}
      <section id="payments" className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold">Payments & Shipping</h3>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <InfoCard
            title="Payments"
            subtitle="Pix • Visa • Master • Amex • Installments"
            icon={<CreditCard className="h-5 w-5" />}
          />
          <InfoCard
            title="Shipping"
            subtitle="Secure & insured delivery in Brazil and worldwide"
            icon={<Ship className="h-5 w-5" />}
          />
          <InfoCard
            title="Guarantee"
            subtitle="Authenticity verified + 12-month store warranty"
            icon={<ShieldCheck className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 items-center gap-6">
          <div>
            <h4 className="text-xl font-semibold">Get early access to new drops</h4>
            <p className="text-sm text-neutral-300 mt-2">Subscribe for restocks, offers and watch guides.</p>
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed! Replace with your email provider integration.");
            }}
          >
            <Input type="email" placeholder="you@email.com" className="bg-white text-neutral-900" required />
            <Button type="submit" className="rounded-xl">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-neutral-600">
              Talk to a specialist for quotes and availability.
            </CardContent>
            <CardFooter>
              <a href="https://wa.me/5598999999999" target="_blank" rel="noreferrer">
                <Button className="rounded-xl"><PhoneCall className="h-4 w-4 mr-2"/>Chat on WhatsApp</Button>
              </a>
            </CardFooter>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Instagram</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-neutral-600">Follow for new arrivals and drops.</CardContent>
            <CardFooter>
              <a href="https://instagram.com/yourstore" target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-xl"><Instagram className="h-4 w-4 mr-2"/>Visit Instagram</Button>
              </a>
            </CardFooter>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Email</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-neutral-600">Send purchase orders or partnership requests.</CardContent>
            <CardFooter>
              <a href="mailto:sales@luxorslz.com">
                <Button variant="outline" className="rounded-xl"><Mail className="h-4 w-4 mr-2"/>sales@luxorslz.com</Button>
              </a>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-10 text-sm text-neutral-500 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold text-neutral-900">LUXOR SLZ</div>
            <p className="mt-2 max-w-xs">Sophisticated & classic watches and accessories. Est. 2025.</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-neutral-900 font-medium">Shop</div>
              <a href="#collection" className="block hover:opacity-70">All Watches</a>
              <a href="#" className="block hover:opacity-70">New Arrivals</a>
              <a href="#" className="block hover:opacity-70">Best Sellers</a>
            </div>
            <div className="space-y-2">
              <div className="text-neutral-900 font-medium">Support</div>
              <a href="#payments" className="block hover:opacity-70">Payments</a>
              <a href="#" className="block hover:opacity-70">Shipping & Returns</a>
              <a href="#" className="block hover:opacity-70">Warranty</a>
            </div>
          </div>
          <div className="md:text-right">© {new Date().getFullYear()} LUXOR SLZ. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-neutral-700 bg-white/80 backdrop-blur border rounded-xl px-3 py-2">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function InfoCard({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-neutral-600">{subtitle}</CardContent>
    </Card>
  );
}
