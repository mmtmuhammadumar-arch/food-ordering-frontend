"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useFavourites } from "@/context/FavouritesContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { items: favourites } = useFavourites();

  return (
    <header className="border-b border-ink/10 bg-paper/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          Tandoor House
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-ink/80 hover:text-ink transition-colors">
            Menu
          </Link>

          {user && (
            <Link href="/orders" className="text-ink/80 hover:text-ink transition-colors">
              My orders
            </Link>
          )}

          <Link href="/favourites" className="relative text-ink/80 hover:text-ink transition-colors">
            Favourites
            {favourites.length > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-saffron text-[10px] font-medium text-ink">
                {favourites.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative text-ink/80 hover:text-ink transition-colors">
            Cart
            {count > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-tomato text-[10px] font-medium text-paper">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={logout}
              className="rounded-full border border-ink/20 px-4 py-1.5 text-ink/80 hover:border-ink hover:text-ink transition-colors"
            >
              Log out
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-ink px-4 py-1.5 text-paper hover:bg-ink/90 transition-colors"
            >
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
