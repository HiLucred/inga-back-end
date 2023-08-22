import { Either, left, right } from '@/core/either'
import { UserAlreadyExistsError } from '@/core/errors/user-already-exists-error'
import { GameAuthor } from '@/platform/enterprise/entities/game-author'
import { hash } from 'bcryptjs'
import { GameAuthorRepository } from '../repositories/game-author-repository'

interface CreateGameAuthorUseCaseRequest {
  name: string
  email: string
  password: string
  description: string
  profilePhoto: string
}

type CreateGameAuthorUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    gameAuthor: GameAuthor
  }
>

export class CreateGameAuthorUseCase {
  constructor(private gameAuthorRepository: GameAuthorRepository) {}

  async execute({
    name,
    email,
    password,
    description,
    profilePhoto,
  }: CreateGameAuthorUseCaseRequest): Promise<CreateGameAuthorUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const gameAuthorWithSameEmail =
      await this.gameAuthorRepository.findByEmail(email)

    if (gameAuthorWithSameEmail) {
      return left(new UserAlreadyExistsError())
    }

    const gameAuthor = GameAuthor.create({
      name,
      email,
      description,
      password: passwordHash,
      profilePhoto,
    })

    await this.gameAuthorRepository.create(gameAuthor)

    return right({ gameAuthor })
  }
}
