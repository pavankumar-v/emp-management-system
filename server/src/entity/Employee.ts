import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  firstName: string

  @Column({ type: 'varchar', length: 100 })
  lastName: string

  @Column('varchar')
  field: string;

  @Column("simple-array")
  skills: string[];

  @Column('varchar')
  about: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
