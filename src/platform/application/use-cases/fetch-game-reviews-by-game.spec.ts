import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'
import { makeCreateGame } from 'test/factories/make-create-game'
import { InMemoryGameReviewRepository } from 'test/in-memory-game-review-repository'
import { FetchGameReviewsByGameUseCase } from './fetch-game-reviews-by-game'
import { makeCreateGameReview } from 'test/factories/make-create-game-review'

let inMemoryGameRepository: InMemoryGameRepository
let inMemoryGameReviewRepository: InMemoryGameReviewRepository
let sut: FetchGameReviewsByGameUseCase

describe('Fetch Game Reviews By Game Use Case', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    inMemoryGameReviewRepository = new InMemoryGameReviewRepository()
    sut = new FetchGameReviewsByGameUseCase(inMemoryGameReviewRepository)
  })

  it('shoud be able to fetch game reviews by game', async () => {
    const newGame = makeCreateGame()

    await inMemoryGameRepository.create(newGame)

    const newGameReview = makeCreateGameReview({
      gameId: newGame.id,
    })

    const newGameReview2 = makeCreateGameReview({
      gameId: newGame.id,
    })

    await inMemoryGameReviewRepository.create(newGameReview)
    await inMemoryGameReviewRepository.create(newGameReview2)

    const result = await sut.execute({
      gameId: newGame.id.toString(),
      page: 1,
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

  it('shoud be able to fetch paginated game reviews by game', async () => {
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
      gameId: newGame.id.toString(),
      page: 2,
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.gameReviews).toHaveLength(2)
  })
})
