/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';

import type { Logger, LogMeta } from '@kbn/core/server';
import type {
  ClassicActionType as ConnectorType,
  ActionTypeExecutorOptions as ConnectorTypeExecutorOptions,
  ActionTypeExecutorResult as ConnectorTypeExecutorResult,
} from '@kbn/actions-plugin/server/types';
import { AlertingConnectorFeatureId } from '@kbn/actions-plugin/common';
import {
  CONNECTOR_NAME,
  CONNECTOR_ID,
  ConfigSchema,
  SecretsSchema,
  ParamsSchema,
} from '@kbn/connector-schemas/hello_world';
import type { Config, Secrets, ActionParamsType } from '@kbn/connector-schemas/hello_world';

export type HelloWorldConnectorType = ConnectorType<Config, Secrets, ActionParamsType>;
export type HelloWorldConnectorTypeExecutorOptions = ConnectorTypeExecutorOptions<
  Config,
  Secrets,
  ActionParamsType
>;

export function getConnectorType(): HelloWorldConnectorType {
  return {
    id: CONNECTOR_ID,
    minimumLicenseRequired: 'gold',
    name: CONNECTOR_NAME,
    supportedFeatureIds: [AlertingConnectorFeatureId],
    validate: {
      config: { schema: ConfigSchema },
      secrets: { schema: SecretsSchema },
      params: {
        schema: ParamsSchema,
      },
    },
    executor,
  };
}

async function executor(
  execOptions: HelloWorldConnectorTypeExecutorOptions
): Promise<ConnectorTypeExecutorResult<void>> {
  const { actionId, params, logger } = execOptions;
  logger.info(`executing ${CONNECTOR_ID} with params: ${JSON.stringify(params)}`);
  try {
    (logger[params.level] as Logger['info'])<LogMeta>(`Hello world log: ${params.message}`);
  } catch (err) {
    const message = i18n.translate('xpack.stackConnectors.helloWorld.errorLoggingErrorMessage', {
      defaultMessage: 'error logging message',
    });
    return {
      status: 'error',
      message,
      serviceMessage: err.message,
      actionId,
    };
  }

  return { status: 'ok', actionId };
}
