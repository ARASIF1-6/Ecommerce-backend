import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity("Banner")
export class BannerEntity {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column({ name: 'FileName',type: "varchar", length: 150 })
  FileName: string;
  @Column({ name: 'path', type: "varchar" })
  path: string;
  @Column({ name: 'EventLink', type: "varchar" })
  EventLink: string;
}