# UCB-Service
Servicio que emplea el algoritmo [UCB](https://github.com/kurttheviking/ucb-js) para optimización de anuncios web.

![Componentes](/imgs/barras.gif)

## Prerequisitos


## Caso de aplicación
Este servicio puede aplicarse cuando una página web necesita mostrar uno de tres posibles anuncios; como por ejemplo A, B y C; y el usuario está obligado a realizar dos acciones:

1. Cerrar el anuncio.
2. Comprar el producto o ingresar a la oferta.

![escenario](/imgs/escenario.png)

Cada uno de los anuncios publicitarios tiene un porcentaje de efectividad intrínseco para promover la venta del producto o campaña. Pero, lamentablemente a priori esos valores son desconocidos, por lo que no es posible explotar el potencial del mejor de ellos. 

Bajo este escenario se puede aplicar el servicio propuesto, para la  selección en cada momento de uno de los 3 anuncios de la página web. Asimismo, conforme se vayan realizando las interacciones con el usuario, el servicio aprenderá automaticamente qué anuncio es el que está obteniendo mayores ingresos y lo seleccionará más veces que los demás. Esto sucede como se describe en el siguiente gráfico:
![flujo](/imgs/flujo.png)

## Diseño

La solución consta de 3 componentes principales. El primero, es el encargado de la lógica del algoritmo de selección UCB. El segundo, es el servicio como tal, encargado de exponer la funcionalidad. El último, es el componente de persistencia, encargado de almacenar los parámetros de decisión del algoritmo. 

![Componentes](/imgs/Diagrama_componentes.png)

El siguiente gráfico muestra cómo interactúan los componentes en el escenario indicado anteriormente:

![secuencia](/imgs/Diagrama_secuencia.png)

## Caso de estudio
[Implementación de aprendizaje automático para la selección óptima de anuncios en páginas web](/docs/CasoEstudio.pdf)
