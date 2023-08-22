import { describe, it, beforeEach, expect } from 'vitest'
import { DeleteGameUseCase } from './delete-game'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'
import { makeCreateGame } from 'test/factories/make-create-game'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryGameRepository: InMemoryGameRepository
let sut: DeleteGameUseCase

describe('Delete Game Use Case', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new DeleteGameUseCase(inMemoryGameRepository)
  })

  it('shoud be able to delete a game', async () => {
    const newGame = makeCreateGame()

    await sut.execute({
      gameId: newGame.id.toString(),
      authorId: newGame.authorId.toString(),
    })

    expect(inMemoryGameRepository.items).length(0)
  })

  it('shoud not be able to delete a game from another user', async () => {
    const newGame = makeCreateGame()

    await inMemoryGameRepository.create(newGame)

    const result = await sut.execute({
      gameId: newGame.id.toString(),
      authorId: 'another-user',
    })

    expect(result.isLeft()).toEqual(true)
    expect(inMemoryGameRepository.items[0]).toEqual(newGame)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
