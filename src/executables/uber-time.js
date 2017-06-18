#!/usr/bin/env node

/* eslint-disable no-console */

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

const service = new CommandExecutionService();

program.parse(process.argv);

const address = program.address.trim();

try {
  if (!address.length) {
    throw new TypeError('Address is required');
  }

  service.executeTimeEstimates(address)
    .then(table => console.log(table))
    .catch((e) => {
      console.log('Could not get time estimates:\n', e);
    });
} catch (e) {
  console.error('Could not get time estimates:\n', e);
}
