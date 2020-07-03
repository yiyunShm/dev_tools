import React from 'react'
import { Input } from 'antd';

const { Search } = Input;
import './search-box.less'

interface props {
  onSearch: any
}

export class SearchBox extends React.Component<props, {}> {
  render() {
    return (
      <div className="search">
        <Search placeholder="input search text" onSearch={this.props.onSearch} enterButton />
      </div>
    )
  }
}
