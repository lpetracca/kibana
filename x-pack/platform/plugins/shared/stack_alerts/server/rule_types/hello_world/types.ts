/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type {
  RuleType,
  RuleTypeState,
  AlertInstanceState,
  AlertInstanceContext,
  RuleTypeParams,
} from '@kbn/alerting-plugin/server';
import type { StackAlertType } from '../types';

export interface HelloWorldRuleParams extends RuleTypeParams {
  id: string;
  message: string;
}

export type HelloWorldExtractedRuleParams = HelloWorldRuleParams;

export interface HelloWorldRuleState extends RuleTypeState {
  success: boolean;
}

export interface HelloWorldAlertInstanceState extends AlertInstanceState {
  id: string;
}

export interface HelloWorldAlertInstanceContext extends AlertInstanceContext {
  id: string;
}

export type HelloWorldRuleType = RuleType<
  HelloWorldRuleParams,
  HelloWorldExtractedRuleParams,
  HelloWorldRuleState,
  HelloWorldAlertInstanceState,
  HelloWorldAlertInstanceContext,
  string,
  string,
  StackAlertType
>;
