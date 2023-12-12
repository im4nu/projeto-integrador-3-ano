import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projeto Integrador | Síndrome Respiratória Aguda",
  description: "Projeto integrador UNIFAP 2023.2 | 3° ano branco",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body className={inter.className}>
        <div className="xl:hidden">{children}</div>
        <div className="hidden xl:flex items-center justify-center w-screen h-screen bg-black/40">
          <div className="flex bg-white rounded-xl text-center items-center justify-center p-8 w-80 flex-col gap-8">
            <h1 className="text-xl font-medium">Oopps...</h1>

            <Image
              alt="Ilustração de erro"
              src={"/images/sad_ilustration.svg"}
              width={278}
              height={208}
            />

            <p className="text-sm">
              O nosso projeto funciona apenas em dispositivos móveis,
              <span className="font-bold text-gray-700">
                experimente abir o projeto em um smartphone ou tablet
              </span>
            </p>
            <button className="bg-main rounded-lg py-4 w-[200px] flex flex-row text-white items-center justify-center gap-2">
              Tudo bem!
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
