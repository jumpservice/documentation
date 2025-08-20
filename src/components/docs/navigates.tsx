import Icon from './icons'

const NavConsole = () => {
  return (
    <div>
      <p>At the top-left of the page, select <Icon name="Switch" />, then click <Icon name="Console" /> <b>Console</b>.</p>
      <img src="/images/docs/navs/nav-console.png" alt="image" width="300"/>
    </div>
  );
}

const NavPAM = () => {
  return (
    <div>
      <p>At the top-left of the page, select <Icon name="Switch" />, then click <Icon name="pam" /> <b>PAM</b>.</p>
      <img src="/images/docs/navs/nav-pam.png" alt="image" width="300"/>
    </div>
  );
}

const NavAudits = () => {
  return (
    <div>
      <p>At the top-left of the page, select <Icon name="switch" />, then click <Icon name="audit" /> <b>Audits</b>.</p>
      <img src="/images/docs/navs/nav-audits.png" alt="image" width="300"/>
    </div>
  );
}

const NavWebTerminal = () => {
  return (
    <div>
      <p>In the right area of the top navigation bar, click <Icon name="square-terminal"/>.</p>
      <img src="/images/docs/navs/nav-web-terminal.png" alt="image" width="350"/>
    </div>
  )

}

const NavSystemSettings = () => {
  return (
    <div>
      <p>In the right area of the top navigation bar, click <Icon name="settings"/>.</p>
      <img src="/images/docs/navs/nav-settings.png" alt="image" width="350"/>
    </div>
  );
}

const ChangeOrg = () => {
  return (
    <div>
      <p>In the left area of the top navigation bar, click the organization dropdown and switch to the target organization.</p>
      <img src="/images/docs/navs/switch-org.png" alt="image" width="350"/>
    </div>
  )
}

interface NavProps {
  name: "system-settings" | "console";
}

const navConfig = {
  'console': <NavConsole />,
  'pam': <NavPAM />,
  'audits': <NavAudits />,
  "web-terminal": <NavWebTerminal />,
  'system-settings': <NavSystemSettings />,
  'change-org': <ChangeOrg />,
}

const Nav: React.FC<NavProps> = ({ name }) => {
  return navConfig[name];
}

export default Nav;
