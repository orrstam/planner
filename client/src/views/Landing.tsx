import * as React from 'react';
import api from '../services/api';

export default class Landing extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: ''
    }
  }
  public componentDidMount(): void {
    this.fetch();
  }

  public async fetch(): Promise<any> {
    try {
      const data = await api.get('/');
      this.setState({data: data.data});
    } catch(error) {
      // tslint:disable-next-line:no-console
      console.log(error);
    }
  }

  public render() {
    return (
      <div>{ this.state.data.message }</div>
    )
  }
}
