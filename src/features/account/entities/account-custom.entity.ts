import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Account } from './account.entity';

@Entity('accounts_cstm')
export class AccountCustom {
  @ApiProperty({ description: 'Account custom fields unique identifier' })
  @PrimaryColumn({ name: 'id_c', type: 'varchar', length: 36 })
  idC: string;

  @ApiProperty({ description: 'Document type administered' })
  @Column({
    name: 'tipo_doc_administrado_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  tipoDocAdministradoC: string;

  @ApiProperty({ description: 'Identification document number' })
  @Column({
    name: 'nro_doc_identificacion_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  nroDocIdentificacionC: string;

  @ApiProperty({ description: 'Type administered' })
  @Column({
    name: 'tipo_administrado_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  tipoAdministradoC: string;

  @ApiProperty({ description: 'Ubigeo code' })
  @Column({
    name: 'ubigeo_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  ubigeoC: string;

  @ApiProperty({ description: 'Electronic entry' })
  @Column({
    name: 'partida_eletronica_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  partidaEletronicaC: string;

  @ApiProperty({ description: 'Registry office' })
  @Column({
    name: 'oficina_registral_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  oficinaRegistralC: string;

  @ApiProperty({ description: 'Route sheet' })
  @Column({
    name: 'hoja_ruta_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  hojaRutaC: string;

  @ApiProperty({ description: 'Status' })
  @Column({
    name: 'status_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  statusC: string;

  @ApiProperty({ description: 'Consultant code' })
  @Column({
    name: 'cod_consultor_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  codConsultorC: string;

  @ApiProperty({ description: 'Registration URL' })
  @Column({
    name: 'url_inscripcion_c',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  urlInscripcionC: string;

  @ApiProperty({ description: 'Presentation date' })
  @Column({
    name: 'fecha_presentacion_c',
    type: 'date',
    nullable: true,
  })
  fechaPresentacionC: Date;

  @ApiProperty({ description: 'Social object' })
  @Column({
    name: 'objeto_social_c',
    type: 'text',
    nullable: true,
  })
  objetoSocialC: string;

  @ApiProperty({ description: 'Partners seat' })
  @Column({
    name: 'asiento_socios_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  asientoSociosC: string;

  // Relations
  @ApiProperty({ description: 'Associated account', type: () => Account })
  @OneToOne(() => Account, (account) => account.customFields)
  @JoinColumn({ name: 'id_c' })
  account: Account;
}
