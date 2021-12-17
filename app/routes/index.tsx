import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useFetcher,
  useLoaderData
} from 'remix'
import { useEffect, useState } from 'react'

import { client } from '~/graphql/client'
import { Character, GetCharactersQuery } from '~/graphql/generated/graphql'
import { GET_CHARACTERS } from '~/graphql/queries'

import { Avatar, links as stylesAvatar } from '~/components/Avatar'

import styles from '~/styles/home.css'

export const meta: MetaFunction = () => {
  return {
    title: 'Remix Rick and Morty Characters',
    description: 'Remix and Graphql!'
  }
}

export const links: LinksFunction = () => {
  return [
    ...stylesAvatar(),
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)

  const pageNumber = url.searchParams.get('page')

  const variables = { page: Number(pageNumber) }

  const { characters } = await client.request<GetCharactersQuery>(
    GET_CHARACTERS,
    variables
  )

  return json(characters?.results)
}

type CharactersProps = Pick<Character, 'id' | 'name' | 'image'>[]

export default function Index() {
  const characters = useLoaderData<CharactersProps>()
  const [results, setResults] = useState<CharactersProps>(characters)
  const [page, setPage] = useState(2)
  const fetcher = useFetcher()

  const handleLoadMore = () => {
    setPage(page + 1)
    fetcher.submit(new URLSearchParams(`page=${page}`))
  }

  useEffect(() => {
    if (fetcher.data) {
      setResults((prevResults) => [...prevResults, ...fetcher.data])
    }
  }, [fetcher.data])

  return (
    <main className="home__wrapper">
      <h1 className="home__title">Rick and Morty Characters</h1>
      <div className="home__grid">
        {results?.map(({ id, name, image }) => (
          <Avatar key={id} name={name} image={image} />
        ))}
      </div>
      {results.length && (
        <button
          disabled={fetcher.state === 'submitting'}
          onClick={handleLoadMore}
        >
          Load more
        </button>
      )}
    </main>
  )
}
