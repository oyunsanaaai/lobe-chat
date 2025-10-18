import { PageContainer } from '@lobehub/ui-rn';
import { useRouter } from 'expo-router';
import { CodeIcon, ServerIcon, ShieldIcon, TrashIcon, XIcon, ZapIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';

import { DEFAULT_SERVER_URL } from '@/config/server';
import SettingGroup from '@/features/SettingGroup';
import SettingItem from '@/features/SettingItem';
import { safeReplaceLogin } from '@/navigation/safeLogin';
import { useSettingStore } from '@/store/setting';
import { useAuthActions } from '@/store/user';

import { useStyles } from './styles';
import {
  clearAuthData,
  expireAccessTokenNow,
  expireRefreshTokenNow,
  invalidateAccessToken,
  invalidateRefreshToken,
} from './utils';

export default function DeveloperScreen() {
  const { styles } = useStyles();
  const { t } = useTranslation(['setting', 'common', 'error']);
  const router = useRouter();
  const { logout } = useAuthActions();
  const {
    customServerUrl,
    developerMode,
    setDeveloperMode,
    setCustomServerUrl,
    setShowSelfHostedEntry,
    showSelfHostedEntry,
  } = useSettingStore();
  const currentServer = customServerUrl ?? DEFAULT_SERVER_URL;

  const confirmThenExecute = (
    confirmMessage: string,
    execute: () => Promise<void>,
    successMessage: string,
  ) => {
    const confirmTitle = t('actions.confirm', { ns: 'common' });
    const confirmText = t('actions.confirm', { ns: 'common' });
    const cancelText = t('actions.cancel', { ns: 'common' });
    const developerTitle = t('developer.title', { ns: 'setting' });
    const failurePrefix = t('developer.failurePrefix', { ns: 'setting' });

    Alert.alert(
      confirmTitle,
      confirmMessage,
      [
        { style: 'cancel', text: cancelText },
        {
          onPress: async () => {
            try {
              await execute();
              Alert.alert(developerTitle, successMessage);
            } catch (e) {
              const msg = e instanceof Error ? e.message : String(e);
              Alert.alert(developerTitle, `${failurePrefix}${msg}`);
            }
          },
          style: 'destructive',
          text: confirmText,
        },
      ],
      { cancelable: true },
    );
  };

  const handleSelfHostedEntryChange = (value: boolean) => {
    if (!value) {
      if (currentServer !== DEFAULT_SERVER_URL) {
        Alert.alert(
          t('developer.selfHostedEntry.confirmResetTitle', { ns: 'setting' }),
          t('developer.selfHostedEntry.confirmResetDescription', { ns: 'setting' }),
          [
            { style: 'cancel', text: t('actions.cancel', { ns: 'common' }) },
            {
              onPress: async () => {
                setShowSelfHostedEntry(false);
                setCustomServerUrl(null);
                try {
                  await logout();
                } catch (error) {
                  const message = error instanceof Error ? error.message : String(error);
                  Alert.alert(t('error.title', { ns: 'error' }), message);
                } finally {
                  safeReplaceLogin(router);
                }
              },
              style: 'destructive',
              text: t('developer.selfHostedEntry.confirmResetAction', { ns: 'setting' }),
            },
          ],
          { cancelable: true },
        );
      } else {
        setShowSelfHostedEntry(false);
      }

      return;
    }

    // Open Anyway
    setShowSelfHostedEntry(true);

    // help user to relogin
    Alert.alert(
      t('developer.selfHostedEntry.confirmTitle', { ns: 'setting' }),
      t('developer.selfHostedEntry.confirmDescription', { ns: 'setting' }),
      [
        { style: 'cancel', text: t('actions.notNow', { ns: 'common' }) },
        {
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              const message = error instanceof Error ? error.message : String(error);
              Alert.alert(t('error.title', { ns: 'error' }), message);
            } finally {
              safeReplaceLogin(router);
            }
          },
          style: 'default',
          text: t('developer.selfHostedEntry.confirmAction', { ns: 'setting' }),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <PageContainer showBack title={t('developer.title', { ns: 'setting' })}>
      <View style={styles.container}>
        <SettingGroup>
          <SettingItem
            icon={CodeIcon}
            onSwitchChange={(value) => setDeveloperMode(value)}
            showSwitch
            switchValue={developerMode}
            title={t('developer.mode.title', { ns: 'setting' })}
          />
        </SettingGroup>

        {developerMode && (
          <>
            <SettingGroup title={t('developer.server.group', { ns: 'setting' })}>
              <SettingItem
                extra={currentServer}
                icon={ServerIcon}
                title={t('developer.server.current', { ns: 'setting' })}
              />
              <SettingItem
                icon={ShieldIcon}
                onSwitchChange={handleSelfHostedEntryChange}
                showSwitch
                switchValue={showSelfHostedEntry}
                title={t('developer.selfHostedEntry.title', { ns: 'setting' })}
              />

              {/* <SettingItem
                href="/setting/developer/custom-server"
                title={t('developer.server.title', { ns: 'setting' })}
              /> */}
            </SettingGroup>
            <SettingGroup title={t('developer.auth.group', { ns: 'setting' })}>
              <SettingItem
                icon={ZapIcon}
                onPress={() =>
                  confirmThenExecute(
                    t('developer.auth.accessToken.expire.title', { ns: 'setting' }),
                    expireAccessTokenNow,
                    t('developer.auth.accessToken.expire.success', { ns: 'setting' }),
                  )
                }
                title={t('developer.auth.accessToken.expire.title', { ns: 'setting' })}
              />
              <SettingItem
                icon={ZapIcon}
                onPress={() =>
                  confirmThenExecute(
                    t('developer.auth.refreshToken.expire.title', { ns: 'setting' }),
                    expireRefreshTokenNow,
                    t('developer.auth.refreshToken.expire.success', { ns: 'setting' }),
                  )
                }
                title={t('developer.auth.refreshToken.expire.title', { ns: 'setting' })}
              />
              <SettingItem
                icon={XIcon}
                onPress={() =>
                  confirmThenExecute(
                    t('developer.auth.accessToken.invalidate.title', { ns: 'setting' }),
                    invalidateAccessToken,
                    t('developer.auth.accessToken.invalidate.success', { ns: 'setting' }),
                  )
                }
                title={t('developer.auth.accessToken.invalidate.title', { ns: 'setting' })}
              />
              <SettingItem
                icon={XIcon}
                onPress={() =>
                  confirmThenExecute(
                    t('developer.auth.refreshToken.invalidate.title', { ns: 'setting' }),
                    invalidateRefreshToken,
                    t('developer.auth.refreshToken.invalidate.success', { ns: 'setting' }),
                  )
                }
                title={t('developer.auth.refreshToken.invalidate.title', { ns: 'setting' })}
              />
              <SettingItem
                icon={TrashIcon}
                onPress={() =>
                  confirmThenExecute(
                    t('developer.auth.clearAuthData.title', { ns: 'setting' }),
                    clearAuthData,
                    t('developer.auth.clearAuthData.success', { ns: 'setting' }),
                  )
                }
                title={t('developer.auth.clearAuthData.title', { ns: 'setting' })}
              />
            </SettingGroup>
          </>
        )}
      </View>
    </PageContainer>
  );
}
