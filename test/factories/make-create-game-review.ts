import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  GameReview,
  GameReviewProps,
} from '@/platform/enterprise/entities/game-review'
import { faker } from '@faker-js/faker'

export function makeCreateGameReview(
  override: Partial<GameReviewProps> = {},
  id?: UniqueEntityID,
) {
  const gameReview = GameReview.create(
    {
      rating: 4,
      description: faker.person.bio(),
      gameId: new UniqueEntityID('game-01'),
      authorId: new UniqueEntityID('author-01'),
      ...override,
    },
    id,
  )

  return gameReview
}
