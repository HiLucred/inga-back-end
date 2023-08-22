import { describe, it, beforeEach, expect } from 'vitest'
import { GameAuthor } from '@/platform/enterprise/entities/game-author'
import { InMemoryGameAuthorRepository } from 'test/in-memory-game-author-repository'
import { EditGameAuthorProfileUseCase } from './edit-game-author-profile'

let inMemoryGameAuthorRepository: InMemoryGameAuthorRepository
let sut: EditGameAuthorProfileUseCase

describe('Edit Game Author Use Case', () => {
  beforeEach(() => {
    inMemoryGameAuthorRepository = new InMemoryGameAuthorRepository()
    sut = new EditGameAuthorProfileUseCase(inMemoryGameAuthorRepository)
  })

  it('shoud be able to edit game author profile', async () => {
    const gameAuthor = GameAuthor.create({
      name: 'Lucas',
      email: 'gablucas@gmail.com',
      password: 'password123',
      description: 'Uma descrição sobre mim...',
      profilePhoto: 'meulinkdefoto.png',
    })

    await inMemoryGameAuthorRepository.create(gameAuthor)

    const result = await sut.execute({
      authorId: gameAuthor.id.toString(),
      description: 'Nova descrição para o meu perfil...',
      profilePhoto: 'NovaFoto.png',
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryGameAuthorRepository.items[0].description).toEqual(
      'Nova descrição para o meu perfil...',
    )
    expect(inMemoryGameAuthorRepository.items[0].profilePhoto).toEqual(
      'NovaFoto.png',
    )
  })
})
