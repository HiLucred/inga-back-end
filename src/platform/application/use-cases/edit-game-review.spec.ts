import { describe, it, beforeEach, expect } from 'vitest'
import { EditGameReviewUseCase } from './edit-game-review'
import { InMemoryGameReviewRepository } from 'test/in-memory-game-review-repository'
import { makeCreateGame } from 'test/factories/make-create-game'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeCreateGameReview } from 'test/factories/make-create-game-review'
import { faker } from '@faker-js/faker'
import { InMemoryGameRepository } from 'test/in-memory-game-repository'

let inMemoryGameReviewRepository: InMemoryGameReviewRepository
let inMemoryGameRepository: InMemoryGameRepository
let sut: EditGameReviewUseCase

describe('Edit Game Use Case', () => {
  beforeEach(() => {
    inMemoryGameReviewRepository = new InMemoryGameReviewRepository()
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new EditGameReviewUseCase(inMemoryGameReviewRepository)
  })

  it('shoud be able to edit a game review', async () => {
    const newGame = makeCreateGame()

    await inMemoryGameRepository.create(newGame)

    const newGameReview = makeCreateGameReview({
      authorId: new UniqueEntityID('author-01'),
      gameId: newGame.id,
    })

    await inMemoryGameReviewRepository.create(newGameReview)

    const result = await sut.execute({
      gameReviewId: newGameReview.id.toString(),
      authorId: newGameReview.authorId.toString(),
      description: faker.lorem.text(),
      rating: 3,
    })

    expect(result.isRight()).toEqual(true)
  })
})
