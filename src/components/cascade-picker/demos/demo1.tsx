import React, { useState } from 'react'
import { Button, CascadePicker } from 'antd-mobile'
import { DemoBlock } from 'demos'

import { AsyncDemo } from './async-demo'

// 级联选择
function CascadePickerDemo() {
  const [visible, setVisible] = useState(false)
  const options = [
    {
      label: '浙江',
      value: '浙江',
      children: [
        {
          label: '杭州',
          value: '杭州',
        },
        {
          label: '宁波',
          value: '宁波',
        },
      ],
    },
    {
      label: '江苏',
      value: '江苏',
      children: [
        {
          label: '南京',
          value: '南京',
        },
        {
          label: '苏州',
          value: '苏州',
        },
      ],
    },
  ]
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
        }}
      >
        选择
      </Button>
      <CascadePicker
        title='级联选择'
        options={options}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        onConfirm={val => {
          console.log('onConfirm', val)
        }}
        onSelect={val => {
          console.log('onSelect', val)
        }}
      />
    </>
  )
}

export default () => {
  return (
    <>
      <DemoBlock title='级联选择'>
        <CascadePickerDemo />
      </DemoBlock>

      <DemoBlock title='异步获取选项'>
        <AsyncDemo />
      </DemoBlock>
    </>
  )
}
