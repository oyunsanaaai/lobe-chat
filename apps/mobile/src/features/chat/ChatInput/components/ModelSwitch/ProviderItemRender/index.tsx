import { ProviderIcon } from '@lobehub/icons-rn';
import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';

import { useThemeToken } from '@/theme';
import { AiProviderSourceType } from '@/types/aiProvider';

import { useStyles } from './styles';

interface ProviderItemRenderProps {
  logo?: string;
  name: string;
  provider: string;
  source?: AiProviderSourceType;
}

/**
 * 提供商项渲染组件
 * 显示提供商图标和名称，对齐Web端实现
 */
const ProviderItemRender = memo<ProviderItemRenderProps>(({ provider, name, source, logo }) => {
  const { styles } = useStyles();
  const token = useThemeToken();

  return (
    <View style={styles.container}>
      {/* 提供商图标 */}
      {source === 'custom' && logo ? (
        <Image
          resizeMode="contain"
          source={{ uri: logo }}
          style={[styles.icon, styles.customIcon]}
        />
      ) : (
        <ProviderIcon color={token.colorText} provider={provider} size={20} type="color" />
      )}

      {/* 提供商名称 */}
      <Text style={styles.name}>{name}</Text>
    </View>
  );
});

ProviderItemRender.displayName = 'ProviderItemRender';

export default ProviderItemRender;
