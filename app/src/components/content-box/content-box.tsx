import React from 'react'
import './content-box.less'

interface Info {
  idx: number,
  time: any,
  appname: string,
  type: string,
  message: string
}

interface props {
  msg: Array<Info>
}

export class ContentBox extends React.Component<props, {}> {
  render() {
    let infoDom = this.props.msg.map((item: Info, idx: number) => {
      return (
        <p key={idx}>
          <span className="line">{item.idx}</span> <span className="time">[{item.time}]</span> <span className="name">[{item.appname}]</span> <span className={item.type}>[{item.type}]</span> <span className="text">{item.message}</span>
        </p>
      )
    })

    return (
      <div className="content">
        {infoDom}
      </div>
    )
  }
}
