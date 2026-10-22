/** UI expiration hint only; the Worker independently verifies the HMAC. */
export function demoSessionExpiry(token:string,now=Date.now()):number|null{
 const match=/^[0-9a-f-]{36}\.(\d{13})\.[0-9a-f]{64}$/.exec(token);
 if(!match)return null;
 const expires=Number(match[1]);
 return expires>now&&expires<=now+3600000?expires:null;
}
