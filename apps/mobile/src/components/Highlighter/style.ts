import { createStyles } from '@/theme';

export const useStyles = createStyles((token) => ({
  container: {
    backgroundColor: token.colorBgElevated,
    borderColor: token.colorBorder,
    borderRadius: token.borderRadius,
    borderWidth: token.lineWidth / 2,
    overflow: 'hidden',
  },
  copyButton: {
    padding: token.paddingXXS,
  },
  demoSection: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor: token.colorErrorBg,
    borderColor: token.colorError,
    borderRadius: token.borderRadius,
    borderWidth: token.lineWidth / 2,
    marginHorizontal: token.marginLG,
    padding: token.padding,
  },
  errorText: {
    color: token.colorError,
    fontSize: token.fontSize,
  },
  expandIcon: {
    padding: token.paddingXXS,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: token.colorFillQuaternary,
    height: 42,
    justifyContent: 'center',
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: token.marginXXS,
    left: token.paddingSM,
    position: 'absolute',
    zIndex: 10,
  },
  headerRight: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: token.paddingSM,
    zIndex: 10,
  },
  headerTitle: {
    color: token.colorText,
    fontSize: token.fontSizeSM,
    fontWeight: token.fontWeightStrong,
    textAlign: 'center',
  },
  simpleCopyButton: {
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadiusXS,
    padding: token.paddingXXS,
    position: 'absolute',
    right: token.paddingSM,
    top: token.paddingSM,
    zIndex: 10,
  },
  statusContainer: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: token.colorBgContainer,
    borderColor: token.colorBorder,
    borderRadius: token.borderRadius,
    borderWidth: token.lineWidth,
    flexDirection: 'row',
    paddingHorizontal: token.padding,
    paddingVertical: token.paddingSM,
  },
  statusLabel: {
    color: token.colorTextSecondary,
    fontSize: token.fontSize,
    marginRight: token.marginXS,
  },
  statusValue: {
    color: token.colorText,
    fontSize: token.fontSize,
    fontWeight: token.fontWeightStrong,
  },
  title: {
    color: token.colorTextHeading,
    fontSize: token.fontSizeHeading1,
    fontWeight: token.fontWeightStrong,
    marginBottom: token.marginLG,
  },
}));
