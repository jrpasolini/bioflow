/**
 * BioFlow Post-Login Action v3 #1: require real authenticator TOTP.
 * Enable Security > MFA > One-time Password and Customize MFA Factors using Actions.
 * Add this Action BEFORE 02-mfa-access-claim.js in the Post-Login flow.
 *
 * Set Action secret BIOFLOW_CLIENT_ID to your Auth0 SPA application's Client ID.
 * Never set secrets from the public Vite build.
 */
exports.onExecutePostLogin = async (event, api) => {
 if (event.client.client_id !== event.secrets.BIOFLOW_CLIENT_ID) return;
 const factors = event.user.enrolledFactors || [];
 if (factors.some(f => f.type === 'otp')) {
  api.authentication.challengeWith({type:'otp'});
 } else {
  // Auth0 displays the real QR setup and verifies the first six-digit code.
  api.authentication.enrollWith({type:'otp'});
 }
};
