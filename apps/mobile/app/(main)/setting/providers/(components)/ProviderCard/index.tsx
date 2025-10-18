import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AiProviderListItem } from '@/types/aiProvider';
import { useThemeToken } from '@/theme';
import { useAiInfraStore } from '@/store/aiInfra';
import { InstantSwitch } from '@/components';
import { ProviderCombine } from '@lobehub/icons-rn';

import { useStyles } from './style';

interface ProviderCardProps {
  provider: AiProviderListItem;
}

const ProviderCard = memo<ProviderCardProps>(({ provider }) => {
  const { styles } = useStyles();
  const router = useRouter();
  const token = useThemeToken();
  const { description, id, enabled } = provider;

  // 获取store中的方法
  const { toggleProviderEnabled } = useAiInfraStore();

  const handlePress = () => {
    // 使用动态路由方案A: /setting/providers/[id]
    router.push(`/setting/providers/${id}` as any);
  };

  const handleSwitchChange = async (value: boolean) => {
    try {
      // 执行切换操作
      await toggleProviderEnabled(id, value);
      console.log(`Successfully toggled provider ${id} to ${value ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error(`Failed to toggle provider ${id}:`, error);
      // TODO: 可以考虑添加toast提示用户操作失败
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* 顶部：Logo + 名称（可点击跳转） */}
        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
          <View style={styles.header}>
            <ProviderCombine provider={id} size={24} />
            <InstantSwitch
              enabled={enabled}
              onChange={handleSwitchChange}
              size="small"
              thumbColor={token.colorBgContainer}
              trackColor={{
                false: '#e9e9eb', // iOS风格关闭状态
                true: '#34c759', // iOS风格开启状态
              }}
            />
          </View>
        </TouchableOpacity>

        {/* 中部：描述文字（可点击跳转） */}
        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
          <Text numberOfLines={2} style={styles.description}>
            {description}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default ProviderCard;
