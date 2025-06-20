# Image History API

API desarrollada en [NestJS](https://nestjs.com/) para la generación de historias y creación de imágenes a partir de imágenes y descripciones, integrando Gemini AI y almacenamiento en Supabase. El sistema permite a usuarios autenticados generar historias creativas y obtener archivos PDF con la historia y la imagen generada.

---

## Tabla de Contenidos
- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Dependencias y Paquetes](#dependencias-y-paquetes)
- [Conexiones y Servicios Externos](#conexiones-y-servicios-externos)
- [Variables de Entorno](#variables-de-entorno)
- [Modelos y Base de Datos](#modelos-y-base-de-datos)
- [Endpoints Principales](#endpoints-principales)
- [DTOs y Tipos](#dtos-y-tipos)
- [Middlewares y Filtros](#middlewares-y-filtros)
- [Utilidades](#utilidades)
- [Comandos Útiles](#comandos-útiles)

---

## Descripción General

Este proyecto expone una API REST que permite a los usuarios autenticados:
- Subir una imagen y una descripción.
- Generar una historia creativa y una nueva imagen usando Gemini AI.
- Almacenar imágenes y PDFs en Supabase Storage.
- Consultar el historial de historias generadas por usuario.

---

## Estructura del Proyecto

```
image-history/
├── prisma/
│   └── schema.prisma         # Esquema de la base de datos
├── src/
│   ├── app.module.ts         # Módulo raíz
│   ├── main.ts               # Bootstrap de la app
│   ├── auth/                 # Autenticación JWT
│   ├── common/               # Utilidades, filtros, middlewares, tipos
│   ├── generate-history/     # Lógica de generación de historias
│   ├── prisma/               # Módulo y servicio de Prisma
│   └── utils/                # Utilidades (PDF, prompts)
├── package.json
├── README.md
└── ...
```

---

## Dependencias y Paquetes

**Principales:**
- `@nestjs/core` ^11.1.3
- `@nestjs/common` ^11.1.3
- `@nestjs/platform-express` ^11.1.3
- `@nestjs/passport` ^11.0.5
- `@prisma/client` ^6.10.1
- `@supabase/supabase-js` ^2.50.0
- `@google/genai` ^1.5.1
- `passport-jwt` ^4.0.1
- `class-validator` ^0.14.2
- `class-transformer` ^0.5.1
- `express-rate-limit` ^7.5.0
- `pdfkit` ^0.17.1

**Desarrollo:**
- `@nestjs/cli` ^10.0.0
- `@types/express`, `@types/jest`, `@types/multer`, `@types/pdfkit`
- `eslint`, `prettier`, `typescript`, etc.

---

## Conexiones y Servicios Externos

- **Gemini AI (Google):**
  - Se utiliza para generar historias y nuevas imágenes a partir de una imagen y una descripción.
  - Paquete: `@google/genai`
  - Configuración vía variables de entorno: `GEMINI_API_KEY`

- **Supabase Storage:**
  - Almacenamiento de imágenes originales, generadas y PDFs.
  - Paquete: `@supabase/supabase-js`
  - Configuración vía variables de entorno: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

- **Prisma + PostgreSQL:**
  - ORM para la persistencia de historias generadas.
  - Configuración vía variable de entorno: `DATABASE_URL`

---

## Variables de Entorno

Debes definir las siguientes variables en un archivo `.env`:

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
GEMINI_API_URL=...
GEMINI_API_KEY=...
DATABASE_URL=postgresql://usuario:password@host:puerto/db
SUPABASE_JWT_SECRET=...
```

---

## Endpoints Principales

- `POST /api/generate-story`
  - Sube una imagen y una descripción, genera historia e imagen, almacena y retorna resultado.
  - Requiere autenticación JWT.
  - Body: `multipart/form-data` con campo `image` y campo `description`.

- `GET /api/generate-story`
  - Devuelve el historial de historias generadas por el usuario autenticado.
  - Requiere autenticación JWT.

---

## DTOs y Tipos

- **CreateGenerateStoryDto**
  ```ts
  export class CreateGenerateStoryDto {
    @IsString()
    description: string;
  }
  ```
- **StandardResponse<T>**
  ```ts
  export class StandardResponse<T> {
    status: number;
    message: string;
    data?: T;
    error?: { message: string; details?: string[] | Record<string, unknown> };
  }
  ```
- **Tipos personalizados:**
  - `ImageUploadResult`, `SupabaseUploadResult`, `StoryGenerationRequest`, `StoryGenerationResult`, etc.

---

## Middlewares y Filtros

- **Autenticación JWT:**
  - Guard y estrategia con Passport y JWT.
  - Decorador `@User()` para extraer datos del usuario autenticado.
- **Rate Limiting:**
  - Middleware con `express-rate-limit` para limitar peticiones.
- **Filtro global de excepciones:**
  - Captura y formatea errores de toda la API.
- **Filtro de archivos:**
  - Solo permite imágenes JPG, JPEG o PNG en la subida.

---

## Utilidades

- **Generación de PDF:**
  - Utilidad para crear un PDF con la historia y la imagen generada usando `pdfkit`.
- **Prompts personalizados para Gemini:**
  - Utilidad para construir prompts creativos y detallados para la IA.

---

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run start:dev

# Ejecutar en producción
npm run start:prod

# Ejecutar tests
npm run test
```

---

## Notas
- El proyecto está preparado para ser desplegado en cualquier entorno compatible con Node.js y PostgreSQL.
- Se recomienda usar HTTPS y proteger las variables de entorno en producción.
- Para más detalles, consulta el código fuente y los comentarios en cada archivo.
