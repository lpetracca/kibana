/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { lazy } from 'react';
import { i18n } from '@kbn/i18n';
import type {
  ActionTypeModel as ConnectorTypeModel,
  GenericValidationResult,
} from '@kbn/triggers-actions-ui-plugin/public/types';
import { CONNECTOR_ID } from '@kbn/connector-schemas/hello_world/constants';
import type { Config } from '@kbn/connector-schemas/hello_world';
import type { HelloWorldActionParams } from '../types';

export function getConnectorType(): ConnectorTypeModel<Config, unknown, HelloWorldActionParams> {
  return {
    id: CONNECTOR_ID,
    iconClass: 'logsApp',
    selectMessage: i18n.translate('xpack.stackConnectors.components.helloWorld.selectMessageText', {
      defaultMessage: 'Add a message to a Kibana log.',
    }),
    actionTypeTitle: i18n.translate(
      'xpack.stackConnectors.components.helloWorld.connectorTypeTitle',
      {
        defaultMessage: 'Send to Hello World',
      }
    ),
    validateParams: (
      actionParams: HelloWorldActionParams
    ): Promise<GenericValidationResult<Pick<HelloWorldActionParams, 'message'>>> => {
      const errors = {
        message: new Array<string>(),
      };
      const validationResult = { errors };
      if (!actionParams.message?.length) {
        errors.message.push(
          i18n.translate(
            'xpack.stackConnectors.components.helloWorld.error.requiredHelloWorldMessageText',
            {
              defaultMessage: 'Message is required.',
            }
          )
        );
      }
      return Promise.resolve(validationResult);
    },
    actionConnectorFields: lazy(() => import('./hello_world_connector')),
    actionParamsFields: lazy(() => import('./hello_world_params')),
  };
}
