import { Category } from '@/core/types/category'
import { Game } from '@/platform/enterprise/entities/game'

export interface GameRepository {
  findById(gameId: string): Promise<Game | null>
  findByAuthorId(authorId: string): Promise<Game[]>
  findManyByCategory(category: Category): Promise<Game[]>
  create(game: Game): Promise<void>
  delete(game: Game): Promise<void>
  save(game: Game): Promise<void>
}
