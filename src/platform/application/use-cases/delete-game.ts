import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { GameRepository } from '../repositories/game-repository'

interface DeleteGameUseCaseRequest {
  gameId: string
  authorId: string
}

type DeleteGameUseCaseResponse = Either<NotAllowedError, object>

export class DeleteGameUseCase {
  constructor(private gameRepository: GameRepository) {}

  async execute({
    gameId,
    authorId,
  }: DeleteGameUseCaseRequest): Promise<DeleteGameUseCaseResponse> {
    const game = await this.gameRepository.findById(gameId)

    if (!game) {
      return left(new NotAllowedError())
    }

    if (game.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.gameRepository.delete(game)

    return right({})
  }
}
