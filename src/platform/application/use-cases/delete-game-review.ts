import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { GameReviewRepository } from '../repositories/game-review-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface DeleteGameReviewUseCaseRequest {
  authorId: string
  gameReviewId: string
}

type DeleteGameReviewUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  object
>

export class DeleteGameReviewUseCase {
  constructor(private gameReviewRepository: GameReviewRepository) {}

  async execute({
    authorId,
    gameReviewId,
  }: DeleteGameReviewUseCaseRequest): Promise<DeleteGameReviewUseCaseResponse> {
    const gameReview = await this.gameReviewRepository.findById(gameReviewId)

    if (!gameReview) {
      return left(new ResourceNotFoundError())
    }

    if (gameReview.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.gameReviewRepository.delete(gameReview)

    return right({})
  }
}
