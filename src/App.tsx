import { useEffect, useState } from 'react'
import CountUp from './components/CountUp'

import qwertyLogo from "/qwerty.svg"
import './App.css'
import './style/loding.css'

import card_f from '/card-front.svg'
import card_b from '/card-back.svg'
import Loding from './Loding'
import projects from './data/project.json'
import info from './data/info.json'

type Project = {
  id?: string | number
  title: string
  description: string
  use: string[]
  user: string
  demo?: string
  repo?: string
  link?: string
}

type Info = {
  user: string
  project: string
  age: string
}

function App() {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const targetEl = e.target as Element | null
      const a = targetEl?.closest && (targetEl.closest('a[href^="#"]') as HTMLAnchorElement | null)
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('#')) return
      const id = href.slice(1)
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
      history.pushState(null, '', '#' + id)
    }

    document.addEventListener('click', onClick)

    const idOnLoad = location.hash.replace('#', '')
    if (idOnLoad) {
      const target = document.getElementById(idOnLoad)
      if (target) target.scrollIntoView({ block: 'center' })
    }

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [])

  const projectList: Project[] = (() => {
    const data = projects as unknown
    if (Array.isArray(data)) return data as Project[]
    if (data && typeof data === 'object' && 'projects' in (data as object)) {
      const p = (data as { projects?: unknown }).projects
      if (Array.isArray(p)) return p as Project[]
    }
    return []
  })()

  const infoList: string[] = (() => {
  const data = info as unknown
  if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>

    if ('info' in obj && obj.info && typeof obj.info === 'object') {
      const i = obj.info as Partial<Info>
      return [String(i.project ?? "0"), String(i.user ?? "0"), String(i.age ?? "0")]
    }

    const top = obj as Partial<Info>
    if ('project' in top || 'user' in top || 'age' in top) {
      return [String(top.project ?? "0"), String(top.user ?? "0"), String(top.age ?? "0")]
    }
  }
  return ["0", "0", "0"]
})()


  return (
    <>
      {showLoading && (
        <div className="overlay">
          <Loding />
        </div>
      )}

      {!showLoading && (
        <main className="snap-scroll">
          <section className="main-section snap-section">
            <header className="header">
              <img src={qwertyLogo} alt="Qwerty Logo" className="logo" />

              <input type="checkbox" id="nav-toggle" className="nav-toggle" aria-hidden="true" />
              <label htmlFor="nav-toggle" className="nav-toggle-btn" aria-label="메뉴 토글">
                <span className="hamburger" />
              </label>

              <ul className="nav">
                <li><a href="#main">소개</a></li>
                <li><a href="#portfolio">포트폴리오</a></li>
                <li><a href="#apply">지원</a></li>
              </ul>
            </header>

            <div className='main-container' id='main'>
              <div className='text-container'>
                <a className="main-text">
                  정제되고 체계적으로<br/>
                  <span id="qwerty-color">
                    {"QWERTY".split("").map((ch, i) => (
                      <span key={i} className="rise-letter" style={{ animationDelay: `${i * 0.15}s` }}>
                        {ch}
                      </span>
                    ))} 
                  </span>
                  답게
                </a>

                <div className='sub-text-container'>
                  <a className='sub-text'>
                    QWERTY는 선린인터넷고등학교의<br/>
                    웹 개발 일반 동아리 입니다.<br/>
                  </a>      
                  <a className='sub-text'>
                    Become Standard라는 슬로건을 가지고<br/>
                    새로운 기준이 되기위해 노력하고 있습니다.
                  </a>
                </div>
              </div>
              <div className='card-container'>
                <img src={card_f} alt="Card Front" className='card1' />
                <img src={card_b} alt="Card Back" className='card2' />
              </div>
            </div>
          </section>



          <section className='info-section'>

            <div className='info-counter'>
              {infoList.map((value, index) => {
                const labels = ['진행한 프로젝트', '활동 인원', '동아리 연차']
                const units = ['개', '명', '년']
                return (
                  <div className='info-text-container' key={index}>
                    <a className='info-text'>
                      <CountUp
                        from={0}
                        to={Number(value)}
                        separator=","
                        direction="up"
                        duration={1.5}
                        className="count-up-text"
                      />
                      {units[index]}
                    </a>
                    <a className='info-subtext'>
                      {labels[index]}
                    </a>
                  </div>
                )
              }
              )}
            </div>

          </section>
          

          <section className="portfolio-container" id="portfolio">
            <h2 className="portfolio-title-section">포트폴리오</h2>

            <div className="portfolio-slider-wrap">
              <div id="portfolio-list" className="portfolio-list">
                {projectList.map((project, index) => {
                  const id = project.id ?? index
                  const modalId = `modal-toggle-${id}`

                  const links: { label: string; url: string }[] = []
                  if (project.demo) links.push({ label: '데모', url: project.demo })
                  if (project.repo) links.push({ label: '레포지토리', url: project.repo })
                  if (project.link) links.push({ label: '링크', url: project.link })

                  return (
                    <div className="portfolio-item-wrap" key={id}>
                      <input type="checkbox" id={modalId} className="modal-toggle" aria-hidden="true" />

                      <label htmlFor={modalId} className="portfolio-item" role="button">
                        <h3 className="portfolio-title">{project.title}</h3>
                        <p className="portfolio-description">{project.description}</p>
                        <p className="use">{project.use.join(', ')}</p>
                        <p className="user">{project.user}</p>
                      </label>

                      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={`modal-title-${id}`}>
                        <label htmlFor={modalId} className="modal-overlay" />

                        <div className="modal-content">
                          <h3 id={`modal-title-${id}`}>{project.title}</h3>
                          <p className="modal-description">{project.description}</p>
                          <p className="modal-use"><strong>사용 기술:</strong> {project.use.join(', ')}</p>
                          <p className="modal-user"><strong>참여인력:</strong> {project.user}</p>

                          {links.length > 0 && (
                            <p className="modal-links">
                              {links.map((l, i) => (
                                <a key={i} href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
                              ))}
                            </p>
                          )}

                          <label htmlFor={modalId} className="modal-close" role="button" aria-label="닫기">
                            <img src="/close.png" alt="Close" />
                          </label>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="apply-section snap-section" id='apply'>
            <h2 className='apply-title'>지원하기</h2>
          </section>

          <footer>
            <p>© 2025 QWERTY. All rights reserved.</p>
          </footer>
        </main>
      )}
    </>
  )
}

export default App
