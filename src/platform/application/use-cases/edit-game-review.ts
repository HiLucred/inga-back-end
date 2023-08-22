import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { GameReview } from '@/platform/enterprise/entities/game-review'
import { GameReviewRepository } from '../repositories/game-review-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface EditGameReviewUseCaseRequest {
  authorId: string
  gameReviewId: string
  description: string
  rating: number
}

type EditGameReviewUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    gameReview: GameReview
  }
>

export class EditGameReviewUseCase {
  constructor(private gameReviewRepository: GameReviewRepository) {}

  async execute({
    gameReviewId,
    authorId,
    description,
    rating,
  }: EditGameReviewUseCaseRequest): Promise<EditGameReviewUseCaseResponse> {
    const gameReview = await this.gameReviewRepository.findById(gameReviewId)

    if (!gameReview) {
      return left(new ResourceNotFoundError())
    }

    if (gameReview.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    gameReview.description = description
    gameReview.rating = rating

    await this.gameReviewRepository.save(gameReview)

    return right({ gameReview })
  }
}
