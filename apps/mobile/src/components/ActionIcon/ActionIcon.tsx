'use client';

import { Loader2 } from 'lucide-react-native';
import { memo, useMemo } from 'react';

import Block from '@/components/Block';
import Icon from '@/components/Icon';
import { cva } from '@/components/styles';

import { calcSize } from './components/utils';
import { useStyles } from './style';
import type { ActionIconProps } from './type';

const ActionIcon = memo<ActionIconProps>(
  ({
    color,
    fill,
    active,
    icon,
    size = 'middle',
    variant = 'borderless',
    style,
    onPress,
    loading,
    fillOpacity,
    fillRule,
    focusable,
    shadow,
    disabled,
    clickable = true,
    spin: iconSpinning,
    danger,
    ...rest
  }) => {
    const { styles, theme } = useStyles();
    const { blockSize, borderRadius } = useMemo(() => calcSize(size), [size]);
    const variants = useMemo(
      () =>
        cva(styles.root, {
          compoundVariants: [
            {
              clickable: true,
              danger: true,
              style: styles.dangerFilled,
              variant: 'filled',
            },
            {
              clickable: true,
              danger: true,
              style: styles.dangerBorderless,
              variant: 'borderless',
            },
            {
              clickable: true,
              danger: true,
              style: styles.dangerOutlined,
              variant: 'outlined',
            },
            {
              clickable: true,
              danger: true,
              pressed: true,
              style: styles.dangerFilledHover,
              variant: 'filled',
            },
            {
              clickable: true,
              danger: true,
              pressed: true,
              style: styles.dangerBorderlessHover,
              variant: 'borderless',
            },
            {
              clickable: true,
              danger: true,
              pressed: true,
              style: styles.dangerOutlinedHover,
              variant: 'outlined',
            },
          ],
          defaultVariants: {
            danger: false,
            variant: 'borderless',
          },
          /* eslint-disable sort-keys-fix/sort-keys-fix */
          variants: {
            clickable: {
              false: null,
              true: null,
            },
            variant: {
              filled: null,
              outlined: null,
              borderless: null,
            },
            pressed: {
              false: null,
              true: null,
            },
            danger: {
              false: null,
              true: null,
            },
          },
          /* eslint-enable sort-keys-fix/sort-keys-fix */
        }),
      [styles],
    );

    return (
      <Block
        accessibilityRole="button"
        active={active}
        align={'center'}
        borderRadius={borderRadius as number}
        clickable={clickable}
        disabled={disabled || loading}
        flex={0}
        height={blockSize as number}
        justify={'center'}
        onPress={(event) => {
          if (loading || disabled) return;
          onPress?.(event);
        }}
        shadow={shadow}
        style={({ pressed, hovered }) => [
          variants({ clickable, danger, pressed, variant }),
          typeof style === 'function' ? style({ hovered, pressed }) : style,
        ]}
        tabIndex={disabled ? -1 : 0}
        variant={variant}
        width={blockSize as number}
        {...rest}
      >
        {icon && (
          <Icon
            color={
              danger
                ? theme.colorErrorText
                : disabled
                  ? theme.colorTextDisabled
                  : color
                    ? color
                    : theme.colorTextSecondary
            }
            fill={fill}
            fillOpacity={fillOpacity}
            fillRule={fillRule}
            focusable={focusable}
            icon={loading ? Loader2 : icon}
            size={size}
            spin={loading ? true : iconSpinning}
            style={{
              pointerEvents: 'none',
            }}
          />
        )}
      </Block>
    );
  },
);

ActionIcon.displayName = 'ActionIcon';

export default ActionIcon;
