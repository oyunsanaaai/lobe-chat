import { autoSuggestionPrompt } from '@lobechat/prompts';
import { z } from 'zod';
import { StateCreator } from 'zustand/vanilla';

import { aiChatService } from '@/services/aiChat';
import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/selectors';
import { ChatStore } from '@/store/chat/store';
import { ChatAutoSuggestions, ChatMessage, ChatSuggestion } from '@/types/message';

import { chatSelectors } from '../../selectors';

const SuggestionsSchema = z.object({
  suggestions: z.array(z.string().max(60)).max(3),
});

export interface ChatAutoSuggestionAction {
  /**
   * Generate auto-suggestions for a message
   */
  generateSuggestions: (messageId: string) => Promise<void>;
  /**
   * Update suggestions for a message
   */
  updateMessageSuggestions: (messageId: string, suggestions: ChatAutoSuggestions) => Promise<void>;
}

export const chatAutoSuggestion: StateCreator<
  ChatStore,
  [['zustand/devtools', never]],
  [],
  ChatAutoSuggestionAction
> = (set, get) => ({
  generateSuggestions: async (messageId: string) => {
    const { internal_dispatchMessage } = get();
    const messages = chatSelectors.activeBaseChats(get());
    const message = messages.find((msg: ChatMessage) => msg.id === messageId);

    if (!message || message.role !== 'assistant') {
      return;
    }

    // Get agent configuration
    const agentState = useAgentStore.getState();
    const agentConfig = agentSelectors.currentAgentConfig(agentState);

    // Check if auto-suggestions are enabled
    if (!agentConfig.chatConfig.autoSuggestion?.enabled) {
      return;
    }

    try {
      // Set loading state
      internal_dispatchMessage({
        id: messageId,
        type: 'updateMessage',
        value: {
          extra: {
            ...message.extra,
            autoSuggestions: {
              loading: true,
              suggestions: [],
            },
          },
        },
      });

      // Build prompt using Prompt Layer
      const prompt = autoSuggestionPrompt({
        customPrompt: agentConfig.chatConfig.autoSuggestion.customPrompt,
        maxSuggestions: agentConfig.chatConfig.autoSuggestion.maxSuggestions,
        messages,
        systemRole: agentConfig.systemRole,
      });

      // Call AI service with 10 second timeout
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), 10_000);

      const result = await aiChatService.generateJSON(
        {
          messages: [
            {
              content: prompt,
              createdAt: Date.now(),
              id: 'temp-suggestion-msg',
              meta: {},
              role: 'user',
              updatedAt: Date.now(),
            } as any,
          ],
          model: agentConfig.model,
          provider: agentConfig.provider || 'openai',
          schema: SuggestionsSchema as any,
        },
        abortController,
      );

      clearTimeout(timeoutId);

      // Parse suggestions
      const suggestionsData = result.object as { suggestions: string[] };
      const suggestions: ChatSuggestion[] = suggestionsData.suggestions.map((text, index) => ({
        id: `suggestion-${Date.now()}-${index}`,
        text,
      }));

      // Update message with suggestions
      internal_dispatchMessage({
        id: messageId,
        type: 'updateMessage',
        value: {
          extra: {
            ...message.extra,
            autoSuggestions: {
              loading: false,
              suggestions,
            },
          },
        },
      });
    } catch (error) {
      console.error('Failed to generate suggestions:', error);

      // Silent failure: remove autoSuggestions completely
      internal_dispatchMessage({
        id: messageId,
        type: 'updateMessage',
        value: {
          extra: {
            ...message.extra,
            autoSuggestions: undefined,
          },
        },
      });
    }
  },

  updateMessageSuggestions: async (messageId: string, suggestions: ChatAutoSuggestions) => {
    const { internal_dispatchMessage } = get();
    const messages = chatSelectors.activeBaseChats(get());
    const message = messages.find((msg: ChatMessage) => msg.id === messageId);

    if (!message) {
      return;
    }

    internal_dispatchMessage({
      id: messageId,
      type: 'updateMessage',
      value: {
        extra: {
          ...message.extra,
          autoSuggestions: suggestions,
        },
      },
    });
  },
});
