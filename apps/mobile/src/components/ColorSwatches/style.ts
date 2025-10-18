import { createStyles } from '@/components/theme';

export const useStyles = createStyles(
  (
    { token },
    {
      size,
      shape,
      gap,
    }: {
      gap: number;
      shape: 'circle' | 'square';
      size: number;
    },
  ) => {
    return {
      activeSwatch: {
        borderColor: token.colorFill,
        borderWidth: 1,
      },
      checkIcon: {
        position: 'absolute' as const,
      },
      colorSwatch: {
        alignItems: 'center' as const,
        borderColor: token.colorFillSecondary,
        borderRadius: shape === 'circle' ? size / 2 : token.borderRadius,
        borderWidth: 1,
        height: size,
        justifyContent: 'center' as const,
        width: size,
      },
      container: {
        flexDirection: 'row' as const,
        flexWrap: 'wrap' as const,
        gap: gap,
      },
    };
  },
);
