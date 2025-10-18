import { createStyles } from '@/theme';

export const useStyles = createStyles((token) => ({
  container: {
    gap: token.margin,
    paddingHorizontal: token.paddingContentHorizontal,
    paddingVertical: token.paddingContentVertical,
  },
}));
