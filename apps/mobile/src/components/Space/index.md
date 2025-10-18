# Space 间距组件

设置组件之间的间距，支持水平 / 垂直布局、不同对齐方式和分隔符。

## 功能特性

- ✅ 水平和垂直方向间距
- ✅ 预设间距大小（small、middle、large）
- ✅ 自定义间距数值
- ✅ 多种对齐方式（start、center、end、baseline）
- ✅ 自动换行支持
- ✅ 分隔符功能
- ✅ TypeScript 支持
- ✅ 主题适配

## 基础使用

```tsx
import { Space } from '@lobehub/ui-rn';

// 基础用法
<Space>
  <Component1 />
  <Component2 />
  <Component3 />
</Space>

// 垂直间距
<Space direction="vertical">
  <Component1 />
  <Component2 />
</Space>

// 自定义间距大小
<Space size="large">
  <Component1 />
  <Component2 />
</Space>

// 对齐方式
<Space align="center">
  <Component1 />
  <Component2 />
</Space>
```

## API

### SpaceProps

| 属性      | 类型              | 默认值       | 说明             |              |             |          |
| --------- | ----------------- | ------------ | ---------------- | ------------ | ----------- | -------- |
| children  | \`ReactNode\`     | -            | 子组件           |              |             |          |
| direction | \`'horizontal' \\ | 'vertical'\` | \`'horizontal'\` | 间距方向     |             |          |
| size      | \`'small' \\      | 'middle' \\  | 'large' \\       | number\`     | \`'small'\` | 间距大小 |
| align     | \`'start' \\      | 'end' \\     | 'center' \\      | 'baseline'\` | \`'start'\` | 对齐方式 |
| wrap      | \`boolean\`       | \`false\`    | 是否自动换行     |              |             |          |
| split     | \`ReactNode\`     | -            | 分隔符           |              |             |          |
| style     | \`ViewStyle\`     | -            | 容器样式         |              |             |          |
