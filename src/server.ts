import express from 'express'
import cors from 'cors'
import {v4 as uuid} from 'uuid'

const app = express();
app.use(express.json())
app.use(cors({origin: '*'}))

//Query params => fazer filtros, paginação no backend etc
//Route params => especificar/idetificar um recurso, geralmente usado em post/put
//Request body => quando mandamos coisas para a API, pelo body  

interface User{
    id: string,
    name: string,
    email: string
}
const users: User[] = [];

//Métodos HTTP
app.get('/users', (request, response) =>{
    //buscar o usuarios no banco de dados
    return response.json(users)
})

app.post('/users', (request, response) =>{
    //receber os dados do novo usuário
    const {name, email} = request.body

    //criar novo user
    const user = {id: uuid(), name, email}

    //registar user na base de dados
    users.push(user)

    return response.json(user)
})

app.put('/users/:id', (request, response) =>{
    //receber os dados do usuário
    const {id} = request.params
    const {email, name} = request.body

    //localizar o user na base de dados
    const userIndex = users.findIndex((user) => user.id === id)

    //se não existir retornar um erro
    if(userIndex < 0){
        return response.status(404).json({error: 'User not found'})
    }
    //atualizar ele na base de dados
    const user = {id, name, email}
    users[userIndex] = user

    return response.json(user)
})

app.delete('/users/:id', (request, response) =>{
   //receber id do user
   const {id} = request.params

   const userIndex = users.findIndex((user) => user.id === id)

   //se não existir retornar um erro
   if(userIndex < 0){
       return response.status(404).json({error: 'User not found'})
   }

   //excluir
   users.splice(userIndex,1)

   return response.status(204).send()

})

app.listen('3333', ()=>{
    console.log('Back-end started')
})