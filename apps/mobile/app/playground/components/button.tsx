import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components';
import { useStyles } from './style';

import React from 'react';

import ComponentPlayground, { DemoItem } from '@/components/Playground';
import {
  BasicDemo,
  SizesDemo,
  DisabledDemo,
  BlockDemo,
  IconDemo,
  ShapeDemo,
  DangerDemo,
  VariantColorDemo,
  LoadingDemo,
} from '@/components/Button/demos';
import README from '@/components/Button/readme';

const demos: DemoItem[] = [
  { component: <BasicDemo />, key: 'basic', title: '基础用法' },
  { component: <SizesDemo />, key: 'sizes', title: '不同尺寸' },
  { component: <DisabledDemo />, key: 'disabled', title: '禁用状态' },
  { component: <BlockDemo />, key: 'block', title: '块级按钮' },
  { component: <IconDemo />, key: 'icon', title: '图标按钮' },
  { component: <ShapeDemo />, key: 'shape', title: '按钮形状' },
  { component: <DangerDemo />, key: 'danger', title: '危险态按钮' },
  { component: <VariantColorDemo />, key: 'variant-color', title: '变体与颜色' },
  { component: <LoadingDemo />, key: 'loading', title: '加载状态' },
];

export default function ButtonPlaygroundPage() {
  const { styles } = useStyles();
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeAreaView}>
      <Header showBack title="Button 组件" />
      <ComponentPlayground demos={demos} readmeContent={README} />
    </SafeAreaView>
  );
}
