"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { menu } from "@/data/sitio";
import { Logo } from "./Logo";
import { WaBoton } from "./WhatsApp";

export function Header({ mensajeWa }: { mensajeWa: string }) {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);

  // El menú abierto bloquea el scroll del fondo (ver .menu-open en globals.css).
  useEffect(() => {
    document.body.classList.toggle("menu-open", abierto);
    return () => document.body.classList.remove("menu-open");
  }, [abierto]);
  useEffect(() => setAbierto(false), [ruta]);

  // Las fichas de edificios en venta marcan "Obras" como sección activa.
  const activo = (href: string) => ruta === href || (href === "/obras" && ruta.startsWith("/neo-"));

  return (
    <header className="site-header">
      <div className="wrap">
        <Logo />
        <nav className="nav" aria-label="Principal">
          {menu.map((m) => (
            <Link key={m.href} href={m.href} aria-current={activo(m.href) ? "page" : undefined} onClick={() => setAbierto(false)}>
              {m.texto}
            </Link>
          ))}
        </nav>
        <WaBoton mensaje={mensajeWa}>WhatsApp</WaBoton>
        <button className="menu-btn" aria-label="Menú" aria-expanded={abierto} onClick={() => setAbierto(!abierto)}>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
