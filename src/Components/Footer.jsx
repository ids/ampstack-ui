import './Footer.scss';
import Image from 'react-bootstrap/Image';

export default function Footer() {
  
  return (
    <div className="Footer">
      <div className="Footer-supertitle">Designed by:</div>
      <Image className="Footer-idstudios" src="/AmpStack-IDStudios.drawio.svg" />
    </div>
  );
}