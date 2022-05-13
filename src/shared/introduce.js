import citizenImg from '../assets/image/character/양_시민.png'
import mafiaImg from '../assets/image/character/늑대_.png'
import doctorImg from '../assets/image/character/의사_양.png'
import policeImg from '../assets/image/character/경찰.png'
import reporterImg from '../assets/image/character/양_기자.png'

export default [
  {
    id: 1,
    name: 'citizen',
    title: '시민',
    explain: '시민이다',
    img: citizenImg,
  },
  {
    id: 2,
    name: 'mafia',
    title: '마피아',
    explain: '나쁜놈이다. 밤마다 한명씩 잡아먹을 수 있다.',
    img: mafiaImg,
  },
  {
    id: 3,
    name: 'doctor',
    title: '의사',
    explain: '본인을 살릴 수 없다.',
    img: doctorImg,
  },
  {
    id: 4,
    name: 'police',
    title: '경찰',
    explain: '민중의 지팡이',
    img: policeImg,
  },
  {
    id: 5,
    name: 'reporter',
    title: '리포터',
    explain: '딱 한번 능력을 사용하여 상대방의 직업을 모두에게 밝힐 수 있다.',
    img: reporterImg,
  },
]
