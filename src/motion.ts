import { animate, createScope, createTimeline, stagger } from 'animejs';
import type { Locale } from './locale';

// All content is visible without this enhancement. The scope also owns animations
// started later by observers, so route changes and motion preferences can revert them.
export function mountPageMotion(root: HTMLElement, locale: Locale) {
  const scope = createScope({
    root,
    mediaQueries: { reduceMotion: '(prefers-reduced-motion: reduce)' },
  }).add((self) => {
    if (!self || self.matches.reduceMotion) return;
    const direction = locale === 'ar' ? -1 : 1;
    const hero = root.querySelector('.hero');
    const opening = createTimeline({ defaults: { ease: 'outExpo' } });

    if (hero) {
      opening
        .add('.hero-copy h1', { y: [32, 0], opacity: [0.35, 1], duration: 760 }, 0)
        .add(
          '.hero-visual',
          {
            clipPath: ['inset(0 14% 0 0 round 16px)', 'inset(0 0% 0 0 round 16px)'],
            y: [22, 0],
            opacity: [0.6, 1],
            duration: 780,
          },
          80,
        )
        .add(
          '.hero-copy > p, .hero-actions, .hero-origin',
          { y: [20, 0], opacity: [0.4, 1], duration: 620, delay: stagger(70) },
          160,
        )
        .add(
          '.hero-specialties a',
          { y: [18, 0], opacity: [0.5, 1], duration: 520, delay: stagger(65) },
          280,
        );
    } else {
      opening
        .add('.page-heading h1', { y: [28, 0], opacity: [0.35, 1], duration: 680 }, 0)
        .add(
          '.page-heading > .container > p',
          { y: [16, 0], opacity: [0.5, 1], duration: 560 },
          120,
        );
    }

    // Each item enters once when it can actually be seen. Clinical photographs
    // retain their complete framing; they are never cropped or scaled by motion.
    const seen = new WeakSet<Element>();
    const selector =
      '.specialty-row, .company-strip, .company-card, .case-card, .company-facts, .timeline > *';
    let active = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!active) return;
        const entering = entries.filter((entry) => entry.isIntersecting);
        self.execute(() => {
          entering.forEach(({ target }, index) => {
            observer.unobserve(target);
            const delay = Math.min(index * 70, 210);
            if (target.matches('.company-strip')) {
              animate(target.querySelectorAll('.company-mark'), {
                y: [20, 0],
                scale: [0.94, 1],
                opacity: [0.45, 1],
                duration: 620,
                delay: stagger(65),
                ease: 'outExpo',
              });
            } else if (target.matches('.company-card')) {
              const mark = target.querySelector('.company-mark');
              const content = target.querySelector('.company-content');
              if (mark) {
                animate(mark, {
                  clipPath: ['inset(0 10% 0 0)', 'inset(0 0% 0 0)'],
                  opacity: [0.5, 1],
                  duration: 680,
                  delay,
                  ease: 'outExpo',
                });
              }
              if (content) {
                animate(content, {
                  x: [direction * 18, 0],
                  opacity: [0.5, 1],
                  duration: 620,
                  delay: delay + 80,
                  ease: 'outExpo',
                });
              }
            } else if (target.matches('.specialty-row')) {
              animate(target, {
                x: [direction * 12, 0],
                opacity: [0.45, 1],
                duration: 620,
                delay,
                ease: 'outExpo',
              });
            } else {
              animate(target, {
                y: [24, 0],
                opacity: [0.5, 1],
                duration: 600,
                delay,
                ease: 'outExpo',
              });
            }
          });
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );
    const observeNewItems = () => {
      root.querySelectorAll(selector).forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        observer.observe(element);
      });
    };
    observeNewItems();
    // Filters can insert new case cards without remounting the page.
    const mutations = new MutationObserver(observeNewItems);
    mutations.observe(root.querySelector('main') ?? root, { childList: true, subtree: true });
    return () => {
      active = false;
      observer.disconnect();
      mutations.disconnect();
    };
  });
  return () => scope.revert();
}
