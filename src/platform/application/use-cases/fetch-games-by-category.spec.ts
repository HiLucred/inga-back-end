import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'
import { makeCreateGame } from 'test/factories/make-create-game'
import { FetchGamesByCategory } from './fetch-games-by-category'

let inMemoryGameRepository: InMemoryGameRepository
let sut: FetchGamesByCategory

describe('Fetch Games By Category Use Case', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new FetchGamesByCategory(inMemoryGameRepository)
  })

  it('shoud be able to fetch games by category', async () => {
    const newGame = makeCreateGame({
      category: 'Plataforma',
    })

    const newGame2 = makeCreateGame({
      category: 'Plataforma',
    })

    const newGame3 = makeCreateGame({
      category: 'Puzzle',
    })

    await inMemoryGameRepository.create(newGame)
    await inMemoryGameRepository.create(newGame2)
    await inMemoryGameRepository.create(newGame3)

    const result = await sut.execute({
      category: 'Plataforma',
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.games).toEqual([
      expect.objectContaining({
        category: 'Plataforma',
      }),
      expect.objectContaining({
        category: 'Plataforma',
      }),
    ])
  })
})
