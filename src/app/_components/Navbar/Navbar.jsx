
"use client";
import React, { useContext, useState } from "react";
import logoImg from "../../../../public/images/freshcart-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const { numOfCart } = useContext(CartContext);
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className="bg-gray-400 text-white">
      <div className="container w-full lg:w-[80%] mx-auto flex justify-between items-center p-4 ">
        <div className="flex items-center gap-4">
          <Link href={'/'}>            <Image src={logoImg} alt="logoImg" priority width={150} height={150} />
          </Link>

          <ul className="hidden lg:flex gap-6 items-center">
            <li>
              <Link href="/">Home</Link>
            </li>

            {session && (
              <li>
                <Link
                  href="/cart"
                  className="relative flex items-center gap-1"
                >
                  <span>Cart</span>
                  {numOfCart > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                      {numOfCart}
                    </span>
                  )}
                </Link>
              </li>
            )}

            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/brands">Brands</Link>
            </li>
            <li>
              <Link href="/wishlist">wishlist</Link>
            </li>
            <li>
              <Link href="/allorders">ِAllOrders</Link>
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex gap-4 items-center">
          {!session ? (
            <>
              <li>
                <i className="fab fa-facebook"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
              <li>
                <i className="fab fa-linkedin"></i>
              </li>
              <li>
                <i className="fab fa-github"></i>
              </li>
              <li>
                <i className="fab fa-youtube"></i>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <span className="cursor-pointer" onClick={logout}>
                  SignOut
                </span>
              </li>
              <li>hi {session?.user?.name}</li>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-gray-500 px-4 pb-4 space-y-2">
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>

            {session && (
              <li>
                <Link
                  href="/cart"
                  className="relative flex items-center gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Cart</span>
                  {numOfCart > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                      {numOfCart}
                    </span>
                  )}
                </Link>
              </li>
            )}

            <li>
              <Link href="/products" onClick={() => setIsOpen(false)}>Products</Link>
            </li>
            <li>
              <Link href="/categories" onClick={() => setIsOpen(false)}>Categories</Link>
            </li>
            <li>
              <Link href="/brands" onClick={() => setIsOpen(false)}>Brands</Link>
            </li>
          </ul>

          <ul className="flex flex-col gap-2 pt-2 border-t border-gray-300">
            {!session ? (
              <>
                <li>
                  <Link href="/register" onClick={() => setIsOpen(false)}>Register</Link>
                </li>
                <li>
                  <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                  >
                    SignOut
                  </span>
                </li>
                <li>hi {session?.user?.name}</li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
