import React from 'react';
import { ScrollView } from 'react-native';

import { useLocale } from '@/hooks/useLocale';
import { LANGUAGE_OPTIONS, LocaleMode } from '@/i18n/resource';
import { useTranslation } from 'react-i18next';

import { SettingItem, SettingGroup } from '../(components)';
import { useStyles } from './styles';
import { PageContainer } from '@/components';

export default function LocaleScreen() {
  const { styles } = useStyles();
  const { localeMode, changeLocale } = useLocale();
  const { t } = useTranslation(['setting']);
  const [pendingLocale, setPendingLocale] = React.useState<LocaleMode | null>(null);

  const handleLocaleChange = async (locale: LocaleMode) => {
    if (pendingLocale || localeMode === locale) return;
    try {
      setPendingLocale(locale);
      await changeLocale(locale);
    } finally {
      setPendingLocale(null);
    }
  };

  const localeOptions = [
    { label: t('locale.auto.title', { ns: 'setting' }), value: 'auto' },
    ...LANGUAGE_OPTIONS,
  ];

  return (
    <PageContainer
      showBack
      style={styles.safeAreaView}
      title={t('locale.title', { ns: 'setting' })}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SettingGroup>
          {localeOptions.map((option, index) => (
            <SettingItem
              description={
                option.value === 'auto' ? t('locale.auto.description', { ns: 'setting' }) : ''
              }
              isLast={index === localeOptions.length - 1}
              isSelected={localeMode === option.value}
              key={option.value}
              loading={pendingLocale === (option.value as LocaleMode)}
              onPress={() => handleLocaleChange(option.value as LocaleMode)}
              showCheckmark={true}
              title={option.label}
            />
          ))}
        </SettingGroup>
      </ScrollView>
    </PageContainer>
  );
}
