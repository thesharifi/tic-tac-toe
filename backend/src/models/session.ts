import { Document, Schema, Types, model } from 'mongoose'

export interface IGameSessionPlayer extends Document {
  player: Types.ObjectId
  winsCount: number
  drawsCount: number
  lossesCount: number
}

export interface IGameSession extends Document {
  players: IGameSessionPlayer[]
  rounds: Types.ObjectId[]
  status: 'active' | 'completed'
  createdAt: Date
}

const gameSession = new Schema<IGameSession>({
  players: [
    {
      player: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
      },
      winsCount: {
        type: Number,
        default: 0,
      },
      drawsCount: {
        type: Number,
        default: 0,
      },
      lossesCount: {
        type: Number,
        default: 0,
      },
    },
  ],
  rounds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Round',
    },
  ],
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const GameSession = model<IGameSession>('GameSession', gameSession)

export default GameSession
