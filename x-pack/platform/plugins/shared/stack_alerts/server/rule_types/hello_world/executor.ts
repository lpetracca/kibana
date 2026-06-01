/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { StackAlertType } from '../types';
import type { RuleExecutorOptions } from '../../types';
import type {
  HelloWorldAlertInstanceContext,
  HelloWorldAlertInstanceState,
  HelloWorldRuleParams,
  HelloWorldRuleState,
} from './types';

export async function executor({
  rule,
  logger,
}: RuleExecutorOptions<
  HelloWorldRuleParams,
  HelloWorldRuleState,
  HelloWorldAlertInstanceState,
  HelloWorldAlertInstanceContext,
  string,
  StackAlertType
>): Promise<{ state: HelloWorldRuleState }> {
  console.log(`Configured hello world alert ${rule.id}`);
  logger.info(`Configured hello world alert ${rule.id}`);
  return {
    state: {
      success: true,
    },
  };
}
