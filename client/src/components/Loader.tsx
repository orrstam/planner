import * as React from 'react';

interface ILoaderProps {
  error?: boolean;
  pastDelay?: boolean;
  timedOut?: boolean;
}

const Loading: React.StatelessComponent<ILoaderProps> = (props) => {
  if (props.error) {
    console.log('Error');
    return <div>Loading...</div>
  } else {
    console.log('loading');
    return <div>Loading...</div>
  }
};

export default Loading;