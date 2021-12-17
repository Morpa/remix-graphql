import { gql } from 'graphql-request'

export const GET_CHARACTERS = gql`
  query getCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
    }
  }
`
