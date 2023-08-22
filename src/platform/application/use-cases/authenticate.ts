import { Either, left, right } from '@/core/either'
import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { GameAuthor } from '@/platform/enterprise/entities/game-author'
import { GameAuthorRepository } from '../repositories/game-author-repository'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    gameAuthor: GameAuthor
  }
>

export class AuthenticateUseCase {
  constructor(private gameAuthorRepository: GameAuthorRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const gameAuthor = await this.gameAuthorRepository.findByEmail(email)

    if (!gameAuthor) {
      return left(new InvalidCredentialsError())
    }

    const doesPassWordMatch = await compare(password, gameAuthor.password)

    if (!doesPassWordMatch) {
      return left(new InvalidCredentialsError())
    }

    return right({ gameAuthor })
  }
}
