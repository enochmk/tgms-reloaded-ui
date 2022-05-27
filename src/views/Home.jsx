import { useContext } from 'react';
import Header from '../components/Headers/Header';
import Fileupload from '../components/Cards/Fileupload';
import { DrawContext } from '../context/DrawContext';

function Home() {
  const drawContext = useContext(DrawContext);

  return (
    <>
      <Header count={drawContext.count} isLoading={drawContext.isLoading} />
      <Fileupload
        setIsLoading={drawContext.setIsLoading}
        updateStatistics={drawContext.updateStatistics}
      />
    </>
  );
}

export default Home;
