import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGameAuthorRepository } from 'test/in-memory-game-author-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { makeCreateGameAuthor } from 'test/factories/make-create-game-author'

let inMemoryGameAuthorRepository: InMemoryGameAuthorRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryGameAuthorRepository = new InMemoryGameAuthorRepository()
    sut = new AuthenticateUseCase(inMemoryGameAuthorRepository)
  })

  it('shoud be able to authenticate', async () => {
    const newGameAuthor = makeCreateGameAuthor({
      password: await hash('password123', 6),
    })

    await inMemoryGameAuthorRepository.create(newGameAuthor)

    const result = await sut.execute({
      email: newGameAuthor.email,
      password: 'password123',
    })

    expect(result.isRight()).toEqual(true)

    if (result.isRight()) {
      expect(result.value.gameAuthor).toEqual(
        expect.objectContaining({
          name: newGameAuthor.name,
          email: newGameAuthor.email,
        }),
      )
    }
  })
})
