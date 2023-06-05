import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
     @PrimaryGeneratedColumn()
     id:number

     @Column()
     name:string;

     @Column()
     lastname:string;

     @Column()
     password:string;
}
