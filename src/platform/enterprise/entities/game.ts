import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Popularity } from '../object-value/popularity'
import { Category } from '@/core/types/category'

export interface GameProps {
  title: string
  description?: string
  category: Category
  cover?: string
  link: string
  authorId: UniqueEntityID
  popularity: Popularity
  createdAt: Date
  updateAt?: Date
}

export class Game extends Entity<GameProps> {
  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.touch()
  }

  get description() {
    return this.props.description ?? 'Sem descrição.'
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get category() {
    return this.props.category
  }

  get cover() {
    return this.props.cover ?? 'Sem capa de jogo.'
  }

  set cover(cover: string) {
    this.props.cover = cover
    this.touch()
  }

  get link() {
    return this.props.link
  }

  set link(link: string) {
    this.props.link = link
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get popularity() {
    return this.props.popularity
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updateAt() {
    return this.props.updateAt
  }

  private touch() {
    this.props.updateAt = new Date()
  }

  static create(
    props: Optional<GameProps, 'createdAt' | 'popularity'>,
    id?: UniqueEntityID,
  ) {
    const game = new Game(
      {
        ...props,
        popularity: props.popularity ?? new Popularity(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return game
  }
}
