import { gql } from '@apollo/client';
export const CREATE_TODO = gql`
mutation CreateTodo(
    $desc: String!,
    $status: String!,
    $task: String!
    ){
    createTodo(
        desc: $desc,
        status: $status,
        task: $task
        ){
    ok,
      todo{
        task
        desc      
        id
        status
      }
  }
  }`

export const UPDATE_TODO = gql`
  mutation UpdateTodo($desc: String!,
    $id: Int!,
    $status: String!,
    $task: String!){
    updateTodo(id:$id,status:$status,desc:$desc,task:$task){
    ok,
      todo{
        task
        desc      
        id
        status
      }
    }
  }`

  export const DELETE_TODO = gql`
  mutation DeleteTodo($id:Int!){
    deleteTodo(id:$id){
      ok
      todoMsg
    }
  }`