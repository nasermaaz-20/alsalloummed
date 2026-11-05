import { useEffect, useLayoutEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { animate, createScope } from 'animejs';
import { ImageOff } from 'lucide-react';
import type { Locale } from './locale';

type Props = ImgHTMLAttributes<HTMLImageElement> & { locale: Locale; critical?: boolean };
export function LoadingImage({
  locale,
  critical = false,
  src,
  srcSet,
  alt = '',
  className = '',
  ...props
}: Props) {
  const frame = useRef<HTMLSpanElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const [result, setResult] = useState({ src, state: 'pending' });
  const state = result.src === src ? result.state : 'pending';
  useLayoutEffect(() => {
    const node = image.current;
    setResult({
      src,
      state: node?.complete ? (node.naturalWidth > 0 ? 'loaded' : 'error') : 'loading',
    });
  }, [src, srcSet]);
  useEffect(() => {
    if (state !== 'loaded' || !image.current) return;
    const scope = createScope({
      root: frame,
      mediaQueries: { reduce: '(prefers-reduced-motion: reduce)' },
    }).add((self) => {
      if (self?.matches.reduce) return;
      animate(image.current!, {
        opacity: [0.35, 1],
        filter: ['blur(6px)', 'blur(0px)'],
        duration: 420,
        ease: 'outExpo',
      });
    });
    return () => scope.revert();
  }, [state, src]);
  return (
    <span
      ref={frame}
      className={`image-frame ${className === 'hero-image' ? 'hero-image-frame' : ''}`}
      data-state={state}
      aria-busy={state === 'loading' ? true : undefined}
    >
      <img
        {...props}
        ref={image}
        src={src}
        srcSet={srcSet}
        alt={alt}
        className={className || undefined}
        data-critical-image={critical ? '' : undefined}
        aria-hidden={state === 'error' ? true : undefined}
        onLoad={() => setResult({ src, state: 'loaded' })}
        onError={() => setResult({ src, state: 'error' })}
      />
      <span className="image-skeleton" aria-hidden="true" />
      {state === 'error' ? (
        <span className="image-error" role="img" aria-label={alt}>
          <ImageOff size={24} aria-hidden="true" />
          <span>{locale === 'ar' ? 'تعذّر تحميل الصورة' : 'Image unavailable'}</span>
        </span>
      ) : null}
    </span>
  );
}
