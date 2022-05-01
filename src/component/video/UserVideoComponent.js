import React, { Component } from 'react'
import OpenViduVideoComponent from './OvVideo'
import './UserVideo.css'

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData
  }
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     room.conversations.forEach(convo => {
  //       const participantCount = room.participants.filter(p => p.primaryConvoNumber === convo.convoNumber).length;
  //       const el = document.querySelector(`.circle-container.convo${convo.convoNumber} ul`);

  //       Array.from(el.children).forEach((li, idx) => {
  //         const rot = idx * 360 / participantCount;
  //         li.style.transform = `translate(-50%, -50%) rotate(${rot}deg) translateY(-2.7rem) rotate(-${rot}deg)`;
  //       });
  //     });
  //   }, 150);
  // }, [room.conversations, room.participants]);

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <ul>
              <li>
                <OpenViduVideoComponent
                  streamManager={this.props.streamManager}
                />
                <div>
                  <p>{this.getNicknameTag()}</p>
                </div>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    )
  }
}
