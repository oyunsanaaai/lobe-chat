import { DiscoverAssistantItem } from '@lobechat/types';
import { Avatar, GitHubAvatar, Space, Tag } from '@lobehub/ui-rn';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { AVATAR_SIZE_MEDIUM } from '@/_const/common';

import { useStyles } from './style';

interface AgentCardProps {
  item: DiscoverAssistantItem;
}

export const AgentCard = ({ item }: AgentCardProps) => {
  const { styles } = useStyles();

  return (
    <Pressable
      onPress={() =>
        router.push({
          params: { slugs: [item.identifier] },
          pathname: '/discover/assistant/[...slugs]',
        })
      }
      style={styles.cardLink}
    >
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{item.title}</Text>

              <Space align="center">
                <GitHubAvatar size={24} username={item.author} />
                <Text style={styles.authorName}>
                  {item.author || 'LobeChat'}{' '}
                  <Text style={styles.date}>{dayjs(item.createdAt).format('YYYY-MM-DD')}</Text>
                </Text>
              </Space>
            </View>

            <Avatar avatar={item.avatar || '🤖'} size={AVATAR_SIZE_MEDIUM} />
          </View>

          <Text numberOfLines={2} style={styles.description}>
            {item.description}
          </Text>

          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {item.tags.map((tag: string) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default AgentCard;
