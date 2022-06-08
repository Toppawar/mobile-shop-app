# Demo

Demo desplegada con Vercel

[https://mobile-shop-app.vercel.app/](https://mobile-shop-app.vercel.app/)

# Resumen

Se ha realizado la creación de una SPA siguiendo el siguiente modelo.

Una plataforma donde poder visualizar un listado de teléfonos móviles que incluye un buscador.
Al hacer click en uno de los teléfonos se realiza la redirección a una página detallada con:

- Las especificaciones generales del producto.
- Una `overview` donde se selecciona la memória y el color.

Cuando se pulse en el botón de `Add to cart` se mostrará una notificación al usuario y aparecerá un carrito con el número de productos añadidos al mismo en la parte superior derecha del `Header`.

## Tecnologías utilizadas

### Persistencia de datos

En este caso se han distribuido de dos maneras.

1. En la persistencia de datos durante la sesión del cliente en la app mediante `SWR (1)`.
2. Persistencia en el `localStorage` que mantiene el carrito.

Se cumple la funcionalidad de no renovar los datos durante una hora no solo en el listado de productos si no tambien en cada uno de ellos.
Además, como mejora se ha añadido un `Lazy Load` en el listado para que en vez de cargar todas las imágenes de la lista, solo se obtengan mediante un `IntersectionObserver`.

### Diseño

Se ha mantenido la estructura indicada en el PDF pero con ciertos retoques. En cuanto a los componentes se han utilizado como base la libreria de `Chakra UI (2)`.
Además, se ha implementado la libreria de `react-icons (3)` para la iconografia (que además es compatible con la libreria de componentes).

Estas son las dependencias de mayor calibre en cuanto al proyecto. El resto son para la realización de Tests, animaciones/transiciones y la configuración de `eslint`

## Scripts

En el proyecto se pueden ejecutar los siguientes scripts

### `npm start`

Ejecuta la app en modo desarrollo.<br />
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.

La página se actualiza cuando se realizan cambios en el entorno.<br />
También veras todos los errores que proporciona lint en la consola.

### `npm test`

Ejecuta todos los test de forma interactiva en la consola.<br />

### `npm run build`

Construye la app para el entorno de producción generando una carpeta `build`.<br />
Empaqueta correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

### `npm run lint`

Ejecuta el linter en la aplicación y en caso de encontrar errores puede:

1. Arreglarlos automaticamente.
2. En caso de requerir intervención, se mostrara un error en el log despues de ejecutar el linter.

### Referencias

1. [SWR - Stale While Revalidate](https://swr.vercel.app/es-ES)

2. [Chakra UI](https://chakra-ui.com/)

3. [React Icons](https://react-icons.github.io/react-icons/)

## Mejoras a implementar

1. Añadir unos cuantos test más.
2. Implementar GitHub Actions para manejar un workflow automatizado incluyendo las pruebas CI/CD antes de cualquier Merge / Despliegue.
