import { LinksFunction } from 'remix'

import { Character } from '~/graphql/generated/graphql'

import styles from './styles.css'

export type AvatarProps = Pick<Character, 'name' | 'image'>

const placeholderImage =
  'https://rickandmortyapi.com/api/character/avatar/19.jpeg'

const placeholderName = 'Rick and Morty Character'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export const Avatar = ({ name, image }: AvatarProps) => (
  <main className="avatar__main">
    <img
      className="avatar__image"
      src={image || placeholderImage}
      width={300}
      height={300}
      alt={name || placeholderName}
    />
    <h2 className="avatar__title">{name || placeholderName}</h2>
  </main>
)
