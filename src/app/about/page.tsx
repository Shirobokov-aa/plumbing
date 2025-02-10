import { Suspense } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import AboutContent from "./AboutContent"
import { getAboutPage } from "@/app/actions/about/db"
import { notFound } from "next/navigation"

// { params }: { params: Promise<{ name: string }> }
export default async function About() {
  const aboutData = await getAboutPage()

  if (!aboutData) {
    notFound()
  }

  return (
    <div>
      <Header defaultTextColor="text-black" activeTextColor="text-black" />
      <Suspense fallback={<div>Loading...</div>}>
        <AboutContent initialData={aboutData} />
      </Suspense>
      <Footer />
    </div>
  )
}

