import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  isTemporaryPassword: boolean;

  @Column()
  temporaryPasswordExpires: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try{
      this.password = await bcrypt.hash(this.password, 8);
    } catch (err) {
      throw new Error(err);
    }
  };

  async compareHash(hash: string) {
    try{
      return await bcrypt.compare(hash, this.password);
    } catch (err) {
      throw new Error(err);
    }
  }

  generateToken() {
    return jwt.sign({ id: this.id }, "secret", {
      expiresIn: 86400
    })
  }
}