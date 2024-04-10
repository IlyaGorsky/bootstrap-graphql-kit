// Для запуска yarn demo-1

import { Fetcher } from "./fetcher";

const fetcher = new Fetcher('https://rickandmortyapi.com/graphql');


const response = await fetcher.query(/* GraphQL */`
  query {
    characters(page: 2, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
}
`)

console.log('response', JSON.stringify(response.data, null, 2));


