import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'
import { makeCreateGame } from 'test/factories/make-create-game'
import { GiveHeartInTheGame } from './give-heart-in-the-game'

let inMemoryGameRepository: InMemoryGameRepository
let sut: GiveHeartInTheGame

describe('Give Heart in The Game Use Case', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new GiveHeartInTheGame(inMemoryGameRepository)
  })

  it('shoud be able to give a heart in the game', async () => {
    const newGame = makeCreateGame()

    await inMemoryGameRepository.create(newGame)

    const result = await sut.execute({ gameId: newGame.id.toString() })

    expect(result.isRight()).toEqual(true)

    expect(inMemoryGameRepository.items[0].popularity.getHearts()).toEqual(1)
  })
})
