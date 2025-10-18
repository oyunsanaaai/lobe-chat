# Tag 标签组件

进行标记和分类的小标签组件，支持自定义样式。

## 功能特性

- ✅ 简洁的标签设计
- ✅ 自定义样式支持
- ✅ 灵活的文本样式
- ✅ 自动换行布局
- ✅ TypeScript 支持
- ✅ 主题适配

## 基础使用

```tsx
import { Tag } from '@lobehub/ui-rn';

// 基础用法
<Tag>React</Tag>

// 自定义样式
<Tag
  style={{ backgroundColor: '#f0f2f5' }}
  textStyle={{ color: '#1890ff' }}
>
  Custom Tag
</Tag>

// 多标签布局
<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>JavaScript</Tag>
</View>
```

## API

### TagProps

| 属性      | 类型           | 默认值 | 说明     |
| --------- | -------------- | ------ | -------- |
| children  | \`ReactNode\`  | -      | 标签内容 |
| style     | \`ViewStyle\`  | -      | 容器样式 |
| textStyle | \`TextStyle\`  | -      | 文本样式 |
| onPress   | \`() => void\` | -      | 点击回调 |

## 样式定制

标签组件支持完全的样式定制，可以通过 \`style\` 和 \`textStyle\` 属性来自定义外观：

- \`style\`: 控制标签容器的样式（背景色、边框、内边距等）
- \`textStyle\`: 控制标签文本的样式（颜色、字体大小、字重等）
