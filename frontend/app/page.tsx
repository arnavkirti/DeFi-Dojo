"use client";

import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import About from "@/components/sections/About";
import Roadmap from "@/components/sections/Roadmap";
import Community from "@/components/sections/Community";
import WoodenThemeLayout from "@/components/WoodenThemeLayout";

export default function Home() {
  return (
    <WoodenThemeLayout>
      <Hero />
      <Features />
      <About />
      <Roadmap />
      <Community />
    </WoodenThemeLayout>
  );
}
