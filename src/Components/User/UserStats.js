import React, { useEffect } from 'react';
import Head from '../Helpers/Head';
import useFetch from '../../Hooks/useFetch'
import { GET_STATS } from '../../api';
import Loading from '../Helpers/Loading'
import Error from '../Helpers/Error'
const UserStatsGraph = React.lazy(() => import('./UserStatsGraph'))


const UserStats = () => {
  const { data, error, loading, request } = useFetch();
  useEffect(() => {
    async function getData() {
      const { url, options } = GET_STATS();
      await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatísticas" />
        {data && data.length > 0 && <UserStatsGraph data={data} />}
      </React.Suspense>
    );
  else return null;
};

export default UserStats;