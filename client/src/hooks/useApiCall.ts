import * as React from 'react';
import api from '../services/api';
import axios from 'axios';

export function useApiCall(url: string, data: any, dep: any) {
  const [response, setResponse] = React.useState();

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    async function fetch() {
      try {
        data.cancelToken = source.token
        const result = await api.get(url, data);

        if (result.status === 200 && result.data) {
          setResponse(result.data);
        }
      } catch (error) {
        //
      }
    }

    if (dep) {
      fetch();
    }

    return () => {
      source.cancel();
    };
  }, [dep]);

  return response;
}
