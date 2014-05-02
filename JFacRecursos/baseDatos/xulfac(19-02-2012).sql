/*
SQLyog Community Edition- MySQL GUI v6.07
Host - 5.0.21-community-nt : Database - xulfac
*********************************************************************
Server version : 5.0.21-community-nt
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `xulfac`;

USE `xulfac`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `com_fac_compra` */

DROP TABLE IF EXISTS `com_fac_compra`;

CREATE TABLE `com_fac_compra` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_proveedor` bigint(20) unsigned NOT NULL default '0',
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `id_periodo` bigint(20) unsigned default '0',
  `fechaEmision` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaRegistro` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaCaducidad` datetime NOT NULL default '0000-00-00 00:00:00',
  `numeroFactura` varchar(45) NOT NULL default '',
  `numeroAutorizacion` varchar(45) NOT NULL default '',
  `subtotal` double NOT NULL default '0',
  `sobrecargo` double NOT NULL default '0',
  `iva` double NOT NULL default '0',
  `descuento` double NOT NULL default '0',
  `total` double NOT NULL default '0',
  `estado` varchar(45) NOT NULL,
  `fechaAutorizacion` datetime NOT NULL default '0000-00-00 00:00:00',
  `ivaPorcentaje` double NOT NULL default '0',
  `tipoDocumento` varchar(45) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_profaccompra_proveedor` (`id_proveedor`),
  KEY `FK_profaccompra_usuario` (`id_usuario`),
  KEY `FK_faccompra_local` (`id_local`),
  KEY `FK_faccompra_periodo` (`id_periodo`),
  CONSTRAINT `FK_faccompra_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_faccompra_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `cont_periodo_contable` (`id`),
  CONSTRAINT `FK_profaccompra_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `com_proveedor` (`id`),
  CONSTRAINT `FK_profaccompra_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `seg_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='InnoDB free: 9216 kB; (`id_proveedor`) REFER `xulfac/pro_pro';

/*Data for the table `com_fac_compra` */

insert  into `com_fac_compra`(`id`,`id_proveedor`,`id_usuario`,`id_local`,`id_periodo`,`fechaEmision`,`fechaRegistro`,`fechaCaducidad`,`numeroFactura`,`numeroAutorizacion`,`subtotal`,`sobrecargo`,`iva`,`descuento`,`total`,`estado`,`fechaAutorizacion`,`ivaPorcentaje`,`tipoDocumento`) values (2,1,1,2,3,'2012-02-14 00:00:00','2012-02-14 02:01:21','2012-02-14 00:00:00','000-000-0000002','dsa',7,0,0,0,7,'Finalizada','2012-02-14 00:00:00',12,'1'),(3,1,1,2,3,'2012-02-14 00:00:00','2012-02-14 11:37:14','2012-02-14 00:00:00','000-000-0000003','',28.98,0,0,0,28.98,'Finalizada','2012-02-14 00:00:00',12,'1'),(4,1,1,2,3,'2012-02-15 00:00:00','2012-02-15 04:51:37','2012-02-15 00:00:00','000-000-0000000','',5,0,0.6,0,5.6,'Finalizada','2012-02-15 00:00:00',12,'1'),(5,1,1,2,3,'2012-02-16 00:00:00','2012-02-16 12:03:25','2012-02-16 00:00:00','000-000-0000001','11',70,0,0,0,70,'Finalizada','2012-02-16 00:00:00',12,'1'),(6,1,1,2,3,'2012-02-16 00:00:00','2012-02-16 02:54:47','2012-02-16 00:00:00','000-000-0000004','',460,0,55.2,0,515.2,'Finalizada','2012-02-16 00:00:00',12,'1'),(7,2,1,2,3,'2012-02-16 00:00:00','2012-02-16 03:19:53','2012-02-16 00:00:00','000-000-0000005','',400,0,48,0,448,'Finalizada','2012-02-16 00:00:00',12,'1'),(8,3,1,2,3,'2012-02-16 00:00:00','2012-02-16 03:20:30','2012-02-16 00:00:00','000-000-0000006','',460,0,55.2,0,515.2,'Finalizada','2012-02-16 00:00:00',12,'1'),(9,4,1,2,3,'2012-02-16 00:00:00','2012-02-16 03:20:52','2012-02-16 00:00:00','000-000-0000007','',680,0,81.6,0,761.6,'Finalizada','2012-02-16 00:00:00',12,'1'),(10,5,1,2,3,'2012-02-16 00:00:00','2012-02-16 03:21:12','2012-02-16 00:00:00','000-000-0000008','',220,0,26.4,0,246.4,'Finalizada','2012-02-16 00:00:00',12,'1'),(11,1,1,2,3,'2012-02-16 00:00:00','2012-02-16 04:17:34','2012-02-16 00:00:00','000-000-0000009','',20,0,2.4,0,22.4,'Finalizada','2012-02-16 00:00:00',12,'1'),(12,5,1,2,3,'2012-02-18 00:00:00','2012-02-18 09:11:49','2012-02-18 00:00:00','000-000-0000013','',8.98,0,0,0,8.98,'Registrada','2012-02-18 00:00:00',12,'1');

/*Table structure for table `com_fac_compra_detalle` */

DROP TABLE IF EXISTS `com_fac_compra_detalle`;

CREATE TABLE `com_fac_compra_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_producto` bigint(20) unsigned NOT NULL default '0',
  `id_faccompra` bigint(20) unsigned NOT NULL default '0',
  `cantidad` double NOT NULL default '0',
  `costo` double NOT NULL default '0',
  `descuento` double NOT NULL default '0',
  `subtotal` double NOT NULL default '0',
  `iva` double NOT NULL default '0',
  `descuentoPorcentaje` double NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_faccompra_detalle_producto` (`id_producto`),
  KEY `FK_faccompra_detalle_fac` (`id_faccompra`),
  CONSTRAINT `FK_faccompra_detalle_fac` FOREIGN KEY (`id_faccompra`) REFERENCES `com_fac_compra` (`id`),
  CONSTRAINT `FK_faccompra_detalle_producto` FOREIGN KEY (`id_producto`) REFERENCES `inv_producto` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `com_fac_compra_detalle` */

insert  into `com_fac_compra_detalle`(`id`,`id_producto`,`id_faccompra`,`cantidad`,`costo`,`descuento`,`subtotal`,`iva`,`descuentoPorcentaje`) values (2,1,2,1,7,0,7,0,0),(3,2,3,1,20,0,20,0,0),(4,3,3,1,1.98,0,1.98,0,0),(5,1,3,1,7,0,7,0,0),(6,6,4,1,5,0,5.6,0.6,0),(7,1,5,10,7,0,70,0,0),(8,2,6,23,20,0,515.2,55.2,0),(9,2,7,20,20,0,448,48,0),(10,2,8,23,20,0,515.2,55.2,0),(11,2,9,34,20,0,761.6,81.6,0),(12,2,10,11,20,0,246.4,26.4,0),(13,2,11,1,20,0,22.4,2.4,0),(14,1,12,1,7,0,7,0,0),(15,3,12,1,1.98,0,1.98,0,0);

/*Table structure for table `com_producto_proveedor` */

DROP TABLE IF EXISTS `com_producto_proveedor`;

CREATE TABLE `com_producto_proveedor` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_producto` bigint(20) unsigned NOT NULL default '0',
  `id_proveedor` bigint(20) unsigned NOT NULL default '0',
  `id_retencion_ir` bigint(20) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_com_producto_proveedor_prod` (`id_producto`),
  KEY `FK_com_producto_proveedor_prov` (`id_proveedor`),
  KEY `FK_com_producto_proveedor_ret` (`id_retencion_ir`),
  CONSTRAINT `FK_com_producto_proveedor_prod` FOREIGN KEY (`id_producto`) REFERENCES `inv_producto` (`id`),
  CONSTRAINT `FK_com_producto_proveedor_prov` FOREIGN KEY (`id_proveedor`) REFERENCES `com_proveedor` (`id`),
  CONSTRAINT `FK_com_producto_proveedor_ret` FOREIGN KEY (`id_retencion_ir`) REFERENCES `cont_retencion_ir` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `com_producto_proveedor` */

insert  into `com_producto_proveedor`(`id`,`id_producto`,`id_proveedor`,`id_retencion_ir`) values (1,1,1,3),(2,2,2,8),(3,2,1,2),(4,2,3,1),(5,2,4,16),(6,2,5,20),(7,4,1,22),(8,10,1,24);

/*Table structure for table `com_proveedor` */

DROP TABLE IF EXISTS `com_proveedor`;

CREATE TABLE `com_proveedor` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `tipoIdentificacion` varchar(45) NOT NULL default '',
  `identificacion` varchar(45) NOT NULL default '',
  `razonSocial` varchar(45) NOT NULL default '',
  `provincia` varchar(45) NOT NULL default '',
  `ciudad` varchar(45) NOT NULL default '',
  `direccion` varchar(45) NOT NULL default '',
  `contacto` varchar(45) NOT NULL default '',
  `telefono` varchar(45) NOT NULL default '',
  `fax` varchar(45) NOT NULL default '',
  `celular` varchar(45) NOT NULL default '',
  `mail` varchar(45) NOT NULL default '',
  `tipoProveedor` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `Index_prov_identificacion` (`identificacion`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `com_proveedor` */

insert  into `com_proveedor`(`id`,`tipoIdentificacion`,`identificacion`,`razonSocial`,`provincia`,`ciudad`,`direccion`,`contacto`,`telefono`,`fax`,`celular`,`mail`,`tipoProveedor`) values (1,'','1104285604','Comercial Tomásss','loja','loja','loja','loja','s/n','','','','TIPO_PROVEEDOR_EMITE'),(2,'','112221321','sadsadsa','','','','','','','','',''),(3,'CEDULA','1105345678','Comercial Granda','Guayas','Guayaquil','Av. de las Américas','Joaquín Verdesoto','2834523','','','','TIPO_PROVEEDOR_EMT_LIQ_COMP'),(4,'RUC','1102143920','Comercio Nueva Loja','Guayas','DurÃ¡n','Av. Las AmÃ©ricas','Luis Gonzales','2835463','','','','TIPO_PROVEEDOR_OBLIGADA'),(5,'RUC','1100234520','H & H','Loja','Catamayo','Catamayo','Luis Rengel','2341232','','','','TIPO_PROVEEDOR_PROFESIONALES');

/*Table structure for table `cont_asiento` */

DROP TABLE IF EXISTS `cont_asiento`;

CREATE TABLE `cont_asiento` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_lote` bigint(20) unsigned NOT NULL default '0' COMMENT 'id de lote de asientos',
  `documento` varchar(45) character set latin1 NOT NULL default '' COMMENT 'numero o nombre del documento',
  `origen` varchar(45) character set latin1 NOT NULL default '' COMMENT 'en donde se origina el movimiento',
  `descripcion` varchar(100) character set latin1 NOT NULL default '' COMMENT 'descripcion del asiento',
  `id_plan` bigint(20) unsigned NOT NULL default '0' COMMENT 'id del periodo contable',
  `tipo` varchar(45) character set latin1 NOT NULL default '' COMMENT 'debe o haber',
  `monto` double NOT NULL default '0' COMMENT 'monto del asiento',
  `fecha` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT 'fecha cuando se realizo',
  `id_periodo` bigint(20) unsigned NOT NULL default '0',
  `id_local` bigint(20) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_cont_asiento_plan` (`id_plan`),
  KEY `FK_cont_asiento_periodo` (`id_periodo`),
  KEY `FK_cont_asiento_local` (`id_local`),
  KEY `FK_cont_asiento_lote` (`id_lote`),
  CONSTRAINT `FK_cont_asiento_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_cont_asiento_lote` FOREIGN KEY (`id_lote`) REFERENCES `cont_lote_asientos` (`id`),
  CONSTRAINT `FK_cont_asiento_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `cont_periodo_contable` (`id`),
  CONSTRAINT `FK_cont_asiento_plan` FOREIGN KEY (`id_plan`) REFERENCES `cont_plan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='InnoDB free: 8192 kB; (`id_lote`) REFER `xulfac/cont_lote_as';

/*Data for the table `cont_asiento` */

insert  into `cont_asiento`(`id`,`id_lote`,`documento`,`origen`,`descripcion`,`id_plan`,`tipo`,`monto`,`fecha`,`id_periodo`,`id_local`) values (17,9,'1','anticipo','',4,'Debe',10,'2012-02-11 07:20:48',3,2),(18,9,'1','anticipo','',125,'Haber',10,'2012-02-11 07:20:48',3,2),(19,10,'2','anticipo','',11,'Debe',100,'2012-02-11 07:23:06',3,2),(20,10,'2','anticipo','',125,'Haber',100,'2012-02-11 07:23:06',3,2),(26,16,'8','anticipo','',125,'Haber',100,'2012-02-11 07:49:34',3,2),(27,16,'8','anticipo','',4,'Debe',100,'2012-02-11 07:49:34',3,2),(31,20,'12','anticipo','',125,'Haber',70,'2012-02-11 08:08:07',3,2),(32,20,'12','anticipo','',4,'Debe',70,'2012-02-11 08:08:07',3,2),(33,21,'8','anticipo','',4,'Haber',100,'2012-02-11 08:56:05',3,2),(34,21,'8','anticipo','',125,'Debe',100,'2012-02-11 08:56:05',3,2),(35,22,'8','anticipo','',125,'Haber',20,'2012-02-11 08:56:06',3,2),(36,22,'8','anticipo','',4,'Debe',20,'2012-02-11 08:56:06',3,2),(37,23,'8','anticipo','',4,'Haber',20,'2012-02-11 08:57:09',3,2),(38,23,'8','anticipo','',125,'Debe',20,'2012-02-11 08:57:09',3,2),(39,24,'8','anticipo','',125,'Haber',100,'2012-02-11 08:57:09',3,2),(40,24,'8','anticipo','',4,'Debe',100,'2012-02-11 08:57:09',3,2),(41,25,'12','anticipo','',4,'Haber',70,'2012-02-11 09:03:38',3,2),(42,25,'12','anticipo','',125,'Debe',70,'2012-02-11 09:03:38',3,2),(43,26,'8','anticipo','',4,'Haber',100,'2012-02-11 09:04:50',3,2),(44,26,'8','anticipo','',125,'Debe',100,'2012-02-11 09:04:50',3,2),(45,27,'1','anticipo','',125,'Debe',10,'2012-02-11 09:19:01',3,2),(46,27,'1','anticipo','',4,'Haber',10,'2012-02-11 09:19:01',3,2),(47,28,'13','anticipo','',125,'Haber',20,'2012-02-11 09:26:14',3,2),(48,28,'13','anticipo','',1,'Debe',20,'2012-02-11 09:26:14',3,2),(49,29,'4','Pago efectivo','',4,'Debe',150,'2012-02-12 01:23:19',3,2),(50,29,'4','Pago con anticipos','',125,'Debe',10,'2012-02-12 01:23:19',3,2),(51,29,'4','','',24,'Haber',160,'2012-02-12 01:23:19',3,2),(52,31,'','est_sit_ini','EstadoSituacionInicial',1,'Debe',4,'2012-02-13 11:21:23',3,1),(53,31,'','est_sit_ini','EstadoSituacionInicial',2,'Debe',20,'2012-02-13 11:21:23',3,1),(54,31,'','est_sit_ini','EstadoSituacionInicial',4,'Debe',20,'2012-02-13 11:21:23',3,1),(55,31,'','est_sit_ini','EstadoSituacionInicial',5,'Debe',30,'2012-02-13 11:21:23',3,1),(56,31,'','est_sit_ini','EstadoSituacionInicial',6,'Haber',5,'2012-02-13 11:21:23',3,1),(57,31,'','est_sit_ini','EstadoSituacionInicial',11,'Haber',10,'2012-02-13 11:21:23',3,1),(58,31,'','est_sit_ini','EstadoSituacionInicial',12,'Haber',20,'2012-02-13 11:21:23',3,1),(59,31,'','est_sit_ini','EstadoSituacionInicial',27,'Haber',30,'2012-02-13 11:21:23',3,1),(60,31,'','est_sit_ini','EstadoSituacionInicial',61,'Haber',9,'2012-02-13 11:21:23',3,1),(61,32,'','est_sit_ini','EstadoSituacionInicial',1,'Debe',4,'2012-02-13 11:24:00',3,1),(62,32,'','est_sit_ini','EstadoSituacionInicial',2,'Debe',20,'2012-02-13 11:24:00',3,1),(63,32,'','est_sit_ini','EstadoSituacionInicial',4,'Debe',20,'2012-02-13 11:24:00',3,1),(64,32,'','est_sit_ini','EstadoSituacionInicial',5,'Debe',30,'2012-02-13 11:24:00',3,1),(65,32,'','est_sit_ini','EstadoSituacionInicial',6,'Haber',5,'2012-02-13 11:24:00',3,1),(66,32,'','est_sit_ini','EstadoSituacionInicial',11,'Haber',10,'2012-02-13 11:24:00',3,1),(67,32,'','est_sit_ini','EstadoSituacionInicial',12,'Haber',20,'2012-02-13 11:24:00',3,1),(68,32,'','est_sit_ini','EstadoSituacionInicial',27,'Haber',30,'2012-02-13 11:24:00',3,1),(69,32,'','est_sit_ini','EstadoSituacionInicial',61,'Haber',9,'2012-02-13 11:24:00',3,1),(70,33,'','est_sit_ini','EstadoSituacionInicial',1,'Debe',20,'2012-02-13 11:24:41',3,2),(71,33,'','est_sit_ini','EstadoSituacionInicial',4,'Debe',450,'2012-02-13 11:24:41',3,2),(72,33,'','est_sit_ini','EstadoSituacionInicial',4,'Haber',300,'2012-02-13 11:24:41',3,2),(73,33,'','est_sit_ini','EstadoSituacionInicial',11,'Debe',100,'2012-02-13 11:24:41',3,2),(74,33,'','est_sit_ini','EstadoSituacionInicial',24,'Haber',160,'2012-02-13 11:24:41',3,2),(75,33,'','est_sit_ini','EstadoSituacionInicial',125,'Debe',310,'2012-02-13 11:24:41',3,2),(76,33,'','est_sit_ini','EstadoSituacionInicial',125,'Haber',420,'2012-02-13 11:24:41',3,2),(77,37,'1','compra','',5,'Debe',7,'2012-02-14 02:00:38',3,2),(78,37,'1','compra','',24,'Haber',7,'2012-02-14 02:00:38',3,2),(79,38,'2','compra','',5,'Debe',7,'2012-02-14 02:02:03',3,2),(80,38,'2','compra','',24,'Haber',7,'2012-02-14 02:02:03',3,2),(81,39,'3','compra','',5,'Debe',28.98,'2012-02-14 11:37:39',3,2),(82,39,'3','compra','',24,'Haber',28.98,'2012-02-14 11:37:39',3,2),(83,46,'23','Ingreso','',4,'Debe',20,'2012-02-15 01:41:13',3,2),(84,46,'23','Ingreso','',287,'Haber',20,'2012-02-15 01:41:13',3,2),(85,47,'14','anticipo','',4,'Debe',20,'2012-02-15 01:41:58',3,2),(86,47,'14','anticipo','',125,'Haber',20,'2012-02-15 01:41:58',3,2),(87,48,'4','compra','',5,'Debe',5.6,'2012-02-15 04:51:55',3,2),(88,48,'4','compra','',24,'Haber',5.6,'2012-02-15 04:51:55',3,2),(89,53,'11','retencion','',83,'Haber',0.14,'2012-02-15 07:05:39',3,2),(90,53,'11','retencion','',69,'Debe',0.14,'2012-02-15 07:05:39',3,2),(91,54,'5','compra','',5,'Debe',70,'2012-02-16 12:06:53',3,2),(92,54,'5','compra','',24,'Haber',70,'2012-02-16 12:06:53',3,2),(101,59,'16','retencion','',83,'Haber',1.4,'2012-02-16 02:51:41',3,2),(102,59,'16','retencion','',69,'Debe',1.4,'2012-02-16 02:51:41',3,2),(103,60,'6','compra','',5,'Debe',515.2,'2012-02-16 02:55:26',3,2),(104,60,'6','compra','',24,'Haber',515.2,'2012-02-16 02:55:26',3,2),(105,61,'7','compra','',5,'Debe',448,'2012-02-16 03:20:29',3,2),(106,61,'7','compra','',24,'Haber',448,'2012-02-16 03:20:29',3,2),(107,62,'8','compra','',5,'Debe',515.2,'2012-02-16 03:20:51',3,2),(108,62,'8','compra','',24,'Haber',515.2,'2012-02-16 03:20:52',3,2),(109,63,'9','compra','',5,'Debe',761.6,'2012-02-16 03:21:12',3,2),(110,63,'9','compra','',24,'Haber',761.6,'2012-02-16 03:21:12',3,2),(111,64,'10','compra','',5,'Debe',246.4,'2012-02-16 03:21:30',3,2),(112,64,'10','compra','',24,'Haber',246.4,'2012-02-16 03:21:30',3,2),(113,66,'18','retencion','',109,'Haber',38.64,'2012-02-16 03:52:11',3,2),(114,66,'18','retencion','',83,'Haber',36.8,'2012-02-16 03:52:11',3,2),(115,66,'18','retencion','',69,'Debe',75.44,'2012-02-16 03:52:11',3,2),(116,68,'20','retencion','',83,'Haber',4,'2012-02-16 04:03:08',3,2),(117,68,'20','retencion','',69,'Debe',4,'2012-02-16 04:03:08',3,2),(118,69,'21','retencion','',111,'Haber',55.2,'2012-02-16 04:04:23',3,2),(119,69,'21','retencion','',83,'Haber',46,'2012-02-16 04:04:23',3,2),(120,69,'21','retencion','',69,'Debe',101.2,'2012-02-16 04:04:23',3,2),(121,70,'11','compra','',5,'Debe',22.4,'2012-02-16 04:17:50',3,2),(122,70,'11','compra','',24,'Haber',22.4,'2012-02-16 04:17:50',3,2),(123,71,'14','anticipo','',125,'Debe',20,'2012-02-16 05:30:35',3,2),(124,71,'14','anticipo','',4,'Haber',20,'2012-02-16 05:30:35',3,2),(125,72,'5','Pago efectivo','',4,'Debe',8.1,'2012-02-16 05:40:08',3,2),(126,72,'5','','',24,'Haber',8.1,'2012-02-16 05:40:08',3,2),(127,73,'6','Pago efectivo','',4,'Debe',34.85,'2012-02-16 07:06:08',3,2),(128,73,'6','','',24,'Haber',34.85,'2012-02-16 07:06:08',3,2),(129,74,'7','Pago efectivo','',4,'Debe',8.1,'2012-02-16 07:08:29',3,2),(130,74,'7','','',24,'Haber',8.1,'2012-02-16 07:08:29',3,2),(131,75,'8','Pago efectivo','',4,'Debe',8.1,'2012-02-16 07:09:44',3,2),(132,75,'8','','',24,'Haber',8.1,'2012-02-16 07:09:44',3,2),(133,76,'11','Pago con cÃ©dito diferido','',11,'Debe',24.85,'2012-02-16 09:00:25',3,2),(134,76,'11','Pago con crÃ©dito corriente','',11,'Debe',10,'2012-02-16 09:00:25',3,2),(135,76,'11','','',24,'Haber',34.85,'2012-02-16 09:00:25',3,2),(136,77,'9','CobroCuota','',4,'Debe',2,'2012-02-17 09:06:02',3,2),(137,77,'9','CobroCuota','',11,'Haber',2,'2012-02-17 09:06:02',3,2),(138,78,'10','CobroCuota','',4,'Debe',2,'2012-02-17 09:06:17',3,2),(139,78,'10','CobroCuota','',11,'Haber',2,'2012-02-17 09:06:17',3,2),(140,79,'11','CobroCuota','',11,'Haber',2,'2012-02-17 09:07:00',3,2),(141,79,'11','CobroCuota','',14,'Debe',2,'2012-02-17 09:07:00',3,2),(142,80,'12','CobroCuota','',11,'Haber',2,'2012-02-17 09:07:29',3,2),(143,80,'12','CobroCuota','',4,'Debe',2,'2012-02-17 09:07:29',3,2),(144,81,'13','CobroCuota','',15,'Debe',2,'2012-02-17 09:07:55',3,2),(145,81,'13','CobroCuota','',11,'Haber',2,'2012-02-17 09:07:55',3,2),(146,82,'12','Pago con cÃ©dito diferido','',11,'Debe',8.1,'2012-02-17 11:29:33',3,2),(147,82,'12','','',24,'Haber',8.1,'2012-02-17 11:29:33',3,2),(148,83,'14','CobroCuota','',4,'Debe',8.51,'2012-02-17 11:31:01',3,2),(149,83,'14','CobroCuota','',11,'Haber',8.51,'2012-02-17 11:31:01',3,2),(150,84,'13','Pago con crÃ©dito corriente','',11,'Debe',160,'2012-02-17 02:59:28',3,2),(151,84,'13','','',24,'Haber',160,'2012-02-17 02:59:28',3,2),(152,85,'15','Pago con crÃ©dito corriente','',11,'Debe',81,'2012-02-17 03:29:53',3,2),(153,85,'15','','',24,'Haber',81,'2012-02-17 03:29:53',3,2),(154,86,'16','Pago con cÃ©dito diferido','',11,'Debe',1600,'2012-02-17 03:35:30',3,2),(155,86,'16','','',24,'Haber',1600,'2012-02-17 03:35:30',3,2),(156,87,'18','Pago con cÃ©dito diferido','',11,'Debe',48.6,'2012-02-17 04:30:31',3,2),(157,87,'18','','',24,'Haber',48.6,'2012-02-17 04:30:31',3,2),(158,88,'1','CobroCuota','',4,'Debe',18.63,'2012-02-17 04:42:43',3,2),(159,88,'1','CobroCuota','',11,'Haber',18.63,'2012-02-17 04:42:43',3,2),(160,89,'2','CobroCuota','',4,'Debe',18.63,'2012-02-17 04:47:36',3,2),(161,89,'2','CobroCuota','',11,'Haber',18.63,'2012-02-17 04:47:36',3,2),(162,90,'3','CobroCuota','',4,'Debe',18.63,'2012-02-17 04:48:01',3,2),(163,90,'3','CobroCuota','',11,'Haber',18.63,'2012-02-17 04:48:01',3,2),(164,91,'19','Pago con cÃ©dito diferido','',11,'Debe',320,'2012-02-17 05:09:45',3,2),(165,91,'19','','',24,'Haber',320,'2012-02-17 05:09:45',3,2),(166,92,'4','CobroCuota','',4,'Debe',122.67,'2012-02-17 06:09:11',3,2),(167,92,'4','CobroCuota','',11,'Haber',106.67,'2012-02-17 06:09:11',3,2),(168,92,'4','CobroCuota','',161,'Haber',16,'2012-02-17 06:09:11',3,2),(169,93,'5','CobroCuota','',4,'Debe',122.67,'2012-02-17 06:17:06',3,2),(170,93,'5','CobroCuota','',11,'Haber',106.67,'2012-02-17 06:17:06',3,2),(171,93,'5','CobroCuota','',161,'Haber',16,'2012-02-17 06:17:06',3,2),(172,94,'6','CobroCuota','',4,'Debe',122.67,'2012-02-17 06:18:26',3,2),(173,94,'6','CobroCuota','',11,'Haber',106.67,'2012-02-17 06:18:26',3,2),(174,94,'6','CobroCuota','',161,'Haber',16,'2012-02-17 06:18:26',3,2),(175,95,'20','Pago con crÃ©dito corriente','',11,'Debe',160,'2012-02-17 06:19:47',3,2),(176,95,'20','','',24,'Haber',160,'2012-02-17 06:19:47',3,2),(181,98,'10','CobroCuota','',4,'Debe',20,'2012-02-17 06:31:54',3,2),(182,98,'10','CobroCuota','',11,'Haber',20,'2012-02-17 06:31:54',3,2),(183,99,'dsadsa','LoteManual','Egreso xyz',5,'Haber',20,'2012-02-17 06:39:37',3,2),(184,99,'','LoteManual','dsa',202,'Debe',20,'2012-02-17 06:40:11',3,2),(185,100,'','LoteManual','dsadsa',202,'Debe',10,'2012-02-17 06:43:20',3,3),(186,100,'dsa','LoteManual','dsadsa',254,'Haber',10,'2012-02-17 06:43:29',3,3),(187,101,'11','CobroCuota','',4,'Debe',40,'2012-02-18 09:30:37',3,2),(188,101,'11','CobroCuota','',11,'Haber',40,'2012-02-18 09:30:37',3,2),(189,102,'21','Pago con cÃ©dito diferido','',11,'Debe',160,'2012-02-18 10:48:02',3,2),(190,102,'21','','',24,'Haber',160,'2012-02-18 10:48:02',3,2),(191,103,'24','Pago efectivo','',4,'Debe',160,'2012-02-18 10:12:45',3,2),(192,103,'24','','',24,'Haber',160,'2012-02-18 10:12:45',3,2);

/*Table structure for table `cont_banco` */

DROP TABLE IF EXISTS `cont_banco`;

CREATE TABLE `cont_banco` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `nombre` varchar(150) collate utf8_spanish_ci NOT NULL default '',
  `descripcion` varchar(150) collate utf8_spanish_ci NOT NULL default '',
  `estado` tinyint(3) unsigned NOT NULL default '0',
  `codigo` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `utilizaEmpresa` tinyint(3) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `cont_banco` */

insert  into `cont_banco`(`id`,`nombre`,`descripcion`,`estado`,`codigo`,`utilizaEmpresa`) values (1,'BANCO DE LOJA','Banco de Loja',1,'001',1),(2,'BANCO DE GUAYAQUIL','Banco de Guayaquil',1,'002',1),(3,'COOPMEGO','Cooperativa de Ahorro y CrÃ©dito Manuel Esteban Godoy',1,'003',1);

/*Table structure for table `cont_banco_cuenta` */

DROP TABLE IF EXISTS `cont_banco_cuenta`;

CREATE TABLE `cont_banco_cuenta` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_banco` bigint(20) unsigned NOT NULL default '0',
  `numero` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `tipo` varchar(45) collate utf8_spanish_ci NOT NULL default '' COMMENT 'corriente, ahorros',
  `id_plan` bigint(20) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_cont_banco_cuenta_plan` (`id_plan`),
  CONSTRAINT `FK_cont_banco_cuenta_plan` FOREIGN KEY (`id_plan`) REFERENCES `cont_plan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `cont_banco_cuenta` */

insert  into `cont_banco_cuenta`(`id`,`id_banco`,`numero`,`tipo`,`id_plan`) values (1,2,'110425660055','Corriente',1),(2,1,'2900332655','Corriente',4),(3,1,'sa','Corriente',15),(4,3,'sadsa','Ahorros',11),(5,2,'dsadsa','Ahorros',39);

/*Table structure for table `cont_cheque` */

DROP TABLE IF EXISTS `cont_cheque`;

CREATE TABLE `cont_cheque` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_cuenta` bigint(20) unsigned default NULL,
  `id_banco` bigint(20) unsigned default NULL,
  `numero` varchar(45) NOT NULL,
  `fechaEmision` datetime NOT NULL,
  `monto` double NOT NULL,
  `fechaVencimiento` datetime NOT NULL,
  `id_cliente` bigint(20) unsigned default NULL,
  `estado` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`id`),
  KEY `FK_cont_cheque_cuenta` (`id_cuenta`),
  KEY `FK_cont_cheque_banco` (`id_banco`),
  KEY `FK_cont_cheque_cliente` (`id_cliente`),
  CONSTRAINT `FK_cont_cheque_banco` FOREIGN KEY (`id_banco`) REFERENCES `cont_banco` (`id`),
  CONSTRAINT `FK_cont_cheque_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `ven_cliente` (`id`),
  CONSTRAINT `FK_cont_cheque_cuenta` FOREIGN KEY (`id_cuenta`) REFERENCES `cont_banco_cuenta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_cheque` */

insert  into `cont_cheque`(`id`,`id_cuenta`,`id_banco`,`numero`,`fechaEmision`,`monto`,`fechaVencimiento`,`id_cliente`,`estado`) values (1,NULL,2,'1','2012-02-11 00:00:00',100,'2012-02-29 00:00:00',1,'REGISTRADO'),(2,NULL,1,'2213321321321','2012-02-17 00:00:00',2,'2012-02-17 00:00:00',3,'REGISTRADO');

/*Table structure for table `cont_estado_plan` */

DROP TABLE IF EXISTS `cont_estado_plan`;

CREATE TABLE `cont_estado_plan` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `fecha` datetime NOT NULL default '0000-00-00 00:00:00',
  `descripcion` varchar(250) NOT NULL,
  `id_periodo` bigint(20) unsigned default NULL,
  `tipo` varchar(45) NOT NULL,
  `estado` varchar(45) default NULL,
  `id_local` bigint(20) unsigned NOT NULL default '0',
  PRIMARY KEY  USING BTREE (`id`),
  KEY `FK_cont_estado_plan_local` (`id_local`),
  KEY `FK_cont_estado_situacion_periodo` (`id_periodo`),
  CONSTRAINT `FK_cont_estado_plan_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_cont_estado_situacion_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `cont_periodo_contable` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_estado_plan` */

insert  into `cont_estado_plan`(`id`,`fecha`,`descripcion`,`id_periodo`,`tipo`,`estado`,`id_local`) values (1,'2012-02-13 09:49:29','Estado inicial 2012',NULL,'ESTADO_SITUACION_INICIAL','FINALIZADO',2),(2,'2012-02-13 11:09:26','Cierre de periodo contable: Periodo 2012; local: LOCAL BOLIVAR',3,'CIERRE_PERIODO','FINALIZADO',2),(3,'2012-02-13 11:13:18','ESTADO INICIAL - LOCALPRINCIPAL',NULL,'ESTADO_SITUACION_INICIAL','FINALIZADO',1),(6,'2012-02-13 11:21:41','Cierre de periodo contable: Periodo 2012; local: LOCAL PRINCIPAL',3,'CIERRE_PERIODO','FINALIZADO',1),(11,'2012-02-13 11:50:28','d',NULL,'ESTADO_SITUACION_INICIAL','FINALIZADO',3),(12,'2012-02-13 11:52:09','Cierre de periodo contable: Periodo 2012; local: LOCAL ZAMORA',3,'CIERRE_PERIODO','FINALIZADO',3);

/*Table structure for table `cont_estado_plan_detalle` */

DROP TABLE IF EXISTS `cont_estado_plan_detalle`;

CREATE TABLE `cont_estado_plan_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_plan` bigint(20) unsigned NOT NULL default '0',
  `debe` double NOT NULL default '0',
  `haber` double NOT NULL default '0',
  `id_estado_plan` bigint(20) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_cont_estado_plan_detalle_plan` (`id_plan`),
  KEY `FK_cont_est_plan_det_estplan` (`id_estado_plan`),
  CONSTRAINT `FK_cont_estado_plan_detalle_plan` FOREIGN KEY (`id_plan`) REFERENCES `cont_plan` (`id`),
  CONSTRAINT `FK_cont_est_plan_det_estplan` FOREIGN KEY (`id_estado_plan`) REFERENCES `cont_estado_plan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_estado_plan_detalle` */

insert  into `cont_estado_plan_detalle`(`id`,`id_plan`,`debe`,`haber`,`id_estado_plan`) values (1,1,0,0,1),(2,2,0,0,1),(3,3,0,0,1),(4,4,0,0,1),(5,5,0,0,1),(6,6,0,0,1),(7,7,0,0,1),(8,8,0,0,1),(9,9,0,0,1),(10,10,0,0,1),(11,11,0,0,1),(12,12,0,0,1),(13,13,0,0,1),(14,14,0,0,1),(15,15,0,0,1),(16,16,0,0,1),(17,17,0,0,1),(18,18,0,0,1),(19,19,0,0,1),(20,20,0,0,1),(21,21,0,0,1),(22,22,0,0,1),(23,23,0,0,1),(24,24,0,0,1),(25,25,0,0,1),(26,26,0,0,1),(27,27,0,0,1),(28,28,0,0,1),(29,29,0,0,1),(30,30,0,0,1),(31,31,0,0,1),(32,32,0,0,1),(33,33,0,0,1),(34,34,0,0,1),(35,35,0,0,1),(36,36,0,0,1),(37,37,0,0,1),(38,38,0,0,1),(39,39,0,0,1),(40,40,0,0,1),(41,41,0,0,1),(42,42,0,0,1),(43,43,0,0,1),(44,44,0,0,1),(45,45,0,0,1),(46,46,0,0,1),(47,47,0,0,1),(48,48,0,0,1),(49,49,0,0,1),(50,50,0,0,1),(51,51,0,0,1),(52,52,0,0,1),(53,53,0,0,1),(54,54,0,0,1),(55,55,0,0,1),(56,56,0,0,1),(57,57,0,0,1),(58,58,0,0,1),(59,59,0,0,1),(60,60,0,0,1),(61,61,0,0,1),(62,62,0,0,1),(63,63,0,0,1),(64,64,0,0,1),(65,65,0,0,1),(66,66,0,0,1),(67,67,0,0,1),(68,68,0,0,1),(69,69,0,0,1),(70,70,0,0,1),(71,71,0,0,1),(72,72,0,0,1),(73,73,0,0,1),(74,74,0,0,1),(75,75,0,0,1),(76,76,0,0,1),(77,77,0,0,1),(78,78,0,0,1),(79,79,0,0,1),(80,80,0,0,1),(81,81,0,0,1),(82,82,0,0,1),(83,83,0,0,1),(84,84,0,0,1),(85,85,0,0,1),(86,86,0,0,1),(87,87,0,0,1),(88,88,0,0,1),(89,89,0,0,1),(90,90,0,0,1),(91,91,0,0,1),(92,92,0,0,1),(93,93,0,0,1),(94,94,0,0,1),(95,95,0,0,1),(96,96,0,0,1),(97,97,0,0,1),(98,98,0,0,1),(99,99,0,0,1),(100,100,0,0,1),(101,101,0,0,1),(102,102,0,0,1),(103,103,0,0,1),(104,104,0,0,1),(105,105,0,0,1),(106,106,0,0,1),(107,107,0,0,1),(108,108,0,0,1),(109,109,0,0,1),(110,110,0,0,1),(111,111,0,0,1),(112,112,0,0,1),(113,113,0,0,1),(114,114,0,0,1),(115,115,0,0,1),(116,116,0,0,1),(117,117,0,0,1),(118,118,0,0,1),(119,119,0,0,1),(120,120,0,0,1),(121,121,0,0,1),(122,122,0,0,1),(123,123,0,0,1),(124,124,0,0,1),(125,125,0,0,1),(126,126,0,0,1),(127,127,0,0,1),(128,128,0,0,1),(129,129,0,0,1),(130,130,0,0,1),(131,131,0,0,1),(132,132,0,0,1),(133,133,0,0,1),(134,134,0,0,1),(135,135,0,0,1),(136,136,0,0,1),(137,137,0,0,1),(138,138,0,0,1),(139,139,0,0,1),(140,140,0,0,1),(141,141,0,0,1),(142,142,0,0,1),(143,143,0,0,1),(144,144,0,0,1),(145,145,0,0,1),(146,146,0,0,1),(147,147,0,0,1),(148,298,0,0,1),(149,148,0,0,1),(150,149,0,0,1),(151,150,0,0,1),(152,151,0,0,1),(153,152,0,0,1),(154,153,0,0,1),(155,154,0,0,1),(156,155,0,0,1),(157,156,0,0,1),(158,157,0,0,1),(159,158,0,0,1),(160,159,0,0,1),(161,160,0,0,1),(162,161,0,0,1),(163,162,0,0,1),(164,163,0,0,1),(165,164,0,0,1),(166,165,0,0,1),(167,166,0,0,1),(168,167,0,0,1),(169,168,0,0,1),(170,169,0,0,1),(171,170,0,0,1),(172,171,0,0,1),(173,172,0,0,1),(174,173,0,0,1),(175,174,0,0,1),(176,175,0,0,1),(177,176,0,0,1),(178,177,0,0,1),(179,178,0,0,1),(180,179,0,0,1),(181,180,0,0,1),(182,181,0,0,1),(183,182,0,0,1),(184,183,0,0,1),(185,184,0,0,1),(186,185,0,0,1),(187,186,0,0,1),(188,187,0,0,1),(189,188,0,0,1),(190,189,0,0,1),(191,190,0,0,1),(192,191,0,0,1),(193,192,0,0,1),(194,193,0,0,1),(195,194,0,0,1),(196,195,0,0,1),(197,196,0,0,1),(198,197,0,0,1),(199,198,0,0,1),(200,199,0,0,1),(201,200,0,0,1),(202,201,0,0,1),(203,202,0,0,1),(204,203,0,0,1),(205,204,0,0,1),(206,205,0,0,1),(207,206,0,0,1),(208,207,0,0,1),(209,208,0,0,1),(210,209,0,0,1),(211,210,0,0,1),(212,211,0,0,1),(213,212,0,0,1),(214,213,0,0,1),(215,214,0,0,1),(216,215,0,0,1),(217,216,0,0,1),(218,217,0,0,1),(219,218,0,0,1),(220,219,0,0,1),(221,220,0,0,1),(222,221,0,0,1),(223,222,0,0,1),(224,223,0,0,1),(225,224,0,0,1),(226,225,0,0,1),(227,226,0,0,1),(228,227,0,0,1),(229,228,0,0,1),(230,229,0,0,1),(231,230,0,0,1),(232,231,0,0,1),(233,232,0,0,1),(234,233,0,0,1),(235,234,0,0,1),(236,235,0,0,1),(237,236,0,0,1),(238,237,0,0,1),(239,238,0,0,1),(240,239,0,0,1),(241,240,0,0,1),(242,241,0,0,1),(243,242,0,0,1),(244,243,0,0,1),(245,244,0,0,1),(246,245,0,0,1),(247,246,0,0,1),(248,247,0,0,1),(249,248,0,0,1),(250,249,0,0,1),(251,250,0,0,1),(252,251,0,0,1),(253,252,0,0,1),(254,253,0,0,1),(255,254,0,0,1),(256,255,0,0,1),(257,256,0,0,1),(258,257,0,0,1),(259,258,0,0,1),(260,259,0,0,1),(261,260,0,0,1),(262,261,0,0,1),(263,262,0,0,1),(264,263,0,0,1),(265,264,0,0,1),(266,265,0,0,1),(267,266,0,0,1),(268,267,0,0,1),(269,268,0,0,1),(270,269,0,0,1),(271,270,0,0,1),(272,271,0,0,1),(273,272,0,0,1),(274,273,0,0,1),(275,274,0,0,1),(276,275,0,0,1),(277,276,0,0,1),(278,277,0,0,1),(279,278,0,0,1),(280,279,0,0,1),(281,280,0,0,1),(282,281,0,0,1),(283,282,0,0,1),(284,283,0,0,1),(285,284,0,0,1),(286,285,0,0,1),(287,286,0,0,1),(288,287,0,0,1),(289,288,0,0,1),(290,289,0,0,1),(291,290,0,0,1),(292,291,0,0,1),(293,292,0,0,1),(294,293,0,0,1),(295,294,0,0,1),(296,295,0,0,1),(297,296,0,0,1),(298,297,0,0,1),(299,1,20,0,2),(300,2,0,0,2),(301,3,0,0,2),(302,4,450,300,2),(303,5,0,0,2),(304,6,0,0,2),(305,7,0,0,2),(306,8,0,0,2),(307,9,0,0,2),(308,10,0,0,2),(309,11,100,0,2),(310,12,0,0,2),(311,13,0,0,2),(312,14,0,0,2),(313,15,0,0,2),(314,16,0,0,2),(315,17,0,0,2),(316,18,0,0,2),(317,19,0,0,2),(318,20,0,0,2),(319,21,0,0,2),(320,22,0,0,2),(321,23,0,0,2),(322,24,0,160,2),(323,25,0,0,2),(324,26,0,0,2),(325,27,0,0,2),(326,28,0,0,2),(327,29,0,0,2),(328,30,0,0,2),(329,31,0,0,2),(330,32,0,0,2),(331,33,0,0,2),(332,34,0,0,2),(333,35,0,0,2),(334,36,0,0,2),(335,37,0,0,2),(336,38,0,0,2),(337,39,0,0,2),(338,40,0,0,2),(339,41,0,0,2),(340,42,0,0,2),(341,43,0,0,2),(342,44,0,0,2),(343,45,0,0,2),(344,46,0,0,2),(345,47,0,0,2),(346,48,0,0,2),(347,49,0,0,2),(348,50,0,0,2),(349,51,0,0,2),(350,52,0,0,2),(351,53,0,0,2),(352,54,0,0,2),(353,55,0,0,2),(354,56,0,0,2),(355,57,0,0,2),(356,58,0,0,2),(357,59,0,0,2),(358,60,0,0,2),(359,61,0,0,2),(360,62,0,0,2),(361,63,0,0,2),(362,64,0,0,2),(363,65,0,0,2),(364,66,0,0,2),(365,67,0,0,2),(366,68,0,0,2),(367,69,0,0,2),(368,70,0,0,2),(369,71,0,0,2),(370,72,0,0,2),(371,73,0,0,2),(372,74,0,0,2),(373,75,0,0,2),(374,76,0,0,2),(375,77,0,0,2),(376,78,0,0,2),(377,79,0,0,2),(378,80,0,0,2),(379,81,0,0,2),(380,82,0,0,2),(381,83,0,0,2),(382,84,0,0,2),(383,85,0,0,2),(384,86,0,0,2),(385,87,0,0,2),(386,88,0,0,2),(387,89,0,0,2),(388,90,0,0,2),(389,91,0,0,2),(390,92,0,0,2),(391,93,0,0,2),(392,94,0,0,2),(393,95,0,0,2),(394,96,0,0,2),(395,97,0,0,2),(396,98,0,0,2),(397,99,0,0,2),(398,100,0,0,2),(399,101,0,0,2),(400,102,0,0,2),(401,103,0,0,2),(402,104,0,0,2),(403,105,0,0,2),(404,106,0,0,2),(405,107,0,0,2),(406,108,0,0,2),(407,109,0,0,2),(408,110,0,0,2),(409,111,0,0,2),(410,112,0,0,2),(411,113,0,0,2),(412,114,0,0,2),(413,115,0,0,2),(414,116,0,0,2),(415,117,0,0,2),(416,118,0,0,2),(417,119,0,0,2),(418,120,0,0,2),(419,121,0,0,2),(420,122,0,0,2),(421,123,0,0,2),(422,124,0,0,2),(423,125,310,420,2),(424,126,0,0,2),(425,127,0,0,2),(426,128,0,0,2),(427,129,0,0,2),(428,130,0,0,2),(429,131,0,0,2),(430,132,0,0,2),(431,133,0,0,2),(432,134,0,0,2),(433,135,0,0,2),(434,136,0,0,2),(435,137,0,0,2),(436,138,0,0,2),(437,139,0,0,2),(438,140,0,0,2),(439,141,0,0,2),(440,142,0,0,2),(441,143,0,0,2),(442,144,0,0,2),(443,145,0,0,2),(444,146,0,0,2),(445,147,0,0,2),(446,148,0,0,2),(447,149,0,0,2),(448,150,0,0,2),(449,151,0,0,2),(450,152,0,0,2),(451,153,0,0,2),(452,154,0,0,2),(453,155,0,0,2),(454,156,0,0,2),(455,157,0,0,2),(456,158,0,0,2),(457,159,0,0,2),(458,160,0,0,2),(459,161,0,0,2),(460,162,0,0,2),(461,163,0,0,2),(462,164,0,0,2),(463,165,0,0,2),(464,166,0,0,2),(465,167,0,0,2),(466,168,0,0,2),(467,169,0,0,2),(468,170,0,0,2),(469,171,0,0,2),(470,172,0,0,2),(471,173,0,0,2),(472,174,0,0,2),(473,175,0,0,2),(474,176,0,0,2),(475,177,0,0,2),(476,178,0,0,2),(477,179,0,0,2),(478,180,0,0,2),(479,181,0,0,2),(480,182,0,0,2),(481,183,0,0,2),(482,184,0,0,2),(483,185,0,0,2),(484,186,0,0,2),(485,187,0,0,2),(486,188,0,0,2),(487,189,0,0,2),(488,190,0,0,2),(489,191,0,0,2),(490,192,0,0,2),(491,193,0,0,2),(492,194,0,0,2),(493,195,0,0,2),(494,196,0,0,2),(495,197,0,0,2),(496,198,0,0,2),(497,199,0,0,2),(498,200,0,0,2),(499,201,0,0,2),(500,202,0,0,2),(501,203,0,0,2),(502,204,0,0,2),(503,205,0,0,2),(504,206,0,0,2),(505,207,0,0,2),(506,208,0,0,2),(507,209,0,0,2),(508,210,0,0,2),(509,211,0,0,2),(510,212,0,0,2),(511,213,0,0,2),(512,214,0,0,2),(513,215,0,0,2),(514,216,0,0,2),(515,217,0,0,2),(516,218,0,0,2),(517,219,0,0,2),(518,220,0,0,2),(519,221,0,0,2),(520,222,0,0,2),(521,223,0,0,2),(522,224,0,0,2),(523,225,0,0,2),(524,226,0,0,2),(525,227,0,0,2),(526,228,0,0,2),(527,229,0,0,2),(528,230,0,0,2),(529,231,0,0,2),(530,232,0,0,2),(531,233,0,0,2),(532,234,0,0,2),(533,235,0,0,2),(534,236,0,0,2),(535,237,0,0,2),(536,238,0,0,2),(537,239,0,0,2),(538,240,0,0,2),(539,241,0,0,2),(540,242,0,0,2),(541,243,0,0,2),(542,244,0,0,2),(543,245,0,0,2),(544,246,0,0,2),(545,247,0,0,2),(546,248,0,0,2),(547,249,0,0,2),(548,250,0,0,2),(549,251,0,0,2),(550,252,0,0,2),(551,253,0,0,2),(552,254,0,0,2),(553,255,0,0,2),(554,256,0,0,2),(555,257,0,0,2),(556,258,0,0,2),(557,259,0,0,2),(558,260,0,0,2),(559,261,0,0,2),(560,262,0,0,2),(561,263,0,0,2),(562,264,0,0,2),(563,265,0,0,2),(564,266,0,0,2),(565,267,0,0,2),(566,268,0,0,2),(567,269,0,0,2),(568,270,0,0,2),(569,271,0,0,2),(570,272,0,0,2),(571,273,0,0,2),(572,274,0,0,2),(573,275,0,0,2),(574,276,0,0,2),(575,277,0,0,2),(576,278,0,0,2),(577,279,0,0,2),(578,280,0,0,2),(579,281,0,0,2),(580,282,0,0,2),(581,283,0,0,2),(582,284,0,0,2),(583,285,0,0,2),(584,286,0,0,2),(585,287,0,0,2),(586,288,0,0,2),(587,289,0,0,2),(588,290,0,0,2),(589,291,0,0,2),(590,292,0,0,2),(591,293,0,0,2),(592,294,0,0,2),(593,295,0,0,2),(594,296,0,0,2),(595,297,0,0,2),(596,298,0,0,2),(597,1,4,0,3),(598,2,20,0,3),(599,3,0,0,3),(600,4,20,0,3),(601,5,30,0,3),(602,6,0,5,3),(603,7,0,0,3),(604,8,0,0,3),(605,9,0,0,3),(606,10,0,0,3),(607,11,0,10,3),(608,12,0,20,3),(609,13,0,0,3),(610,14,0,0,3),(611,15,0,0,3),(612,16,0,0,3),(613,17,0,0,3),(614,18,0,0,3),(615,19,0,0,3),(616,20,0,0,3),(617,21,0,0,3),(618,22,0,0,3),(619,23,0,0,3),(620,24,0,0,3),(621,25,0,0,3),(622,26,0,0,3),(623,27,0,30,3),(624,28,0,0,3),(625,29,0,0,3),(626,30,0,0,3),(627,31,0,0,3),(628,32,0,0,3),(629,33,0,0,3),(630,34,0,0,3),(631,35,0,0,3),(632,36,0,0,3),(633,37,0,0,3),(634,38,0,0,3),(635,39,0,0,3),(636,40,0,0,3),(637,41,0,0,3),(638,42,0,0,3),(639,43,0,0,3),(640,44,0,0,3),(641,45,0,0,3),(642,46,0,0,3),(643,47,0,0,3),(644,48,0,0,3),(645,49,0,0,3),(646,50,0,0,3),(647,51,0,0,3),(648,52,0,0,3),(649,53,0,0,3),(650,54,0,0,3),(651,55,0,0,3),(652,56,0,0,3),(653,57,0,0,3),(654,58,0,0,3),(655,59,0,0,3),(656,60,0,0,3),(657,61,0,9,3),(658,62,0,0,3),(659,63,0,0,3),(660,64,0,0,3),(661,65,0,0,3),(662,66,0,0,3),(663,67,0,0,3),(664,68,0,0,3),(665,69,0,0,3),(666,70,0,0,3),(667,71,0,0,3),(668,72,0,0,3),(669,73,0,0,3),(670,74,0,0,3),(671,75,0,0,3),(672,76,0,0,3),(673,77,0,0,3),(674,78,0,0,3),(675,79,0,0,3),(676,80,0,0,3),(677,81,0,0,3),(678,82,0,0,3),(679,83,0,0,3),(680,84,0,0,3),(681,85,0,0,3),(682,86,0,0,3),(683,87,0,0,3),(684,88,0,0,3),(685,89,0,0,3),(686,90,0,0,3),(687,91,0,0,3),(688,92,0,0,3),(689,93,0,0,3),(690,94,0,0,3),(691,95,0,0,3),(692,96,0,0,3),(693,97,0,0,3),(694,98,0,0,3),(695,99,0,0,3),(696,100,0,0,3),(697,101,0,0,3),(698,102,0,0,3),(699,103,0,0,3),(700,104,0,0,3),(701,105,0,0,3),(702,106,0,0,3),(703,107,0,0,3),(704,108,0,0,3),(705,109,0,0,3),(706,110,0,0,3),(707,111,0,0,3),(708,112,0,0,3),(709,113,0,0,3),(710,114,0,0,3),(711,115,0,0,3),(712,116,0,0,3),(713,117,0,0,3),(714,118,0,0,3),(715,119,0,0,3),(716,120,0,0,3),(717,121,0,0,3),(718,122,0,0,3),(719,123,0,0,3),(720,124,0,0,3),(721,125,0,0,3),(722,126,0,0,3),(723,127,0,0,3),(724,128,0,0,3),(725,129,0,0,3),(726,130,0,0,3),(727,131,0,0,3),(728,132,0,0,3),(729,133,0,0,3),(730,134,0,0,3),(731,135,0,0,3),(732,136,0,0,3),(733,137,0,0,3),(734,138,0,0,3),(735,139,0,0,3),(736,140,0,0,3),(737,141,0,0,3),(738,142,0,0,3),(739,143,0,0,3),(740,144,0,0,3),(741,145,0,0,3),(742,146,0,0,3),(743,147,0,0,3),(744,298,0,0,3),(745,148,0,0,3),(746,149,0,0,3),(747,150,0,0,3),(748,151,0,0,3),(749,152,0,0,3),(750,153,0,0,3),(751,154,0,0,3),(752,155,0,0,3),(753,156,0,0,3),(754,157,0,0,3),(755,158,0,0,3),(756,159,0,0,3),(757,160,0,0,3),(758,161,0,0,3),(759,162,0,0,3),(760,163,0,0,3),(761,164,0,0,3),(762,165,0,0,3),(763,166,0,0,3),(764,167,0,0,3),(765,168,0,0,3),(766,169,0,0,3),(767,170,0,0,3),(768,171,0,0,3),(769,172,0,0,3),(770,173,0,0,3),(771,174,0,0,3),(772,175,0,0,3),(773,176,0,0,3),(774,177,0,0,3),(775,178,0,0,3),(776,179,0,0,3),(777,180,0,0,3),(778,181,0,0,3),(779,182,0,0,3),(780,183,0,0,3),(781,184,0,0,3),(782,185,0,0,3),(783,186,0,0,3),(784,187,0,0,3),(785,188,0,0,3),(786,189,0,0,3),(787,190,0,0,3),(788,191,0,0,3),(789,192,0,0,3),(790,193,0,0,3),(791,194,0,0,3),(792,195,0,0,3),(793,196,0,0,3),(794,197,0,0,3),(795,198,0,0,3),(796,199,0,0,3),(797,200,0,0,3),(798,201,0,0,3),(799,202,0,0,3),(800,203,0,0,3),(801,204,0,0,3),(802,205,0,0,3),(803,206,0,0,3),(804,207,0,0,3),(805,208,0,0,3),(806,209,0,0,3),(807,210,0,0,3),(808,211,0,0,3),(809,212,0,0,3),(810,213,0,0,3),(811,214,0,0,3),(812,215,0,0,3),(813,216,0,0,3),(814,217,0,0,3),(815,218,0,0,3),(816,219,0,0,3),(817,220,0,0,3),(818,221,0,0,3),(819,222,0,0,3),(820,223,0,0,3),(821,224,0,0,3),(822,225,0,0,3),(823,226,0,0,3),(824,227,0,0,3),(825,228,0,0,3),(826,229,0,0,3),(827,230,0,0,3),(828,231,0,0,3),(829,232,0,0,3),(830,233,0,0,3),(831,234,0,0,3),(832,235,0,0,3),(833,236,0,0,3),(834,237,0,0,3),(835,238,0,0,3),(836,239,0,0,3),(837,240,0,0,3),(838,241,0,0,3),(839,242,0,0,3),(840,243,0,0,3),(841,244,0,0,3),(842,245,0,0,3),(843,246,0,0,3),(844,247,0,0,3),(845,248,0,0,3),(846,249,0,0,3),(847,250,0,0,3),(848,251,0,0,3),(849,252,0,0,3),(850,253,0,0,3),(851,254,0,0,3),(852,255,0,0,3),(853,256,0,0,3),(854,257,0,0,3),(855,258,0,0,3),(856,259,0,0,3),(857,260,0,0,3),(858,261,0,0,3),(859,262,0,0,3),(860,263,0,0,3),(861,264,0,0,3),(862,265,0,0,3),(863,266,0,0,3),(864,267,0,0,3),(865,268,0,0,3),(866,269,0,0,3),(867,270,0,0,3),(868,271,0,0,3),(869,272,0,0,3),(870,273,0,0,3),(871,274,0,0,3),(872,275,0,0,3),(873,276,0,0,3),(874,277,0,0,3),(875,278,0,0,3),(876,279,0,0,3),(877,280,0,0,3),(878,281,0,0,3),(879,282,0,0,3),(880,283,0,0,3),(881,284,0,0,3),(882,285,0,0,3),(883,286,0,0,3),(884,287,0,0,3),(885,288,0,0,3),(886,289,0,0,3),(887,290,0,0,3),(888,291,0,0,3),(889,292,0,0,3),(890,293,0,0,3),(891,294,0,0,3),(892,295,0,0,3),(893,296,0,0,3),(894,297,0,0,3),(1491,1,4,0,6),(1492,2,20,0,6),(1493,3,0,0,6),(1494,4,20,0,6),(1495,5,30,0,6),(1496,6,0,5,6),(1497,7,0,0,6),(1498,8,0,0,6),(1499,9,0,0,6),(1500,10,0,0,6),(1501,11,0,10,6),(1502,12,0,20,6),(1503,13,0,0,6),(1504,14,0,0,6),(1505,15,0,0,6),(1506,16,0,0,6),(1507,17,0,0,6),(1508,18,0,0,6),(1509,19,0,0,6),(1510,20,0,0,6),(1511,21,0,0,6),(1512,22,0,0,6),(1513,23,0,0,6),(1514,24,0,0,6),(1515,25,0,0,6),(1516,26,0,0,6),(1517,27,0,30,6),(1518,28,0,0,6),(1519,29,0,0,6),(1520,30,0,0,6),(1521,31,0,0,6),(1522,32,0,0,6),(1523,33,0,0,6),(1524,34,0,0,6),(1525,35,0,0,6),(1526,36,0,0,6),(1527,37,0,0,6),(1528,38,0,0,6),(1529,39,0,0,6),(1530,40,0,0,6),(1531,41,0,0,6),(1532,42,0,0,6),(1533,43,0,0,6),(1534,44,0,0,6),(1535,45,0,0,6),(1536,46,0,0,6),(1537,47,0,0,6),(1538,48,0,0,6),(1539,49,0,0,6),(1540,50,0,0,6),(1541,51,0,0,6),(1542,52,0,0,6),(1543,53,0,0,6),(1544,54,0,0,6),(1545,55,0,0,6),(1546,56,0,0,6),(1547,57,0,0,6),(1548,58,0,0,6),(1549,59,0,0,6),(1550,60,0,0,6),(1551,61,0,9,6),(1552,62,0,0,6),(1553,63,0,0,6),(1554,64,0,0,6),(1555,65,0,0,6),(1556,66,0,0,6),(1557,67,0,0,6),(1558,68,0,0,6),(1559,69,0,0,6),(1560,70,0,0,6),(1561,71,0,0,6),(1562,72,0,0,6),(1563,73,0,0,6),(1564,74,0,0,6),(1565,75,0,0,6),(1566,76,0,0,6),(1567,77,0,0,6),(1568,78,0,0,6),(1569,79,0,0,6),(1570,80,0,0,6),(1571,81,0,0,6),(1572,82,0,0,6),(1573,83,0,0,6),(1574,84,0,0,6),(1575,85,0,0,6),(1576,86,0,0,6),(1577,87,0,0,6),(1578,88,0,0,6),(1579,89,0,0,6),(1580,90,0,0,6),(1581,91,0,0,6),(1582,92,0,0,6),(1583,93,0,0,6),(1584,94,0,0,6),(1585,95,0,0,6),(1586,96,0,0,6),(1587,97,0,0,6),(1588,98,0,0,6),(1589,99,0,0,6),(1590,100,0,0,6),(1591,101,0,0,6),(1592,102,0,0,6),(1593,103,0,0,6),(1594,104,0,0,6),(1595,105,0,0,6),(1596,106,0,0,6),(1597,107,0,0,6),(1598,108,0,0,6),(1599,109,0,0,6),(1600,110,0,0,6),(1601,111,0,0,6),(1602,112,0,0,6),(1603,113,0,0,6),(1604,114,0,0,6),(1605,115,0,0,6),(1606,116,0,0,6),(1607,117,0,0,6),(1608,118,0,0,6),(1609,119,0,0,6),(1610,120,0,0,6),(1611,121,0,0,6),(1612,122,0,0,6),(1613,123,0,0,6),(1614,124,0,0,6),(1615,125,0,0,6),(1616,126,0,0,6),(1617,127,0,0,6),(1618,128,0,0,6),(1619,129,0,0,6),(1620,130,0,0,6),(1621,131,0,0,6),(1622,132,0,0,6),(1623,133,0,0,6),(1624,134,0,0,6),(1625,135,0,0,6),(1626,136,0,0,6),(1627,137,0,0,6),(1628,138,0,0,6),(1629,139,0,0,6),(1630,140,0,0,6),(1631,141,0,0,6),(1632,142,0,0,6),(1633,143,0,0,6),(1634,144,0,0,6),(1635,145,0,0,6),(1636,146,0,0,6),(1637,147,0,0,6),(1638,148,0,0,6),(1639,149,0,0,6),(1640,150,0,0,6),(1641,151,0,0,6),(1642,152,0,0,6),(1643,153,0,0,6),(1644,154,0,0,6),(1645,155,0,0,6),(1646,156,0,0,6),(1647,157,0,0,6),(1648,158,0,0,6),(1649,159,0,0,6),(1650,160,0,0,6),(1651,161,0,0,6),(1652,162,0,0,6),(1653,163,0,0,6),(1654,164,0,0,6),(1655,165,0,0,6),(1656,166,0,0,6),(1657,167,0,0,6),(1658,168,0,0,6),(1659,169,0,0,6),(1660,170,0,0,6),(1661,171,0,0,6),(1662,172,0,0,6),(1663,173,0,0,6),(1664,174,0,0,6),(1665,175,0,0,6),(1666,176,0,0,6),(1667,177,0,0,6),(1668,178,0,0,6),(1669,179,0,0,6),(1670,180,0,0,6),(1671,181,0,0,6),(1672,182,0,0,6),(1673,183,0,0,6),(1674,184,0,0,6),(1675,185,0,0,6),(1676,186,0,0,6),(1677,187,0,0,6),(1678,188,0,0,6),(1679,189,0,0,6),(1680,190,0,0,6),(1681,191,0,0,6),(1682,192,0,0,6),(1683,193,0,0,6),(1684,194,0,0,6),(1685,195,0,0,6),(1686,196,0,0,6),(1687,197,0,0,6),(1688,198,0,0,6),(1689,199,0,0,6),(1690,200,0,0,6),(1691,201,0,0,6),(1692,202,0,0,6),(1693,203,0,0,6),(1694,204,0,0,6),(1695,205,0,0,6),(1696,206,0,0,6),(1697,207,0,0,6),(1698,208,0,0,6),(1699,209,0,0,6),(1700,210,0,0,6),(1701,211,0,0,6),(1702,212,0,0,6),(1703,213,0,0,6),(1704,214,0,0,6),(1705,215,0,0,6),(1706,216,0,0,6),(1707,217,0,0,6),(1708,218,0,0,6),(1709,219,0,0,6),(1710,220,0,0,6),(1711,221,0,0,6),(1712,222,0,0,6),(1713,223,0,0,6),(1714,224,0,0,6),(1715,225,0,0,6),(1716,226,0,0,6),(1717,227,0,0,6),(1718,228,0,0,6),(1719,229,0,0,6),(1720,230,0,0,6),(1721,231,0,0,6),(1722,232,0,0,6),(1723,233,0,0,6),(1724,234,0,0,6),(1725,235,0,0,6),(1726,236,0,0,6),(1727,237,0,0,6),(1728,238,0,0,6),(1729,239,0,0,6),(1730,240,0,0,6),(1731,241,0,0,6),(1732,242,0,0,6),(1733,243,0,0,6),(1734,244,0,0,6),(1735,245,0,0,6),(1736,246,0,0,6),(1737,247,0,0,6),(1738,248,0,0,6),(1739,249,0,0,6),(1740,250,0,0,6),(1741,251,0,0,6),(1742,252,0,0,6),(1743,253,0,0,6),(1744,254,0,0,6),(1745,255,0,0,6),(1746,256,0,0,6),(1747,257,0,0,6),(1748,258,0,0,6),(1749,259,0,0,6),(1750,260,0,0,6),(1751,261,0,0,6),(1752,262,0,0,6),(1753,263,0,0,6),(1754,264,0,0,6),(1755,265,0,0,6),(1756,266,0,0,6),(1757,267,0,0,6),(1758,268,0,0,6),(1759,269,0,0,6),(1760,270,0,0,6),(1761,271,0,0,6),(1762,272,0,0,6),(1763,273,0,0,6),(1764,274,0,0,6),(1765,275,0,0,6),(1766,276,0,0,6),(1767,277,0,0,6),(1768,278,0,0,6),(1769,279,0,0,6),(1770,280,0,0,6),(1771,281,0,0,6),(1772,282,0,0,6),(1773,283,0,0,6),(1774,284,0,0,6),(1775,285,0,0,6),(1776,286,0,0,6),(1777,287,0,0,6),(1778,288,0,0,6),(1779,289,0,0,6),(1780,290,0,0,6),(1781,291,0,0,6),(1782,292,0,0,6),(1783,293,0,0,6),(1784,294,0,0,6),(1785,295,0,0,6),(1786,296,0,0,6),(1787,297,0,0,6),(1788,298,0,0,6),(2981,1,0,0,11),(2982,2,0,0,11),(2983,3,0,0,11),(2984,4,0,0,11),(2985,5,0,0,11),(2986,6,0,0,11),(2987,7,0,0,11),(2988,8,0,0,11),(2989,9,0,0,11),(2990,10,0,0,11),(2991,11,0,0,11),(2992,12,0,0,11),(2993,13,0,0,11),(2994,14,0,0,11),(2995,15,0,0,11),(2996,16,0,0,11),(2997,17,0,0,11),(2998,18,0,0,11),(2999,19,0,0,11),(3000,20,0,0,11),(3001,21,0,0,11),(3002,22,0,0,11),(3003,23,0,0,11),(3004,24,0,0,11),(3005,25,0,0,11),(3006,26,0,0,11),(3007,27,0,0,11),(3008,28,0,0,11),(3009,29,0,0,11),(3010,30,0,0,11),(3011,31,0,0,11),(3012,32,0,0,11),(3013,33,0,0,11),(3014,34,0,0,11),(3015,35,0,0,11),(3016,36,0,0,11),(3017,37,0,0,11),(3018,38,0,0,11),(3019,39,0,0,11),(3020,40,0,0,11),(3021,41,0,0,11),(3022,42,0,0,11),(3023,43,0,0,11),(3024,44,0,0,11),(3025,45,0,0,11),(3026,46,0,0,11),(3027,47,0,0,11),(3028,48,0,0,11),(3029,49,0,0,11),(3030,50,0,0,11),(3031,51,0,0,11),(3032,52,0,0,11),(3033,53,0,0,11),(3034,54,0,0,11),(3035,55,0,0,11),(3036,56,0,0,11),(3037,57,0,0,11),(3038,58,0,0,11),(3039,59,0,0,11),(3040,60,0,0,11),(3041,61,0,0,11),(3042,62,0,0,11),(3043,63,0,0,11),(3044,64,0,0,11),(3045,65,0,0,11),(3046,66,0,0,11),(3047,67,0,0,11),(3048,68,0,0,11),(3049,69,0,0,11),(3050,70,0,0,11),(3051,71,0,0,11),(3052,72,0,0,11),(3053,73,0,0,11),(3054,74,0,0,11),(3055,75,0,0,11),(3056,76,0,0,11),(3057,77,0,0,11),(3058,78,0,0,11),(3059,79,0,0,11),(3060,80,0,0,11),(3061,81,0,0,11),(3062,82,0,0,11),(3063,83,0,0,11),(3064,84,0,0,11),(3065,85,0,0,11),(3066,86,0,0,11),(3067,87,0,0,11),(3068,88,0,0,11),(3069,89,0,0,11),(3070,90,0,0,11),(3071,91,0,0,11),(3072,92,0,0,11),(3073,93,0,0,11),(3074,94,0,0,11),(3075,95,0,0,11),(3076,96,0,0,11),(3077,97,0,0,11),(3078,98,0,0,11),(3079,99,0,0,11),(3080,100,0,0,11),(3081,101,0,0,11),(3082,102,0,0,11),(3083,103,0,0,11),(3084,104,0,0,11),(3085,105,0,0,11),(3086,106,0,0,11),(3087,107,0,0,11),(3088,108,0,0,11),(3089,109,0,0,11),(3090,110,0,0,11),(3091,111,0,0,11),(3092,112,0,0,11),(3093,113,0,0,11),(3094,114,0,0,11),(3095,115,0,0,11),(3096,116,0,0,11),(3097,117,0,0,11),(3098,118,0,0,11),(3099,119,0,0,11),(3100,120,0,0,11),(3101,121,0,0,11),(3102,122,0,0,11),(3103,123,0,0,11),(3104,124,0,0,11),(3105,125,0,0,11),(3106,126,0,0,11),(3107,127,0,0,11),(3108,128,0,0,11),(3109,129,0,0,11),(3110,130,0,0,11),(3111,131,0,0,11),(3112,132,0,0,11),(3113,133,0,0,11),(3114,134,0,0,11),(3115,135,0,0,11),(3116,136,0,0,11),(3117,137,0,0,11),(3118,138,0,0,11),(3119,139,0,0,11),(3120,140,0,0,11),(3121,141,0,0,11),(3122,142,0,0,11),(3123,143,0,0,11),(3124,144,0,0,11),(3125,145,0,0,11),(3126,146,0,0,11),(3127,147,0,0,11),(3128,298,0,0,11),(3129,148,0,0,11),(3130,149,0,0,11),(3131,150,0,0,11),(3132,151,0,0,11),(3133,152,0,0,11),(3134,153,0,0,11),(3135,154,0,0,11),(3136,155,0,0,11),(3137,156,0,0,11),(3138,157,0,0,11),(3139,158,0,0,11),(3140,159,0,0,11),(3141,160,0,0,11),(3142,161,0,0,11),(3143,162,0,0,11),(3144,163,0,0,11),(3145,164,0,0,11),(3146,165,0,0,11),(3147,166,0,0,11),(3148,167,0,0,11),(3149,168,0,0,11),(3150,169,0,0,11),(3151,170,0,0,11),(3152,171,0,0,11),(3153,172,0,0,11),(3154,173,0,0,11),(3155,174,0,0,11),(3156,175,0,0,11),(3157,176,0,0,11),(3158,177,0,0,11),(3159,178,0,0,11),(3160,179,0,0,11),(3161,180,0,0,11),(3162,181,0,0,11),(3163,182,0,0,11),(3164,183,0,0,11),(3165,184,0,0,11),(3166,185,0,0,11),(3167,186,0,0,11),(3168,187,0,0,11),(3169,188,0,0,11),(3170,189,0,0,11),(3171,190,0,0,11),(3172,191,0,0,11),(3173,192,0,0,11),(3174,193,0,0,11),(3175,194,0,0,11),(3176,195,0,0,11),(3177,196,0,0,11),(3178,197,0,0,11),(3179,198,0,0,11),(3180,199,0,0,11),(3181,200,0,0,11),(3182,201,0,0,11),(3183,202,0,0,11),(3184,203,0,0,11),(3185,204,0,0,11),(3186,205,0,0,11),(3187,206,0,0,11),(3188,207,0,0,11),(3189,208,0,0,11),(3190,209,0,0,11),(3191,210,0,0,11),(3192,211,0,0,11),(3193,212,0,0,11),(3194,213,0,0,11),(3195,214,0,0,11),(3196,215,0,0,11),(3197,216,0,0,11),(3198,217,0,0,11),(3199,218,0,0,11),(3200,219,0,0,11),(3201,220,0,0,11),(3202,221,0,0,11),(3203,222,0,0,11),(3204,223,0,0,11),(3205,224,0,0,11),(3206,225,0,0,11),(3207,226,0,0,11),(3208,227,0,0,11),(3209,228,0,0,11),(3210,229,0,0,11),(3211,230,0,0,11),(3212,231,0,0,11),(3213,232,0,0,11),(3214,233,0,0,11),(3215,234,0,0,11),(3216,235,0,0,11),(3217,236,0,0,11),(3218,237,0,0,11),(3219,238,0,0,11),(3220,239,0,0,11),(3221,240,0,0,11),(3222,241,0,0,11),(3223,242,0,0,11),(3224,243,0,0,11),(3225,244,0,0,11),(3226,245,0,0,11),(3227,246,0,0,11),(3228,247,0,0,11),(3229,248,0,0,11),(3230,249,0,0,11),(3231,250,0,0,11),(3232,251,0,0,11),(3233,252,0,0,11),(3234,253,0,0,11),(3235,254,0,0,11),(3236,255,0,0,11),(3237,256,0,0,11),(3238,257,0,0,11),(3239,258,0,0,11),(3240,259,0,0,11),(3241,260,0,0,11),(3242,261,0,0,11),(3243,262,0,0,11),(3244,263,0,0,11),(3245,264,0,0,11),(3246,265,0,0,11),(3247,266,0,0,11),(3248,267,0,0,11),(3249,268,0,0,11),(3250,269,0,0,11),(3251,270,0,0,11),(3252,271,0,0,11),(3253,272,0,0,11),(3254,273,0,0,11),(3255,274,0,0,11),(3256,275,0,0,11),(3257,276,0,0,11),(3258,277,0,0,11),(3259,278,0,0,11),(3260,279,0,0,11),(3261,280,0,0,11),(3262,281,0,0,11),(3263,282,0,0,11),(3264,283,0,0,11),(3265,284,0,0,11),(3266,285,0,0,11),(3267,286,0,0,11),(3268,287,0,0,11),(3269,288,0,0,11),(3270,289,0,0,11),(3271,290,0,0,11),(3272,291,0,0,11),(3273,292,0,0,11),(3274,293,0,0,11),(3275,294,0,0,11),(3276,295,0,0,11),(3277,296,0,0,11),(3278,297,0,0,11),(3279,1,0,0,12),(3280,2,0,0,12),(3281,3,0,0,12),(3282,4,0,0,12),(3283,5,0,0,12),(3284,6,0,0,12),(3285,7,0,0,12),(3286,8,0,0,12),(3287,9,0,0,12),(3288,10,0,0,12),(3289,11,0,0,12),(3290,12,0,0,12),(3291,13,0,0,12),(3292,14,0,0,12),(3293,15,0,0,12),(3294,16,0,0,12),(3295,17,0,0,12),(3296,18,0,0,12),(3297,19,0,0,12),(3298,20,0,0,12),(3299,21,0,0,12),(3300,22,0,0,12),(3301,23,0,0,12),(3302,24,0,0,12),(3303,25,0,0,12),(3304,26,0,0,12),(3305,27,0,0,12),(3306,28,0,0,12),(3307,29,0,0,12),(3308,30,0,0,12),(3309,31,0,0,12),(3310,32,0,0,12),(3311,33,0,0,12),(3312,34,0,0,12),(3313,35,0,0,12),(3314,36,0,0,12),(3315,37,0,0,12),(3316,38,0,0,12),(3317,39,0,0,12),(3318,40,0,0,12),(3319,41,0,0,12),(3320,42,0,0,12),(3321,43,0,0,12),(3322,44,0,0,12),(3323,45,0,0,12),(3324,46,0,0,12),(3325,47,0,0,12),(3326,48,0,0,12),(3327,49,0,0,12),(3328,50,0,0,12),(3329,51,0,0,12),(3330,52,0,0,12),(3331,53,0,0,12),(3332,54,0,0,12),(3333,55,0,0,12),(3334,56,0,0,12),(3335,57,0,0,12),(3336,58,0,0,12),(3337,59,0,0,12),(3338,60,0,0,12),(3339,61,0,0,12),(3340,62,0,0,12),(3341,63,0,0,12),(3342,64,0,0,12),(3343,65,0,0,12),(3344,66,0,0,12),(3345,67,0,0,12),(3346,68,0,0,12),(3347,69,0,0,12),(3348,70,0,0,12),(3349,71,0,0,12),(3350,72,0,0,12),(3351,73,0,0,12),(3352,74,0,0,12),(3353,75,0,0,12),(3354,76,0,0,12),(3355,77,0,0,12),(3356,78,0,0,12),(3357,79,0,0,12),(3358,80,0,0,12),(3359,81,0,0,12),(3360,82,0,0,12),(3361,83,0,0,12),(3362,84,0,0,12),(3363,85,0,0,12),(3364,86,0,0,12),(3365,87,0,0,12),(3366,88,0,0,12),(3367,89,0,0,12),(3368,90,0,0,12),(3369,91,0,0,12),(3370,92,0,0,12),(3371,93,0,0,12),(3372,94,0,0,12),(3373,95,0,0,12),(3374,96,0,0,12),(3375,97,0,0,12),(3376,98,0,0,12),(3377,99,0,0,12),(3378,100,0,0,12),(3379,101,0,0,12),(3380,102,0,0,12),(3381,103,0,0,12),(3382,104,0,0,12),(3383,105,0,0,12),(3384,106,0,0,12),(3385,107,0,0,12),(3386,108,0,0,12),(3387,109,0,0,12),(3388,110,0,0,12),(3389,111,0,0,12),(3390,112,0,0,12),(3391,113,0,0,12),(3392,114,0,0,12),(3393,115,0,0,12),(3394,116,0,0,12),(3395,117,0,0,12),(3396,118,0,0,12),(3397,119,0,0,12),(3398,120,0,0,12),(3399,121,0,0,12),(3400,122,0,0,12),(3401,123,0,0,12),(3402,124,0,0,12),(3403,125,0,0,12),(3404,126,0,0,12),(3405,127,0,0,12),(3406,128,0,0,12),(3407,129,0,0,12),(3408,130,0,0,12),(3409,131,0,0,12),(3410,132,0,0,12),(3411,133,0,0,12),(3412,134,0,0,12),(3413,135,0,0,12),(3414,136,0,0,12),(3415,137,0,0,12),(3416,138,0,0,12),(3417,139,0,0,12),(3418,140,0,0,12),(3419,141,0,0,12),(3420,142,0,0,12),(3421,143,0,0,12),(3422,144,0,0,12),(3423,145,0,0,12),(3424,146,0,0,12),(3425,147,0,0,12),(3426,148,0,0,12),(3427,149,0,0,12),(3428,150,0,0,12),(3429,151,0,0,12),(3430,152,0,0,12),(3431,153,0,0,12),(3432,154,0,0,12),(3433,155,0,0,12),(3434,156,0,0,12),(3435,157,0,0,12),(3436,158,0,0,12),(3437,159,0,0,12),(3438,160,0,0,12),(3439,161,0,0,12),(3440,162,0,0,12),(3441,163,0,0,12),(3442,164,0,0,12),(3443,165,0,0,12),(3444,166,0,0,12),(3445,167,0,0,12),(3446,168,0,0,12),(3447,169,0,0,12),(3448,170,0,0,12),(3449,171,0,0,12),(3450,172,0,0,12),(3451,173,0,0,12),(3452,174,0,0,12),(3453,175,0,0,12),(3454,176,0,0,12),(3455,177,0,0,12),(3456,178,0,0,12),(3457,179,0,0,12),(3458,180,0,0,12),(3459,181,0,0,12),(3460,182,0,0,12),(3461,183,0,0,12),(3462,184,0,0,12),(3463,185,0,0,12),(3464,186,0,0,12),(3465,187,0,0,12),(3466,188,0,0,12),(3467,189,0,0,12),(3468,190,0,0,12),(3469,191,0,0,12),(3470,192,0,0,12),(3471,193,0,0,12),(3472,194,0,0,12),(3473,195,0,0,12),(3474,196,0,0,12),(3475,197,0,0,12),(3476,198,0,0,12),(3477,199,0,0,12),(3478,200,0,0,12),(3479,201,0,0,12),(3480,202,0,0,12),(3481,203,0,0,12),(3482,204,0,0,12),(3483,205,0,0,12),(3484,206,0,0,12),(3485,207,0,0,12),(3486,208,0,0,12),(3487,209,0,0,12),(3488,210,0,0,12),(3489,211,0,0,12),(3490,212,0,0,12),(3491,213,0,0,12),(3492,214,0,0,12),(3493,215,0,0,12),(3494,216,0,0,12),(3495,217,0,0,12),(3496,218,0,0,12),(3497,219,0,0,12),(3498,220,0,0,12),(3499,221,0,0,12),(3500,222,0,0,12),(3501,223,0,0,12),(3502,224,0,0,12),(3503,225,0,0,12),(3504,226,0,0,12),(3505,227,0,0,12),(3506,228,0,0,12),(3507,229,0,0,12),(3508,230,0,0,12),(3509,231,0,0,12),(3510,232,0,0,12),(3511,233,0,0,12),(3512,234,0,0,12),(3513,235,0,0,12),(3514,236,0,0,12),(3515,237,0,0,12),(3516,238,0,0,12),(3517,239,0,0,12),(3518,240,0,0,12),(3519,241,0,0,12),(3520,242,0,0,12),(3521,243,0,0,12),(3522,244,0,0,12),(3523,245,0,0,12),(3524,246,0,0,12),(3525,247,0,0,12),(3526,248,0,0,12),(3527,249,0,0,12),(3528,250,0,0,12),(3529,251,0,0,12),(3530,252,0,0,12),(3531,253,0,0,12),(3532,254,0,0,12),(3533,255,0,0,12),(3534,256,0,0,12),(3535,257,0,0,12),(3536,258,0,0,12),(3537,259,0,0,12),(3538,260,0,0,12),(3539,261,0,0,12),(3540,262,0,0,12),(3541,263,0,0,12),(3542,264,0,0,12),(3543,265,0,0,12),(3544,266,0,0,12),(3545,267,0,0,12),(3546,268,0,0,12),(3547,269,0,0,12),(3548,270,0,0,12),(3549,271,0,0,12),(3550,272,0,0,12),(3551,273,0,0,12),(3552,274,0,0,12),(3553,275,0,0,12),(3554,276,0,0,12),(3555,277,0,0,12),(3556,278,0,0,12),(3557,279,0,0,12),(3558,280,0,0,12),(3559,281,0,0,12),(3560,282,0,0,12),(3561,283,0,0,12),(3562,284,0,0,12),(3563,285,0,0,12),(3564,286,0,0,12),(3565,287,0,0,12),(3566,288,0,0,12),(3567,289,0,0,12),(3568,290,0,0,12),(3569,291,0,0,12),(3570,292,0,0,12),(3571,293,0,0,12),(3572,294,0,0,12),(3573,295,0,0,12),(3574,296,0,0,12),(3575,297,0,0,12),(3576,298,0,0,12);

/*Table structure for table `cont_ingreso_gasto` */

DROP TABLE IF EXISTS `cont_ingreso_gasto`;

CREATE TABLE `cont_ingreso_gasto` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `descripcion` varchar(250) collate utf8_spanish_ci NOT NULL,
  `tipo` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `valor` double NOT NULL default '0',
  `fechaRegistro` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `id_lote` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `id_local` bigint(20) unsigned NOT NULL,
  `id_usuario` bigint(20) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_cont_ingreso_gasto_local` (`id_local`),
  KEY `FK_cont_ingreso_gasto_usuario` (`id_usuario`),
  CONSTRAINT `FK_cont_ingreso_gasto_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_cont_ingreso_gasto_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `seg_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `cont_ingreso_gasto` */

insert  into `cont_ingreso_gasto`(`id`,`descripcion`,`tipo`,`valor`,`fechaRegistro`,`id_lote`,`id_local`,`id_usuario`) values (8,'x','Ingreso',0,'2011-05-01','6',1,1),(9,'dgfgfg','Ingreso',-1,'2011-05-01','6',1,1),(10,'dd','Gasto',3,'2011-05-01','6',1,1),(11,'pago adelantado','Ingreso',20,'2011-05-01','11',1,1),(12,'3','Gasto',3,'2011-05-01','12',1,1),(13,'nuevo','Ingreso',3,'2011-05-01','17',1,1),(14,'Nuevo Ingreso','Ingreso',10,'2012-02-11 02:50:26','21',1,1),(15,'prueba','Gasto',10,'2012-02-13 10:44:47','21',1,1),(16,'12','Ingreso',20,'2012-02-15 12:07:26','21',1,1),(23,'dsa','Ingreso',20,'2012-02-15 01:41:10','21',2,1);

/*Table structure for table `cont_lote_asientos` */

DROP TABLE IF EXISTS `cont_lote_asientos`;

CREATE TABLE `cont_lote_asientos` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_periodo` bigint(20) unsigned NOT NULL default '0',
  `descripcion` varchar(255) NOT NULL default '',
  `estado` varchar(45) NOT NULL default '',
  `fecha` datetime NOT NULL default '0000-00-00 00:00:00',
  `id_local` bigint(20) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_cont_loteasientos_periodo` (`id_periodo`),
  KEY `FK_cont_lote_asientos_local` (`id_local`),
  CONSTRAINT `FK_cont_loteasientos_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `cont_periodo_contable` (`id`),
  CONSTRAINT `FK_cont_lote_asientos_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_lote_asientos` */

insert  into `cont_lote_asientos`(`id`,`id_periodo`,`descripcion`,`estado`,`fecha`,`id_local`) values (9,3,'Lote Generado automÃ¡ticamante - ANTICIPO_Efectivo_Pendiente','Contabilizado','2012-02-11 07:20:48',2),(10,3,'Lote Generado automÃ¡ticamante - ANTICIPO_Cheque_Pendiente','Contabilizado','2012-02-11 07:23:05',2),(16,3,'Lote Generado automÃ¡ticamante - ANTICIPO_TRANSFERENCIA_PENDIENTE','Contabilizado','2012-02-11 07:49:34',2),(20,3,'Lote Generado automÃ¡ticamante - ANTICIPO_DEPOSITO_PENDIENTE','Contabilizado','2012-02-11 08:08:07',2),(21,3,'Lote Generado automÃ¡ticamante - ANTICIPO_TRANSFERENCIA_ANULADO','Contabilizado','2012-02-11 08:56:05',2),(22,3,'Lote Generado automÃ¡ticamante - ANTICIPO_TRANSFERENCIA_PENDIENTE','Contabilizado','2012-02-11 08:56:06',2),(23,3,'Lote Generado automÃ¡ticamante - ANTICIPO_TRANSFERENCIA_ANULADO','Contabilizado','2012-02-11 08:57:09',2),(24,3,'Lote Generado automÃ¡ticamante - ANTICIPO_TRANSFERENCIA_PENDIENTE','Contabilizado','2012-02-11 08:57:09',2),(25,3,'Lote Generado automÃ¡ticamante - ANTICIPO_DEPOSITO_DEVUELTO','Contabilizado','2012-02-11 09:03:38',2),(26,3,'Lote Generado automÃ¡ticamante - ANTICIPO_TRANSFERENCIA_ANULADO','Contabilizado','2012-02-11 09:04:50',2),(27,3,'Lote Generado automÃ¡ticamante - ANTICIPO_EFECTIVO_DEVUELTO','Contabilizado','2012-02-11 09:19:01',2),(28,3,'Lote Generado automÃ¡ticamante - ANTICIPO_TRANSFERENCIA_PENDIENTE','Contabilizado','2012-02-11 09:26:14',2),(29,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000102','Contabilizado','2012-02-12 01:23:19',2),(30,3,'Apertura de periodo contable con: ESTADO_SITUACION_INICIAL','Contabilizado','2012-02-13 10:40:59',2),(31,3,'Apertura de periodo contable con: ESTADO_SITUACION_INICIAL','Contabilizado','2012-02-13 11:21:23',1),(32,3,'Apertura de periodo contable con: CIERRE_PERIODO','Contabilizado','2012-02-13 11:24:00',1),(33,3,'Apertura de periodo contable con: CIERRE_PERIODO','Contabilizado','2012-02-13 11:24:41',2),(34,1,'Apertura de periodo contable con: ESTADO_SITUACION_INICIAL','Contabilizado','2012-02-13 11:33:38',3),(35,3,'Apertura de periodo contable con: ESTADO_SITUACION_INICIAL','Contabilizado','2012-02-13 11:51:48',3),(36,1,'Apertura de periodo contable con: CIERRE_PERIODO','Contabilizado','2012-02-13 11:57:06',3),(37,3,'LoteAutomÃ¡tico: Compra de mercaderÃ­a; Factura: 000-000-0000001','Contabilizado','2012-02-14 02:00:38',2),(38,3,'LoteAutomÃ¡tico: Compra de mercaderÃ­a; Factura: 000-000-0000002','Contabilizado','2012-02-14 02:02:02',2),(39,3,'LoteAutomÃ¡tico: Compra de mercaderÃ­a; Factura: 000-000-0000003','Contabilizado','2012-02-14 11:37:39',2),(46,3,'LoteAutomÃ¡tico: Ingreso a caja; Valor: 20','Contabilizado','2012-02-15 01:41:13',2),(47,3,'LoteAutomÃ¡tico: Anticipo en efectivo creado; Cliente: 1103181796','Contabilizado','2012-02-15 01:41:58',2),(48,3,'LoteAutomÃ¡tico: Compra de mercaderÃ­a; Factura: 000-000-0000000','Contabilizado','2012-02-15 04:51:55',2),(53,3,'LoteAutomÃ¡tico: Retencion en compras; NÃºmero retenciÃ³n: 001-001-0000005; Factura Compra: 000-000-0000002','Contabilizado','2012-02-15 07:05:39',2),(54,3,'LoteAutomÃ¡tico: Compra de mercaderÃ­a; Factura: 000-000-0000001','Contabilizado','2012-02-16 12:06:53',2),(59,3,'LoteAutomÃ¡tico: Retencion en compras; NÃºmero retenciÃ³n: 001-001-0000006; Factura Compra: 000-000-0000001','Contabilizado','2012-02-16 02:51:41',2),(60,3,'LoteAutomÃ¡tico: Compra de mercaderÃ­a; Factura: 000-000-0000004','Contabilizado','2012-02-16 02:55:26',2),(61,3,'LoteAutomÃ¡tico: Compra de mercaderÃ­a; Factura: 000-000-0000005','Contabilizado','2012-02-16 03:20:29',2),(62,3,'LoteAutomÃ¡tico: Compra de mercaderÃ­a; Factura: 000-000-0000006','Contabilizado','2012-02-16 03:20:51',2),(63,3,'LoteAutomÃ¡tico: Compra de mercaderÃ­a; Factura: 000-000-0000007','Contabilizado','2012-02-16 03:21:11',2),(64,3,'LoteAutomÃ¡tico: Compra de mercaderÃ­a; Factura: 000-000-0000008','Contabilizado','2012-02-16 03:21:30',2),(66,3,'LoteAutomÃ¡tico: Retencion en compras; NÃºmero retenciÃ³n: 001-001-0000007; Factura Compra: 000-000-0000004','Contabilizado','2012-02-16 03:52:11',2),(68,3,'LoteAutomÃ¡tico: Retencion en compras; NÃºmero retenciÃ³n: 001-001-0000008; Factura Compra: 000-000-0000005','Contabilizado','2012-02-16 04:03:08',2),(69,3,'LoteAutomÃ¡tico: Retencion en compras; NÃºmero retenciÃ³n: 001-001-0000009; Factura Compra: 000-000-0000006','Contabilizado','2012-02-16 04:04:23',2),(70,3,'LoteAutomÃ¡tico: Compra de mercaderÃ­a; Factura: 000-000-0000009','Contabilizado','2012-02-16 04:17:50',2),(71,3,'LoteAutomÃ¡tico: Anticipo en efectivo devuelto; Cliente: 1103181796','Contabilizado','2012-02-16 05:30:35',2),(72,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000103','Contabilizado','2012-02-16 05:40:08',2),(73,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000104','Contabilizado','2012-02-16 07:06:08',2),(74,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000105','Contabilizado','2012-02-16 07:08:29',2),(75,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000106','Contabilizado','2012-02-16 07:09:44',2),(76,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000109','Contabilizado','2012-02-16 09:00:25',2),(77,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente en efectivo; Cliente: 3','Contabilizado','2012-02-17 09:06:02',2),(78,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente en efectivo; Cliente: 3','Contabilizado','2012-02-17 09:06:17',2),(79,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente con cheque; Cliente: 3','Contabilizado','2012-02-17 09:07:00',2),(80,3,'LoteAutomÃ¡tico: Cobro de cuota con deposito; Cliente: 3','Contabilizado','2012-02-17 09:07:29',2),(81,3,'LoteAutomÃ¡tico: Cobro de cuota con transferncia bancaria; Cliente: 3','Contabilizado','2012-02-17 09:07:55',2),(82,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000110','Contabilizado','2012-02-17 11:29:33',2),(83,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente en efectivo; Cliente: 2','Contabilizado','2012-02-17 11:31:01',2),(84,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000111','Contabilizado','2012-02-17 02:59:28',2),(85,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000112','Contabilizado','2012-02-17 03:29:53',2),(86,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000113','Contabilizado','2012-02-17 03:35:30',2),(87,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000114','Contabilizado','2012-02-17 04:30:31',2),(88,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente en efectivo; Cliente: 2','Contabilizado','2012-02-17 04:42:43',2),(89,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente en efectivo; Cliente: 2','Contabilizado','2012-02-17 04:47:36',2),(90,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente en efectivo; Cliente: 2','Contabilizado','2012-02-17 04:48:01',2),(91,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000115','Contabilizado','2012-02-17 05:09:45',2),(92,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente en efectivo; Cliente: 2','Contabilizado','2012-02-17 06:09:11',2),(93,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente en efectivo; Cliente: 2','Contabilizado','2012-02-17 06:17:06',2),(94,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente en efectivo; Cliente: 2','Contabilizado','2012-02-17 06:18:26',2),(95,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000116','Contabilizado','2012-02-17 06:19:47',2),(98,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente en efectivo; Cliente: 2','Contabilizado','2012-02-17 06:31:54',2),(99,3,'sdsadsa','Contabilizado','2012-02-17 06:39:22',2),(100,3,'dsadsadsa','Contabilizado','2012-02-17 06:43:11',3),(101,3,'LoteAutomÃ¡tico: Cobro de cuota a cliente en efectivo; Cliente: 2','Contabilizado','2012-02-18 09:30:37',2),(102,3,'LoteAutomÃ¡tico: Venta de mercaderÃ­a; Factura: 001-001-0000117','Contabilizado','2012-02-18 10:48:02',2),(103,3,'LoteAutomático: Venta de mercadería; Factura: 001-001-0000120','Contabilizado','2012-02-18 10:12:45',2);

/*Table structure for table `cont_periodo_contable` */

DROP TABLE IF EXISTS `cont_periodo_contable`;

CREATE TABLE `cont_periodo_contable` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `nombre` varchar(45) NOT NULL default '',
  `fechaInicial` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaFinal` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `Index_per_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_periodo_contable` */

insert  into `cont_periodo_contable`(`id`,`nombre`,`fechaInicial`,`fechaFinal`) values (1,'Periodo2011','2011-01-01 00:00:00','2011-12-01 00:00:00'),(3,'Periodo 2012','2012-01-01 00:00:00','2013-01-01 00:00:00');

/*Table structure for table `cont_periodo_contable_local` */

DROP TABLE IF EXISTS `cont_periodo_contable_local`;

CREATE TABLE `cont_periodo_contable_local` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_periodo` bigint(20) unsigned NOT NULL default '0',
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `estado` varchar(45) NOT NULL default '0',
  `fechaApertura` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaCierre` datetime default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_cont_periodo_contable_local_per` (`id_periodo`),
  KEY `FK_cont_periodo_contable_local_local` (`id_local`),
  CONSTRAINT `FK_cont_periodo_contable_local_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_cont_periodo_contable_local_per` FOREIGN KEY (`id_periodo`) REFERENCES `cont_periodo_contable` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_periodo_contable_local` */

insert  into `cont_periodo_contable_local`(`id`,`id_periodo`,`id_local`,`estado`,`fechaApertura`,`fechaCierre`) values (1,3,2,'CERRADO','2012-02-13 10:40:58','2012-02-13 11:09:26'),(2,3,1,'CERRADO','2012-02-13 11:21:23','2012-02-13 11:21:41'),(3,3,1,'ABIERTO','2012-02-13 11:24:00',NULL),(4,3,2,'ABIERTO','2012-02-13 11:24:41',NULL),(6,3,3,'CERRADO','2012-02-13 11:51:48','2012-02-13 11:52:09'),(7,1,3,'ABIERTO','2012-02-13 11:57:06',NULL);

/*Table structure for table `cont_plan` */

DROP TABLE IF EXISTS `cont_plan`;

CREATE TABLE `cont_plan` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_padre` bigint(20) unsigned default NULL,
  `codigo` varchar(45) NOT NULL default '',
  `nombre` varchar(45) NOT NULL default '',
  `tipo` varchar(45) NOT NULL default '',
  `movimiento` tinyint(3) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `Index_cue_codigo` (`codigo`),
  KEY `FK_cont_plan_padre` (`id_padre`),
  CONSTRAINT `FK_cont_plan_padre` FOREIGN KEY (`id_padre`) REFERENCES `cont_plan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_plan` */

insert  into `cont_plan`(`id`,`id_padre`,`codigo`,`nombre`,`tipo`,`movimiento`) values (1,NULL,'1','ACTIVOS','Activo',0),(2,1,'1.1','ACTIVO CORRIENTE','Activo',0),(3,2,'1.1.01','ACTIVO DISPONIBLE','Activo',0),(4,3,'1.1.01.01','CAJA DIARIA','Activo',1),(5,3,'1.1.01.02','CAJA CHICA','Activo',1),(6,3,'1.1.01.03','BANCOS','Activo',0),(7,6,'1.1.01.03.01','BANCO LOJA CTA. CTE. 0000000000','Activo',1),(8,6,'1.1.01.03.02','BANCO DE GUAYAQUIL CTA. CTE. 0000000000','Activo',1),(9,2,'1.1.02','ACTIVO EXIGIBLE','Activo',0),(10,9,'1.1.02.01','CUENTAS POR COBRAR','Activo',0),(11,10,'1.1.02.01.01','CUENTAS POR COBRAR CLIENTES','Activo',1),(12,10,'1.1.02.01.02','CUENTAS POR COBRAR SOCIOS','Activo',1),(13,10,'1.1.02.01.03','CUENTAS POR COBRAR EMPLEADOS','Activo',1),(14,10,'1.1.02.01.04','CUENTAS POR COBRAR OTROS','Activo',1),(15,10,'1.1.02.01.05','(-) PROVISION DE CUENTAS INCOBRABLES','Activo',1),(16,10,'1.1.02.01.06','CREDITO TRIBUTARIO IVA','Activo',1),(17,10,'1.1.02.01.07','CUENTAS POR COBRAR COMISIÓN  POR CHEQUES DEVU','Activo',1),(18,9,'1.1.02.02','IVA COMPRAS','Activo',0),(19,18,'1.1.02.02.01','IVA COMPRAS BIENES','Activo',1),(20,18,'1.1.02.02.02','IVA COMPRAS SERVICIOS','Activo',1),(21,18,'1.1.02.02.03','IVA COMPRAS ACTIVOS FIJOS','Activo',1),(22,2,'1.1.03','ACTIVO REALIZABLE','Activo',0),(23,22,'1.1.03.01','INVENTARIOS','Activo',0),(24,23,'1.1.03.01.01','INVENTARIO DE MERCADERIAS','Activo',1),(25,2,'1.1.04','PAGOS ANTICIPADOS','Activo',0),(26,25,'1.1.04.01','ANTICIPO SUELDOS A EMPLEADOS','Activo',1),(27,25,'1.1.04.02','ANTICIPOS A TERCEROS','Activo',1),(28,25,'1.1.04.03','ANTICIPOS DE IMPUESTOS','Activo',0),(29,28,'1.1.04.03.01','RETENCION IVA VENTAS','Activo',1),(30,28,'1.1.04.03.02','RETENCION IMPUESTO A LA RENTA EN VENTAS','Activo',1),(31,28,'1.1.04.03.03','TIMBRES SECTOR PÚBLICO','Activo',1),(32,25,'1.1.04.04','ANTICIPO PROVEEDORES','Activo',1),(33,2,'1.1.05','NOTAS DE CRÉDITO','Activo',0),(34,33,'1.1.05.01','NOTAS DE CRÉDITO POR DEVOLUCIÓN DE MERCADERÍA','Activo',1),(35,33,'1.1.05.02','NOTAS DE CRÉDITO POR APORTES IESS','Activo',1),(36,33,'1.1.05.03','OTRAS NOTAS DE CRÉDITO','Activo',1),(37,1,'1.2','ACTIVO NO CORRIENTE','Activo',0),(38,37,'1.2.01','ACTIVO FIJO','Activo',0),(39,38,'1.2.01.01','EQUIPO DE OFICINA','Activo',1),(40,38,'1.2.01.02','(-) DEPR. ACUM. DE EQUIPO DE OFICINA','Activo',1),(41,38,'1.2.01.03','MUEBLES Y ENSERES','Activo',1),(42,38,'1.2.01.04','(-) DEPR. ACUM. DE MUEBLES Y ENSERES','Activo',1),(43,38,'1.2.01.05','MAQUINARIA Y EQUIPO','Activo',1),(44,38,'1.2.01.06','(-) DEPR. ACUM. DE MAQUINARIA Y EQUIPO','Activo',1),(45,38,'1.2.01.07','EQUIPO DE COMPUTACION Y SOFTWARE','Activo',1),(46,38,'1.2.01.08','(-) DEPR. ACUM. EQUIPO DE COMPUTACION','Activo',1),(47,38,'1.2.01.09','EDIFICIOS E INSTALACIONES','Activo',1),(48,38,'1.2.01.10','(-) DEPR. ACUM. DE EDIFICOS E INSTALACIONES','Activo',1),(49,38,'1.2.01.11','VEHICULOS','Activo',1),(50,38,'1.2.01.12','(-) DEP. ACUM. VEHICULOS','Activo',1),(51,37,'1.2.02','INVERSIONES','Activo',0),(52,51,'1.2.02.01','INVERSIONES TEMPORALES','Activo',1),(53,51,'1.2.02.02','INVERSIÓN URBANIZACIÓN','Activo',1),(54,37,'1.2.03','OTROS ACTIVOS','Activo',0),(55,54,'1.2.03.01','OTROS ACTIVOS','Activo',1),(56,54,'1.2.03.02','CHEQUES POSTFECHADOS','Activo',1),(57,54,'1.2.03.03','CHEQUES DEVUELTOS','Activo',1),(58,54,'1.2.03.04','DEPÓSITO DE TERCEROS','Activo',1),(59,NULL,'2','PASIVO','Pasivo',0),(60,59,'2.1','PASIVO CORRIENTE','Pasivo',0),(61,60,'2.1.01','CUENTAS POR PAGAR','Pasivo',0),(62,61,'2.1.01.01','CUENTAS POR PAGAR PROVEEDORES NACIONALES','Pasivo',0),(63,62,'2.1.01.01.01','PROVEEDOR DE PRUEBA UNO','Pasivo',1),(64,62,'2.1.01.01.02','PROVEEDOR DE PRUEBA DOS','Pasivo',1),(65,62,'2.1.01.01.03','PROVEEDOR DE PRUEBA TRES ','Pasivo',1),(66,61,'2.1.01.02','CUENTAS POR PAGAR PROVEEDORES LOCALES','Pasivo',0),(67,66,'2.1.01.02.01','PROVEEDOR DE PRUEBA UNO','Pasivo',1),(68,66,'2.1.01.02.02','PROVEEDOR DE PRUEBA DOS ','Pasivo',1),(69,61,'2.1.01.03','CUENTAS POR PAGAR OTROS','Pasivo',1),(70,61,'2.1.01.04','PARTICIPACION DE SOCIOS POR PAGAR','Pasivo',1),(71,61,'2.1.01.05','SUELDOS Y BONIFICACIONES SOCIALES POR PAGAR','Pasivo',1),(72,60,'2.1.02','OBLIGACIONES CON EL IESS','Pasivo',0),(73,72,'2.1.02.01','APORTE INDIVIDUAL POR PAGAR','Pasivo',1),(74,72,'2.1.02.02','APORTE PATRONAL POR PAGAR','Pasivo',1),(75,72,'2.1.02.03','FONDOS DE RESERVA POR PAGAR','Pasivo',1),(76,72,'2.1.02.04','PRESTAMOS QUIROGRAFARIOS POR PAGAR','Pasivo',1),(77,60,'2.1.03','OBLIGACIONES CON EMPLEADOS','Pasivo',0),(78,77,'2.1.03.01','SUELDOS Y BONIFICACIONES SOCIALES POR PAGAR','Pasivo',1),(79,77,'2.1.03.02','UTILIDAD EMPLEADOS POR PAGAR','Pasivo',1),(80,60,'2.1.04','OTRAS CUENTAS POR PAGAR','Pasivo',0),(81,80,'2.1.04.01','OBLIGACIONES CON INSTITUCIONES FINANCIERAS','Pasivo',1),(82,80,'2.1.04.02','PRESTAMO DE ACCIONISTAS LOCALES','Pasivo',1),(83,60,'2.1.05','RETENCIONES EN LA FUENTE POR PAGAR','Pasivo',0),(84,83,'2.1.05.01','RETENCION 1% IMPUESTO A LA RENTA','Pasivo',0),(85,84,'2.1.05.01.01','RETENCION 1% IMP. RTA. BIENES','Pasivo',0),(86,85,'2.1.05.01.01.01','RET. TRANSFERENCIA DE BIENES DE NATURALEZA CO','Pasivo',1),(87,85,'2.1.05.01.01.02','OTRAS RETENCIONES APLICABLES 1% IMP. RTA.','Pasivo',1),(88,84,'2.1.05.01.02','RETENCION 1% IMPUESTO A LA RENTA SERVICIOS','Pasivo',0),(89,88,'2.1.05.01.02.01','RET. TRANSPORTE PRIVADO 1% IMP. RTA.','Pasivo',1),(90,88,'2.1.05.01.02.02','RET. PROMOCION Y PUBLICIDAD 1% IMP. RTA.','Pasivo',1),(91,88,'2.1.05.01.02.03','RET. OTROS SERVICIOS APLICABLES 1% IMP. RTA.','Pasivo',1),(92,88,'2.1.05.01.02.04','RET. EN RELACION DE DEPENDENCIA 1% IMP. RTA.','Pasivo',1),(93,88,'2.1.05.01.02.05','RET. ARRENDAMIENTO MERCANTIL 1% IMP. RTA.','Pasivo',1),(94,88,'2.1.05.01.02.06','RET. POR SEGUROS Y REASEGUROS','Pasivo',1),(95,83,'2.1.05.02','RETENCION 2% IMP. RTA. SERVICIOS','Pasivo',0),(96,95,'2.1.05.02.01','RET. SERVICIOS DONDE PREDOMINA LA MANO DE OBR','Pasivo',1),(97,95,'2.1.05.02.02','RET. ENTRE SOCIEDADES 2% IMP. RTA.','Pasivo',1),(98,95,'2.1.05.02.03','RET. RENDIMIENTOS FINANCIEROS 2% IMP. RTA.','Pasivo',1),(99,95,'2.1.05.02.04','RET. OTROS SERVICIOS APLICABLES 2% IMP. RTA.','Pasivo',1),(100,83,'2.1.05.03','RETENCION 8% IMPUESTO A LA RENTA','Pasivo',0),(101,100,'2.1.05.03.01','RET. HONORARIOS PROFESIONALES Y DIETAS 8% IMP','Pasivo',1),(102,100,'2.1.05.03.02','RET. SERVICIOS PREDOMINA EL INTELECTO','Pasivo',1),(103,100,'2.1.05.03.03','RET. ARRIENDO DE BIENES INMUEBLES 8% IMP. RTA','Pasivo',1),(104,100,'2.1.05.03.04','RET. OTRAS APLICABLES EL 8% IMP. RTA.','Pasivo',1),(105,60,'2.1.06','RETENCIONES IVA POR PAGAR','Pasivo',0),(106,105,'2.1.06.01','RETENCIONES 30% IVA','Pasivo',0),(107,106,'2.1.06.01.01','RET. 30% IVA POR LA COMPRA DE BIENES','Pasivo',1),(108,105,'2.1.06.02','RETENCIONES 70% IVA','Pasivo',0),(109,108,'2.1.06.02.01','RET. 70% IVA POR LA PRESTACION DE SERVICIOS','Pasivo',1),(110,105,'2.1.06.03','RETENCIONES 100% IVA','Pasivo',0),(111,110,'2.1.06.03.01','RET. 100% IVA POR LA PRESTACION DE SERVICIOS ','Pasivo',1),(112,110,'2.1.06.03.02','RET. 100% IVA POR ARRENDAMIENTO DE INMUEBLES','Pasivo',1),(113,110,'2.1.06.03.03','RET. 100% IVA COMPRA DE BIENES Y SERVICIOS CO','Pasivo',1),(114,60,'2.1.07','IVA VENTAS','Pasivo',0),(115,114,'2.1.07.01','IVA VENTAS LOCALES NETAS','Pasivo',1),(116,114,'2.1.07.02','IVA VENTAS ACTIVO FIJO','Pasivo',1),(117,114,'2.1.07.03','IVA VENTAS SECTOR PUBLICO','Pasivo',1),(118,60,'2.1.08','BONIFICACIONES SOCIALES POR PAGAR','Pasivo',0),(119,118,'2.1.08.01','DECIMO TERCER SUELDO','Pasivo',1),(120,118,'2.1.08.02','DECIMO CUARTO SUELDO','Pasivo',1),(121,60,'2.1.09','IMPUESTO A LA RENTA POR PAGAR','Pasivo',0),(122,121,'2.1.09.01','IMPUESTO A LA RENTA POR PAGAR EN VENTAS','Pasivo',1),(123,121,'2.1.09.02','IMPUESTO A LA RENTA POR PAGAR ANTICIPADO','Pasivo',1),(124,60,'2.1.10','COBROS ANTICIPADOS','Pasivo',0),(125,124,'2.1.10.01','ANTICIPO DE CLIENTES','Pasivo',1),(126,124,'2.1.10.02','ANTICIPO DE CLIENTES CON TARJETA DE CRÉDITO','Pasivo',1),(127,59,'2.2','PASIVO NO CORRIENTE','Pasivo',0),(128,127,'2.2.01','PASIVO A LARGO PLAZO','Pasivo',0),(129,128,'2.2.01.01','OBLIGACIONES CON INSTITUCIONES FINANCIERAS','Pasivo',1),(130,128,'2.2.01.02','PRESTAMOS DE SOCIOS','Pasivo',1),(131,128,'2.2.01.03','PRESTAMOS BANCARIOS','Pasivo',1),(132,127,'2.2.02','OTROS PASIVOS','Pasivo',0),(133,132,'2.2.02.01','OTROS PASIVOS','Pasivo',1),(134,132,'2.2.02.02','CHEQUES GIRADOS Y NO COBRADOS','Pasivo',1),(135,NULL,'3','PATRIMONIO','Patrimonio',0),(136,135,'3.1','CAPITAL SOCIAL','Patrimonio',0),(137,136,'3.1.01','CAPITAL','Patrimonio',0),(138,137,'3.1.01.01','CAPITAL SUSCRITO O ASIGNADO','Patrimonio',1),(139,137,'3.1.01.02','APORTE DE SOCIOS FUTURAS CAPITALIZACIONES','Patrimonio',1),(140,135,'3.2','RESERVAS','Patrimonio',0),(141,140,'3.2.01','RESERVA LEGAL','Patrimonio',1),(142,140,'3.2.02','RESERVA FACULTATIVA','Patrimonio',1),(143,140,'3.2.03','RESERVA ESTATUTARIA','Patrimonio',1),(144,140,'3.2.04','RESERVA DE CAPITAL','Patrimonio',1),(145,135,'3.3','RESULTADOS','Patrimonio',0),(146,145,'3.3.01','UTILIDAD O PERDIDA DEL EJERCICIO ACTUAL','Patrimonio',1),(147,145,'3.3.02','UTILIDAD O PERDIDA DE AÑOS ANTERIORES','Patrimonio',1),(148,NULL,'4','INGRESOS','Ingreso',0),(149,148,'4.1','INGRESOS OPERACIONALES','Ingreso',0),(150,149,'4.1.01','INGRESO POR LA VENTA DE BIENES','Patrimonio',0),(151,150,'4.1.01.01','VENTA DE BIENES 12%','Ingreso',1),(152,150,'4.1.01.02','VENTA DE BIENES 0%','Ingreso',1),(153,149,'4.1.02','INGRESO POR VENTA DE SERVICIOS','Ingreso',0),(154,153,'4.1.02.01','VENTA SERVICIOS 12%','Ingreso',1),(155,153,'4.1.02.02','VENTA SERVICIOS 0%','Ingreso',1),(156,149,'4.1.03','(-) DESCUENTO EN VENTAS','Ingreso',1),(157,149,'4.1.04','(-) DEVOLUCION EN VENTAS','Ingreso',1),(158,149,'4.1.05','SOBRANTE DE CAJA','Ingreso',1),(159,148,'4.2','INGRESOS NO OPERACIONALES','Ingreso',0),(160,159,'4.2.01','INGRESOS FINANCIEROS','Ingreso',0),(161,160,'4.2.01.01','INTERESES GANADOS','Ingreso',1),(162,159,'4.2.02','OTROS INGRESOS','Ingreso',0),(163,162,'4.2.02.01','INGRESOS POR DESCUENTO EN COMPRA','Ingreso',0),(164,163,'4.2.02.01.01','DESCUENTO POR PROMOCION','Ingreso',1),(165,163,'4.2.02.01.02','DEVOLUCION EN COMPRAS','Ingreso',1),(166,162,'4.2.02.02','INGRESO POR ERRORES EN DECLARACIONES','Ingreso',0),(167,166,'4.2.02.02.01','DIFERENCIAS IVA A FAVOR','Ingreso',1),(168,166,'4.2.02.02.02','DIFERENCIAS IMP. RTA. A FAVOR','Ingreso',1),(169,148,'4.3','INGRESOS EXTRAORDINARIOS','Ingreso',0),(170,169,'4.3.01','UTILIDAD POR VENTA DE ACTIVO FIJO','Ingreso',1),(171,169,'4.3.02','OTROS INGRESOS','Ingreso',1),(172,NULL,'5','GASTOS','Gasto',0),(173,172,'5.1','COSTOS Y GASTOS','Gasto',0),(174,173,'5.1.01','COSTOS OPERACIONALES','Gasto',0),(175,174,'5.1.01.01','COSTO DE VENTAS','Gasto',1),(176,173,'5.1.02','GASTOS ADMINISTRATIVOS','Gasto',0),(177,176,'5.1.02.01','GASTOS DE PERSONAL','Gasto',0),(178,177,'5.1.02.01.01','SUELDOS Y SALARIOS PERSONAL ADMINISTRATIVO','Gasto',0),(179,178,'5.1.02.01.01.01','SUELDO DE PERSONAL','Gasto',1),(180,178,'5.1.02.01.01.02','DECIMO TERCER SUELDO','Gasto',1),(181,178,'5.1.02.01.01.03','DECIMO CUARTO SUELDO','Gasto',1),(182,178,'5.1.02.01.01.04','VACACIONES PAGADAS','Gasto',1),(183,178,'5.1.02.01.01.05','HORAS EXTRAS','Gasto',1),(184,178,'5.1.02.01.01.06','UTILIDADES PAGADAS','Gasto',1),(185,177,'5.1.02.01.02','SUELDO DE PERSONAL POR HORAS','Gasto',0),(186,185,'5.1.02.01.02.01','SUELDO PERSONAL POR HORAS','Gasto',1),(187,185,'5.1.02.01.02.02','DECIMO TERCER SUELDO','Gasto',1),(188,185,'5.1.02.01.02.03','DECIMO CUARTO SUELDO','Gasto',1),(189,185,'5.1.02.01.02.04','VACACIONES PAGADAS','Gasto',1),(190,185,'5.1.02.01.02.05','HORAS EXTRAS','Gasto',1),(191,185,'5.1.02.01.02.06','COMISIONES POR VENTAS','Gasto',1),(192,177,'5.1.02.01.03','APORTES A LA SEGURIDAD SOCIAL','Gasto',0),(193,192,'5.1.02.01.03.01','FONDOS DE RESERVA','Gasto',1),(194,192,'5.1.02.01.03.02','APORTE PATRONAL GASTO','Gasto',1),(195,192,'5.1.02.01.03.03','IECE GASTO','Gasto',1),(196,192,'5.1.02.01.03.04','SECAP GASTO','Gasto',1),(197,177,'5.1.02.01.04','BENEFICIOS SOCIALES E INDEMNIZACIONES','Gasto',0),(198,197,'5.1.02.01.04.01','BONIFICACION POR RESPONSABILIDAD','Gasto',1),(199,176,'5.1.02.02','GASTO DE VIAJE','Gasto',0),(200,199,'5.1.02.02.01','GASTOS DE VIAJE DEL PERSONAL','Gasto',1),(201,199,'5.1.02.02.02','HOSPEDAJE Y ALIMENTACION AL PERSONAL','Gasto',1),(202,199,'5.1.02.02.03','GASTOS DE MOVILIZACION Y TRANSPORTE','Gasto',1),(203,199,'5.1.02.02.04','GASTO COMBUSTIBLE','Gasto',1),(204,176,'5.1.02.03','REMUNERACION PERSONAL CONTRATADO','Gasto',0),(205,204,'5.1.02.03.01','HONORARIOS COMISIONES Y DIETAS A PERSONAS NAT','Gasto',1),(206,204,'5.1.02.03.02','SERVICIOS OCACIONALES','Gasto',1),(207,176,'5.1.02.04','GASTOS OPERATIVOS','Gasto',0),(208,207,'5.1.02.04.01','COMPRA DE BIENES LOCALES NO PRODUCIDOS POR LA','Gasto',0),(209,208,'5.1.02.04.01.01','ALIMENTACION','Gasto',1),(210,208,'5.1.02.04.01.02','COMPRA DE BIDON DE AGUA','Gasto',1),(211,208,'5.1.02.04.01.03','COMPRA DE OTROS BIENES','Gasto',1),(212,208,'5.1.02.04.01.04','FALTANTE DE CAJA','Gasto',1),(213,207,'5.1.02.04.02','SERVICIOS BASICOS','Gasto',0),(214,213,'5.1.02.04.02.01','GASTO ENERGIA ELECTRICA','Gasto',1),(215,213,'5.1.02.04.02.02','GASTO DE TELEFONO','Gasto',1),(216,213,'5.1.02.04.02.03','SERVICIO DE INTERNET','Gasto',1),(217,213,'5.1.02.04.02.04','GASTO CONEXIÓN DE RED','Gasto',1),(218,207,'5.1.02.04.03','SUMINISTROS Y MATERIALES','Gasto',0),(219,218,'5.1.02.04.03.01','UTILES Y SUMINISTROS DE OFICINA','Gasto',1),(220,218,'5.1.02.04.03.02','OTROS MATERIALES','Gasto',1),(221,218,'5.1.02.04.03.03','MATERIAL DE LIMPIEZA','Gasto',1),(222,218,'5.1.02.04.03.04','GASTOS DE IMPRENTA','Gasto',1),(223,218,'5.1.02.04.03.05','MEDICINAS','Gasto',1),(224,207,'5.1.02.04.04','GASTO ARRIENDO','Gasto',0),(225,224,'5.1.02.04.04.01','GASTO ARRIENDO OFICINA','Gasto',1),(226,224,'5.1.02.04.04.02','GASTO ARRIENDO GARAGE','Gasto',1),(227,173,'5.1.03','GASTOS DE DEPRECIACION PROVISION Y AMORTIZACI','Gasto',0),(228,227,'5.1.03.01','GASTOS DE DEPRECIACION','Gasto',0),(229,228,'5.1.03.01.01','DEPRECIACION EQUIPO DE OFICINA','Gasto',1),(230,228,'5.1.03.01.02','DEPRECIACION MUEBLES Y ENSERES','Gasto',1),(231,228,'5.1.03.01.03','DEPRECIACION MAQUINARIA Y EQUIPO','Gasto',1),(232,228,'5.1.03.01.04','DEPRECIACION EQUIPO DE COMPUTACION','Gasto',1),(233,228,'5.1.03.01.05','DEPRECIACION DE EDIFICIOS E INSTALACIONES','Gasto',1),(234,228,'5.1.03.01.06','DEPRECIACION DE VEHICULO','Gasto',1),(235,227,'5.1.03.02','GASTOS DE AMORTIZACIONES','Gasto',0),(236,235,'5.1.03.02.01','AMORTIZACION GASTOS DE CONSTITUCION','Gasto',1),(237,173,'5.1.04','NOTARIOS Y REGISTRADORES DE LA PROPIEDAD','Gasto',0),(238,237,'5.1.04.01','NOTARIALES','Gasto',1),(239,173,'5.1.05','TRIBUTARIOS CONTRIBUCIONES Y OTROS IMPUESTOS','Gasto',0),(240,239,'5.1.05.01','GASTO IVA','Gasto',1),(241,239,'5.1.05.02','MULTAS E INTERESES FISCALES','Gasto',1),(242,239,'5.1.05.03','OTROS IMPUESTOS','Gasto',1),(243,239,'5.1.05.04','PATENTE MUNICIPAL','Gasto',1),(244,239,'5.1.05.05','CONTRIBUCIÓN SUPER INTENDENCIA DE CÍAS.','Gasto',1),(245,239,'5.1.05.06','TIMBRES DEL SECTOR PÚBLICO','Gasto',1),(246,239,'5.1.05.08','ANTICIPO IMPUESTO A LA RENTA PAGADO','Gasto',1),(247,173,'5.1.06','MANTENIMIENTO Y REPARACIONES','Gasto',0),(248,247,'5.1.06.01','MANTENIMIENTO Y REPARACIONES DE EDIFICIO','Gasto',1),(249,247,'5.1.06.02','MANTENIMIENTO Y REPARACION DE MAQUINARIA Y EQ','Gasto',1),(250,247,'5.1.06.03','MANTENIMIENTO Y REPARACION DE MUEBLES Y ENSER','Gasto',1),(251,247,'5.1.06.04','MANTENIMIENTO Y REPARACION DE VEHICULO','Gasto',1),(252,247,'5.1.06.05','REPUESTOS','Gasto',1),(253,173,'5.1.07','TRANSPORTE Y CORREOS','Gasto',0),(254,253,'5.1.07.01','SERVICIO DE TRANSPORTE PRIVADO DE PASAJEROS','Gasto',1),(255,253,'5.1.07.02','CORREO COURIERS Y FLETES','Gasto',1),(256,253,'5.1.07.03','SERVICIO DE MENSAJERIA','Gasto',1),(257,173,'5.1.08','GASTOS DE GESTION','Gasto',0),(258,257,'5.1.08.01','GASTOS DE AGASAJO AL PERSONAL','Gasto',1),(259,257,'5.1.08.02','GASTO DE ANIVERSARIO','Gasto',1),(260,173,'5.1.09','PROVISION CUENTAS INCOBRABLES','Gasto',0),(261,260,'5.1.09.01','GASTO PROVISION CUENTAS INCOBRABLES','Gasto',1),(262,173,'5.1.10','PROMOCION Y PUBLICIDAD','Gasto',0),(263,262,'5.1.10.01','GASTO PROMOCION Y PUBLICIDAD','Gasto',1),(264,173,'5.1.11','OTROS GASTOS OPERACIONALES','Gasto',0),(265,264,'5.1.11.01','CAPACITACION AL PERSONAL','Gasto',1),(266,264,'5.1.11.02','OTROS GASTOS LEGALES','Gasto',1),(267,264,'5.1.11.03','OTROS GASTOS OPERACIONALES','Gasto',1),(268,264,'5.1.11.04','ACTUALIZACIÓN PROGRAMAS','Gasto',1),(269,264,'5.1.11.05','SEGUROS Y REASEGUROS','Gasto',1),(270,264,'5.1.11.06','SERVICIO TÉCNICO','Gasto',1),(271,172,'5.2','GASTOS NO OPERACIONALES','Gasto',0),(272,271,'5.2.01','PERDIDA EN ACTIVO FIJO','Gasto',0),(273,272,'5.2.01.01','PERDIDA POR BAJA DE ACTIVO FIJO','Gasto',1),(274,272,'5.2.01.02','PERDIDA EN VENTA DE ACTIVO FIJO','Gasto',1),(275,271,'5.2.02','EGRESOS BANCARIOS','Gasto',0),(276,275,'5.2.02.01','GASTOS BANCARIOS','Gasto',1),(277,275,'5.2.02.02','INTERESES PAGADOS','Gasto',1),(278,275,'5.2.02.03','COMISIONES BANCARIAS','Gasto',1),(279,271,'5.2.03','OTROS GASTOS NO OPERACIONALES','Gasto',0),(280,279,'5.2.03.01','GASTOS NO OPERACIONALES','Gasto',1),(281,279,'5.2.03.02','GASTOS POR DONACIONES','Gasto',1),(282,279,'5.2.03.03','GASTO CUENTAS INCOBRABLES','Gasto',1),(283,271,'5.2.04','GASTOS NO DEDUCIBLES','Gasto',0),(284,283,'5.2.04.01','DIFERENCIAS DEL IVA','Gasto',1),(285,283,'5.2.04.02','DIFERENCIAS DEL IMPUESTO A LA RENTA','Gasto',1),(286,283,'5.2.04.03','MULTAS E INTERESES FISCALES','Gasto',1),(287,283,'5.2.04.04','OTROS GASTOS NO DEDUCIBLES','Gasto',1),(288,NULL,'6','CUENTAS DE ORDEN','Gasto',0),(289,288,'6.1','DEUDORAS','Cuenta de Or',0),(290,289,'6.1.01','AJUSTE CUENTAS POR PAGAR PROVEEDORES','Cuenta de Or',1),(291,289,'6.1.02','AJUSTE RETENCIONES POR PAGAR','Cuenta de Or',1),(292,289,'6.1.03','AJUSTE APORTES IESS POR PAGAR','Cuenta de Or',1),(293,289,'6.1.04','AJUSTE UTILIDADES','Cuenta de Or',1),(294,288,'6.2','ACREEDORAS','Cuenta de Or',0),(295,294,'6.2.01','AJUSTE CUENTAS POR COBRAR CLIENTES','Cuenta de Or',1),(296,294,'6.2.02','AJUSTE INVENTARIO','Cuenta de Or',1),(297,294,'6.2.03','AJUSTE RETENCIONES EN VENTAS','Cuenta de Or',1),(298,106,'2.1.06.01.02','RET. 30% IVA POR LA PRESTACION DE SERVICIOS','Pasivo',1),(299,NULL,'200.100','CUENTA GENERICA(MORAS)','Pasivo',1);

/*Table structure for table `cont_retencion` */

DROP TABLE IF EXISTS `cont_retencion`;

CREATE TABLE `cont_retencion` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `numero` varchar(45) NOT NULL,
  `numeroAutProv` varchar(45) NOT NULL,
  `fecha` datetime NOT NULL,
  `isImpresa` tinyint(1) unsigned NOT NULL,
  `total` double NOT NULL,
  `id_local` bigint(20) unsigned NOT NULL,
  `id_compra` bigint(20) unsigned NOT NULL,
  `id_periodo` bigint(20) unsigned NOT NULL,
  `id_proveedor` bigint(20) unsigned NOT NULL,
  `tipoDocumento` varchar(45) NOT NULL,
  `id_usuario` bigint(20) unsigned NOT NULL,
  `id_aut_sri` bigint(20) unsigned NOT NULL,
  `fechaInicio` datetime NOT NULL,
  `fechaCaducidad` datetime NOT NULL,
  `id_punto` bigint(20) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_cont_retencion_local` (`id_local`),
  KEY `FK_cont_retencion_compra` (`id_compra`),
  KEY `FK_cont_retencion_proveedor` (`id_proveedor`),
  KEY `FK_cont_retencion_periodo` (`id_periodo`),
  KEY `FK_cont_retencion_usuario` (`id_usuario`),
  KEY `FK_cont_retencion_autsri` (`id_aut_sri`),
  KEY `FK_cont_retencion_punto` (`id_punto`),
  CONSTRAINT `FK_cont_retencion_autsri` FOREIGN KEY (`id_aut_sri`) REFERENCES `ven_autorizacion_sri` (`id`),
  CONSTRAINT `FK_cont_retencion_compra` FOREIGN KEY (`id_compra`) REFERENCES `com_fac_compra` (`id`),
  CONSTRAINT `FK_cont_retencion_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_cont_retencion_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `cont_periodo_contable` (`id`),
  CONSTRAINT `FK_cont_retencion_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `com_proveedor` (`id`),
  CONSTRAINT `FK_cont_retencion_punto` FOREIGN KEY (`id_punto`) REFERENCES `ven_punto_facturacion` (`id`),
  CONSTRAINT `FK_cont_retencion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `seg_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_retencion` */

insert  into `cont_retencion`(`id`,`numero`,`numeroAutProv`,`fecha`,`isImpresa`,`total`,`id_local`,`id_compra`,`id_periodo`,`id_proveedor`,`tipoDocumento`,`id_usuario`,`id_aut_sri`,`fechaInicio`,`fechaCaducidad`,`id_punto`) values (1,'001-001-0000003','0','2012-02-14 11:41:24',0,1.94,2,3,3,1,'7',1,4,'2012-02-09 00:00:00','2013-01-09 00:00:00',1),(2,'001-001-0000004','0','2012-02-15 05:58:07',0,0.42,2,4,3,1,'7',1,4,'2012-02-09 00:00:00','2013-01-09 00:00:00',1),(11,'001-001-0000005','0','2012-02-15 07:05:37',0,0.14,2,2,3,1,'7',1,4,'2012-02-09 00:00:00','2013-01-09 00:00:00',1),(16,'001-001-0000006','0','2012-02-16 02:51:34',0,1.4,2,5,3,1,'7',1,4,'2012-02-09 00:00:00','2013-01-09 00:00:00',1),(18,'001-001-0000007','0','2012-02-16 03:52:07',0,75.44,2,6,3,1,'7',1,4,'2012-02-09 00:00:00','2013-01-09 00:00:00',1),(20,'001-001-0000008','0','2012-02-16 04:02:45',0,4,2,7,3,2,'7',1,4,'2012-02-09 00:00:00','2013-01-09 00:00:00',1),(21,'001-001-0000009','0','2012-02-16 04:03:37',0,101.2,2,8,3,3,'7',1,4,'2012-02-09 00:00:00','2013-01-09 00:00:00',1);

/*Table structure for table `cont_retencion_detalle` */

DROP TABLE IF EXISTS `cont_retencion_detalle`;

CREATE TABLE `cont_retencion_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_retencion` bigint(20) unsigned NOT NULL,
  `impuesto` varchar(45) NOT NULL,
  `codigoRetencion` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `ejercicioFiscal` varchar(45) NOT NULL,
  `base0` double NOT NULL,
  `baseGrav` double NOT NULL,
  `baseNoGrav` double NOT NULL,
  `baseImponible` double NOT NULL,
  `porcentaje` double NOT NULL,
  `valor` double NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_cont_retencion_detalle_ret` (`id_retencion`),
  CONSTRAINT `FK_cont_retencion_detalle_ret` FOREIGN KEY (`id_retencion`) REFERENCES `cont_retencion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_retencion_detalle` */

insert  into `cont_retencion_detalle`(`id`,`id_retencion`,`impuesto`,`codigoRetencion`,`descripcion`,`ejercicioFiscal`,`base0`,`baseGrav`,`baseNoGrav`,`baseImponible`,`porcentaje`,`valor`) values (1,1,'IR','304','IR (304)','Periodo 2012',0,28.98,0,20,8,1.6),(2,1,'IR','307','IR (307)','Periodo 2012',0,28.98,0,7,2,0.14),(3,1,'IR','319','IR (319)','Periodo 2012',0,28.98,0,20,1,0.2),(4,2,'IVA','','IVA Servicios','Periodo 2012',0,0,0,0.6,70,0.42),(13,11,'IR','307','IR (307)','Periodo 2012',0,7,0,7,2,0.14),(18,16,'IR','307','IR (307)','Periodo 2012',0,70,0,70,2,1.4),(21,18,'IVA','','IVA Servicios','Periodo 2012',0,0,0,55.2,70,38.64),(22,18,'IR','304','IR (304)','Periodo 2012',460,0,0,460,8,36.8),(25,20,'IR','319','IR (319)','Periodo 2012',400,0,0,400,1,4),(26,21,'IVA','','IVA Servicios','Periodo 2012',0,0,0,55.2,100,55.2),(27,21,'IR','303','IR (303)','Periodo 2012',460,0,0,460,10,46);

/*Table structure for table `cont_retencion_ir` */

DROP TABLE IF EXISTS `cont_retencion_ir`;

CREATE TABLE `cont_retencion_ir` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `codigo` varchar(45) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `nombreCorto` varchar(80) NOT NULL,
  `porcentajeRetencion` double NOT NULL,
  `id_plan` bigint(20) unsigned default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_cont_retencion_ir_plan` (`id_plan`),
  CONSTRAINT `FK_cont_retencion_ir_plan` FOREIGN KEY (`id_plan`) REFERENCES `cont_plan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_retencion_ir` */

insert  into `cont_retencion_ir`(`id`,`codigo`,`descripcion`,`nombreCorto`,`porcentajeRetencion`,`id_plan`) values (1,'303','Honorarios profesionales y dietas','Honorarios profesionales y dietas',10,83),(2,'304','Servicios predomina el intelecto                - Por pagos realizados a notarios y registradores de la propiedad o mercantiles                                                       - Honorarios y demÃ¡s pagos realizados a personas naturales que presten servicios de docencia.                                    - Por remuneraciones a deportistas, entrenadores, cuerpo tÃ©cnico, Ã¡rbitros y artistas residentes','Servicios predomina el intelecto',8,83),(3,'307','Servicios predomina la mano de obra','Servicios predomina la mano de obra',2,83),(4,'308','Servicios entre sociedades','Servicios entre sociedades',2,83),(5,'309','Servicios publicidad y comunicaciÃ³n','Servicios publicidad y comunicaciÃ³n',1,83),(6,'310','Transporte privado de pasajeros o servicio pÃºblico o privado de carga','Transporte privado de pasajeros o servicio pÃºblico o privado de carga',1,83),(7,'312','Transferencia de bienes muebles de naturaleza corporal','Transferencia de bienes muebles de naturaleza corporal',1,83),(8,'319','Arrendamiento mercantil','Arrendamiento mercantil',1,83),(9,'320','Arrendamiento bienes inmuebles','Arrendamiento bienes inmuebles',8,83),(10,'322','Seguros y reaseguros (primas y cesiones) (10% del valor de las primas facturadas)','Seguros y reaseguros',1,83),(11,'323','Por rendimientos financieros (No aplica para IFIs)','Por rendimientos financieros',2,83),(12,'325','Por loterÃ­as, rifas, apuestas y similares','Por loterÃ­as, rifas, apuestas y similares',15,83),(13,'327','Por venta de combustibles a comercializadoras','Por venta de combustibles a comercializadoras',0.002,83),(14,'328','Por venta de combustibles a distribuidores','Por venta de combustibles a distribuidores',0.003,83),(15,'332','Otras compras de bienes y servicios no sujetas a retenciÃ³n','Otras compras de bienes y servicios no sujetas a retenciÃ³n',0,83),(16,'333','Convenio de DÃ©bito o RecaudaciÃ³n','Convenio de DÃ©bito o RecaudaciÃ³n',0,83),(17,'334','Por compras con tarjeta de crÃ©dito','Por compras con tarjeta de crÃ©dito',0,83),(18,'340','Otras retenciones aplicables el 1%','Otras retenciones aplicables el 1%',1,83),(19,'341','Otras retenciones aplicables el 2%','Otras retenciones aplicables el 2%',2,83),(20,'342','Otras retenciones aplicables el 8%','Otras retenciones aplicables el 8%',8,83),(21,'343','Otras retenciones aplicables el 25%','Otras retenciones aplicables el 25%',25,83),(22,'403','Sin convenio de doble tributaciÃ³n intereses y costos financieros por financiamiento de proveedores externos (si el valor se encuentra dentro de la tasa activa maxima referencial del BCE se retiene el 25%)','Sin convenio de doble tributaciÃ³n interese',25,83),(23,'405','Sin convenio de doble tributaciÃ³n intereses de crÃ©ditos externos registrados en el BCE (si el valor se encuentra dentro de la tasa activa maxima referencial del BCE se retiene el 25%)','Sin convenio de doble tributaciÃ³n intereses de crÃ©ditos externos',25,83),(24,'421','Sin convenio de doble tributaciÃ³n por otros conceptos','Sin convenio de doble tributaciÃ³n por otros conceptos',25,83),(25,'427','Pagos al exterior no sujetos a retenciÃ³n','Pagos al exterior no sujetos a retenciÃ³n',0,83),(26,'401','Con convenio de doble tributaciÃ³n','Con convenio de doble tributaciÃ³n',0,83);

/*Table structure for table `cont_retencion_iva` */

DROP TABLE IF EXISTS `cont_retencion_iva`;

CREATE TABLE `cont_retencion_iva` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `porcentajeBien` double NOT NULL,
  `porcentajeServicio` double NOT NULL,
  `tipoProveedor` varchar(45) NOT NULL,
  `tipoAgenteRetencion` varchar(45) NOT NULL,
  `id_plan_bien` bigint(20) unsigned default NULL,
  `id_plan_servicio` bigint(20) unsigned default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_cont_retencion_iva_plan_bien` (`id_plan_bien`),
  KEY `FK_cont_retencion_iva_plan_servicio` (`id_plan_servicio`),
  CONSTRAINT `FK_cont_retencion_iva_plan_bien` FOREIGN KEY (`id_plan_bien`) REFERENCES `cont_plan` (`id`),
  CONSTRAINT `FK_cont_retencion_iva_plan_servicio` FOREIGN KEY (`id_plan_servicio`) REFERENCES `cont_plan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_retencion_iva` */

insert  into `cont_retencion_iva`(`id`,`porcentajeBien`,`porcentajeServicio`,`tipoProveedor`,`tipoAgenteRetencion`,`id_plan_bien`,`id_plan_servicio`) values (1,0,0,'TIPO_PROVEEDOR_ENTIDADES','TIPO_AGENTE_RETENCION_ENTIDADES',NULL,NULL),(2,0,0,'TIPO_PROVEEDOR_CONTRIBUYENTES','TIPO_AGENTE_RETENCION_ENTIDADES',NULL,NULL),(3,30,70,'TIPO_PROVEEDOR_SOCIEDADES','TIPO_AGENTE_RETENCION_ENTIDADES',107,109),(4,30,70,'TIPO_PROVEEDOR_OBLIGADA','TIPO_AGENTE_RETENCION_ENTIDADES',107,109),(5,30,70,'TIPO_PROVEEDOR_EMITE','TIPO_AGENTE_RETENCION_ENTIDADES',107,109),(6,100,100,'TIPO_PROVEEDOR_EMT_LIQ_COMP','TIPO_AGENTE_RETENCION_ENTIDADES',113,111),(7,0,100,'TIPO_PROVEEDOR_PROFESIONALES','TIPO_AGENTE_RETENCION_ENTIDADES',NULL,111),(8,0,100,'TIPO_PROVEEDOR_ARRENDAMIENTO','TIPO_AGENTE_RETENCION_ENTIDADES',NULL,111),(9,0,0,'TIPO_PROVEEDOR_ENTIDADES','TIPO_AGENTE_RETENCION_CONTRIBUYENTES',NULL,NULL),(10,0,0,'TIPO_PROVEEDOR_CONTRIBUYENTES','TIPO_AGENTE_RETENCION_CONTRIBUYENTES',NULL,NULL),(11,30,70,'TIPO_PROVEEDOR_SOCIEDADES','TIPO_AGENTE_RETENCION_CONTRIBUYENTES',107,109),(12,30,70,'TIPO_PROVEEDOR_OBLIGADA','TIPO_AGENTE_RETENCION_CONTRIBUYENTES',107,109),(13,30,70,'TIPO_PROVEEDOR_EMITE','TIPO_AGENTE_RETENCION_CONTRIBUYENTES',107,109),(14,100,100,'TIPO_PROVEEDOR_EMT_LIQ_COMP','TIPO_AGENTE_RETENCION_CONTRIBUYENTES',113,111),(15,0,100,'TIPO_PROVEEDOR_PROFESIONALES','TIPO_AGENTE_RETENCION_CONTRIBUYENTES',NULL,111),(16,0,100,'TIPO_PROVEEDOR_ARRENDAMIENTO','TIPO_AGENTE_RETENCION_CONTRIBUYENTES',NULL,111),(17,0,0,'TIPO_PROVEEDOR_ENTIDADES','TIPO_AGENTE_RETENCION_SOCIEDAD',NULL,NULL),(18,0,0,'TIPO_PROVEEDOR_CONTRIBUYENTES','TIPO_AGENTE_RETENCION_SOCIEDAD',NULL,NULL),(19,0,0,'TIPO_PROVEEDOR_SOCIEDADES','TIPO_AGENTE_RETENCION_SOCIEDAD',NULL,NULL),(20,0,0,'TIPO_PROVEEDOR_OBLIGADA','TIPO_AGENTE_RETENCION_SOCIEDAD',NULL,NULL),(21,30,70,'TIPO_PROVEEDOR_EMITE','TIPO_AGENTE_RETENCION_SOCIEDAD',107,109),(22,100,100,'TIPO_PROVEEDOR_EMT_LIQ_COMP','TIPO_AGENTE_RETENCION_SOCIEDAD',113,111),(23,0,100,'TIPO_PROVEEDOR_PROFESIONALES','TIPO_AGENTE_RETENCION_SOCIEDAD',NULL,111),(24,0,100,'TIPO_PROVEEDOR_ARRENDAMIENTO','TIPO_AGENTE_RETENCION_SOCIEDAD',NULL,111),(25,0,0,'TIPO_PROVEEDOR_ENTIDADES','TIPO_AGENTE_RETENCION_CONTRATANTE',NULL,NULL),(26,0,30,'TIPO_PROVEEDOR_CONTRIBUYENTES','TIPO_AGENTE_RETENCION_CONTRATANTE',NULL,298),(27,0,30,'TIPO_PROVEEDOR_SOCIEDADES','TIPO_AGENTE_RETENCION_CONTRATANTE',NULL,298),(28,0,30,'TIPO_PROVEEDOR_OBLIGADA','TIPO_AGENTE_RETENCION_CONTRATANTE',NULL,298),(29,0,30,'TIPO_PROVEEDOR_EMITE','TIPO_AGENTE_RETENCION_CONTRATANTE',NULL,298),(30,0,100,'TIPO_PROVEEDOR_EMT_LIQ_COMP','TIPO_AGENTE_RETENCION_CONTRATANTE',NULL,111),(31,0,30,'TIPO_PROVEEDOR_PROFESIONALES','TIPO_AGENTE_RETENCION_CONTRATANTE',NULL,298),(32,0,0,'TIPO_PROVEEDOR_ARRENDAMIENTO','TIPO_AGENTE_RETENCION_CONTRATANTE',NULL,NULL),(33,0,0,'TIPO_PROVEEDOR_ENTIDADES','TIPO_AGENTE_RETENCION_COMPSEGUROS',NULL,NULL),(34,0,0,'TIPO_PROVEEDOR_CONTRIBUYENTES','TIPO_AGENTE_RETENCION_COMPSEGUROS',NULL,NULL),(35,30,70,'TIPO_PROVEEDOR_SOCIEDADES','TIPO_AGENTE_RETENCION_COMPSEGUROS',107,109),(36,30,70,'TIPO_PROVEEDOR_OBLIGADA','TIPO_AGENTE_RETENCION_COMPSEGUROS',107,109),(37,30,70,'TIPO_PROVEEDOR_EMITE','TIPO_AGENTE_RETENCION_COMPSEGUROS',107,109),(38,100,100,'TIPO_PROVEEDOR_EMT_LIQ_COMP','TIPO_AGENTE_RETENCION_COMPSEGUROS',113,111),(39,0,100,'TIPO_PROVEEDOR_PROFESIONALES','TIPO_AGENTE_RETENCION_COMPSEGUROS',NULL,111),(40,0,0,'TIPO_PROVEEDOR_ARRENDAMIENTO','TIPO_AGENTE_RETENCION_COMPSEGUROS',NULL,NULL),(41,0,0,'TIPO_PROVEEDOR_ENTIDADES','TIPO_AGENTE_RETENCION_EXPORTADORES',NULL,NULL),(42,0,0,'TIPO_PROVEEDOR_CONTRIBUYENTES','TIPO_AGENTE_RETENCION_EXPORTADORES',NULL,NULL),(43,100,100,'TIPO_PROVEEDOR_SOCIEDADES','TIPO_AGENTE_RETENCION_EXPORTADORES',113,111),(44,100,100,'TIPO_PROVEEDOR_OBLIGADA','TIPO_AGENTE_RETENCION_EXPORTADORES',113,111),(45,100,100,'TIPO_PROVEEDOR_EMITE','TIPO_AGENTE_RETENCION_EXPORTADORES',113,111),(46,100,100,'TIPO_PROVEEDOR_EMT_LIQ_COMP','TIPO_AGENTE_RETENCION_EXPORTADORES',113,111),(47,100,100,'TIPO_PROVEEDOR_PROFESIONALES','TIPO_AGENTE_RETENCION_EXPORTADORES',113,111),(48,0,0,'TIPO_PROVEEDOR_ARRENDAMIENTO','TIPO_AGENTE_RETENCION_EXPORTADORES',NULL,NULL);

/*Table structure for table `cont_transaccion` */

DROP TABLE IF EXISTS `cont_transaccion`;

CREATE TABLE `cont_transaccion` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `codigo` varchar(45) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `textoLote` varchar(255) default '',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_transaccion` */

insert  into `cont_transaccion`(`id`,`codigo`,`descripcion`,`estado`,`fechaCreacion`,`textoLote`) values (3,'ANTICIPO_EFECTIVO_PENDIENTE','Anticipo en efectivo','Activa','2011-06-12 00:00:00','Anticipo en efectivo creado'),(4,'ANTICIPO_CHEQUE_PENDIENTE','Anticipo con cheques','Activa','2011-06-12 00:00:00','Anticipo creado'),(5,'ANTICIPO_DEPOSITO_PENDIENTE','Anticipo con deposito','Activa','2011-06-12 00:00:00','Anticipo con deposito creado'),(6,'ANTICIPO_TRANSFERENCIA_PENDIENTE','Anticipo con transferncia bancaria','Activa','2011-06-12 00:00:00','Anticipo con transferencia creado'),(9,'COMPRA_MERCADERIA','Compra de mecaderÃ­a','Activa','2012-02-02 00:00:00','Compra de mercaderÃ­a'),(10,'ANTICIPO_EFECTIVO_DEVUELTO','Anticipo en efectivo devuelto','Activa','2012-02-10 00:00:00','Anticipo en efectivo devuelto'),(11,'ANTICIPO_CHEQUE_DEVUELTO','Anticipos devueltos con cheque','Activa','2012-02-10 00:00:00','Cheque devuelto'),(12,'ANTICIPO_TRANSFERENCIA_DEVUELTO','Transeferncia devuelta','Activa','2012-02-10 00:00:00','Anticipo con transferencia devuleto'),(13,'ANTICIPO_DEPOSITO_DEVUELTO','Anticipo con deposito devuelto','Activa','2012-02-11 00:00:00','Anticipo devuelto'),(14,'ANTICIPO_EFECTIVO_ANULADO','Anulacion del anticipo o edicion','Activa','2012-02-11 00:00:00','Anticipo en efectivo creado'),(15,'ANTICIPO_CHEQUE_ANULADO','AnulaciÃ³n del anticipo o ediciÃ³n','Activa','2012-02-11 00:00:00','Cheque anulado'),(16,'ANTICIPO_TRANSFERENCIA_ANULADO','Anulacion','Activa','2012-02-11 00:00:00','Anticipo con transferencia anulado'),(17,'ANTICIPO_DEPOSITO_ANULADO','AnulaciÃ³n','Activa','2012-02-11 00:00:00','Anticipo anulado'),(21,'VENTA_MERCADERIA','Ventas de mercaderÃ­a','Activa','2012-02-11 00:00:00','Venta de mercaderÃ­a'),(22,'CAJA_INGRESO','Ingreso de dinero a caja','Activa','2012-02-14 00:00:00','Ingreso a caja'),(23,'COMPRA_RETENCIONES','Retenciones en compras','Activa','2012-02-14 00:00:00','Retencion en compras'),(24,'CAJA_GASTO','Gasto. Representa una salida de caja por ejemplopara un taxi, etc','Activa','2012-02-15 00:00:00','Gasto'),(25,'COBRO_CUOTA_EFECTIVO','Cobro de cuota a cliente','Activa','2012-02-17 00:00:00','Cobro de cuota a cliente en efectivo'),(26,'COBRO_CUOTA_CHEQUE','Cobro de cuota con cheque','Activa','2012-02-17 00:00:00','Cobro de cuota a cliente con cheque'),(27,'COBRO_CUOTA_DEPOSITO','Cobro de cuota con deposito','Activa','2012-02-17 00:00:00','Cobro de cuota con deposito'),(28,'COBRO_CUOTA_TRANSFERENCIA','Cobro de cuota con transferncia bancaria','Activa','2012-02-17 00:00:00','Cobro de cuota con transferncia bancaria');

/*Table structure for table `cont_transaccion_detalle` */

DROP TABLE IF EXISTS `cont_transaccion_detalle`;

CREATE TABLE `cont_transaccion_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_transaccion` bigint(20) unsigned NOT NULL,
  `id_plan` bigint(20) unsigned default NULL,
  `tipo` varchar(45) NOT NULL,
  `formula` varchar(250) NOT NULL default 'model.total' COMMENT 'Ejemplo: model.total * 12 + (model.subtotal)',
  `aplicaA` varchar(80) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_cont_transacciondetalle_transaccion` (`id_transaccion`),
  KEY `FK_cont_transacciondetalle_plan` (`id_plan`),
  CONSTRAINT `FK_cont_transacciondetalle_plan` FOREIGN KEY (`id_plan`) REFERENCES `cont_plan` (`id`),
  CONSTRAINT `FK_cont_transacciondetalle_transaccion` FOREIGN KEY (`id_transaccion`) REFERENCES `cont_transaccion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_transaccion_detalle` */

insert  into `cont_transaccion_detalle`(`id`,`id_transaccion`,`id_plan`,`tipo`,`formula`,`aplicaA`) values (2,3,4,'Debe','model.monto',''),(5,5,125,'Haber','model.monto',''),(7,6,125,'Haber','model.monto',''),(8,3,125,'Haber','model.monto',''),(10,9,5,'Debe','model.total',''),(11,9,24,'Haber','model.total',''),(12,10,125,'Debe','model.saldo',''),(13,10,4,'Haber','model.saldo',''),(14,6,NULL,'Debe','model.monto',''),(15,12,125,'Debe','model.saldo',''),(16,12,NULL,'Haber','model.saldo',''),(17,4,11,'Debe','model.monto',''),(18,4,125,'Haber','model.monto',''),(19,11,11,'Haber','model.saldo',''),(20,11,125,'Debe','model.saldo',''),(21,5,NULL,'Debe','model.monto',''),(22,13,NULL,'Haber','model.saldo',''),(23,13,125,'Debe','model.saldo',''),(24,14,125,'Debe','model.monto',''),(25,14,4,'Haber','model.monto',''),(26,15,11,'Haber','model.monto',''),(27,15,125,'Debe','model.monto',''),(28,16,NULL,'Haber','model.monto',''),(29,16,125,'Debe','model.monto',''),(30,17,NULL,'Haber','model.monto',''),(31,17,125,'Debe','model.monto',''),(37,21,4,'Debe','model.totalEfectivo','EFECTIVO'),(38,21,125,'Debe','model.totalAnticipos','ANTICIPO'),(39,21,11,'Debe','model.totalCheques','CHEQUE'),(40,21,11,'Debe','model.totalCreditoDiferido','CREDITO_DIFERIDO'),(41,21,11,'Debe','model.totalCreditoCorriente','CREDITO_CORRIENTE'),(43,21,24,'Haber','model.total',''),(44,22,4,'Debe','model.valor',''),(45,22,287,'Haber','model.valor',''),(46,24,287,'Debe','model.valor',''),(47,24,4,'Haber','model.valor',''),(48,23,NULL,'Haber','model.valor',''),(49,23,69,'Debe','model.total',''),(50,25,4,'Debe','model.montoTotal',''),(51,25,11,'Haber','model.montoReal',''),(52,26,11,'Haber','model.monto',''),(53,26,14,'Debe','model.monto',''),(54,27,11,'Haber','model.monto',''),(55,27,NULL,'Debe','model.monto',''),(56,28,NULL,'Debe','model.monto',''),(57,28,11,'Haber','model.monto',''),(58,25,161,'Haber','model.montoInteres','INTERES'),(59,25,299,'Haber','model.montoMora','MORA');

/*Table structure for table `inv_linea` */

DROP TABLE IF EXISTS `inv_linea`;

CREATE TABLE `inv_linea` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `codigo` varchar(45) NOT NULL default '',
  `nombre` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `Index_lin_codigo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `inv_linea` */

insert  into `inv_linea`(`id`,`codigo`,`nombre`) values (1,'125','MÃ¡quinas'),(2,'126','Tornillo'),(3,'127','Clavos'),(4,'001','PINTURA');

/*Table structure for table `inv_marca` */

DROP TABLE IF EXISTS `inv_marca`;

CREATE TABLE `inv_marca` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `nombre` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `inv_marca` */

insert  into `inv_marca`(`id`,`nombre`) values (1,'VITRE'),(2,'XMS'),(3,'CONDOR'),(4,'PINTUCO');

/*Table structure for table `inv_producto` */

DROP TABLE IF EXISTS `inv_producto`;

CREATE TABLE `inv_producto` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_marca` bigint(20) unsigned NOT NULL default '0',
  `id_linea` bigint(20) unsigned NOT NULL default '0',
  `codigo` varchar(45) NOT NULL default '',
  `nombre` varchar(45) NOT NULL default '',
  `precioCompra` double NOT NULL default '0',
  `precioVenta` double NOT NULL default '0',
  `stockMinimo` double NOT NULL default '0',
  `stockMaximo` double NOT NULL default '0',
  `utilidad` double NOT NULL default '0',
  `descuento` double NOT NULL default '0',
  `isFraccionable` tinyint(1) NOT NULL default '0',
  `isPesable` tinyint(1) NOT NULL default '0',
  `isAplicarSerie` tinyint(1) NOT NULL default '0',
  `unidadesCaja` int(10) unsigned NOT NULL default '0',
  `precioPromocion` double NOT NULL default '0',
  `precioMayorista` double NOT NULL default '0',
  `isCobraIva` tinyint(1) unsigned NOT NULL default '0',
  `tipo` varchar(45) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_proproducto_marca` (`id_marca`),
  KEY `FK_proproducto_linea` (`id_linea`),
  CONSTRAINT `FK_proproducto_linea` FOREIGN KEY (`id_linea`) REFERENCES `inv_linea` (`id`),
  CONSTRAINT `FK_proproducto_marca` FOREIGN KEY (`id_marca`) REFERENCES `inv_marca` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `inv_producto` */

insert  into `inv_producto`(`id`,`id_marca`,`id_linea`,`codigo`,`nombre`,`precioCompra`,`precioVenta`,`stockMinimo`,`stockMaximo`,`utilidad`,`descuento`,`isFraccionable`,`isPesable`,`isAplicarSerie`,`unidadesCaja`,`precioPromocion`,`precioMayorista`,`isCobraIva`,`tipo`) values (1,1,1,'125','Cemento',7,9,36,1220,5,10,1,1,0,0,8,7,0,'BIEN'),(2,1,2,'126','Varilla 5.2 pulgadas',20,25,300,5000,6,5,0,0,0,0,0,0,1,'BIEN'),(3,2,2,'127','Clavos 5 pulgadas',1.98,200,100,800,25,20,0,0,0,0,0,0,0,'BIEN'),(4,1,1,'128','15545',0,0,0,0,0,10,1,1,0,0,0,0,0,'BIEN'),(5,1,1,'129','fsdsfds',1,2,0,0,0,1,0,0,0,0,0,0,0,'BIEN'),(6,4,4,'001','PINTURA AMARILLA',5,7,6,20,5,1,0,0,0,6,6,6.25,1,'BIEN'),(7,2,1,'002','MARTILLO',2,5,5,20,1,1,0,0,0,12,4,3.8,1,'BIEN'),(8,1,1,'dsa','dsadsadsa',0,0,0,0,0,0,0,0,0,0,0,0,0,'BIEN'),(9,1,1,'dsa','dsadsa',30,0,0,0,0,0,0,0,0,0,0,0,0,'BIEN'),(10,1,1,'dsads','adsadsadsa',0,0,0,0,0,0,0,0,0,0,0,0,0,'BIEN');

/*Table structure for table `inv_stock_producto` */

DROP TABLE IF EXISTS `inv_stock_producto`;

CREATE TABLE `inv_stock_producto` (
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `id_producto` bigint(20) unsigned NOT NULL default '0',
  `existencia` double NOT NULL default '0',
  `minimo` double NOT NULL default '0',
  `maximo` double NOT NULL default '0',
  KEY `FK_stock_producto` (`id_producto`),
  KEY `FK_stock_local` (`id_local`),
  CONSTRAINT `FK_stock_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_stock_producto` FOREIGN KEY (`id_producto`) REFERENCES `inv_producto` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `inv_stock_producto` */

insert  into `inv_stock_producto`(`id_local`,`id_producto`,`existencia`,`minimo`,`maximo`) values (1,1,-1952,0,0),(1,3,-3894,0,0),(1,2,34,0,0),(1,4,8,0,0),(1,5,4,0,0),(2,3,1885,0,0),(2,1,0,0,0),(2,2,112,0,0),(2,4,1,0,0),(2,5,1,0,0),(3,6,2,0,0),(3,5,10,0,0),(2,7,10,0,0),(2,6,1,0,0);

/*Table structure for table `inv_transferencia` */

DROP TABLE IF EXISTS `inv_transferencia`;

CREATE TABLE `inv_transferencia` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `estado` varchar(45) NOT NULL default '',
  `observacion` varchar(250) NOT NULL default '',
  `id_local_origen` bigint(20) unsigned NOT NULL default '0',
  `id_local_destino` bigint(20) unsigned NOT NULL default '0',
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `fechaCreacion` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaRecepcion` datetime default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_inv_transferencia_local_origen` (`id_local_origen`),
  KEY `FK_inv_transferencia_local_destino` (`id_local_destino`),
  KEY `FK_inv_transferencia_usuario` (`id_usuario`),
  CONSTRAINT `FK_inv_transferencia_local_destino` FOREIGN KEY (`id_local_destino`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_inv_transferencia_local_origen` FOREIGN KEY (`id_local_origen`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_inv_transferencia_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `seg_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `inv_transferencia` */

insert  into `inv_transferencia`(`id`,`estado`,`observacion`,`id_local_origen`,`id_local_destino`,`id_usuario`,`fechaCreacion`,`fechaRecepcion`) values (1,'Enviada','ya',1,2,1,'2012-02-14 00:00:00',NULL),(2,'Receptada','',1,2,1,'2012-02-14 00:00:00','2012-02-16 12:37:10'),(3,'Enviada','',2,3,1,'2012-02-14 00:00:00',NULL),(5,'Enviada','dsads',1,2,1,'2012-02-16 00:00:00',NULL),(6,'Enviada','21',1,3,1,'2012-02-16 00:00:00',NULL),(7,'Enviada','dsa',1,3,1,'2012-02-16 00:00:00',NULL),(8,'Enviada','21',1,3,1,'2012-02-16 00:00:00',NULL),(9,'Enviada','dsadsa',1,2,1,'2012-02-16 00:00:00',NULL);

/*Table structure for table `inv_transferencia_detalle` */

DROP TABLE IF EXISTS `inv_transferencia_detalle`;

CREATE TABLE `inv_transferencia_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_transferencia` bigint(20) unsigned NOT NULL default '0',
  `id_producto` bigint(20) unsigned NOT NULL default '0',
  `cantidadEnviada` double NOT NULL default '0',
  `cantidadRecibida` double NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_inv_transferencia_detalle_transferencia` (`id_transferencia`),
  KEY `FK_inv_transferencia_detalle_producto` (`id_producto`),
  CONSTRAINT `FK_inv_transferencia_detalle_producto` FOREIGN KEY (`id_producto`) REFERENCES `inv_producto` (`id`),
  CONSTRAINT `FK_inv_transferencia_detalle_transferencia` FOREIGN KEY (`id_transferencia`) REFERENCES `inv_transferencia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `inv_transferencia_detalle` */

insert  into `inv_transferencia_detalle`(`id`,`id_transferencia`,`id_producto`,`cantidadEnviada`,`cantidadRecibida`) values (1,1,3,2000,0),(2,1,1,2000,0),(3,2,3,2000,211),(4,3,3,200,0),(8,5,1,1,0),(9,6,1,1,0),(10,7,1,1,0),(11,8,1,1,0),(12,9,1,1,0);

/*Table structure for table `seg_local` */

DROP TABLE IF EXISTS `seg_local`;

CREATE TABLE `seg_local` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `codigo` varchar(45) NOT NULL default '',
  `nombre` varchar(45) NOT NULL default '',
  `direccion` varchar(45) NOT NULL default '',
  `telefono` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `seg_local` */

insert  into `seg_local`(`id`,`codigo`,`nombre`,`direccion`,`telefono`) values (1,'001','LOCAL PRINCIPAL','BelÃ©n','072541152'),(2,'002','LOCAL BOLIVAR','BolÃ­var e Imbabura','25411500'),(3,'003','LOCAL ZAMORA','Ciudadela Zamora','2546734');

/*Table structure for table `seg_opcion` */

DROP TABLE IF EXISTS `seg_opcion`;

CREATE TABLE `seg_opcion` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `codigo` varchar(45) NOT NULL default '',
  `padre` varchar(45) NOT NULL default '',
  `modulo` varchar(100) NOT NULL default '',
  `etiqueta` varchar(45) NOT NULL default '',
  `isNuevaVentana` tinyint(1) NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `Index_opp_codigo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `seg_opcion` */

insert  into `seg_opcion`(`id`,`codigo`,`padre`,`modulo`,`etiqueta`,`isNuevaVentana`) values (1,'SEGURIDAD','','','Seguridad',0),(2,'SEGURIDAD_ROLES','SEGURIDAD','seguridad/AdministrarRoles.xul','Roles',0),(3,'SEGURIDAD_OPCIONES','SEGURIDAD','seguridad/AdministrarOpciones.xul','Opciones',0),(4,'SEGURIDAD_USUARIOS','SEGURIDAD','seguridad/AdministrarUsuarios.xul','Usuarios',0),(5,'SEGURIDAD_PARAMETROS','SEGURIDAD','seguridad/AdministrarParametros.xul','ParÃ¡metros',0),(6,'INVENTARIO','','','Inventario',0),(7,'INVENTARIO_PRODUCTOS','INVENTARIO','inventario/AdministrarProductos.xul','Productos',0),(8,'INVENTARIO_LINEAS','INVENTARIO','inventario/AdministrarLineas.xul','Lineas o Grupos',0),(9,'INVENTARIO_MARCAS','INVENTARIO','inventario/AdministrarMarcas.xul','Marcas',0),(11,'COMPRAS_PROVEEDORES','COMPRAS','compra/AdministrarProveedores.xul','Proveedores',0),(12,'VENTAS_CLIENTES','VENTAS','CLIENTE/AdministrarClientes.xul','Clientes',0),(13,'VENTAS','','','Ventas',0),(14,'VENTAS_NUEVA','VENTAS','venta/EditarFacturaVenta.xul','Ingresar Venta',1),(15,'COMPRAS','','','Compras',0),(16,'COMPRAS_NUEVA','COMPRAS','compra/EditarFacturaCompra.xul','Ingresar',1),(17,'CONTABILIDAD','','','Contabilidad',0),(18,'CONTABILIDAD_PERIODO','CONTABILIDAD','contabilidad/AdministrarPeriodosContables.xul','Periodos Contables',0),(19,'CONTABILIDAD_PLAN','CONTABILIDAD','contabilidad/AdministrarPlanes.xul','Plan de Cuentas',0),(20,'SEGURIDAD_LOCALES','SEGURIDAD','seguridad/AdministrarLocales.xul','Locales',0),(21,'COMPRAS_BUSCADOR','COMPRAS','compra/BuscadorCompra.xul','Buscador Compras',0),(22,'REPORTES','','','Reportes',0),(24,'CONTABILIDAD_CFG','CONTABILIDAD','','ConfiguraciÃ³n',0),(25,'CONTABILIDAD_CFG_TRA','CONTABILIDAD_CFG','contabilidad/AdministrarTransacciones.xul','Transacciones',0),(27,'CONTABILIDAD_LOTES','CONTABILIDAD','contabilidad/AdministrarLotesAsientos.xul','Lotes de Asientos',0),(28,'VENTAS_CFG','VENTAS','','ConfiguraciÃ³n',0),(29,'VENTAS_CFG_PUNTOS','VENTAS_CFG','venta/AdministrarPuntosFacturacion.xul','Puntos FacturaciÃ³n',0),(30,'VENTAS_CFG_AUTS','VENTAS_CFG','venta/AdministrarAutorizacionesSri.xul','Autorizaciones Sri',0),(31,'VENTAS_CFG_SEC','VENTAS_CFG','venta/AdministrarFacturaSecuenciales.xul','Secuenciales',0),(32,'VENTAS_CAJA_CERRAR','VENTAS','venta/CerrarCaja.xul','Cerrar Caja',1),(33,'VENTAS_NUEVA_PROF','VENTAS','venta/EditarProforma.xul','Ingresar Proforma',1),(35,'CONTABILIDAD_NUEVO_INGGASTO','CONTABILIDAD','contabilidad/EditarIngresoGasto.xul','Ingresos y Gastos',1),(36,'VENTAS_BUSCADOR','VENTAS','venta/BuscadorVenta.xul','Buscador Ventas',0),(37,'REPORTES_VENTAS','REPORTES','reporte/venta/RepVentas.xul','Ventas',0),(38,'REPORTES_PROFORMA','REPORTES','reporte/proforma/RepProforma.xul','Proforma',0),(39,'REPORTES_CONT','REPORTES','','Contabilidad',0),(40,'REPORTES_CONT_BAL','REPORTES_CONT','reporte/contabilidad/RepBalanceGeneral.xul','Balance',0),(41,'VENTAS_ANTICIPOS','VENTAS','venta/AdministrarAnticipos.xul','Anticipos',0),(42,'CONTABILIDAD_BANCOS','CONTABILIDAD','contabilidad/AdministrarBancos.xul','Bancos',0),(43,'CONTABILIDAD_CUENTAS','CONTABILIDAD','contabilidad/AdministrarCuentaBancaria.xul','Cuentas Bancos',0),(46,'VENTAS_TIP_CREDITO','VENTAS','venta/AdministrarTipoCredito.xul','Tipos Credito',0),(47,'REPORTES_COMPRAS','REPORTES','reporte/compra/RepCompras.xul','Compras',0),(48,'REPORTES_PROVEEDORES','REPORTES','reporte/compra/RepProveedores.xul','Proveedores',0),(49,'REPORTES_LIBRO_DIARIO','REPORTES_CONT','reporte/contabilidad/RepLibroDiario.xul','Libro Diario',0),(50,'REPORTES_CIERRE_CAJA','REPORTES','reporte/venta/RepCierreCaja.xul','Cierres de Caja',0),(51,'REPORTES_CLIENTES','REPORTES','reporte/venta/RepClientes.xul','Clientes',0),(52,'REPORTES_STOCK','REPORTES','reporte/inventario/RepStock.xul','Stock',0),(53,'CONTABILIDAD_EST_PLANES','CONTABILIDAD','contabilidad/AdministrarEstadosPlanes.xul','Estados de Planes',0),(54,'CONTABILIDAD_CFG_RET_IR','CONTABILIDAD_CFG','contabilidad/AdministrarRetencionesIR.xul','Retenciones IR',0),(55,'CONTABILIDAD_CFG_RET_IVA','CONTABILIDAD_CFG','contabilidad/AdministrarRetencionesIva.xul','Retenciones Iva',0),(56,'TRANSFERENCIAS','INVENTARIO','inventario/AdministrarTransferencias.xul','Transferencias',0),(57,'COMPRAS_PROD_PROV','COMPRAS','compra/AdministrarProductoProveedor.xul','Productos por proveedor',0),(58,'TRANSEFERENCIAS_RECEPTAR','INVENTARIO','inventario/AdministrarTransferenciasEnviadas.xul','Receptar Transferencias',0),(60,'VENTAS_COBROS','VENTAS','venta/AdministrarCobrosVenta.xul','Cobro a clientes',0);

/*Table structure for table `seg_parametro` */

DROP TABLE IF EXISTS `seg_parametro`;

CREATE TABLE `seg_parametro` (
  `codigo` varchar(45) NOT NULL default '',
  `valor` varchar(45) NOT NULL default '',
  `descripcion` varchar(255) NOT NULL default '',
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `isEditable` tinyint(3) unsigned NOT NULL default '0',
  `tipo` varchar(45) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `seg_parametro` */

insert  into `seg_parametro`(`codigo`,`valor`,`descripcion`,`id`,`isEditable`,`tipo`) values ('IVA','12','Iva actual (ej: 12)',1,0,'TIPO_SISTEMA'),('NOMBRE_EMPRESA','FerreterÃ­a SÃ¡nchez','Nombre de la empresa',2,0,'TIPO_SISTEMA'),('NOMBRE_PROPIETARIO','Adolfo SÃ¡nchez','Nombre del propietario',3,0,'TIPO_SISTEMA'),('NOMBRE_SISTEMA','JFAC XUL','Nombre del sistema',4,0,'TIPO_SISTEMA'),('PRO_VALIDEZ','7','DuraciÃ³n',5,0,'TIPO_SISTEMA'),('RUC_PROPIETARIO','110202020202','Ruc del propietario',6,0,'TIPO_SISTEMA'),('TIPO_AGENTE_RETENCION','TIPO_AGENTE_RETENCION_SOCIEDAD','Tipo de agente de retencion de la empresaSe debe poner el codigo de otro parÃ¡metro queempiece por TIPO_AGENTE_RETENCION_',9,0,'TIPO_SISTEMA'),('TIPO_AGENTE_RETENCION_ENTIDADES','Entidades y Organizmos','ENTIDADES Y ORGANISMOS DEL SECTOR PÃšBLICO  Y EMPRESAS PÃšBLICAS',10,1,'TIPO_AGENTE_RETENCION'),('TIPO_AGENTE_RETENCION_CONTRIBUYENTES','Contribuyentes especiales','CONTRIBUYENTES ESPECIALES',11,1,'TIPO_AGENTE_RETENCION'),('TIPO_AGENTE_RETENCION_SOCIEDAD','Sociedad y Persona Natural(ObligadaContabilid','SOCIEDAD Y PERSONA NATURAL OBLIGADA A LLEVAR CONTABILIDAD',12,1,'TIPO_AGENTE_RETENCION'),('TIPO_AGENTE_RETENCION_CONTRATANTE','Contratatacion Servicios ConstruciÃ³n','CONTRATANTE DE SERVICIOS DE CONSTRUCCIÃ“N',13,1,'TIPO_AGENTE_RETENCION'),('TIPO_AGENTE_RETENCION_COMPSEGUROS','CompaÃ±ias de seguros','COMPAÃ‘ÃAS DE SEGUROS Y REASEGUROS',14,1,'TIPO_AGENTE_RETENCION'),('TIPO_AGENTE_RETENCION_EXPORTADORES','Exportadores','EXPORTADORES (UNICAMENTE EN LA ADQUISICIÃ“N DE BIENES QUE SE EXPORTEN, O EN LA COMPRA DE BIENES O SERVICIOS PARA LA FABRICACIÃ“N Y COMERCIALIZACIÃ“N DEL BIEN EXPORTADO)',15,1,'TIPO_AGENTE_RETENCION'),('TIPO_AGENTE_RETENCION_NINGUNO','--Ninguno--','Cuando la empresa no pertenece a ning',16,1,'TIPO_AGENTE_RETENCION'),('TIPO_PROVEEDOR_ENTIDADES','Entidades y Organismos','ENTIDADES Y ORGANISMOS DEL SECTOR PÃšBLICO Y EMPRESAS PÃšBLICAS',17,1,'TIPO_PROVEEDOR'),('TIPO_PROVEEDOR_CONTRIBUYENTES','Contribuyentes especiales','CONTRIBUYENTES ESPECIALES',18,1,'TIPO_PROVEEDOR'),('TIPO_PROVEEDOR_SOCIEDADES','Sociedades','SOCIEDADES',19,1,'TIPO_PROVEEDOR'),('TIPO_PROVEEDOR_OBLIGADA','Obligado llevar contabilidad','OBLIGADA A LLEVAR CONTABILIDAD',20,1,'TIPO_PROVEEDOR'),('TIPO_PROVEEDOR_EMITE','Emite factura o nota venta','EMITE FACTURA O NOTA DE VENTA',21,1,'TIPO_PROVEEDOR'),('TIPO_PROVEEDOR_EMT_LIQ_COMP','Emite liquidacion compras','SE EMITE LIQUIDACIÃ“N DE COMPRAS DE BIENES O ADQUISICIÃ“N DE SERVICIOS (INCLUYE PAGOS POR ARRENDAMIENTO AL EXTERIOR)',22,1,'TIPO_PROVEEDOR'),('TIPO_PROVEEDOR_PROFESIONALES','Profesionales','PROFESIONALES',23,1,'TIPO_PROVEEDOR'),('TIPO_PROVEEDOR_ARRENDAMIENTO','Arrendamiento bienes inmuebles','POR  ARRENDAMIENTO DE BIENES INMUEBLES PROPIOS',24,1,'TIPO_PROVEEDOR'),('FAC_CONTRIBUYENTE','OBLIGADO A LLEVAR CONTABILIDAD','Texto que debe salir en los documento',25,0,'TIPO_SISTEMA'),('DIRECCION_EMPRESA','Las Pitas: Av. Pablo...','Dirección matriz de la empresa',26,0,'TIPO_SISTEMA'),('','','',27,0,'');

/*Table structure for table `seg_rol` */

DROP TABLE IF EXISTS `seg_rol`;

CREATE TABLE `seg_rol` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `nombre` varchar(45) NOT NULL default '',
  `descripcion` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `Index_rol_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `seg_rol` */

insert  into `seg_rol`(`id`,`nombre`,`descripcion`) values (1,'admin','administrador del sistema'),(2,'vendedor','Vendedor en caja');

/*Table structure for table `seg_rol_opcion` */

DROP TABLE IF EXISTS `seg_rol_opcion`;

CREATE TABLE `seg_rol_opcion` (
  `id_rol` bigint(20) unsigned NOT NULL auto_increment,
  `id_opcion` bigint(20) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id_rol`,`id_opcion`),
  KEY `FK_seg_rolopcion_opcion` (`id_opcion`),
  CONSTRAINT `FK_seg_rolopcion_opcion` FOREIGN KEY (`id_opcion`) REFERENCES `seg_opcion` (`id`),
  CONSTRAINT `FK_seg_rolopcion_rol` FOREIGN KEY (`id_rol`) REFERENCES `seg_rol` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `seg_rol_opcion` */

insert  into `seg_rol_opcion`(`id_rol`,`id_opcion`) values (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,11),(1,12),(1,13),(2,13),(1,14),(2,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(1,22),(2,22),(1,24),(1,25),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,33),(1,35),(1,36),(1,37),(1,38),(1,39),(1,40),(1,41),(1,42),(1,43),(1,46),(1,47),(1,48),(1,49),(1,50),(2,50),(1,51),(2,51),(1,52),(1,53),(1,54),(1,55),(1,56),(2,56),(1,57),(1,58),(2,58),(1,60);

/*Table structure for table `seg_rol_usuario` */

DROP TABLE IF EXISTS `seg_rol_usuario`;

CREATE TABLE `seg_rol_usuario` (
  `id_rol` bigint(20) unsigned NOT NULL auto_increment,
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id_rol`,`id_usuario`),
  KEY `FK_seg_rolusuario_usuario` (`id_usuario`),
  CONSTRAINT `FK_seg_rolusuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `seg_rol` (`id`),
  CONSTRAINT `FK_seg_rolusuario_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `seg_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `seg_rol_usuario` */

insert  into `seg_rol_usuario`(`id_rol`,`id_usuario`) values (1,1),(2,2),(1,21);

/*Table structure for table `seg_usuario` */

DROP TABLE IF EXISTS `seg_usuario`;

CREATE TABLE `seg_usuario` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_punto` bigint(20) unsigned default NULL,
  `cedula` varchar(45) character set latin1 NOT NULL default '',
  `login` varchar(45) character set latin1 NOT NULL default '',
  `clave` varchar(45) character set latin1 NOT NULL default '',
  `nombres` varchar(45) character set latin1 NOT NULL default '',
  `apellidos` varchar(45) character set latin1 NOT NULL default '',
  `isActivo` tinyint(1) NOT NULL default '0',
  `id_local` bigint(20) unsigned default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `Index_usu_cedula` (`cedula`),
  UNIQUE KEY `Index_usu_login` (`login`),
  KEY `FK_seg_usuario_punto_facturacion` (`id_punto`),
  KEY `FK_seg_usuario_local` (`id_local`),
  CONSTRAINT `FK_seg_usuario_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_seg_usuario_punto_facturacion` FOREIGN KEY (`id_punto`) REFERENCES `ven_punto_facturacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `seg_usuario` */

insert  into `seg_usuario`(`id`,`id_punto`,`cedula`,`login`,`clave`,`nombres`,`apellidos`,`isActivo`,`id_local`) values (1,1,'1104285604','administrador','administrador','admin','admin',1,2),(2,NULL,'1103181796','dannym','dannym','Danny','MuÃ±oz',1,1),(21,5,'1105166068','isaac','isaac','Isaac','Ponce',1,3);

/*Table structure for table `ven_anticipo` */

DROP TABLE IF EXISTS `ven_anticipo`;

CREATE TABLE `ven_anticipo` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_cliente` bigint(20) unsigned NOT NULL default '0',
  `monto` double NOT NULL default '0' COMMENT 'valor del anticipo',
  `descripcion` varchar(255) collate utf8_spanish_ci NOT NULL default '',
  `formaPago` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `estado` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `fecha` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT 'fechaRegistro',
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `saldo` double NOT NULL default '0',
  `fechaEmision` datetime default NULL COMMENT 'cheque, crece diario,transferencia',
  `fechaVencimiento` datetime default NULL COMMENT 'cheque, crece diario,transferencia',
  `id_banco` bigint(20) unsigned default NULL COMMENT 'cheque, crece diario,transferencia',
  `numeroReferencia` varchar(45) collate utf8_spanish_ci default NULL COMMENT 'cheque, crece diario,transferencia',
  `numeroCuenta` varchar(45) collate utf8_spanish_ci default NULL COMMENT 'cheque, crece diario,transferencia',
  `id_lote` bigint(20) unsigned default NULL,
  `id_cuenta` bigint(20) unsigned default NULL,
  `id_lote_devuelve` bigint(20) unsigned default NULL,
  `montoDevuelve` double NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_ven_anticipo_cliente` (`id_cliente`),
  KEY `FK_ven_anticipo_usuario` (`id_usuario`),
  KEY `FK_ven_anticipo_local` (`id_local`),
  KEY `FK_ven_anticipo_banco` (`id_banco`),
  KEY `FK_ven_anticipo_lote` (`id_lote`),
  KEY `FK_ven_anticipo_cuenta` (`id_cuenta`),
  KEY `FK_ven_anticipo_lote_dev` (`id_lote_devuelve`),
  CONSTRAINT `FK_ven_anticipo_banco` FOREIGN KEY (`id_banco`) REFERENCES `cont_banco` (`id`),
  CONSTRAINT `FK_ven_anticipo_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `ven_cliente` (`id`),
  CONSTRAINT `FK_ven_anticipo_cuenta` FOREIGN KEY (`id_cuenta`) REFERENCES `cont_banco_cuenta` (`id`),
  CONSTRAINT `FK_ven_anticipo_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_ven_anticipo_lote` FOREIGN KEY (`id_lote`) REFERENCES `ven_lote_caja` (`id`),
  CONSTRAINT `FK_ven_anticipo_lote_dev` FOREIGN KEY (`id_lote_devuelve`) REFERENCES `ven_lote_caja` (`id`),
  CONSTRAINT `FK_ven_anticipo_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `seg_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='InnoDB free: 7168 kB; (`id_lote`) REFER `xulfac/ven_lote_caj';

/*Data for the table `ven_anticipo` */

insert  into `ven_anticipo`(`id`,`id_cliente`,`monto`,`descripcion`,`formaPago`,`estado`,`fecha`,`id_usuario`,`id_local`,`saldo`,`fechaEmision`,`fechaVencimiento`,`id_banco`,`numeroReferencia`,`numeroCuenta`,`id_lote`,`id_cuenta`,`id_lote_devuelve`,`montoDevuelve`) values (1,3,10,'PRUEBA ATICIPO EN EFECTIVO','Efectivo','Devuelto','2012-02-11 07:19:13',1,2,0,NULL,NULL,NULL,NULL,NULL,21,NULL,21,10),(2,1,100,'PRUEBA TRANSACCION CHEQUE','Cheque','Pendiente','2012-02-11 07:21:59',1,2,100,'2012-02-11 00:00:00','2012-02-29 00:00:00',2,'1','11011033',21,NULL,NULL,0),(8,2,100,'PRUEBA DE ANTICIPO TRANSFERENCIA','Transferencia','Anulado','2012-02-11 07:48:58',1,2,100,'2012-02-11 00:00:00','2012-02-11 00:00:00',1,'3','1212121212',21,2,21,0),(12,1,70,'dffgdfdf','Deposito','Devuelto','2012-02-11 08:07:40',1,2,0,'2012-02-11 00:00:00','2012-02-29 00:00:00',1,'4','12312323',21,2,21,70),(13,3,20,'23dwec','Transferencia','Pendiente','2012-02-11 09:25:53',1,2,10,'2012-02-11 00:00:00','2012-02-29 00:00:00',2,'5','31231231234',21,5,NULL,0),(14,2,20,'dsa','Efectivo','Devuelto','2012-02-15 01:41:50',1,2,0,NULL,NULL,NULL,NULL,NULL,21,NULL,21,20);

/*Table structure for table `ven_autorizacion_sri` */

DROP TABLE IF EXISTS `ven_autorizacion_sri`;

CREATE TABLE `ven_autorizacion_sri` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `numero` varchar(45) NOT NULL default '',
  `estado` varchar(45) NOT NULL default '',
  `fechaInicio` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaFin` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_autorizacion_sri` */

insert  into `ven_autorizacion_sri`(`id`,`numero`,`estado`,`fechaInicio`,`fechaFin`) values (3,'ds','Activo','2011-04-17 00:00:00','2011-12-31 00:00:00'),(4,'1102','Activo','2012-02-09 00:00:00','2013-01-09 00:00:00'),(6,'prueba','Activo','2012-01-01 00:00:00','2013-01-01 00:00:00');

/*Table structure for table `ven_cliente` */

DROP TABLE IF EXISTS `ven_cliente`;

CREATE TABLE `ven_cliente` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `cedula` varchar(45) NOT NULL default '',
  `nombres` varchar(45) NOT NULL default '',
  `apellidos` varchar(45) NOT NULL default '',
  `direccion` varchar(45) NOT NULL default '',
  `telefono` varchar(45) NOT NULL default '',
  `celular` varchar(45) NOT NULL default '',
  `fax` varchar(45) NOT NULL default '',
  `mail` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `Index_cli_cedula` (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_cliente` */

insert  into `ven_cliente`(`id`,`cedula`,`nombres`,`apellidos`,`direccion`,`telefono`,`celular`,`fax`,`mail`) values (1,'1104285604','danny','muñoz','loja','2541152','','',''),(2,'1103181796','gladys','munoz','loja','2541152','1112','',''),(3,'1900555515','FRANCISCO','CARPIO','DANIEL ALVAREZ','2546758','098765432','','FRANCISCO@HOTMAIL.COM');

/*Table structure for table `ven_cobro` */

DROP TABLE IF EXISTS `ven_cobro`;

CREATE TABLE `ven_cobro` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_venta` bigint(20) unsigned NOT NULL,
  `total` double NOT NULL,
  `totalEfectivo` double NOT NULL,
  `totalCheques` double NOT NULL,
  `totalAnticipos` double NOT NULL,
  `totalCreditoDiferido` double NOT NULL,
  `totalCreditoCorriente` double NOT NULL,
  `sobranteAnticipos` double NOT NULL,
  `devolverSobranteAnticipos` tinyint(1) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_ven_cobro_venta` (`id_venta`),
  CONSTRAINT `FK_ven_cobro_venta` FOREIGN KEY (`id_venta`) REFERENCES `ven_fac_venta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_cobro` */

insert  into `ven_cobro`(`id`,`id_venta`,`total`,`totalEfectivo`,`totalCheques`,`totalAnticipos`,`totalCreditoDiferido`,`totalCreditoCorriente`,`sobranteAnticipos`,`devolverSobranteAnticipos`) values (2,18,48.6,0,0,0,48.6,0,0,1),(3,19,320,0,0,0,320,0,0,1),(4,20,160,0,0,0,0,160,0,1),(5,21,160,0,0,0,160,0,0,1),(6,24,160,160,0,0,0,0,0,1);

/*Table structure for table `ven_cobro_cuota` */

DROP TABLE IF EXISTS `ven_cobro_cuota`;

CREATE TABLE `ven_cobro_cuota` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_cliente` bigint(20) unsigned NOT NULL default '0',
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `id_banco` bigint(20) unsigned default NULL COMMENT 'cheque, crece diario,transferencia',
  `id_lote` bigint(20) unsigned default NULL,
  `id_cuenta` bigint(20) unsigned default NULL,
  `montoTotal` double NOT NULL default '0' COMMENT 'valor del anticipo',
  `formaPago` varchar(45) character set utf8 collate utf8_spanish_ci NOT NULL,
  `fecha` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT 'fechaRegistro',
  `fechaEmision` datetime default NULL COMMENT 'cheque, crece diario,transferencia',
  `fechaVencimiento` datetime default NULL COMMENT 'cheque, crece diario,transferencia',
  `numeroReferencia` varchar(45) character set utf8 collate utf8_spanish_ci default NULL COMMENT 'cheque, crece diario,transferencia',
  `numeroCuenta` varchar(45) character set utf8 collate utf8_spanish_ci default NULL COMMENT 'cheque, crece diario,transferencia',
  `id_cobro_item` bigint(20) unsigned NOT NULL,
  `montoReal` double NOT NULL,
  `montoMora` double NOT NULL,
  `montoInteres` double NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_ven_cobro_cuota_item` (`id_cobro_item`),
  KEY `FK_ven_cobro_cuota_cliente` (`id_cliente`),
  KEY `FK_ven_cobro_cuota_usuario` (`id_usuario`),
  KEY `FK_ven_cobro_cuota_local` (`id_local`),
  KEY `FK_ven_cobro_cuota_banco` (`id_banco`),
  KEY `FK_ven_cobro_cuota_lote` (`id_lote`),
  KEY `FK_ven_cobro_cuota_cuenta` (`id_cuenta`),
  CONSTRAINT `FK_ven_cobro_cuota_banco` FOREIGN KEY (`id_banco`) REFERENCES `cont_banco` (`id`),
  CONSTRAINT `FK_ven_cobro_cuota_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `ven_cliente` (`id`),
  CONSTRAINT `FK_ven_cobro_cuota_cuenta` FOREIGN KEY (`id_cuenta`) REFERENCES `cont_banco_cuenta` (`id`),
  CONSTRAINT `FK_ven_cobro_cuota_item` FOREIGN KEY (`id_cobro_item`) REFERENCES `ven_cobro_detalle` (`id`),
  CONSTRAINT `FK_ven_cobro_cuota_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_ven_cobro_cuota_lote` FOREIGN KEY (`id_lote`) REFERENCES `ven_lote_caja` (`id`),
  CONSTRAINT `FK_ven_cobro_cuota_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `seg_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_cobro_cuota` */

insert  into `ven_cobro_cuota`(`id`,`id_cliente`,`id_usuario`,`id_local`,`id_banco`,`id_lote`,`id_cuenta`,`montoTotal`,`formaPago`,`fecha`,`fechaEmision`,`fechaVencimiento`,`numeroReferencia`,`numeroCuenta`,`id_cobro_item`,`montoReal`,`montoMora`,`montoInteres`) values (1,2,1,2,NULL,21,NULL,18.63,'EFECTIVO','2012-02-17 00:00:00',NULL,NULL,NULL,NULL,2,0,0,0),(2,2,1,2,NULL,21,NULL,18.63,'EFECTIVO','2012-02-17 00:00:00',NULL,NULL,NULL,NULL,2,0,0,0),(3,2,1,2,NULL,21,NULL,18.63,'EFECTIVO','2012-02-17 00:00:00',NULL,NULL,NULL,NULL,2,0,0,0),(4,2,1,2,NULL,21,NULL,122.67,'EFECTIVO','2012-02-17 00:00:00',NULL,NULL,NULL,NULL,3,106.67,0,16),(5,2,1,2,NULL,21,NULL,122.67,'EFECTIVO','2012-02-17 00:00:00',NULL,NULL,NULL,NULL,3,106.67,0,16),(6,2,1,2,NULL,21,NULL,122.67,'EFECTIVO','2012-02-17 00:00:00',NULL,NULL,NULL,NULL,3,106.67,0,16),(10,2,1,2,NULL,21,NULL,20,'EFECTIVO','2012-02-17 00:00:00',NULL,NULL,NULL,NULL,4,20,0,0),(11,2,1,2,NULL,21,NULL,40,'EFECTIVO','2012-02-18 00:00:00',NULL,NULL,NULL,NULL,4,40,0,0);

/*Table structure for table `ven_cobro_detalle` */

DROP TABLE IF EXISTS `ven_cobro_detalle`;

CREATE TABLE `ven_cobro_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_cobro` bigint(20) unsigned NOT NULL,
  `formaPago` varchar(45) NOT NULL,
  `monto` double NOT NULL,
  `saldo` double NOT NULL,
  `id_documento` bigint(20) unsigned NOT NULL,
  `fecha` datetime default NULL,
  `porcentajeInteres` double NOT NULL,
  `porcentajeMora` double NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_ven_cobro_detalle_cobro` (`id_cobro`),
  CONSTRAINT `FK_ven_cobro_detalle_cobro` FOREIGN KEY (`id_cobro`) REFERENCES `ven_cobro` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_cobro_detalle` */

insert  into `ven_cobro_detalle`(`id`,`id_cobro`,`formaPago`,`monto`,`saldo`,`id_documento`,`fecha`,`porcentajeInteres`,`porcentajeMora`) values (2,2,'CREDITO_DIFERIDO',48.6,-7.29,0,'2012-05-17 00:00:00',5,6),(3,3,'CREDITO_DIFERIDO',320,-0.0100000000000051,0,'2012-05-17 00:00:00',5,6),(4,4,'CREDITO_CORRIENTE',160,100,0,'2012-03-17 00:00:00',0,0),(5,5,'CREDITO_DIFERIDO',160,160,0,'2012-05-18 00:00:00',5,6),(6,6,'EFECTIVO',160,0,0,'2012-02-18 00:00:00',0,0);

/*Table structure for table `ven_cuota` */

DROP TABLE IF EXISTS `ven_cuota`;

CREATE TABLE `ven_cuota` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_cobro_item` bigint(20) unsigned NOT NULL,
  `monto` double NOT NULL,
  `fecha` datetime NOT NULL,
  `numeroCuota` int(10) unsigned NOT NULL,
  `estado` varchar(45) default NULL,
  `montoPagar` double default NULL,
  `tipo` varchar(45) NOT NULL,
  `interes` double NOT NULL,
  `mora` double NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_ven_cuota_item_cuota` USING BTREE (`id_cobro_item`),
  CONSTRAINT `FK_ven_cuota_item` FOREIGN KEY (`id_cobro_item`) REFERENCES `ven_cobro_detalle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_cuota` */

insert  into `ven_cuota`(`id`,`id_cobro_item`,`monto`,`fecha`,`numeroCuota`,`estado`,`montoPagar`,`tipo`,`interes`,`mora`) values (1,2,18.63,'2012-03-17 00:00:00',1,'Finalizada',0,'MENSUAL',2.43,0),(2,2,18.63,'2012-04-17 00:00:00',2,'Finalizada',18.63,'MENSUAL',2.43,0),(3,2,18.63,'2012-05-17 00:00:00',3,'Finalizada',18.63,'MENSUAL',2.43,0),(4,3,106.67,'2012-03-17 00:00:00',1,'Finalizada',122.67,'MENSUAL',16,0),(5,3,106.67,'2012-04-17 00:00:00',2,'Finalizada',122.67,'MENSUAL',16,0),(6,3,106.67,'2012-05-17 00:00:00',3,'Finalizada',122.67,'MENSUAL',16,0),(7,5,53.33,'2012-03-18 00:00:00',1,'Registrada',61.33,'MENSUAL',8,0),(8,5,53.33,'2012-04-18 00:00:00',2,'Registrada',61.33,'MENSUAL',8,0),(9,5,53.33,'2012-05-18 00:00:00',3,'Registrada',61.33,'MENSUAL',8,0);

/*Table structure for table `ven_fac_venta` */

DROP TABLE IF EXISTS `ven_fac_venta`;

CREATE TABLE `ven_fac_venta` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_cliente` bigint(20) unsigned NOT NULL default '0',
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `id_periodo` bigint(20) unsigned NOT NULL default '0',
  `fechaEmision` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaCaducidad` datetime NOT NULL default '0000-00-00 00:00:00',
  `numeroFactura` varchar(45) NOT NULL default '',
  `subtotal` double NOT NULL default '0',
  `sobrecargo` double NOT NULL default '0',
  `iva` double NOT NULL default '0',
  `descuento` double NOT NULL default '0',
  `total` double NOT NULL default '0',
  `id_punto` bigint(20) unsigned default NULL,
  `id_lote` bigint(20) unsigned default NULL,
  `ivaPorcentaje` double NOT NULL default '0',
  `estado` varchar(45) NOT NULL default '',
  `formaPago` varchar(45) NOT NULL default '',
  `id_aut_sri` bigint(20) unsigned default NULL,
  `isImpresa` tinyint(4) default '0',
  `fechaInicio` datetime NOT NULL default '0000-00-00 00:00:00',
  `tipoDocumento` varchar(45) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_facventa_cliente` (`id_cliente`),
  KEY `FK_facventa_usuario` (`id_usuario`),
  KEY `FK_facventa_local` (`id_local`),
  KEY `FK_facventa_periodo` (`id_periodo`),
  KEY `FK_ven_fac_venta_punto` (`id_punto`),
  KEY `FK_ven_fac_venta_lote` (`id_lote`),
  KEY `FK_ven_fac_venta_aut` (`id_aut_sri`),
  CONSTRAINT `FK_facventa_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `ven_cliente` (`id`),
  CONSTRAINT `FK_facventa_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_facventa_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `cont_periodo_contable` (`id`),
  CONSTRAINT `FK_facventa_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `seg_usuario` (`id`),
  CONSTRAINT `FK_ven_fac_venta_aut` FOREIGN KEY (`id_aut_sri`) REFERENCES `ven_autorizacion_sri` (`id`),
  CONSTRAINT `FK_ven_fac_venta_lote` FOREIGN KEY (`id_lote`) REFERENCES `ven_lote_caja` (`id`),
  CONSTRAINT `FK_ven_fac_venta_punto` FOREIGN KEY (`id_punto`) REFERENCES `ven_punto_facturacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='InnoDB free: 7168 kB; (`id_cobro`) REFER `xulfac/ven_cobro`(';

/*Data for the table `ven_fac_venta` */

insert  into `ven_fac_venta`(`id`,`id_cliente`,`id_usuario`,`id_local`,`id_periodo`,`fechaEmision`,`fechaCaducidad`,`numeroFactura`,`subtotal`,`sobrecargo`,`iva`,`descuento`,`total`,`id_punto`,`id_lote`,`ivaPorcentaje`,`estado`,`formaPago`,`id_aut_sri`,`isImpresa`,`fechaInicio`,`tipoDocumento`) values (4,3,1,2,3,'2012-02-12 00:00:00','2013-01-09 00:00:00','001-001-0000102',160,0,0,40,160,1,21,12,'Anulada','Contado',4,0,'2012-02-09 00:00:00',''),(5,2,1,2,3,'2012-02-16 00:00:00','2013-01-09 00:00:00','001-001-0000103',8.1,0,0,0.9,8.1,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(6,2,1,2,3,'2012-02-16 00:00:00','2013-01-09 00:00:00','001-001-0000104',31.85,0,3,2.15,34.85,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(7,2,1,2,3,'2012-02-16 00:00:00','2013-01-09 00:00:00','001-001-0000105',8.1,0,0,0.9,8.1,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(8,1,1,2,3,'2012-02-16 00:00:00','2013-01-09 00:00:00','001-001-0000106',8.1,0,0,0.9,8.1,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(9,1,1,2,3,'2012-02-16 00:00:00','2013-01-09 00:00:00','001-001-0000107',8.1,0,0,0.9,8.1,1,21,12,'Anulada','Contado',4,0,'2012-02-09 00:00:00','1'),(10,2,1,2,3,'2012-02-16 00:00:00','2013-01-09 00:00:00','001-001-0000108',1600,0,0,400,1600,1,21,12,'Anulada','Contado',4,0,'2012-02-09 00:00:00','1'),(11,3,1,2,3,'2012-02-16 00:00:00','2013-01-09 00:00:00','001-001-0000109',31.85,0,3,2.15,34.85,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(12,2,1,2,3,'2012-02-17 00:00:00','2013-01-09 00:00:00','001-001-0000110',8.1,0,0,0.9,8.1,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(13,1,1,2,3,'2012-02-17 00:00:00','2013-01-09 00:00:00','001-001-0000111',160,0,0,40,160,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(15,2,1,2,3,'2012-02-17 00:00:00','2013-01-09 00:00:00','001-001-0000112',81,0,0,9,81,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(16,2,1,2,3,'2012-02-17 00:00:00','2013-01-09 00:00:00','001-001-0000113',1600,0,0,400,1600,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(18,2,1,2,3,'2012-02-17 00:00:00','2013-01-09 00:00:00','001-001-0000114',48.6,0,0,5.4,48.6,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(19,2,1,2,3,'2012-02-17 00:00:00','2013-01-09 00:00:00','001-001-0000115',320,0,0,80,320,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(20,2,1,2,3,'2012-02-17 00:00:00','2013-01-09 00:00:00','001-001-0000116',160,0,0,40,160,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(21,2,1,2,3,'2012-02-18 00:00:00','2013-01-09 00:00:00','001-001-0000117',160,0,0,40,160,1,21,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1'),(22,2,1,2,3,'2012-02-18 00:00:00','2013-01-09 00:00:00','001-001-0000118',160,0,0,40,160,1,23,12,'Anulada','Contado',4,0,'2012-02-09 00:00:00','1'),(23,2,1,2,3,'2012-02-18 00:00:00','2013-01-09 00:00:00','001-001-0000119',160,0,0,40,160,1,23,12,'Anulada','Contado',4,0,'2012-02-09 00:00:00','1'),(24,2,1,2,3,'2012-02-18 00:00:00','2013-01-09 00:00:00','001-001-0000120',160,0,0,40,160,1,23,12,'Finalizada','Contado',4,0,'2012-02-09 00:00:00','1');

/*Table structure for table `ven_fac_venta_detalle` */

DROP TABLE IF EXISTS `ven_fac_venta_detalle`;

CREATE TABLE `ven_fac_venta_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_producto` bigint(20) unsigned NOT NULL default '0',
  `id_facventa` bigint(20) unsigned NOT NULL default '0',
  `cantidad` double NOT NULL default '0',
  `costo` double NOT NULL default '0',
  `descuento` double NOT NULL default '0',
  `subtotal` double NOT NULL default '0',
  `tipoPrecio` varchar(45) NOT NULL default '',
  `iva` double default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_facventa_detalle_producto` (`id_producto`),
  KEY `FK_ven_fac_venta_detalle_facventa` (`id_facventa`),
  CONSTRAINT `FK_facventa_detalle_producto` FOREIGN KEY (`id_producto`) REFERENCES `inv_producto` (`id`),
  CONSTRAINT `FK_ven_fac_venta_detalle_facventa` FOREIGN KEY (`id_facventa`) REFERENCES `ven_fac_venta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='InnoDB free: 7168 kB; (`id_facventa`) REFER `xulfac/ven_fac_';

/*Data for the table `ven_fac_venta_detalle` */

insert  into `ven_fac_venta_detalle`(`id`,`id_producto`,`id_facventa`,`cantidad`,`costo`,`descuento`,`subtotal`,`tipoPrecio`,`iva`) values (4,3,4,1,200,40,160,'venta',0),(5,1,5,1,9,0.9,8.1,'venta',0),(6,1,6,1,9,0.9,8.1,'venta',0),(7,2,6,1,25,1.25,23.75,'venta',3),(8,1,7,1,9,0.9,8.1,'venta',0),(9,1,8,1,9,0.9,8.1,'venta',0),(10,1,9,1,9,0.9,8.1,'venta',0),(11,3,10,10,200,400,1600,'venta',0),(12,1,11,1,9,0.9,8.1,'venta',0),(13,2,11,1,25,1.25,23.75,'venta',3),(14,1,12,1,9,0.9,8.1,'venta',0),(15,3,13,1,200,40,160,'venta',0),(17,1,15,10,9,9,81,'venta',0),(18,3,16,10,200,400,1600,'venta',0),(20,1,18,6,9,5.4,48.6,'venta',0),(21,3,19,2,200,80,320,'venta',0),(22,3,20,1,200,40,160,'venta',0),(23,3,21,1,200,40,160,'venta',0),(24,3,22,1,200,40,160,'venta',0),(25,3,23,1,200,40,160,'venta',0),(26,3,24,1,200,40,160,'venta',0);

/*Table structure for table `ven_lote_caja` */

DROP TABLE IF EXISTS `ven_lote_caja`;

CREATE TABLE `ven_lote_caja` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `id_punto` bigint(20) unsigned NOT NULL default '0',
  `estado` varchar(45) NOT NULL default '',
  `valorApertura` double NOT NULL default '0',
  `valorCierre` double NOT NULL default '0',
  `valorReal` double NOT NULL default '0',
  `observacion` varchar(250) NOT NULL default '',
  `fechaApertura` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaCierre` datetime default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_lote_caja` */

insert  into `ven_lote_caja`(`id`,`id_usuario`,`id_punto`,`estado`,`valorApertura`,`valorCierre`,`valorReal`,`observacion`,`fechaApertura`,`fechaCierre`) values (1,1,1,'Cerrada',25,0,0,'','2011-04-17 00:00:00','2011-04-17 00:00:00'),(4,1,4,'Cerrada',0,0,0,'','2011-04-17 00:00:00','2011-04-17 00:00:00'),(5,1,4,'Abierta',54,0,0,'','2011-04-18 00:00:00','2011-04-18 00:00:00'),(6,0,0,'Abierta',1,447.82,0,'','2011-04-18 00:00:00','2011-04-18 00:00:00'),(7,0,0,'Abierta',12,12,0,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(8,0,0,'Abierta',1,1,0,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(9,0,0,'Abierta',0,0,0,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(10,0,0,'Abierta',0,0,0,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(11,0,0,'Abierta',5,25,0,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(12,0,0,'Abierta',5,-1,0,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(13,0,0,'Abierta',1,1,0,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(14,0,0,'Abierta',1,1,0,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(15,0,0,'Abierta',1,1,0,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(16,0,0,'Abierta',0,0,0,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(17,0,0,'Cerrada',0,3,3,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(18,1,1,'Cerrada',1,1,3,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(19,1,1,'Cerrada',0,0,0,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(20,0,0,'Cerrada',1,1,332,'','2011-05-01 00:00:00','2011-05-01 00:00:00'),(21,1,1,'Cerrada',20,513.9,514,'','2011-05-15 00:00:00','2011-05-15 00:00:00'),(22,21,5,'Abierta',10,0,0,'','2012-02-10 06:45:33','2012-02-10 06:45:33'),(23,1,1,'Abierta',12,0,0,'','2012-02-18 11:44:28','2012-02-18 11:44:28');

/*Table structure for table `ven_lote_caja_item` */

DROP TABLE IF EXISTS `ven_lote_caja_item`;

CREATE TABLE `ven_lote_caja_item` (
  `id` bigint(20) NOT NULL auto_increment,
  `tipo` varchar(45) collate utf8_spanish_ci NOT NULL,
  `valor` double NOT NULL,
  `documento` bigint(20) NOT NULL,
  `id_lote` bigint(20) NOT NULL,
  `descripcion` varchar(80) collate utf8_spanish_ci NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `ven_lote_caja_item` */

insert  into `ven_lote_caja_item`(`id`,`tipo`,`valor`,`documento`,`id_lote`,`descripcion`) values (1,'INGRESO',10,14,21,'Ingreso ADICIONAL'),(2,'SALIDA',10,15,21,'Gasto ADICIONAL'),(3,'INGRESO',20,16,21,'Ingreso ADICIONAL'),(4,'INGRESO',20,23,21,'Ingreso ADICIONAL'),(5,'SALIDA',10,1,21,'DevoluciÃ³n en efectivo de anticipo'),(6,'SALIDA',20,14,21,'DevoluciÃ³n en efectivo de anticipo'),(7,'INGRESO',18.63,1,21,'Cobro de cuota en efectivo a cliente'),(8,'INGRESO',18.63,2,21,'Cobro de cuota en efectivo a cliente'),(9,'INGRESO',18.63,3,21,'Cobro de cuota en efectivo a cliente'),(10,'INGRESO',122.67,4,21,'Cobro de cuota en efectivo a cliente'),(11,'INGRESO',122.67,5,21,'Cobro de cuota en efectivo a cliente'),(12,'INGRESO',122.67,6,21,'Cobro de cuota en efectivo a cliente'),(13,'INGRESO',20,10,21,'Cobro de cuota en efectivo a cliente'),(14,'INGRESO',40,11,21,'Cobro de cuota en efectivo a cliente');

/*Table structure for table `ven_proforma` */

DROP TABLE IF EXISTS `ven_proforma`;

CREATE TABLE `ven_proforma` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_cliente` bigint(20) unsigned NOT NULL default '0',
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `fecha` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaVencimiento` datetime NOT NULL default '0000-00-00 00:00:00',
  `nota` varchar(250) NOT NULL default '',
  `subtotal` double NOT NULL default '0',
  `iva` double NOT NULL default '0',
  `total` double NOT NULL default '0',
  `estado` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_proforma` */

insert  into `ven_proforma`(`id`,`id_cliente`,`id_usuario`,`id_local`,`fecha`,`fechaVencimiento`,`nota`,`subtotal`,`iva`,`total`,`estado`) values (1,1,1,1,'2011-05-01 00:00:00','2011-05-01 00:00:00','',34,4.08,38.08,'Registrada'),(2,1,1,1,'2011-05-01 00:00:00','2011-05-01 00:00:00','',0,0,0,'Registrada'),(3,1,1,1,'2011-05-01 00:00:00','2011-05-01 00:00:00','',9,1.08,10.08,'Registrada'),(4,2,1,1,'2011-11-22 00:00:00','2011-11-22 00:00:00','',9,1.08,10.08,'Registrada'),(5,3,1,2,'2012-02-07 00:00:00','2012-02-14 00:00:00','',200,24,224,'Registrada'),(6,3,1,2,'2012-02-08 00:00:00','2012-02-15 00:00:00','',225,27,252,'Registrada'),(7,2,1,2,'2012-02-09 00:00:00','2012-02-16 00:00:00','',0,0,0,'Registrada');

/*Table structure for table `ven_proforma_detalle` */

DROP TABLE IF EXISTS `ven_proforma_detalle`;

CREATE TABLE `ven_proforma_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_proforma` bigint(20) unsigned NOT NULL default '0',
  `id_producto` bigint(20) unsigned NOT NULL default '0',
  `cantidad` double NOT NULL default '0',
  `valorUnitario` double NOT NULL default '0',
  `valorTotal` double NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_proformadetalle_proforma` (`id_proforma`),
  CONSTRAINT `FK_proformadetalle_proforma` FOREIGN KEY (`id_proforma`) REFERENCES `ven_proforma` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_proforma_detalle` */

insert  into `ven_proforma_detalle`(`id`,`id_proforma`,`id_producto`,`cantidad`,`valorUnitario`,`valorTotal`) values (1,3,1,1,9,9),(2,6,5,1,0,0),(3,6,3,1,200,200),(4,6,2,1,25,25),(5,7,5,1,0,0);

/*Table structure for table `ven_punto_facturacion` */

DROP TABLE IF EXISTS `ven_punto_facturacion`;

CREATE TABLE `ven_punto_facturacion` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `codigo` varchar(45) NOT NULL default '',
  `nombre` varchar(100) NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_punto_facturacion` */

insert  into `ven_punto_facturacion`(`id`,`id_local`,`codigo`,`nombre`) values (1,2,'001-001','Punto 001'),(3,1,'001-002','Punto 002'),(4,1,'000-000','Punto 003'),(5,3,'001-003','Punto 004');

/*Table structure for table `ven_secuencial` */

DROP TABLE IF EXISTS `ven_secuencial`;

CREATE TABLE `ven_secuencial` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_punto` bigint(20) unsigned NOT NULL default '0',
  `id_autorizacion` bigint(20) unsigned NOT NULL default '0',
  `desde` double NOT NULL default '0',
  `hasta` double NOT NULL default '0',
  `secuencial` double NOT NULL default '0',
  `tipoDocumento` varchar(45) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_ven_secuencial_punto` (`id_punto`),
  KEY `FK_ven_secuencial_autorizacion` (`id_autorizacion`),
  CONSTRAINT `FK_ven_secuencial_autorizacion` FOREIGN KEY (`id_autorizacion`) REFERENCES `ven_autorizacion_sri` (`id`),
  CONSTRAINT `FK_ven_secuencial_punto` FOREIGN KEY (`id_punto`) REFERENCES `ven_punto_facturacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_secuencial` */

insert  into `ven_secuencial`(`id`,`id_punto`,`id_autorizacion`,`desde`,`hasta`,`secuencial`,`tipoDocumento`) values (1,1,4,1,100,101,'1'),(2,3,3,101,200,101,'1'),(3,4,3,201,300,201,'1'),(4,1,4,101,200,121,'1'),(11,5,6,1,20,1,'1'),(12,1,4,1,1000,10,'7');

/*Table structure for table `ven_tipo_credito` */

DROP TABLE IF EXISTS `ven_tipo_credito`;

CREATE TABLE `ven_tipo_credito` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `descripcion` varchar(45) NOT NULL default '',
  `tipo` varchar(45) NOT NULL default '',
  `numeroCuotas` int(11) NOT NULL default '0',
  `interes` double NOT NULL default '0',
  `mora` double NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_tipo_credito` */

insert  into `ven_tipo_credito`(`id`,`descripcion`,`tipo`,`numeroCuotas`,`interes`,`mora`) values (1,'Tres meses','MENSUAL',3,5,6),(2,'Cinco quincenas','QUINCENAL',5,3,3),(3,'Diez semanas','SEMANAL',10,6,7),(4,'Un mes diario','DIARIO',30,2,0);

/*Table structure for table `vista_cierres_caja` */

DROP TABLE IF EXISTS `vista_cierres_caja`;

/*!50001 DROP VIEW IF EXISTS `vista_cierres_caja` */;
/*!50001 DROP TABLE IF EXISTS `vista_cierres_caja` */;

/*!50001 CREATE TABLE `vista_cierres_caja` (
  `id` bigint(20) unsigned NOT NULL default '0',
  `id_punto` bigint(20) unsigned NOT NULL default '0',
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `fechaApertura` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaCierre` datetime default NULL,
  `estado` varchar(45) NOT NULL default '',
  `valorApertura` double NOT NULL default '0',
  `valorCierre` double NOT NULL default '0',
  `valorReal` double NOT NULL default '0',
  `observacion` varchar(250) NOT NULL default '',
  `punto` varchar(148) NOT NULL default '',
  `usuario` varchar(45) NOT NULL default ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1 */;

/*Table structure for table `vista_compras` */

DROP TABLE IF EXISTS `vista_compras`;

/*!50001 DROP VIEW IF EXISTS `vista_compras` */;
/*!50001 DROP TABLE IF EXISTS `vista_compras` */;

/*!50001 CREATE TABLE `vista_compras` (
  `id` bigint(20) unsigned NOT NULL default '0',
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `id_proveedor` bigint(20) unsigned NOT NULL default '0',
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `numeroFactura` varchar(45) NOT NULL default '',
  `numeroAutorizacion` varchar(45) NOT NULL default '',
  `fechaEmision` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaRegistro` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaCaducidad` datetime NOT NULL default '0000-00-00 00:00:00',
  `estado` varchar(45) NOT NULL default '',
  `subtotal` double NOT NULL default '0',
  `total` double NOT NULL default '0',
  `proveedor` varchar(45) NOT NULL default '',
  `local` varchar(45) NOT NULL default '',
  `usuario` varchar(45) NOT NULL default ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1 */;

/*Table structure for table `vista_menu` */

DROP TABLE IF EXISTS `vista_menu`;

/*!50001 DROP VIEW IF EXISTS `vista_menu` */;
/*!50001 DROP TABLE IF EXISTS `vista_menu` */;

/*!50001 CREATE TABLE `vista_menu` (
  `ID_USUARIO` bigint(20) unsigned NOT NULL default '0',
  `ID_OPCION` bigint(20) unsigned NOT NULL default '0',
  `LOGIN` varchar(45) NOT NULL default '',
  `CODIGO` varchar(45) NOT NULL default '',
  `PADRE` varchar(45) NOT NULL default '',
  `MODULO` varchar(100) NOT NULL default '',
  `ETIQUETA` varchar(45) NOT NULL default '',
  `IS_NUEVA_VENTANA` tinyint(1) NOT NULL default '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 */;

/*Table structure for table `vista_proformas` */

DROP TABLE IF EXISTS `vista_proformas`;

/*!50001 DROP VIEW IF EXISTS `vista_proformas` */;
/*!50001 DROP TABLE IF EXISTS `vista_proformas` */;

/*!50001 CREATE TABLE `vista_proformas` (
  `id` bigint(20) unsigned NOT NULL default '0',
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `id_cliente` bigint(20) unsigned NOT NULL default '0',
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `fecha` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaVencimiento` datetime NOT NULL default '0000-00-00 00:00:00',
  `estado` varchar(45) NOT NULL default '',
  `iva` double NOT NULL default '0',
  `subtotal` double NOT NULL default '0',
  `total` double NOT NULL default '0',
  `cliente` varchar(91) NOT NULL default '',
  `local` varchar(93) NOT NULL default '',
  `usuario` varchar(45) NOT NULL default ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1 */;

/*Table structure for table `vista_secuencial` */

DROP TABLE IF EXISTS `vista_secuencial`;

/*!50001 DROP VIEW IF EXISTS `vista_secuencial` */;
/*!50001 DROP TABLE IF EXISTS `vista_secuencial` */;

/*!50001 CREATE TABLE `vista_secuencial` (
  `id` bigint(20) unsigned NOT NULL default '0',
  `id_punto` bigint(20) unsigned NOT NULL default '0',
  `id_autorizacion` bigint(20) unsigned NOT NULL default '0',
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `desde` double NOT NULL default '0',
  `hasta` double NOT NULL default '0',
  `secuencial` double NOT NULL default '0',
  `tipoDocumento` varchar(45) NOT NULL default ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1 */;

/*Table structure for table `vista_stock_producto` */

DROP TABLE IF EXISTS `vista_stock_producto`;

/*!50001 DROP VIEW IF EXISTS `vista_stock_producto` */;
/*!50001 DROP TABLE IF EXISTS `vista_stock_producto` */;

/*!50001 CREATE TABLE `vista_stock_producto` (
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `id_producto` bigint(20) unsigned NOT NULL default '0',
  `existencia` double NOT NULL default '0',
  `minimo` double NOT NULL default '0',
  `maximo` double NOT NULL default '0',
  `codigo` varchar(45) NOT NULL default '',
  `nombre` varchar(45) NOT NULL default '',
  `precioCompra` double NOT NULL default '0',
  `precioVenta` double NOT NULL default '0',
  `precioPromocion` double NOT NULL default '0',
  `precioMayorista` double NOT NULL default '0',
  `isCobraIva` varchar(2) character set utf8 NOT NULL default ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1 */;

/*Table structure for table `vista_ventas` */

DROP TABLE IF EXISTS `vista_ventas`;

/*!50001 DROP VIEW IF EXISTS `vista_ventas` */;
/*!50001 DROP TABLE IF EXISTS `vista_ventas` */;

/*!50001 CREATE TABLE `vista_ventas` (
  `id` bigint(20) unsigned NOT NULL default '0',
  `id_local` bigint(20) unsigned NOT NULL default '0',
  `id_cliente` bigint(20) unsigned NOT NULL default '0',
  `id_usuario` bigint(20) unsigned NOT NULL default '0',
  `id_periodo` bigint(20) unsigned NOT NULL default '0',
  `numeroFactura` varchar(45) NOT NULL default '',
  `fechaEmision` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaInicio` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaCaducidad` datetime NOT NULL default '0000-00-00 00:00:00',
  `estado` varchar(45) NOT NULL default '',
  `iva` double NOT NULL default '0',
  `descuento` double NOT NULL default '0',
  `sobrecargo` double NOT NULL default '0',
  `subtotal` double NOT NULL default '0',
  `total` double NOT NULL default '0',
  `cliente` varchar(91) NOT NULL default '',
  `local` varchar(93) NOT NULL default '',
  `usuario` varchar(45) NOT NULL default ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1 */;

/*View structure for view vista_cierres_caja */

/*!50001 DROP TABLE IF EXISTS `vista_cierres_caja` */;
/*!50001 DROP VIEW IF EXISTS `vista_cierres_caja` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_cierres_caja` AS (select `f`.`id` AS `id`,`f`.`id_punto` AS `id_punto`,`f`.`id_usuario` AS `id_usuario`,`f`.`fechaApertura` AS `fechaApertura`,`f`.`fechaCierre` AS `fechaCierre`,`f`.`estado` AS `estado`,`f`.`valorApertura` AS `valorApertura`,`f`.`valorCierre` AS `valorCierre`,`f`.`valorReal` AS `valorReal`,`f`.`observacion` AS `observacion`,concat(`l`.`codigo`,_latin1' - ',`l`.`nombre`) AS `punto`,`u`.`login` AS `usuario` from ((`ven_lote_caja` `f` join `ven_punto_facturacion` `l`) join `seg_usuario` `u`) where ((`f`.`id_punto` = `l`.`id`) and (`f`.`id_usuario` = `u`.`id`))) */;

/*View structure for view vista_compras */

/*!50001 DROP TABLE IF EXISTS `vista_compras` */;
/*!50001 DROP VIEW IF EXISTS `vista_compras` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_compras` AS (select `f`.`id` AS `id`,`f`.`id_local` AS `id_local`,`f`.`id_proveedor` AS `id_proveedor`,`f`.`id_usuario` AS `id_usuario`,`f`.`numeroFactura` AS `numeroFactura`,`f`.`numeroAutorizacion` AS `numeroAutorizacion`,`f`.`fechaEmision` AS `fechaEmision`,`f`.`fechaRegistro` AS `fechaRegistro`,`f`.`fechaCaducidad` AS `fechaCaducidad`,`f`.`estado` AS `estado`,`f`.`subtotal` AS `subtotal`,`f`.`total` AS `total`,`p`.`razonSocial` AS `proveedor`,`l`.`nombre` AS `local`,`u`.`login` AS `usuario` from (((`com_fac_compra` `f` join `com_proveedor` `p`) join `seg_local` `l`) join `seg_usuario` `u`) where ((`f`.`id_proveedor` = `p`.`id`) and (`f`.`id_local` = `l`.`id`) and (`f`.`id_usuario` = `u`.`id`))) */;

/*View structure for view vista_menu */

/*!50001 DROP TABLE IF EXISTS `vista_menu` */;
/*!50001 DROP VIEW IF EXISTS `vista_menu` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vista_menu` AS select `seg_usuario`.`id` AS `ID_USUARIO`,`seg_opcion`.`id` AS `ID_OPCION`,`seg_usuario`.`login` AS `LOGIN`,`seg_opcion`.`codigo` AS `CODIGO`,`seg_opcion`.`padre` AS `PADRE`,`seg_opcion`.`modulo` AS `MODULO`,`seg_opcion`.`etiqueta` AS `ETIQUETA`,`seg_opcion`.`isNuevaVentana` AS `IS_NUEVA_VENTANA` from ((((`seg_opcion` join `seg_usuario`) join `seg_rol`) join `seg_rol_opcion`) join `seg_rol_usuario`) where ((`seg_opcion`.`id` = `seg_rol_opcion`.`id_opcion`) and (`seg_rol_usuario`.`id_rol` = `seg_rol_opcion`.`id_rol`) and (`seg_rol_usuario`.`id_usuario` = `seg_usuario`.`id`)) */;

/*View structure for view vista_proformas */

/*!50001 DROP TABLE IF EXISTS `vista_proformas` */;
/*!50001 DROP VIEW IF EXISTS `vista_proformas` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_proformas` AS (select `f`.`id` AS `id`,`f`.`id_local` AS `id_local`,`f`.`id_cliente` AS `id_cliente`,`f`.`id_usuario` AS `id_usuario`,`f`.`fecha` AS `fecha`,`f`.`fechaVencimiento` AS `fechaVencimiento`,`f`.`estado` AS `estado`,`f`.`iva` AS `iva`,`f`.`subtotal` AS `subtotal`,`f`.`total` AS `total`,concat(`c`.`nombres`,_latin1' ',`c`.`apellidos`) AS `cliente`,concat(`l`.`codigo`,_latin1' - ',`l`.`nombre`) AS `local`,`u`.`login` AS `usuario` from (((`ven_proforma` `f` join `ven_cliente` `c`) join `seg_local` `l`) join `seg_usuario` `u`) where ((`f`.`id_cliente` = `c`.`id`) and (`f`.`id_local` = `l`.`id`) and (`f`.`id_usuario` = `u`.`id`))) */;

/*View structure for view vista_secuencial */

/*!50001 DROP TABLE IF EXISTS `vista_secuencial` */;
/*!50001 DROP VIEW IF EXISTS `vista_secuencial` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vista_secuencial` AS select sql_no_cache `s`.`id` AS `id`,`s`.`id_punto` AS `id_punto`,`s`.`id_autorizacion` AS `id_autorizacion`,`us`.`id` AS `id_usuario`,`s`.`desde` AS `desde`,`s`.`hasta` AS `hasta`,`s`.`secuencial` AS `secuencial`,`s`.`tipoDocumento` AS `tipoDocumento` from (((`ven_secuencial` `s` join `ven_autorizacion_sri` `a`) join `ven_punto_facturacion` `p`) join `seg_usuario` `us`) where ((`s`.`id_punto` = `p`.`id`) and (`s`.`id_autorizacion` = `a`.`id`) and (`us`.`id_punto` = `p`.`id`) and (`s`.`desde` <= `s`.`hasta`) and (`s`.`secuencial` < `s`.`hasta`) and (`a`.`estado` = _latin1'Activo') and (curdate() >= `a`.`fechaInicio`) and (curdate() <= `a`.`fechaFin`)) */;

/*View structure for view vista_stock_producto */

/*!50001 DROP TABLE IF EXISTS `vista_stock_producto` */;
/*!50001 DROP VIEW IF EXISTS `vista_stock_producto` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vista_stock_producto` AS (select `s`.`id_local` AS `id_local`,`s`.`id_producto` AS `id_producto`,`s`.`existencia` AS `existencia`,`s`.`minimo` AS `minimo`,`s`.`maximo` AS `maximo`,`p`.`codigo` AS `codigo`,`p`.`nombre` AS `nombre`,`p`.`precioCompra` AS `precioCompra`,`p`.`precioVenta` AS `precioVenta`,`p`.`precioPromocion` AS `precioPromocion`,`p`.`precioMayorista` AS `precioMayorista`,if((`p`.`isCobraIva` = 1),_utf8'SI',_utf8'NO') AS `isCobraIva` from (`inv_producto` `p` join `inv_stock_producto` `s`) where (`p`.`id` = `s`.`id_producto`)) */;

/*View structure for view vista_ventas */

/*!50001 DROP TABLE IF EXISTS `vista_ventas` */;
/*!50001 DROP VIEW IF EXISTS `vista_ventas` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_ventas` AS (select `f`.`id` AS `id`,`f`.`id_local` AS `id_local`,`f`.`id_cliente` AS `id_cliente`,`f`.`id_usuario` AS `id_usuario`,`f`.`id_periodo` AS `id_periodo`,`f`.`numeroFactura` AS `numeroFactura`,`f`.`fechaEmision` AS `fechaEmision`,`f`.`fechaInicio` AS `fechaInicio`,`f`.`fechaCaducidad` AS `fechaCaducidad`,`f`.`estado` AS `estado`,`f`.`iva` AS `iva`,`f`.`descuento` AS `descuento`,`f`.`sobrecargo` AS `sobrecargo`,`f`.`subtotal` AS `subtotal`,`f`.`total` AS `total`,concat(`c`.`nombres`,_latin1' ',`c`.`apellidos`) AS `cliente`,concat(`l`.`codigo`,_latin1' - ',`l`.`nombre`) AS `local`,`u`.`login` AS `usuario` from (((`ven_fac_venta` `f` join `ven_cliente` `c`) join `seg_local` `l`) join `seg_usuario` `u`) where ((`f`.`id_cliente` = `c`.`id`) and (`f`.`id_local` = `l`.`id`) and (`f`.`id_usuario` = `u`.`id`))) */;

/* Procedure structure for procedure `sp_factura` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_factura` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_factura`()
BEGIN
 END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
