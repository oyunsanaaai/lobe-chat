const TEXTINPUT_README = `# TextInput组件

一个增强的React Native文本输入组件，支持前缀、后缀和复合组件。

## 特性

- ✅ **前缀支持** - 支持添加前缀图标或文本
- ✅ **后缀支持** - 支持添加后缀图标或按钮
- ✅ **复合组件** - 提供Search和Password专用组件
- ✅ **统一样式** - 基于设计系统的一致性样式
- ✅ **灵活布局** - 使用View包装实现灵活布局
- ✅ **TypeScript** - 完整的TypeScript类型支持
- ✅ **主题适配** - 自动适配明暗主题
- ✅ **平台优化** - 针对Android和iOS的样式优化

## 基本用法

### 1. 基础输入框

\`\`\`jsx
import TextInput from '@/components/TextInput';

<TextInput placeholder="请输入内容" />
<TextInput defaultValue="预设值" />
\`\`\`

### 2. 带前缀的输入框

\`\`\`jsx
import { Text } from 'react-native';

<TextInput 
  placeholder="请输入用户名" 
  prefix={<Text>@</Text>}
/>
\`\`\`

### 3. 带后缀的输入框

\`\`\`jsx
import { TouchableOpacity } from 'react-native';

<TextInput 
  placeholder="输入邮箱前缀" 
  suffix={<Text>@gmail.com</Text>}
/>

<TextInput 
  placeholder="输入消息" 
  suffix={<TouchableOpacity><SendIcon /></TouchableOpacity>}
/>
\`\`\`

### 4. 复合组件

\`\`\`jsx
// 搜索输入框
<TextInput.Search placeholder="搜索内容..." />

// 密码输入框（自动切换显示/隐藏）
<TextInput.Password placeholder="请输入密码" />
\`\`\`

### 5. 外观变体

\`\`\`jsx
// 默认（filled）
<TextInput placeholder="请输入内容" />

// 无底色（borderless）
<TextInput variant="borderless" placeholder="请输入内容" />
<TextInput.Search variant="borderless" placeholder="搜索内容..." />
<TextInput.Password variant="borderless" placeholder="请输入密码" />

// 描边（outlined）
<TextInput variant="outlined" placeholder="请输入内容" />
<TextInput.Search variant="outlined" placeholder="搜索内容..." />
<TextInput.Password variant="outlined" placeholder="请输入密码" />
\`\`\`

### 6. 尺寸大小

\`\`\`jsx
// 小号
<TextInput size="small" placeholder="Small" />
<TextInput.Search size="small" placeholder="Small Search" />
<TextInput.Password size="small" placeholder="Small Password" />

// 中号（默认）
<TextInput size="middle" placeholder="Middle" />
<TextInput.Search size="middle" placeholder="Middle Search" />
<TextInput.Password size="middle" placeholder="Middle Password" />

// 大号
<TextInput size="large" placeholder="Large" />
<TextInput.Search size="large" placeholder="Large Search" />
<TextInput.Password size="large" placeholder="Large Password" />
\`\`\`

### 7. 自定义样式

\`\`\`jsx
<TextInput
  placeholder="自定义样式"
  style={{ backgroundColor: 'red' }}
  contentStyle={{ fontSize: 18 }}
/>
\`\`\`

## API参考

### TextInputProps

| 属性 | 类型 | 描述 |
|------|------|------|
| \`variant\` | \`'filled' | 'borderless' | 'outlined'\` | 外观变体（默认 filled） |
| \`size\` | \`'large' | 'middle' | 'small'\` | 尺寸大小（默认 middle） |
| \`prefix\` | \`React.ReactNode\` | 前缀内容 |
| \`suffix\` | \`React.ReactNode\` | 后缀内容 |
| \`style\` | \`StyleProp<ViewStyle>\` | 外层容器样式 |
| \`contentStyle\` | \`StyleProp<TextStyle>\` | 输入框样式 |
| ...其他 | \`RNTextInputProps\` | React Native TextInput 的所有属性 |

### 复合组件

#### TextInput.Search
搜索输入框，自动添加搜索图标前缀，returnKeyType设为search

#### TextInput.Password  
密码输入框，自动添加眼睛图标后缀，支持切换显示/隐藏密码

## 设计原则

- **一致性**：统一的外观和交互体验
- **灵活性**：支持各种自定义需求
- **易用性**：简单直观的API设计`;

export default TEXTINPUT_README;
