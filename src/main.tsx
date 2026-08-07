import { createRoot } from 'react-dom/client'
import './styles.css'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

type PageProps = { mode?: 'construction' | 'not-found' }

function MoonMark() {
  return <svg viewBox="0 0 120 120" aria-hidden="true"><path d="M83 19c-23 5-39 26-36 50 3 23 25 40 49 36-10 9-24 14-39 14-31 0-56-25-56-56S26 7 57 7c10 0 19 2 26 7Z" fill="currentColor"/><path d="M88 45l4 9 10 3-10 4-4 10-4-10-10-4 10-3 4-9Z" fill="currentColor"/></svg>
}

function Header() {
  return <header className="nav shell">
    <a href="/" className="wordmark" aria-label="Rana Bruja - Inicio"><img src={asset('rana-bruja-logo.jpg')} alt="Rana Bruja" /></a>
    <nav aria-label="Navegación principal"><a href="/#aquelarre">Aquelarre</a><a href="/#musica">Música</a><a href="/#integrantes">Integrantes</a><a href="/#redes">Contacto</a></nav>
    <a className="nav-whisper" href="mailto:ranabrujaband@gmail.com">Invocar ↗</a>
  </header>
}

function Footer() {
  return <footer id="redes"><div className="shell footer">
    <div><p className="eyebrow"><span />Sigue el rastro</p><h2>Canciones<br />para sonar fuerte.</h2></div>
    <img className="band-photo" src={asset('rana-bruja-coven.jpg')} alt="Rana Bruja reunidas" />
    <div className="socials"><a href="https://www.instagram.com/rana.bruja/" target="_blank" rel="noreferrer">Instagram <span>↗</span></a><a href="https://www.facebook.com/ranabruja/" target="_blank" rel="noreferrer">Facebook <span>↗</span></a><a href="https://www.tiktok.com/discover/rana-bruja" target="_blank" rel="noreferrer">TikTok <span>↗</span></a></div>
    <a className="booking" href="mailto:ranabrujaband@gmail.com"><small>Booking, prensa y conjuros</small><strong>ranabrujaband@gmail.com</strong><span>↗</span></a>
    <p className="footer-note">© {new Date().getFullYear()} RANA BRUJA · HECHO ENTRE MONTAÑAS · <a href="https://www.instagram.com/sdigital.cr" target="_blank" rel="noreferrer">SDIGITAL</a></p>
  </div></footer>
}

function Home() {
  const platforms = [
    ['Spotify', 'https://open.spotify.com/artist/6x1cCNcT4hhPqdjuSNEVGG'],
    ['Apple Music', 'https://music.apple.com/us/artist/rana-bruja/1645638114'],
    ['YouTube', 'https://www.youtube.com/@ranabruja'],
  ]
  const members = [
    ['Sol López', 'Voz'], ['Tefa Robles', 'Batería · Coros'], ['Valeria López', 'Bajo'], ['Alex Monge', 'Guitarra'], ['Jimena Mora', 'Guitarra'],
  ]
  return <main>
    <div className="grain" /><Header />
    <section className="hero-band shell" id="top">
      <div className="hero-band-image"><img src={asset('rana-bruja-hero.jpg')} alt="Rana Bruja en la noche" /><div className="hero-image-shadow" /></div>
      <div className="hero-band-copy"><p className="eyebrow"><span />Los Santos, Costa Rica</p><p className="genre">Post punk · Goth surf</p><h1>Rana<br /><i>Bruja</i></h1><p className="hero-spell">Canciones de carretera, ruido y volver a casa.</p><a className="button primary" href="#musica">Escucha a Rana Bruja <b>↓</b></a></div>
      <p className="hero-side">Una banda que cuenta lo que unas personas llaman magia y otras, memoria.</p>
    </section>
    <section className="manifesto shell" id="aquelarre"><div className="manifesto-symbol"><MoonMark /></div><p className="eyebrow"><span />El aquelarre</p><h2>Hacemos canciones para lo que <em>insiste</em> en volver.</h2><div className="manifesto-copy"><p>Rana Bruja nace entre las montañas de Los Santos, de la necesidad de que más voces femeninas ocuparan la escena alternativa local.</p><p>Mezclamos post-punk y goth surf para convertir emociones en paisajes: sombras que se mueven, heridas que hablan, pulsos que tiemblan.</p><p>Somos una grieta entre lo cotidiano y lo místico. Un ritual de arte, memoria y rebeldía.</p></div></section>
    <section className="release shell" id="musica"><div className="release-art"><img src={asset('poco-sol-cover.png')} alt="Portada de Poco Sol" /><span>2026</span></div><div className="release-copy"><p className="eyebrow"><span />Escúchalo ahora</p><h2>Poco Sol</h2><p>Trayectos de madrugada, cuando se deja atrás la naturaleza buscando las oportunidades de la ciudad. Una canción sobre volver a casa, aunque la vida indique lo contrario.</p><p className="release-note">Con la colaboración de Mariel Leitón y traducción a LESCO.</p><a className="listen-link" href="https://youtu.be/mSqLTcBAhls?si=NEPrQDAr91R1p_pg" target="_blank" rel="noreferrer">Ver video oficial <b>↗</b></a></div><div className="platform-list"><p>Escucha toda nuestra música</p>{platforms.map(([name, url], index) => <a href={url} key={name} target="_blank" rel="noreferrer"><b>{String(index + 1).padStart(2, '0')}</b>{name}<span>↗</span></a>)}</div></section>
    <section className="members shell" id="integrantes"><div className="members-intro"><p className="eyebrow"><span />Las criaturas</p><h2>Cinco voces.<br />Una misma<br /><em>tormenta.</em></h2><p>No pedimos lugar: hacemos ruido hasta abrirlo.</p></div><div className="member-list">{members.map(([name, role], index) => <article className="member" key={name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{name}</h3><p>{role}</p><i>{index === 0 ? '◒' : index === 1 ? '⌁' : index === 2 ? '✣' : index === 3 ? '◈' : '☽'}</i></article>)}</div></section>
    <section className="gallery"><div className="gallery-track"><img src={asset('rana-bruja-live-vocal.jpg')} alt="Rana Bruja en vivo" /><img src={asset('rana-bruja-live-drums.jpg')} alt="Batería de Rana Bruja" /><img src={asset('rana-bruja-live-guitar.jpg')} alt="Guitarra de Rana Bruja" /></div><p>Ruidosas · vivas · hechizadas · ruidosas · vivas · hechizadas ·</p></section>
    <section className="records shell"><p className="eyebrow"><span />Canciones para empezar</p><div><article><span>2026 · Single</span><h3>Poco Sol</h3><p>La casa a lo lejos, la ciudad en los dientes.</p><a href="https://youtu.be/mSqLTcBAhls?si=NEPrQDAr91R1p_pg" target="_blank" rel="noreferrer">Escuchar ↗</a></article><article><span>2025 · Single</span><h3>Ecos</h3><p>Silencio, insectos y una brisa que eriza la piel.</p><a href="https://open.spotify.com/artist/6x1cCNcT4hhPqdjuSNEVGG" target="_blank" rel="noreferrer">Escuchar ↗</a></article></div></section>
    <Footer />
  </main>
}

function UtilityPage({ mode = 'construction' }: PageProps) {
  const missing = mode === 'not-found'
  return <main className="utility-page"><div className="grain" /><Header /><section className="utility shell"><MoonMark /><p className="eyebrow"><span />{missing ? '404 · Sendero perdido' : 'Rana Bruja está mudando de piel'}</p><h1>{missing ? <>Esta puerta<br />no existe.</> : <>Algo oscuro<br /><i>está creciendo.</i></>}</h1><p>{missing ? 'Tal vez una criatura se llevó esta página al bosque. Regresa al ritual y vuelve a empezar.' : 'Guardamos este refugio mientras la siguiente invocación toma forma entre la niebla y la montaña.'}</p><a className="button primary" href="/">Volver al inicio <b>↗</b></a></section><Footer /></main>
}

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const sitePath = (basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname) || '/'
createRoot(document.getElementById('root')!).render(sitePath === '/en-construccion' ? <UtilityPage /> : sitePath === '/404' ? <UtilityPage mode="not-found" /> : <Home />)
