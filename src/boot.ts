import { useEffect, useState, type RefObject } from 'react';

export function useInitialLoading(root: RefObject<HTMLElement | null>) {
  const [ready, setReady] = useState(
    () => typeof document !== 'undefined' && !document.getElementById('boot-loader'),
  );
  useEffect(() => {
    if (!document.getElementById('boot-loader')) {
      setReady(true);
      return;
    }
    let cancelled = false;
    const disposers: Array<() => void> = [];
    const onComplete = () => setReady(true);
    window.addEventListener('alsalloum:boot-complete', onComplete, { once: true });
    const images = Array.from(
      root.current?.querySelectorAll<HTMLImageElement>('img[data-critical-image]') ?? [],
    );
    const imageReady = images.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }
          const done = () => resolve();
          image.addEventListener('load', done, { once: true });
          image.addEventListener('error', done, { once: true });
          disposers.push(() => {
            image.removeEventListener('load', done);
            image.removeEventListener('error', done);
          });
        }),
    );
    let deadline: ReturnType<typeof setTimeout>;
    Promise.race([
      Promise.all([...imageReady, document.fonts?.ready ?? Promise.resolve()]),
      new Promise((resolve) => {
        deadline = setTimeout(resolve, 2200);
      }),
    ]).then(() => {
      clearTimeout(deadline);
      disposers.forEach((dispose) => dispose());
      if (!cancelled) window.dispatchEvent(new Event('alsalloum:app-ready'));
    });
    return () => {
      cancelled = true;
      clearTimeout(deadline);
      disposers.forEach((dispose) => dispose());
      window.removeEventListener('alsalloum:boot-complete', onComplete);
    };
  }, [root]);
  return ready;
}
