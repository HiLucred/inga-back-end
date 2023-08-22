import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Game, GameProps } from '@/platform/enterprise/entities/game'
import { faker } from '@faker-js/faker'

export function makeCreateGame(
  override: Partial<GameProps> = {},
  id?: UniqueEntityID,
) {
  const game = Game.create(
    {
      title: faker.lorem.word(),
      description: faker.person.bio(),
      link: faker.internet.url(),
      category: 'Puzzle',
      authorId: new UniqueEntityID('author-01'),
      ...override,
    },
    id,
  )

  return game
}
