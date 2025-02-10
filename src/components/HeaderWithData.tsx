'use client'

import { useSections } from "@/app/admin/contexts/SectionsContext"
import Header from "./Header"

export default function HeaderWithData({
  defaultTextColor,
  activeTextColor
}: {
  defaultTextColor?: string
  activeTextColor?: string
}) {
  const { collectionDetails } = useSections()

  return (
    <Header
      defaultTextColor={defaultTextColor}
      activeTextColor={activeTextColor}
      collectionDetails={collectionDetails}
    />
  )
}
