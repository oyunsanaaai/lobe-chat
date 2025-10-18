import { FONT_SIZE_LARGE, FONT_SIZE_SMALL, FONT_SIZE_STANDARD } from '@/const/common';
import { createStyles } from '@/theme';

export const useStyles = createStyles(({ token }) => ({
  bottomBarWrapper: {
    backgroundColor: token.colorBgContainer,
    bottom: 0,
    height: 160,
    left: 0,
    paddingHorizontal: token.paddingLG,
    paddingVertical: token.paddingXL,
    position: 'absolute',
    right: 0,
    width: '100%',
  },
  container: {
    backgroundColor: token.colorBgLayout,
    flex: 1,
    padding: token.paddingContentHorizontal,
    width: '100%',
  },
  fontSizeContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: token.marginLG,
  },
  fontSizeLarge: {
    color: token.colorText,
    fontSize: FONT_SIZE_LARGE,
  },
  fontSizeSmall: {
    color: token.colorText,
    fontSize: FONT_SIZE_SMALL,
  },
  fontSizeStandard: {
    color: token.colorText,
    fontSize: FONT_SIZE_STANDARD,
  },
  fontSizeText: {
    color: token.colorTextDescription,
    fontSize: token.fontSize,
  },
  safeAreaView: {
    backgroundColor: token.colorBgLayout,
    flex: 1,
  },
}));
