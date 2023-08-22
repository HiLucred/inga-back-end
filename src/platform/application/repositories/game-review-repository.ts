import { GameReview } from '@/platform/enterprise/entities/game-review'

export interface GameReviewRepository {
  findById(gameReviewId: string): Promise<GameReview | null>
  findMany(page: number): Promise<GameReview[]>
  findManyByGameId(gameId: string, page: number): Promise<GameReview[]>
  findManyByAuthorId(authorId: string): Promise<GameReview[]>
  create(gameReview: GameReview): Promise<void>
  save(gameReview: GameReview): Promise<void>
  delete(gameReview: GameReview): Promise<void>
}
