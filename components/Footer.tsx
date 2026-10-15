import Link from "next/link";
import { enVenta, hrefEdificio } from "@/data/edificios";
import { sitio } from "@/data/sitio";
import { waHref } from "@/lib/wa";
import { Logo } from "./Logo";
import { Txt } from "./Txt";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Logo />
            <p className="muted" style={{ marginTop: 20, color: "#A8A8A8", maxWidth: 300 }}>
              Desarrollamos y construimos edificios en Santa Fe. Construimos futuro.
            </p>
          </div>
          <div>
            <h4>Edificios</h4>
            <ul>
              {enVenta.map((e) => (
                <li key={e.slug}>
                  <Link href={hrefEdificio(e) ?? "/obras"}>{e.nombre}</Link>
                </li>
              ))}
              <li>
                <Link href="/obras">Las obras</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>NEO</h4>
            <ul>
              <li><Link href="/invertir">Invertir en pozo</Link></li>
              <li><Link href="/como-trabajamos">Cómo trabajamos</Link></li>
              <li><Link href="/bitacora">Bitácora de obra</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href={waHref("Hola NEO, quiero hacer una consulta.")} target="_blank" rel="noopener">
                  WhatsApp {sitio.whatsappVisible}
                </a>
              </li>
              <li>
                <a href={`https://instagram.com/${sitio.instagram}`} target="_blank" rel="noopener">
                  @{sitio.instagram}
                </a>
              </li>
              <li><Txt>{`${sitio.oficina}, Santa Fe`}</Txt></li>
              <li><Txt>{sitio.email}</Txt></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} NEO · Construimos futuro</span>
          <span>Santa Fe, Argentina</span>
        </div>
      </div>
    </footer>
  );
}
