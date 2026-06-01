/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { i18n } from '@kbn/i18n';
import { EuiFieldText, EuiFormRow, EuiSpacer } from '@elastic/eui';
import type { RuleTypeParamsExpressionProps } from '@kbn/triggers-actions-ui-plugin/public';
import type { HelloWorldRuleParams } from './types';

export const HelloWorldRuleTypeExpression: React.FunctionComponent<
  RuleTypeParamsExpressionProps<HelloWorldRuleParams>
> = ({ ruleParams, setRuleParams, errors }) => {
  const { id = '', message = '' } = ruleParams;
  const idErrors = (errors.id as string[]) ?? [];
  const messageErrors = (errors.message as string[]) ?? [];

  return (
    <>
      <EuiFormRow
        fullWidth
        label={i18n.translate('xpack.stackAlerts.helloWorld.ui.idLabel', {
          defaultMessage: 'ID',
        })}
        isInvalid={idErrors.length > 0 && id !== undefined}
        error={idErrors}
      >
        <EuiFieldText
          fullWidth
          data-test-subj="helloWorldIdInput"
          value={id}
          isInvalid={idErrors.length > 0 && id !== undefined}
          onChange={(e) => setRuleParams('id', e.target.value)}
        />
      </EuiFormRow>
      <EuiSpacer size="m" />
      <EuiFormRow
        fullWidth
        label={i18n.translate('xpack.stackAlerts.helloWorld.ui.messageLabel', {
          defaultMessage: 'Message',
        })}
        isInvalid={messageErrors.length > 0 && message !== undefined}
        error={messageErrors}
      >
        <EuiFieldText
          fullWidth
          data-test-subj="helloWorldMessageInput"
          value={message}
          isInvalid={messageErrors.length > 0 && message !== undefined}
          onChange={(e) => setRuleParams('message', e.target.value)}
        />
      </EuiFormRow>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export { HelloWorldRuleTypeExpression as default };
