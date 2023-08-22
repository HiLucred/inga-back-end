import { Either, left, right } from '@/core/either'
import { UserNotFoundError } from '@/core/errors/user-not-found-error'
import { Game } from '@/platform/enterprise/entities/game'
import { GameAuthor } from '@/platform/enterprise/entities/game-author'
import { GameReview } from '@/platform/enterprise/entities/game-review'
import { GameRepository } from '../repositories/game-repository'
import { GameReviewRepository } from '../repositories/game-review-repository'
import { GameAuthorRepository } from '../repositories/game-author-repository'

interface GetGameAuthorAnalyticsSummaryUseCaseRequest {
  gameAuthorId: string
}

type GetGameAuthorAnalyticsSummaryUseCaseResponse = Either<
  UserNotFoundError,
  {
    gameAuthorAnalyticsSummary: {
      gameAuthor: GameAuthor
      gamesCreated: Game[]
      reviewsGiven: GameReview[]
      totalGamesCreated: number
      totalReviewsGiven: number
    }
  }
>

export class GetGameAuthorAnalyticsSummaryUseCase {
  constructor(
    private gameAuthorRepository: GameAuthorRepository,
    private gameRepository: GameRepository,
    private gameReviewRepository: GameReviewRepository,
  ) {}

  async execute({
    gameAuthorId,
  }: GetGameAuthorAnalyticsSummaryUseCaseRequest): Promise<GetGameAuthorAnalyticsSummaryUseCaseResponse> {
    const gameAuthor = await this.gameAuthorRepository.findById(gameAuthorId)

    if (!gameAuthor) {
      return left(new UserNotFoundError())
    }

    const gamesCreated = await this.gameRepository.findByAuthorId(gameAuthorId)

    const reviewsGiven =
      await this.gameReviewRepository.findManyByAuthorId(gameAuthorId)

    const totalGamesCreated = gamesCreated.length
    const totalReviewsGiven = reviewsGiven.length

    const gameAuthorAnalyticsSummary = {
      gameAuthor,
      gamesCreated,
      reviewsGiven,
      totalGamesCreated,
      totalReviewsGiven,
    }

    return right({ gameAuthorAnalyticsSummary })
  }
}
