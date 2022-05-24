import pop from '../assets/sound/effect/pop.wav'
import pop2 from '../assets/sound/effect/pop02.mp3'
import win from '../assets/sound/effect/win.mp3'
import win02 from '../assets/sound/effect/win02.mp3'
import denied from '../assets/sound/effect/denied.mp3'
import denied02 from '../assets/sound/effect/denied02.mp3'
import lose from '../assets/sound/effect/lose.mp3'
import night from '../assets/sound/effect/nightiscome.mp3'
import morning from '../assets/sound/effect/morning.mp3'
import alert from '../assets/sound/effect/alert.mp3'
import bgm from '../assets/sound/bgm/big_helmet.mp3'

const accessSF = new Audio(pop)
const clickSF = new Audio(pop2)
const loadSF = new Audio(denied)
const deniedSF = new Audio(denied02)
const alertSF = new Audio(alert)
const winSF = new Audio(win)
const win02SF = new Audio(win02)
const loseSF = new Audio(lose)
const nightSF = new Audio(night)
const morningSF = new Audio(morning)
const startBgm = new Audio(bgm)

export {
  accessSF,
  clickSF,
  loadSF,
  deniedSF,
  nightSF,
  morningSF,
  alertSF,
  winSF,
  win02SF,
  loseSF,
  startBgm,
}
