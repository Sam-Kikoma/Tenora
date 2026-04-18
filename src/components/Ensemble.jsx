import ScrollReveal from './ScrollReveal';
import styles from './Ensemble.module.css';
import { ensemble } from '../data/programme';

function SingerList({ singers, title }) {
  return (
    <ScrollReveal>
      <div>
        <p className={styles.voiceTitle}>{title}</p>
        <ul className={styles.singerList}>
          {singers.map(s => (
            <li key={s.name} className={s.soloist ? styles.soloist : ''}>
              {s.name}{s.soloist ? ' ✦' : ''}
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}

export default function Ensemble() {
  const { conductor, sopranoAlto, tenorBass, pianist, thanks } = ensemble;

  return (
    <section id="ensemble" className={styles.section} aria-labelledby="ens-title">
      <div className={styles.inner}>
        <ScrollReveal>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>The People</p>
            <h2 id="ens-title" className={styles.sectionTitle}>The Ensemble</h2>
            <div className={styles.sectionRule} />
          </header>
        </ScrollReveal>

        <ScrollReveal>
          <div className={styles.conductorBlock}>
            <div className={styles.conductorInitial} aria-hidden="true">
              {conductor.initials}
            </div>
            <div className={styles.conductorInfo}>
              <p className={styles.conductorName}>{conductor.name}</p>
              <p className={styles.conductorRole}>{conductor.role}</p>
              <p className={styles.conductorBio}>{conductor.bio}</p>
            </div>
          </div>
        </ScrollReveal>

        <div className={styles.voicesGrid}>
          <SingerList singers={sopranoAlto} title="Soprano / Alto" />
          <SingerList singers={tenorBass}   title="Tenor / Bass" />
        </div>

        <ScrollReveal>
          <div className={styles.pianoBlock}>
            <p className={styles.pianoLabel}>Piano</p>
            <p className={styles.pianoName}>{pianist}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
