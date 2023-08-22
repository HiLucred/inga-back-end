import { Either, right } from '@/core/either'
import { GameReview } from '@/platform/enterprise/entities/game-review'
import { GameReviewRepository } from '../repositories/game-review-repository'

interface FetchGameReviewsByAuthorUseCaseRequest {
  authorId: string
}

type FetchGameReviewsByAuthorUseCaseResponse = Either<
  null,
  {
    gameReviews: GameReview[]
  }
>

export class FetchGameReviewsByAuthorUseCase {
  constructor(private gameReviews: GameReviewRepository) {}

  async execute({
    authorId,
  }: FetchGameReviewsByAuthorUseCaseRequest): Promise<FetchGameReviewsByAuthorUseCaseResponse> {
    const gameReviews = await this.gameReviews.findManyByAuthorId(authorId)

    return right({ gameReviews })
  }
}
