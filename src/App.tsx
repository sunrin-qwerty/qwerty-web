import { useEffect, useState } from 'react'
import qwertyLogo from '/qwerty.svg'
import './App.css'

import card_f from '/card-front.svg'
import card_b from '/card-back.svg'
import Loding from './Loding'

function App() {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showLoading && (
        <div className="overlay">
          <Loding />
        </div>
      )}

      {!showLoading && (
        <>
          <header className='header'>
            <img src={qwertyLogo} alt="Qwerty Logo" className='logo' />
            <ul className='nav'>
              <li><a href="#introduce">소개</a></li>
              <li><a href="#portfolio">포트폴리오</a></li>
              <li><a href="#apply">지원</a></li>
            </ul>
          </header>

          <section className='main-section'>
            <div className='main-container'>
              <div className='text-container'>
                <a className="main-text">
                  정제되고 체계적으로<br/>
                  <span id="qwerty-color">
                    {"QWERTY".split("").map((ch, i) => (
                      <span key={i} className="rise-letter" style={{ animationDelay: `${i * 0.12}s` }}>
                        {ch}
                      </span>
                    ))} 답게
                  </span>
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

          <section className='portfolio'>

          </section>
        </>
      )}
    </>
  )
}

export default App
