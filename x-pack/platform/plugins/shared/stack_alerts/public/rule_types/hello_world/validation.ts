/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import type { ValidationResult } from '@kbn/triggers-actions-ui-plugin/public';
import type { HelloWorldRuleParams } from './types';

export const validateExpression = (ruleParams: HelloWorldRuleParams): ValidationResult => {
  const { id, message } = ruleParams;
  const errors = {
    id: new Array<string>(),
    message: new Array<string>(),
  };
  const validationResult = { errors };

  if (!id) {
    errors.id.push(
      i18n.translate('xpack.stackAlerts.helloWorld.ui.validation.error.requiredIdText', {
        defaultMessage: 'ID is required.',
      })
    );
  }
  if (!message) {
    errors.message.push(
      i18n.translate('xpack.stackAlerts.helloWorld.ui.validation.error.requiredMessageText', {
        defaultMessage: 'Message is required.',
      })
    );
  }
  return validationResult;
};
