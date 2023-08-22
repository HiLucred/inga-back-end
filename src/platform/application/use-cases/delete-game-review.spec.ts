import { describe, it, beforeEach, expect } from 'vitest'
import { DeleteGameReviewUseCase } from './delete-game-review'
import { InMemoryGameReviewRepository } from 'test/in-memory-game-review-repository'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { makeCreateGameReview } from 'test/factories/make-create-game-review'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryGameReviewRepository: InMemoryGameReviewRepository
let sut: DeleteGameReviewUseCase

describe('Delete Game Review Use Case', () => {
  beforeEach(() => {
    inMemoryGameReviewRepository = new InMemoryGameReviewRepository()
    sut = new DeleteGameReviewUseCase(inMemoryGameReviewRepository)
  })

  it('shoud be able to delete a game review', async () => {
    const newGameReview = makeCreateGameReview({
      gameId: new UniqueEntityID('game-01'),
      authorId: new UniqueEntityID('author-01'),
    })

    await inMemoryGameReviewRepository.create(newGameReview)

    await sut.execute({
      gameReviewId: newGameReview.id.toString(),
      authorId: newGameReview.authorId.toString(),
    })

    expect(inMemoryGameReviewRepository.items).length(0)
  })

  it('shoud not be able to delete a game review from another user', async () => {
    const newGameReview = makeCreateGameReview({
      gameId: new UniqueEntityID('game-01'),
      authorId: new UniqueEntityID('author-01'),
    })

    await inMemoryGameReviewRepository.create(newGameReview)

    const result = await sut.execute({
      gameReviewId: newGameReview.id.toString(),
      authorId: 'another-user',
    })

    expect(result.isLeft()).toEqual(true)
    expect(inMemoryGameReviewRepository.items[0]).toEqual(newGameReview)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
