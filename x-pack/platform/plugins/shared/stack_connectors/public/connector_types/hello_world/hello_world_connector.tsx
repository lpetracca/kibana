/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

// hello_world_connector.tsx
import React from 'react';
import { UseField } from '@kbn/es-ui-shared-plugin/static/forms/hook_form_lib';
import { Field } from '@kbn/es-ui-shared-plugin/static/forms/components';
import { fieldValidators } from '@kbn/es-ui-shared-plugin/static/forms/helpers';
import type { ActionConnectorFieldsProps } from '@kbn/triggers-actions-ui-plugin/public';

const HelloWorldConnectorFields: React.FunctionComponent<ActionConnectorFieldsProps> = ({
  readOnly,
}) => (
  <UseField
    path="config.id"
    config={{
      label: 'ID',
      validations: [{ validator: fieldValidators.emptyField('ID is required') }],
    }}
    component={Field}
    componentProps={{
      euiFieldProps: { readOnly, fullWidth: true, 'data-test-subj': 'helloWorldIdInput' },
    }}
  />
);

// eslint-disable-next-line import/no-default-export
export { HelloWorldConnectorFields as default };
