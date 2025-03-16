import Icon from './icons'

const NavSystemSettings = () => {
  return (
    <div>
      In the upper-right corner of any page in JumpServer, click <Icon name="settings"/>.
      <img src="/images/docs/navs/nav-settings.png" alt="image" width="350"/>
    </div>
  );
}

const NavConsole = () => {
  return (
    <div>
      On the left side of the page, hover over the <Icon name="switch" /> , and click <b>Console</b>.
      <img src="/images/docs/navs/nav-console.png" alt="image" width="300"/>
    </div>
  );

}
interface NavProps {
  name: "system-settings" | "console";
}

const navConfig = {
  'system-settings': <NavSystemSettings />,
  'console': <NavConsole />,
}

const Nav: React.FC<NavProps> = ({ name }) => {
  return navConfig[name];
}

export default Nav;
