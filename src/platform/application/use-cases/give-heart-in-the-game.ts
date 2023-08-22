import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GameRepository } from '../repositories/game-repository'

interface GiveHeartInTheGameRequest {
  gameId: string
}

type GiveHeartInTheGameResponse = Either<ResourceNotFoundError, object>

export class GiveHeartInTheGame {
  constructor(private gameRepository: GameRepository) {}

  async execute({
    gameId,
  }: GiveHeartInTheGameRequest): Promise<GiveHeartInTheGameResponse> {
    const game = await this.gameRepository.findById(gameId)

    if (!game) {
      return left(new ResourceNotFoundError())
    }

    game.popularity.setHeart()

    return right({})
  }
}
