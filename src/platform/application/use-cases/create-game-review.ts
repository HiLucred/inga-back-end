import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GameReview } from '@/platform/enterprise/entities/game-review'
import { GameRepository } from '../repositories/game-repository'
import { GameReviewRepository } from '../repositories/game-review-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateGameReviewUseCaseRequest {
  authorId: string
  gameId: string
  description: string
  rating: number
}

type CreateGameReviewUseCaseResponse = Either<
  ResourceNotFoundError,
  { gameReview: GameReview }
>

export class CreateGameReviewUseCase {
  constructor(
    private gameRepository: GameRepository,
    private gameReviewRepository: GameReviewRepository,
  ) {}

  async execute({
    authorId,
    gameId,
    description,
    rating,
  }: CreateGameReviewUseCaseRequest): Promise<CreateGameReviewUseCaseResponse> {
    const game = await this.gameRepository.findById(gameId)

    if (!game) {
      return left(new ResourceNotFoundError())
    }

    const gameReview = GameReview.create({
      authorId: new UniqueEntityID(authorId),
      description,
      gameId: new UniqueEntityID(gameId),
      rating,
    })

    await this.gameReviewRepository.create(gameReview)

    return right({ gameReview })
  }
}
