import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Contact } from './contact.entity';

/**
 * ContactCustom entity representing the contacts_cstm table
 * Contains all custom contact fields
 */
@Entity('contacts_cstm')
export class ContactCustom {
  @PrimaryColumn({ name: 'id_c', type: 'char', length: 36 })
  idC: string;

  @Column({
    name: 'ubigeo_contact_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  ubigeoContactC: string;

  @Column({
    name: 'numero_asiento_partida_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  numeroAsientoPartidaC: string;

  @Column({
    name: 'tipo_doc_contac_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  tipoDocContactC: string;

  @Column({
    name: 'doc_ident_contact_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  docIdentContactC: string;

  @Column({
    name: 'tuitionnumber_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  tuitionNumberC: string;

  @Column({
    name: 'rol_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  rolC: string;

  @Column({
    name: 'status_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  statusC: string;

  @Column({
    name: 'url_inscripcion_c',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  urlInscripcionC: string;

  @Column({
    name: 'vigencia_colegiatura_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  vigenciaColegiaturaC: string;

  @Column({
    name: 'acreditacion_otros_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  acreditacionOtrosC: string;

  @Column({
    name: 'acreditacion_ambiental_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  acreditacionAmbientalC: string;

  @Column({
    name: 'acreditacion_social_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  acreditacionSocialC: string;

  @Column({
    name: 'person_type_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  personTypeC: string;

  @Column({
    name: 'poderes_partida_registral_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  poderesPartidaRegistralC: string;

  @Column({
    name: 'poderes_zona_registral_c',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  poderesZonaRegistralC: string;

  // Relationship with main contact entity
  @OneToOne(() => Contact, (contact) => contact.customFields)
  @JoinColumn({ name: 'id_c' })
  contact: Contact;
}
