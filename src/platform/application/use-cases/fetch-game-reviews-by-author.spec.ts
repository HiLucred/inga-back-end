import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'
import { makeCreateGame } from 'test/factories/make-create-game'
import { InMemoryGameReviewRepository } from 'test/in-memory-game-review-repository'
import { makeCreateGameReview } from 'test/factories/make-create-game-review'
import { FetchGameReviewsByAuthorUseCase } from './fetch-game-reviews-by-author'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryGameRepository: InMemoryGameRepository
let inMemoryGameReviewRepository: InMemoryGameReviewRepository
let sut: FetchGameReviewsByAuthorUseCase

describe('Fetch Game Reviews By Author Use Case', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    inMemoryGameReviewRepository = new InMemoryGameReviewRepository()
    sut = new FetchGameReviewsByAuthorUseCase(inMemoryGameReviewRepository)
  })

  it('shoud be able to fetch game reviews by author', async () => {
    const newGame = makeCreateGame()

    await inMemoryGameRepository.create(newGame)

    const newGameReview = makeCreateGameReview({
      gameId: newGame.id,
      authorId: new UniqueEntityID('author-01'),
    })

    const newGameReview2 = makeCreateGameReview({
      gameId: newGame.id,
      authorId: new UniqueEntityID('author-01'),
    })

    await inMemoryGameReviewRepository.create(newGameReview)
    await inMemoryGameReviewRepository.create(newGameReview2)

    const result = await sut.execute({
      authorId: newGameReview.authorId.toString(),
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
