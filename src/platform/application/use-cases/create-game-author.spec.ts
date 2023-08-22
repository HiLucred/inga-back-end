import { describe, it, beforeEach, expect } from 'vitest'
import { CreateGameAuthorUseCase } from './create-game-author'
import { InMemoryGameAuthorRepository } from 'test/in-memory-game-author-repository'

let inMemoryGameAuthorRepository: InMemoryGameAuthorRepository
let sut: CreateGameAuthorUseCase

describe('Create Game Author Use Case', () => {
  beforeEach(() => {
    inMemoryGameAuthorRepository = new InMemoryGameAuthorRepository()
    sut = new CreateGameAuthorUseCase(inMemoryGameAuthorRepository)
  })

  it('shoud be able to create a game author', async () => {
    const gameAuthor = await sut.execute({
      name: 'Lucas',
      email: 'gablucas@gmail.com',
      password: 'password123',
      description: 'Uma descrição sobre mim...',
      profilePhoto: 'meulinkdefoto.png',
    })

    expect(gameAuthor.isRight()).toEqual(true)

    if (gameAuthor.isRight()) {
      expect(inMemoryGameAuthorRepository.items[0]).toEqual(
        gameAuthor.value.gameAuthor,
      )
    }
  })
})
