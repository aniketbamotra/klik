import type { Metadata } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Klik — jewellery & things for the house",
  description:
    "A small shop of everyday jewellery and decorative objects for the house.",
};

const CONTRACT = `<!--
THESIS: A conventional storefront whose every colour is taken from the mark itself, so the
brand is the material of the page rather than a logo dropped onto it. Klik is a new brand;
the structure stays familiar and the identity does the distinguishing.
OWN-WORLD: The logo's own three colours — plum #3c2848 as ink, its cream #ffe4c4 as paper
and fills, its orange #ffa444 as accent — on a #fdf5ea ground with #fffaf2 planes. Instrument
Serif with a real italic for display, Archivo for everything else. Depth is literal elevation:
one shadow scale, cards on planes at measurable heights, warm haze behind. Rounded throughout.
STORY: A stranger recognises the shop instantly, sees what is for sale and what it costs, and
finds the whole thing feels made by one hand rather than assembled from a theme.
FIRST VIEWPORT: Plum brand bar, the mark at left of a light header, then a serif headline and
primary action beside two product planes tilted at different heights over an orange plane.
FORM: Chosen by the user from four directions, then rebuilt on the logo's palette at their
direction. Supersedes the white-and-plum canon build and, before it, Label Press (seed 94302ea0).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        {children}
      </body>
    </html>
  );
}
