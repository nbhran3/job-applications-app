import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "./company-entity.js";

@Entity({ name: "jobs" })
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "user_id", type: "int" })
  user_id!: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @Column({ name: "company_id", type: "int" })
  company_id!: number;

  @Column({ type: "text" })
  job_title!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "text", nullable: true })
  post_url!: string | null;

  @Column({ type: "int", nullable: true })
  salary!: number | null;

  @Column({
    type: "text",
    default: "saved",
    enum: ["saved", "applied", "interview", "offer", "rejected"],
  })
  status!: string;

  @Column({ type: "date", nullable: true })
  application_date!: Date | null;

  @Column({ type: "date", nullable: true })
  interview_date!: Date | null;

  @Column({ type: "text", nullable: true })
  notes!: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
