import { describe, it, beforeEach, expect } from 'vitest'
import { EditGameUseCase } from './edit-game'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'
import { makeCreateGame } from 'test/factories/make-create-game'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryGameRepository: InMemoryGameRepository
let sut: EditGameUseCase

describe('Edit Game Use Case', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new EditGameUseCase(inMemoryGameRepository)
  })

  it('shoud be able to edit a game', async () => {
    const newGame = makeCreateGame()

    await inMemoryGameRepository.create(newGame)

    const result = await sut.execute({
      gameId: newGame.id.toString(),
      authorId: newGame.authorId.toString(),
      title: 'Novo título',
      description: 'Nova descrição',
      cover: 'Novo cover',
      link: 'https://www.novolink.com',
    })

    expect(result.isRight()).toEqual(true)

    expect(inMemoryGameRepository.items[0]).toMatchObject({
      title: 'Novo título',
    })
  })

  it('shoud not be able to edit a game from another user', async () => {
    const newGame = makeCreateGame()

    await inMemoryGameRepository.create(newGame)

    const result = await sut.execute({
      gameId: newGame.id.toString(),
      authorId: 'author-not-existing',
      title: 'Novo título',
      description: 'Nova descrição',
      cover: 'Novo cover',
      link: 'https://www.novolink.com',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
