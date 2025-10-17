import { ChevronRight, Loader2Icon } from 'lucide-react-native';
import { memo } from 'react';

import Block from '@/components/Block';
import Flexbox from '@/components/Flexbox';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import { useTheme } from '@/components/styles';

import type { CellProps } from './type';

const Cell = memo<CellProps>(
  ({
    description,
    title,
    showArrow = true,
    icon,
    extra,
    arrowIcon,
    loading,
    style,
    iconSize = 18,
    titleProps,
    descriptionProps,
    iconProps,
    ...rest
  }) => {
    const theme = useTheme();
    const titleNode =
      typeof title === 'string' ? (
        <Text ellipsis fontSize={16} {...titleProps}>
          {title}
        </Text>
      ) : (
        title
      );
    const descriptionNode =
      typeof description === 'string' ? (
        <Text ellipsis type={'secondary'} {...descriptionProps}>
          {description}
        </Text>
      ) : (
        description
      );
    const rightNode = (
      <Flexbox
        align={'center'}
        gap={8}
        horizontal
        justify={'flex-end'}
        style={{
          overflow: 'hidden',
        }}
      >
        {typeof extra === 'string' ? (
          <Text ellipsis style={{ maxWidth: 100 }} type={'secondary'}>
            {extra}
          </Text>
        ) : (
          extra
        )}
        {showArrow && (
          <Icon
            color={theme.colorTextDescription}
            icon={arrowIcon || ChevronRight}
            size={'small'}
          />
        )}
      </Flexbox>
    );
    return (
      <Block
        align={'center'}
        borderRadius={0}
        clickable
        gap={8}
        horizontal
        justify={'space-between'}
        paddingBlock={14}
        paddingInline={16}
        style={({ hovered, pressed }) => [
          { minHeight: 48 },
          typeof style === 'function' ? style({ hovered, pressed }) : style,
        ]}
        variant={'borderless'}
        {...rest}
      >
        <Flexbox
          align={'center'}
          flex={1}
          gap={10}
          horizontal
          justify={'flex-start'}
          style={{
            overflow: 'hidden',
          }}
        >
          {icon && <Icon icon={icon} size={iconSize} {...iconProps} />}
          {descriptionNode ? (
            <Flexbox gap={4}>
              {titleNode}
              {descriptionNode}
            </Flexbox>
          ) : (
            titleNode
          )}
        </Flexbox>
        {loading ? (
          <Icon color={theme.colorTextDescription} icon={Loader2Icon} size={'small'} spin />
        ) : (
          rightNode
        )}
      </Block>
    );
  },
);

Cell.displayName = 'Cell';

export default Cell;
