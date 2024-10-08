# Aplicación de Galería de Imágenes

Esta es una aplicación web construida con React y Vite. La aplicación muestra una galería de tarjetas (cards) de imágenes obtenidas desde un servicio de backend y permite a los usuarios dar "like" a las imágenes. Las tarjetas se renderizan dinámicamente a medida que se hace scroll (scroll infinito), y los likes se envían al backend mediante peticiones `POST`.

## Características

- Muestra una serie de tarjetas de imágenes obtenidas desde un backend.
- Scroll infinito para cargar más tarjetas a medida que se navega hacia abajo.
- Posibilidad de dar "like" a las imágenes, lo que envía una petición `POST` al backend.
- Tests unitarios implementados con Vitest y React Testing Library.

## Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Axios](https://axios-http.com/) (para hacer las peticiones HTTP)
- [SCSS](https://sass-lang.com/) (para los estilos)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/Felipelo94/mds

   ```

2. Navega al directorio del proyecto:

   ```bash
   cd mds

   ```

3. Instala las dependencias:

```bash
 npm install
```

4. Inicia la aplicación en modo desarrollo:

```bash
 npm run dev
```

5. Accede a la aplicación en tu navegador en http://localhost:3000.

## Backend

El backend está alojado en http://localhost:3100/images. Los endpoints utilizados son:

- GET /images: Devuelve una lista de imágenes con sus respectivos datos.
- POST /images/:id/likes: Incrementa el contador de "likes" de una imagen específica.

### Cómo funciona

- Estructura del proyecto

```
└── 📁infinite-vite
    └── 📁public
        └── icon.svg
    └── 📁src
        └── 📁api
            └── httpsService.test.ts
            └── httpsService.ts
        └── 📁components
            └── 📁atoms
                └── 📁card
                    └── card.scss
                    └── card.test.tsx
                    └── card.tsx
            └── 📁layout
                └── layout.tsx
            └── 📁molecules
                └── 📁cardGroup
                    └── cardGroup.scss
                    └── cardGroup.tsx
                └── 📁navBar
                    └── navbar.scss
                    └── navbar.tsx
            └── 📁organism
                └── 📁homeContent
                    └── homeContent.scss
                    └── homeContent.tsx
        └── 📁context
            └── navbarContext.tsx
            └── useNavbarContext.tsx
        └── 📁services
            └── getSearchResult.test.ts
            └── getSearchResult.ts
            └── postLike.ts
            └── postLikes.test.ts
        └── 📁types
            └── api.ts
        └── App.tsx
        └── index.scss
        └── main.tsx
        └── vite-env.d.ts
    └── .gitignore
    └── eslint.config.js
    └── index.html
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.node.json
    └── vite.config.ts
```

- Scroll Infinito
  La aplicación carga inicialmente una cantidad limitada de tarjetas desde el backend. A medida que el usuario hace scroll, se hacen nuevas peticiones GET a http://localhost:3100/images para obtener más tarjetas y se agregan a la galería.

- Dar "Like" a una Imagen
  Cada tarjeta tiene un botón de "like". Al hacer clic en este botón, se realiza una petición POST a http://localhost:3100/images/:id/likes para incrementar el contador de likes de la imagen seleccionada.

- Tests
  Los tests unitarios están implementados con Vitest y React Testing Library.
