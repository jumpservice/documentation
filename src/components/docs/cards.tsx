import Icon from './icons';

// Cards 组件
const Cards = ({ children }) => {
  return (
    <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
};

// Card 组件
const Card = ({ title, icon, href, xpack = false }) => {
  return (
    <a href={href} className="relative block bg-white border  border-gray-400 rounded-lg overflow-hidden p-4 hover:border-primary transition dark:text-white dark:bg-neutral-900 hover:text-primary dark:hover:text-primary">

      <div className="flex items-center space-x-4">
        {icon && <div>{icon}</div> }
        <h4 className="text-base font-bold">{title}</h4>
      </div>

      {xpack && (
        <div className="absolute top-1 right-2">
          <Icon name="xpackTip" />
        </div>
      )}

    </a>
  );
};

export { Cards, Card };