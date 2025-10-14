import { QueueServiceImpl, createQueueServiceModule } from './impls';
import { HealthCheckResult, QueueMessage, QueueStats } from './types';

/**
 * Queue Service
 * Uses modular implementation approach to provide queue operation services
 */
export class QueueService {
  private impl: QueueServiceImpl;

  constructor() {
    this.impl = createQueueServiceModule();
  }

  /**
   * Schedule a message to the queue
   */
  async scheduleMessage(message: QueueMessage): Promise<string> {
    return this.impl.scheduleMessage(message);
  }

  /**
   * Schedule multiple messages to the queue
   */
  async scheduleBatchMessages(messages: QueueMessage[]): Promise<string[]> {
    return this.impl.scheduleBatchMessages(messages);
  }

  /**
   * Cancel scheduled task
   */
  async cancelScheduledTask(taskId: string): Promise<void> {
    return this.impl.cancelScheduledTask(taskId);
  }

  /**
   * Get queue statistics
   */
  async getQueueStats(): Promise<QueueStats> {
    return this.impl.getQueueStats();
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<HealthCheckResult> {
    return this.impl.healthCheck();
  }

  /**
   * Calculate delay time (dynamically adjusted based on different situations)
   */
  static calculateDelay(params: {
    hasErrors: boolean;
    hasToolCalls: boolean;
    priority: 'high' | 'normal' | 'low';
    stepIndex: number;
  }): number {
    const { stepIndex, hasErrors, hasToolCalls, priority } = params;

    let baseDelay = 1000; // 1 second base delay

    // Adjust based on priority
    switch (priority) {
      case 'high': {
        baseDelay = 200;
        break;
      }
      case 'low': {
        baseDelay = 5000;
        break;
      }
      default: {
        baseDelay = 1000;
      }
    }

    // If there are tool calls, delay a bit longer to wait for tool execution completion
    if (hasToolCalls) {
      baseDelay += 1000;
    }

    // If there are errors, delay longer to avoid consecutive failures
    if (hasErrors) {
      baseDelay += Math.min(stepIndex * 1000, 10_000); // Exponential backoff, max 10 seconds
    }

    return baseDelay;
  }
}
