import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({type:'int'})
    id: number;

    @Column({type:'varchar'})
    firstName: string

    @Column({type:'varchar'})
    lastName: string

    @Column({type:'varchar'})
    userName: string

    @Column({type:'varchar', unique: true})
    email: string 

    @Column({type:'varchar'})
    password: string 

    @Column({type: 'boolean', default: false})
    isBlocked: boolean;

    @CreateDateColumn()
    createdAt: Date 

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
