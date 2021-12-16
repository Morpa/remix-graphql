import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData
} from "remix";

import { client } from '~/graphql/client';
import { Character, GetCharactersQuery } from "~/graphql/generated/graphql";
import { GET_CHARACTERS } from "~/graphql/queries";

import { Avatar } from "~/components/Avatar";

import styles from "~/styles/home.css";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Rick and Morty Characters",
    description: "Remix and Graphql!"
  };
};

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles
    }
  ];
};

export let loader: LoaderFunction = async () => {
  const { characters } = await client.request<GetCharactersQuery>(
    GET_CHARACTERS
  )
  return json(characters?.results);
};

export default function Index() {
  const characters = useLoaderData<Pick<Character, 'name' | 'image'>[]>();

  return (
    <main>
      <h1 className="home__title">Rick and Morty Characters</h1>
      <div className='home__grid'>
        {characters?.map(({ name, image }) => (
          <Avatar key={name} name={name} image={image} />
        ))}
      </div>
    </main>
  );
}
