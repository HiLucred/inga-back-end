import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'
import { makeCreateGame } from 'test/factories/make-create-game'
import { FetchGameReviewsUseCase } from './fetch-game-reviews'
import { InMemoryGameReviewRepository } from 'test/in-memory-game-review-repository'
import { makeCreateGameReview } from 'test/factories/make-create-game-review'

let inMemoryGameReviewRepository: InMemoryGameReviewRepository
let inMemoryGameRepository: InMemoryGameRepository
let sut: FetchGameReviewsUseCase

describe('Fetch Games Reviews Use Case', () => {
  beforeEach(() => {
    inMemoryGameReviewRepository = new InMemoryGameReviewRepository()
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new FetchGameReviewsUseCase(inMemoryGameReviewRepository)
  })

  it('shoud be able to fetch game reviews', async () => {
    const newGame = makeCreateGame()

    await inMemoryGameRepository.create(newGame)

    const newGameReview = makeCreateGameReview({
      gameId: newGame.id,
    })

    const newGameReview2 = makeCreateGameReview({
      gameId: newGame.id,
    })

    const newGameReview3 = makeCreateGameReview({
      gameId: newGame.id,
    })

    await inMemoryGameReviewRepository.create(newGameReview)
    await inMemoryGameReviewRepository.create(newGameReview2)
    await inMemoryGameReviewRepository.create(newGameReview3)

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.gameReviews).toEqual([
      expect.objectContaining({
        description: expect.any(String),
      }),
      expect.objectContaining({
        description: expect.any(String),
      }),
      expect.objectContaining({
        description: expect.any(String),
      }),
    ])
  })

  it('shoud be able to paginated fetch game reviews', async () => {
    const newGame = makeCreateGame()

    await inMemoryGameRepository.create(newGame)

    for (let i = 1; i <= 22; i++) {
      await inMemoryGameReviewRepository.create(
        makeCreateGameReview({
          gameId: newGame.id,
        }),
      )
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.gameReviews).toEqual([
      expect.objectContaining({
        description: expect.any(String),
      }),
      expect.objectContaining({
        description: expect.any(String),
      }),
    ])
  })
})
