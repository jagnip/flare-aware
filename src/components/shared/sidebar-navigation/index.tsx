"use client"

import type React from "react"

import { Building2, Grid, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function SidebarNavigation() {
  return (
    <div className="flex h-screen w-[72px] flex-col items-center justify-between border-r border-gray-200 bg-white py-4">
      {/* Top logo */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-b from-[#891fdc] to-[#f0dfff]">
          <div className="absolute bottom-0 h-1/3 w-full rounded-t-full bg-[#f0dfff] opacity-50"></div>
        </div>

        {/* Navigation icons */}
        <nav className="flex flex-col items-center gap-4">
          <NavItem href="#" isActive>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#f0dfff]">
              <Grid className="h-5 w-5 text-[#891fdc]" />
            </div>
          </NavItem>

          <NavItem href="#">
            <Building2 className="h-5 w-5 text-[#1c1c1c]" />
          </NavItem>

          <NavItem href="#">
            <Users className="h-5 w-5 text-[#1c1c1c]" />
          </NavItem>
        </nav>
      </div>

      {/* User avatar at bottom */}
      <div className="flex flex-col items-center">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#f0dfff]">
          <Image
            src="/images/avatar.png"
            alt="User avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  children: React.ReactNode
  href: string
  isActive?: boolean
}

function NavItem({ children, href, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
        isActive ? "bg-[#f0dfff]" : "hover:bg-gray-100",
      )}
    >
      {children}
    </Link>
  )
}

