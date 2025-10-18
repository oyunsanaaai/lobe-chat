import { Platform } from 'react-native';

import { createStyles } from '@/theme';

const monospaceFontFamily = Platform.select({
  android: 'monospace',
  ios: 'Menlo',
});

export const useStyles = createStyles(({ token }) => ({
  codeContainer: {
    alignSelf: 'stretch',
    backgroundColor: token.colorBgContainer,
    borderRadius: 0,
    flexShrink: 1,
    margin: 0,
  },
  codeLine: {
    flexDirection: 'row',
    flexShrink: 0,
    fontFamily: monospaceFontFamily,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
  },
  codeScrollContainer: {
    flexDirection: 'column',
    minWidth: '100%',
    padding: token.paddingSM,
  },
  codeText: {
    flexShrink: 0,
    fontFamily: monospaceFontFamily,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
  },
  errorText: {
    color: token.colorText,
    margin: 8,
  },
  horizontalScrollContent: {
    flexGrow: 1,
  },
}));
