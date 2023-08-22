import { describe, it, beforeEach, expect } from 'vitest'
import { CreateGameReviewUseCase } from './create-game-review'
import { InMemoryGameReviewRepository } from 'test/in-memory-game-review-repository'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'
import { makeCreateGame } from 'test/factories/make-create-game'

let inMemoryGameReviewRepository: InMemoryGameReviewRepository
let inMemoryGameRepository: InMemoryGameRepository
let sut: CreateGameReviewUseCase

describe('Create Game Review Use Case', () => {
  beforeEach(() => {
    inMemoryGameReviewRepository = new InMemoryGameReviewRepository()
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new CreateGameReviewUseCase(
      inMemoryGameRepository,
      inMemoryGameReviewRepository,
    )
  })

  it('shoud be able to create a game', async () => {
    const newGame = makeCreateGame()

    await inMemoryGameRepository.create(newGame)

    const result = await sut.execute({
      authorId: 'author-01',
      gameId: newGame.id.toString(),
      description: 'Descrição sobre esse jogo muito divertido...',
      rating: 5,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(inMemoryGameReviewRepository.items[0]).toEqual(
        result.value.gameReview,
      )
    }
  })
})
