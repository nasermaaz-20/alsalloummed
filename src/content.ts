import type { Locale } from './locale';
export type Localized = Record<Locale, string>;
export const l = (value: Localized, locale: Locale) => value[locale];
export const brand = { ar: 'السلوم الطبية', en: 'Alsalloum Medical' };
export const ui = {
  ar: {
    tagline: 'تجهيزات الجراحة العظمية والعصبية',
    home: 'الرئيسية',
    about: 'عن الشركة',
    products: 'التخصصات والمنتجات',
    partners: 'شركات التعاون',
    cases: 'الحالات الجراحية',
    contact: 'تواصل معنا',
    quote: 'اطلب عرض سعر',
    discover: 'استكشف تخصصاتنا',
    more: 'اعرف أكثر',
    allCases: 'جميع الحالات الجراحية',
    allPartners: 'تعرّف على شركات التعاون',
    heroTitle: 'كل خطوة جراحية،\nتبدأ بتجهيز دقيق.',
    heroDescription:
      'منذ 2007، نوفّر للأطباء والمشافي مستلزمات الجراحة العظمية والعصبية، ونبني تعاوناً أساسه الخبرة وسرعة الاستجابة.',
    heroCaption: 'تجهيزات تدعم عمل الطبيب، في الوقت الذي يحتاجها.',
    established: 'من حلب، منذ 2007',
    heroAlt: 'مشهد توضيحي لتحضير أدوات جراحة العظام على صينية تجهيز جراحية',
    expertiseTitle: 'اختصاصات واضحة.\nتجهيزات تخدم احتياجك.',
    expertiseDescription:
      'مجالات عملنا تجمع مستلزمات المفاصل والتثبيت العظمي والعمود الفقري. اختر المجال لتتعرف على التفاصيل والتعاونات المرتبطة به.',
    partnersTitle: 'تعاون يجمع\nالخبرة والتخصص.',
    partnersDescription:
      'نتعاون مع شركات متخصصة في مستلزمات الجراحة العظمية والعمود الفقري، لنصل بين خبرة التصنيع واحتياجات الأطباء والمشافي.',
    casesTitle: 'من التجهيز،\nإلى العمل الجراحي.',
    casesDescription:
      'حالات من التعاون مع الأطباء، توثّق استخدام المستلزمات في عمليات المفاصل وتصحيح تشوهات العمود الفقري.',
    viewCase: 'تفاصيل الحالة',
    doctor: 'بالتعاون مع',
    imageAlt: 'صورة الحالة الجراحية: ',
    storyTitle: 'خبرة بدأت في حلب،\nوتواصلت مع الناس.',
    storyDescription:
      'تأسست شركة السلوم الطبية عام 2007 في حلب. وعلى امتداد مسيرتها، عملت على توفير المستلزمات للأطباء والمشافي، مع حضور في حلب وريفها وحمص والرقة وإدلب.',
    storyLink: 'اقرأ قصة الشركة',
    coverage: 'مناطق عملنا',
    cities: 'حلب وريفها، حمص، الرقة، إدلب',
    ctaTitle: 'لنجهّز الخطوة القادمة معاً.',
    ctaDescription:
      'حدّثنا عن احتياجك، وتواصل مع فريق السلوم الطبية لمعرفة التجهيزات وطلب عرض سعر.',
    footerNote: 'شركة سورية متخصصة في تجهيز العمليات الجراحية العظمية والعصبية منذ 2007.',
    explore: 'استكشف الموقع',
    follow: 'تابعنا',
    rights: 'السلوم الطبية. جميع الحقوق محفوظة.',
    menu: 'افتح القائمة',
    close: 'إغلاق',
    skip: 'انتقل إلى المحتوى',
    language: 'تغيير اللغة إلى الإنكليزية',
    aboutTitle: 'شراكة مع الطب.\nومسيرة مع الناس.',
    aboutDescription:
      'من حلب انطلقت شركة السلوم الطبية عام 2007، لتعمل في تجهيز العمليات العظمية والعصبية وتوفير المستلزمات الجراحية للأطباء والمشافي.',
    missionTitle: 'ما نعمل لأجله',
    missionDescription:
      'توفير مستلزمات مناسبة لاحتياجات العمليات، مع الاهتمام بجودة المنتجات وسرعة التوريد والدعم الفني، وبناء علاقات عمل مستمرة مع الأطباء والمشافي.',
    historyTitle: 'محطات في مسيرتنا',
    humanTitle: 'دور إنساني مستمر',
    humanDescription:
      'ساهمت الشركة في تقديم خدمات وعمليات جراحية مجانية للجرحى والأهالي المتضررين من القصف، ثم للمتضررين من زلزال سوريا عام 2023.',
    humanMore: 'تفاصيل المسيرة والدور الإنساني',
    hospitalsTitle: 'من المشافي المذكورة في ملف الشركة',
    humanFull:
      'مع انطلاق الثورة السورية، اتخذت الشركة وصاحبها موقفاً إلى جانب الشعب السوري. ويذكر ملف الشركة اعتقال صاحبها من بداية 2012 حتى نهاية 2013، وتأثر النشاط واقتصاره على منبج خلال تلك الفترة. وبعد خروجه أعاد إحياء العمل في مناطق خارج سيطرة النظام السابق، مع تقديم خدمات مجانية للجرحى والمتضررين. واستمر هذا الدور خلال زلزال 2023، ثم توسع النشاط عام 2025.',
    governmentTitle: 'جاهزون لتعاون يخدم القطاع الصحي.',
    governmentDescription:
      'تضع الشركة خبرتها وإمكاناتها لتجهيز المشافي الحكومية، مع تقديم أسعار تفضيلية وسرعة في التوريد ودعم فني واستشاري، وإعطاء الأولوية للمناطق الأكثر حاجة والمبادرات الإنسانية.',
    headquarters: 'حلب، حي الجميلية، سوريا',
    productsTitle: 'تجهيزات لكل مجال،\nوتفاصيل تهم الطبيب.',
    productsDescription:
      'تعرف على مجالات التخصص، ثم تواصل معنا حول المستلزمات المطلوبة ومدى توافرها والمواصفات المناسبة لاحتياجك.',
    relatedPartners: 'شركات مرتبطة بهذا المجال',
    relatedCases: 'من الحالات المرتبطة',
    categoryQuote: 'استفسر عن تجهيزات هذا المجال',
    catalogueNote: 'للمواصفات والتوافر وعرض السعر، تواصل مع فريق الشركة.',
    partnersPageTitle: 'خبرات متخصصة،\nتلتقي في تعاوننا.',
    visitWebsite: 'الموقع الرسمي',
    partnerAvailability: 'للاستفسار عن منتجات الشركة المتاحة لدينا، تواصل مع فريق السلوم الطبية.',
    casesPageTitle: 'صور من تعاوننا،\nوحالات من واقع العمل.',
    casesPageDescription:
      'استعرض الحالات حسب المجال، وافتح كل حالة لقراءة التفاصيل وتكبير الصورة الأصلية.',
    all: 'الكل',
    hip: 'مفاصل الورك',
    knee: 'مفاصل الركبة',
    spine: 'العمود الفقري',
    filter: 'تصفية الحالات حسب المجال',
    empty: 'لا توجد حالات بهذا المجال حالياً.',
    zoomIn: 'تكبير الصورة',
    zoomOut: 'عرض الصورة كاملة',
    previous: 'الحالة السابقة',
    next: 'الحالة التالية',
    contactTitle: 'حديث واحد،\nيبدأ منه التعاون.',
    contactDescription: 'تواصل مع مدير الشركة، وأخبرنا عن احتياجات المشفى أو التجهيزات المطلوبة.',
    manager: 'حسن السلوم',
    managerRole: 'مدير الشركة',
    whatsapp: 'تواصل عبر واتساب',
    call: 'اتصال هاتفي',
    email: 'البريد الإلكتروني',
    office: 'مقر الشركة',
    requestTitle: 'جهّز استفسارك',
    requestDescription:
      'اختر مجال اهتمامك واكتب التفاصيل التي ترغب بمشاركتها. تفتح الرسالة في واتساب لتراجعها وترسلها بنفسك.',
    interest: 'مجال الاهتمام',
    general: 'استفسار عام',
    organization: 'اسمك أو اسم المشفى (اختياري)',
    organizationPlaceholder: 'الاسم أو الجهة',
    message: 'تفاصيل الاستفسار (اختياري)',
    messagePlaceholder: 'ما التجهيزات التي تبحث عنها؟',
    openWhatsapp: 'تابع إلى واتساب',
    greeting: 'مرحباً شركة السلوم الطبية، أرغب بالاستفسار وطلب عرض سعر.',
    organizationLabel: 'الاسم أو الجهة',
    detailsLabel: 'التفاصيل',
    notFound: 'هذه الصفحة غير موجودة.',
    notFoundDescription: 'يمكنك العودة إلى الرئيسية أو التواصل معنا للوصول إلى ما تبحث عنه.',
    backHome: 'العودة إلى الرئيسية',
    breadcrumb: 'مسار الصفحة',
  },
  en: {
    tagline: 'Orthopedic & neurosurgical supplies',
    home: 'Home',
    about: 'About us',
    products: 'Specialties & products',
    partners: 'Our collaborations',
    cases: 'Surgical cases',
    contact: 'Contact',
    quote: 'Request a quote',
    discover: 'Explore our specialties',
    more: 'Learn more',
    allCases: 'Explore all surgical cases',
    allPartners: 'Meet our collaborators',
    heroTitle: 'Every surgical step\nbegins with preparation.',
    heroDescription:
      'Supporting doctors and hospitals with orthopedic and neurosurgical supplies since 2007, through experience, collaboration, and responsive service.',
    heroCaption: 'Equipping medical professionals for the work ahead.',
    established: 'From Aleppo, since 2007',
    heroAlt:
      'Illustrative scene of orthopedic instruments being arranged on a surgical preparation tray',
    expertiseTitle: 'Focused specialties.\nPurposeful preparation.',
    expertiseDescription:
      'Our work brings together joint replacement, bone fixation, and spinal supplies. Explore each specialty and its related collaborations.',
    partnersTitle: 'Specialist knowledge.\nShared purpose.',
    partnersDescription:
      'We collaborate with specialist orthopedic and spinal supply companies, connecting manufacturing expertise with the needs of doctors and hospitals.',
    casesTitle: 'From preparation\nto surgical practice.',
    casesDescription:
      'Cases from our work with doctors, illustrating the use of supplies in joint replacement and spinal correction procedures.',
    viewCase: 'Case details',
    doctor: 'In collaboration with',
    imageAlt: 'Surgical case image: ',
    storyTitle: 'Rooted in Aleppo.\nConnected to people.',
    storyDescription:
      'Alsalloum Medical was founded in Aleppo in 2007. Throughout its journey, it has supplied doctors and hospitals, with operations in Aleppo and its countryside, Homs, Raqqa, and Idlib.',
    storyLink: 'Read our story',
    coverage: 'Areas we serve',
    cities: 'Aleppo & countryside, Homs, Raqqa, Idlib',
    ctaTitle: 'Let’s prepare the next step together.',
    ctaDescription:
      'Tell us what you need. Speak with Alsalloum Medical about surgical supplies and request a quotation.',
    footerNote:
      'A Syrian company specializing in orthopedic and neurosurgical supplies since 2007.',
    explore: 'Explore',
    follow: 'Follow us',
    rights: 'Alsalloum Medical. All rights reserved.',
    menu: 'Open navigation',
    close: 'Close',
    skip: 'Skip to content',
    language: 'Switch language to Arabic',
    aboutTitle: 'Working with medicine.\nStanding with people.',
    aboutDescription:
      'Founded in Aleppo in 2007, Alsalloum Medical equips orthopedic and neurosurgical procedures and supplies doctors and hospitals.',
    missionTitle: 'What we work for',
    missionDescription:
      'Providing supplies that meet surgical needs, with attention to product quality, timely delivery, technical support, and long-term relationships with doctors and hospitals.',
    historyTitle: 'Our journey',
    humanTitle: 'An ongoing humanitarian role',
    humanDescription:
      'The company has contributed to free services and surgical procedures for injured people and civilians affected by shelling, and later for people affected by the 2023 earthquake in Syria.',
    humanMore: 'Read the full journey and humanitarian account',
    hospitalsTitle: 'Hospitals mentioned in our company profile',
    humanFull:
      'At the start of the Syrian revolution, the company and its owner stood alongside the Syrian people. The company profile describes the owner’s detention from early 2012 to late 2013 and the impact on operations, which became limited to Manbij. After his release, he rebuilt operations in areas outside the former regime’s control, providing free services to injured and affected people. This work continued during the 2023 earthquake. The company later expanded its operations in 2025.',
    governmentTitle: 'Ready to support the health sector.',
    governmentDescription:
      'The company offers its experience to equip public hospitals, with preferential pricing, responsive supply, technical and advisory support, and priority for areas most in need and humanitarian initiatives.',
    headquarters: 'Al-Jamiliyah, Aleppo, Syria',
    productsTitle: 'Focused supplies.\nDetails that matter.',
    productsDescription:
      'Explore our specialties, then speak with us about your requirements, availability, and specifications suited to your needs.',
    relatedPartners: 'Companies in this specialty',
    relatedCases: 'Related cases',
    categoryQuote: 'Enquire about this specialty',
    catalogueNote: 'Contact our team for specifications, availability, and a quotation.',
    partnersPageTitle: 'Specialist expertise.\nCollaborative thinking.',
    visitWebsite: 'Official website',
    partnerAvailability:
      'Contact Alsalloum Medical to ask which products are available through our company.',
    casesPageTitle: 'Our collaborations,\nthrough real cases.',
    casesPageDescription:
      'Browse cases by specialty. Open a case for more information and a larger view of the original image.',
    all: 'All cases',
    hip: 'Hip joints',
    knee: 'Knee joints',
    spine: 'Spine',
    filter: 'Filter cases by specialty',
    empty: 'No cases in this specialty at present.',
    zoomIn: 'Enlarge image',
    zoomOut: 'Fit full image',
    previous: 'Previous case',
    next: 'Next case',
    contactTitle: 'A conversation starts\nthe collaboration.',
    contactDescription:
      'Speak with our company director about your hospital’s needs and the supplies you are looking for.',
    manager: 'Hassan Alsalloum',
    managerRole: 'Company director',
    whatsapp: 'Contact on WhatsApp',
    call: 'Call',
    email: 'Email',
    office: 'Our office',
    requestTitle: 'Prepare your enquiry',
    requestDescription:
      'Choose a specialty and add the details you would like to share. The message opens in WhatsApp for you to review and send.',
    interest: 'Area of interest',
    general: 'General enquiry',
    organization: 'Your name or hospital (optional)',
    organizationPlaceholder: 'Name or organization',
    message: 'Enquiry details (optional)',
    messagePlaceholder: 'Which supplies are you looking for?',
    openWhatsapp: 'Continue to WhatsApp',
    greeting: 'Hello Alsalloum Medical, I would like to enquire and request a quotation.',
    organizationLabel: 'Name or organization',
    detailsLabel: 'Details',
    notFound: 'This page could not be found.',
    notFoundDescription: 'Return to the home page or contact us to find what you are looking for.',
    backHome: 'Back to home',
    breadcrumb: 'Breadcrumb',
  },
};
export const categories = [
  {
    id: 'joints',
    title: { ar: 'مفاصل الورك والركبة', en: 'Hip & knee joints' },
    short: { ar: 'المفاصل', en: 'Joint replacement' },
    description: {
      ar: 'مستلزمات تبديل مفاصل الورك والركبة، بالتعاون مع Maxx Orthopedics وOrtono Medical. نساعدك في الاستفسار عن التجهيزات والمواصفات المطلوبة للعملية.',
      en: 'Hip and knee replacement supplies, with collaborations including Maxx Orthopedics and Ortono Medical. Speak with us about the equipment and specifications required for your procedure.',
    },
    image: 'op1.jpg',
    companyIds: ['maxx', 'ortonom'],
    caseTypes: ['hip', 'knee'],
  },
  {
    id: 'fixation',
    title: { ar: 'مواد التثبيت العظمي', en: 'Bone fixation supplies' },
    short: { ar: 'التثبيت العظمي', en: 'Bone fixation' },
    description: {
      ar: 'مواد مخصصة لعمليات التثبيت العظمي، بالتعاون مع Green. تواصل معنا لتحديد الاحتياج والتعرف على المستلزمات المتاحة.',
      en: 'Materials for bone fixation procedures. Green is among our collaborators. Contact our team to discuss your requirements and available supplies.',
    },
    image: 'op2.jpg',
    companyIds: ['green'],
    caseTypes: [],
  },
  {
    id: 'spine',
    title: { ar: 'مستلزمات العمود الفقري', en: 'Spinal surgery supplies' },
    short: { ar: 'العمود الفقري', en: 'Spine' },
    description: {
      ar: 'مستلزمات جراحية للعمود الفقري من Spineway الفرنسية، مع حالات تعاون في تصحيح الجنف والحدب وتثبيت العمود الفقري.',
      en: 'Spinal surgical supplies from France’s Spineway, with collaborative cases involving scoliosis and kyphosis correction and spinal fixation.',
    },
    image: 'op3.jpg',
    companyIds: ['spineway'],
    caseTypes: ['spine'],
  },
];
export const companies = [
  {
    id: 'maxx',
    name: 'Maxx Orthopedics',
    image: 'maxx.webp',
    url: 'https://maxxortho.com/',
    specialty: { ar: 'مفاصل الورك والركبة', en: 'Hip & knee solutions' },
    description: {
      ar: 'شركة أمريكية متخصصة في حلول مفاصل الورك والركبة، ومن شركات تعاون السلوم الطبية.',
      en: 'A US company specializing in hip and knee solutions, and a collaborator of Alsalloum Medical.',
    },
  },
  {
    id: 'ortonom',
    name: 'Ortono Medical',
    image: 'ortonom-logo.svg',
    url: 'https://ortonom.com.tr/',
    specialty: { ar: 'مفاصل الورك والركبة', en: 'Hip & knee systems' },
    description: {
      ar: 'شركة تركية متخصصة في تجهيزات مفاصل الورك والركبة.',
      en: 'A Turkish company specializing in hip and knee joint supplies.',
    },
  },
  {
    id: 'spineway',
    name: 'Spineway',
    image: 'spineway-logo.svg',
    url: 'https://spineway.com/',
    specialty: { ar: 'مستلزمات العمود الفقري', en: 'Spinal surgery supplies' },
    description: {
      ar: 'شركة فرنسية متخصصة في مستلزمات جراحة العمود الفقري.',
      en: 'A French company specializing in spinal surgery supplies.',
    },
  },
  {
    id: 'green',
    name: 'Green',
    image: 'green-logo.png',
    url: 'https://greensurgicals.com/index.php',
    specialty: { ar: 'مواد التثبيت العظمي', en: 'Bone fixation materials' },
    description: {
      ar: 'مواد مخصصة لعمليات التثبيت العظمي، ضمن مجالات تعاون السلوم الطبية.',
      en: 'Materials for bone fixation procedures, among Alsalloum Medical’s areas of collaboration.',
    },
  },
  {
    id: 'solid',
    name: 'Solid',
    image: 'solid-logo.png',
    url: 'https://www.solidort.com/en/home/',
    specialty: { ar: 'من شركات التعاون', en: 'Among our collaborators' },
    description: {
      ar: 'تواصل مع السلوم الطبية للاستفسار عن التجهيزات المتاحة من Solid.',
      en: 'Speak with Alsalloum Medical to enquire about available supplies from Solid.',
    },
  },
];
export type CaseType = 'hip' | 'knee' | 'spine';
export const cases = [
  {
    id: 'hip-uncemented',
    type: 'hip' as CaseType,
    image: 'op1.jpg',
    title: { ar: 'تبديل مفصل ورك لا أسمنتي', en: 'Uncemented hip replacement' },
    doctor: { ar: 'د. وليد العبد', en: 'Dr. Walid Al-Abd' },
    summary: {
      ar: 'تبديل مفصل ورك صناعي مع تطعيم عظمي، بالتعاون مع الدكتور وليد العبد.',
      en: 'Hip replacement with bone grafting, with Dr. Walid Al-Abd.',
    },
    description: {
      ar: 'صور قبل وبعد تبديل مفصل ورك صناعي مع تطعيم عظمي للعمود الخلفي العلوي بطعم ذاتي من الرأس، بالتعاون بين شركة السلوم الطبية والدكتور وليد العبد. توثّق الصور وضع المفصل قبل العملية وبعدها.',
      en: 'Hip replacement with an autologous bone graft from the femoral head to the upper posterior column, with Dr. Walid Al-Abd. The images document the joint before and after the procedure.',
    },
  },
  {
    id: 'hip-manbij',
    type: 'hip' as CaseType,
    image: 'op2.jpg',
    title: { ar: 'تبديل مفصل ورك أسمنتي', en: 'Cemented hip replacement' },
    doctor: { ar: 'د. شمس الدين الحسون', en: 'Dr. Shams Al-Din Al-Hassoun' },
    summary: {
      ar: 'حالة لمريضة في العقد السابع، أُجريت في إحدى مشافي مدينة منبج.',
      en: 'A patient in her seventh decade, treated at a hospital in Manbij.',
    },
    description: {
      ar: 'نموذج لتبديل مفصل ورك إسمنتي لمريضة في العقد السابع، بالتعاون مع الدكتور شمس الدين الحسون في إحدى مشافي مدينة منبج. ساهمت الشركة في توفير المستلزمات اللازمة لاحتياج الطبيب.',
      en: 'A cemented hip replacement for a patient in her seventh decade, with Dr. Shams Al-Din Al-Hassoun at a hospital in Manbij. The company provided the materials required by the surgeon.',
    },
  },
  {
    id: 'scoliosis-kyphosis',
    type: 'spine' as CaseType,
    image: 'op3.jpg',
    title: { ar: 'تعديل جنف وحدب', en: 'Scoliosis & kyphosis correction' },
    doctor: { ar: 'د. علي السلوم', en: 'Dr. Ali Alsalloum' },
    summary: {
      ar: 'تعاون في عملية لتصحيح الجنف باستخدام مستلزمات تثبيت العمود الفقري.',
      en: 'A scoliosis correction case using spinal fixation supplies.',
    },
    description: {
      ar: 'عملية تعديل جنف وحدب بالتعاون بين شركة السلوم الطبية والدكتور علي السلوم، باستخدام تقنيات تثبيت العمود الفقري والبراغي. توثق الصور الحالة والمستلزمات المستخدمة في التثبيت وتصحيح المحور الفقري.',
      en: 'A scoliosis and kyphosis correction procedure with Dr. Ali Alsalloum, using spinal fixation techniques and screws. The images document the case, fixation materials, and spinal alignment.',
    },
  },
  {
    id: 'knee-replacement',
    type: 'knee' as CaseType,
    image: 'op4.jpg',
    title: { ar: 'استبدال مفصل ركبة', en: 'Knee joint replacement' },
    doctor: { ar: 'د. وليد العبد', en: 'Dr. Walid Al-Abd' },
    summary: {
      ar: 'استبدال المفصل المتآكل بمفصل صناعي، بالتعاون مع الدكتور وليد العبد.',
      en: 'Replacement of a worn knee joint, with Dr. Walid Al-Abd.',
    },
    description: {
      ar: 'استبدال مفصل ركبة متآكل بمفصل صناعي من تجهيزات الشركة، بالتعاون مع الدكتور وليد العبد. توثّق الصور الحالة قبل الاستبدال وبعده.',
      en: 'Replacement of a worn knee joint with an artificial joint supplied by the company, with Dr. Walid Al-Abd. The images document the case before and after replacement.',
    },
  },
  {
    id: 'hip-cemented',
    type: 'hip' as CaseType,
    image: 'op5.jpg',
    title: { ar: 'تثبيت مفصل ورك أسمنتي', en: 'Cemented hip fixation' },
    doctor: { ar: 'د. حسن السيد عمر', en: 'Dr. Hassan Al-Sayed Omar' },
    summary: {
      ar: 'تبديل مفصل الورك وتثبيته بالإسمنت الطبي، بالتعاون مع الدكتور حسن السيد عمر.',
      en: 'Hip replacement using medical cement, with Dr. Hassan Al-Sayed Omar.',
    },
    description: {
      ar: 'تبديل مفصل ورك متآكل بمفصل صناعي وتثبيته بمادة إسمنتية طبية، بالتعاون بين الشركة والدكتور حسن السيد عمر. توثّق الصور وضع المفصل بعد العملية مقارنةً بما قبلها.',
      en: 'Replacement of a worn hip joint with an artificial joint fixed using medical cement, with Dr. Hassan Al-Sayed Omar. The images document the joint after the procedure compared with its previous condition.',
    },
  },
  {
    id: 'pediatric-scoliosis',
    type: 'spine' as CaseType,
    image: 'op6.jpg',
    title: { ar: 'تعديل جنف عند طفل', en: 'Pediatric scoliosis correction' },
    doctor: { ar: 'د. علي السلوم', en: 'Dr. Ali Alsalloum' },
    summary: {
      ar: 'تصحيح انحراف العمود الفقري وتثبيته ببراغٍ وسيخات، بالتعاون مع الدكتور علي السلوم.',
      en: 'Spinal correction and fixation using screws and rods, with Dr. Ali Alsalloum.',
    },
    description: {
      ar: 'عملية تعديل جنف عند طفل، مع تصحيح انحراف العمود الفقري وتثبيته ببراغٍ وسيخات، بالتعاون مع الدكتور علي السلوم. تعرض الصور استخدام مستلزمات التثبيت في هذه الحالة.',
      en: 'A pediatric scoliosis correction procedure using spinal screws and rods, with Dr. Ali Alsalloum. The images illustrate the fixation supplies used in this case.',
    },
  },
];
export type SurgicalCase = (typeof cases)[number];
export const history = [
  {
    year: '2007',
    title: { ar: 'البداية من حلب', en: 'Founded in Aleppo' },
    body: {
      ar: 'تأسيس الشركة والعمل في تجهيز العمليات العظمية والعصبية.',
      en: 'The company began its work in orthopedic and neurosurgical supplies.',
    },
  },
  {
    year: '2012–2013',
    title: { ar: 'استمرار المسيرة', en: 'Continuing the journey' },
    body: {
      ar: 'مرحلة تأثر فيها النشاط واقتصر على منبج، ثم أعيد إحياؤه وتوسيع العمل مع المشافي.',
      en: 'A period that affected operations and limited them to Manbij, followed by rebuilding work with hospitals.',
    },
  },
  {
    year: '2023',
    title: { ar: 'الاستجابة الإنسانية', en: 'Humanitarian response' },
    body: {
      ar: 'المساهمة في عمليات جراحية مجانية للمتضررين من زلزال سوريا.',
      en: 'Contributing to free surgical procedures for people affected by the earthquake in Syria.',
    },
  },
  {
    year: '2025',
    title: { ar: 'توسع العمل', en: 'Expanding operations' },
    body: {
      ar: 'توسع العمل إلى حمص.',
      en: 'Operations expanded to Homs.',
    },
  },
];
export const hospitals = {
  ar: [
    'المشفى السوري - عفرين',
    'مشفى مارع الوطني',
    'مشفى إعزاز الوطني',
    'مشفى المغارة - الأتارب',
    'مشفى عقربات - إدلب',
    'مشافٍ في ريف حلب وإدلب والرقة',
  ],
  en: [
    'Syrian Hospital, Afrin',
    'Marea National Hospital',
    'Azaz National Hospital',
    'Al-Maghara Hospital, Al-Atarib',
    'Aqrabat Hospital, Idlib',
    'Hospitals in rural Aleppo, Idlib, and Raqqa',
  ],
};
