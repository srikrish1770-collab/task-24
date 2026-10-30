import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {motion, useReducedMotion, useScroll, useTransform} from 'framer-motion';
import {cars} from '../data/cars';
import './StorySection.css';

const ease = [0.22, 1, 0.36, 1];
const entrance = {
  hidden: {opacity: 0, y: 16},
  visible: {opacity: 1, y: 0, transition: {duration: 0.65, ease}},
};
const textSequence = {
  hidden: {},
  visible: {transition: {staggerChildren: 0.12, delayChildren: 0.12}},
};
const imageReveal = {
  hidden: {opacity: 0, scale: 1.06},
  visible: {opacity: 1, scale: 1, transition: {duration: 1, ease}},
};
// Retain the entrance state across client-side navigation until a page reload.
let hasEntered = false;

function ParallaxImage({target, children}) {
  const {scrollYProgress} = useScroll({target, offset: ['start end', 'end start']});
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12], {clamp: true});
  return <motion.div className="story-parallax" style={{y}}>{children}</motion.div>;
}

export default function StorySection() {
  const photo = useRef(null);
  const reducedMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [alreadyEntered] = useState(() => hasEntered);
  const [revealed, setRevealed] = useState(alreadyEntered);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const image = <motion.div className="story-hover" whileHover={desktop && revealed && !reducedMotion ? {scale: 1.03} : undefined} transition={{duration: 0.65, ease}}>
    <img src={cars[1].photo} width="1000" height="1000" loading="lazy" alt="Mercedes-Benz automotive design detail"/>
  </motion.div>;

  return <motion.section className="story-section" aria-labelledby="story-heading"
    initial={reducedMotion || alreadyEntered ? false : 'hidden'}
    whileInView="visible" viewport={{once: true, amount: 0.2}}
    onViewportEnter={() => { hasEntered = true; }}>
    <div className="story-photo" ref={photo}>
      <motion.div className="story-reveal" variants={reducedMotion ? undefined : imageReveal}
        onAnimationComplete={() => setRevealed(true)}>
        {desktop && !reducedMotion ? <ParallaxImage target={photo}>{image}</ParallaxImage> : image}
      </motion.div>
    </div>
    <motion.div className="story-copy" variants={reducedMotion ? undefined : textSequence}>
      <motion.p className="eyebrow" variants={reducedMotion ? undefined : entrance}>MORE THAN A COLLECTION</motion.p>
      <motion.h2 id="story-heading" variants={reducedMotion ? undefined : entrance}>Driven by passion.<br/><em>Defined by detail.</em></motion.h2>
      <motion.div variants={reducedMotion ? undefined : entrance}>
        <p>We believe a great car is more than its specifications. It’s the silhouette that makes you look back. The engineering you can feel. The promise of a road not yet taken.</p>
        <p>Apex Collection is a fictional automotive destination, created to celebrate those moments — and the machines that make them possible.</p>
      </motion.div>
      <motion.div variants={reducedMotion ? undefined : entrance}>
        <Link className="under-link story-link" to="/about">Discover our story <ArrowUpRight size={16} aria-hidden="true"/></Link>
      </motion.div>
    </motion.div>
  </motion.section>;
}
