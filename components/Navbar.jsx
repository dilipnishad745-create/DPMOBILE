"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useClerk, useUser, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Package } from "lucide-react";

import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      
      {/* Logo */}
      <Image
        src={assets.logo}
        alt="logo"
        width={130}
        height={40}
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        priority
      />

      {/* Desktop Menu */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/" className="hover:text-gray-900 transition">About Us</Link>
        <Link href="/" className="hover:text-gray-900 transition">Contact</Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Desktop Right Icons */}
      <ul className="hidden md:flex items-center gap-4">
        <Image src={assets.search_icon} alt="search icon" width={16} height={16} />

        {!isSignedIn ? (
          <button
            onClick={() => openSignIn()}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" width={20} height={20} />
            Account
          </button>
        ) : (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={<ShoppingCart size={16} />}
                onClick={() => router.push("/cart")}
              />

              <UserButton.Action
                label="My Orders"
                labelIcon={<Package size={16} />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </ul>

      {/* Mobile Menu */}
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}

        {!isSignedIn ? (
          <button
            onClick={() => openSignIn()}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" width={20} height={20} />
            Account
          </button>
        ) : (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={<ShoppingCart size={16} />}
                onClick={() => router.push("/cart")}
              />

              <UserButton.Action
                label="My Orders"
                labelIcon={<Package size={16} />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
