/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import type { SavedObjectReference } from '@kbn/core/server';
import { DEFAULT_APP_CATEGORIES } from '@kbn/core/server';
import { STACK_ALERTS_FEATURE_ID } from '@kbn/rule-data-utils';
import { randomUUID } from 'node:crypto';
import { schema } from '@kbn/config-schema';
import type {
  HelloWorldExtractedRuleParams,
  HelloWorldRuleParams,
  HelloWorldRuleType,
} from './types';
import { STACK_ALERTS_AAD_CONFIG } from '../constants';
import { executor } from './executor';

export function extractEntityAndBoundaryReferences(params: HelloWorldRuleParams): {
  params: HelloWorldExtractedRuleParams;
  references: SavedObjectReference[];
} {
  return {
    params,
    references: [],
  };
}

export function getRuleType(): HelloWorldRuleType {
  const alertTypeName = i18n.translate('xpack.stackAlerts.helloWorld.alertTypeTitle', {
    defaultMessage: 'Hello World alert',
  });

  const actionGroupName = i18n.translate(
    'xpack.stackAlerts.helloWorld.actionGroupHelloWorldMetTitle',
    {
      defaultMessage: 'Hello World met',
    }
  );

  return {
    id: randomUUID(),
    name: alertTypeName,
    actionGroups: [{ id: 'test action group id', name: actionGroupName }],
    recoveryActionGroup: {
      id: 'test recovery id',
      name: i18n.translate('xpack.stackAlerts.helloWorld.notHelloWorldMet', {
        defaultMessage: 'No longer hello worlding',
      }),
    },
    doesSetRecoveryContext: true,
    defaultActionGroupId: 'test action group id',
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
    minimumLicenseRequired: 'gold',
    isExportable: true,
    alerts: STACK_ALERTS_AAD_CONFIG,
  };
}
