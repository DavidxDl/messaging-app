export interface Message {
  id: string
  message: string
  createdAt: Date
  authorId: string
  destineId: string
  author?: { username: string };
}
