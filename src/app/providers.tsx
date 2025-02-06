'use client';

import { SectionsProvider } from "./admin/contexts/SectionsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SectionsProvider>{children}</SectionsProvider>;
} 