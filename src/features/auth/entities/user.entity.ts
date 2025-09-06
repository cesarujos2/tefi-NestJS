import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'User ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Username' })
  @Column({ name: 'user_name', unique: true })
  userName: string;

  @ApiProperty({ description: 'Password hash' })
  @Column({ name: 'user_hash' })
  userHash: string;

  @ApiProperty({ description: 'System generated password flag' })
  @Column({ name: 'system_generated_password', default: false })
  systemGeneratedPassword: boolean;

  @ApiProperty({ description: 'Password last changed date' })
  @Column({ name: 'pwd_last_changed', type: 'datetime', nullable: true })
  pwdLastChanged: Date;

  @ApiProperty({ description: 'Authentication ID' })
  @Column({ name: 'authenticate_id', nullable: true })
  authenticateId: string;

  @ApiProperty({ description: 'Sugar login flag' })
  @Column({ name: 'sugar_login', default: true })
  sugarLogin: boolean;

  @ApiProperty({ description: 'First name' })
  @Column({ name: 'first_name' })
  firstName: string;

  @ApiProperty({ description: 'Last name' })
  @Column({ name: 'last_name' })
  lastName: string;

  @ApiProperty({ description: 'Admin flag' })
  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @ApiProperty({ description: 'External auth only flag' })
  @Column({ name: 'external_auth_only', default: false })
  externalAuthOnly: boolean;

  @ApiProperty({ description: 'Receive notifications flag' })
  @Column({ name: 'receive_notifications', default: true })
  receiveNotifications: boolean;

  @ApiProperty({ description: 'User description' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Date entered' })
  @CreateDateColumn({ name: 'date_entered' })
  dateEntered: Date;

  @ApiProperty({ description: 'Date modified' })
  @UpdateDateColumn({ name: 'date_modified' })
  dateModified: Date;

  @ApiProperty({ description: 'Modified user ID' })
  @Column({ name: 'modified_user_id', nullable: true })
  modifiedUserId: string;

  @ApiProperty({ description: 'Created by user ID' })
  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @ApiProperty({ description: 'Job title' })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({ description: 'Photo URL' })
  @Column({ nullable: true })
  photo: string;

  @ApiProperty({ description: 'Department' })
  @Column({ nullable: true })
  department: string;

  @ApiProperty({ description: 'Home phone' })
  @Column({ name: 'phone_home', nullable: true })
  phoneHome: string;

  @ApiProperty({ description: 'Mobile phone' })
  @Column({ name: 'phone_mobile', nullable: true })
  phoneMobile: string;

  @ApiProperty({ description: 'Work phone' })
  @Column({ name: 'phone_work', nullable: true })
  phoneWork: string;

  @ApiProperty({ description: 'Other phone' })
  @Column({ name: 'phone_other', nullable: true })
  phoneOther: string;

  @ApiProperty({ description: 'Fax number' })
  @Column({ name: 'phone_fax', nullable: true })
  phoneFax: string;

  @ApiProperty({ description: 'User status' })
  @Column({ default: 'Active' })
  status: string;

  @ApiProperty({ description: 'Address street' })
  @Column({ name: 'address_street', nullable: true })
  addressStreet: string;

  @ApiProperty({ description: 'Address city' })
  @Column({ name: 'address_city', nullable: true })
  addressCity: string;

  @ApiProperty({ description: 'Address state' })
  @Column({ name: 'address_state', nullable: true })
  addressState: string;

  @ApiProperty({ description: 'Address country' })
  @Column({ name: 'address_country', nullable: true })
  addressCountry: string;

  @ApiProperty({ description: 'Address postal code' })
  @Column({ name: 'address_postalcode', nullable: true })
  addressPostalcode: string;

  @ApiProperty({ description: 'Deleted flag' })
  @Column({ default: false })
  deleted: boolean;

  @ApiProperty({ description: 'Portal only flag' })
  @Column({ name: 'portal_only', default: false })
  portalOnly: boolean;

  @ApiProperty({ description: 'Show on employees flag' })
  @Column({ name: 'show_on_employees', default: true })
  showOnEmployees: boolean;

  @ApiProperty({ description: 'Employee status' })
  @Column({ name: 'employee_status', nullable: true })
  employeeStatus: string;

  @ApiProperty({ description: 'Messenger ID' })
  @Column({ name: 'messenger_id', nullable: true })
  messengerId: string;

  @ApiProperty({ description: 'Messenger type' })
  @Column({ name: 'messenger_type', nullable: true })
  messengerType: string;

  @ApiProperty({ description: 'Reports to user ID' })
  @Column({ name: 'reports_to_id', nullable: true })
  reportsToId: string;

  @ApiProperty({ description: 'Is group flag' })
  @Column({ name: 'is_group', default: false })
  isGroup: boolean;

  @ApiProperty({ description: 'Factor auth flag' })
  @Column({ name: 'factor_auth', default: false })
  factorAuth: boolean;

  @ApiProperty({ description: 'Factor auth interface' })
  @Column({ name: 'factor_auth_interface', nullable: true })
  factorAuthInterface: string;

  // Self-referencing relationship for reports_to
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'reports_to_id' })
  reportsTo: User;

  /**
   * Get full name of the user
   */
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  /**
   * Check if user is active
   */
  get isActive(): boolean {
    return this.status === 'Active' && !this.deleted;
  }
}
