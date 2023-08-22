import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface GameAuthorProps {
  name: string
  email: string
  password: string
  description?: string
  profilePhoto?: string
  createdAt: Date
}

export class GameAuthor extends Entity<GameAuthorProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get description() {
    return this.props.description ?? 'Sem descrição.'
  }

  set description(description: string) {
    this.props.description = description
  }

  get profilePhoto() {
    return this.props.profilePhoto ?? 'Sem foto de perfil.'
  }

  set profilePhoto(profilePhoto: string) {
    this.props.profilePhoto = profilePhoto
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<GameAuthorProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const gameAuthor = new GameAuthor(
      {
        createdAt: new Date(),
        ...props,
      },
      id,
    )

    return gameAuthor
  }
}
