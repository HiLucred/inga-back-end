import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'
import { makeCreateGame } from 'test/factories/make-create-game'
import { GiveLikeInTheGameUseCase } from './give-like-in-the-game'

let inMemoryGameRepository: InMemoryGameRepository
let sut: GiveLikeInTheGameUseCase

describe('Give Like in The Game Use Case', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new GiveLikeInTheGameUseCase(inMemoryGameRepository)
  })

  it('shoud be able to give like in a game', async () => {
    const newGame = makeCreateGame()

    await inMemoryGameRepository.create(newGame)

    const result = await sut.execute({ gameId: newGame.id.toString() })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryGameRepository.items[0].popularity.getLikes()).toEqual(1)
  })
})
