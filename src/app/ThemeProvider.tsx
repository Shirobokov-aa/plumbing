"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"

type Attribute = "class" | "data-theme" | "data-mode"

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: Attribute | Attribute[];
  defaultTheme?: string;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}
