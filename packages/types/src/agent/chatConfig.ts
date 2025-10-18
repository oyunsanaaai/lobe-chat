/* eslint-disable sort-keys-fix/sort-keys-fix, typescript-sort-keys/interface */
import { z } from 'zod';

import { SearchMode } from '../search';

export interface WorkingModel {
  model: string;
  provider: string;
}
export interface LobeAutoSuggestion {
  /**
   * Enable auto suggestions
   * @default false
   */
  enabled?: boolean;
  /**
   * Custom prompt for generating suggestions
   */
  customPrompt?: string;
  /**
   * Maximum number of suggestions to generate
   * Range: 1-3 (based on issue #889)
   * @default 3
   */
  maxSuggestions?: number;
}

export interface LobeAgentChatConfig {
  displayMode?: 'chat' | 'docs';

  enableAutoCreateTopic?: boolean;
  autoCreateTopicThreshold: number;

  enableMaxTokens?: boolean;

  /**
   * 是否开启流式输出
   */
  enableStreaming?: boolean;

  /**
   * 是否开启推理
   */
  enableReasoning?: boolean;
  /**
   * 自定义推理强度
   */
  enableReasoningEffort?: boolean;
  reasoningBudgetToken?: number;
  reasoningEffort?: 'low' | 'medium' | 'high';
  gpt5ReasoningEffort?: 'minimal' | 'low' | 'medium' | 'high';
  /**
   * 输出文本详细程度控制
   */
  textVerbosity?: 'low' | 'medium' | 'high';
  thinking?: 'disabled' | 'auto' | 'enabled';
  thinkingBudget?: number;
  /**
   * 禁用上下文缓存
   */
  disableContextCaching?: boolean;
  /**
   * 历史消息条数
   */
  historyCount?: number;
  /**
   * 开启历史记录条数
   */
  enableHistoryCount?: boolean;
  /**
   * 历史消息长度压缩阈值
   */
  enableCompressHistory?: boolean;

  inputTemplate?: string;

  searchMode?: SearchMode;
  searchFCModel?: WorkingModel;
  urlContext?: boolean;
  useModelBuiltinSearch?: boolean;

  /**
   * Auto suggestion configuration
   */
  autoSuggestion?: LobeAutoSuggestion;
}
/* eslint-enable */

export const AgentChatConfigSchema = z.object({
  autoCreateTopicThreshold: z.number().default(2),
  autoSuggestion: z
    .object({
      customPrompt: z.string().optional(),
      enabled: z.boolean().optional(),
      maxSuggestions: z.number().min(1).max(3).optional(),
    })
    .optional(),
  displayMode: z.enum(['chat', 'docs']).optional(),
  enableAutoCreateTopic: z.boolean().optional(),
  enableCompressHistory: z.boolean().optional(),
  enableHistoryCount: z.boolean().optional(),
  enableMaxTokens: z.boolean().optional(),
  enableReasoning: z.boolean().optional(),
  enableReasoningEffort: z.boolean().optional(),
  enableStreaming: z.boolean().optional(),
  historyCount: z.number().optional(),
  reasoningBudgetToken: z.number().optional(),
  searchFCModel: z
    .object({
      model: z.string(),
      provider: z.string(),
    })
    .optional(),
  searchMode: z.enum(['off', 'on', 'auto']).optional(),
  textVerbosity: z.enum(['low', 'medium', 'high']).optional(),
});
