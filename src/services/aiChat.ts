import { ContextEngine, MessageCleanupProcessor } from '@lobechat/context-engine';
import { autoSuggestionPrompt } from '@lobechat/prompts';
import { SendMessageServerParams, StructureOutputParams } from '@lobechat/types';
import { cleanObject } from '@lobechat/utils';

import { lambdaClient } from '@/libs/trpc/client';
import { createXorKeyVaultsPayload } from '@/services/_auth';
import { ChatMessage, ChatSuggestion } from '@/types/message';

const SuggestionsSchema = {
  description: 'Auto-generated suggestions for chat messages',
  name: 'suggestions',
  schema: {
    additionalProperties: false,
    properties: {
      suggestions: {
        items: {
          maxLength: 60,
          type: 'string',
        },
        maxItems: 3,
        type: 'array',
      },
    },
    required: ['suggestions'],
    type: 'object' as const,
  },
  strict: true,
};

interface GenerateSuggestionParams {
  autoSuggestionConfig: {
    customPrompt?: string;
    maxSuggestions?: number;
  };
  messages: ChatMessage[];
  model: string;
  provider: string;
  systemRole?: string;
}

class AiChatService {
  sendMessageInServer = async (
    params: SendMessageServerParams,
    abortController: AbortController,
  ) => {
    return lambdaClient.aiChat.sendMessageInServer.mutate(cleanObject(params), {
      context: { showNotification: false },
      signal: abortController?.signal,
    });
  };

  generateJSON = async (
    params: Omit<StructureOutputParams, 'keyVaultsPayload'>,
    abortController: AbortController,
  ) => {
    return lambdaClient.aiChat.outputJSON.mutate(
      { ...params, keyVaultsPayload: createXorKeyVaultsPayload(params.provider) },
      {
        context: { showNotification: false },
        signal: abortController?.signal,
      },
    );
  };

  generateSuggestion = async (
    params: GenerateSuggestionParams,
    abortController: AbortController,
  ): Promise<ChatSuggestion[]> => {
    const { autoSuggestionConfig, messages, model, provider, systemRole } = params;

    // Build prompt using Prompt Layer
    const prompt = autoSuggestionPrompt({
      customPrompt: autoSuggestionConfig.customPrompt,
      maxSuggestions: autoSuggestionConfig.maxSuggestions,
      messages,
      systemRole,
    });

    // Process messages with ContextEngine
    const contextEngine = new ContextEngine({
      pipeline: [new MessageCleanupProcessor()],
    });

    const { messages: processedMessages } = await contextEngine.process({
      initialState: {
        messages: [],
      },
      maxTokens: 1024,
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
      model,
    });

    // Call AI service
    const result = await this.generateJSON(
      {
        messages: processedMessages,
        model,
        provider,
        schema: SuggestionsSchema,
      },
      abortController,
    );

    // Parse suggestions
    const suggestionsData = result.object as { suggestions: string[] };
    return suggestionsData.suggestions.map((text, index) => ({
      id: `suggestion-${Date.now()}-${index}`,
      text,
    }));
  };

  // sendGroupMessageInServer = async (params: SendMessageServerParams) => {
  //   return lambdaClient.aiChat.sendGroupMessageInServer.mutate(cleanObject(params));
  // };
}

export const aiChatService = new AiChatService();
