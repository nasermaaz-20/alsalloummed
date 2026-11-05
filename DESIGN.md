---
name: "Alsalloum Medical / السلوم الطبية"
description: "نظام النسخة المحلية المنفذة: وضوح مهني، هوية كحلية، وقراءة عربية وإنكليزية."
colors:
  brand-navy: "#253b59"
  brand-blue: "#025d9c"
  brand-cyan: "#25b9e3"
  brand-ice: "#96e2fa"
  surface: "#fff"
  surface-subtle: "#f4f7fa"
  text-primary: "#182c46"
  text-secondary: "#4b6078"
  border: "#dce4eb"
  action-hover: "#014875"
  control-border: "#708399"
  soft-blue: "#eaf3fa"
  light-hover: "#eaf6fc"
  footer-navy: "#1b2e47"
typography:
  display:
    fontFamily: '"Alexandria", "Segoe UI", Arial, sans-serif'
    fontSize: "clamp(2rem, 6.8vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0"
  headline:
    fontFamily: '"Alexandria", "Segoe UI", Arial, sans-serif'
    fontSize: "clamp(1.65rem, 4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.5
  title:
    fontFamily: '"Alexandria", "Segoe UI", Arial, sans-serif'
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: '"Alexandria", "Segoe UI", Arial, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: '"Alexandria", "Segoe UI", Arial, sans-serif'
    fontSize: ".94rem"
    fontWeight: 500
    lineHeight: 1.65
rounded:
  control: "8px"
  compact: "10px"
  card: "14px"
  panel: "16px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section-mobile: "60px"
  section-tablet: "72px"
  section-desktop: "88px"
components:
  button-primary:
    backgroundColor: "{colors.brand-blue}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-cyan:
    backgroundColor: "{colors.brand-cyan}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  button-light:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.brand-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  text-link:
    textColor: "{colors.brand-blue}"
    typography: "{typography.label}"
  category-filter:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  enquiry-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.control}"
    padding: "14px 12px"
  desktop-navigation:
    textColor: "{colors.text-secondary}"
  case-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
  specialty-row:
    padding: "24px 0"
---

# Design System: Alsalloum Medical

## Overview

**Creative North Star: "الوضوح الطبي المهني"**

هذا وصف للحالة البصرية المنفذة محلياً بعد المراجعة، وليس اسماً لاتجاه اختاره المستخدم من تصورات صور. يتقدم المحتوى الطبي والإجراء العملي داخل أسطح فاتحة؛ تمنح الكتل الكحلية الهوية حضوراً واضحاً، ويظل السماوي تمييزاً محدوداً.

العربية والإنكليزية تشتركان في الخط والبنية والأصول. الصفوف المفتوحة للتخصصات، والشعارات الكاملة، وبطاقات الحالات ذات الصور غير المقصوصة تمنح كل نوع محتوى شكله المناسب. المرجع التأسيسي الأوسع هو [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)؛ هنا توثق قيم CSS وسلوك React الفعليان. لا يوجد comp صور معتمد أو ادعاء مطابقة له، ولم تُنشر النسخة.

**Key Characteristics:**

- وضوح مهني ومساحات قراءة فاتحة.
- هوية كحلية وأزرق للإجراء وسماوي محدود.
- بنية تبدأ بالموبايل وتتبع اتجاه اللغة.
- صور سريرية وشعارات أصلية، وحركة قصيرة مرتبطة بالمهمة.

## Colors

ألوان العلامة مشتقة من اللوغو الجديد؛ القيم المعيارية أعلاه هي القيم المستخدمة في التنفيذ.

### Primary

- **الكحلي المؤسسي — brand-navy:** خلفية الافتتاحية والنص المؤسسي؛ للتذييل درجة footer-navy أغمق.
- **الأزرق العملي — brand-blue:** الأزرار الأساسية والروابط والتركيز على الفاتح؛ action-hover لحالة المرور.

### Secondary

- **السماوي الواضح — brand-cyan:** إجراء الافتتاحية بنص داكن.
- **الجليدي المضيء — brand-ice:** تفاصيل وتركيز على المقاطع الداكنة وحالة مرور الزر السماوي.

### Neutral

- **الأبيض والفضي البارد — surface / surface-subtle:** القراءة والتناوب بين الأقسام.
- **الحبر الكحلي والحبر الهادئ — text-primary / text-secondary:** العناوين والوصف.
- **الفاصل الهادئ — border:** الفصل والاحتواء؛ control-border حد الحقول الأوضح.
- **الأزرق الخفيف — soft-blue / light-hover:** رموز التخصصات واستجابات الأسطح الفاتحة.

**The Cyan Contrast Rule.** يرافق الزر السماوي نص text-primary الداكن، ويحمل الزر الأزرق نصاً أبيض.

## Typography

**Display Font:** Alexandria، مع Segoe UI وArial وsans-serif احتياطياً.
**Body Font:** العائلة نفسها، مستضافة محلياً مع `font-display: swap`.

**Character:** هندسي واضح في اللغتين، بوزن عادي للفقرات ومتوسط للتحكمات وثقيل للعناوين. لا تباعد إضافي بين حروف العربية.

### Hierarchy

- **Display:** قيمة أمامية عامة مرنة؛ الافتتاحية العربية تستخدم 1.87rem تحت 390px، ثم clamp(2.4rem, 4vw, 3.6rem) من 900px، و3.5rem من 1100px، و3.7rem من 1400px. عنوان الصفحة clamp(1.9rem, 5vw, 3.5rem).
- **Headline / Title:** عناوين الأقسام ثم المحتوى، مع تعديلات محلية بحسب المكون.
- **Body:** الفقرات العامة بارتفاع السطر الموثق؛ بعض مقدمات الصفحات والافتتاحية أوسع سطراً، وبعض الملخصات أصغر حجماً. قيود العرض المحلية بالبكسل؛ لا مقياس ch عام مفروض.
- **Label:** الأزرار والروابط النصية بالوزن المتوسط؛ التنقل المكتبي أصغر (.77rem).
- **English:** الافتتاحية clamp(2.1rem, 5.5vw, 3.85rem)، بارتفاع 1.2 وتباعد -.035em؛ عنوان الصفحة بارتفاع 1.25 وتباعد -.025em، وh2 بارتفاع 1.3 وتباعد -.025em؛ الفقرات بارتفاع 1.75.

## Layout

الحاوية متمركزة بعرض أقصى 1240px. الهامش الجانبي 16px تحت 390px، و20px افتراضياً، و24px من 640px، و32px من 900px. المقاطع تستخدم إيقاع section-mobile ثم section-tablet ثم section-desktop. المسافات ليست شبكة أعمدة ثابتة؛ تُحدد الشبكات بحسب المحتوى.

على الموبايل تأتي معلومات الافتتاحية وإجراءاتها قبل الصورة، ويملأ الزر عرض مجموعة الإجراءات. من 640px تصبح الحالات بعمودين والشركات بثلاثة؛ من 900px تصبح الحالات بثلاثة والشركات بخمسة، وتنقسم الافتتاحية والتواصل والمحتويات الملائمة إلى عمودين. يظهر التنقل المكتبي من 1100px؛ الترويسة sticky بارتفاع أدنى 80px ثم 92px. توجد معالجة إضافية للعرض من 1400px.

الجذر العربي `lang="ar" dir="rtl"` والإنكليزي `lang="en" dir="ltr"`. تستخدم المسافات والمحاذاة خصائص inline/block المنطقية و`text-align: start`. أسهم الوجهات تتبع اللغة، وتعزل أرقام الاتصال والبريد باستخدام `bdi`؛ الصور والشعارات لا تنعكس. يحافظ تبديل اللغة على المسار والبحث والجزء المرجعي.

## Elevation & Depth

النظام مسطح: لا `box-shadow` في الواجهة المنفذة. الفصل يعتمد على الخلفية والحدود الرفيعة. تظل الترويسة وأداة الحوار ثابتتين ضمن سياقهما. عارض الحالة يستخدم ستاراً داكناً `rgb(12 26 43 / 80%)` مع تمويه 3px؛ القائمة تستخدم ستاراً كحلياً، وتملأ سطح الشاشة.

## Shapes

حواف التحكمات هادئة، والحاويات أوسع استدارة وفق قيم rounded أعلاه. بطاقات الحالات والشركات تحتوي الصورة بحد رفيع؛ دوائر الأسهم والأيقونات والعلامة مقصودة ومحددة. الأصول السريرية والشعارات تعرض بـ`object-fit: contain`؛ صورة الافتتاحية وحدها تستخدم `cover`.

## Components

### Buttons

أزرار مباشرة بارتفاع أدنى 52px وفجوة 16px بين النص والأيقونة. الأساسي أزرق، وزر الافتتاحية سماوي، وزر قسم التواصل أبيض. المرور يبدل اللون؛ الضغط يزيح الزر 1px للأسفل. انتقال اللون 180ms والحركة 140ms. الروابط النصية بارتفاع أدنى 48px وتسطير عند المرور.

### Chips

مرشحات الفئات مستطيلة بحافة هادئة، بارتفاع أدنى 48px. غير المحدد أبيض بنص ثانوي وحد واضح؛ المحدد عبر `aria-pressed` أزرق بنص أبيض. تتلفف العناصر بدلاً من فرض تمرير أفقي.

### Cards / Containers

بطاقات الحالات تجمع الصورة الكاملة ثم العنوان والنوع والملخص وإجراء التفاصيل. حشو النص 22px. بطاقات الشركات تعرض الشعار كاملاً داخل سطح فاتح والنص بحشو 26px. صف التخصص مفتوح بفواصل أفقية، ورمز صغير وسهم دائري؛ يتحول إلى ثلاثة أعمدة من 900px، ويتلون السهم عند المرور.

### Inputs / Fields

حقول الاستفسار بيضاء بحد control-border، وبحجم نص 1rem وارتفاع أدنى 52px وتسمية ظاهرة. حشوها موثق أعلاه؛ بينها مسافة سفلية 24px. مساحة النص قابلة لتغيير الارتفاع. يستخدم النموذج التحقق الأصلي للمتصفح؛ لا منظومة ألوان خطأ مخصصة منفذة.

### Navigation

التنقل المكتبي صف هادئ؛ الصفحة الحالية زرقاء وتحتها خط 2px. الموبايل حوار أصلي يملأ الشاشة مع زر إغلاق ظاهر وروابط بارتفاع أدنى 58px. يعاد overflow السابق عند الإغلاق. التركيز العام outline أزرق 3px بإزاحة 4px؛ على الكحلي والأزرق والتذييل يصبح جليدياً.

### Case Viewer & Motion

حوار الحالة بعرض أقصى 1050px وحواف panel، وصورة كاملة وتحكم تكبير وتنقل وإغلاق؛ التكبير إلى 200% داخل مساحة صورة قابلة للتمرير. يحافظ الحوار الأصلي على سياق التركيز ويدعم Escape؛ التنقل عند حدود الحالات معطل فعلياً.

Anime.js محصورة في `createScope` بجذر المكون. الافتتاحية تنتقل 12px خلال 620ms مع stagger قدره 55ms؛ روابط القائمة تنتقل أفقياً 10px بحسب اللغة خلال 280ms مع stagger قدره 25ms؛ محتوى الحوار ينتقل 8px وشفافيته من .92 إلى 1 خلال 220ms. الثلاثة تستخدم `outExpo`. كل effect ينظف بـ`scope.revert()`؛ القائمة والحوار يعيدان overflow السابق. عند `prefers-reduced-motion: reduce` تتخطى النطاقات الحركة، وتختصر CSS الانتقالات والرسوم إلى .01ms. المحتوى ظاهر أساساً ولا ينتظر انتهاء الحركة.

## Do's and Don'ts

### Do:

- **Do** حافظ على التباين: نص داكن على السماوي وأبيض على الأزرق.
- **Do** ابنِ بالمسافات المنطقية واختبر العربية والإنكليزية بطول نصهما الفعلي.
- **Do** اعرض صور الحالات والشعارات كاملة، واترك تفاصيل الحالات للطلب الصريح.
- **Do** احصر Anime.js بجذر المكون ونظف النطاق واحترم تخفيف الحركة.

### Don't:

- **Don't** تورث الشكل القديم أو تعيد رسم اللوغو أو تغير ألوان الشعارات.
- **Don't** تقص المحتوى السريري أو تضع عليه نصوصاً وأزراراً.
- **Don't** تضف ظلالاً أو أسطحاً معدنية إلى القراءة لمجرد محاكاة لمعان اللوغو.
- **Don't** تجعل الحركة شرطاً للوصول للمحتوى أو تكرر ظهوراً متحركاً على كل قسم.
