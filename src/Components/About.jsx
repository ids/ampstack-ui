import Image from 'react-bootstrap/Image';
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import './About.css';

import ABOUT_MARKDOWN from './About.md?raw';

export default function About() {
  
  return (
    <div className="About">
        <h1>The Amp<span className="logo-stack">Stack</span></h1>
        <p className="About-subtitle">A completely serverless web application platform</p>
        <Image className="About-diagram" src="/AmpStack-AmpStackAlt.svg" fluid rounded="true"/>
        <Markdown rehypePlugins={[rehypeRaw]} className="About-message">{ABOUT_MARKDOWN}</Markdown>
    </div>
  );
}