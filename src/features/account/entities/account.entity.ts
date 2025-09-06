import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AccountCustom } from './account-custom.entity';
import { Project } from '../../project/entities/project.entity';

@Entity('accounts')
export class Account {
  @ApiProperty({ description: 'Account unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Account name' })
  @Column({ type: 'varchar', length: 150, nullable: true })
  name: string;

  @ApiProperty({ description: 'Date when the account was created' })
  @CreateDateColumn({ name: 'date_entered' })
  dateEntered: Date;

  @ApiProperty({ description: 'Date when the account was last modified' })
  @UpdateDateColumn({ name: 'date_modified' })
  dateModified: Date;

  @ApiProperty({ description: 'ID of the user who last modified the account' })
  @Column({
    name: 'modified_user_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  modifiedUserId: string;

  @ApiProperty({ description: 'ID of the user who created the account' })
  @Column({ name: 'created_by', type: 'varchar', length: 36, nullable: true })
  createdBy: string;

  @ApiProperty({ description: 'Account description' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Soft delete flag' })
  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @ApiProperty({ description: 'ID of the assigned user' })
  @Column({
    name: 'assigned_user_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  assignedUserId: string;

  @ApiProperty({ description: 'Type of account' })
  @Column({ name: 'account_type', type: 'varchar', length: 50, nullable: true })
  accountType: string;

  @ApiProperty({ description: 'Industry sector' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  industry: string;

  @ApiProperty({ description: 'Annual revenue amount' })
  @Column({
    name: 'annual_revenue',
    type: 'decimal',
    precision: 26,
    scale: 6,
    nullable: true,
  })
  annualRevenue: number;

  @ApiProperty({ description: 'Fax phone number' })
  @Column({ name: 'phone_fax', type: 'varchar', length: 100, nullable: true })
  phoneFax: string;

  @ApiProperty({ description: 'Billing address street' })
  @Column({
    name: 'billing_address_street',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  billingAddressStreet: string;

  @ApiProperty({ description: 'Billing address city' })
  @Column({
    name: 'billing_address_city',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  billingAddressCity: string;

  @ApiProperty({ description: 'Billing address state' })
  @Column({
    name: 'billing_address_state',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  billingAddressState: string;

  @ApiProperty({ description: 'Billing address postal code' })
  @Column({
    name: 'billing_address_postalcode',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  billingAddressPostalcode: string;

  @ApiProperty({ description: 'Billing address country' })
  @Column({
    name: 'billing_address_country',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  billingAddressCountry: string;

  @ApiProperty({ description: 'Account rating' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  rating: string;

  @ApiProperty({ description: 'Office phone number' })
  @Column({
    name: 'phone_office',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  phoneOffice: string;

  @ApiProperty({ description: 'Alternate phone number' })
  @Column({
    name: 'phone_alternate',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  phoneAlternate: string;

  @ApiProperty({ description: 'Website URL' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @ApiProperty({ description: 'Ownership type' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  ownership: string;

  @ApiProperty({ description: 'Number of employees' })
  @Column({ type: 'varchar', length: 10, nullable: true })
  employees: string;

  @ApiProperty({ description: 'Stock ticker symbol' })
  @Column({
    name: 'ticker_symbol',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  tickerSymbol: string;

  @ApiProperty({ description: 'Shipping address street' })
  @Column({
    name: 'shipping_address_street',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  shippingAddressStreet: string;

  @ApiProperty({ description: 'Shipping address city' })
  @Column({
    name: 'shipping_address_city',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  shippingAddressCity: string;

  @ApiProperty({ description: 'Shipping address state' })
  @Column({
    name: 'shipping_address_state',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  shippingAddressState: string;

  @ApiProperty({ description: 'Shipping address postal code' })
  @Column({
    name: 'shipping_address_postalcode',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  shippingAddressPostalcode: string;

  @ApiProperty({ description: 'Shipping address country' })
  @Column({
    name: 'shipping_address_country',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  shippingAddressCountry: string;

  @ApiProperty({ description: 'Parent account ID' })
  @Column({ name: 'parent_id', type: 'varchar', length: 36, nullable: true })
  parentId: string;

  @ApiProperty({ description: 'SIC code' })
  @Column({ name: 'sic_code', type: 'varchar', length: 10, nullable: true })
  sicCode: string;

  @ApiProperty({ description: 'Campaign ID' })
  @Column({ name: 'campaign_id', type: 'varchar', length: 36, nullable: true })
  campaignId: string;

  // Relations
  @ApiProperty({
    description: 'Custom fields for the account',
    type: () => AccountCustom,
  })
  @OneToOne(() => AccountCustom, (accountCustom) => accountCustom.account, {
    cascade: true,
  })
  custom: AccountCustom;

  @ApiProperty({
    description: 'Projects associated with this account',
    type: () => [Project],
  })
  @ManyToMany(() => Project, (project) => project.accounts)
  @JoinTable({
    name: 'proy_proyectostele_accounts_c',
    joinColumn: {
      name: 'proy_proyectostele_accountsaccounts_ida',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'proy_proyectostele_accountsproy_proyectostele_idb',
      referencedColumnName: 'id',
    },
  })
  projects: Project[];
}
