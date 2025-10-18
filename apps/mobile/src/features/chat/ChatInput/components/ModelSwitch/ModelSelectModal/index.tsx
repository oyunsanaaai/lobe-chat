import { EnabledProviderWithModels } from '@lobechat/types';
import { useRouter } from 'expo-router';
import { ArrowRight, BoltIcon, X } from 'lucide-react-native';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/components/theme';
import { useAiInfraInit } from '@/hooks/useAiInfraInit';
import { useCurrentAgent } from '@/hooks/useCurrentAgent';
import { useEnabledChatModels } from '@/hooks/useEnabledChatModels';

import ModelItemRender from '../ModelItemRender';
import ProviderItemRender from '../ProviderItemRender';
import { useStyles } from './styles';

// 生成菜单键，与Web端保持一致
const menuKey = (provider: string, model: string) => `${provider}-${model}`;

interface ModelSelectModalProps {
  onClose: () => void;
  visible: boolean;
}

/**
 * 模型选择模态框
 * 完全对齐Web端ModelSwitchPanel的逻辑和显示
 */
const ModelSelectModal = memo<ModelSelectModalProps>(({ visible, onClose }) => {
  const { currentModel, currentProvider, updateAgentConfig } = useCurrentAgent();
  const { t } = useTranslation();
  const enabledModels = useEnabledChatModels();
  const { isLoading: infraLoading, hasError: infraError } = useAiInfraInit();
  const token = useTheme();
  const router = useRouter();
  const { styles } = useStyles();

  // 当前选中的menuKey
  const activeKey = useMemo(() => {
    return menuKey(currentProvider, currentModel);
  }, [currentProvider, currentModel]);

  // 处理模型选择
  const handleModelSelect = useCallback(
    async (model: string, provider: string) => {
      try {
        onClose();
        await updateAgentConfig({
          model,
          provider,
        });
      } catch (error) {
        console.error('Failed to update model:', error);
      }
    },
    [updateAgentConfig, onClose],
  );

  // 获取模型项列表（对齐Web端getModelItems逻辑）
  const getModelItems = useCallback(
    (provider: EnabledProviderWithModels) => {
      // 如果没有模型，返回空状态提示
      if (provider.children.length === 0) {
        return [
          <TouchableOpacity
            activeOpacity={0.7}
            key={`${provider.id}-empty`}
            onPress={() => {
              onClose();
              router.push(`/setting/providers/${provider.id}`);
            }}
            style={styles.emptyModelItem}
          >
            <View style={styles.emptyContent}>
              <Text style={styles.emptyText}>
                {t('ModelSwitchPanel.emptyModel', {
                  ns: 'components',
                })}
              </Text>
              <ArrowRight color={token.colorTextTertiary} size={16} />
            </View>
          </TouchableOpacity>,
        ];
      }

      // 返回模型列表
      return provider.children.map((model) => {
        const isSelected = activeKey === menuKey(provider.id, model.id);

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={menuKey(provider.id, model.id)}
            onPress={() => handleModelSelect(model.id, provider.id)}
            style={[
              styles.modelItem,
              isSelected ? styles.modelItemSelected : styles.modelItemNormal,
            ]}
          >
            <ModelItemRender {...model} showInfoTag={true} type="chat" />

            {/* 选中状态指示器 */}
            {isSelected && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>
        );
      });
    },
    [activeKey, handleModelSelect, styles, token.colorTextTertiary],
  );

  // 渲染提供商分组（对齐Web端逻辑）
  const renderProviderGroup = useCallback(
    (provider: EnabledProviderWithModels) => {
      return (
        <View key={provider.id} style={styles.providerGroup}>
          {/* 提供商标题 */}
          <View style={styles.providerHeader}>
            <ProviderItemRender
              logo={provider.logo}
              name={provider.name}
              provider={provider.id}
              source={provider.source}
            />
            <BoltIcon
              color={token.colorText}
              onPress={() => {
                onClose();
                router.push(`/setting/providers/${provider.id}`);
              }}
              size={20}
            />
          </View>

          {/* 模型列表 */}
          <View style={styles.modelList}>{getModelItems(provider)}</View>
        </View>
      );
    },
    [getModelItems, styles],
  );

  // 计算要显示的内容（对齐Web端逻辑）
  const renderContent = useMemo(() => {
    // 加载中状态
    if (infraLoading) {
      return (
        <View style={styles.statusContainer}>
          <Text style={styles.loadingText}>{t('status.loading', { ns: 'common' })}</Text>
        </View>
      );
    }

    // 错误状态
    if (infraError) {
      return (
        <View style={styles.statusContainer}>
          <Text style={styles.errorText}>{t('status.error', { ns: 'common' })}</Text>
          <Text style={styles.subText}>
            {t('status.networkRetryTip', {
              ns: 'common',
            })}
          </Text>
        </View>
      );
    }

    // 空提供商状态（对齐Web端emptyProvider逻辑）
    if (enabledModels.length === 0) {
      return (
        <View style={styles.statusContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              router.push('/setting/providers');
              onClose();
              console.log('Navigate to provider settings');
            }}
            style={styles.emptyProviderItem}
          >
            <View style={styles.emptyContent}>
              <Text style={styles.emptyText}>
                {t('ModelSwitchPanel.emptyProvider', {
                  ns: 'components',
                })}
              </Text>
              <ArrowRight color={token.colorTextTertiary} size={16} />
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    // 正常显示提供商分组
    return enabledModels.map(renderProviderGroup);
  }, [
    infraLoading,
    infraError,
    enabledModels,
    renderProviderGroup,
    styles,
    token.colorTextTertiary,
  ]);

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="pageSheet"
      visible={visible}
    >
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        {/* 标题栏 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {t('ModelSwitchPanel.chooseModel', {
              ns: 'components',
            })}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X color={token.colorTextSecondary} size={20} />
          </TouchableOpacity>
        </View>

        {/* 模型列表 */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          {renderContent}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
});

ModelSelectModal.displayName = 'ModelSelectModal';

export default ModelSelectModal;
