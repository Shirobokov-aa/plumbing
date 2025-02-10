
// import { useState } from "react";

import { BannerSlider } from "@/components/blocks/banner-slider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { getSections } from "@/app/actions/sections/db";
// import mockData from "./data/mockData";

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const sections = await getSections()

  return (
    <div>
      <Header defaultTextColor="text-black" activeTextColor="text-black" />
      <BannerSlider />
      <Main sections={sections} />
      <Footer />
    </div>
  );
}
