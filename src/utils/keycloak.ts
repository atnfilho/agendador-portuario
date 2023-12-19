import Keycloak from "keycloak-js";

let initOptions = {
  url: "https://vpn.speedsistemas.com.br:9999/",
  realm: "ipms-dev",
  clientId: "portal-web"
}

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: window.location.origin,
  checkLoginIframe: true,
  pkceMethod: 'S256'
})


export default kc;