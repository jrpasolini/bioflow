/**
 * BioFlow Post-Login Action v3 #2, AFTER 01-require-otp.js.
 * Grant the *private API* access-token claim only when Auth0 reports completed
 * authenticator OTP MFA. Enrollment alone is NOT sufficient authorization.
 *
 * Set Action secret BIOFLOW_CLIENT_ID to your Auth0 SPA application's Client ID.
 */
exports.onExecutePostLogin = async (event, api) => {
 if (event.client.client_id !== event.secrets.BIOFLOW_CLIENT_ID) return;
 const methods = event.authentication?.methods || [];
 const confirmedOtp = methods.some(m => m.name === 'mfa' && m.type === 'otp');
 if (confirmedOtp) {
  api.accessToken.setCustomClaim('https://jrpasolini.tech/bioflow/mfa', true);
 }
};
