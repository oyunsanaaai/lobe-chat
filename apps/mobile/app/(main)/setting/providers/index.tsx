import React, { useMemo, useCallback } from 'react';
import { View, Text } from 'react-native';
import isEqual from 'fast-deep-equal';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAiInfraStore } from '@/store/aiInfra';
import { aiProviderSelectors } from '@/store/aiInfra/selectors';
import { AiProviderListItem } from '@/types/aiProvider';
import { useStyles } from './styles';

import ProviderCard from '@/features/setting/providers/ProviderCard';
import ProviderListSkeleton from '@/features/setting/providers/ProviderListSkeleton';
import { Header } from '@/components';

// 定义FlashList数据项类型
type ProviderFlashListItem =
  | { data: { count: number; title: string }; id: string; type: 'section-header' }
  | { data: AiProviderListItem; id: string; type: 'provider' }
  | { data: { message: string }; id: string; type: 'empty' };

const ProviderList = () => {
  const { styles } = useStyles();
  const { t } = useTranslation(['setting']);

  // 获取store数据和方法
  const { useFetchAiProviderList } = useAiInfraStore();

  // 使用SWR获取provider列表
  const { isLoading, error } = useFetchAiProviderList();

  // 使用store selectors来响应状态变化
  const enabledProviders = useAiInfraStore(aiProviderSelectors.enabledAiProviderList, isEqual);
  const disabledProviders = useAiInfraStore(aiProviderSelectors.disabledAiProviderList, isEqual);

  // 构建FlashList统一数据结构
  const flashListData = useMemo<ProviderFlashListItem[]>(() => {
    const items: ProviderFlashListItem[] = [];

    // 启用的Provider section
    if (enabledProviders.length > 0) {
      items.push({
        data: {
          count: enabledProviders.length,
          title: t('aiProviders.list.enabled', { ns: 'setting' }),
        },
        id: 'enabled-header',
        type: 'section-header',
      });

      enabledProviders.forEach((provider) => {
        items.push({
          data: provider,
          id: `provider-${provider.id}`,
          type: 'provider',
        });
      });
    }

    // 禁用的Provider section
    if (disabledProviders.length > 0) {
      items.push({
        data: {
          count: disabledProviders.length,
          title: t('aiProviders.list.disabled', { ns: 'setting' }),
        },
        id: 'disabled-header',
        type: 'section-header',
      });

      disabledProviders.forEach((provider) => {
        items.push({
          data: provider,
          id: `provider-${provider.id}`,
          type: 'provider',
        });
      });
    }

    // 如果没有任何Provider
    if (items.length === 0) {
      items.push({
        data: {
          message: t('aiProviders.list.empty', { ns: 'setting' }),
        },
        id: 'empty-providers',
        type: 'empty',
      });
    }

    return items;
  }, [enabledProviders, disabledProviders, t]);

  // 统一的renderItem函数
  const renderItem = useCallback(
    ({ item }: { item: ProviderFlashListItem }) => {
      switch (item.type) {
        case 'section-header': {
          return (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {item.data.title} ({item.data.count})
              </Text>
            </View>
          );
        }

        case 'provider': {
          return <ProviderCard provider={item.data} />;
        }

        case 'empty': {
          return (
            <View style={styles.container}>
              <Text style={styles.label}>{item.data.message}</Text>
            </View>
          );
        }

        default: {
          return null;
        }
      }
    },
    [styles],
  );

  // FlashList的keyExtractor
  const keyExtractor = useCallback((item: ProviderFlashListItem) => item.id, []);

  // Loading状态
  if (isLoading) {
    return (
      <>
        <Header showBack title={t('providers', { ns: 'setting' })} />
        <ProviderListSkeleton />
      </>
    );
  }

  // Error状态
  if (error) {
    return (
      <SafeAreaView edges={['bottom']} style={styles.safeAreaView}>
        <Header showBack title={t('providers', { ns: 'setting' })} />
        <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={styles.label}>{t('aiProviders.list.loadFailed', { ns: 'setting' })}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeAreaView}>
      <Header showBack title={t('providers', { ns: 'setting' })} />
      <View style={styles.container}>
        <FlashList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={flashListData}
          drawDistance={400}
          getItemType={(item) => item.type}
          keyExtractor={keyExtractor}
          removeClippedSubviews={true}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProviderList;
