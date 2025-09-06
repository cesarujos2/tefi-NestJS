import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ContactCustom } from './contact-custom.entity';
import { Fitac } from '@features/fitac/entities/fitac.entity';

/**
 * Contact entity representing the contacts table
 * Contains all standard contact fields following the existing pattern
 */
@Entity('contacts')
export class Contact {
  @PrimaryColumn({ type: 'char', length: 36 })
  id: string;

  @CreateDateColumn({ name: 'date_entered', type: 'datetime' })
  dateEntered: Date;

  @UpdateDateColumn({ name: 'date_modified', type: 'datetime' })
  dateModified: Date;

  @Column({
    name: 'modified_user_id',
    type: 'char',
    length: 36,
    nullable: true,
  })
  modifiedUserId: string;

  @Column({
    name: 'created_by',
    type: 'char',
    length: 36,
    nullable: true,
  })
  createdBy: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  deleted: boolean;

  @Column({
    name: 'assigned_user_id',
    type: 'char',
    length: 36,
    nullable: true,
  })
  assignedUserId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  salutation: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100, nullable: true })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  department: string;

  @Column({ name: 'do_not_call', type: 'tinyint', width: 1, default: 0 })
  doNotCall: boolean;

  @Column({ name: 'phone_home', type: 'varchar', length: 100, nullable: true })
  phoneHome: string;

  @Column({
    name: 'phone_mobile',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  phoneMobile: string;

  @Column({
    name: 'phone_work',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  phoneWork: string;

  @Column({
    name: 'phone_other',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  phoneOther: string;

  @Column({
    name: 'phone_fax',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  phoneFax: string;

  @Column({
    name: 'lawful_basis',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  lawfulBasis: string;

  @Column({ name: 'date_reviewed', type: 'date', nullable: true })
  dateReviewed: Date;

  @Column({
    name: 'lawful_basis_source',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  lawfulBasisSource: string;

  @Column({
    name: 'primary_address_street',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  primaryAddressStreet: string;

  @Column({
    name: 'primary_address_city',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  primaryAddressCity: string;

  @Column({
    name: 'primary_address_state',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  primaryAddressState: string;

  @Column({
    name: 'primary_address_postalcode',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  primaryAddressPostalcode: string;

  @Column({
    name: 'primary_address_country',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  primaryAddressCountry: string;

  @Column({
    name: 'alt_address_street',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  altAddressStreet: string;

  @Column({
    name: 'alt_address_city',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  altAddressCity: string;

  @Column({
    name: 'alt_address_state',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  altAddressState: string;

  @Column({
    name: 'alt_address_postalcode',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  altAddressPostalcode: string;

  @Column({
    name: 'alt_address_country',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  altAddressCountry: string;

  @Column({ type: 'varchar', length: 75, nullable: true })
  assistant: string;

  @Column({
    name: 'assistant_phone',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  assistantPhone: string;

  @Column({ name: 'lead_source', type: 'varchar', length: 100, nullable: true })
  leadSource: string;

  @Column({ name: 'reports_to_id', type: 'char', length: 36, nullable: true })
  reportsToId: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ name: 'campaign_id', type: 'char', length: 36, nullable: true })
  campaignId: string;

  @Column({
    name: 'joomla_account_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  joomlaAccountId: string;

  @Column({
    name: 'portal_account_disabled',
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  portalAccountDisabled: boolean;

  @Column({
    name: 'portal_user_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  portalUserType: string;

  // Relationship with custom fields
  @OneToOne(() => ContactCustom, (contactCustom) => contactCustom.contact, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: 'id' })
  custom: ContactCustom;

  @ApiProperty({ description: 'Fitacs asociados' })
  @ManyToMany(() => Fitac, (fitac) => fitac.contacts)
  fitacs: Fitac[];

  // Computed property for full name
  get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }
}
