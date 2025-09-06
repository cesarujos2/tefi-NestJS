import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Fitac } from './fitac.entity';

@Entity('fitac_fitac_cstm')
export class FitacCustom {
  @ApiProperty({ description: 'ID personalizado' })
  @PrimaryColumn({ name: 'id_c' })
  idC: string;

  @ApiProperty({ description: 'Fitac V1' })
  @Column({ name: 'fitac_v1_c', nullable: true })
  fitacV1C: string;

  @ApiProperty({ description: 'Fitac V2' })
  @Column({ name: 'fitac_v2_c', nullable: true })
  fitacV2C: string;

  @ApiProperty({ description: 'Fitac V3' })
  @Column({ name: 'fitac_v3_c', nullable: true })
  fitacV3C: string;

  @ApiProperty({ description: 'Fitac V4' })
  @Column({ name: 'fitac_v4_c', nullable: true })
  fitacV4C: string;

  @ApiProperty({ description: 'Fitac V5' })
  @Column({ name: 'fitac_v5_c', nullable: true })
  fitacV5C: string;

  @ApiProperty({ description: 'Fitac V6' })
  @Column({ name: 'fitac_v6_c', nullable: true })
  fitacV6C: string;

  @ApiProperty({ description: 'Fitac V7' })
  @Column({ name: 'fitac_v7_c', nullable: true })
  fitacV7C: string;

  @ApiProperty({ description: 'Fitac V8' })
  @Column({ name: 'fitac_v8_c', nullable: true })
  fitacV8C: string;

  @ApiProperty({ description: 'Fitac V9' })
  @Column({ name: 'fitac_v9_c', nullable: true })
  fitacV9C: string;

  @ApiProperty({ description: 'Fitac V10' })
  @Column({ name: 'fitac_v10_c', nullable: true })
  fitacV10C: string;

  @ApiProperty({ description: 'Fitac V11' })
  @Column({ name: 'fitac_v11_c', nullable: true })
  fitacV11C: string;

  @ApiProperty({ description: 'Fitac V12' })
  @Column({ name: 'fitac_v12_c', nullable: true })
  fitacV12C: string;

  @ApiProperty({ description: 'Fitac V13' })
  @Column({ name: 'fitac_v13_c', nullable: true })
  fitacV13C: string;

  @ApiProperty({ description: 'Fitac V14' })
  @Column({ name: 'fitac_v14_c', nullable: true })
  fitacV14C: string;

  @ApiProperty({ description: 'Fitac V15' })
  @Column({ name: 'fitac_v15_c', nullable: true })
  fitacV15C: string;

  @ApiProperty({ description: 'Párrafo no conforme' })
  @Column({ name: 'parrafo_no_conforme_c', type: 'text', nullable: true })
  parrafoNoConformeC: string;

  @ApiProperty({ description: 'Número de oficio representante' })
  @Column({ name: 'nro_oficio_rep_c', nullable: true })
  nroOficioRepC: string;

  @ApiProperty({ description: 'Fecha de oficio' })
  @Column({ name: 'fecha_oficio_c', type: 'date', nullable: true })
  fechaOficioC: Date;

  @ApiProperty({ description: 'Copias' })
  @Column({ name: 'copias_c', nullable: true })
  copiasC: string;

  @ApiProperty({ description: 'Hora inicial' })
  @Column({ name: 'hr_inicial_c', type: 'time', nullable: true })
  hrInicialC: string;

  @ApiProperty({ description: 'Fecha de ingreso' })
  @Column({ name: 'fecha_ingreso_c', type: 'date', nullable: true })
  fechaIngresoC: Date;

  @ApiProperty({ description: 'Tipo de expediente' })
  @Column({ name: 'tipo_expediente_c', nullable: true })
  tipoExpedienteC: string;

  @ApiProperty({ description: 'Link FITAC' })
  @Column({ name: 'link_fitac_c', nullable: true })
  linkFitacC: string;

  @ApiProperty({ description: 'Link oficio' })
  @Column({ name: 'link_oficio_c', nullable: true })
  linkOficioC: string;

  @ApiProperty({ description: 'ID de cuenta' })
  @Column({ name: 'account_id_c', nullable: true })
  accountIdC: string;

  @ApiProperty({ description: 'Link RNI' })
  @Column({ name: 'link_rni_c', nullable: true })
  linkRniC: string;

  @ApiProperty({ description: 'Link SEIA' })
  @Column({ name: 'link_seia_c', nullable: true })
  linkSeiaC: string;

  @ApiProperty({ description: 'Fitac V16' })
  @Column({ name: 'fitac_v16_c', nullable: true })
  fitacV16C: string;

  @ApiProperty({ description: 'Fitac V17' })
  @Column({ name: 'fitac_v17_c', nullable: true })
  fitacV17C: string;

  @ApiProperty({ description: 'Fitac V18' })
  @Column({ name: 'fitac_v18_c', nullable: true })
  fitacV18C: string;

  @ApiProperty({ description: 'Número de informe representante' })
  @Column({ name: 'nro_informe_rep_c', nullable: true })
  nroInformeRepC: string;

  @ApiProperty({ description: 'Link informe representante' })
  @Column({ name: 'link_informe_rep_c', nullable: true })
  linkInformeRepC: string;

  @ApiProperty({ description: 'Fecha informe representante' })
  @Column({ name: 'fecha_informe_rep_c', type: 'date', nullable: true })
  fechaInformeRepC: Date;

  @ApiProperty({ description: 'ID de cuenta 1' })
  @Column({ name: 'account_id1_c', nullable: true })
  accountId1C: string;

  @ApiProperty({ description: 'FTA V19' })
  @Column({ name: 'fta_v19_c', nullable: true })
  ftaV19C: string;

  @ApiProperty({ description: 'Fecha de acuse' })
  @Column({ name: 'fecha_acuse_c', type: 'date', nullable: true })
  fechaAcuseC: Date;

  @ApiProperty({ description: 'Tipo de proyecto' })
  @Column({ name: 'tipo_proyecto_c', nullable: true })
  tipoProyectoC: string;

  @ApiProperty({ description: 'Informe de abandono' })
  @Column({ name: 'informe_abandono_c', nullable: true })
  informeAbandonoC: string;

  @ApiProperty({ description: 'Fecha informe abandono' })
  @Column({ name: 'fecha_informe_abandono_c', type: 'date', nullable: true })
  fechaInformeAbandonoC: Date;

  @ApiProperty({ description: 'URL informe abandono' })
  @Column({ name: 'url_informe_abandono_c', nullable: true })
  urlInformeAbandonoC: string;

  @ApiProperty({ description: 'Número oficio abandono' })
  @Column({ name: 'nro_oficio_abandono_c', nullable: true })
  nroOficioAbandonoC: string;

  @ApiProperty({ description: 'Fecha oficio abandono' })
  @Column({ name: 'fecha_oficio_abandono_c', type: 'date', nullable: true })
  fechaOficioAbandonoC: Date;

  @ApiProperty({ description: 'URL oficio abandono' })
  @Column({ name: 'url_oficio_abandono_c', nullable: true })
  urlOficioAbandonoC: string;

  @ApiProperty({ description: 'Estado de atención' })
  @Column({ name: 'estado_atencion_c', nullable: true })
  estadoAtencionC: string;

  @ApiProperty({ description: 'Hora ampliación' })
  @Column({ name: 'hr_ampliacion_c', type: 'time', nullable: true })
  hrAmpliacionC: string;

  @ApiProperty({ description: 'Notificación' })
  @Column({ name: 'notificacion_c', nullable: true })
  notificacionC: string;

  @ApiProperty({ description: 'Notificación abandono' })
  @Column({ name: 'notificacion_abandono_c', nullable: true })
  notificacionAbandonoC: string;

  @ApiProperty({ description: 'Número de solicitud' })
  @Column({ name: 'numero_solicitud_c', nullable: true })
  numeroSolicitudC: string;

  @ApiProperty({ description: 'URL medidas contingencia' })
  @Column({ name: 'url_medidas_contingencia_c', nullable: true })
  urlMedidasContingenciaC: string;

  @ApiProperty({ description: 'URL medidas ambientales' })
  @Column({ name: 'url_medidas_ambientales_c', nullable: true })
  urlMedidasAmbientalesC: string;

  @ApiProperty({ description: 'ID documento oficio resolución' })
  @Column({ name: 'oficio_resol_doc_id_c', nullable: true })
  oficioResolDocIdC: string;

  @ApiProperty({ description: 'ID documento informe resolución' })
  @Column({ name: 'informe_resol_doc_id_c', nullable: true })
  informeResolDocIdC: string;

  @ApiProperty({ description: 'ID documento FITAC' })
  @Column({ name: 'fitac_doc_id_c', nullable: true })
  fitacDocIdC: string;

  // Relación 1:1 con Fitac
  @OneToOne('Fitac', 'customFields')
  @JoinColumn({ name: 'id_c' })
  fitac: Fitac;
}
