import { Either, right } from '@/core/either'
import { Category } from '@/core/types/category'
import { Game } from '@/platform/enterprise/entities/game'
import { GameRepository } from '../repositories/game-repository'

interface FetchGamesByCategoryRequest {
  category: Category
}

type FetchGamesByCategoryResponse = Either<
  null,
  {
    games: Game[]
  }
>

export class FetchGamesByCategory {
  constructor(private gameRepository: GameRepository) {}

  async execute({
    category,
  }: FetchGamesByCategoryRequest): Promise<FetchGamesByCategoryResponse> {
    const games = await this.gameRepository.findManyByCategory(category)

    return right({ games })
  }
}
