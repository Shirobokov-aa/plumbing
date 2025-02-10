"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import type { Banner } from "@/app/types/pages"
import { updateAboutPage } from "@/app/actions/about/db"

export default function BannerForm({ initialData }: { initialData: Banner }) {
  const [banner, setBanner] = useState(initialData)
  // ... остальной код формы ...
}
