"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Suppress the known React 19 / next-themes script tag warning in dev console
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag while rendering React component")) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
