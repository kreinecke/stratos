package auth

import (
	"github.com/cloudfoundry-incubator/stratos/src/jetstream/repository/interfaces"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

const AuthConnectTypeKubeToken = "k8sToken"

// KubeTokenAuth uses a token (e.g. service account token)
type KubeTokenAuth struct {
	portalProxy interfaces.PortalProxy
}

// InitKubeTokenAuth
func InitKubeTokenAuth(portalProxy interfaces.PortalProxy) KubeAuthProvider {
	return &KubeTokenAuth{portalProxy}
}

func (c *KubeTokenAuth) GetName() string {
	return AuthConnectTypeKubeToken
}

func (c *KubeTokenAuth) AddAuthInfo(info *clientcmdapi.AuthInfo, tokenRec interfaces.TokenRecord) error {
	log.Debug("AddAuthInfo: KubeTokenAuth")
	// Just add the token in
	info.Token = tokenRec.AuthToken
	return nil
}

func (c *KubeTokenAuth) FetchToken(cnsiRecord interfaces.CNSIRecord, ec echo.Context) (*interfaces.TokenRecord, *interfaces.CNSIRecord, error) {
	log.Debug("FetchToken (KubeTokenAuth)")

	token := ec.FormValue("token")

	tokenRecord := NewKubeTokenAuthTokenRecord(c.portalProxy, token)
	return tokenRecord, &cnsiRecord, nil
}

func NewKubeTokenAuthTokenRecord(portalProxy interfaces.PortalProxy, token string) *interfaces.TokenRecord {
	tokenRecord := portalProxy.InitEndpointTokenRecord(getLargeExpiryTime(), token, "__NONE__", false)
	tokenRecord.AuthType = AuthConnectTypeKubeToken

	return &tokenRecord
}

func (c *KubeTokenAuth) RegisterJetstreamAuthType(portal interfaces.PortalProxy) {
	// Register auth type with Jetstream
	c.portalProxy.AddAuthProvider(c.GetName(), interfaces.AuthProvider{
		Handler:  c.portalProxy.DoOidcFlowRequest,
		UserInfo: nil,
	})
}
