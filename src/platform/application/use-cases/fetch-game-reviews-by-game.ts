import { Either, right } from '@/core/either'
import { GameReview } from '@/platform/enterprise/entities/game-review'
import { GameReviewRepository } from '../repositories/game-review-repository'

interface FetchGameReviewsByGameUseCaseRequest {
  gameId: string
  page: number
}

type FetchGameReviewsByGameUseCaseResponse = Either<
  null,
  {
    gameReviews: GameReview[]
  }
>

export class FetchGameReviewsByGameUseCase {
  constructor(private gameReviewRepository: GameReviewRepository) {}

  async execute({
    gameId,
    page,
  }: FetchGameReviewsByGameUseCaseRequest): Promise<FetchGameReviewsByGameUseCaseResponse> {
    const gameReviews = await this.gameReviewRepository.findManyByGameId(
      gameId,
      page,
    )

    return right({ gameReviews })
  }
}
