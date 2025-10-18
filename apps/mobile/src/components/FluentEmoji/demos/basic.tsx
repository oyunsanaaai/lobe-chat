import { FluentEmoji, Text, useTheme } from '@lobehub/ui-rn';
import React from 'react';
import { View } from 'react-native';

const BasicDemo = () => {
  const token = useTheme();

  const basicEmojis = ['😊', '🚀', '🔥', '🎉', '💡', '🌈', '🍕', '🎮'];

  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'center',
        }}
      >
        {basicEmojis.map((emoji, index) => (
          <View key={index} style={{ alignItems: 'center' }}>
            <FluentEmoji emoji={emoji} size={40} />
            <Text
              style={{
                color: token.colorTextSecondary,
                fontSize: 12,
                marginTop: 4,
                textAlign: 'center',
              }}
            >
              {emoji}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BasicDemo;
