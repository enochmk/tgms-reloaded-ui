import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import fetchStatistics from '../services/fetchStatistics';
import Header from '../components/Headers/Header';
import Fileupload from '../components/Cards/Fileupload';
import { DrawContext } from '../contexts/DrawContext';
import BackgroundWallpaper from '../assets/img/wallpapers/Home.png';

const wallpaperStyle = {
  backgroundImage: 'url(' + BackgroundWallpaper + ')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100%',
  width: '100%',
};

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
    <div style={{ ...wallpaperStyle }}>
      <div className="container-fluid " style={{ paddingTop: '15%' }}>
        {/* <Header count={drawContext.count} isLoading={drawContext.isLoading} /> */}
        <Fileupload
          setIsLoading={drawContext.setIsLoading}
          setStatistics={drawContext.setStatistics}
        />
      </div>
    </div>
  );
}

export default Home;
