import { useContext, useEffect } from 'react';
import fetchStatistics from '../services/fetchStatistics';
import Header from '../components/Headers/Header';
import Fileupload from '../components/Cards/Fileupload';
import { DrawContext } from '../contexts/DrawContext';
import { toast } from 'react-toastify';

function Home() {
  const drawContext = useContext(DrawContext);

  useEffect(() => {
    fetchStatistics()
      .then((data) => {
        drawContext.setStatistics(data);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  return (
    <>
      <Header count={drawContext.count} isLoading={drawContext.isLoading} />
      <Fileupload
        setIsLoading={drawContext.setIsLoading}
        setStatistics={drawContext.setStatistics}
      />
    </>
  );
}

export default Home;
