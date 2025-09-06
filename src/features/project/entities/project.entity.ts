import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Fitac } from '@features/fitac/entities/fitac.entity';
import { ProjectCustom } from './project-custom.entity';
import { Account } from '@features/account/entities/account.entity';

@Entity({ name: 'proy_proyectostele' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'date_entered', type: 'datetime', nullable: true })
  dateEntered: Date;

  @Column({ name: 'date_modified', type: 'datetime', nullable: true })
  dateModified: Date;

  @Column({
    name: 'modified_user_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  modifiedUserId: string;

  @Column({ name: 'created_by', type: 'varchar', length: 36, nullable: true })
  createdBy: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'deleted', type: 'tinyint', default: 0 })
  deleted: number;

  @Column({
    name: 'assigned_user_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  assignedUserId: string;

  @Column({
    name: 'document_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  documentName: string;

  @Column({
    name: 'filename',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  filename: string;

  @Column({
    name: 'file_ext',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  fileExt: string;

  @Column({
    name: 'file_mime_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  fileMimeType: string;

  @Column({ name: 'active_date', type: 'date', nullable: true })
  activeDate: Date;

  @Column({ name: 'exp_date', type: 'date', nullable: true })
  expDate: Date;

  @Column({ name: 'category_id', type: 'varchar', length: 36, nullable: true })
  categoryId: string;

  @Column({
    name: 'subcategory_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  subcategoryId: string;

  @Column({ name: 'status_id', type: 'varchar', length: 36, nullable: true })
  statusId: string;

  @Column({
    name: 'direccion_proy_city',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  projectAddressCity: string;

  @Column({
    name: 'direccion_proy_state',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  projectAddressState: string;

  @Column({
    name: 'direccion_proy_postalcode',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  projectAddressPostalCode: string;

  @Column({
    name: 'direccion_proy_country',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  projectAddressCountry: string;

  @Column({
    name: 'direccion_proy',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  projectAddress: string;

  @Column({ name: 'inicio_obra_proy', type: 'date', nullable: true })
  projectStartDate: Date;

  @Column({
    name: 'monto_proy',
    type: 'decimal',
    precision: 26,
    scale: 6,
    nullable: true,
  })
  projectAmount: number;

  @Column({
    name: 'presupuesto_ambi',
    type: 'decimal',
    precision: 26,
    scale: 6,
    nullable: true,
  })
  environmentalBudget: number;

  @Column({ name: 'vida_util_proy', type: 'int', nullable: true })
  projectUsefulLife: number;

  @Column({ name: 'proy_number', type: 'varchar', length: 50, nullable: true })
  projectNumber: string;

  @Column({
    name: 'proy_area_peri',
    type: 'decimal',
    precision: 26,
    scale: 6,
    nullable: true,
  })
  projectAreaPerimeter: number;

  @Column({
    name: 'proy_coord_utm',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  projectUtmCoordinates: string;

  @Column({
    name: 'proy_zone_utm',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  projectUtmZone: string;

  @Column({
    name: 'proy_coord_geo',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  projectGeoCoordinates: string;

  @Column({ name: 'proy_ubigeo', type: 'varchar', length: 20, nullable: true })
  projectUbigeo: string;

  @Column({
    name: 'rni_teorico',
    type: 'decimal',
    precision: 26,
    scale: 6,
    nullable: true,
  })
  theoreticalRni: number;

  @Column({
    name: 'altura_extension',
    type: 'decimal',
    precision: 26,
    scale: 6,
    nullable: true,
  })
  heightExtension: number;

  @Column({
    name: 'tipo_infraestructura',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  infrastructureType: string;

  @Column({
    name: 'area_peri',
    type: 'decimal',
    precision: 26,
    scale: 6,
    nullable: true,
  })
  areaPerimeter: number;

  @Column({
    name: 'latitud',
    type: 'decimal',
    precision: 26,
    scale: 6,
    nullable: true,
  })
  latitude: number;

  @Column({
    name: 'longitud',
    type: 'decimal',
    precision: 26,
    scale: 6,
    nullable: true,
  })
  longitude: number;

  @ManyToMany(() => Fitac)
  @JoinTable({
    name: 'fitac_fitac_proy_proyectostele_c',
    joinColumn: {
      name: 'fitac_fitac_proy_proyectosteleproy_proyectostele_ida',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'fitac_fitac_proy_proyectostelefitac_fitac_idb',
      referencedColumnName: 'id',
    },
  })
  fitacs: Fitac[];

  @OneToOne(() => ProjectCustom, (custom) => custom.project)
  custom: ProjectCustom;

  @ManyToMany(() => Account, (account) => account.projects)
  accounts: Account[];
}
