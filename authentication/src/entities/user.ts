import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  email!: string;

  @Column({ type: "text" })
  hashed_password!: string;
}
