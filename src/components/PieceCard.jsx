import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './PieceCard.module.css';
import ScrollReveal from './ScrollReveal';

export default function PieceCard({ piece }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    if (open) {
      gsap.fromTo(bodyRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
    } else {
      gsap.to(bodyRef.current,
        { height: 0, opacity: 0, duration: 0.35, ease: 'power2.in' }
      );
    }
  }, { scope: cardRef, dependencies: [open] });

  return (
    <ScrollReveal>
      <article
        ref={cardRef}
        className={`${styles.card} ${open ? styles.expanded : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <span className={styles.numeral}>{piece.numeral}</span>
            <h3 className={styles.title}>{piece.title}</h3>
            <span className={styles.performer}>{piece.performer}</span>
          </div>
          <p className={styles.composer}>{piece.composer}</p>
          {!open && <p className={styles.expandHint}>Read more ↓</p>}
        </header>

        <div ref={bodyRef} className={styles.body} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
          <p className={styles.note}>{piece.note}</p>
          <div className={styles.themes}>
            {piece.themes.map(t => (
              <span key={t} className={styles.theme}>{t}</span>
            ))}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
