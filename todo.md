# Tareas
[] Crear una clase para permitir el scroll dentro de router-outlet
[] organizar variables de estilos de manera global
[] Cards Grandes y pequeñas
[] default cover en reproductor para cuando no cargue nada
[] Avanzar alante y atrás en con el reproductor

## Search Page
[] Buscador de canciones
[] Actualizar contenido del componente 
[] Maquetar Correctamente cards

[] artist-card: utilizar componentes globales para hover y play button.
[] Poner la sección de overview con datos estáticos apuntado a mi backend



# ERRORES:
- Cuando en la card le doy al boton de play cuando ya está sonando, vuelve a comenzar la cancion desde el principio otra vez.
- GET http://localhost:4200/assets/privacy-icon.svg 404 (Not Found)
- home-routing.module.ts:18 ERROR TypeError: Cannot read properties of undefined (reading 'artists') at SearchPageComponent_Template (search-page.component.html:5:27)




## DUDAS
Mover shared-footer a home al lado de router outlet? o dejarlo en cada módulo?
En el caso de que lo mueva, aplicar los estilos de  g-page-container en el padre de outlet