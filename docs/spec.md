spec_content = """# Technical Specification & PRD: Jesus Pupo Portfolio

# Technical Specification & PRD: Jesus Pupo Portfolio

## 1. Executive Summary & Brand Identity
- **Developer Name:** **Jesus Pupo**
- **Studio Alias / Attribution:** **WannaDev Studios**
- **Value Proposition:** *"Desarrollador de Software especializado en crear aplicaciones web funcionales, sistemas de gestión y plataformas de comercio."*
- **Workflow Methodology:** **SDD (Spec-Driven Development)** utilizando AI-assisted workflows (OpenCode + DeepSeek).
- **Core Languages:** Bilingüe (Español Nativo / Inglés Profesional B2+).

### Non-Renderable Positioning Directive (Internal SDD Rule)
- **CRITICAL UI RULE:** Never render target audience categories, internal strategy tags, or hiring/freelance intent labels anywhere in the visible DOM/UI.
- **Copywriting Rule:** Frame all project descriptions around **Software Engineering Best Practices** (clean architecture, state management, security) + **Business Value** (conversion, workflow automation, user experience) so the communication speaks seamlessly to both technical recruiters and direct clients without explicitly mentioning either.

---

## 2. Technical Stack & Architecture

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Build Tool / Framework** | React 18 + Vite (JavaScript) | Carga ultrarrápida, bundle optimizado para SEO y Lighthouse score alto. |
| **Routing** | React Router DOM v6 | Navegación fluida SPA entre Secciones / Detalle de Proyectos. |
| **Styling** | Tailwind CSS v3 | Clases utilitarias, diseño modular y adaptable a móviles. |
| **Animations** | Framer Motion | Transiciones suaves de layout, revelación en scroll y efectos hover. |
| **i18n** | `i18next` + `react-i18next` | Soporte nativo para alternar entre Español (ES) e Inglés (EN). |
| **Form Backend & Mail** | Resend API / EmailJS | Envío seguro de mensajes desde el formulario sin exponer datos sensibles. |
| **Icons** | Lucide React | Iconografía técnica y ligera. |
| **Analytics (Free Tier)** | Vercel Analytics / Umami | Métricas gratuitas respetuosas con la privacidad para medir impresiones. |
| **Hosting** | Vercel | Despliegue continuo integrado con repositorio de GitHub. |

---

## 3. Design System & Design Tokens (Dark Premium Theme)

### Color Palette (Tailwind Config)
- **Surfaces:**
  - `bg-surface-dark`: `#09090b` (Fondo principal neutro zinc-950).
  - `bg-surface-card`: `#18181b` (Tarjetas de proyectos y experiencia zinc-900).
  - `bg-surface-border`: `#27272a` (Bordes sutiles zinc-800).
- **Text:**
  - `text-light`: `#f4f4f5` (Texto primario zinc-100).
  - `text-muted`: `#a1a1aa` (Texto secundario zinc-400).
- **Brand Highlights:**
  - `brand-accent`: `#a3e635` (Lime-400) o `#f59e0b` (Amber-500) para distintivos de estado *"Available for Work"* y badges técnicos.

---

## 4. Key Functional Requirements (FR) & Structure

### FR-01: Header & Navigation
- Navbar pegajoso con efecto `backdrop-blur`.
- Interruptor de idioma (**EN / ES**).
- Estado de disponibilidad activo: `● Available for remote roles & freelance projects`.

### FR-02: Hero Section
- Título principal con propuesta de valor y foto/avatar profesional de alta calidad.
- Mención de badges clave: **Software Developer**, **Bilingual (ES/EN)**, **Spec-Driven Development Practitioner**.
- Accesos rápidos: Descarga de **CV en PDF** (`CV_Jesus_Pupo_Software_Developer.pdf`) y botón de contacto directo.

### FR-03: Sección de Habilidades y Flujo SDD
- Muestra del stack principal (React, JavaScript, Node.js, PostgreSQL, Tailwind, Git).
- Tarjeta explicativa sobre el flujo **SDD (Spec-Driven Development)**: Explicación breve de cómo especificas requerimientos estructurados antes de pasar al código con herramientas de IA.

### FR-04: Project Showcase Grid
El portafolio incluirá 3 Proyectos Activos en Producción:

1. **Casa Martha Recovery (Landing Page):**
   - Categoría: Hospitality & Lead Generation.
   - Enfoque: UI/UX, conversión y presencia de marca real.
2. **Slice Pizzeria (Web App Demo):**
   - Categoría: E-commerce / Order Management.
   - Enfoque: Interfaz interactiva de pedidos y experiencia de usuario.
3. **AURA APPAREL (E-commerce Archive Demo):**
   - Categoría: Luxury Apparel / Catalog System.
   - Enfoque: Estado de carrito, soporte multimoneda (USD/COP) y cambio de idioma.

### FR-05: Educación y Trayectoria
- Formación técnica en Análisis y Desarrollo de Software (**SENA**) y bases universitarias en Ingeniería de Software.
- Narrativa enfocada en desarrollo autodidacta y resolución de problemas de negocio.

### FR-06: Formulario de Contacto Seguro
- Campos: Nombre, Email, Mensaje.
- Validación cliente/servidor.
- Dirección de correo oculta frente a scripts de *scraping*.

---

## 5. Directory Structure

```text
jesuspupo-portfolio/
├── public/
│   ├── favicon.ico
│   └── docs/
│       └── CV_Jesus_Pupo_Software_Developer.pdf
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── LanguageToggle.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── AboutSDD.jsx
│   │   │   ├── ProjectsGrid.jsx
│   │   │   ├── Experience.jsx
│   │   │   └── ContactForm.jsx
│   │   └── ui/
│   │       ├── ProjectCard.jsx
│   │       └── Badge.jsx
│   ├── data/
│   │   └── projectsData.js
│   ├── i18n/
│   │   ├── index.js
│   │   └── locales/
│   │       ├── en.json
│   │       └── es.json
│   ├── services/
│   │   └── emailService.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
└── package.json
```

---

## 6. Internationalization Dictionaries (`src/i18n/locales/`)

### `src/i18n/locales/en.json`
```json
{
  "nav": {
    "about": "About",
    "projects": "Projects",
    "workflow": "SDD Workflow",
    "contact": "Contact",
    "download_cv": "Download CV"
  },
  "hero": {
    "badge": "Available for Work & Freelance",
    "title": "Software Developer specialized in functional web apps, management systems, and e-commerce platforms.",
    "subtitle": "Bilingual Developer building scalable web solutions with modern JavaScript, React, and Spec-Driven Development (SDD).",
    "cta_projects": "View Projects",
    "cta_contact": "Get in Touch"
  },
  "sdd": {
    "badge": "ENGINEERING METHODOLOGY",
    "title": "Spec-Driven Development (SDD)",
    "description": "I engineer software by defining rigorous specifications, data structures, and acceptance criteria before writing code, leveraging OpenCode and AI models for precision."
  },
  "projects": {
    "title": "Featured Projects",
    "subtitle": "Real-world web applications and functional technical demos.",
    "status_in_dev": "Architecture Spec & In Development",
    "live_demo": "Live Demo",
    "source_code": "GitHub Repo",
    "case_study": "View Spec"
  },
  "contact": {
    "title": "Let's Work Together",
    "subtitle": "Have a project in mind or looking to hire? Send me a message.",
    "name_label": "Your Name",
    "email_label": "Your Email",
    "message_label": "Message",
    "send_btn": "Send Message",
    "success_msg": "Message sent successfully!"
  }
}
```

### `src/i18n/locales/es.json`
```json
{
  "nav": {
    "about": "Sobre mí",
    "projects": "Proyectos",
    "workflow": "Flujo SDD",
    "contact": "Contacto",
    "download_cv": "Descargar CV"
  },
  "hero": {
    "badge": "Disponible para Trabajo Remote y Freelance",
    "title": "Desarrollador de Software especializado en crear aplicaciones web funcionales, sistemas de gestión y plataformas de comercio.",
    "subtitle": "Desarrollador Bilingüe enfocado en crear soluciones web escalables con JavaScript moderno, React y Desarrollo Guiado por Especificaciones (SDD).",
    "cta_projects": "Ver Proyectos",
    "cta_contact": "Contáctame"
  },
  "sdd": {
    "badge": "METODOLOGÍA DE INGENIERÍA",
    "title": "Desarrollo Guiado por Especificaciones (SDD)",
    "description": "Diseño software definiendo especificaciones rigurosas, estructuras de datos y criterios de aceptación antes de codificar, aprovechando OpenCode y modelos de IA para lograr máxima precisión."
  },
  "projects": {
    "title": "Proyectos Destacados",
    "subtitle": "Aplicaciones web reales y demostraciones técnicas funcionales.",
    "status_in_dev": "Especificación de Arquitectura y En Desarrollo",
    "live_demo": "Ver Demo",
    "source_code": "Repositorio GitHub",
    "case_study": "Ver Especificación"
  },
  "contact": {
    "title": "Trabajemos Juntos",
    "subtitle": "¿Tienes un proyecto en mente o buscas contratar a un desarrollador? Envíame un mensaje.",
    "name_label": "Tu Nombre",
    "email_label": "Tu Correo",
    "message_label": "Mensaje",
    "send_btn": "Enviar Mensaje",
    "success_msg": "¡Mensaje enviado con éxito!"
  }
}
```

---

## 7. Acceptance Criteria (AC)
- **AC-01 [Rendimiento & SEO]:** El portafolio debe obtener un puntaje en Google Lighthouse superior a 90 en *Performance*, *Accessibility* y *SEO*.
- **AC-02 [Multilingüe instantáneo]:** El cambio entre ES y EN debe traducirse inmediatamente sin recargar la página.
- **AC-03 [Formulario de Contacto]:** No debe exponer la dirección de e-mail en texto plano en la estructura HTML pública para prevenir *scrappers*.
- **AC-04 [SGE Spec Teaser]:** La tarjeta del cuarto proyecto (Panel de Administración) debe desplegar un modal o sección de arquitectura detallada que demuestre que el proyecto está formalmente planteado bajo metodología SDD.

## 8. Technical Edge Cases & Integration Specifics

### 8.1 Contact Form Architecture
- **Service:** Formspree / EmailJS or Vercel Serverless API (`/api/contact.js`) with Resend.
- **Security Rule:** No API Keys or private tokens shall be committed in client-side code (`src/`).
- **Antispam:** Honeypot hidden input field to reject automated bot submissions silently.

### 8.2 SEO & Social Preview (OpenGraph)
- **Metadata Title:** "Jesus Pupo • Software Developer & Solutions Engineer"
- **Description:** "Bilingual Software Developer specialized in web apps, e-commerce, and custom management systems using React and Spec-Driven Development."
- **Social Card:** Include `public/og-cover.png` (1200x630px) formatted in Dark Minimalist style.

### 8.3 SGE Admin Panel Teaser Content (Mock Spec Data)
- **Tech Architecture:** Node.js / Express + PostgreSQL + React Admin Dashboard.
- **Key Features to Highlight in Modal:** Multi-tenant architecture, payment status tracking, automated PDF receipt generation, client booking history.