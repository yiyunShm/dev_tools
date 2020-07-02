import * as React from 'react'
import { Button, Input, Spin, Card } from 'antd'
import './log-viewer.less'
import { ContentBox } from '@/src/components'

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

export default class Demo extends React.Component {
  render() {
    return (
      <div className="layout">
        <ContentBox/>
      </div>
    )
  }
}
