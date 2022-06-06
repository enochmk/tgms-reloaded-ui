import { useState, useContext } from 'react';
import { Container } from 'reactstrap';

import { DrawContext } from '../contexts/DrawContext';
import DrawForm from '../components/Cards/DrawForm';
import DrawWinners from '../components/Cards/DrawWinners';
import Header from '../components/Headers/Header';
import BackgroundWallpaper from '../assets/img/wallpapers/Draw.png';

const wallpaperStyle = {
  backgroundImage: 'url(' + BackgroundWallpaper + ')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100%',
  width: '100%',
};

function Draw() {
  const drawContext = useContext(DrawContext);
  const [isLoading, setIsLoading] = useState(false);
  const [drawWinners, setDrawWinners] = useState([]);

  return (
    <div style={{ ...wallpaperStyle, marginTop: '5%' }}>
      {/* <Header count={drawContext.count} isLoading={drawContext.isLoading} /> */}
      <Container fluid className="justify-content-center">
        <div className="mt-4 p-5 rounded text-center">
          <div className="row justify-content-center">
            <div className="col-9">
              <DrawWinners drawWinners={drawWinners} isLoading={isLoading} />
            </div>
            <div className="col-3">
              <DrawForm
                drawWinners={drawWinners}
                setDrawWinners={setDrawWinners}
                setIsLoading={setIsLoading}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Draw;
