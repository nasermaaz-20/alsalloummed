import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { animate, createScope, stagger } from 'animejs';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Globe2,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  MoveUpRight,
  HeartHandshake,
  ShieldCheck,
  Expand,
} from 'lucide-react';
import {
  brand,
  categories,
  companies,
  cases,
  history,
  hospitals,
  l,
  ui,
  type SurgicalCase,
} from './content';
import { isLocale, preferredLocale, saveLocale, type Locale } from './locale';
import { mountPageMotion } from './motion';
import { LoadingImage } from './LoadingImage';
import { useInitialLoading } from './boot';
import { applyPageMeta } from './seo';

const navigation = ['about', 'products', 'partners', 'cases', 'contact'] as const;
const image = (name: string) => `/assets/${name}`;
const externalProps = { target: '_blank', rel: 'noopener noreferrer' };
const email = 'alsalloummedical82@gmaiil.com';
function whatsapp(locale: Locale, detail = '', number = '963935584468') {
  return `https://wa.me/${number}?text=${encodeURIComponent([ui[locale].greeting, detail].filter(Boolean).join('\n'))}`;
}
function DirectionArrow({
  locale,
  ...props
}: {
  locale: Locale;
  size?: number;
  className?: string;
}) {
  return locale === 'ar' ? (
    <ArrowLeft aria-hidden="true" {...props} />
  ) : (
    <ArrowRight aria-hidden="true" {...props} />
  );
}
function Text({ children }: { children: string }) {
  return (
    <>
      {children.split('\n').map((line, i) => (
        <span className="title-line" key={i}>
          {line}
        </span>
      ))}
    </>
  );
}
function Logo({ locale, footer = false }: { locale: Locale; footer?: boolean }) {
  return (
    <Link
      className={`brand ${footer ? 'brand-footer' : ''}`}
      to={`/${locale}`}
      aria-label={brand[locale]}
    >
      <img
        src={image('alsalloum-logo-small.webp')}
        alt=""
        width="56"
        height="56"
        data-critical-image={footer ? undefined : ''}
        loading={footer ? 'lazy' : 'eager'}
      />
      <span>
        <strong>{brand[locale]}</strong>
        <small>{ui[locale].tagline}</small>
      </span>
    </Link>
  );
}
function QuoteButton({
  locale,
  detail = '',
  className = '',
}: {
  locale: Locale;
  detail?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsapp(locale, detail)}
      {...externalProps}
      className={`button button-primary ${className}`}
    >
      <span>{ui[locale].quote}</span>
      <DirectionArrow locale={locale} size={19} />
    </a>
  );
}
function SectionHeading({
  locale,
  title,
  description,
  link,
  label,
}: {
  locale: Locale;
  title: string;
  description?: string;
  link?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>
          <Text>{title}</Text>
        </h2>
        {description ? <p>{description}</p> : null}
      </div>
      {link ? (
        <Link className="text-link" to={`/${locale}/${link}`}>
          {label}
          <DirectionArrow locale={locale} size={19} />
        </Link>
      ) : null}
    </div>
  );
}
function PageHeading({
  locale,
  page,
  title,
  description,
}: {
  locale: Locale;
  page: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-heading">
      <div className="container">
        <nav className="breadcrumbs" aria-label={ui[locale].breadcrumb}>
          <Link to={`/${locale}`}>{ui[locale].home}</Link>
          <span aria-hidden="true">/</span>
          <span>{page}</span>
        </nav>
        <h1 data-intro>
          <Text>{title}</Text>
        </h1>
        <p data-intro>{description}</p>
      </div>
    </section>
  );
}
function Header({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1100px)');
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener('change', close);
    return () => media.removeEventListener('change', close);
  }, []);
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const scope = createScope({
        root: node,
        mediaQueries: { reduceMotion: '(prefers-reduced-motion: reduce)' },
      }).add((self) => {
        if (self?.matches.reduceMotion) return;
        animate('nav a', {
          x: [locale === 'ar' ? -10 : 10, 0],
          duration: 280,
          delay: stagger(25),
          ease: 'outExpo',
        });
      });
      return () => {
        document.body.style.overflow = previous;
        scope.revert();
      };
    }
  }, [open, locale]);
  const other = locale === 'ar' ? 'en' : 'ar';
  const switchedPath =
    location.pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${other}`) + location.search + location.hash;
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo locale={locale} />
        <nav className="desktop-nav" aria-label={t.explore}>
          {navigation.map((page) => (
            <NavLink key={page} to={`/${locale}/${page}`}>
              {t[page]}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            to={switchedPath}
            className="language-switch"
            aria-label={t.language}
            onClick={() => saveLocale(other)}
          >
            <Globe2 size={18} aria-hidden="true" />
            <span lang={other}>{other === 'en' ? 'EN' : 'عربي'}</span>
          </Link>
          <a className="header-contact" href={whatsapp(locale)} {...externalProps}>
            <MessageCircle size={18} aria-hidden="true" />
            <span>{t.quote}</span>
          </a>
          <button
            type="button"
            className="icon-button menu-button"
            aria-label={t.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={25} />
          </button>
        </div>
        <dialog
          ref={dialog}
          id="mobile-menu"
          className="mobile-menu"
          onClose={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="mobile-menu-top">
            <Logo locale={locale} />
            <button
              type="button"
              className="icon-button"
              autoFocus
              aria-label={t.close}
              onClick={() => setOpen(false)}
            >
              <X />
            </button>
          </div>
          <nav aria-label={t.explore}>
            <NavLink to={`/${locale}`} end onClick={() => setOpen(false)}>
              {t.home}
              <DirectionArrow locale={locale} size={20} />
            </NavLink>
            {navigation.map((page) => (
              <NavLink key={page} to={`/${locale}/${page}`} onClick={() => setOpen(false)}>
                {t[page]}
                <DirectionArrow locale={locale} size={20} />
              </NavLink>
            ))}
          </nav>
          <QuoteButton locale={locale} />
          <p>{t.established}</p>
        </dialog>
      </div>
    </header>
  );
}
function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo locale={locale} footer />
          <p>{t.footerNote}</p>
        </div>
        <nav aria-label={t.explore}>
          <h2>{t.explore}</h2>
          {navigation.map((page) => (
            <Link key={page} to={`/${locale}/${page}`}>
              {t[page]}
            </Link>
          ))}
        </nav>
        <div className="footer-contact">
          <h2>{t.contact}</h2>
          <a href="tel:+963935584468">
            <Phone size={17} aria-hidden="true" />
            <bdi>+963 935 584 468</bdi>
          </a>
          <a href={`mailto:${email}`}>
            <Mail size={17} aria-hidden="true" />
            <bdi>{email}</bdi>
          </a>
          <p>
            <MapPin size={17} aria-hidden="true" />
            {t.headquarters}
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/share/1WXsgfzK5E/" {...externalProps}>
              Facebook
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="https://www.youtube.com/@alsalloummedical1126" {...externalProps}>
              YouTube
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {t.rights}
        </span>
        <a
          className="footer-credit"
          href="https://wa.me/963994074650"
          lang="en"
          dir="ltr"
          {...externalProps}
        >
          Made by ENG.OMAR ALAKILI
        </a>
        <span>{locale === 'ar' ? 'حلب، سوريا' : 'Aleppo, Syria'}</span>
      </div>
    </footer>
  );
}
function ContactCTA({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaDescription}</p>
        </div>
        <QuoteButton locale={locale} className="button-light" />
      </div>
    </section>
  );
}
function CompanyMark({ company, locale }: { company: (typeof companies)[number]; locale: Locale }) {
  return company.image ? (
    <LoadingImage
      locale={locale}
      className={company.id === 'solid' ? 'company-logo-solid' : undefined}
      src={image(company.image)}
      alt={company.name}
      width="260"
      height="140"
      loading="lazy"
    />
  ) : (
    <span className="company-text-name" lang="en">
      {company.name}
    </span>
  );
}
function CompanyGrid({
  locale,
  subset,
  compact = false,
}: {
  locale: Locale;
  subset?: string[];
  compact?: boolean;
}) {
  const t = ui[locale];
  return (
    <div className={compact ? 'company-strip' : 'company-grid'}>
      {companies
        .filter((company) => !subset || subset.includes(company.id))
        .map((company) =>
          compact ? (
            <Link
              key={company.id}
              to={`/${locale}/partners#${company.id}`}
              className="company-mark"
            >
              <CompanyMark company={company} locale={locale} />
            </Link>
          ) : (
            <article className="company-card" key={company.id} id={company.id}>
              <div className="company-mark">
                <CompanyMark company={company} locale={locale} />
              </div>
              <div className="company-content">
                <h2 lang="en">{company.name}</h2>
                <p className="company-specialty">{l(company.specialty, locale)}</p>
                <p>{l(company.description, locale)}</p>
                {company.url ? (
                  <a className="text-link" href={company.url} {...externalProps}>
                    {t.visitWebsite}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                ) : (
                  <Link className="text-link" to={`/${locale}/contact`}>
                    {t.contact}
                    <DirectionArrow locale={locale} size={18} />
                  </Link>
                )}
              </div>
            </article>
          ),
        )}
    </div>
  );
}
function CaseGrid({
  locale,
  entries,
  onOpen,
}: {
  locale: Locale;
  entries: SurgicalCase[];
  onOpen: (entry: SurgicalCase) => void;
}) {
  const t = ui[locale];
  return (
    <div className="case-grid">
      {entries.map((entry) => (
        <article className="case-card" key={entry.id}>
          <button
            className="case-image-button"
            onClick={() => onOpen(entry)}
            aria-label={`${t.viewCase}: ${l(entry.title, locale)}`}
          >
            <LoadingImage
              locale={locale}
              src={image(entry.image)}
              alt={t.imageAlt + l(entry.title, locale)}
              width="900"
              height="1200"
              loading="lazy"
            />
            <span className="expand-icon">
              <Expand size={19} aria-hidden="true" />
            </span>
          </button>
          <div className="case-card-body">
            <h3>{l(entry.title, locale)}</h3>
            <p className="case-type">{t[entry.type]}</p>
            <p>{l(entry.summary, locale)}</p>
            <button className="text-link" onClick={() => onOpen(entry)}>
              {t.viewCase}
              <DirectionArrow locale={locale} size={19} />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
function Home({ locale, onOpen }: { locale: Locale; onOpen: (entry: SurgicalCase) => void }) {
  const t = ui[locale];
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1 data-intro>
              <Text>{t.heroTitle}</Text>
            </h1>
            <p data-intro>{t.heroDescription}</p>
            <div className="hero-actions" data-intro>
              <QuoteButton locale={locale} className="button-cyan" />
              <Link to={`/${locale}/products`} className="hero-secondary">
                {t.discover}
                <DirectionArrow locale={locale} size={18} />
              </Link>
            </div>
            <div className="hero-origin">
              <span className="origin-line" aria-hidden="true" />
              {t.established}
            </div>
          </div>
          <figure className="hero-visual" data-intro>
            <LoadingImage
              locale={locale}
              critical
              className="hero-image"
              src={image('orthopedic-preparation.webp')}
              srcSet={`${image('orthopedic-preparation-640.webp')} 640w, ${image('orthopedic-preparation.webp')} 1280w`}
              sizes="(min-width: 900px) 48vw, 100vw"
              alt={t.heroAlt}
              width="1280"
              height="853"
              fetchPriority="high"
            />
            <figcaption>
              <span className="caption-icon">
                <ShieldCheck size={23} aria-hidden="true" />
              </span>
              <p>{t.heroCaption}</p>
            </figcaption>
          </figure>
        </div>
        <div className="container hero-specialties">
          {categories.map((category) => (
            <Link key={category.id} to={`/${locale}/products?category=${category.id}`}>
              <span>{l(category.title, locale)}</span>
              <DirectionArrow locale={locale} size={20} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section expertise-section">
        <div className="container">
          <SectionHeading
            locale={locale}
            title={t.expertiseTitle}
            description={t.expertiseDescription}
          />
          <div className="specialty-list">
            {categories.map((category, i) => (
              <Link
                to={`/${locale}/products?category=${category.id}`}
                className="specialty-row"
                key={category.id}
              >
                <span className="specialty-name">
                  <span className="specialty-symbol" aria-hidden="true">
                    {i === 2 ? <Plus /> : <MoveUpRight />}
                  </span>
                  <h3>{l(category.title, locale)}</h3>
                </span>
                <p>{l(category.description, locale)}</p>
                <span className="round-arrow">
                  <DirectionArrow locale={locale} size={23} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section partners-section">
        <div className="container">
          <SectionHeading
            locale={locale}
            title={t.partnersTitle}
            description={t.partnersDescription}
            link="partners"
            label={t.allPartners}
          />
          <CompanyGrid locale={locale} compact />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            locale={locale}
            title={t.casesTitle}
            description={t.casesDescription}
            link="cases"
            label={t.allCases}
          />
          <CaseGrid locale={locale} entries={[cases[0], cases[3], cases[2]]} onOpen={onOpen} />
        </div>
      </section>
      <section className="section story-section">
        <div className="container story-inner">
          <div className="story-brand">
            <LoadingImage
              locale={locale}
              src={image('alsalloum-logo-web.webp')}
              alt={brand[locale]}
              width="716"
              height="716"
              loading="lazy"
            />
            <p>{t.established}</p>
          </div>
          <div>
            <h2>
              <Text>{t.storyTitle}</Text>
            </h2>
            <p>{t.storyDescription}</p>
            <div className="coverage">
              <MapPin size={20} aria-hidden="true" />
              <div>
                <strong>{t.coverage}</strong>
                <p>{t.cities}</p>
              </div>
            </div>
            <Link to={`/${locale}/about`} className="text-link">
              {t.storyLink}
              <DirectionArrow locale={locale} size={20} />
            </Link>
          </div>
        </div>
      </section>
      <ContactCTA locale={locale} />
    </>
  );
}
function About({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <>
      <PageHeading
        locale={locale}
        page={t.about}
        title={t.aboutTitle}
        description={t.aboutDescription}
      />
      <section className="section">
        <div className="container about-intro">
          <div>
            <h2>{t.missionTitle}</h2>
            <p className="large-paragraph">{t.missionDescription}</p>
          </div>
          <aside className="company-facts">
            <div>
              <span>{t.office}</span>
              <strong>{t.headquarters}</strong>
            </div>
            <div>
              <span>{t.coverage}</span>
              <strong>{t.cities}</strong>
            </div>
            <div>
              <span>{locale === 'ar' ? 'سنة التأسيس' : 'Established'}</span>
              <strong>2007</strong>
            </div>
          </aside>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <h2>{t.historyTitle}</h2>
          <div className="timeline">
            {history.map((item) => (
              <article key={item.year}>
                <span className="timeline-year" dir="ltr">
                  {item.year}
                </span>
                <h3>{l(item.title, locale)}</h3>
                <p>{l(item.body, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container humanitarian">
          <div>
            <HeartHandshake className="section-icon" size={36} aria-hidden="true" />
            <h2>{t.humanTitle}</h2>
            <p>{t.humanDescription}</p>
            <details>
              <summary>
                {t.humanMore}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{t.humanFull}</p>
            </details>
          </div>
          <div className="hospital-list">
            <h3>{t.hospitalsTitle}</h3>
            <ul>
              {hospitals[locale].map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="government-section">
        <div className="container">
          <h2>{t.governmentTitle}</h2>
          <p>{t.governmentDescription}</p>
          <Link className="text-link" to={`/${locale}/contact`}>
            {t.contact}
            <DirectionArrow locale={locale} size={19} />
          </Link>
        </div>
      </section>
      <ContactCTA locale={locale} />
    </>
  );
}
function Products({ locale, onOpen }: { locale: Locale; onOpen: (entry: SurgicalCase) => void }) {
  const t = ui[locale];
  const [search, setSearch] = useSearchParams();
  const selected =
    categories.find((category) => category.id === search.get('category')) ?? categories[0];
  const related = cases.filter((entry) => (selected.caseTypes as string[]).includes(entry.type));
  return (
    <>
      <PageHeading
        locale={locale}
        page={t.products}
        title={t.productsTitle}
        description={t.productsDescription}
      />
      <section className="section">
        <div className="container">
          <div className="category-filters" aria-label={t.products}>
            {categories.map((category) => (
              <button
                key={category.id}
                aria-pressed={selected.id === category.id}
                onClick={() => setSearch({ category: category.id }, { preventScrollReset: true })}
              >
                {l(category.title, locale)}
              </button>
            ))}
          </div>
          <div className="category-detail" key={selected.id}>
            <div>
              <h2>{l(selected.title, locale)}</h2>
              <p className="large-paragraph">{l(selected.description, locale)}</p>
              <p className="catalogue-note">{t.catalogueNote}</p>
              <a
                className="button button-primary"
                href={whatsapp(locale, `${t.interest}: ${l(selected.title, locale)}`)}
                {...externalProps}
              >
                {t.categoryQuote}
                <DirectionArrow locale={locale} size={19} />
              </a>
            </div>
            <div className="category-side">
              <h3>{t.relatedPartners}</h3>
              {companies
                .filter((company) => selected.companyIds.includes(company.id))
                .map((company) => (
                  <Link to={`/${locale}/partners#${company.id}`} key={company.id}>
                    <span lang="en">{company.name}</span>
                    <DirectionArrow locale={locale} size={18} />
                  </Link>
                ))}
            </div>
          </div>
          {related.length ? (
            <div className="related-cases">
              <h2>{t.relatedCases}</h2>
              <CaseGrid locale={locale} entries={related} onOpen={onOpen} />
            </div>
          ) : null}
        </div>
      </section>
      <ContactCTA locale={locale} />
    </>
  );
}
function Partners({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <>
      <PageHeading
        locale={locale}
        page={t.partners}
        title={t.partnersPageTitle}
        description={t.partnersDescription}
      />
      <section className="section">
        <div className="container">
          <CompanyGrid locale={locale} />
          <p className="availability-note">{t.partnerAvailability}</p>
        </div>
      </section>
      <ContactCTA locale={locale} />
    </>
  );
}
function Cases({ locale, onOpen }: { locale: Locale; onOpen: (entry: SurgicalCase) => void }) {
  const t = ui[locale];
  const [search, setSearch] = useSearchParams();
  const selected = ['hip', 'knee', 'spine'].includes(search.get('type') ?? '')
    ? search.get('type')!
    : 'all';
  const entries = selected === 'all' ? cases : cases.filter((entry) => entry.type === selected);
  return (
    <>
      <PageHeading
        locale={locale}
        page={t.cases}
        title={t.casesPageTitle}
        description={t.casesPageDescription}
      />
      <section className="section">
        <div className="container">
          <div className="category-filters" aria-label={t.filter}>
            {(['all', 'hip', 'knee', 'spine'] as const).map((type) => (
              <button
                key={type}
                aria-pressed={selected === type}
                onClick={() =>
                  setSearch(type === 'all' ? {} : { type }, { preventScrollReset: true })
                }
              >
                {t[type]}
              </button>
            ))}
          </div>
          <div aria-live="polite" className="sr-only">
            {entries.length} {t.cases}
          </div>
          <CaseGrid locale={locale} entries={entries} onOpen={onOpen} />
        </div>
      </section>
      <ContactCTA locale={locale} />
    </>
  );
}
function Contact({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [interest, setInterest] = useState('general');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const interestLabel =
    categories.find((category) => category.id === interest)?.title[locale] ?? t.general;
  const detail = [
    `${t.interest}: ${interestLabel}`,
    organization.trim() ? `${t.organizationLabel}: ${organization.trim()}` : '',
    message.trim() ? `${t.detailsLabel}: ${message.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  return (
    <>
      <PageHeading
        locale={locale}
        page={t.contact}
        title={t.contactTitle}
        description={t.contactDescription}
      />
      <section className="section">
        <div className="container contact-layout">
          <div className="contact-details">
            <article className="contact-person">
              <p>{t.managerRole}</p>
              <h2>{t.manager}</h2>
              {[
                { phone: '963935584468', display: '+963 935 584 468' },
                { phone: '963996417911', display: '+963 996 417 911' },
              ].map(({ phone, display }) => (
                <div className="contact-method" key={phone}>
                  <a href={`tel:+${phone}`} className="contact-number">
                    <bdi>{display}</bdi>
                  </a>
                  <div className="person-links">
                    <a href={whatsapp(locale, '', phone)} {...externalProps}>
                      <MessageCircle size={18} aria-hidden="true" />
                      {t.whatsapp}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                    <a href={`tel:+${phone}`}>
                      <Phone size={17} aria-hidden="true" />
                      {t.call}
                    </a>
                  </div>
                </div>
              ))}
            </article>
            <div className="contact-info">
              <Mail size={22} aria-hidden="true" />
              <div>
                <h3>{t.email}</h3>
                <a href={`mailto:${email}`}>
                  <bdi>{email}</bdi>
                </a>
              </div>
            </div>
            <div className="contact-info">
              <MapPin size={22} aria-hidden="true" />
              <div>
                <h3>{t.office}</h3>
                <p>{t.headquarters}</p>
              </div>
            </div>
            <div className="coverage contact-coverage">
              <div>
                <strong>{t.coverage}</strong>
                <p>{t.cities}</p>
              </div>
            </div>
          </div>
          <div className="enquiry-panel">
            <h2>{t.requestTitle}</h2>
            <p>{t.requestDescription}</p>
            <div className="enquiry-fields">
              <label htmlFor="interest">{t.interest}</label>
              <select
                id="interest"
                value={interest}
                onChange={(event) => setInterest(event.target.value)}
              >
                <option value="general">{t.general}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {l(category.title, locale)}
                  </option>
                ))}
              </select>
              <label htmlFor="organization">{t.organization}</label>
              <input
                id="organization"
                autoComplete="organization"
                value={organization}
                maxLength={150}
                placeholder={t.organizationPlaceholder}
                onChange={(event) => setOrganization(event.target.value)}
              />
              <label htmlFor="enquiry-message">{t.message}</label>
              <textarea
                id="enquiry-message"
                rows={5}
                maxLength={1500}
                value={message}
                placeholder={t.messagePlaceholder}
                onChange={(event) => setMessage(event.target.value)}
              />
              <a
                className="button button-primary"
                href={whatsapp(locale, detail)}
                {...externalProps}
              >
                {t.openWhatsapp}
                <MessageCircle size={19} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function CaseDialog({
  locale,
  selected,
  onSelect,
}: {
  locale: Locale;
  selected: SurgicalCase | null;
  onSelect: (entry: SurgicalCase | null) => void;
}) {
  const t = ui[locale];
  const ref = useRef<HTMLDialogElement>(null);
  const imagePanel = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => {
    setZoomed(false);
    imagePanel.current?.scrollTo({ top: 0, left: 0 });
  }, [selected?.id]);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
    if (selected) {
      const before = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const scope = createScope({
        root: dialog,
        mediaQueries: { reduceMotion: '(prefers-reduced-motion: reduce)' },
      }).add((self) => {
        if (self?.matches.reduceMotion) return;
        animate('.case-dialog-content', {
          y: [8, 0],
          opacity: [0.92, 1],
          duration: 220,
          ease: 'outExpo',
        });
      });
      return () => {
        document.body.style.overflow = before;
        scope.revert();
      };
    }
  }, [selected]);
  const index = selected ? cases.findIndex((entry) => entry.id === selected.id) : -1;
  return (
    <dialog
      ref={ref}
      className="case-dialog"
      aria-labelledby="case-dialog-title"
      onClose={() => onSelect(null)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onSelect(null);
      }}
    >
      <div className="dialog-toolbar">
        <span dir="ltr">{selected ? `${index + 1} / ${cases.length}` : ''}</span>
        <div>
          <button
            className="icon-button"
            type="button"
            aria-label={zoomed ? t.zoomOut : t.zoomIn}
            onClick={() => setZoomed((value) => !value)}
          >
            {zoomed ? <Minus /> : <Plus />}
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label={t.close}
            onClick={() => onSelect(null)}
            autoFocus
          >
            <X />
          </button>
        </div>
      </div>
      {selected ? (
        <div className="case-dialog-content">
          <div className={`dialog-image ${zoomed ? 'is-zoomed' : ''}`} ref={imagePanel}>
            <LoadingImage
              locale={locale}
              src={image(selected.image)}
              alt={t.imageAlt + l(selected.title, locale)}
              width="900"
              height="1200"
            />
          </div>
          <div className="dialog-description">
            <h2 id="case-dialog-title">{l(selected.title, locale)}</h2>
            <p className="case-type">{t[selected.type]}</p>
            <p>{l(selected.description, locale)}</p>
            <div className="doctor-credit">
              <span>{t.doctor}</span>
              <strong>{l(selected.doctor, locale)}</strong>
            </div>
            <div className="case-pagination">
              <button
                type="button"
                className="icon-button"
                aria-label={t.previous}
                disabled={index === 0}
                onClick={() => onSelect(cases[index - 1])}
              >
                {locale === 'ar' ? <ChevronRight /> : <ChevronLeft />}
              </button>
              <button
                type="button"
                className="icon-button"
                aria-label={t.next}
                disabled={index === cases.length - 1}
                onClick={() => onSelect(cases[index + 1])}
              >
                {locale === 'ar' ? <ChevronLeft /> : <ChevronRight />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="sr-only" id="case-dialog-title">
          {t.cases}
        </h2>
      )}
    </dialog>
  );
}
function NotFound({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section className="section not-found container">
      <h1>{t.notFound}</h1>
      <p>{t.notFoundDescription}</p>
      <Link className="button button-primary" to={`/${locale}`}>
        {t.backHome}
      </Link>
    </section>
  );
}
function Site({ locale, page }: { locale: Locale; page: string }) {
  const location = useLocation();
  const root = useRef<HTMLDivElement>(null);
  const bootReady = useInitialLoading(root);
  const [selected, setSelected] = useState<SurgicalCase | null>(null);
  const t = ui[locale];
  useLayoutEffect(() => {
    applyPageMeta(locale, page);
  }, [locale, page]);
  useEffect(() => {
    setSelected(null);
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' }),
      );
    } else window.scrollTo({ top: 0, behavior: 'instant' });
    if (root.current && bootReady) return mountPageMotion(root.current, locale);
  }, [location.pathname, location.hash, locale, bootReady]);
  let content: ReactNode;
  switch (page) {
    case 'home':
      content = <Home locale={locale} onOpen={setSelected} />;
      break;
    case 'about':
      content = <About locale={locale} />;
      break;
    case 'products':
      content = <Products locale={locale} onOpen={setSelected} />;
      break;
    case 'partners':
      content = <Partners locale={locale} />;
      break;
    case 'cases':
      content = <Cases locale={locale} onOpen={setSelected} />;
      break;
    case 'contact':
      content = <Contact locale={locale} />;
      break;
    default:
      content = <NotFound locale={locale} />;
  }
  return (
    <div ref={root} className={`app locale-${locale}`}>
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>
      <Header locale={locale} />
      <main id="main-content" tabIndex={-1}>
        {content}
      </main>
      <Footer locale={locale} />
      <CaseDialog locale={locale} selected={selected} onSelect={setSelected} />
    </div>
  );
}
export default function App() {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  if (!isLocale(parts[0]))
    return (
      <Navigate
        replace
        to={`/${preferredLocale()}${location.pathname === '/' ? '' : location.pathname}${location.search}${location.hash}`}
      />
    );
  return <Site locale={parts[0]} page={parts.slice(1).join('/') || 'home'} />;
}
