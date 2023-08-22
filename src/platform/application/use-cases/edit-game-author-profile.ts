import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { GameAuthorRepository } from '../repositories/game-author-repository'

interface EditGameAuthorProfileUseCaseRequest {
  authorId: string
  description: string
  profilePhoto: string
}

type EditGameAuthorProfileUseCaseResponse = Either<NotAllowedError, object>

export class EditGameAuthorProfileUseCase {
  constructor(private gameAuthorRepositry: GameAuthorRepository) {}

  async execute({
    authorId,
    description,
    profilePhoto,
  }: EditGameAuthorProfileUseCaseRequest): Promise<EditGameAuthorProfileUseCaseResponse> {
    const gameAuthor = await this.gameAuthorRepositry.findById(authorId)

    if (!gameAuthor) {
      return left(new NotAllowedError())
    }

    gameAuthor.description = description
    gameAuthor.profilePhoto = profilePhoto

    return right({})
  }
}
