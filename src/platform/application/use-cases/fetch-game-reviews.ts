import { Either, right } from '@/core/either'
import { GameReview } from '@/platform/enterprise/entities/game-review'
import { GameReviewRepository } from '../repositories/game-review-repository'

interface FetchGameReviewsUseCaseRequest {
  page: number
}

type FetchGameReviewsUseCaseResponse = Either<
  null,
  {
    gameReviews: GameReview[]
  }
>

export class FetchGameReviewsUseCase {
  constructor(private gameReviewRepository: GameReviewRepository) {}

  async execute({
    page,
  }: FetchGameReviewsUseCaseRequest): Promise<FetchGameReviewsUseCaseResponse> {
    const gameReviews = await this.gameReviewRepository.findMany(page)

    return right({ gameReviews })
  }
}
