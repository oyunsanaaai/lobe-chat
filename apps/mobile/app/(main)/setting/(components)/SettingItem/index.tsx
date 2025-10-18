import { Icon, Switch } from '@lobehub/ui-rn';
import { Href, Link } from 'expo-router';
import { Check } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { useStyles } from './style';

interface SettingItemProps {
  customContent?: ReactNode;
  description?: string;
  extra?: string;
  href?: Href;
  isLast?: boolean;
  isSelected?: boolean;
  loading?: boolean;
  onPress?: () => void;
  onSwitchChange?: (value: boolean) => void;
  showCheckmark?: boolean;
  showNewBadge?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  title: string;
}

export const SettingItem = ({
  title,
  extra,
  onPress,
  href,
  showSwitch,
  switchValue,
  onSwitchChange,
  description,
  isLast,
  showNewBadge,
  isSelected = false,
  showCheckmark = false,
  loading = false,
  customContent,
}: SettingItemProps) => {
  const { styles } = useStyles();

  const renderRightContent = () => {
    if (showSwitch) {
      return <Switch onValueChange={onSwitchChange} value={switchValue} />;
    }

    return (
      <>
        {extra && <Text style={styles.settingItemExtra}>{extra}</Text>}
        {showNewBadge && <View style={styles.badge} />}
        {loading && (
          <View style={styles.checkmark}>
            <ActivityIndicator size="small" />
          </View>
        )}
        {!loading && showCheckmark && isSelected && (
          <Text style={styles.checkmark}>
            <Icon icon={Check} size="small" />
          </Text>
        )}
        {(onPress || href) && !showCheckmark && !loading && (
          <Text style={styles.settingItemArrow}>›</Text>
        )}
      </>
    );
  };

  const content = (
    <View>
      <View style={styles.settingItem}>
        <View style={styles.settingItemLeft}>
          <Text style={styles.settingItemTitle}>{title}</Text>
          {description && <Text style={styles.settingItemDescription}>{description}</Text>}
        </View>
        <View style={styles.settingItemRight}>{renderRightContent()}</View>
      </View>
      {customContent && <View style={styles.customContent}>{customContent}</View>}
      {!isLast && <View style={styles.separator} />}
    </View>
  );

  const touchableContent = (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );

  if (href) {
    return (
      <Link asChild href={href}>
        {touchableContent}
      </Link>
    );
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
};
