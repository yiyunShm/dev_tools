import React from 'react'
import './content-box.less'

interface Info {
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
        <p key={idx} className={item.type}>[{item.time}] [{item.appname}] [{item.type}] -- {item.message}</p>
      )
    })

    return (
      <div className="content">
        {infoDom}
      </div>
    )
  }
}
