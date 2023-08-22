import { Either, left, right } from '@/core/either'
import { GameRepository } from '../repositories/game-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface GiveLikeInTheGameUseCaseRequest {
  gameId: string
}

type GiveLikeInTheGameUseCaseResponse = Either<ResourceNotFoundError, object>

export class GiveLikeInTheGameUseCase {
  constructor(private gameRepository: GameRepository) {}

  async execute({
    gameId,
  }: GiveLikeInTheGameUseCaseRequest): Promise<GiveLikeInTheGameUseCaseResponse> {
    const game = await this.gameRepository.findById(gameId)

    if (!game) {
      return left(new ResourceNotFoundError())
    }

    game.popularity.setLike()

    await this.gameRepository.save(game)

    return right({})
  }
}
