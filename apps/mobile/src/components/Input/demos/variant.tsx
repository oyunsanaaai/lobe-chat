import { Input } from '@lobehub/ui-rn';
import React from 'react';
import { Text, View } from 'react-native';

import { createStyles } from '@/theme';

const useStyles = createStyles(({ token }) => ({
  container: {
    gap: token.marginSM,
    padding: token.paddingLG,
  },
  description: {
    color: token.colorTextSecondary,
    fontSize: token.fontSizeSM,
    marginBottom: token.marginSM,
  },
  sectionTitle: {
    color: token.colorText,
    fontSize: token.fontSizeLG,
    fontWeight: '600',
    marginBottom: token.marginXS,
    marginTop: token.marginMD,
  },
}));

const VariantDemo = () => {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Filled（默认样式）</Text>
      <Text style={styles.description}>有背景和内边距，适合多数表单场景</Text>
      <Input placeholder="请输入内容" />
      <Input.Search placeholder="搜索内容..." />
      <Input.Password placeholder="请输入密码" />

      <Text style={styles.sectionTitle}>Outlined（描边）</Text>
      <Text style={styles.description}>带边框描边，适合需要更明确边界的输入框</Text>
      <Input placeholder="请输入内容" variant="outlined" />
      <Input.Search placeholder="搜索内容..." variant="outlined" />
      <Input.Password placeholder="请输入密码" variant="outlined" />

      <Text style={styles.sectionTitle}>Borderless（无底色）</Text>
      <Text style={styles.description}>无背景与圆角，常用于列表或紧凑布局</Text>
      <Input placeholder="请输入内容" variant="borderless" />
      <Input.Search placeholder="搜索内容..." variant="borderless" />
      <Input.Password placeholder="请输入密码" variant="borderless" />
    </View>
  );
};

export default VariantDemo;
