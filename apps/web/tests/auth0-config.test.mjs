import test from 'node:test';
import assert from 'node:assert/strict';
import {testModule} from '../../../scripts/test-module.mjs';
const {parseAuth0Config}=await testModule(new URL('../src/auth0-config.ts',import.meta.url),'auth0-config');

test('Auth0 is opt-in and fails closed when any field is missing',()=>{
 assert.equal(parseAuth0Config({}),null);
 assert.equal(parseAuth0Config({VITE_AUTH0_DOMAIN:'mytenant.auth0.com',VITE_AUTH0_CLIENT_ID:'client'}),null);
 assert.equal(parseAuth0Config({VITE_AUTH0_DOMAIN:'mytenant.auth0.com',VITE_AUTH0_AUDIENCE:'https://bioflow.example/api'}),null);
 assert.equal(parseAuth0Config({VITE_AUTH0_DOMAIN:'evil.com/path',VITE_AUTH0_CLIENT_ID:'client',VITE_AUTH0_AUDIENCE:'https://bioflow.example/api'}),null);
});

test('Valid public Auth0 application metadata enables PKCE SPA login',()=>{
 assert.deepEqual(parseAuth0Config({
  VITE_AUTH0_DOMAIN:'https://demo.eu.auth0.com/',
  VITE_AUTH0_CLIENT_ID:'abc123',
  VITE_AUTH0_AUDIENCE:'https://bioflow.example/api'
 }),{domain:'demo.eu.auth0.com',clientId:'abc123',audience:'https://bioflow.example/api'});
});
