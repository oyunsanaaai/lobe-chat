import type { ThemedToken } from '@shikijs/core';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { useTheme } from '@/theme';

import { useTokenize } from '../../hooks/useTokenize';
import { useStyles } from './style';

interface TokenDisplayProps {
  code: string;
  lang: string;
}

function generateLineKey(lineIndex: number, lineContent: ThemedToken[]) {
  const lineText = lineContent.map((token) => token.content).join('');
  return `line-${lineIndex}-${lineText}`;
}

function generateTokenKey(lineIndex: number, tokenIndex: number, token: ThemedToken) {
  return `token-${lineIndex}-${tokenIndex}-${token.offset}-${token.content}`;
}

export function TokenDisplay({ code, lang }: TokenDisplayProps) {
  const { theme } = useTheme();
  const { tokens, error } = useTokenize(code, lang, theme.isDark ? 'dark' : 'light');
  const { styles } = useStyles();

  return error ? (
    <Text style={styles.errorText}>{code}</Text>
  ) : (
    <View style={styles.codeContainer}>
      <ScrollView
        contentContainerStyle={styles.horizontalScrollContent}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator
      >
        <View style={styles.codeScrollContainer}>
          {tokens.map((line, lineIndex) => (
            <View key={generateLineKey(lineIndex, line)} style={styles.codeLine}>
              {line.map((tokenItem, tokenIndex) => (
                <Text
                  key={generateTokenKey(lineIndex, tokenIndex, tokenItem)}
                  style={[
                    {
                      color: tokenItem.color,
                      fontStyle: tokenItem.fontStyle === 1 ? 'italic' : 'normal',
                    },
                    styles.codeText,
                  ]}
                >
                  {tokenItem.content}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
