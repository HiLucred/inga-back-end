import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Game } from '@/platform/enterprise/entities/game'
import { GameRepository } from '../repositories/game-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface EditGameUseCaseRequest {
  gameId: string
  authorId: string
  title: string
  description: string
  cover: string
  link: string
}

type EditGameUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { game: Game }
>

export class EditGameUseCase {
  constructor(private gameRepository: GameRepository) {}

  async execute({
    gameId,
    authorId,
    title,
    description,
    cover,
    link,
  }: EditGameUseCaseRequest): Promise<EditGameUseCaseResponse> {
    const game = await this.gameRepository.findById(gameId)

    if (!game) {
      return left(new ResourceNotFoundError())
    }

    if (game.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    game.title = title
    game.description = description
    game.cover = cover
    game.link = link

    await this.gameRepository.save(game)

    return right({ game })
  }
}
