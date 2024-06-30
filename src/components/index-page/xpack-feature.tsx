import { ReactElement } from 'react';
import { Anchor, Image } from '@theguild/components';
import { Tooltip } from './tooltip';
import { Description }  from './description';
import { Heading } from './heading';
import jsIcon from '/public/favicon.svg';

<Image src={jsIcon} alt={'illustration'} placeholder="empty" />

const PRODUCTS: Array<{
  name: string;
  title: string;
  href: string;
  logo: (props: {
    className?: string;
  }) => ReactElement;
}> = [
  {
    name: 'JS',
    title: 'JS Logo',
    href: '/#',
    // logo: ({ className = '' }) => <div className={className}>LogoA</div>, // Placeholder for actual logo component
    logo: ({ className = '' }) => <Image className={className} src={jsIcon} alt={'illustration'} placeholder="empty" />,
  },
];


export const XPACKFeature= ({ className }: { className?: string }): ReactElement => {
  return (
    <Tooltip.Provider>
      <div id="platform" className={className}>
        <div className="container flex flex-col items-center px-4 pb-28 pt-20 text-center sm:px-6 md:px-8">
          <Heading>Enhanced X-Pack Package</Heading>
          <Description className="max-w-[400px] md:max-w-[700px]">
            Compared to the Community Edition, JumpServer Enterprise Edition offers X-Pack enhancement packages and enterprise support services
          </Description>

          <div className="mt-10 flex max-w-[900px] flex-wrap justify-center">
            {Object.values(PRODUCTS).map(product => (
              <Tooltip key={product.name} content={product.title}>
                <Anchor
                  style={{ width: 135 }}
                  className="
                  flex
                  flex-shrink-0
                  flex-col
                  gap-2
                  rounded
                  border
                  border-solid
                  border-transparent
                  py-3
                  contrast-0
                  grayscale
                  transition-all
                  duration-200
                  ease-linear
                  hover:text-gray-600
                  hover:filter-none
                  dark:hover:border-gray-800
                  dark:hover:text-white
                "
                  href={product.href}
                  onClick={(e) => e.preventDefault()} // 添加此行来阻止默认的点击事件
                >
                  <product.logo className="h-16 w-auto" />
                  <h4 className="text-xs font-medium">{product.name}</h4>
                </Anchor>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
};
