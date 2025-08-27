import { useState, useEffect } from 'react'
import qwertyLogo from '/qwerty.svg'

const Loding = () => {
    const [stage, setStage] = useState('')

    useEffect(() => {
        const timerLogo = setTimeout(() => setStage('logo-in'), 500)
        return () => {
            clearTimeout(timerLogo)
        }
    }, [])

    return (
        <div className='loding-pages'>
            <div className={`loding-container ${stage}`}>
                <img src={qwertyLogo} alt="QWERTY Logo" className="logo" />
                <div className="text">
                    <h1 className="title">QWERTY</h1>
                    <h2 className="subtitle">선린인터넷고등학교 웹 개발 동아리</h2>
                </div>
            </div>
        </div>
    )
}

export default Loding
