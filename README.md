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
