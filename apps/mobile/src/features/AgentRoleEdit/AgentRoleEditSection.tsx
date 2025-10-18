import { Button, Markdown } from '@lobehub/ui-rn';
import { Edit3 } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, View } from 'react-native';

import { agentSelectors, useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';
import { useThemeToken } from '@/theme';

import { useStyles } from './sectionStyles';

export const AgentRoleEditSection: React.FC = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const token = useThemeToken();

  const isInbox = useSessionStore(sessionSelectors.isInboxSession);
  const systemRole = useAgentStore(agentSelectors.currentAgentSystemRole);
  const updateAgentConfig = useAgentStore((s) => s.updateAgentConfig);

  const [editValue, setEditValue] = useState(systemRole || '');
  const [loading, setLoading] = useState(false);
  // 当 systemRole 为空时，默认进入编辑状态
  const [isEditing, setIsEditing] = useState(!systemRole);

  const textInputRef = useRef<TextInput>(null);

  const handleSave = useCallback(async () => {
    // 如果内容没有变化，且有内容时才退出编辑状态
    if (editValue === systemRole) {
      if (systemRole) {
        setIsEditing(false);
      }
      return;
    }

    setLoading(true);
    try {
      await updateAgentConfig({ systemRole: editValue });
      // 只有在保存的内容不为空时才退出编辑状态
      if (editValue.trim()) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update agent role:', error);
    } finally {
      setLoading(false);
    }
  }, [editValue, systemRole, updateAgentConfig]);

  const handleCancel = useCallback(() => {
    setEditValue(systemRole || '');
    // 如果原本没有 systemRole，保持编辑状态
    if (!systemRole) {
      return;
    }
    setIsEditing(false);
  }, [systemRole]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    // 延迟聚焦，确保组件已渲染
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 100);
  }, []);

  // 监听 systemRole 变化，同步更新编辑值
  useEffect(() => {
    setEditValue(systemRole || '');
    // 如果从有值变为空值，自动进入编辑状态
    if (!systemRole) {
      setIsEditing(true);
    }
  }, [systemRole]);

  // 如果是 Inbox session，不显示角色编辑
  if (isInbox) {
    return null;
  }

  // 预览态
  if (!isEditing) {
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('agentRoleEdit.roleSetting', { ns: 'chat' })}</Text>
          <Button icon={<Edit3 />} onPress={handleEdit} size="small" type="primary">
            {t('agentRoleEdit.edit', { ns: 'chat' })}
          </Button>
        </View>

        <View style={styles.previewContainer}>
          {systemRole ? (
            <View style={styles.markdownWrapper}>
              <Markdown>{systemRole}</Markdown>
            </View>
          ) : (
            <Text style={styles.emptyText}>{t('agentRoleEdit.placeholder', { ns: 'chat' })}</Text>
          )}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Token: {systemRole ? Math.ceil(systemRole.length / 4) : 0}
          </Text>
        </View>
      </View>
    );
  }

  // 编辑态
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('agentRoleEdit.title', { ns: 'chat' })}</Text>
        <View style={styles.editActions}>
          <Button onPress={handleCancel} size="small" type="text">
            {t('agentRoleEdit.cancel', { ns: 'chat' })}
          </Button>
          <Button
            disabled={loading}
            loading={loading}
            onPress={handleSave}
            size="small"
            type="primary"
          >
            {t('agentRoleEdit.confirm', { ns: 'chat' })}
          </Button>
        </View>
      </View>

      <View style={styles.editContainer}>
        <TextInput
          autoFocus
          enablesReturnKeyAutomatically={false}
          multiline
          onChangeText={setEditValue}
          placeholder={t('agentRoleEdit.placeholder', { ns: 'chat' })}
          placeholderTextColor={token.colorTextPlaceholder}
          ref={textInputRef}
          returnKeyType="default"
          scrollEnabled={true}
          style={styles.textInput}
          textAlignVertical="top"
          value={editValue}
        />
      </View>
    </View>
  );
};
