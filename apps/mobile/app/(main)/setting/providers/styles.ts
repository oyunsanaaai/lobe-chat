import { createStyles } from '@/theme';

export const useStyles = createStyles((token) => ({
  backButton: {
    marginRight: token.marginXS,
  },
  container: {
    backgroundColor: token.colorBgContainer,
    flex: 1,
    paddingBottom: token.padding, // 底部留白
  },
  content: {
    padding: token.padding,
  },
  eyeButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: token.marginXS,
    top: 0,
    width: 36,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: token.padding,
  },
  headerTitle: {
    color: token.colorText,
    flex: 1,
    fontSize: 17,
    fontWeight: token.fontWeightStrong,
    marginRight: 40,
    textAlign: 'center',
  },
  hint: {
    color: token.colorTextSecondary,
    fontSize: token.fontSizeSM,
    marginTop: token.marginXS,
  },
  input: {
    backgroundColor: token.colorBgContainer,
    borderColor: token.colorBorder,
    borderRadius: token.borderRadiusLG,
    borderWidth: 1,
    color: token.colorText,
    fontSize: token.fontSizeLG,
    height: 44,
    paddingHorizontal: token.paddingSM,
  },
  inputContainer: {
    marginBottom: token.margin,
    position: 'relative',
  },
  inputWithIcon: {
    paddingRight: 44,
  },
  label: {
    color: token.colorText,
    fontSize: token.fontSize,
    marginBottom: token.marginXS,
  },
  // Section样式 - 对标web端
  sectionHeader: {
    backgroundColor: token.colorBgContainer,
    paddingBottom: token.paddingXS,
    paddingHorizontal: token.padding,
    paddingTop: token.paddingLG,
  },
  sectionSeparator: {
    backgroundColor: token.colorBgContainer,
    height: 16, // 增加section间距
  },
  sectionTitle: {
    color: token.colorText,
    fontSize: 18, // 对标web端字体大小
    fontWeight: token.fontWeightStrong,
  },
  // 卡片间分隔 - 对标web端Grid gap
  separator: {
    backgroundColor: 'transparent',
    height: 16, // 对标web端16px gap
  },
  validateButton: {
    marginTop: token.margin,
  },
}));
