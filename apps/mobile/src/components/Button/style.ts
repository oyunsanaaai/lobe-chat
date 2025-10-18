import { createStyles, getLineHeight } from '@/components/styles';
import { AggregationColor, isBright } from '@/utils/color';

import { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from './type';

export const useStyles = createStyles(
  (
    { token },
    {
      variant,
      color,
      size,
      loading,
      disabled,
      block,
      shape,
    }: {
      block: boolean;
      color: ButtonColor;
      disabled: boolean;
      loading: boolean;
      shape: ButtonShape;
      size: ButtonSize;
      variant: ButtonVariant;
    },
  ) => {
    // Resolve a base color from `color` prop (including PresetColorKey)
    const resolveBaseColor = () => {
      if (color === 'primary') return token.colorPrimary;
      // If both `danger` and `color` are provided, respect `color`
      if (color === 'danger') return token.colorError;
      if (color && color !== 'default') {
        // prefer 10 shade if available, otherwise fallback to primary
        return (token[`${color}10`] as string) || token.colorPrimary;
      }

      // default neutral text color as accent for outlines/text
      return token.colorText;
    };

    const baseColor = resolveBaseColor();

    const getVariantStyles = () => {
      switch (variant) {
        case 'filled': {
          // 单独处理 filled 取色
          const getFilledColor = () => {
            if (disabled) return token.colorBgContainerDisabled;

            if (color === 'primary') return token.colorPrimaryBorder;
            if (color === 'danger') return token.colorErrorFillTertiary;
            if (color === 'default') return token[`gray3`] as string;

            // preset colors
            const lightColor = token[`${color}3`] as string;
            return lightColor;
          };

          const getTextColor = () => {
            if (disabled) return token.colorTextDisabled;

            if (color === 'primary') return token.colorPrimaryText;
            if (color === 'danger') return token.colorErrorText;
            if (color === 'default') return token.colorText;

            // preset colors
            const darkColor = token[`${color}10`] as string;
            return darkColor;
          };

          const filledColor = getFilledColor();
          const textColor = getTextColor();

          // 特殊处理
          return {
            backgroundColor: filledColor,
            borderColor: disabled || color === 'default' ? token.colorBorder : baseColor,
            borderStyle: 'solid' as const,
            borderWidth: 0,
            textColor: textColor,
          };
        }
        case 'solid': {
          // 单独处理 filled 取色
          const getFilledColor = () => {
            if (disabled) return token.colorBgContainerDisabled;

            if (color === 'primary') return token.colorPrimary;
            if (color === 'danger') return token.colorErrorFillTertiary;
            if (color === 'default') return token.colorBgSolid;

            // preset colors
            const darkColor = token[`${color}10`] as string;
            return darkColor;
          };

          const getTextColor = (filledColor: string) => {
            if (disabled) return token.colorTextDisabled;

            if (color === 'primary' || color === 'default') {
              const solidTextColor = isBright(new AggregationColor(filledColor), '#fff')
                ? '#000'
                : '#fff';
              return solidTextColor;
            }
            if (color === 'danger') return token.colorErrorText;

            return token.colorTextLightSolid;
          };
          const filledColor = getFilledColor();
          const textColor = getTextColor(filledColor);
          return {
            backgroundColor: filledColor,
            borderColor: disabled || color === 'default' ? token.colorBorder : baseColor,
            borderStyle: 'solid' as const,
            borderWidth: 0,
            textColor: textColor,
          };
        }
        case 'outlined': {
          return {
            backgroundColor: disabled ? token.colorBgContainerDisabled : token.colorBgContainer,
            borderColor: disabled
              ? token.colorBorder
              : color === 'default'
                ? token.colorBorder
                : baseColor,
            borderStyle: 'solid' as const,
            borderWidth: 1,
            textColor: disabled ? token.colorTextDisabled : baseColor,
          };
        }
        case 'dashed': {
          return {
            backgroundColor: 'transparent',
            borderColor: disabled
              ? token.colorBorder
              : color === 'default'
                ? token.colorBorder
                : baseColor,
            borderStyle: 'dashed' as const,
            borderWidth: 1,
            textColor: disabled
              ? token.colorTextDisabled
              : color === 'default'
                ? token.colorText
                : baseColor,
          };
        }
        case 'text': {
          return {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderStyle: 'solid' as const,
            borderWidth: 0,
            textColor: disabled
              ? token.colorTextDisabled
              : color === 'default'
                ? token.colorText
                : baseColor,
          };
        }
        case 'link': {
          return {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderStyle: 'solid' as const,
            borderWidth: 0,
            textColor: disabled ? token.colorTextDisabled : baseColor,
          };
        }
        default: {
          return {
            backgroundColor: disabled ? token.colorBgContainerDisabled : token.colorBgContainer,
            borderColor: disabled ? token.colorBorder : token.colorBorder,
            borderStyle: 'solid' as const,
            borderWidth: 1,
            textColor: disabled ? token.colorTextDisabled : token.colorText,
          };
        }
      }
    };

    const getSizeStyles = () => {
      const paddingInline = token.paddingContentHorizontal - token.lineWidth;
      const paddingInlineLG = token.paddingContentHorizontal - token.lineWidth;
      const paddingInlineSM = 8 - token.lineWidth;

      const contentFontSize = token.fontSize;
      // 和 fontSize 保持一致
      const contentFontSizeSM = token.fontSize;
      const contentFontSizeLG = token.fontSizeLG;

      const contentLineHeight = getLineHeight(contentFontSize);
      const contentLineHeightSM = getLineHeight(contentFontSizeSM);
      const contentLineHeightLG = getLineHeight(contentFontSizeLG);

      const paddingBlock = Math.max(
        (token.controlHeight - contentFontSize * contentLineHeight) / 2 - token.lineWidth,
        0,
      );
      const paddingBlockSM = Math.max(
        (token.controlHeightSM - contentFontSizeSM * contentLineHeightSM) / 2 - token.lineWidth,
        0,
      );
      const paddingBlockLG = Math.max(
        (token.controlHeightLG - contentFontSizeLG * contentLineHeightLG) / 2 - token.lineWidth,
        0,
      );

      switch (size) {
        case 'small': {
          return {
            fontSize: contentFontSizeSM,
            height: token.controlHeightSM,
            paddingHorizontal: paddingInlineSM,
            paddingVertical: paddingBlockSM,
          };
        }
        case 'large': {
          return {
            fontSize: contentFontSizeLG,
            height: token.controlHeightLG,
            paddingHorizontal: paddingInlineLG,
            paddingVertical: paddingBlockLG,
          };
        }
        default: {
          return {
            fontSize: contentFontSize,
            height: token.controlHeight,
            paddingHorizontal: paddingInline,
            paddingVertical: paddingBlock,
          };
        }
      }
    };

    const typeStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    const isCircle = shape === 'circle';

    return {
      button: {
        alignItems: 'center',
        alignSelf: block ? 'auto' : 'flex-start',
        backgroundColor: typeStyles.backgroundColor,
        borderColor: typeStyles.borderColor,
        borderRadius: isCircle ? sizeStyles.height / 2 : token.borderRadius,
        borderStyle: typeStyles.borderStyle,
        borderWidth: typeStyles.borderWidth,
        flexDirection: 'row',
        height: sizeStyles.height,
        justifyContent: 'center',
        minHeight: isCircle ? undefined : sizeStyles.height,
        opacity: loading ? token.opacityLoading : 1,
        paddingHorizontal: isCircle ? 0 : sizeStyles.paddingHorizontal,
        paddingVertical: isCircle ? 0 : sizeStyles.paddingVertical,
        width: isCircle ? sizeStyles.height : block ? '100%' : 'auto',
      },
      icon: {
        marginRight: isCircle ? 0 : token.marginXS,
      },
      text: {
        color: typeStyles.textColor,
        fontSize: sizeStyles.fontSize,
        textAlign: 'center',
      },
    };
  },
);
