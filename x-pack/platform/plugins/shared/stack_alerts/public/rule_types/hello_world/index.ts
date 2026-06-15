/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { lazy } from 'react';
import { i18n } from '@kbn/i18n';
import type { RuleTypeModel } from '@kbn/triggers-actions-ui-plugin/public';
import { validateExpression } from './validation';
import type { HelloWorldRuleParams } from './types';

const HELLO_WORLD_RULE_ID = '.hello-world';

export function getRuleType(): RuleTypeModel<HelloWorldRuleParams> {
  return {
    id: HELLO_WORLD_RULE_ID,
    description: i18n.translate('xpack.stackAlerts.helloWorld.ui.alertType.descriptionText', {
      defaultMessage: 'A minimal Hello World rule for demos and learning.',
    }),
    iconClass: 'alert',
    documentationUrl: null,
    ruleParamsExpression: lazy(() => import('./expression')),
    validate: validateExpression,
    defaultActionMessage: i18n.translate(
      'xpack.stackAlerts.helloWorld.ui.alertType.defaultActionMessage',
      {
        defaultMessage: 'Hello World rule fired',
      }
    ),
    requiresAppContext: false,
  };
}
