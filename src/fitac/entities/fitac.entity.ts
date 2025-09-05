import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('fitac_fitac')
export class Fitac {
  @ApiProperty({ description: 'ID único del registro' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Fecha de creación del registro' })
  @CreateDateColumn({ name: 'date_entered' })
  dateEntered: Date;

  @ApiProperty({ description: 'Fecha de última modificación' })
  @UpdateDateColumn({ name: 'date_modified' })
  dateModified: Date;

  @ApiProperty({ description: 'ID del usuario que modificó el registro' })
  @Column({ name: 'modified_user_id', nullable: true })
  modifiedUserId: string;

  @ApiProperty({ description: 'ID del usuario que creó el registro' })
  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @ApiProperty({ description: 'Descripción del registro' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Indica si el registro está eliminado' })
  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @ApiProperty({ description: 'ID del usuario asignado' })
  @Column({ name: 'assigned_user_id', nullable: true })
  assignedUserId: string;

  @ApiProperty({ description: 'Saludo o tratamiento' })
  @Column({ nullable: true })
  salutation: string;

  @ApiProperty({ description: 'Nombre' })
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @ApiProperty({ description: 'Apellido' })
  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @ApiProperty({ description: 'Título o cargo' })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({ description: 'Foto del contacto' })
  @Column({ nullable: true })
  photo: string;

  @ApiProperty({ description: 'Departamento' })
  @Column({ nullable: true })
  department: string;

  @ApiProperty({ description: 'No llamar' })
  @Column({ name: 'do_not_call', type: 'boolean', default: false })
  doNotCall: boolean;

  @ApiProperty({ description: 'Teléfono de casa' })
  @Column({ name: 'phone_home', nullable: true })
  phoneHome: string;

  @ApiProperty({ description: 'Teléfono móvil' })
  @Column({ name: 'phone_mobile', nullable: true })
  phoneMobile: string;

  @ApiProperty({ description: 'Teléfono de trabajo' })
  @Column({ name: 'phone_work', nullable: true })
  phoneWork: string;

  @ApiProperty({ description: 'Otro teléfono' })
  @Column({ name: 'phone_other', nullable: true })
  phoneOther: string;

  @ApiProperty({ description: 'Teléfono fax' })
  @Column({ name: 'phone_fax', nullable: true })
  phoneFax: string;

  @ApiProperty({ description: 'Base legal' })
  @Column({ name: 'lawful_basis', nullable: true })
  lawfulBasis: string;

  @ApiProperty({ description: 'Fecha de revisión' })
  @Column({ name: 'date_reviewed', type: 'date', nullable: true })
  dateReviewed: Date;

  @ApiProperty({ description: 'Fuente de la base legal' })
  @Column({ name: 'lawful_basis_source', nullable: true })
  lawfulBasisSource: string;

  @ApiProperty({ description: 'Calle de dirección principal' })
  @Column({ name: 'primary_address_street', nullable: true })
  primaryAddressStreet: string;

  @ApiProperty({ description: 'Ciudad de dirección principal' })
  @Column({ name: 'primary_address_city', nullable: true })
  primaryAddressCity: string;

  @ApiProperty({ description: 'Estado de dirección principal' })
  @Column({ name: 'primary_address_state', nullable: true })
  primaryAddressState: string;

  @ApiProperty({ description: 'Código postal de dirección principal' })
  @Column({ name: 'primary_address_postalcode', nullable: true })
  primaryAddressPostalcode: string;

  @ApiProperty({ description: 'País de dirección principal' })
  @Column({ name: 'primary_address_country', nullable: true })
  primaryAddressCountry: string;

  @ApiProperty({ description: 'Calle de dirección alternativa' })
  @Column({ name: 'alt_address_street', nullable: true })
  altAddressStreet: string;

  @ApiProperty({ description: 'Ciudad de dirección alternativa' })
  @Column({ name: 'alt_address_city', nullable: true })
  altAddressCity: string;

  @ApiProperty({ description: 'Estado de dirección alternativa' })
  @Column({ name: 'alt_address_state', nullable: true })
  altAddressState: string;

  @ApiProperty({ description: 'Código postal de dirección alternativa' })
  @Column({ name: 'alt_address_postalcode', nullable: true })
  altAddressPostalcode: string;

  @ApiProperty({ description: 'País de dirección alternativa' })
  @Column({ name: 'alt_address_country', nullable: true })
  altAddressCountry: string;

  @ApiProperty({ description: 'Asistente' })
  @Column({ nullable: true })
  assistant: string;

  @ApiProperty({ description: 'Teléfono del asistente' })
  @Column({ name: 'assistant_phone', nullable: true })
  assistantPhone: string;

  @ApiProperty({ description: 'Nombre del documento' })
  @Column({ name: 'document_name', nullable: true })
  documentName: string;

  @ApiProperty({ description: 'Nombre del archivo' })
  @Column({ nullable: true })
  filename: string;

  @ApiProperty({ description: 'Extensión del archivo' })
  @Column({ name: 'file_ext', nullable: true })
  fileExt: string;

  @ApiProperty({ description: 'Tipo MIME del archivo' })
  @Column({ name: 'file_mime_type', nullable: true })
  fileMimeType: string;

  @ApiProperty({ description: 'Fecha de activación' })
  @Column({ name: 'active_date', type: 'date', nullable: true })
  activeDate: Date;

  @ApiProperty({ description: 'Fecha de expiración' })
  @Column({ name: 'exp_date', type: 'date', nullable: true })
  expDate: Date;

  @ApiProperty({ description: 'ID de categoría' })
  @Column({ name: 'category_id', nullable: true })
  categoryId: string;

  @ApiProperty({ description: 'ID de subcategoría' })
  @Column({ name: 'subcategory_id', nullable: true })
  subcategoryId: string;

  @ApiProperty({ description: 'ID de estado' })
  @Column({ name: 'status_id', nullable: true })
  statusId: string;

  @ApiProperty({ description: 'Medidas preventivas y de mitigación' })
  @Column({ name: 'med_prev_mit', type: 'text', nullable: true })
  medPrevMit: string;

  @ApiProperty({ description: 'Participación ciudadana' })
  @Column({ name: 'parti_cuidadana', type: 'text', nullable: true })
  partiCuidadana: string;

  @ApiProperty({ description: 'Cronograma' })
  @Column({ type: 'text', nullable: true })
  cronograma: string;

  @ApiProperty({ description: 'Declaración jurada RNI SEIA' })
  @Column({ name: 'dj_rni_seia', nullable: true })
  djRniSeia: string;

  @ApiProperty({ description: 'ID de contacto personalizado' })
  @Column({ name: 'contact_id_c', nullable: true })
  contactIdC: string;

  @ApiProperty({ description: 'ID de proyecto de telecomunicaciones' })
  @Column({ name: 'proy_proyectostele_id_c', nullable: true })
  proyProyectosteleIdC: string;

  @ApiProperty({ description: 'Recursos' })
  @Column({ type: 'text', nullable: true })
  recursos: string;

  @ApiProperty({ description: 'Foto montaje' })
  @Column({ name: 'foto_montaje', nullable: true })
  fotoMontaje: string;
}
