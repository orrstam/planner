import * as React from 'react';
import { LoadingComponentProps } from 'react-loadable';

export default class Loading extends React.PureComponent<
  LoadingComponentProps
> {
  public render() {
    if (this.props.error) {
      console.log('Error');
      return <div>Loading...</div>;
    } else {
      console.log('loading');
      return <div>Loading...</div>;
    }
  }
}
