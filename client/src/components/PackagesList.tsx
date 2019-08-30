import * as React from 'react';
import { userStore } from '../stores';
import { Flex } from '../components/layout';
import { Strava, Default } from './packages';

const packageComponents = {
  strava: Strava,
  default: Default
};

const PackagesList: React.FC<{}> = () => {
  const [packages, setPackages] = React.useState<string[]>([]);

  React.useEffect(() => {
    setPackages([]);
    userStore.authenticate().then(user => {
      if (user.data && user.data.packages) {
        setPackages(user.data.packages);
      }
    });
  }, []);

  if (!packages.length) {
    return null;
  }

  return (
    <Flex>
      {packages.map((item, index) => {
        const Component = packageComponents[item || 'default'];
        return <Component key={index} />;
      })}
    </Flex>
  );
};

export { PackagesList };
