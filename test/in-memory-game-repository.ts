import { Category } from '@/core/types/category'
import { GameRepository } from '@/platform/application/repositories/game-repository'
import { Game } from '@/platform/enterprise/entities/game'

export class InMemoryGameRepository implements GameRepository {
  public items: Game[] = []

  async findById(gameId: string) {
    const game = this.items.find((item) => item.id.toString() === gameId)

    if (!game) return null

    return game
  }

  async findByAuthorId(authorId: string) {
    const games = this.items.filter(
      (item) => item.authorId,
      toString() === authorId,
    )

    return games
  }

  async findManyByCategory(category: Category) {
    const games = this.items.filter((item) => item.category === category)

    return games
  }

  async create(game: Game) {
    this.items.push(game)
  }

  async save(game: Game) {
    const gameIndex = this.items.findIndex((item) => item.id === game.id)
    this.items[gameIndex] = game
  }

  async delete(game: Game) {
    const games = this.items.filter((item) => item.id !== game.id)
    this.items = games
  }
}
