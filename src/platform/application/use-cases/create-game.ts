import { Popularity } from '@/platform/enterprise/object-value/popularity'
import { Game } from '@/platform/enterprise/entities/game'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GameRepository } from '../repositories/game-repository'
import { Either, right } from '@/core/either'
import { Category } from '@/core/types/category'

interface CreateGameUseCaseRequest {
  gameAuthorId: string
  title: string
  description?: string
  category: Category
  cover?: string
  link: string
  popularity?: Popularity
}

type CreateGameUseCaseResponse = Either<
  null,
  {
    game: Game
  }
>

export class CreateGameUseCase {
  constructor(private gameRepository: GameRepository) {}

  async execute({
    gameAuthorId,
    title,
    description,
    category,
    cover,
    link,
    popularity,
  }: CreateGameUseCaseRequest): Promise<CreateGameUseCaseResponse> {
    const game = Game.create({
      authorId: new UniqueEntityID(gameAuthorId),
      title,
      description,
      category,
      cover,
      link,
      popularity,
    })

    await this.gameRepository.create(game)

    return right({ game })
  }
}
