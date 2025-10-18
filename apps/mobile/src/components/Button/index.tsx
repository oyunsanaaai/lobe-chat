import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
  StyleProp,
  View,
  Animated,
  Easing,
} from 'react-native';
import { LoaderCircle } from 'lucide-react-native';

import { useStyles } from './style';
import { ButtonType, ButtonSize, ButtonShape, ButtonVariant, ButtonColor } from './type';
import { FONT_SIZE_SMALL, FONT_SIZE_LARGE, FONT_SIZE_STANDARD } from '@/const/common';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  block?: boolean;
  children?: React.ReactNode;
  color?: ButtonColor;
  danger?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  onPress?: () => void;
  shape?: ButtonShape;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: ButtonType;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'middle',
  shape = 'default',
  loading = false,
  disabled = false,
  block = false,
  danger = false,
  variant,
  color,
  children,
  onPress,
  style,
  textStyle,
  icon,
  ...rest
}) => {
  // Map legacy `type` to new `variant` + `color` if not explicitly provided
  const mapped = (() => {
    // If both provided, use them directly
    if (variant && color) return { color, variant };

    // If only color provided, choose a sensible default variant
    if (color && !variant) {
      // non-default colors default to filled; default uses solid
      return { color, variant: (color !== 'default' ? 'filled' : 'solid') as ButtonVariant };
    }

    // If only variant provided, default color
    if (variant && !color) {
      return { color: (danger ? 'danger' : 'default') as ButtonColor, variant };
    }

    // Fallback: derive from legacy `type` and `danger`
    switch (type) {
      case 'primary': {
        return {
          color: (danger ? 'danger' : 'primary') as ButtonColor,
          variant: 'solid' as ButtonVariant,
        };
      }
      case 'text': {
        return {
          color: (danger ? 'danger' : 'default') as ButtonColor,
          variant: 'text' as ButtonVariant,
        };
      }
      case 'link': {
        return {
          color: (danger ? 'danger' : 'primary') as ButtonColor,
          variant: 'link' as ButtonVariant,
        };
      }
      case 'dashed': {
        return {
          color: (danger ? 'danger' : 'default') as ButtonColor,
          variant: 'dashed' as ButtonVariant,
        };
      }
      default: {
        return {
          color: (danger ? 'danger' : 'default') as ButtonColor,
          variant: 'outlined' as ButtonVariant,
        };
      }
    }
  })();

  const { styles } = useStyles({
    block,
    color: mapped.color,
    disabled,
    loading,
    shape,
    size,
    variant: mapped.variant,
  });

  // Infinite spin animation for loading indicator
  const rotationProgress = React.useRef(new Animated.Value(0)).current;
  const rotationAnimationRef = React.useRef<Animated.CompositeAnimation | null>(null);
  const spin = rotationProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  React.useEffect(() => {
    if (loading) {
      rotationProgress.setValue(0);
      rotationAnimationRef.current = Animated.loop(
        Animated.timing(rotationProgress, {
          duration: 1000,
          easing: Easing.linear,
          toValue: 1,
          useNativeDriver: true,
        }),
      );
      rotationAnimationRef.current.start();
    } else {
      rotationAnimationRef.current?.stop?.();
    }

    return () => {
      rotationAnimationRef.current?.stop?.();
    };
  }, [loading, rotationProgress]);

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  const getIconSize = () => {
    if (size === 'large') {
      return FONT_SIZE_LARGE;
    }
    if (size === 'small') {
      return FONT_SIZE_SMALL;
    }
    return FONT_SIZE_STANDARD;
  };

  const renderIcon = () => {
    if (loading || !icon) return null;
    const iconColor = (styles.text?.color as string) ?? undefined;
    // Always match icon size to button text size for consistency
    const iconSize = getIconSize();

    let iconNode = icon;
    if (React.isValidElement(icon)) {
      const prevStyle = (icon.props as any)?.style;
      iconNode = React.cloneElement(icon as React.ReactElement<any>, {
        color: iconColor,
        size: iconSize,
        style: [prevStyle, { color: iconColor, fontSize: iconSize }],
      });
    }

    return (
      <View style={styles.icon} testID="button-icon">
        {iconNode}
      </View>
    );
  };

  return (
    <TouchableOpacity
      {...rest}
      accessibilityRole="button"
      activeOpacity={disabled || loading ? 1 : 0.7}
      disabled={disabled || loading}
      onPress={handlePress}
      style={[styles.button, style]}
      testID="button"
    >
      {loading && (
        <Animated.View style={[styles.icon, { transform: [{ rotate: spin }] }]}>
          <LoaderCircle
            color={styles.text.color}
            size={styles.text.fontSize}
            testID="loading-circle"
          />
        </Animated.View>
      )}
      {renderIcon()}
      {children ? <Text style={[styles.text, textStyle]}>{children}</Text> : undefined}
    </TouchableOpacity>
  );
};

export default Button;

export * from './type';
