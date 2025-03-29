// useQuery.ts
import { useState, useEffect } from 'react';

type QueryResult<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  { loading: boolean },
  () => Promise<void>,
];

const useQuery = <T>(fetchData: () => Promise<T>): QueryResult<T> => {
  const [state, setState] = useState<T>([] as T);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load data
    fetchData().then((data: T) => {
      setState(data);
      setLoading(false);
    });
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchData();
      setState(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return [state, setState, { loading }, loadData];
};
export default useQuery;
