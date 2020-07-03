import * as React from 'react'
import { ContentBox } from '@/src/components'
import { SearchBox } from '@/src/components'
import './log-viewer.less'

interface Info {
  time: any,
  appname: string,
  type: string,
  message: string
}

interface State {
  msg: Array<Info>
}

/**
 * props 和 state 的默认值需要单独声明
 */

export default class LogViewer extends React.Component<{}, State> {
  state: State = {
    msg: []
  }

  infoArr: Array<Info> = []
  search: string = ''

  componentWillMount() {
    this.eventBind()
  }

  componentDidMount() {
    this.onMessage()
  }

  eventBind() {
    let _this = this

    document.addEventListener('keydown', (evt) => {
      evt = evt || window.event
      // f5 fresh
      if (evt.keyCode === 116) {
        _this.freshMessage()
      }

      // search and jump
      if (evt.ctrlKey && evt.keyCode === 70) {
        console.log('search show')
      }

      if (evt.keyCode === 27) {
        console.log('search hide')
      }
    })
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
    this.infoArr.push(info)
    this.handleMessage()
  }

  parseMessage(time: number, appname: string, type: string, info: string): Info {
    return {
      time: time,
      appname: appname,
      type: type,
      message: info
    }
  }

  freshMessage() {
    this.infoArr = []
    this.handleMessage()
  }

  // bind this
  getSearch = (text: string) => {
    this.search = text
    this.handleMessage()
  }

  handleMessage() {
    if (this.search) {
      let filterArr = this.infoArr.filter((info: Info) => {
        return info.message.indexOf(this.search) > -1
      })

      this.setState({ msg: filterArr })
    } else {
      this.setState({ msg: this.infoArr })
    }
  }

  render() {
    return (
      <div className="layout">
        <ContentBox msg={this.state.msg}/>
        <SearchBox onSearch={this.getSearch}/>
      </div>
    )
  }
}
