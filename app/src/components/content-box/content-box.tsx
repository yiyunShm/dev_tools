import React from 'react'
import './content-box.less'

interface Info {
  time: any,
  appname: string,
  type: string,
  message: string
}

interface State {
  msg: Array<Info>
}

export class ContentBox extends React.Component<{}, State> {
  state: State = {
    msg: []
  }

  componentWillMount() {
    this.onMessage()
  }

  onMessage() {
    let es = new EventSource('/logger/output')
    let _this = this

    // listening
    es.onmessage = function (evt: any) {
      console.log(evt)

      let arr = evt.data.split('|')           // [time,dataString]
      let data = _this.parseMessage(arr[0], arr[1], arr[2], arr[3])
      _this.setMessage(data)
    }
  }

  setMessage(info: Info) {
    let infoArr = this.state.msg || []
    infoArr.push(info)
    this.setState({ msg: infoArr })
  }

  parseMessage(time: number, appname: string, type: string, info: string): Info {
    return {
      time: time,
      appname: appname,
      type: type,
      message: info
    }
  }

  render() {
    let infoDom = this.state.msg.map((item: Info, idx: number) => {
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
