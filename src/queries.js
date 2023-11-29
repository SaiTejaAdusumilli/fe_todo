import { gql } from '@apollo/client';
export const ALL_TODO_DATA = gql`
query allTodoData{
    allTodoData{
      task,
      status,
      desc,
      id
    }
  }`