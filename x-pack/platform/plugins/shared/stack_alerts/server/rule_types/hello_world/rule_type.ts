/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import { DEFAULT_APP_CATEGORIES } from '@kbn/core/server';
import { STACK_ALERTS_FEATURE_ID } from '@kbn/rule-data-utils';
import { schema } from '@kbn/config-schema';
import type { HelloWorldRuleType } from './types';
import { STACK_ALERTS_AAD_CONFIG } from '../constants';
import { executor } from './executor';

export const HELLO_WORLD_ID = '.hello-world';
export const ACTION_GROUP_ID = 'threshold met';

export function getRuleType(): HelloWorldRuleType {
  const ruleTypeName = i18n.translate('xpack.stackAlerts.helloWorld.alertTypeTitle', {
    defaultMessage: 'Hello World alert',
  });

  const actionGroupName = i18n.translate(
    'xpack.stackAlerts.helloWorld.actionGroupHelloWorldMetTitle',
    {
      defaultMessage: 'Hello World met',
    }
  );

  return {
    id: HELLO_WORLD_ID,
    name: ruleTypeName,
    actionGroups: [{ id: 'test action group id', name: actionGroupName }],
    recoveryActionGroup: {
      id: 'test recovery id',
      name: i18n.translate('xpack.stackAlerts.helloWorld.notHelloWorldMet', {
        defaultMessage: 'No longer hello worlding',
      }),
    },
    doesSetRecoveryContext: true,
    defaultActionGroupId: ACTION_GROUP_ID,
    executor,
    category: DEFAULT_APP_CATEGORIES.management.id,
    producer: STACK_ALERTS_FEATURE_ID,
    solution: 'stack',
    validate: {
      params: schema.object({
        id: schema.string(),
        message: schema.string(),
      }),
    },
    minimumLicenseRequired: 'basic',
    isExportable: true,
    alerts: STACK_ALERTS_AAD_CONFIG,
  };
}
