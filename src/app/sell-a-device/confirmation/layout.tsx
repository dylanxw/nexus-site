import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quote Confirmed | Nexus Tech Solutions",
  description: "Your device buyback quote has been confirmed.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}