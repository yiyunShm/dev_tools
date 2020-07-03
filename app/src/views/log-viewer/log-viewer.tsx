import * as React from 'react'
import reactDom from 'react-dom'

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

  showSearch: boolean = true
  callFocus: boolean = false

  componentWillMount() {
    this.eventBind()
  }

  componentDidMount() {
    this.onMessage()
  }

  componentDidUpdate() {
    if (!this.showSearch || !this.callFocus) return

    this.callFocus = false

    let $search: any = reactDom.findDOMNode(this.refs.$search)
    if ($search && $search.querySelector) {
      let $input = $search.querySelector('input')
      $input.focus() 
    }
  }

  eventBind() {
    let _this = this

    document.addEventListener('keydown', (evt) => {
      evt = evt || window.event
      // f5 fresh
      if (evt.keyCode === 116) {
        _this.freshMessage()
      }
      // show search component
      if (evt.ctrlKey && evt.keyCode === 70) {
        _this.showSearch = true
        _this.callFocus = true
        _this.handleMessage()
      }
      // hide search component
      // clear search text
      if (evt.keyCode === 27) {
        if (this.showSearch) {
          _this.showSearch = false
          _this.search = ''
          _this.handleMessage()
        }
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
        { this.showSearch ? (<SearchBox ref="$search" onSearch={this.getSearch}/>) : '' }
        <ContentBox msg={this.state.msg}/>
      </div>
    )
  }
}
