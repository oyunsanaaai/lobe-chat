import { router } from 'expo-router';
import { Alert } from 'react-native';

import i18n from '@/i18n';
import { safeReplaceLogin } from '@/navigation/safeLogin';
import { useUserStore } from '@/store/user';

let isAuthExpiredAlertVisible = false;

export const authExpired = {
  redirect: () => {
    if (isAuthExpiredAlertVisible) return;
    isAuthExpiredAlertVisible = true;
    Alert.alert(
      i18n.t('sessionExpired.title', { ns: 'error' }),
      i18n.t('sessionExpired.desc', { ns: 'error' }),
      [
        {
          onPress: () => {
            isAuthExpiredAlertVisible = false;
            useUserStore.getState().logout();
            safeReplaceLogin(router);
          },
          style: 'default',
          text: i18n.t('sessionExpired.login', { ns: 'error' }),
        },
      ],
      {
        cancelable: false,
        onDismiss: () => {
          isAuthExpiredAlertVisible = false;
        },
      },
    );
  },
};
