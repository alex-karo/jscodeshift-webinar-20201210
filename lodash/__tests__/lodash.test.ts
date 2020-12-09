import { defineTest } from 'jscodeshift/dist/testUtils';

jest.autoMockOff();

defineTest(__dirname, 'transform', null, 'lodash1', {parser: 'ts'});
defineTest(__dirname, 'transform', null, 'lodash2', {parser: 'ts'});
defineTest(__dirname, 'transform', null, 'lodash3', {parser: 'ts'});
