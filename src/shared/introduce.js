import citizenImg from '../assets/image/character/양_시민.png'
import mafiaImg from '../assets/image/character/늑대_.png'
import doctorImg from '../assets/image/character/의사_양.png'
import policeImg from '../assets/image/character/경찰.png'
import reporterImg from '../assets/image/character/양_기자.png'
import citizenGif from '../assets/image/character/gif/양_시민.gif'
import mafiaGif from '../assets/image/character/gif/늑대.gif'
import doctorGif from '../assets/image/character/gif/양_의사.gif'
import policeGif from '../assets/image/character/gif/양_경찰.gif'
import reporterGif from '../assets/image/character/gif/양_기자.gif'

export default [
  {
    id: 1,
    name: 'citizen',
    title: '시민',
    explain:
      '마피양 게임의 가장 기본적인 직업군이다. 다른 양들과 함께 양인 척하는 늑대를 잡아 마피양 마을의 평화를 지켜야 한다.',
    ability: '특별한 능력은 없다. 낮에 투표가 가능하다',
    win: '모든 마피아를 잡는다',
    lose:
      '마피아에게 모두 잡아먹히거나 마피아의 수와 시민의 수가 같아지면 패배한다 ',
    img: citizenImg,
    shadow:
      'rgb(204 219 232) 3px 3px 5px 0px inset, rgb(255 255 255 / 50%) -3px 0px 5px 1px inset',
    info: '',
    gif: citizenGif,
    desc: '당신은 마피양 마을의 선량한 시민 양...! 풀 뜯어 먹는 것을 좋아해요',
  },
  {
    id: 2,
    name: 'mafia',
    title: '마피아',
    explain: '마피양 마을에서 양인 척하며 양들을 잡아먹는 늑대이다.',
    ability: '밤마다 한마리의 양을 잡아먹을 수 있다',
    win: '모든 시민을 잡아먹거나, 시민의 수와 같아지면 승리한다',
    lose: '모든 마피아가 시민에게 잡히면 패배한다',
    img: mafiaImg,
    shadow:
      'rgb(247 5 57) 3px 3px 5px 0px inset, rgb(247 5 290 / 50%) -3px 0px 5px 1px inset',
    info: '',
    gif: mafiaGif,
    desc:
      '당신은 마피양 마을에서 양인 척하는 늑대 마피양...! 밤마다 한 마리의 양을 잡아먹을 수 있어요.',
  },
  {
    id: 3,
    name: 'doctor',
    title: '의사',
    explain:
      '마피양 마을에서 병원을 운영하는 의사 양이다. 시민 양들과 함께 늑대를 잡는 것이 목표이다.',
    ability: '밤마다 본인을 제외한 다른 양을 살릴 수 있다',
    win: '시민을 도와 마피아를 모두 잡으면 승리한다',
    lose:
      '마피아에게 모두 잡아먹히거나 마피아의 수와 시민의 수가 같아지면 패배한다',
    img: doctorImg,
    shadow:
      'rgb(1 235 9) 3px 3px 5px 0px inset, rgb(19 235 255 / 50%) -3px 0px 5px 1px inset',
    info: '',
    gif: doctorGif,
    desc:
      '당신은 마피양 마을의 선량한 의사...! 밤마다 본인을 제외한 다른 양을 살릴 수 있어요.',
  },
  {
    id: 4,
    name: 'police',
    title: '경찰',
    explain:
      '마피양 마을을 지키는 경찰 양이다. 시민 양들과 함께 늑대를 잡는 것이 목표이다.',
    ability: '밤마다 본인을 제외한 다른 양들의 정체를 알아낼수 있다',
    win: '시민을 도와 마피아를 모두 잡으면 승리한다',
    lose:
      '마피아에게 모두 잡아먹히거나 마피아의 수와 시민의 수가 같아지면 패배한다',
    img: policeImg,
    shadow:
      'rgb(0 192 214) 3px 3px 5px 0px inset, rgb(209 192 214 / 50%) -3px 0px 5px 1px inset',
    info: '',
    gif: policeGif,
    desc:
      '당신은 마피양 마을을 지키는 경찰 양...! 밤마다 본인을 제외한 다른 양의 정체를 알아낼 수 있어요.',
  },
  {
    id: 5,
    name: 'reporter',
    title: '기자',
    explain:
      '마피양 마을에 수상한 일이 벌어진 것을 보고 취재하러 온 기자 양이다.',
    ability: '한 게임에 단 한번의 기회로 한 양의 직업을 모두에게 밝힐수 있다.',
    win: '시민을 도와 마피아를 모두 잡으면 승리한다',
    lose:
      '마피아에게 모두 잡아먹히거나 마피아의 수와 시민의 수가 같아지면 패배한다',
    img: reporterImg,
    shadow:
      'rgb(246 208 12) 3px 3px 5px 0px inset, rgb(203 103 245 / 50%) -3px 0px 5px 1px inset',
    info: '',
    gif: reporterGif,
    desc:
      '당신은 마피양 마을을 취재하러 온 기자 양...! 한 게임에 단 한 번 한 양의 직업을 모두에게 밝힐 수 있어요.',
  },
]
