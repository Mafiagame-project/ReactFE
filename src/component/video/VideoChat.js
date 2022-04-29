import axios from 'axios'
import { OpenVidu } from 'openvidu-browser'
import React from 'react'
import OpenViduVideoComponent from './OvVideo'
import UserVideoComponent from './UserVideoComponent'

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443'
// const OPENVIDU_SERVER_URL = 'https://sparta-dongsun.shop'
const OPENVIDU_SERVER_SECRET = 'MY_SECRET' //백이랑 맞추는 건가?
//유저 아이디나 닉네임 받아올건지 여부

class VideoChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // mySessionId: this.props.roomId, //roomId 받아오는 건지 확인
      // myUserName: '',
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManger: undefined,
      publisher: undefined,
      subscribers: [],
    }
    this.joinSession = this.joinSession.bind(this)
    this.leaveSession = this.leaveSession.bind(this)
    this.switchCamera = this.switchCamera.bind(this)
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this)
    this.handleChangeUserName = this.handleChangeUserName.bind(this)
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this)
    this.onbeforeunload = this.onbeforeunload.bind(this)
  }
  //갱신된 후 호출 / if문을 안 써도 되나?
  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload)
    this.joinSession()
  }
  //제거 할 때
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload)
  }

  onbeforeunload(event) {
    this.leaveSession()
  }
  //sessonId = roomId 로 할건지?
  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    })
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    })
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      })
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers
    let index = subscribers.indexOf(streamManager, 0)
    if (index > -1) {
      subscribers.splice(index, 1)
      this.setState({
        subscribers: subscribers,
      })
    }
  }

  joinSession() {
    console.log('조인세션')
    //1) openVidu 객체 가져오기
    //session 객체 초기화 하기
    this.OV = new OpenVidu()
    // this.OV.setAdvancedConfiguration({
    //   noStreamPlayingEventExceptionTimeout: 10000,
    //   iceConnectionDisconnectedExceptionTimeout: 10000,
    // })

    //2) Init a session --
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        let mySession = this.state.session

        // 3) session에서 event 발생할때 마다 action 명시

        // 새 스트림을 받을 때 마다...
        mySession.on('streamCreated', (event) => {
          //스트림을 구독하면 스트림을 받음, 2번째 매개변수는 undefine

          //세션 게시자의 스트림 수신
          let subscriber = mySession.subscribe(event.stream, undefined)
          let subscribers = this.state.subscribers
          subscribers.push(subscriber)

          subscriber.on('publisherStartSpeaking', (event) => {
            this.setState({
              subspeaking: true,
              speakingId: event.connection.connectionId,
            })
          })

          subscriber.on('publisherStopSpeaking', (event) => {
            this.setState({
              subspeaking: false,
              speakingId: event.connection.connectionId,
            })
          })

          this.setState({
            subscribers: subscribers,
          })
        })

        // On every Stream destroyed...
        // 로컬 비디오 자동 정리
        mySession.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager)
        })

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          // console.warn(exception);
        })

        //4) 토큰과 함께 세션 연결

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          //첫번째 매개변수는 openVidu 서버에서 가져온 토큰
          // Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })

            .then(async () => {
              var devices = await this.OV.getDevices()
              var videoDevices = devices.filter(
                (device) => device.kind === 'videoinput',
              )

              //5) 본인 카메라 스트림 가져오기

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties

              //메소드에 두 개의 매개변수 추가 가능, 하나는 게시자 스트림에 대한 속성이 있는 객체,
              //다른 하나는 메서드가 완료된 직후와 publisher 객체가 전달하기 전에 실행한 콜백 함수

              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // 오디오 소스, 기본 마이크
                videoSource: videoDevices[0].deviceId, // 비디오 소스, 기본 캠
                publishAudio: true, // 시작할 때 오디오 음소거 여부
                publishVideo: true, // 시작할 때 비디오 켤지 여부
                resolution: '320x260', // 비디오 사이즈
                frameRate: 30, // 비디오 프레임
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: true, // 카메라 미러링 여부
              })

              publisher.on('publisherStartSpeaking', (event) => {
                this.setState({ pubspeaking: true })
              })

              publisher.on('publisherStopSpeaking', (event) => {
                this.setState({ pubspeaking: false })
              })

              // 6) 내 스트림 게시

              mySession.publish(publisher)

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                // currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
              })
            })
            .catch((error) => {
              console.log('errrr', error)
            })
        })
      },
    )
  }

  //세션 나가기
  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ----

    const mySession = this.state.session

    if (mySession) {
      mySession.disconnect()
    }

    // Empty all properties...
    this.OV = null
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
    })
  }

  // async switchCamera() {
  //   try {
  //     const devices = await this.OV.getDevices()
  //     var videoDevices = devices.filter(
  //       (device) => device.kind === 'videoinput',
  //     )

  //     if (videoDevices && videoDevices.length > 1) {
  //       var newVideoDevice = videoDevices.filter(
  //         (device) =>
  //           device.deviceId !== this.state.currentVideoDevice.deviceId,
  //       )

  //       if (newVideoDevice.length > 0) {
  //         // Creating a new publisher with specific videoSource
  //         // In mobile devices the default and first camera is the front one
  //         var newPublisher = this.OV.initPublisher(undefined, {
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           mirror: true,
  //         })

  //         //newPublisher.once("accessAllowed", () => {
  //         await this.state.session.unpublish(this.state.mainStreamManager)

  //         await this.state.session.publish(newPublisher)
  //         this.setState({
  //           currentVideoDevice: newVideoDevice,
  //           mainStreamManager: newPublisher,
  //           publisher: newPublisher,
  //         })
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }
  render() {
    const id = this.state.subscribers.map(
      (i) => i.stream.connection.connectionId,
    )
    //말하는 사람 인덱스 가져오기
    // const idIndex = id.indexOf(this.state.speakingId)
    // const userId = this.props.roomUserList.map((i) => i.nickname)
    // const theOther = this.props.roomUserList.filter(
    //   (i) => i.nickname !== userNick,
    // )
    const mySessionId = this.state.mySessionId
    const myUserName = this.state.myUserName

    return (
      <div className="container">
        {this.state.session === undefined ? (
          <div id="join">
            <div id="join-dialog" className="jumbotron vertical-center">
              <h1> Join a video session </h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    className="btn btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="JOIN"
                  />
                </p>
              </form>
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <div id="session">
            <div id="session-header">
              <h1 id="session-title">{mySessionId}</h1>
              <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
            </div>

            {this.state.mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <UserVideoComponent
                  streamManager={this.state.mainStreamManager}
                />
                <input
                  className="btn btn-large btn-success"
                  type="button"
                  id="buttonSwitchCamera"
                  onClick={this.switchCamera}
                  value="Switch Camera"
                />
              </div>
            ) : null}
            <div id="video-container" className="col-md-6">
              {this.state.publisher !== undefined ? (
                <div
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() =>
                    this.handleMainVideoStream(this.state.publisher)
                  }
                >
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null}
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId),
    )
  }
  //api 나중에 주소 바꾸기
  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId })
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response)
          resolve(response.data.id)
        })
        .catch((response) => {
          var error = Object.assign({}, response)
          if (error?.response?.status === 409) {
            resolve(sessionId)
          } else {
            console.log(error)
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                OPENVIDU_SERVER_URL,
            )
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + '/accept-certificate',
              )
            }
          }
        })
    })
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {}
      axios
        .post(
          OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          console.log('TOKEN', response)
          resolve(response.data.token)
        })
        .catch((error) => reject(error))
    })
  }
}

export default VideoChat
