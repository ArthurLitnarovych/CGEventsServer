import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Event extends Model<Event> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  eventDate: Date;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  location: { lat: number; lng: number };

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;
}
