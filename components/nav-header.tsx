"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Moon, Sun, Home, BarChart3, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function NavHeader() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Predict Churn", href: "/predict", icon: Users },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            <span className="font-bold text-xl hidden md:inline-block">ChurnPredictor</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-purple-700 dark:text-purple-400" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 w-full bg-purple-600"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
