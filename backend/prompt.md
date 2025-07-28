Actúa como un experto en desarrollo de software y testing en TypeScript. Quiero que me ayudes a configurar Jest y a generar pruebas unitarias para un sistema de gestión de candidatos.

El sistema incluye funciones de validación de datos, un servicio de dominio llamado `addCandidate` y un controlador Express llamado `addCandidateController`.

#### Requisitos de configuración de Jest:
- Preset: ts-jest
- Entorno: node
- Coverage: habilitado
- Setup: ejecutar archivo setup.ts antes de cada test
- NODE_ENV en 'test'
- Mock de console.log para evitar ruido

#### Requisitos de las pruebas:
1. **validateCandidateData**
   - Validación de campos obligatorios: firstName, lastName, email
   - Validación de email, teléfono, fechas
   - Validación de estructuras: educación, experiencia, CV
   - Casos válidos e inválidos

2. **addCandidate (servicio de dominio)**
   - Agregar con datos completos y relaciones
   - Manejar errores como email duplicado (código P2002)
   - Mockear modelos para evitar conexión real a BD
   - Verificar invocación de métodos como `save()`

3. **addCandidateController (Express)**
   - Respuesta 201 para candidato válido
   - Errores 400 por validaciones
   - Manejo de error de email duplicado
   - Mock de `Request`, `Response`, y servicio

#### Buenas prácticas:
- AAA (Arrange, Act, Assert)
- Nombres descriptivos
- Pruebas aisladas con beforeEach
- Mocks detallados
- Documentación clara en español

Entrega:
- Configuración completa de Jest (jest.config.js, setup.ts)
- Suite de pruebas dividida por módulos
- 13 pruebas como mínimo (validación, servicio, controlador)

# 📊 Prompts para Configuración de Pruebas Unitarias con Jest y TypeScript

## ✨ Contexto General

Este conjunto de prompts está diseñado para automatizar la generación y mantenimiento de pruebas unitarias con Jest en un proyecto de TypeScript. El enfoque está basado en buenas prácticas de aislamiento, validación, cobertura y mocking de servicios, controladores y modelos.

### Características del Proyecto:

* Proyecto escrito en TypeScript
* Estructura de carpetas:

  * `src/`: código fuente
  * `src/tests/`: pruebas unitarias
* Dependencias instaladas: `jest`, `ts-jest`, `@types/jest`
* Uso de `ts-jest` como preset
* Entorno `node`
* Uso de `setup.ts` como archivo de preparación
* Reportes de cobertura habilitados

---

## 📌 Prompts Específicos

### 📌 Prompt 1: Configuración Inicial de Jest

```
Configura Jest para un proyecto TypeScript con las siguientes características:
- Utiliza `ts-jest` como preset.
- Define el entorno como `node`.
- Habilita `coverage` reports.
- Agrega un archivo de setup llamado `setup.ts` que se ejecute antes de cada test.
- Establece un timeout global razonable (por ejemplo 15 segundos).
El proyecto tiene la siguiente estructura:
- `src/`: contiene el código fuente
- `src/tests/`: contiene los tests
- Las dependencias ya instaladas son: `jest`, `ts-jest`, `@types/jest`
```

### 📌 Prompt 2: Creación de `setup.ts`

```
Crea un archivo `setup.ts` para Jest que realice lo siguiente:
- Establece `process.env.NODE_ENV` en `'test'`
- Define un timeout global de 10 segundos
- Mockea `console.log` para evitar salida innecesaria durante los tests
- Asegúrate de que este código se ejecute antes de cada prueba
```

### 📌 Prompt 3: Tests de Validación de Datos (`validateCandidateData`)

```
Genera una suite de tests unitarios para la función `validateCandidateData`. Esta función valida un objeto con datos de un candidato. Los tests deben cubrir:

- Caso exitoso con todos los datos válidos
- Falta de campos obligatorios: `firstName`, `lastName`, `email`
- Formato incorrecto de `email`
- Número de teléfono inválido (debe iniciar por 6, 7 o 9)
- Fechas inválidas (no en formato YYYY-MM-DD)
- Educación inválida: faltan `institution`, `title`, o fechas
- Experiencia laboral inválida: faltan `company`, `position`, o fechas
- CV inválido: faltan `filePath` o `fileType`

Usa nombres descriptivos en español y estructura AAA (Arrange, Act, Assert).
```

### 📌 Prompt 4: Tests del Servicio de Candidato (`addCandidate`)

```
Crea pruebas unitarias para la función `addCandidate` en el servicio de dominio. Esta función guarda un candidato y sus datos relacionados. Los tests deben cubrir:

- Caso exitoso: guarda un candidato con educación y experiencia
- Manejo de error por email duplicado (simula error de Prisma código P2002)
- Mockear los modelos de dominio (Candidate, Education, WorkExperience, Resume)
- Verificar que los métodos `save()` o similares se llaman correctamente
- No debe conectarse a la base de datos real

Usa mocks detallados y asegúrate de que los tests estén aislados y documentados.
```

### 📌 Prompt 5: Tests del Controlador (`addCandidateController`)

```
Genera pruebas unitarias para el controlador `addCandidateController`, el cual maneja la solicitud HTTP para agregar un candidato. Los tests deben incluir:

- Respuesta exitosa con código 201 cuando el candidato es válido
- Respuesta 400 cuando hay errores de validación
- Manejo de error por email duplicado
- Mockear objetos de Express: `Request`, `Response`
- Mockear el servicio `candidateService` que llama internamente
- Verificar el contenido de la respuesta JSON

Usa estructura AAA y nombres descriptivos en español.
```

### 📌 Prompt 6: Estrategia de Mocking

```
Describe cómo aplicar una estrategia de mocking efectiva en Jest para un sistema que utiliza:

- Prisma como ORM
- Express como framework HTTP
- Servicios internos como capa de negocio

Incluye ejemplos de cómo mockear:
- Prisma Client
- Modelos de dominio (Candidate, Education, etc.)
- Métodos de Express: `req`, `res`, `res.status`, `res.json`
- Servicios y helpers internos

Asegúrate de que los mocks permitan pruebas unitarias aisladas y predecibles.
```

### 📌 Prompt 7: Generación de Coverage

```
Explica cómo habilitar y generar coverage en Jest para un proyecto en TypeScript. Incluye:
- Configuración de `collectCoverage` y `coverageDirectory` en `jest.config.js`
- Ejecución con `jest --coverage`
- Interpretación de los porcentajes por archivo y función
- Buenas prácticas para alcanzar al menos 80% de cobertura
```

### 📌 Prompt 8: Buenas Prácticas en Pruebas Unitarias

```
Resume las buenas prácticas para escribir pruebas unitarias efectivas con Jest en TypeScript, incluyendo:
- Uso de la estructura AAA (Arrange, Act, Assert)
- Nombres de test claros y descriptivos
- Uso de `beforeEach` para inicializar mocks
- Documentación dentro de los tests
- Separación por archivos según el módulo que se prueba
- Cómo mantener test suites sostenibles y legibles
```

### 📌 Prompt 9: Estructura de Archivos de Test

```
Proporciona una estructura recomendada de archivos para pruebas unitarias en un proyecto TypeScript con Jest:
- Código fuente en `src/`
- Tests en `src/tests/` o junto a los archivos
- Agrupación por tipo: validación, servicios, controladores
- Inclusión del archivo `setup.ts` y `jest.config.js`
Incluye ejemplo de estructura de carpetas.
```

### 📌 Prompt 10: Generador de Test para Nueva Función

````
Dada una función TypeScript con la siguiente firma:
```ts
function calculateScore(candidate: Candidate): number
````

Genera una prueba unitaria en Jest que cubra:

* Cálculo correcto con datos válidos
* Valores extremos (mínimos y máximos)
* Candidato sin experiencia ni educación
* Candidato con muchos años de experiencia
  Incluye mocks de entrada si es necesario y usa nombres en español.

```