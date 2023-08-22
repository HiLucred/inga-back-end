import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  GameAuthor,
  GameAuthorProps,
} from '@/platform/enterprise/entities/game-author'
import { faker } from '@faker-js/faker'

export function makeCreateGameAuthor(
  override: Partial<GameAuthorProps> = {},
  id?: UniqueEntityID,
) {
  const gameAuthor = GameAuthor.create(
    {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      description: faker.person.bio(),
      profilePhoto: faker.image.avatarGitHub(),
      ...override,
    },
    id,
  )

  return gameAuthor
}
