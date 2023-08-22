import { GameAuthorRepository } from '@/platform/application/repositories/game-author-repository'
import { GameAuthor } from '@/platform/enterprise/entities/game-author'

export class InMemoryGameAuthorRepository implements GameAuthorRepository {
  public items: GameAuthor[] = []

  async findById(gameAuthorId: string) {
    const gameAuthor = this.items.find(
      (item) => item.id.toString() === gameAuthorId,
    )

    if (!gameAuthor) return null

    return gameAuthor
  }

  async findByEmail(email: string) {
    const gameAuthor = this.items.find((item) => item.email === email)

    if (!gameAuthor) return null

    return gameAuthor
  }

  async create(gameAuthor: GameAuthor) {
    this.items.push(gameAuthor)
  }
}
