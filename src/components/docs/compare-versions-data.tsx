export const OtherFeatures = [
  { feature: 'Email Notifications' },
  { feature: 'SMS Notifications', ce: false },
  { feature: 'Ticketing System', ce: false },
  { feature: 'Customizable UI Themes', ce: false },
]

export const ResourceManagement = [
  { feature: 'User Management' },
  { feature: 'Role Management', ce: false },
  { feature: 'Group Management' },
  { feature: 'Asset Management' },
  { feature: 'Cloud Asset Synchronization (AWS, GCP, etc.)', ce: false },
  { feature: 'Zone Management' },
  { feature: 'Tag Management' },
  { feature: 'Authorization Management' },
  { feature: 'RemoteApp Management (Windows)' },
  { feature: 'VirtualApp Management (Linux)', ce: false },
  { feature: 'Organizational Management', ce: false },
]

export const AssetType = [
  { feature: 'Unix' },
  { feature: 'Linux' },
  { feature: 'Windows' },
  { feature: 'Network Devices' },
  { feature: 'MariaDB' },
  { feature: 'MySQL' },
  { feature: 'MongoDB' },
  { feature: 'PostgreSQL' },
  { feature: 'Redis' },
  { feature: 'ClickHouse', ce: false },
  { feature: 'Dameng', ce: false },
  { feature: 'Oracle', ce: false },
  { feature: 'SQL Server', ce: false },
  { feature: 'Kubernetes Clusters' },
  { feature: 'Websites' },
  { feature: 'Basic Remote Applications' },
  { feature: 'Advanced Remote Applications', ce: false },
]

export const UserAuthentication = [
  { feature: 'LDAP' },
  { feature: 'LDAP HA (High-Availability)', ce: false },
  { feature: 'CAS' },
  { feature: 'Passkey' },
  { feature: 'OIDC (OpenID Connect)', ce: false },
  { feature: 'SAML2 (Security Assertion Markup Language 2.0)', ce: false },
  { feature: 'OAuth2 (Open Authorization 2.0)', ce: false },
  { feature: 'WeCom (WeChat Work)', ce: false },
  { feature: 'DingTalk', ce: false },
  { feature: 'FeiShu', ce: false },
  { feature: 'Lark', ce: false },
  { feature: 'Slack', ce: false },
  { feature: 'RADIUS (Remote Authentication Dial-In User Service)', ce: false },
]

export const AssetConnectionMethod = [
  { feature: 'Web-Based SSH Terminal' },
  { feature: 'Web-Based Database Access' },
  { feature: 'Web-Based RDP Access' },
  { feature: 'Web-Based VNC Access' },
  { feature: 'Web-Based Kubernetes Access' },
  { feature: 'Web-Based SFTP File Transfer' },
  { feature: 'Web-Based RemoteApp Access' },
  { feature: 'Web-Based VirtualApp Access', ce: false },

  { feature: 'Desktop SSH Client Access' },
  { feature: 'Desktop SFTP Client Access' },
  { feature: 'Desktop Database Client Access', ce: false },
  { feature: 'Desktop RDP Client Access', ce: false },
  { feature: 'Desktop VNC Client Access', ce: false },
  { feature: 'Desktop RemoteApp Access', ce: false },
  { feature: 'Desktop VirtualApp Access', ce: false },
]

export const ACLsManagement = [
  { feature: 'User Login Control' },
  { feature: 'Command Filtering' },
  { feature: 'Asset Connection Control', ce: false },
  { feature: 'Asset Connection Methods Control', ce: false },
]

export const AccountManagement = [
  { feature: 'Account Templates' },
  { feature: 'Account Discovery' },
  { feature: 'Account Secret Change' },
  { feature: 'Account Backup' },
  { feature: 'Account Storage (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault)', ce: false },
  { feature: 'Account Risk Detection', ce: false },
  { feature: 'Application Integration' },
]

export const AuditManagement = [
  { feature: 'Asset Session Monitoring' },
  { feature: 'Session Command Auditing' },
  { feature: 'File Transfer Tracking' },
  { feature: 'User Online Device Monitoring' },
  { feature: 'User Login Audit Logs' },
  { feature: 'User Password Change Logs' },
  { feature: 'User Operation Logs' },
]