## 1
En el siguiente script escrito en typescript se utiliza para traer un user de una api ficticia y hacer una operación con el nombre de dicho user:

```typescript
import axios from 'axios'

const useUserName = (name: string) => { /* Do stuff with the name */ }

type ApiUser = {
    id: number;
    name: string;
}

const fetchUserFromApi = async () => {
    const response: any = await axios.get('https://myawesomeapi/user/123')

    return response as ApiUser
}

const main = async () => {
    const user = await fetchUserFromApi()
    useUserName(user.name)
}

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))

```
Después de unos meses de este código funcionando sin problema, a la api se le cambia el shape del user, pasando de:
```typescript
type User = { id: number; name: string }
```
A:
```typescript
type User = { id: number; displayName: string }
```
Con lo cual, naturalmente el script falla, que sugieres modificar en el script no solo para que no falle con el nuevo shape, sino que valide el shape del user antes de procesarlo?

### Nota: No tenemos control de la api, solo del codigo presentado

## 2
Dados los siguientes types:

```typescript
type DNode = Div | Button

type Div = {
    id: string;
    children: DNode[];
}

type Button = {
    id: string;
    color: string;
    children: string;
}

type GetNodeById = (node: DNode, id: string) => DNode | undefined

```
Escribir una función llamada getNodeById con el type indicado por GetNodeById, cuyo propósito es tomar un nodo y buscar en el mismo o en sus hijos el nodo que tenga el id proporcionado, si no se encuentra alguno retornara undefined.
La funcion debera pasar los siguientes tests:

```typescript
const div3: Div = {
    id: 'div3',
    children: [{ id: 'button2', color: 'yellow', children: 'Hi' }],
}

const mainDiv: Div = {
    id: 'div1',
    children: [
        { id: 'div2', children: [] },
        { id: 'button1', color: 'red', children: 'Click here' },
        div3,
    ],
}

const founded1 = getNodeById(mainDiv, 'div3')

console.log('Must be true: ', founded1 === div3)

const founded2 = getNodeById(mainDiv, 'div4')

console.log('Must be undefined: ', founded2)
```

## 3
La siguiente función tarda mucho tiempo en ejecutarse en node:
```typescript
const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

const slowFunction = async () => {
    for (let i = 0; i < userIds.length; i += 1) {
        const userId = userIds[i]
        await axios.post(`https://myawesomeapi/user/${userId}/markAsCompleted`)
    }
}
```
Escribir una version mas rapida de esta función que haga justo lo mismo

## 4
La siguiente función, descarga un archivo de un servidor, hace un proceso en el cliente y borra el archivo al terminar

```typescript
const processServerFile = async () => {
    const temporalDir = `/home/myawesomepc/temporalserverfiledir`

    // Ensure the dir exist on machine
    await fs.ensureDir(temporalDir)

    // Downloads the file from remote server and stores it on
    // the dir passed as parameter
    await downloadFileFromServer({
        to: temporalDir,
    })

    // Runs a process with the file stored on the dir
    await processTemporalFile({
        from: temporalDir,
    })

    await fs.remove(temporalDir)
}
```
El problema es que al validar el directorio en la máquina que corre esta función, nos dimos cuenta de que a veces no se borra el archivo al terminar la función.
La razón es por que truena ya sea la función de descarga o la de procesar y por lo tanto nunca llega a la parte de borrar.
¿Cómo aseguramos que siempre se limpie el directorio, incluso cuando falle alguna parte de la función?

## 5
Imagina el siguiente caso:

Se tiene una base de datos no relacional que puede verse con un Json, el siguiente es un ejemplo de dicha base:

```json
{
    "Stores": {
        "storeId1": {
            "name": "Store1",
            "Products": {
                "productId1": {
                    "name": "Milk 1",
                    "price": 23.0
                },
                "productId2": {
                    "name": "Milk 2",
                    "price": 50.0
                }
            }
        }
    }
}
```

La estructura de dicha base siempre es: /${COLLECTION}/${ID}/content
Donde COLLECTION es en nuestro ejemplo: Stores, ID son identificadores de cada elemento del collection y content es un object que puede contener props normales o nuevas collections como es el caso de "Products", esta estructura puede estar arbitrariamente nesteada.

Dada esta estructura de base de datos, requerimos poder agregar elementos a cualquier COLLECTION mediante una tabla de excel.

Para ello, se requiere dos funciones escritas en javascript, una que tome como entrada el json de la base de datos y genere un archivo excel que tenga la estructura y datos del json representados en tablas y la otra funcion tome el path al archivo excel y retorne el json en base a la informacion en excel.

Se dejan url a ejemplo de json y su correspondiente excel:

https://apphive-test-examples.s3.amazonaws.com/database1.json
https://apphive-test-examples.s3.amazonaws.com/excel1.xlsx

### NOTA: El programa debe funcionar con cualquier json que tenga la estructura indicada, no solo con el ejemplo
