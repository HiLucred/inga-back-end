import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'
import { makeCreateGame } from 'test/factories/make-create-game'
import { InMemoryGameReviewRepository } from 'test/in-memory-game-review-repository'
import { InMemoryGameAuthorRepository } from 'test/in-memory-game-author-repository'
import { GetGameAuthorAnalyticsSummaryUseCase } from './get-game-author-analytics-summary'
import { makeCreateGameAuthor } from 'test/factories/make-create-game-author'
import { makeCreateGameReview } from 'test/factories/make-create-game-review'

let inMemoryGameRepository: InMemoryGameRepository
let inMemoryGameReviewRepository: InMemoryGameReviewRepository
let inMemoryGameAuthorRepository: InMemoryGameAuthorRepository
let sut: GetGameAuthorAnalyticsSummaryUseCase

describe('Get Game Author Analytics Summary Use Case', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    inMemoryGameReviewRepository = new InMemoryGameReviewRepository()
    inMemoryGameAuthorRepository = new InMemoryGameAuthorRepository()
    sut = new GetGameAuthorAnalyticsSummaryUseCase(
      inMemoryGameAuthorRepository,
      inMemoryGameRepository,
      inMemoryGameReviewRepository,
    )
  })

  it('shoud be able to get game author analytics summary', async () => {
    const newGameAuthor = makeCreateGameAuthor()

    await inMemoryGameAuthorRepository.create(newGameAuthor)

    const newGame = makeCreateGame({
      authorId: newGameAuthor.id,
    })

    await inMemoryGameRepository.create(newGame)

    const newGameReview = makeCreateGameReview({
      authorId: newGameAuthor.id,
      gameId: newGame.id,
    })

    await inMemoryGameReviewRepository.create(newGameReview)

    const result = await sut.execute({
      gameAuthorId: newGameAuthor.id.toString(),
    })

    expect(result.isRight()).toEqual(true)
  })
})
