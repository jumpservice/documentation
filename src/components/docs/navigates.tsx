import Icon from './icons'

const NavSystemSettings = () => {
  return (
    <div>
      In the upper-right corner of any page in JumpServer, click <Icon name="settings"/>.
      <img src="/images/docs/admin-guides/system-settings/nav-settings.png" alt="image" width="350"/>
    </div>
  );
}

interface NavProps {
  name: "system-settings",
}

const navConfig = {
  'system-settings': <NavSystemSettings />,
}

const Nav: React.FC<NavProps> = ({ name }) => {
  return navConfig[name];
}

export default Nav;
