import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { isDev } from '@/utils/env';

import { useLocale } from '@/hooks/useLocale';
import { version } from '../../../package.json';
import { useStyles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingItem, SettingGroup } from './(components)';
import { useTheme } from '@/theme';
import { Header } from '@/components';
import { useSettingStore } from '@/store/setting';

export default function SettingScreen() {
  const { t } = useTranslation(['setting', 'auth', 'common', 'error']);
  const { getLocaleDisplayName } = useLocale();
  const { theme } = useTheme();
  const { developerMode, setDeveloperMode } = useSettingStore();

  const [tapCount, setTapCount] = useState(0);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getThemeModeDisplayName = () => {
    if (theme.mode === 'auto') {
      return t('themeMode.auto', { ns: 'setting' });
    }
    return t(`themeMode.${theme.mode}`, { ns: 'setting' });
  };

  const handleVersionTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    // 清除之前的定时器
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    // 连续点击7次开启开发者模式
    if (newTapCount >= 7 && !developerMode) {
      setDeveloperMode(true);
      setTapCount(0);
      // 可以在这里添加提示用户已开启开发者模式的逻辑
    } else {
      // 2秒后重置计数器
      tapTimeoutRef.current = setTimeout(() => {
        setTapCount(0);
      }, 2000);
    }
  };

  const { styles } = useStyles();

  // 清理定时器
  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    };
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeAreaView}>
      <Header showBack title={t('title', { ns: 'setting' })} />
      <ScrollView style={[styles.container]}>
        <SettingGroup>
          <SettingItem
            extra={getThemeModeDisplayName()}
            href={'/setting/themeMode'}
            title={t('themeMode.title', { ns: 'setting' })}
          />
          <SettingItem href={'/setting/color'} title={t('color.title', { ns: 'setting' })} />
          <SettingItem href={'/setting/fontSize'} title={t('fontSize.title', { ns: 'setting' })} />
          <SettingItem
            extra={getLocaleDisplayName()}
            href="/setting/locale"
            title={t('locale.title', { ns: 'setting' })}
          />
        </SettingGroup>

        <SettingGroup>
          <SettingItem href="/setting/account" title={t('account.title', { ns: 'setting' })} />
          <SettingItem href="/setting/providers" title={t('providers', { ns: 'setting' })} />
        </SettingGroup>

        {(isDev || developerMode) && (
          <SettingGroup>
            <SettingItem
              href="/setting/developer"
              title={t('developer.title', { ns: 'setting' })}
            />
          </SettingGroup>
        )}

        <SettingGroup>
          <SettingItem
            href="https://lobehub.com/docs?utm_source=mobile"
            title={t('help', { ns: 'setting' })}
          />
          <SettingItem
            href="https://github.com/lobehub/lobe-chat/issues/new/choose"
            title={t('feedback', { ns: 'setting' })}
          />
          <SettingItem
            href="https://lobehub.com/changelog"
            title={t('changelog', { ns: 'setting' })}
          />
          <SettingItem href="mailto:support@lobehub.com" title={t('support', { ns: 'setting' })} />
          <SettingItem
            extra={version}
            onPress={handleVersionTap}
            title={t('version', { ns: 'setting' })}
          />
        </SettingGroup>
      </ScrollView>
    </SafeAreaView>
  );
}
