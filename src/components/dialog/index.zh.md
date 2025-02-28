# Dialog 对话框

<code src="./demos/demo1.tsx"></code>

## Dialog

### 属性

| 属性             | 说明                                                     | 类型                                                       | 默认值      |
| ---------------- | -------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| afterClose       | `Dialog` 完全关闭后的回调                                | `() => void`                                               | -           |
| afterShow        | 完全展示后触发                                           | `() => void`                                               | -           |
| image            | 图片 `url`                                               | `string`                                                   | -           |
| header           | 顶部区域                                                 | `React.ReactNode`                                          | -           |
| title            | 对话框标题                                               | `React.ReactNode`                                          | -           |
| content          | 对话框内容                                               | `React.ReactNode`                                          | -           |
| actions          | 操作按钮列表，可以传入二级数组来实现同一行内并排多个按钮 | `(Action \| Action[])[]`                                   | `[]`        |
| onAction         | 点击操作按钮时触发                                       | `(action: Action, index: number) => void \| Promise<void>` | -           |
| closeOnAction    | 点击操作按钮后后是否关闭                                 | `boolean`                                                  | `false`     |
| onClose          | 关闭时触发                                               | `() => void`                                               | -           |
| closeOnMaskClick | 是否支持点击遮罩关闭对话框                               | `boolean`                                                  | `false`     |
| visible          | 显示隐藏                                                 | `boolean`                                                  | `false`     |
| getContainer     | 自定义对话框的父容器                                     | `HTMLElement \| (() => HTMLElement) \| null`               | `null`      |
| bodyStyle        | `Dialog` 内容样式                                        | `React.CSSProperties`                                      | -           |
| bodyClassName    | `Dialog` 内容类名                                        | `string`                                                   | -           |
| maskStyle        | `Dialog` 遮罩样式                                        | `React.CSSProperties`                                      | -           |
| maskClassName    | `Dialog` 遮罩类名                                        | `string`                                                   | -           |
| stopPropagation  | 阻止某些事件的冒泡                                       | `PropagationEvent[]`                                       | `['click']` |

### Action

| 属性      | 说明           | 类型                          | 默认值  |
| --------- | -------------- | ----------------------------- | ------- |
| key       | 唯一标记       | `string \| number`            | -       |
| text      | 标题           | `string`                      | -       |
| disabled  | 是否为禁用状态 | `boolean`                     | `false` |
| danger    | 是否为危险状态 | `boolean`                     | `false` |
| bold      | 是否文字加粗   | `boolean`                     | `false` |
| style     | `Action` 样式  | `React.CSSProperties`         | -       |
| className | `Action` 类名  | `string`                      | -       |
| onClick   | 点击时触发     | `() => void \| Promise<void>` | -       |

## 指令式

可以通过指令式的方式使用 `Dialog`：

### Dialog.show

```ts | pure
const handler = Dialog.show(props)
```

可以通过调用 `Dialog` 上的 `show` 方法直接打开对话框，其中 `props` 参数的类型同上表，但不支持传入 `visible` 属性。

当对话框被关闭后，组件实例会自动销毁。

`show` 方法的返回值为一个组件控制器，包含以下属性：

| 属性  | 说明       | 类型         | 默认值 |
| ----- | ---------- | ------------ | ------ |
| close | 关闭对话框 | `() => void` | -      |

`show` 只是一个很基础的方法，在实际业务中，更为常用的是下面的 `alert` 和 `confirm` 方法：

### Dialog.alert

`alert` 接受的参数同 `show`，但不支持 `closeOnAction` `actions` 属性，它的返回值不是一个控制器对象，而是 `Promise<void>`。

此外，它还额外支持以下属性：

| 属性        | 说明               | 类型                          | 默认值       |
| ----------- | ------------------ | ----------------------------- | ------------ |
| confirmText | 确认按钮的内容     | `ReactNode`                   | `'我知道了'` |
| onConfirm   | 点击确认按钮时触发 | `() => void \| Promise<void>` | -            |

### Dialog.confirm

`confirm` 接受的参数同 `show`，但不支持 `closeOnAction` `actions` 属性，它的返回值不是一个控制器对象，而是 `Promise<boolean>`。

此外，它还额外支持以下属性：

| 属性        | 说明               | 类型                          | 默认值   |
| ----------- | ------------------ | ----------------------------- | -------- |
| confirmText | 确认按钮的内容     | `ReactNode`                   | `'确认'` |
| onConfirm   | 点击确认按钮时触发 | `() => void \| Promise<void>` | -        |
| cancelText  | 取消按钮的内容     | `ReactNode`                   | `'取消'` |
| onCancel    | 点击取消按钮时触发 | `() => void \| Promise<void>` | -        |

需要注意的是，对于**指令式**创建出来的 Dialog，**并不会感知父组件的重渲染和其中 state 的更新**，因此下面这种写法是完全错误的：

```tsx
export default function App() {
  const [captcha, setCaptcha] = useState<string>("");
  const showCaptcha = () => {
    return Dialog.confirm({
      title: "短信验证",
      content: (
        <div>
          <Input
            placeholder="请输入验证码"
            value={captcha} // App 中 captcha 的更新是不会传递到 Dialog 中的
            onChange={(v) => {setCaptcha(v)}}
          />
        </div>
      )
    });
  };
  return (
    <div>
      <Button onClick={showCaptcha}>Show</Button>
    </div>
  );
}
```

如果你需要在 Dialog 中包含很多复杂的状态和逻辑，那么可以使用声明式的语法，或者考虑自己将内部状态和逻辑单独封装一个组件出来，详见 [#4762](https://github.com/ant-design/ant-design-mobile/issues/4762)。

### Dialog.clear

可以通过调用 `Dialog` 上的 `clear` 方法关闭所有打开的对话框，通常用于路由监听中，处理路由前进、后退不能关闭对话框的问题。
