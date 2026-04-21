import React from 'react';
import { views } from '@apache-superset/core';
import HelloWorldPanel from './HelloWorldPanel';

views.registerView(
  { id: 'my-org.hello-world.main', name: 'Hello World' },
  'sqllab.panels',
  () => <HelloWorldPanel />,
);