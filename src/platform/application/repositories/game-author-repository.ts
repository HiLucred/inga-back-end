import { GameAuthor } from '@/platform/enterprise/entities/game-author'

export interface GameAuthorRepository {
  findById(gameAuthorId: string): Promise<GameAuthor | null>
  findByEmail(email: string): Promise<GameAuthor | null>
  create(gameAuthor: GameAuthor): Promise<void>
}
