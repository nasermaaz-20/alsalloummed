# مصادر تحديث صور الواجهة

التاريخ: 2026-11-05. طلب المستخدم استبدال صور الواجهة والشعارات فقط، وأبقى صور الأشعة والحالات الأصلية. الملفات السابقة محفوظة في [النسخة الاحتياطية قبل التنظيف](https://github.com/nasermaaz-20/alsalloummed/tree/5ca48e4682e3a04c69b4b20ce161551e4fc0dd83)، وملفا الشركة واللوغو الأصليان باقيان محلياً في `docs/sources/`.

| الأصل | المصدر والاستخدام |
| --- | --- |
| `public/assets/orthopedic-preparation.webp` | مشهد توضيحي مولّد بأداة image_gen المدمجة: تحضير أدوات جراحة العظام، بألوان كحلية وزرقاء وفضية. لا يمثل مقراً أو موظفين أو حالة حقيقية للشركة. النص الكامل للتوليد محفوظ في `orthopedic-preparation.webp.json`. |
| `public/assets/orthopedic-preparation-640.webp` | نسخة 640px من المشهد نفسه للموبايل، دون تغيير محتواه. النسخة الكبيرة 1280px. |
| `public/assets/ortonom-logo.svg` | https://ortonom.com.tr/images/Ortonom-V4.svg — ملف SVG الأصلي المرتبط بترويسة الموقع الرسمي. |
| `public/assets/spineway-logo.svg` | https://spineway.com/us/ — شعار SVG الداكن المضمّن في الترويسة، مستخرج دون إعادة رسم أو تغيير ألوان. |
| `public/assets/solid-logo.png` | https://www.solidort.com/wp-content/uploads/2021/04/solidort-logo.png — ملف PNG الرسمي بخلفية شفافة، 139×55px. يعرض بعرضه الأصلي لتجنب ضبابية التكبير. راجعت مكتبة الصور العامة وكتالوج artrodez الرسمي؛ لم تعطيا شعاراً أكبر ملائماً. |
| `public/assets/maxx.webp` | الشعار الرسمي المعتمد سابقاً، لم يحتج للاستبدال؛ مصدره محفوظ في `download-origins.json`. |

روابط الشركات الثلاث الأولى المستعملة في البحث موجودة أصلاً في [نسخة الموقع القديم المؤرشفة](https://github.com/nasermaaz-20/alsalloummed/blob/5ca48e4682e3a04c69b4b20ce161551e4fc0dd83/docs/sources/legacy-site/index.html)؛ أُعيد استخدامها لتحديد الأصول الرسمية، دون إضافة تعاونات جديدة. بصمات الشعارات محفوظة في ملفات JSON المجاورة.

## تتبّع Green

أكد المستخدم لاحقاً أن الرابط المقصود هو `https://greensurgicals.com/index.php`. اعتُمد الرابط، وأضيف الشعار الأصلي من `https://greensurgicals.com/img/logo.png` إلى `public/assets/green-logo.png` مع معلومات المصدر.
