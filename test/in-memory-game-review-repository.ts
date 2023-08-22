import { GameReviewRepository } from '@/platform/application/repositories/game-review-repository'
import { GameReview } from '@/platform/enterprise/entities/game-review'

export class InMemoryGameReviewRepository implements GameReviewRepository {
  public items: GameReview[] = []

  async findById(gameReviewId: string) {
    const gameReview = this.items.find(
      (item) => item.id.toString() === gameReviewId,
    )

    if (!gameReview) return null

    return gameReview
  }

  async findMany(page: number) {
    const gameReviews = this.items.slice((page - 1) * 20, page * 20)

    return gameReviews
  }

  async findManyByGameId(gameId: string, page: number) {
    const gameReviews = this.items
      .filter((item) => item.gameId.toString() === gameId)
      .slice((page - 1) * 20, page * 20)

    return gameReviews
  }

  async findManyByAuthorId(authorId: string) {
    const gameReviews = this.items.filter(
      (item) => item.authorId.toString() === authorId,
    )

    return gameReviews
  }

  async create(gameReview: GameReview) {
    this.items.push(gameReview)
  }

  async save(gameReview: GameReview) {
    const gameReviewIndex = this.items.findIndex(
      (item) => item.id === gameReview.id,
    )

    this.items[gameReviewIndex] = gameReview
  }

  async delete(gameReview: GameReview) {
    const gameReviews = this.items.filter((item) => item.id !== gameReview.id)

    this.items = gameReviews
  }
}
