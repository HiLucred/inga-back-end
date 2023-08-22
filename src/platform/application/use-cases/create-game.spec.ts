import { describe, it, beforeEach, expect } from 'vitest'
import { CreateGameUseCase } from './create-game'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'

let inMemoryGameRepository: InMemoryGameRepository
let sut: CreateGameUseCase

describe('Create Game Use Case', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new CreateGameUseCase(inMemoryGameRepository)
  })

  it('shoud be able to create a game', async () => {
    const newGame = await sut.execute({
      gameAuthorId: 'author-01',
      title: 'Eclipse 97',
      link: 'www.eclipse97.com',
      description: 'Um jogo em algum lugar do universo...',
      category: 'Ação',
    })

    expect(newGame.isRight()).toEqual(true)
    expect(inMemoryGameRepository.items[0]).toEqual(newGame.value?.game)
  })
})
