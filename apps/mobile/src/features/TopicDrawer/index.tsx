import React, { memo } from 'react';
import { Drawer } from 'react-native-drawer-layout';
import * as Haptics from 'expo-haptics';
import { Text } from 'react-native';

import { useGlobalStore } from '@/store/global';
import TopicList from './components/TopicList';
import { useStyles } from './style';
import { PageContainer } from '@/components';
import { useTranslation } from 'react-i18next';

/**
 * TopicDrawer - 右侧Topic抽屉组件
 * 负责展示当前会话下的所有topic列表
 */
const TopicDrawer = memo(({ children }: { children: React.ReactNode }) => {
  const { styles } = useStyles();
  const { t } = useTranslation(['topic']);

  const [topicDrawerOpen, setTopicDrawerOpen] = useGlobalStore((s) => [
    s.topicDrawerOpen,
    s.setTopicDrawerOpen,
  ]);

  return (
    <Drawer
      drawerPosition="right"
      drawerStyle={styles.drawerStyle}
      drawerType="slide"
      hideStatusBarOnOpen={false}
      onClose={() => {
        setTopicDrawerOpen(false);
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
      onOpen={() => {
        setTopicDrawerOpen(true);
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
      open={topicDrawerOpen}
      overlayStyle={styles.drawerOverlay}
      renderDrawerContent={() => (
        <PageContainer left={<Text style={styles.headerTitle}>{t('title')}</Text>}>
          <TopicList />
        </PageContainer>
      )}
      swipeEdgeWidth={50}
      swipeEnabled={true}
    >
      {children}
    </Drawer>
  );
});

TopicDrawer.displayName = 'TopicDrawer';

export default TopicDrawer;
