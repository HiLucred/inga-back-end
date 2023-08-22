export class Popularity {
  private likes: number
  private hearts: number

  getLikes() {
    return this.likes
  }

  setLike() {
    return (this.likes = this.likes + 1)
  }

  getHearts() {
    return this.hearts
  }

  setHeart() {
    return (this.hearts = this.hearts + 1)
  }

  constructor(likes?: number, hearts?: number) {
    this.likes = likes ?? 0
    this.hearts = hearts ?? 0
  }
}
