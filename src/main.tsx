import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import es from './i18n/es.json'
import en from './i18n/en.json'
import './styles.css'

type Language = 'es' | 'en'
type Dictionary = typeof es
type Video = { title: string; platform: 'TikTok' | 'Instagram' | 'YouTube'; url?: string; embed?: string }
type PlatformId = 'spotify' | 'apple' | 'youtube' | 'amazon' | 'deezer' | 'tidal'

const releaseDate = new Date('2026-07-29T00:00:00-06:00')
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
function Leaf() {
  return <svg className="leaf" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 86C20 36 50 11 92 8c-4 43-28 70-82 78Z" fill="none" stroke="currentColor" strokeWidth="4"/><path d="M15 83 82 16M44 54c-2-15 4-27 15-35M58 40c13-2 23 3 29 11" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
}

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v3m10-3v3M4.5 9h15M5 5.5h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 13h.01M12 13h.01M16 13h.01" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/></svg>
}

function PlatformIcon({ id }: { id: PlatformId }) {
  const symbols: Record<PlatformId, string> = { spotify: '≋', apple: '●', youtube: '▶', amazon: 'a', deezer: '≡', tidal: '◆' }
  return <span className={`platform-icon icon-${id}`} aria-hidden="true">{symbols[id]}</span>
}

function App() {
  const [language, setLanguage] = useState<Language>('es')
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [lyricsOpen, setLyricsOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)
  const audio = useRef<HTMLAudioElement>(null)
  const t: Dictionary = language === 'es' ? es : en
  const released = useMemo(() => new Date() >= releaseDate, [])
  const videos: Video[] = [
    { title: t.videos.film, platform: 'TikTok', url: 'https://www.tiktok.com/@ranabruja/video/7665538832544173333', embed: 'https://www.tiktok.com/player/v1/7665538832544173333?music_info=1&description=1' },
    { title: t.videos.return, platform: 'TikTok', url: 'https://www.tiktok.com/@ranabruja/video/7660330169189534997', embed: 'https://www.tiktok.com/player/v1/7660330169189534997?music_info=1&description=1' },
    { title: t.videos.talk, platform: 'TikTok', url: 'https://www.tiktok.com/@ranabruja/video/7664766092069342484', embed: 'https://www.tiktok.com/player/v1/7664766092069342484?music_info=1&description=1' },
    { title: t.videos.travel, platform: 'Instagram', url: 'https://www.instagram.com/p/Davtz-Cyb_c/', embed: 'https://www.instagram.com/p/Davtz-Cyb_c/embed/captioned/' },
    { title: t.videos.city, platform: 'Instagram', url: 'https://www.instagram.com/p/DanvNIZxl83/', embed: 'https://www.instagram.com/p/DanvNIZxl83/embed/captioned/' },
    { title: t.videos.sign, platform: 'YouTube', url: 'https://youtu.be/daHXA7cs4QA', embed: 'https://www.youtube-nocookie.com/embed/daHXA7cs4QA?rel=0' },
  ]
  // Replace only the empty `url` values when each store's release link is available.
  const streamingPlatforms: { id: PlatformId; name: string; url: string }[] = [
    { id: 'spotify', name: t.platforms.spotify, url: 'https://open.spotify.com/intl-es/track/3QYzsjvMgGXGLliHioLlPY?si=ec30474857f54ea8' },
    { id: 'apple', name: t.platforms.apple, url: 'https://music.apple.com/us/album/poco-sol-single/6794020632' },
    { id: 'youtube', name: t.platforms.youtube, url: 'https://youtu.be/mSqLTcBAhls?si=NEPrQDAr91R1p_pg' },
    { id: 'amazon', name: t.platforms.amazon, url: 'https://music.amazon.com.mx/albums/B0HB6VR3B6?marketplaceId=A1AM78C64UM0Y8&musicTerritory=MX&ref=dm_sh_EVuFu7J3CfMNCB3Xm9Z9CRFcA' },
    { id: 'deezer', name: t.platforms.deezer, url: 'https://link.deezer.com/s/33XPXKFyG0juCUmzRZlTR' },
    { id: 'tidal', name: t.platforms.tidal, url: 'https://tidal.com/album/545787260/u' },
  ]

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const toggleAudio = async () => {
    if (!audio.current) return
    if (audio.current.paused) {
      if (audio.current.currentTime >= 50) audio.current.currentTime = 0
      await audio.current.play()
    }
    else audio.current.pause()
  }

  const updatePreview = () => {
    if (!audio.current) return
    if (audio.current.currentTime >= 50) {
      audio.current.pause()
      audio.current.currentTime = 0
      setProgress(0)
      return
    }
    setProgress((audio.current.currentTime / 50) * 100)
  }

  const seekPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!audio.current) return
    const time = Number(event.target.value)
    audio.current.currentTime = time
    setProgress((time / 50) * 100)
  }

  const addReminder = () => {
    const event = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20260729T060000Z\nDTEND:20260729T070000Z\nSUMMARY:Poco Sol — Rana Bruja\nDESCRIPTION:Escucha el nuevo single Poco Sol de Rana Bruja.\nURL:${window.location.href}\nEND:VEVENT\nEND:VCALENDAR`
    const url = URL.createObjectURL(new Blob([event], { type: 'text/calendar' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'poco-sol-rana-bruja.ics'
    link.click()
    URL.revokeObjectURL(url)
  }

  return <main>
    <audio ref={audio} src={asset('rana-bruja-poco-sol.wav')} preload="metadata" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onTimeUpdate={updatePreview} />
    <div className="grain" />
    <header className="nav shell">
      <a href="/" className="wordmark" aria-label="Rana Bruja - Inicio"><img src={asset('rana-bruja-logo.jpg')} alt="Rana Bruja" /></a>
      <nav aria-label="Main navigation"><a href="#historia">{t.nav.story}</a><a href="#videos">{t.nav.watch}</a><a href="#redes">{t.nav.follow}</a></nav>
      <button className="language" onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} aria-label="Change language">{language === 'es' ? 'EN' : 'ES'}</button>
    </header>

    <section id="top" className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow"><span />{t.hero.eyebrow}</p>
        <h1>{t.hero.title}</h1>
        <div className="release-panel">
          <p className="release">{released ? t.hero.lescoMessage : t.hero.release}</p>
          <div className="hero-actions">
            {released ? <><a className="video-cta" href="https://youtu.be/daHXA7cs4QA" target="_blank" rel="noreferrer">{t.hero.watchLesco} <b>↗</b></a><div className="release-platforms">{streamingPlatforms.map(platform => <a key={platform.id} className="release-platform" href={platform.url || undefined} target={platform.url ? '_blank' : undefined} rel={platform.url ? 'noreferrer' : undefined} aria-disabled={!platform.url} onClick={event => { if (!platform.url) event.preventDefault() }} title={platform.url ? platform.name : t.platforms.linkSoon}><PlatformIcon id={platform.id} /><span>{platform.name}</span></a>)}</div></> : <button className="button primary" onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}>{t.hero.listen} <b>↓</b></button>}
            {!released && <button className="calendar-button" onClick={addReminder}><CalendarIcon />{t.hero.presave}</button>}
          </div>
        </div>
      </div>
      <div className="cover-wrap">
        <div className="cover-glow" />
        <img className="cover" src={asset('poco-sol-cover.png')} alt="Poco Sol — Rana Bruja cover art" />
        <p className="cover-credit">{t.hero.credit}</p>
      </div>
    </section>

    <section id="preview" className="preview shell">
      <div><p className="eyebrow"><span />{t.player.label}</p><p className="preview-title">Poco Sol <em>—</em> Rana Bruja</p></div>
      <p className="preview-duration">{t.player.duration}</p>
      <button className="play" onClick={toggleAudio} aria-label={isPlaying ? t.player.playing : t.player.paused}>{isPlaying ? 'Ⅱ' : '▶'}</button>
      <div className="player-track"><input aria-label="Preview progress" type="range" min="0" max="50" step="0.1" value={progress / 2} onChange={seekPreview} /><div className="time"><span>0:{String(Math.floor(progress / 2)).padStart(2, '0')}</span><span>0:50</span></div></div>
      <span className="status"><i />{isPlaying ? t.player.playing : t.player.paused}</span>
    </section>

    <section className="lyrics shell"><div className="lyrics-heading"><p className="eyebrow"><span />{t.lyrics.eyebrow}</p><h2>{t.lyrics.title}</h2><button onClick={() => setLyricsOpen(!lyricsOpen)}>{lyricsOpen ? t.lyrics.hide : t.lyrics.toggle} <span>{lyricsOpen ? '↑' : '↓'}</span></button></div>{lyricsOpen && <div className="lyrics-body"><p>En la inexistencia<br/>de lo que no vi pasar,<br/>tormentas que brotan<br/>de mi propia espiral…<br/><b>¡Corren!</b></p><p>Hace mucho tiempo, hubo poco sol.<br/>Nubes tapaban lo que había más allá.<br/>Todo se inundó.</p><p>Los árboles me susurran<br/>lo que olvidé<br/>en el camino a la ciudad.</p><p>Me he perdido<br/>en la ciudad,<br/>en la ciudad.</p><p>Entre mis recuerdos<br/>me dejó flotar,<br/>aunque en este viaje<br/>se alejen un poco más…<br/><b>¡Mueren!</b></p><p>Hace mucho tiempo, hubo poco sol.<br/>Nubes tapaban lo que había más allá.<br/>Todo se inundó.</p><p>Los árboles me susurran<br/>lo que olvidé<br/>en el camino a la ciudad.</p></div>}</section>

    <section id="historia" className="story shell">
      <div className="story-sticky"><p className="eyebrow"><span />{t.story.eyebrow}</p><h2>{t.story.title}</h2><Leaf /></div>
      <div className="story-text"><p>{t.story.text1}</p><p>{t.story.text2}</p><p>{t.story.text3}</p>
        <div className="credits"><p className="credits-title">{t.credits.title}</p><div><small>{t.credits.artist}</small><strong>Rana Bruja</strong></div><div><small>{t.credits.lyricist}</small><strong>{t.credits.lyrics}</strong></div><div><small>{t.credits.studio}</small><strong>{t.credits.studioName}</strong></div><div className="credit-composition"><small>{t.credits.composer}</small><strong>{t.credits.names}</strong></div></div>
      </div>
    </section>

    <section id="videos" className="videos shell"><p className="eyebrow"><span />{t.videos.eyebrow}</p><div className="section-heading"><h2>{t.videos.title}</h2><p>{t.videos.subtitle}</p></div>
      <div className="video-grid">{videos.map((video, index) => <article className={`video-card card-${index}`} key={`${video.title}-${index}`}><button className="video-open" disabled={!video.embed} onClick={() => setActiveVideo(video)} aria-label={video.embed ? `${t.videos.watch}: ${video.title}` : `${video.title}: ${t.videos.comingSoon}`}><div className="card-art"><span>{String(index + 1).padStart(2, '0')}</span><i>{video.embed ? '▶' : '✦'}</i></div><div className="card-caption"><h3>{video.title}</h3><p>{video.embed ? video.platform : t.videos.comingSoon}</p></div></button></article>)}</div>
    </section>

    {activeVideo && <div className="video-modal" role="dialog" aria-modal="true" aria-label={activeVideo.title} onMouseDown={() => setActiveVideo(null)}><div className="modal-content" onMouseDown={event => event.stopPropagation()}><button className="modal-close" onClick={() => setActiveVideo(null)} aria-label={t.videos.close}>×</button><iframe src={activeVideo.embed} title={activeVideo.title} allow="encrypted-media; fullscreen" allowFullScreen /><div className="modal-footer"><span>{activeVideo.platform}</span><a href={activeVideo.url} target="_blank" rel="noreferrer">{t.videos.open} {activeVideo.platform} <b>↗</b></a></div></div></div>}

    <footer id="redes"><div className="shell footer"><div><p className="eyebrow"><span />{t.social.eyebrow}</p><h2>{t.social.title}</h2></div><img className="band-photo" src={asset('rana-bruja-band.jpg')} alt="Rana Bruja" /><div className="socials"><a href="https://www.facebook.com/ranabruja/" target="_blank" rel="noreferrer">{t.social.facebook} <span>↗</span></a><a href="https://www.instagram.com/rana.bruja/" target="_blank" rel="noreferrer">{t.social.instagram} <span>↗</span></a><a href="https://www.tiktok.com/discover/rana-bruja" target="_blank" rel="noreferrer">{t.social.tiktok} <span>↗</span></a></div><a className="booking" href="mailto:ranabrujaband@gmail.com"><small>{t.social.booking}</small><strong>ranabrujaband@gmail.com</strong><span>↗</span></a><p className="footer-note">{t.footer} · <a href="https://www.instagram.com/sdigital.cr" target="_blank" rel="noreferrer">{t.digital}</a></p></div></footer>
  </main>
}

createRoot(document.getElementById('root')!).render(<App />)
