import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from './project.entity';

@Entity('proy_proyectostele_cstm')
export class ProjectCustom {
  @ApiProperty({ description: 'ID personalizado' })
  @PrimaryColumn({ name: 'id_c' })
  idC: string;

  @ApiProperty({ description: 'Tipo de mimetización' })
  @Column({ name: 'tipo_mimetizacion_c', nullable: true })
  tipoMimetizacionC: string;

  @ApiProperty({ description: 'SEIA / No SEIA' })
  @Column({ name: 'seia_noseia_c', nullable: true })
  seiaNoSeiaC: string;

  @ApiProperty({ description: 'Zonificación desplegable' })
  @Column({ name: 'zonificacion_desplegagle_c', nullable: true })
  zonificacionDesplegableC: string;

  @ApiProperty({ description: 'HE' })
  @Column({ name: 'he_c', nullable: true })
  heC: string;

  @ApiProperty({ description: 'HS' })
  @Column({ name: 'hs_c', nullable: true })
  hsC: string;

  @ApiProperty({ description: 'Cantidad de postes' })
  @Column({ name: 'cant_postes_c', type: 'int', nullable: true })
  cantPostesC: number;

  @ApiProperty({ description: 'Longitud aérea' })
  @Column({
    name: 'long_aereo_c',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  longAereoC: number;

  @ApiProperty({ description: 'Longitud subterránea' })
  @Column({
    name: 'long_subterraneo_c',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  longSubterraneoC: number;

  @ApiProperty({ description: 'Canalizado nuevo' })
  @Column({ name: 'canalizado_nuevo_c', nullable: true })
  canalizadoNuevoC: string;

  @ApiProperty({ description: 'ANP / ZA' })
  @Column({ name: 'anp_za_c', nullable: true })
  anpZaC: string;

  @ApiProperty({ description: 'Número de antenas' })
  @Column({ name: 'num_antenas_c', type: 'int', nullable: true })
  numAntenasC: number;

  @ApiProperty({ description: 'Número de nodos' })
  @Column({ name: 'num_nodos_c', type: 'int', nullable: true })
  numNodosC: number;

  @ApiProperty({ description: 'Servicio del proyecto' })
  @Column({ name: 'proy_servicio_c', nullable: true })
  proyServicioC: string;

  @ApiProperty({ description: 'Objetivo' })
  @Column({ name: 'objetive_c', type: 'text', nullable: true })
  objetiveC: string;

  @ApiProperty({ description: 'Radiodifusión' })
  @Column({ name: 'radiodifusion_c', nullable: true })
  radiodifusionC: string;

  @ApiProperty({ description: 'Medidas de contingencia' })
  @Column({ name: 'medidas_contingencia_c', type: 'text', nullable: true })
  medidasContingenciaC: string;

  @ApiProperty({ description: 'Medidas socioambientales' })
  @Column({ name: 'medidas_socioambientales_c', type: 'text', nullable: true })
  medidasSocioambientalesC: string;

  @ApiProperty({ description: 'Fechas de construcción' })
  @Column({ name: 'construccion_fechas_c', type: 'date', nullable: true })
  construccionFechasC: Date;

  @ApiProperty({ description: 'Fechas de operación' })
  @Column({ name: 'operacion_fechas_c', type: 'date', nullable: true })
  operacionFechasC: Date;

  @ApiProperty({ description: 'Fechas de cierre' })
  @Column({ name: 'cierre_fechas_c', type: 'date', nullable: true })
  cierreFechasC: Date;

  @ApiProperty({ description: 'Link otra mimetización' })
  @Column({ name: 'link_otra_mimetizacion_c', nullable: true })
  linkOtraMimetizacionC: string;

  @ApiProperty({ description: 'URL KMZ' })
  @Column({ name: 'url_kmz_c', nullable: true })
  urlKmzC: string;

  @ApiProperty({ description: 'Actividad excluida' })
  @Column({ name: 'actividad_excluida_c', nullable: true })
  actividadExcluidaC: string;

  @ApiProperty({ description: 'URL exclusión' })
  @Column({ name: 'url_exclusion_c', nullable: true })
  urlExclusionC: string;

  // Relación uno a uno con Project
  @OneToOne('Project', 'customFields')
  @JoinColumn({ name: 'id_c' })
  project: Project;
}
