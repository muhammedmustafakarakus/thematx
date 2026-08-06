import React from "react";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import { WhatsAppButton } from "@/components/layout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
