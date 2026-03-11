# MP-Projects-HubJS — Projects Hub

פורטפוליו אישי לפיתוח ווב — אתר רב-דפים (non-SPA) שמרכז **15 פרויקטים** בשתי קטגוריות:
דפי נחיתה HTML/CSS ואפליקציות JavaScript אינטראקטיביות.

ניווט מסורתי — כל דף נטען במלואו, ללא SPA framework.

---

## איך להריץ

**פתיחה ישירה** — פתח את `index.html` בדפדפן (לחיצה כפולה או גרירה).

**שרת מקומי (מומלץ)** — לתמיכה מלאה ב-ES modules:
```bash
npx serve .
# או
python -m http.server 8080
```
גלוש ל-`http://localhost:8080`

---

## פרויקטי JavaScript — משחקים (5)

| פרויקט | תיאור | טכנולוגיות |
|--------|--------|------------|
| **Memory Game** | משחק זיכרון עם מונה מהלכים וזוגות | Vanilla JS, Fisher-Yates shuffle |
| **Snake Game** | נחש קלאסי עם ניקוד | Canvas API, D-pad למגע |
| **Trivia Play** | חידון 14 שאלות עם סרגל התקדמות | Vanilla JS, משוב ויזואלי |
| **Table Tennis** | פונג לשני שחקנים (W/S + חצים) | Canvas API, מגע מסך מפוצל |
| **Tic-Tac-Toe** | איקס-עיגול עם מחוון תור והדגשת ניצחון | Vanilla JS, DOM grid |

## פרויקטי JavaScript — כלים ואפליקציות (4)

| פרויקט | תיאור | טכנולוגיות |
|--------|--------|------------|
| **Calculator** | מחשבון מלא עם סוגריים, אחוזים ומקלדת | Vanilla JS, safeEval (ללא eval) |
| **Countries World** | דפדוף במדינות עם חיפוש ומועדפים | REST API (restcountries.com), Bootstrap 4, localStorage |
| **User Login** | טופס הרשמה עם ולידציה חזקה | Regex (אימייל, סיסמה 8+ תווים) |
| **Addify / Users Management** | CRUD מלא — יצירה, עריכה, מחיקה | ES Modules, OOP (User class), localStorage |

## דפי נחיתה HTML/CSS (6)

| נושא | תיאור |
|------|--------|
| **רפואה** | מאמר על רפואה מודרנית + טופס הרשמה לקורסים |
| **Microsoft** | דף הרשמה בסגנון חברה |
| **Apple** | הרשמה לניוזלטר + רשתות חברתיות |
| **צה"ל** | גיוס מתנדבים — קישורים לאתרי צה"ל |
| **חלל** | הרשמה בנושא חלל — קישורים ל-NASA |
| **בינה מלאכותית** | מאמר חינוכי על AI + הרשמה לקורסים |

---

## טכנולוגיות

**ליבה:**
- HTML5 סמנטי, CSS3 (Custom Properties, Grid, Flexbox, Animations, clamp)
- JavaScript ES6+ (async/await, Classes, Modules, Canvas API)

**עיצוב:**
- ערכת צבעים כהה (dark theme) עם הדגשות זהב
- Google Fonts — Heebo (מותאם לעברית)
- RTL מלא, רספונסיבי מלא (מחשב → טאבלט → טלפון)
- פקדי מגע לכל המשחקים (swipe, D-pad, מסך מפוצל)
- תמיכה בטלפונים עם notch (viewport-fit=cover)

**חיצוני:**
- Bootstrap 4.3.1 + Font Awesome 4.7 (דף מדינות בלבד)
- REST API: restcountries.com/v3.1
- localStorage לשמירת מועדפים ומשתמשים

**ללא:**
- ~~Backend~~ | ~~SPA Framework~~ | ~~Bundler~~ | ~~npm~~

---

## מבנה הפרויקט

```
MP-Projects-HubJS/
├── index.html                     דף הבית — גריד כרטיסים
├── sty.css                        עיצוב דף הבית
├── README.md                      קובץ זה
├── .gitignore
│
├── images/                        תמונות רקע וכרטיסים
│
├── styles/
│   ├── Pj1/                       CSS לדפי נחיתה
│   └── Pj2/                       CSS לדפי תצוגת JS
│
├── pages/
│   ├── JS project pages/
│   │   ├── All-countries/         מדינות העולם
│   │   ├── All-UserLogin/         התחברות משתמש
│   │   ├── All-AddifyPage/        ניהול משתמשים (CRUD)
│   │   ├── All-MemoryGame/        משחק זיכרון
│   │   ├── calculator/            מחשבון
│   │   ├── Snakegame/             נחש
│   │   ├── Triviaplay/            טריוויה
│   │   ├── TableTennis/           טניס שולחן
│   │   └── tic-tac-toe/           איקס-עיגול
│   │
│   ├── LandingPage/               6 דפי נחיתה + צור קשר + תודה
│   ├── LandingPageJS/             9 דפי תצוגה לפרויקטי JS
│   ├── The projects of the projects/  דפי פרויקט מפורטים
│   └── עמודמעבריםכללי/              עמוד כפתורים (ניווט חלופי)
│
├── styles/                        CSS לדפי Landing ופרויקטים
└── icon/                          אייקונים
```

---

## הערות

- קישורים יחסיים (`pages/...`) — עובד גם מ-file:// וגם משרת
- כפתורי "חזרה לדף הבית" בנתיבים יחסיים (`../../../index.html`)
- אבטחה: `safeEval()` במקום `eval()` במחשבון
- favicon מוטמע (inline SVG) — ללא קובץ נפרד

---

## GitHub

**Repository:** [Michael2001papis/MP-Projects-HubJS](https://github.com/Michael2001papis/MP-Projects-HubJS)

---

**Projects Hub** — multi-page static portfolio site.
