import { ListItem } from '@lobehub/ui-rn';
import { useTranslation } from 'react-i18next';

import { DEFAULT_INBOX_AVATAR } from '@/_const/meta';
import { INBOX_SESSION_ID } from '@/_const/session';
import { useSwitchSession } from '@/hooks/useSwitchSession';
import { useSessionStore } from '@/store/session';

const Inbox = () => {
  const { t } = useTranslation('chat');
  const switchSession = useSwitchSession();
  const activeId = useSessionStore((s) => s.activeId);

  const isActive = activeId === INBOX_SESSION_ID;

  const handlePress = () => {
    // 使用 useSwitchSession hook，它会自动处理路由导航和抽屉关闭
    switchSession(INBOX_SESSION_ID);
  };

  return (
    <ListItem
      active={isActive}
      avatar={DEFAULT_INBOX_AVATAR}
      description={t('inbox.desc', { ns: 'chat' })}
      onPress={handlePress}
      title={t('inbox.title', { ns: 'chat' })}
    />
  );
};

export default Inbox;
