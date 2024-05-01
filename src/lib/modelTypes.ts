export interface Message {
  id: string
  message: string
  createdAt: Date
  authorId: string
  destineId: string
  author?: { username: string };
}

export interface Friends {

  friends: {
    id: string;
    username: string;
    imgUrl: string;
  }
}
