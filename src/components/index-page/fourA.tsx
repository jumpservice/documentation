import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import { Anchor, Image } from '@theguild/components';
import { Description }  from './description';
import { Heading } from './heading';
import consulting from '/public/favicon.svg';
import engineering from '/public/favicon.svg';
import openSource from '/public/favicon.svg';
import training from '/public/favicon.svg';

export const FourA = (): ReactElement => {
  return (
    <>
      <div className="flex flex-col items-center px-4 pt-28 text-center sm:px-6 md:px-8">
        <Heading>Seamless integration of 4A functionality</Heading>
        <Description className="max-w-[700px] px-2 md:px-0">
          Integrating 4A ensures secure access, regulatory compliance, operational efficiency, proactive monitoring, and clear accountability
        </Description>
      </div>
      <div className="container mt-[117px] flex flex-wrap justify-center gap-4">
        {SERVICES.map(service => (
          <Anchor
            key={service.name}
            href={service.url}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            title={service.name}
            className="
              flex
              w-full
              flex-col
              items-center
              justify-between
              overflow-hidden
              rounded-t-2xl
              border-2
              border-solid
              border-transparent
              bg-gray-100
              text-center
              duration-200
              hover:border-gray-200
              hover:[box-shadow:0_-6px_34px_rgba(117,117,117,0.15)]
              sm:w-1/2
              md:w-1/3 lg:w-1/5 dark:bg-[#24272E4C] dark:hover:border-[#24272E]
            "
          >
            <div className="flex-1">
              <Image src={service.icon} alt={`${service.name} illustration`} placeholder="empty" />
              <Heading size="md">{service.name}</Heading>
              <Description className="line-clamp-3 px-4 text-xs !leading-[18px]">
                {service.description}
              </Description>
            </div>
          </Anchor>
        ))}
      </div>
    </>
  );
};

export const SERVICES: {
  name: string;
  description: string;
  longDescription: string;
  list?: string[];
  icon: StaticImageData;
  url: `/${string}`;
}[] = [
  {
    name: 'Authentication',
    description: 'Verifies the identity of users.',
    longDescription: "Authentication is the process of verifying the identity of a user or system. It ensures that the entity attempting to access a resource is who or what it claims to be. Common methods include passwords, biometrics, and multi-factor authentication.",
    icon: consulting,
    url: '/#',
    list: [
      'Current state assessment',
      'Architectural review',
      'Future-proof development plan',
      'Focus on Developer Experience',
      'Tooling',
    ],
  },
  {
    name: 'Authorization',
    description: 'Determines user permissions and access levels.',
    icon: training,
    url: '/#',
    longDescription: "Authorization determines what an authenticated user is allowed to do. It sets the permissions and access levels for various resources within a system, ensuring that users can only access the data and functions that they are permitted to.",
  },
  {
    name: 'Accounting',
    description: 'Logs user activities and resource usage.',
    icon: engineering,
    url: '/#',
    longDescription: "Accounting  involves monitoring and recording the activities of users who access the system. This includes logging details such as login times, commands executed, files accessed, and duration of sessions. These records are essential for tracking user behavior, ensuring compliance with security policies, and providing data for auditing and forensic analysis.",
    list: ['Integral part of your team', 'Coding practical tasks', 'Code reviews', 'Mentorship'],
  },
  {
    name: 'Auditing',
    description: 'Reviews and analyzes logs to ensure compliance and detect anomalies.',
    icon: openSource,
    url: '/#',
    longDescription: "Auditing involves systematically reviewing and analyzing the recorded logs of user activities and system events. This process ensures that all actions are in compliance with security policies and regulatory requirements. It helps in identifying any unauthorized access or suspicious activities, providing a basis for investigating security incidents and ensuring the overall integrity and security of the system.",
    list: ['Technical support', 'Covers the entire stack', 'Part of decision making process'],
  },
];
