import * as React from 'react';

interface ILoaderProps {
  error?: boolean;
  pastDelay?: boolean;
  timedOut?: boolean;
}

const Loading: React.StatelessComponent<ILoaderProps> = (props) => {
  if (props.pastDelay) {
    console.log('past deleay');
    return(
      <div>Loading...</div>
    )
  } else {
    console.log(props);
    return(<h1>It has working</h1>);
  }
};

export default Loading;