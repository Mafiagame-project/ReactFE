import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../../redux/modules/game'
import { Grid, Text } from '../../element/index'
import dayvote from '../../assets/image/character/양_behind.png'
import mafiaWin from '../../assets/image/noti/늑대_승리.gif'
import CitizenWin from '../../assets/image/noti/시민_승리.gif'
import NewspaperModal from './NewspaperModal'

function NotiModal() {
  const dispatch = useDispatch()
  const voteResult = useSelector((state) => state.game.resultNoti)
  const nightResult = useSelector((state) => state.game.resultNight)
  const endGameNoti = useSelector((state) => state.game.endGameNoti)
  const currentTime = useSelector((state) => state.game.night)
  const dayCount = useSelector((state) => state.game.cnt)
  const votedJob = useSelector((state) => state.game.votedJob)
  const [getNotice, setNotice] = useState(false)

  const printNoti = () => {
    setNotice(true)
    setTimeout(() => {
      setNotice(false)
    }, 6000)
    dispatch(gameActions.noticeRep(null))
  }

  useEffect(() => {
    if (dayCount < 2) {
      return
    } else {
      printNoti()
    }
  }, [dayCount])
  return (
    <>
      {getNotice ? (
        <>
          {endGameNoti ? ( // 게임이 끝났냐 안끝났냐
            <Modalblack>
              {currentTime ? (
                <VoteNoti>
                  <Text size="2vw">게임 결과</Text>
                  {endGameNoti === '마피아가 승리하였습니다.' ? (
                    <img src={mafiaWin} alt="win" style={{ width: '18vw' }} />
                  ) : (
                    <img src={CitizenWin} alt="win" style={{ width: '18vw' }} />
                  )}
                  <>
                    {votedJob === true ? (
                      <Text bold size="2vw">
                        마피아 {voteResult}양이 잡혔습니다
                      </Text>
                    ) : (
                      <Text bold size="2vw">
                        시민 {voteResult}양이 잡혔습니다
                      </Text>
                    )}
                  </>
                  <Text bold size="2vw">
                    {endGameNoti}
                  </Text>
                </VoteNoti>
              ) : (
                <VoteNoti>
                  <Text size="2vw">게임 결과</Text>
                  {endGameNoti === '마피아가 승리하였습니다.' ? (
                    <img src={mafiaWin} alt="win" style={{ width: '18vw' }} />
                  ) : (
                    <img src={CitizenWin} alt="win" style={{ width: '18vw' }} />
                  )}
                  <>
                    {nightResult ? (
                      <Text size="2vw">
                        마피아가 {nightResult}양을 잡아먹었습니다
                      </Text>
                    ) : null}
                  </>
                  <Text bold size="2vw">
                    {endGameNoti}
                  </Text>
                </VoteNoti>
              )}
            </Modalblack>
          ) : (
            <>
              {currentTime ? ( // 밤이면 낮의 결과가 출력
                <>
                  {voteResult !== false ? ( // 아무도 안 죽음 (?)을 아무도 죽지않았습니다로 출력하게!
                    <Modalblack>
                      <VoteNoti>
                        <Text size="3vw">낮 투표결과 </Text>
                        <img
                          src={dayvote}
                          style={{
                            width: '8vw',
                            margin: '2vw 0',
                          }}
                          alt="vote"
                        />
                        <>
                          {votedJob === true ? (
                            <Text bold size="2vw">
                              마피아 {voteResult}양이 잡혔습니다
                            </Text>
                          ) : (
                            <Text bold size="2vw">
                              {voteResult}양이 잡혔습니다
                            </Text>
                          )}
                        </>
                      </VoteNoti>
                    </Modalblack>
                  ) : (
                    <Modalblack>
                      <VoteNoti>
                        <Text size="2.5vw">낮 투표결과</Text>
                        <Text size="2vw" margin="4vw">
                          아무도 죽지 않았습니다
                        </Text>
                      </VoteNoti>
                    </Modalblack>
                  )}
                </>
              ) : (
                <NewspaperModal />
              )}
            </>
          )}
        </>
      ) : null}
    </>
  )
}

const Modalblack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.85);
`

const VoteNoti = styled.div`
  background: white;
  max-width: 38vw;
  padding: 3vw;
  box-sizing: border-box;
  border-radius: 20px;
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;
  position: relative;
`

export default NotiModal
