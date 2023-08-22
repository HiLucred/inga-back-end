import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface GameReviewProps {
  authorId: UniqueEntityID
  gameId: UniqueEntityID
  description: string
  rating: number
  createdAt: Date
  updateAt?: Date
}

export class GameReview extends Entity<GameReviewProps> {
  get authorId() {
    return this.props.authorId
  }

  get gameId() {
    return this.props.gameId
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get rating() {
    return this.props.rating
  }

  set rating(rating: number) {
    this.props.rating = rating
    this.touch()
  }

  private touch() {
    this.props.updateAt = new Date()
  }

  static create(
    props: Optional<GameReviewProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const gameReview = new GameReview(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return gameReview
  }
}
