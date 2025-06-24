"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { NavHeader } from "@/components/nav-header"
import { Footer } from "@/components/footer"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState("system")
  const [accentColor, setAccentColor] = useState("#a855f7")

  useEffect(() => {
    setMounted(true)
    if (theme) {
      setSelectedTheme(theme)
    }
  }, [theme])

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value)
    setTheme(value)

    toast({
      title: "Theme updated",
      description: `Theme has been changed to ${value}.`,
    })
  }

  const handleAccentColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccentColor(e.target.value)
    // In a real app, this would update CSS variables or a theme context
    document.documentElement.style.setProperty("--primary", e.target.value)

    toast({
      title: "Accent color updated",
      description: "Your accent color preference has been saved.",
    })
  }

  // Predefined themes
  const themePresets = [
    { name: "Purple Dream", color: "#a855f7", bg: "from-purple-50 to-indigo-50" },
    { name: "Ocean Blue", color: "#3b82f6", bg: "from-blue-50 to-cyan-50" },
    { name: "Sunset Orange", color: "#f97316", bg: "from-orange-50 to-red-50" },
    { name: "Forest Green", color: "#22c55e", bg: "from-green-50 to-emerald-50" },
  ]

  const applyThemePreset = (preset: (typeof themePresets)[0]) => {
    setAccentColor(preset.color)
    document.documentElement.style.setProperty("--primary", preset.color)

    // In a real app, you would also update the background gradient classes
    toast({
      title: "Theme preset applied",
      description: `Applied the ${preset.name} theme preset.`,
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950">
      <NavHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="api">API Keys</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account information and how we contact you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue="Acme Inc." />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your notification and application preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications about predictions and reports.
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-sharing">Data Sharing</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow anonymous data sharing to improve our prediction models.
                        </p>
                      </div>
                      <Switch id="data-sharing" checked={dataSharing} onCheckedChange={setDataSharing} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSavePreferences}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                  <CardDescription>Customize the appearance of the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base">Color Mode</Label>
                      <RadioGroup
                        defaultValue={selectedTheme}
                        value={selectedTheme}
                        onValueChange={handleThemeChange}
                        className="grid grid-cols-3 gap-4 mt-3"
                      >
                        <div>
                          <RadioGroupItem value="light" id="theme-light" className="sr-only peer" />
                          <Label
                            htmlFor="theme-light"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mb-3 h-6 w-6"
                            >
                              <circle cx="12" cy="12" r="4" />
                              <path d="M12 2v2" />
                              <path d="M12 20v2" />
                              <path d="m4.93 4.93 1.41 1.41" />
                              <path d="m17.66 17.66 1.41 1.41" />
                              <path d="M2 12h2" />
                              <path d="M20 12h2" />
                              <path d="m6.34 17.66-1.41 1.41" />
                              <path d="m19.07 4.93-1.41 1.41" />
                            </svg>
                            Light
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="dark" id="theme-dark" className="sr-only peer" />
                          <Label
                            htmlFor="theme-dark"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mb-3 h-6 w-6"
                            >
                              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                            </svg>
                            Dark
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="system" id="theme-system" className="sr-only peer" />
                          <Label
                            htmlFor="theme-system"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mb-3 h-6 w-6"
                            >
                              <rect width="20" height="14" x="2" y="3" rx="2" />
                              <line x1="8" x2="16" y1="21" y2="21" />
                              <line x1="12" x2="12" y1="17" y2="21" />
                            </svg>
                            System
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="accent-color"
                          type="color"
                          value={accentColor}
                          onChange={handleAccentColorChange}
                          className="w-16 h-10 p-1"
                        />
                        <span className="text-sm">{accentColor}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Theme Presets</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                        {themePresets.map((preset) => (
                          <Button
                            key={preset.name}
                            variant="outline"
                            className="flex flex-col h-auto p-4 gap-2 items-center justify-center"
                            onClick={() => applyThemePreset(preset)}
                          >
                            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: preset.color }}></div>
                            <span className="text-xs">{preset.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Theme settings saved",
                        description: "Your theme preferences have been saved.",
                      })
                    }}
                  >
                    Save Theme Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Manage your API keys for programmatic access to the prediction service.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex space-x-2">
                     {/* <Input id="api-key" value="••••••••••••••••" readOnly type="password" /> */}

                      <Button
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "API key copied",
                            description: "The API key has been copied to your clipboard.",
                          })
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>API Usage</Label>
                    <div className="text-sm">
                      <p>Requests this month: 1,234 / 10,000</p>
                      <p className="text-muted-foreground mt-1">Your plan resets on May 1, 2023</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="text-destructive hover:text-destructive">
                    Regenerate API Key
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
