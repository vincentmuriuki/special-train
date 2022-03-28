import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  paranoid: true,
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: "unique Id of record",
    field: "id",
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
    field: "email",
  })
  email: string;

  @Column({
    type: DataType.STRING,
    field: "password",
  })
  password?: string;

  @Column({
    type: DataType.STRING,
    field: "firstName",
  })
  firstName?: string;

  @Column({
    type: DataType.STRING,
    field: "lastName",
  })
  lastName?: string;

  @Column({
    type: DataType.STRING,
    field: "phoneNumber",
  })
  phoneNumber?: string;

  @Column({
    type: DataType.STRING,
    field: "address",
  })
  address?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: "isVerified",
  })
  isVerified: boolean;

  @Column({
    type: DataType.DATE,
    field: "lastLogin",
  })
  lastLogin: Date;

  @Column({
    type: DataType.DATE,
    field: "birthDate",
  })
  birthDate?: Date;

  @Column({
    type: DataType.STRING,
    field: "gender",
  })
  gender?: string;

  @Column({
    type: DataType.ENUM,
    defaultValue: "default",
    values: ["super_administrator", "administrator", "default"],
    field: "role",
  })
  role: string;

  @Column({
    type: DataType.STRING,
    field: "profilePicture",
  })
  profilePicture?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: "remember",
  })
  remember?: boolean;

  @Column({
    type: DataType.DATE,
    field: "createdAt",
  })
  createdAt?: string;

  @Column({
    type: DataType.DATE,
    field: "updatedAt",
  })
  updatedAt?: string;
}
