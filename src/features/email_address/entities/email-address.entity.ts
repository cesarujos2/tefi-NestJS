import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Contact } from '@features/contact/entities/contact.entity';

/**
 * EmailAddress entity representing the email_addresses table
 * Contains all email address fields and validation information
 */
@Entity('email_addresses')
export class EmailAddress {
  @ApiProperty({ description: 'Unique identifier' })
  @PrimaryColumn({ type: 'char', length: 36 })
  id: string;

  @ApiProperty({ description: 'Email address' })
  @Column({
    name: 'email_address',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  emailAddress: string;

  @ApiProperty({ description: 'Email address in uppercase' })
  @Column({
    name: 'email_address_caps',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  emailAddressCaps: string;

  @ApiProperty({ description: 'Whether email is invalid' })
  @Column({ name: 'invalid_email', type: 'tinyint', width: 1, default: 0 })
  invalidEmail: boolean;

  @ApiProperty({ description: 'Whether user opted out' })
  @Column({ name: 'opt_out', type: 'tinyint', width: 1, default: 0 })
  optOut: boolean;

  @ApiProperty({ description: 'Confirmation opt-in status' })
  @Column({
    name: 'confirm_opt_in',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  confirmOptIn: string;

  @ApiProperty({ description: 'Date when opt-in was confirmed' })
  @Column({ name: 'confirm_opt_in_date', type: 'datetime', nullable: true })
  confirmOptInDate: Date;

  @ApiProperty({ description: 'Date when opt-in confirmation was sent' })
  @Column({
    name: 'confirm_opt_in_sent_date',
    type: 'datetime',
    nullable: true,
  })
  confirmOptInSentDate: Date;

  @ApiProperty({ description: 'Date when opt-in confirmation failed' })
  @Column({
    name: 'confirm_opt_in_fail_date',
    type: 'datetime',
    nullable: true,
  })
  confirmOptInFailDate: Date;

  @ApiProperty({ description: 'Token for opt-in confirmation' })
  @Column({
    name: 'confirm_opt_in_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  confirmOptInToken: string;

  @ApiProperty({ description: 'Creation date' })
  @CreateDateColumn({ name: 'date_created', type: 'datetime' })
  dateEntered: Date;

  @ApiProperty({ description: 'Last modification date' })
  @UpdateDateColumn({ name: 'date_modified', type: 'datetime' })
  dateModified: Date;

  @ApiProperty({ description: 'Soft delete flag' })
  @Column({ type: 'tinyint', width: 1, default: 0 })
  deleted: boolean;

  @ApiProperty({ description: 'Contactos asociados' })
  @ManyToMany(() => Contact, (contact) => contact.emailAddresses)
  @JoinTable({
    name: 'email_addr_bean_rel',
    joinColumn: { name: 'email_address_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'bean_id', referencedColumnName: 'id' },
  })
  contacts: Contact[];
}
