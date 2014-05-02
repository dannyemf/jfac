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

insert  into `com_fac_compra`(`id`,`id_proveedor`,`id_usuario`,`id_local`,`id_periodo`,`fechaEmision`,`fechaRegistro`,`fechaCaducidad`,`numeroFactura`,`numeroAutorizacion`,`subtotal`,`sobrecargo`,`iva`,`descuento`,`total`,`estado`) values (1,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(2,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(3,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(4,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Contabilizada'),(5,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(6,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(7,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(8,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(9,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(10,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(11,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Contabilizada'),(12,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(13,1,1,1,1,'2011-01-17 00:00:00','2011-02-19 00:00:00','2011-01-17 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(14,1,1,1,1,'2011-02-01 00:00:00','2011-02-01 00:00:00','2011-02-01 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(15,1,1,1,1,'2011-02-01 00:00:00','2011-02-01 00:00:00','2011-02-01 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(16,1,1,1,1,'2011-02-01 00:00:00','2011-02-01 00:00:00','2011-02-01 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(17,1,1,1,1,'2011-02-01 00:00:00','2011-02-01 00:00:00','2011-02-01 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(18,1,1,1,1,'2011-02-03 00:00:00','2011-02-03 00:00:00','2011-02-03 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(19,1,1,1,NULL,'2011-03-15 00:00:00','2011-03-15 00:00:00','2011-03-15 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(20,1,1,1,NULL,'2011-03-15 00:00:00','2011-03-15 00:00:00','2011-03-15 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(21,1,1,1,NULL,'2011-03-15 00:00:00','2011-03-15 00:00:00','2011-03-15 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(22,1,1,1,NULL,'2011-03-15 00:00:00','2011-03-15 00:00:00','2011-03-15 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(23,1,1,1,NULL,'2011-03-16 00:00:00','2011-03-16 00:00:00','2011-03-16 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(24,1,1,1,NULL,'2011-03-20 00:00:00','2011-03-20 00:00:00','2011-03-20 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(25,1,1,1,NULL,'2011-03-27 00:00:00','2011-03-27 00:00:00','2011-03-27 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(26,1,1,1,NULL,'2011-03-27 00:00:00','2011-03-27 00:00:00','2011-03-27 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(27,1,1,1,NULL,'2011-03-27 00:00:00','2011-03-27 00:00:00','2011-03-27 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(28,1,1,1,NULL,'2011-03-27 00:00:00','2011-03-27 00:00:00','2011-03-27 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(29,1,1,1,NULL,'2011-03-27 00:00:00','2011-03-27 00:00:00','2011-03-27 00:00:00','000-000-0000000','',0,0,0,0,0,'Registrada'),(30,1,1,1,NULL,'2011-03-27 00:00:00','2011-03-27 00:00:00','2011-03-27 00:00:00','000-000-0000012','',0,0,0,0,0,'Registrada'),(31,1,1,1,NULL,'2013-04-01 00:00:00','2013-04-01 00:00:00','2015-05-28 00:00:00','000-000-0011111','',27,1,3.24,2,29.24,'Registrada'),(32,1,1,1,NULL,'2011-05-04 00:00:00','2011-05-04 00:00:00','2011-05-04 00:00:00','000-000-9898989','',5,0,0.6,0,5.6,'Registrada'),(33,1,1,1,NULL,'2011-05-04 00:00:00','2011-05-04 00:00:00','2011-05-04 00:00:00','000-000-7878788','',20,0,2.4,0,22.4,'Registrada'),(34,1,1,1,NULL,'2011-05-04 00:00:00','2011-05-04 00:00:00','2011-05-04 00:00:00','000-000-5555555','',7,0,0.84,0,7.84,'Registrada'),(35,2,1,1,NULL,'2011-06-04 00:00:00','2011-06-06 00:00:00','2011-06-05 00:00:00','000-000-3333333','',61,0,6.1,0,67.1,'Registradas'),(36,1,1,1,NULL,'2011-08-25 00:00:00','2011-08-25 00:00:00','2011-08-25 00:00:00','000-000-0032323','32',21.98,0,0,0,21.98,'Registrada'),(37,1,1,1,NULL,'2011-08-25 00:00:00','2011-08-25 00:00:00','2011-08-25 00:00:00','000-000-0212111','sad',1.98,0,0,0,1.98,'Registrada'),(38,1,1,1,NULL,'2011-08-25 00:00:00','2011-08-25 00:00:00','2011-08-25 00:00:00','000-000-2212133','',1.98,0,0,0,1.98,'Registrada'),(39,1,1,1,NULL,'2011-08-25 00:00:00','2011-08-25 00:00:00','2011-08-25 00:00:00','000-000-0211111','32',8.98,0,0,0,8.98,'Registrada'),(40,1,1,1,NULL,'2011-08-25 00:00:00','2011-08-25 00:00:00','2011-08-25 00:00:00','000-000-2133333','2',1.98,0,0,0,1.98,'Registrada');

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

insert  into `com_fac_compra_detalle`(`id`,`id_producto`,`id_faccompra`,`cantidad`,`costo`,`descuento`,`subtotal`,`iva`,`descuentoPorcentaje`) values (1,3,2,1,200,196,4,28,0),(2,4,3,1,0,0,0,0,0),(3,3,3,1,200,196,4,28,0),(4,2,4,1,25,0.75,24.25,27.25,0),(5,3,5,1,200,196,4,28,0),(6,3,6,1,200,196,4,28,0),(7,2,7,1,25,0.75,24.25,27.25,0),(8,3,8,1,200,196,4,28,0),(9,1,9,1,52,1.04,50.96,57.2,0),(10,2,10,1,25,0.75,24.25,27.25,0),(11,2,11,1,25,0.75,24.25,27.25,0),(12,3,11,1,200,196,4,28,0),(13,2,12,1,25,0.75,24.25,27.25,0),(14,2,13,1,25,0.75,24.25,27.25,0),(15,1,14,100,52,1.04,5198.96,5205.2,0),(16,1,15,1,52,1.04,50.96,57.2,0),(17,1,16,1,52,1.04,50.96,57.2,0),(18,1,17,1,52,1.04,50.96,57.2,0),(19,1,18,100,52,1.04,5198.96,5205.2,0),(20,3,18,102,200,196,20204,20228,0),(21,2,19,1,20,2,18,20.4,0),(22,2,20,1,20,2,18,20.4,0),(23,2,21,1,20,2,18,20.4,0),(24,2,22,1,20,2,18,20.4,0),(25,3,23,1,5,0,5,0,0),(26,1,23,1,7,0,7,0,0),(27,5,23,1,0,0,0,0,0),(28,3,24,1,5,0,5,0,0),(29,2,25,1,20,0,22.4,2.4,0),(30,1,26,1,7,0,7.84,0.84,0),(31,3,27,1,5,0,5.6,0.6,0),(32,1,28,1,7,0,7.84,0.84,0),(33,3,29,1,5,0,5.6,0.6,0),(34,1,30,1,7,0,7.84,0.84,0),(35,2,30,1,20,0,22.4,2.4,0),(36,2,31,1,20,0,22.4,2.4,0),(39,1,31,1,7,0,7.84,0.84,0),(40,4,31,1,0,0,0,0,0),(41,5,31,1,0,0,0,0,0),(42,3,32,1,5,0,5.6,0.6,0),(43,2,33,1,20,0,22.4,2.4,0),(44,1,34,1,7,0,7.84,0.84,0),(45,2,35,2,20,0,44.8,4.8,0),(46,1,35,3,7,0,23.52,2.52,0);

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
  `retencionIva` double NOT NULL default '0',
  `retencionFuente` double NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `Index_prov_identificacion` (`identificacion`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `com_proveedor` */

insert  into `com_proveedor`(`id`,`tipoIdentificacion`,`identificacion`,`razonSocial`,`provincia`,`ciudad`,`direccion`,`contacto`,`telefono`,`fax`,`celular`,`mail`,`tipoProveedor`,`retencionIva`,`retencionFuente`) values (1,'','1104285604','Comercial Tomas','loja','loja','loja','loja','s/n','','','','',0,0),(2,'','112221321','sadsadsa','','','','','','','','','',0,0);

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

insert  into `cont_asiento`(`id`,`id_lote`,`documento`,`origen`,`descripcion`,`id_plan`,`tipo`,`monto`,`fecha`,`id_periodo`,`id_local`) values (1,1,'29','anticipo','Anticipo de clientes',125,'Haber',3,'2011-07-07 00:00:00',1,1),(2,1,'29','anticipo','Anticipo de clientes',5,'Debe',3,'2011-07-07 00:00:00',1,1);

/*Table structure for table `cont_banco` */

DROP TABLE IF EXISTS `cont_banco`;

CREATE TABLE `cont_banco` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `nombre` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `descripcion` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `estado` tinyint(3) unsigned NOT NULL default '0',
  `codigo` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `utilizaEmpresa` tinyint(3) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `cont_banco` */

insert  into `cont_banco`(`id`,`nombre`,`descripcion`,`estado`,`codigo`,`utilizaEmpresa`) values (1,'bANCO DE LOJA','Banco de loja',1,'BAN_LOJA',1),(2,'Banco de Guaayquil','asdsa',1,'ban_guayas',0);

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

insert  into `cont_banco_cuenta`(`id`,`id_banco`,`numero`,`tipo`,`id_plan`) values (1,1,'110425660055','Corriente',1),(2,1,'2900332655','Corriente',1);

/*Table structure for table `cont_cheque` */

DROP TABLE IF EXISTS `cont_cheque`;

CREATE TABLE `cont_cheque` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_cuenta` bigint(20) unsigned default NULL,
  `id_banco` bigint(20) unsigned default NULL,
  `numero` varchar(45) NOT NULL,
  `fechaEmision` datetime NOT NULL,
  `monto` double NOT NULL,
  `fechaVencimieto` datetime NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_cont_cheque_cuenta` (`id_cuenta`),
  KEY `FK_cont_cheque_banco` (`id_banco`),
  CONSTRAINT `FK_cont_cheque_banco` FOREIGN KEY (`id_banco`) REFERENCES `cont_banco` (`id`),
  CONSTRAINT `FK_cont_cheque_cuenta` FOREIGN KEY (`id_cuenta`) REFERENCES `cont_banco_cuenta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_cheque` */

/*Table structure for table `cont_ingreso_gasto` */

DROP TABLE IF EXISTS `cont_ingreso_gasto`;

CREATE TABLE `cont_ingreso_gasto` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `descripcion` varchar(255) collate utf8_spanish_ci NOT NULL default '',
  `tipo` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `valor` double NOT NULL default '0',
  `fechaRegistro` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  `id_lote` varchar(45) collate utf8_spanish_ci NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `cont_ingreso_gasto` */

insert  into `cont_ingreso_gasto`(`id`,`descripcion`,`tipo`,`valor`,`fechaRegistro`,`id_lote`) values (8,'x','Ingreso',0,'2011-05-01','6'),(9,'dgfgfg','Ingreso',-1,'2011-05-01','6'),(10,'dd','Gasto',3,'2011-05-01','6'),(11,'pago adelantado','Ingreso',20,'2011-05-01','11'),(12,'3','Gasto',3,'2011-05-01','12'),(13,'nuevo','Ingreso',3,'2011-05-01','17');

/*Table structure for table `cont_lote_asientos` */

DROP TABLE IF EXISTS `cont_lote_asientos`;

CREATE TABLE `cont_lote_asientos` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_periodo` bigint(20) unsigned NOT NULL default '0',
  `descripcion` varchar(100) NOT NULL default '',
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

insert  into `cont_lote_asientos`(`id`,`id_periodo`,`descripcion`,`estado`,`fecha`,`id_local`) values (1,1,'Lote Generado automÃ¡ticamante -  Contabilizar anticipo','Contabilizado','2011-07-07 00:00:00',1);

/*Table structure for table `cont_periodo_contable` */

DROP TABLE IF EXISTS `cont_periodo_contable`;

CREATE TABLE `cont_periodo_contable` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `nombre` varchar(45) NOT NULL default '',
  `fechaInicial` datetime NOT NULL default '0000-00-00 00:00:00',
  `fechaFinal` datetime NOT NULL default '0000-00-00 00:00:00',
  `estado` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `Index_per_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_periodo_contable` */

insert  into `cont_periodo_contable`(`id`,`nombre`,`fechaInicial`,`fechaFinal`,`estado`) values (1,'Periodo2011','2011-01-01 00:00:00','2011-12-01 00:00:00','ACTIVO'),(2,'Periodo2012','2011-04-12 00:00:00','2011-04-12 00:00:00','INACTIVO');

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

insert  into `cont_plan`(`id`,`id_padre`,`codigo`,`nombre`,`tipo`,`movimiento`) values (1,NULL,'1','ACTIVOS','Activo',0),(2,1,'1.1','ACTIVO CORRIENTE','Activo',0),(3,2,'1.1.01','ACTIVO DISPONIBLE','Activo',0),(4,3,'1.1.01.01','CAJA DIARIA','Activo',1),(5,3,'1.1.01.02','CAJA CHICA','Activo',1),(6,3,'1.1.01.03','BANCOS','Activo',0),(7,6,'1.1.01.03.01','BANCO LOJA CTA. CTE. 0000000000','Activo',1),(8,6,'1.1.01.03.02','BANCO DE GUAYAQUIL CTA. CTE. 0000000000','Activo',1),(9,2,'1.1.02','ACTIVO EXIGIBLE','Activo',0),(10,9,'1.1.02.01','CUENTAS POR COBRAR','Activo',0),(11,10,'1.1.02.01.01','CUENTAS POR COBRAR CLIENTES','Activo',1),(12,10,'1.1.02.01.02','CUENTAS POR COBRAR SOCIOS','Activo',1),(13,10,'1.1.02.01.03','CUENTAS POR COBRAR EMPLEADOS','Activo',1),(14,10,'1.1.02.01.04','CUENTAS POR COBRAR OTROS','Activo',1),(15,10,'1.1.02.01.05','(-) PROVISION DE CUENTAS INCOBRABLES','Activo',1),(16,10,'1.1.02.01.06','CREDITO TRIBUTARIO IVA','Activo',1),(17,10,'1.1.02.01.07','CUENTAS POR COBRAR COMISIÓN  POR CHEQUES DEVU','Activo',1),(18,9,'1.1.02.02','IVA COMPRAS','Activo',0),(19,18,'1.1.02.02.01','IVA COMPRAS BIENES','Activo',1),(20,18,'1.1.02.02.02','IVA COMPRAS SERVICIOS','Activo',1),(21,18,'1.1.02.02.03','IVA COMPRAS ACTIVOS FIJOS','Activo',1),(22,2,'1.1.03','ACTIVO REALIZABLE','Activo',0),(23,22,'1.1.03.01','INVENTARIOS','Activo',0),(24,23,'1.1.03.01.01','INVENTARIO DE MERCADERIAS','Activo',1),(25,2,'1.1.04','PAGOS ANTICIPADOS','Activo',0),(26,25,'1.1.04.01','ANTICIPO SUELDOS A EMPLEADOS','Activo',1),(27,25,'1.1.04.02','ANTICIPOS A TERCEROS','Activo',1),(28,25,'1.1.04.03','ANTICIPOS DE IMPUESTOS','Activo',0),(29,28,'1.1.04.03.01','RETENCION IVA VENTAS','Activo',1),(30,28,'1.1.04.03.02','RETENCION IMPUESTO A LA RENTA EN VENTAS','Activo',1),(31,28,'1.1.04.03.03','TIMBRES SECTOR PÚBLICO','Activo',1),(32,25,'1.1.04.04','ANTICIPO PROVEEDORES','Activo',1),(33,2,'1.1.05','NOTAS DE CRÉDITO','Activo',0),(34,33,'1.1.05.01','NOTAS DE CRÉDITO POR DEVOLUCIÓN DE MERCADERÍA','Activo',1),(35,33,'1.1.05.02','NOTAS DE CRÉDITO POR APORTES IESS','Activo',1),(36,33,'1.1.05.03','OTRAS NOTAS DE CRÉDITO','Activo',1),(37,1,'1.2','ACTIVO NO CORRIENTE','Activo',0),(38,37,'1.2.01','ACTIVO FIJO','Activo',0),(39,38,'1.2.01.01','EQUIPO DE OFICINA','Activo',1),(40,38,'1.2.01.02','(-) DEPR. ACUM. DE EQUIPO DE OFICINA','Activo',1),(41,38,'1.2.01.03','MUEBLES Y ENSERES','Activo',1),(42,38,'1.2.01.04','(-) DEPR. ACUM. DE MUEBLES Y ENSERES','Activo',1),(43,38,'1.2.01.05','MAQUINARIA Y EQUIPO','Activo',1),(44,38,'1.2.01.06','(-) DEPR. ACUM. DE MAQUINARIA Y EQUIPO','Activo',1),(45,38,'1.2.01.07','EQUIPO DE COMPUTACION Y SOFTWARE','Activo',1),(46,38,'1.2.01.08','(-) DEPR. ACUM. EQUIPO DE COMPUTACION','Activo',1),(47,38,'1.2.01.09','EDIFICIOS E INSTALACIONES','Activo',1),(48,38,'1.2.01.10','(-) DEPR. ACUM. DE EDIFICOS E INSTALACIONES','Activo',1),(49,38,'1.2.01.11','VEHICULOS','Activo',1),(50,38,'1.2.01.12','(-) DEP. ACUM. VEHICULOS','Activo',1),(51,37,'1.2.02','INVERSIONES','Activo',0),(52,51,'1.2.02.01','INVERSIONES TEMPORALES','Activo',1),(53,51,'1.2.02.02','INVERSIÓN URBANIZACIÓN','Activo',1),(54,37,'1.2.03','OTROS ACTIVOS','Activo',0),(55,54,'1.2.03.01','OTROS ACTIVOS','Activo',1),(56,54,'1.2.03.02','CHEQUES POSTFECHADOS','Activo',1),(57,54,'1.2.03.03','CHEQUES DEVUELTOS','Activo',1),(58,54,'1.2.03.04','DEPÓSITO DE TERCEROS','Activo',1),(59,NULL,'2','PASIVO','Pasivo',0),(60,59,'2.1','PASIVO CORRIENTE','Pasivo',0),(61,60,'2.1.01','CUENTAS POR PAGAR','Pasivo',0),(62,61,'2.1.01.01','CUENTAS POR PAGAR PROVEEDORES NACIONALES','Pasivo',0),(63,62,'2.1.01.01.01','PROVEEDOR DE PRUEBA UNO','Pasivo',1),(64,62,'2.1.01.01.02','PROVEEDOR DE PRUEBA DOS','Pasivo',1),(65,62,'2.1.01.01.03','PROVEEDOR DE PRUEBA TRES ','Pasivo',1),(66,61,'2.1.01.02','CUENTAS POR PAGAR PROVEEDORES LOCALES','Pasivo',0),(67,66,'2.1.01.02.01','PROVEEDOR DE PRUEBA UNO','Pasivo',1),(68,66,'2.1.01.02.02','PROVEEDOR DE PRUEBA DOS ','Pasivo',1),(69,61,'2.1.01.03','CUENTAS POR PAGAR OTROS','Pasivo',1),(70,61,'2.1.01.04','PARTICIPACION DE SOCIOS POR PAGAR','Pasivo',1),(71,61,'2.1.01.05','SUELDOS Y BONIFICACIONES SOCIALES POR PAGAR','Pasivo',1),(72,60,'2.1.02','OBLIGACIONES CON EL IESS','Pasivo',0),(73,72,'2.1.02.01','APORTE INDIVIDUAL POR PAGAR','Pasivo',1),(74,72,'2.1.02.02','APORTE PATRONAL POR PAGAR','Pasivo',1),(75,72,'2.1.02.03','FONDOS DE RESERVA POR PAGAR','Pasivo',1),(76,72,'2.1.02.04','PRESTAMOS QUIROGRAFARIOS POR PAGAR','Pasivo',1),(77,60,'2.1.03','OBLIGACIONES CON EMPLEADOS','Pasivo',0),(78,77,'2.1.03.01','SUELDOS Y BONIFICACIONES SOCIALES POR PAGAR','Pasivo',1),(79,77,'2.1.03.02','UTILIDAD EMPLEADOS POR PAGAR','Pasivo',1),(80,60,'2.1.04','OTRAS CUENTAS POR PAGAR','Pasivo',0),(81,80,'2.1.04.01','OBLIGACIONES CON INSTITUCIONES FINANCIERAS','Pasivo',1),(82,80,'2.1.04.02','PRESTAMO DE ACCIONISTAS LOCALES','Pasivo',1),(83,60,'2.1.05','RETENCIONES EN LA FUENTE POR PAGAR','Pasivo',0),(84,83,'2.1.05.01','RETENCION 1% IMPUESTO A LA RENTA','Pasivo',0),(85,84,'2.1.05.01.01','RETENCION 1% IMP. RTA. BIENES','Pasivo',0),(86,85,'2.1.05.01.01.01','RET. TRANSFERENCIA DE BIENES DE NATURALEZA CO','Pasivo',1),(87,85,'2.1.05.01.01.02','OTRAS RETENCIONES APLICABLES 1% IMP. RTA.','Pasivo',1),(88,84,'2.1.05.01.02','RETENCION 1% IMPUESTO A LA RENTA SERVICIOS','Pasivo',0),(89,88,'2.1.05.01.02.01','RET. TRANSPORTE PRIVADO 1% IMP. RTA.','Pasivo',1),(90,88,'2.1.05.01.02.02','RET. PROMOCION Y PUBLICIDAD 1% IMP. RTA.','Pasivo',1),(91,88,'2.1.05.01.02.03','RET. OTROS SERVICIOS APLICABLES 1% IMP. RTA.','Pasivo',1),(92,88,'2.1.05.01.02.04','RET. EN RELACION DE DEPENDENCIA 1% IMP. RTA.','Pasivo',1),(93,88,'2.1.05.01.02.05','RET. ARRENDAMIENTO MERCANTIL 1% IMP. RTA.','Pasivo',1),(94,88,'2.1.05.01.02.06','RET. POR SEGUROS Y REASEGUROS','Pasivo',1),(95,83,'2.1.05.02','RETENCION 2% IMP. RTA. SERVICIOS','Pasivo',0),(96,95,'2.1.05.02.01','RET. SERVICIOS DONDE PREDOMINA LA MANO DE OBR','Pasivo',1),(97,95,'2.1.05.02.02','RET. ENTRE SOCIEDADES 2% IMP. RTA.','Pasivo',1),(98,95,'2.1.05.02.03','RET. RENDIMIENTOS FINANCIEROS 2% IMP. RTA.','Pasivo',1),(99,95,'2.1.05.02.04','RET. OTROS SERVICIOS APLICABLES 2% IMP. RTA.','Pasivo',1),(100,83,'2.1.05.03','RETENCION 8% IMPUESTO A LA RENTA','Pasivo',0),(101,100,'2.1.05.03.01','RET. HONORARIOS PROFESIONALES Y DIETAS 8% IMP','Pasivo',1),(102,100,'2.1.05.03.02','RET. SERVICIOS PREDOMINA EL INTELECTO','Pasivo',1),(103,100,'2.1.05.03.03','RET. ARRIENDO DE BIENES INMUEBLES 8% IMP. RTA','Pasivo',1),(104,100,'2.1.05.03.04','RET. OTRAS APLICABLES EL 8% IMP. RTA.','Pasivo',1),(105,60,'2.1.06','RETENCIONES IVA POR PAGAR','Pasivo',0),(106,105,'2.1.06.01','RETENCIONES 30% IVA','Pasivo',0),(107,106,'2.1.06.01.01','RET. 30% IVA POR LA COMPRA DE BIENES','Pasivo',1),(108,105,'2.1.06.02','RETENCIONES 70% IVA','Pasivo',0),(109,108,'2.1.06.02.01','RET. 70% IVA POR LA PRESTACION DE SERVICIOS','Pasivo',1),(110,105,'2.1.06.03','RETENCIONES 100% IVA','Pasivo',0),(111,110,'2.1.06.03.01','RET. 100% IVA POR LA PRESTACION DE SERVICIOS ','Pasivo',1),(112,110,'2.1.06.03.02','RET. 100% IVA POR ARRENDAMIENTO DE INMUEBLES','Pasivo',1),(113,110,'2.1.06.03.03','RET. 100% IVA COMPRA DE BIENES Y SERVICIOS CO','Pasivo',1),(114,60,'2.1.07','IVA VENTAS','Pasivo',0),(115,114,'2.1.07.01','IVA VENTAS LOCALES NETAS','Pasivo',1),(116,114,'2.1.07.02','IVA VENTAS ACTIVO FIJO','Pasivo',1),(117,114,'2.1.07.03','IVA VENTAS SECTOR PUBLICO','Pasivo',1),(118,60,'2.1.08','BONIFICACIONES SOCIALES POR PAGAR','Pasivo',0),(119,118,'2.1.08.01','DECIMO TERCER SUELDO','Pasivo',1),(120,118,'2.1.08.02','DECIMO CUARTO SUELDO','Pasivo',1),(121,60,'2.1.09','IMPUESTO A LA RENTA POR PAGAR','Pasivo',0),(122,121,'2.1.09.01','IMPUESTO A LA RENTA POR PAGAR EN VENTAS','Pasivo',1),(123,121,'2.1.09.02','IMPUESTO A LA RENTA POR PAGAR ANTICIPADO','Pasivo',1),(124,60,'2.1.10','COBROS ANTICIPADOS','Pasivo',0),(125,124,'2.1.10.01','ANTICIPO DE CLIENTES','Pasivo',1),(126,124,'2.1.10.02','ANTICIPO DE CLIENTES CON TARJETA DE CRÉDITO','Pasivo',1),(127,59,'2.2','PASIVO NO CORRIENTE','Pasivo',0),(128,127,'2.2.01','PASIVO A LARGO PLAZO','Pasivo',0),(129,128,'2.2.01.01','OBLIGACIONES CON INSTITUCIONES FINANCIERAS','Pasivo',1),(130,128,'2.2.01.02','PRESTAMOS DE SOCIOS','Pasivo',1),(131,128,'2.2.01.03','PRESTAMOS BANCARIOS','Pasivo',1),(132,127,'2.2.02','OTROS PASIVOS','Pasivo',0),(133,132,'2.2.02.01','OTROS PASIVOS','Pasivo',1),(134,132,'2.2.02.02','CHEQUES GIRADOS Y NO COBRADOS','Pasivo',1),(135,NULL,'3','PATRIMONIO','Patrimonio',0),(136,135,'3.1','CAPITAL SOCIAL','Patrimonio',0),(137,136,'3.1.01','CAPITAL','Patrimonio',0),(138,137,'3.1.01.01','CAPITAL SUSCRITO O ASIGNADO','Patrimonio',1),(139,137,'3.1.01.02','APORTE DE SOCIOS FUTURAS CAPITALIZACIONES','Patrimonio',1),(140,135,'3.2','RESERVAS','Patrimonio',0),(141,140,'3.2.01','RESERVA LEGAL','Patrimonio',1),(142,140,'3.2.02','RESERVA FACULTATIVA','Patrimonio',1),(143,140,'3.2.03','RESERVA ESTATUTARIA','Patrimonio',1),(144,140,'3.2.04','RESERVA DE CAPITAL','Patrimonio',1),(145,135,'3.3','RESULTADOS','Patrimonio',0),(146,145,'3.3.01','UTILIDAD O PERDIDA DEL EJERCICIO ACTUAL','Patrimonio',1),(147,145,'3.3.02','UTILIDAD O PERDIDA DE AÑOS ANTERIORES','Patrimonio',1),(148,NULL,'4','INGRESOS','Ingreso',0),(149,148,'4.1','INGRESOS OPERACIONALES','Ingreso',0),(150,149,'4.1.01','INGRESO POR LA VENTA DE BIENES','Patrimonio',0),(151,150,'4.1.01.01','VENTA DE BIENES 12%','Ingreso',1),(152,150,'4.1.01.02','VENTA DE BIENES 0%','Ingreso',1),(153,149,'4.1.02','INGRESO POR VENTA DE SERVICIOS','Ingreso',0),(154,153,'4.1.02.01','VENTA SERVICIOS 12%','Ingreso',1),(155,153,'4.1.02.02','VENTA SERVICIOS 0%','Ingreso',1),(156,149,'4.1.03','(-) DESCUENTO EN VENTAS','Ingreso',1),(157,149,'4.1.04','(-) DEVOLUCION EN VENTAS','Ingreso',1),(158,149,'4.1.05','SOBRANTE DE CAJA','Ingreso',1),(159,148,'4.2','INGRESOS NO OPERACIONALES','Ingreso',0),(160,159,'4.2.01','INGRESOS FINANCIEROS','Ingreso',0),(161,160,'4.2.01.01','INTERESES GANADOS','Ingreso',1),(162,159,'4.2.02','OTROS INGRESOS','Ingreso',0),(163,162,'4.2.02.01','INGRESOS POR DESCUENTO EN COMPRA','Ingreso',0),(164,163,'4.2.02.01.01','DESCUENTO POR PROMOCION','Ingreso',1),(165,163,'4.2.02.01.02','DEVOLUCION EN COMPRAS','Ingreso',1),(166,162,'4.2.02.02','INGRESO POR ERRORES EN DECLARACIONES','Ingreso',0),(167,166,'4.2.02.02.01','DIFERENCIAS IVA A FAVOR','Ingreso',1),(168,166,'4.2.02.02.02','DIFERENCIAS IMP. RTA. A FAVOR','Ingreso',1),(169,148,'4.3','INGRESOS EXTRAORDINARIOS','Ingreso',0),(170,169,'4.3.01','UTILIDAD POR VENTA DE ACTIVO FIJO','Ingreso',1),(171,169,'4.3.02','OTROS INGRESOS','Ingreso',1),(172,NULL,'5','GASTOS','Gasto',0),(173,172,'5.1','COSTOS Y GASTOS','Gasto',0),(174,173,'5.1.01','COSTOS OPERACIONALES','Gasto',0),(175,174,'5.1.01.01','COSTO DE VENTAS','Gasto',1),(176,173,'5.1.02','GASTOS ADMINISTRATIVOS','Gasto',0),(177,176,'5.1.02.01','GASTOS DE PERSONAL','Gasto',0),(178,177,'5.1.02.01.01','SUELDOS Y SALARIOS PERSONAL ADMINISTRATIVO','Gasto',0),(179,178,'5.1.02.01.01.01','SUELDO DE PERSONAL','Gasto',1),(180,178,'5.1.02.01.01.02','DECIMO TERCER SUELDO','Gasto',1),(181,178,'5.1.02.01.01.03','DECIMO CUARTO SUELDO','Gasto',1),(182,178,'5.1.02.01.01.04','VACACIONES PAGADAS','Gasto',1),(183,178,'5.1.02.01.01.05','HORAS EXTRAS','Gasto',1),(184,178,'5.1.02.01.01.06','UTILIDADES PAGADAS','Gasto',1),(185,177,'5.1.02.01.02','SUELDO DE PERSONAL POR HORAS','Gasto',0),(186,185,'5.1.02.01.02.01','SUELDO PERSONAL POR HORAS','Gasto',1),(187,185,'5.1.02.01.02.02','DECIMO TERCER SUELDO','Gasto',1),(188,185,'5.1.02.01.02.03','DECIMO CUARTO SUELDO','Gasto',1),(189,185,'5.1.02.01.02.04','VACACIONES PAGADAS','Gasto',1),(190,185,'5.1.02.01.02.05','HORAS EXTRAS','Gasto',1),(191,185,'5.1.02.01.02.06','COMISIONES POR VENTAS','Gasto',1),(192,177,'5.1.02.01.03','APORTES A LA SEGURIDAD SOCIAL','Gasto',0),(193,192,'5.1.02.01.03.01','FONDOS DE RESERVA','Gasto',1),(194,192,'5.1.02.01.03.02','APORTE PATRONAL GASTO','Gasto',1),(195,192,'5.1.02.01.03.03','IECE GASTO','Gasto',1),(196,192,'5.1.02.01.03.04','SECAP GASTO','Gasto',1),(197,177,'5.1.02.01.04','BENEFICIOS SOCIALES E INDEMNIZACIONES','Gasto',0),(198,197,'5.1.02.01.04.01','BONIFICACION POR RESPONSABILIDAD','Gasto',1),(199,176,'5.1.02.02','GASTO DE VIAJE','Gasto',0),(200,199,'5.1.02.02.01','GASTOS DE VIAJE DEL PERSONAL','Gasto',1),(201,199,'5.1.02.02.02','HOSPEDAJE Y ALIMENTACION AL PERSONAL','Gasto',1),(202,199,'5.1.02.02.03','GASTOS DE MOVILIZACION Y TRANSPORTE','Gasto',1),(203,199,'5.1.02.02.04','GASTO COMBUSTIBLE','Gasto',1),(204,176,'5.1.02.03','REMUNERACION PERSONAL CONTRATADO','Gasto',0),(205,204,'5.1.02.03.01','HONORARIOS COMISIONES Y DIETAS A PERSONAS NAT','Gasto',1),(206,204,'5.1.02.03.02','SERVICIOS OCACIONALES','Gasto',1),(207,176,'5.1.02.04','GASTOS OPERATIVOS','Gasto',0),(208,207,'5.1.02.04.01','COMPRA DE BIENES LOCALES NO PRODUCIDOS POR LA','Gasto',0),(209,208,'5.1.02.04.01.01','ALIMENTACION','Gasto',1),(210,208,'5.1.02.04.01.02','COMPRA DE BIDON DE AGUA','Gasto',1),(211,208,'5.1.02.04.01.03','COMPRA DE OTROS BIENES','Gasto',1),(212,208,'5.1.02.04.01.04','FALTANTE DE CAJA','Gasto',1),(213,207,'5.1.02.04.02','SERVICIOS BASICOS','Gasto',0),(214,213,'5.1.02.04.02.01','GASTO ENERGIA ELECTRICA','Gasto',1),(215,213,'5.1.02.04.02.02','GASTO DE TELEFONO','Gasto',1),(216,213,'5.1.02.04.02.03','SERVICIO DE INTERNET','Gasto',1),(217,213,'5.1.02.04.02.04','GASTO CONEXIÓN DE RED','Gasto',1),(218,207,'5.1.02.04.03','SUMINISTROS Y MATERIALES','Gasto',0),(219,218,'5.1.02.04.03.01','UTILES Y SUMINISTROS DE OFICINA','Gasto',1),(220,218,'5.1.02.04.03.02','OTROS MATERIALES','Gasto',1),(221,218,'5.1.02.04.03.03','MATERIAL DE LIMPIEZA','Gasto',1),(222,218,'5.1.02.04.03.04','GASTOS DE IMPRENTA','Gasto',1),(223,218,'5.1.02.04.03.05','MEDICINAS','Gasto',1),(224,207,'5.1.02.04.04','GASTO ARRIENDO','Gasto',0),(225,224,'5.1.02.04.04.01','GASTO ARRIENDO OFICINA','Gasto',1),(226,224,'5.1.02.04.04.02','GASTO ARRIENDO GARAGE','Gasto',1),(227,173,'5.1.03','GASTOS DE DEPRECIACION PROVISION Y AMORTIZACI','Gasto',0),(228,227,'5.1.03.01','GASTOS DE DEPRECIACION','Gasto',0),(229,228,'5.1.03.01.01','DEPRECIACION EQUIPO DE OFICINA','Gasto',1),(230,228,'5.1.03.01.02','DEPRECIACION MUEBLES Y ENSERES','Gasto',1),(231,228,'5.1.03.01.03','DEPRECIACION MAQUINARIA Y EQUIPO','Gasto',1),(232,228,'5.1.03.01.04','DEPRECIACION EQUIPO DE COMPUTACION','Gasto',1),(233,228,'5.1.03.01.05','DEPRECIACION DE EDIFICIOS E INSTALACIONES','Gasto',1),(234,228,'5.1.03.01.06','DEPRECIACION DE VEHICULO','Gasto',1),(235,227,'5.1.03.02','GASTOS DE AMORTIZACIONES','Gasto',0),(236,235,'5.1.03.02.01','AMORTIZACION GASTOS DE CONSTITUCION','Gasto',1),(237,173,'5.1.04','NOTARIOS Y REGISTRADORES DE LA PROPIEDAD','Gasto',0),(238,237,'5.1.04.01','NOTARIALES','Gasto',1),(239,173,'5.1.05','TRIBUTARIOS CONTRIBUCIONES Y OTROS IMPUESTOS','Gasto',0),(240,239,'5.1.05.01','GASTO IVA','Gasto',1),(241,239,'5.1.05.02','MULTAS E INTERESES FISCALES','Gasto',1),(242,239,'5.1.05.03','OTROS IMPUESTOS','Gasto',1),(243,239,'5.1.05.04','PATENTE MUNICIPAL','Gasto',1),(244,239,'5.1.05.05','CONTRIBUCIÓN SUPER INTENDENCIA DE CÍAS.','Gasto',1),(245,239,'5.1.05.06','TIMBRES DEL SECTOR PÚBLICO','Gasto',1),(246,239,'5.1.05.08','ANTICIPO IMPUESTO A LA RENTA PAGADO','Gasto',1),(247,173,'5.1.06','MANTENIMIENTO Y REPARACIONES','Gasto',0),(248,247,'5.1.06.01','MANTENIMIENTO Y REPARACIONES DE EDIFICIO','Gasto',1),(249,247,'5.1.06.02','MANTENIMIENTO Y REPARACION DE MAQUINARIA Y EQ','Gasto',1),(250,247,'5.1.06.03','MANTENIMIENTO Y REPARACION DE MUEBLES Y ENSER','Gasto',1),(251,247,'5.1.06.04','MANTENIMIENTO Y REPARACION DE VEHICULO','Gasto',1),(252,247,'5.1.06.05','REPUESTOS','Gasto',1),(253,173,'5.1.07','TRANSPORTE Y CORREOS','Gasto',0),(254,253,'5.1.07.01','SERVICIO DE TRANSPORTE PRIVADO DE PASAJEROS','Gasto',1),(255,253,'5.1.07.02','CORREO COURIERS Y FLETES','Gasto',1),(256,253,'5.1.07.03','SERVICIO DE MENSAJERIA','Gasto',1),(257,173,'5.1.08','GASTOS DE GESTION','Gasto',0),(258,257,'5.1.08.01','GASTOS DE AGASAJO AL PERSONAL','Gasto',1),(259,257,'5.1.08.02','GASTO DE ANIVERSARIO','Gasto',1),(260,173,'5.1.09','PROVISION CUENTAS INCOBRABLES','Gasto',0),(261,260,'5.1.09.01','GASTO PROVISION CUENTAS INCOBRABLES','Gasto',1),(262,173,'5.1.10','PROMOCION Y PUBLICIDAD','Gasto',0),(263,262,'5.1.10.01','GASTO PROMOCION Y PUBLICIDAD','Gasto',1),(264,173,'5.1.11','OTROS GASTOS OPERACIONALES','Gasto',0),(265,264,'5.1.11.01','CAPACITACION AL PERSONAL','Gasto',1),(266,264,'5.1.11.02','OTROS GASTOS LEGALES','Gasto',1),(267,264,'5.1.11.03','OTROS GASTOS OPERACIONALES','Gasto',1),(268,264,'5.1.11.04','ACTUALIZACIÓN PROGRAMAS','Gasto',1),(269,264,'5.1.11.05','SEGUROS Y REASEGUROS','Gasto',1),(270,264,'5.1.11.06','SERVICIO TÉCNICO','Gasto',1),(271,172,'5.2','GASTOS NO OPERACIONALES','Gasto',0),(272,271,'5.2.01','PERDIDA EN ACTIVO FIJO','Gasto',0),(273,272,'5.2.01.01','PERDIDA POR BAJA DE ACTIVO FIJO','Gasto',1),(274,272,'5.2.01.02','PERDIDA EN VENTA DE ACTIVO FIJO','Gasto',1),(275,271,'5.2.02','EGRESOS BANCARIOS','Gasto',0),(276,275,'5.2.02.01','GASTOS BANCARIOS','Gasto',1),(277,275,'5.2.02.02','INTERESES PAGADOS','Gasto',1),(278,275,'5.2.02.03','COMISIONES BANCARIAS','Gasto',1),(279,271,'5.2.03','OTROS GASTOS NO OPERACIONALES','Gasto',0),(280,279,'5.2.03.01','GASTOS NO OPERACIONALES','Gasto',1),(281,279,'5.2.03.02','GASTOS POR DONACIONES','Gasto',1),(282,279,'5.2.03.03','GASTO CUENTAS INCOBRABLES','Gasto',1),(283,271,'5.2.04','GASTOS NO DEDUCIBLES','Gasto',0),(284,283,'5.2.04.01','DIFERENCIAS DEL IVA','Gasto',1),(285,283,'5.2.04.02','DIFERENCIAS DEL IMPUESTO A LA RENTA','Gasto',1),(286,283,'5.2.04.03','MULTAS E INTERESES FISCALES','Gasto',1),(287,283,'5.2.04.04','OTROS GASTOS NO DEDUCIBLES','Gasto',1),(288,NULL,'6','CUENTAS DE ORDEN','Gasto',0),(289,288,'6.1','DEUDORAS','Cuenta de Or',0),(290,289,'6.1.01','AJUSTE CUENTAS POR PAGAR PROVEEDORES','Cuenta de Or',1),(291,289,'6.1.02','AJUSTE RETENCIONES POR PAGAR','Cuenta de Or',1),(292,289,'6.1.03','AJUSTE APORTES IESS POR PAGAR','Cuenta de Or',1),(293,289,'6.1.04','AJUSTE UTILIDADES','Cuenta de Or',1),(294,288,'6.2','ACREEDORAS','Cuenta de Or',0),(295,294,'6.2.01','AJUSTE CUENTAS POR COBRAR CLIENTES','Cuenta de Or',1),(296,294,'6.2.02','AJUSTE INVENTARIO','Cuenta de Or',1),(297,294,'6.2.03','AJUSTE RETENCIONES EN VENTAS','Cuenta de Or',1);

/*Table structure for table `cont_transaccion` */

DROP TABLE IF EXISTS `cont_transaccion`;

CREATE TABLE `cont_transaccion` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `codigo` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_transaccion` */

insert  into `cont_transaccion`(`id`,`codigo`,`descripcion`,`estado`,`fechaCreacion`) values (3,'ANTICIPO_EFECTIVO','Anticipo en efctivo','Activa','2011-06-12 00:00:00'),(4,'ANTICIPO_CHEQUE','Anticipo con cheques','Activa','2011-06-12 00:00:00'),(5,'ANTICIPO_DEPOSITO','Anticipo con deposito','Activa','2011-06-12 00:00:00'),(6,'ANTICIPO_TRANSFERENCIA','Anticipo con transferncia bancaria','Activa','2011-06-12 00:00:00');

/*Table structure for table `cont_transaccion_aplica` */

DROP TABLE IF EXISTS `cont_transaccion_aplica`;

CREATE TABLE `cont_transaccion_aplica` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `codigo` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_transaccion_aplica` */

insert  into `cont_transaccion_aplica`(`id`,`codigo`,`descripcion`,`fechaCreacion`) values (1,'ANTICIPO_EFECTIVO','ANTICIPO EN EFECTIVO','2011-06-23 00:00:00');

/*Table structure for table `cont_transaccion_aplica_detalle` */

DROP TABLE IF EXISTS `cont_transaccion_aplica_detalle`;

CREATE TABLE `cont_transaccion_aplica_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_transaccion_aplica` bigint(20) unsigned NOT NULL,
  `id_transaccion` bigint(20) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_cont_transaccion_aplicadetalle_aplica` (`id_transaccion_aplica`),
  KEY `FK_cont_transaccion_aplicadetalle_transaccion` (`id_transaccion`),
  CONSTRAINT `FK_cont_transaccion_aplicadetalle_aplica` FOREIGN KEY (`id_transaccion_aplica`) REFERENCES `cont_transaccion_aplica` (`id`),
  CONSTRAINT `FK_cont_transaccion_aplicadetalle_transaccion` FOREIGN KEY (`id_transaccion`) REFERENCES `cont_transaccion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_transaccion_aplica_detalle` */

insert  into `cont_transaccion_aplica_detalle`(`id`,`id_transaccion_aplica`,`id_transaccion`) values (1,1,3);

/*Table structure for table `cont_transaccion_detalle` */

DROP TABLE IF EXISTS `cont_transaccion_detalle`;

CREATE TABLE `cont_transaccion_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_transaccion` bigint(20) unsigned NOT NULL,
  `id_plan` bigint(20) unsigned NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `porcentaje` double NOT NULL,
  `formula` varchar(250) NOT NULL default 'model.total' COMMENT 'Ejemplo: model.total * 12 + (model.subtotal)',
  PRIMARY KEY  (`id`),
  KEY `FK_cont_transacciondetalle_transaccion` (`id_transaccion`),
  KEY `FK_cont_transacciondetalle_plan` (`id_plan`),
  CONSTRAINT `FK_cont_transacciondetalle_plan` FOREIGN KEY (`id_plan`) REFERENCES `cont_plan` (`id`),
  CONSTRAINT `FK_cont_transacciondetalle_transaccion` FOREIGN KEY (`id_transaccion`) REFERENCES `cont_transaccion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cont_transaccion_detalle` */

insert  into `cont_transaccion_detalle`(`id`,`id_transaccion`,`id_plan`,`tipo`,`porcentaje`,`formula`) values (1,3,125,'Haber',100,'model.monto'),(2,3,5,'Debe',100,'model.monto'),(3,4,125,'Haber',100,'model.total'),(4,4,61,'Debe',0,'model.total'),(5,5,125,'Haber',100,'model.total * model.mnas'),(7,6,125,'Haber',100,'model.total');

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

insert  into `inv_linea`(`id`,`codigo`,`nombre`) values (1,'125','Maquinas'),(2,'126','Tornillo'),(3,'127','Clavos');

/*Table structure for table `inv_marca` */

DROP TABLE IF EXISTS `inv_marca`;

CREATE TABLE `inv_marca` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `nombre` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `inv_marca` */

insert  into `inv_marca`(`id`,`nombre`) values (1,'Vitre'),(2,'Xms');

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
  PRIMARY KEY  (`id`),
  KEY `FK_proproducto_marca` (`id_marca`),
  KEY `FK_proproducto_linea` (`id_linea`),
  CONSTRAINT `FK_proproducto_linea` FOREIGN KEY (`id_linea`) REFERENCES `inv_linea` (`id`),
  CONSTRAINT `FK_proproducto_marca` FOREIGN KEY (`id_marca`) REFERENCES `inv_marca` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `inv_producto` */

insert  into `inv_producto`(`id`,`id_marca`,`id_linea`,`codigo`,`nombre`,`precioCompra`,`precioVenta`,`stockMinimo`,`stockMaximo`,`utilidad`,`descuento`,`isFraccionable`,`isPesable`,`isAplicarSerie`,`unidadesCaja`,`precioPromocion`,`precioMayorista`,`isCobraIva`) values (1,1,1,'125','Cemento',7,9,36,1220,5,10,1,1,0,0,8,7,0),(2,1,2,'126','Varilla 5.2 pulgadas',20,25,300,5000,6,5,0,0,0,0,0,0,0),(3,2,2,'127','Clavos 5 pulgadas',1.98,200,100,800,25,20,0,0,0,0,0,0,0),(4,1,1,'128','15545',0,0,0,0,0,10,1,1,0,0,0,0,0),(5,1,1,'129','fsdsfds',0,0,0,0,0,1,0,0,0,0,0,0,0);

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

insert  into `inv_stock_producto`(`id_local`,`id_producto`,`existencia`,`minimo`,`maximo`) values (1,1,49,0,0),(1,3,106,0,0),(1,2,31,0,0),(1,4,5,0,0),(1,5,1,0,0);

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

/*Table structure for table `inv_transferencia_detalle` */

DROP TABLE IF EXISTS `inv_transferencia_detalle`;

CREATE TABLE `inv_transferencia_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_transferencia` bigint(20) unsigned NOT NULL default '0',
  `id_producto` bigint(20) unsigned NOT NULL default '0',
  `cantidad_enviada` double NOT NULL default '0',
  `cantidad_recibida` double NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_inv_transferencia_detalle_transferencia` (`id_transferencia`),
  KEY `FK_inv_transferencia_detalle_producto` (`id_producto`),
  CONSTRAINT `FK_inv_transferencia_detalle_producto` FOREIGN KEY (`id_producto`) REFERENCES `inv_producto` (`id`),
  CONSTRAINT `FK_inv_transferencia_detalle_transferencia` FOREIGN KEY (`id_transferencia`) REFERENCES `inv_transferencia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `inv_transferencia_detalle` */

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

insert  into `seg_local`(`id`,`codigo`,`nombre`,`direccion`,`telefono`) values (1,'001','LOCAL PRINCIPAL','se','072541152'),(2,'002','LOCAL BOLIVAR','sadsa','25411500'),(3,'003','erw','erw','erw');

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

insert  into `seg_opcion`(`id`,`codigo`,`padre`,`modulo`,`etiqueta`,`isNuevaVentana`) values (1,'SEGURIDAD','','','Seguridad',0),(2,'SEGURIDAD_ROLES','SEGURIDAD','seguridad/AdministrarRoles.xul','Roles',0),(3,'SEGURIDAD_OPCIONES','SEGURIDAD','seguridad/AdministrarOpciones.xul','Opciones',0),(4,'SEGURIDAD_USUARIOS','SEGURIDAD','seguridad/AdministrarUsuarios.xul','Usuarios',0),(5,'SEGURIDAD_PARAMETROS','SEGURIDAD','seguridad/AdministrarParametros.xul','Parametros',0),(6,'INVENTARIO','','','Inventario',0),(7,'INVENTARIO_PRODUCTOS','INVENTARIO','inventario/AdministrarProductos.xul','Productos',0),(8,'INVENTARIO_LINEAS','INVENTARIO','inventario/AdministrarLineas.xul','Lineas o Grupos',0),(9,'INVENTARIO_MARCAS','INVENTARIO','inventario/AdministrarMarcas.xul','Marcas',0),(11,'COMPRAS_PROVEEDORES','COMPRAS','proveedor/AdministrarProveedores.xul','Proveedores',0),(12,'VENTAS_CLIENTES','VENTAS','CLIENTE/AdministrarClientes.xul','Clientes',0),(13,'VENTAS','','','Ventas',0),(14,'VENTAS_NUEVA','VENTAS','venta/EditarFacturaVenta.xul','Ingresar Venta',1),(15,'COMPRAS','','','Compras',0),(16,'COMPRAS_NUEVA','COMPRAS','compra/EditarFacturaCompra.xul','Ingresar',1),(17,'CONTABILIDAD','','','Contabilidad',0),(18,'CONTABILIDAD_CFG_PERIODO','CONTABILIDAD_CFG','contabilidad/AdministrarPeriodosContables.xul','Periodos',0),(19,'CONTABILIDAD_CFG_PLAN','CONTABILIDAD_CFG','contabilidad/AdministrarPlanes.xul','Plan de Cuentas',0),(20,'SEGURIDAD_LOCALES','SEGURIDAD','seguridad/AdministrarLocales.xul','Locales',0),(21,'COMPRAS_BUSCADOR','COMPRAS','compra/BuscadorCompra.xul','Buscador Compras',0),(22,'REPORTES','','','Reportes',0),(23,'CONTABILIDAD_CONT_CMP','CONTABILIDAD','contabilidad/ContabilizarCompras.xul','Contabilizar Compras',0),(24,'CONTABILIDAD_CFG','CONTABILIDAD','','ConfiguraciÃ³n',0),(25,'CONTABILIDAD_CFG_TRA','CONTABILIDAD_CFG','contabilidad/AdministrarTransacciones.xul','Transacciones',0),(26,'CONTABILIDAD_CFG_TRA_APL','CONTABILIDAD_CFG','contabilidad/AdministrarTransaccionesAplica.xul','Transacciones Aplica',0),(27,'CONTABILIDAD_LOTES','CONTABILIDAD','contabilidad/AdministrarLotesAsientos.xul','Lotes de Asientos',0),(28,'VENTAS_CFG','VENTAS','','ConfiguraciÃ³n',0),(29,'VENTAS_CFG_PUNTOS','VENTAS_CFG','venta/AdministrarPuntosFacturacion.xul','Puntos FacturaciÃ³n',0),(30,'VENTAS_CFG_AUTS','VENTAS_CFG','venta/AdministrarAutorizacionesSri.xul','Autorizaciones Sri',0),(31,'VENTAS_CFG_SEC','VENTAS_CFG','venta/AdministrarFacturaSecuenciales.xul','Secuenciales',0),(32,'VENTAS_CAJA_CERRAR','VENTAS','venta/CerrarCaja.xul','Cerrar Caja',1),(33,'VENTAS_NUEVA_PROF','VENTAS','venta/EditarProforma.xul','Ingresar Proforma',1),(34,'CONTABILIDAD_CONT_VENTAS','CONTABILIDAD','contabilidad/ContabilizarVentas.xul','Contabilizar Ventas',0),(35,'CONTABILIDAD_NUEVO_INGGASTO','CONTABILIDAD','contabilidad/EditarIngresoGasto.xul','Ingresos y Gastos',1),(36,'VENTAS_BUSCADOR','VENTAS','venta/BuscadorVenta.xul','Buscador Ventas',0),(37,'REPORTES_VENTAS','REPORTES','reporte/venta/RepVentas.xul','Ventas',0),(38,'REPORTES_PROFORMA','REPORTES','reporte/proforma/RepProforma.xul','Proforma',0),(39,'REPORTES_CONT','REPORTES','','Contabilidad',0),(40,'REPORTES_CONT_BAL','REPORTES_CONT','reporte/contabilidad/RepBalanceGeneral.xul','Balance',0),(41,'VENTAS_ANTICIPOS','VENTAS','venta/AdministrarAnticipos.xul','Anticipos',0),(42,'CONTABILIDAD_CFG_BANCOS','CONTABILIDAD_CFG','contabilidad/AdministrarBancos.xul','Bancos',0),(43,'CONTABILIDAD_CFG_CUENTAS','CONTABILIDAD_CFG','contabilidad/AdministrarCuentaBancaria.xul','Cuentas Bancos',0),(44,'CONTABILIDAD_COT_ANT','CONTABILIDAD','contabilidad/ContabilizarAnticipos.xul','Contabilizar Anticipos',0),(46,'VENTAS_TIP_CREDITO','VENTAS','venta/AdministrarTipoCredito.xul','Tipos Credito',0);

/*Table structure for table `seg_parametro` */

DROP TABLE IF EXISTS `seg_parametro`;

CREATE TABLE `seg_parametro` (
  `codigo` varchar(45) NOT NULL default '',
  `valor` varchar(45) NOT NULL default '',
  `descripcion` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `seg_parametro` */

insert  into `seg_parametro`(`codigo`,`valor`,`descripcion`) values ('IVA','12','Iva actual (ej: 12)'),('NOMBRE_EMPRESA','FerreterÃ­a SÃ¡nchez','Nombre de la empresa'),('NOMBRE_PROPIETARIO','Adolfo Sánchez','Nombre del propietario'),('NOMBRE_SISTEMA','JFAC XUL','Nombre del sistema'),('PRO_VALIDEZ','7','Duración de la proforma en días'),('RUC_PROPIETARIO','110202020202','Ruc del propietario');

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

insert  into `seg_rol`(`id`,`nombre`,`descripcion`) values (1,'admin','administrador del sistema'),(2,'vendedor','Vendedor en cajas');

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

insert  into `seg_rol_opcion`(`id_rol`,`id_opcion`) values (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,11),(1,12),(1,13),(2,13),(1,14),(2,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(1,22),(2,22),(1,23),(1,24),(1,25),(1,26),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,33),(1,34),(1,35),(1,36),(1,37),(1,38),(1,39),(1,40),(1,41),(1,42),(1,43),(1,44),(1,46);

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

insert  into `seg_rol_usuario`(`id_rol`,`id_usuario`) values (1,1),(2,2);

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

insert  into `seg_usuario`(`id`,`id_punto`,`cedula`,`login`,`clave`,`nombres`,`apellidos`,`isActivo`,`id_local`) values (1,1,'1104285604','administrador','administrador','admin','admin',1,1),(2,NULL,'1103181796','dannym','dannym','Danny','MuÃ±oz',1,1),(20,NULL,'1521212121','','','','',0,NULL);

/*Table structure for table `tx` */

DROP TABLE IF EXISTS `tx`;

CREATE TABLE `tx` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `valor` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tx` */

insert  into `tx`(`id`,`valor`) values (1,3),(2,3),(3,3),(4,3),(5,3),(6,3),(7,3),(8,3);

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
  PRIMARY KEY  (`id`),
  KEY `FK_ven_anticipo_cliente` (`id_cliente`),
  KEY `FK_ven_anticipo_usuario` (`id_usuario`),
  KEY `FK_ven_anticipo_local` (`id_local`),
  KEY `FK_ven_anticipo_banco` (`id_banco`),
  KEY `FK_ven_anticipo_lote` (`id_lote`),
  KEY `FK_ven_anticipo_cuenta` (`id_cuenta`),
  CONSTRAINT `FK_ven_anticipo_banco` FOREIGN KEY (`id_banco`) REFERENCES `cont_banco` (`id`),
  CONSTRAINT `FK_ven_anticipo_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `ven_cliente` (`id`),
  CONSTRAINT `FK_ven_anticipo_cuenta` FOREIGN KEY (`id_cuenta`) REFERENCES `cont_banco_cuenta` (`id`),
  CONSTRAINT `FK_ven_anticipo_local` FOREIGN KEY (`id_local`) REFERENCES `seg_local` (`id`),
  CONSTRAINT `FK_ven_anticipo_lote` FOREIGN KEY (`id_lote`) REFERENCES `ven_lote_caja` (`id`),
  CONSTRAINT `FK_ven_anticipo_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `seg_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='InnoDB free: 7168 kB; (`id_lote`) REFER `xulfac/ven_lote_caj';

/*Data for the table `ven_anticipo` */

insert  into `ven_anticipo`(`id`,`id_cliente`,`monto`,`descripcion`,`formaPago`,`estado`,`fecha`,`id_usuario`,`id_local`,`saldo`,`fechaEmision`,`fechaVencimiento`,`id_banco`,`numeroReferencia`,`numeroCuenta`,`id_lote`,`id_cuenta`) values (1,2,21,'dsadsa','Efectivo','Pendiente','2011-05-05 00:00:00',1,1,21,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,'','',1,NULL),(2,2,43,'fds','','Pendiente','2011-05-05 00:00:00',1,1,43,'1899-11-30 00:00:00','1899-11-30 00:00:00',NULL,'','',1,NULL),(5,2,1,'','Efectivo','Pendiente','2011-05-13 00:00:00',1,1,1,NULL,NULL,NULL,NULL,NULL,1,NULL),(9,2,12,'','Efectivo','Devuelto','2011-05-15 00:00:00',1,1,12,NULL,NULL,NULL,NULL,NULL,21,NULL),(10,2,0,'01','Efectivo','Devuelto','2011-05-15 00:00:00',1,1,0,NULL,NULL,NULL,NULL,NULL,21,NULL),(11,2,22,'12','Efectivo','Devuelto','2011-05-15 00:00:00',1,1,22,NULL,NULL,NULL,NULL,NULL,1,NULL),(13,2,2,'','Efectivo','Devuelto','2011-05-15 00:00:00',1,1,2,NULL,NULL,NULL,NULL,NULL,1,NULL),(16,2,30,'32e','Efectivo','Pendiente','2011-06-12 00:00:00',1,1,30,NULL,NULL,NULL,NULL,NULL,21,NULL),(17,2,30,'32','Cheque','Pendiente','2011-06-12 00:00:00',1,1,30,'2011-06-12 00:00:00','2011-06-12 00:00:00',1,'32323','32232',21,NULL),(18,2,2,'22','Deposito','Pendiente','2011-06-12 00:00:00',1,1,2,'2011-06-12 00:00:00','2011-06-12 00:00:00',1,'ds','ds',21,2),(19,2,32,'e32','Transferencia','Pendiente','2011-06-12 00:00:00',1,1,32,'2011-06-12 00:00:00','2011-06-12 00:00:00',1,'e32','32e',21,2),(20,2,2,'dsasad','Efectivo','Pendiente','2011-07-06 00:00:00',1,1,2,NULL,NULL,NULL,NULL,NULL,21,NULL),(22,2,4,'ds','Efectivo','Pendiente','2011-07-06 00:00:00',1,1,4,NULL,NULL,NULL,NULL,NULL,21,NULL),(23,2,3,'dsa','Efectivo','Pendiente','2011-07-06 00:00:00',1,1,3,NULL,NULL,NULL,NULL,NULL,21,NULL),(24,2,320,'edsa','Efectivo','Pendiente','2011-07-06 00:00:00',1,1,320,NULL,NULL,NULL,NULL,NULL,21,NULL),(26,2,3,'das','Efectivo','Pendiente','2011-07-07 00:00:00',1,1,3,NULL,NULL,NULL,NULL,NULL,21,NULL),(28,2,3,'sda','Efectivo','Pendiente','2011-07-07 00:00:00',1,1,3,NULL,NULL,NULL,NULL,NULL,21,NULL),(29,2,3,'sda','Efectivo','Contabilizado','2011-07-07 00:00:00',1,1,3,NULL,NULL,NULL,NULL,NULL,21,NULL);

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

insert  into `ven_autorizacion_sri`(`id`,`numero`,`estado`,`fechaInicio`,`fechaFin`) values (3,'ds','Activo','2011-04-17 00:00:00','2011-12-31 00:00:00');

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

insert  into `ven_cliente`(`id`,`cedula`,`nombres`,`apellidos`,`direccion`,`telefono`,`celular`,`fax`,`mail`) values (1,'1104285604','danny','muÃ±oz','loja','2541152','','',''),(2,'1103181796','gladys','munoz','loja','2541152','1112','','');

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
  PRIMARY KEY  (`id`),
  KEY `FK_ven_cobro_venta` (`id_venta`),
  CONSTRAINT `FK_ven_cobro_venta` FOREIGN KEY (`id_venta`) REFERENCES `ven_fac_venta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_cobro` */

insert  into `ven_cobro`(`id`,`id_venta`,`total`,`totalEfectivo`,`totalCheques`,`totalAnticipos`,`totalCreditoDiferido`,`totalCreditoCorriente`) values (1,67,8.1,0,0,0,0,0),(2,68,16.2,0,0,0,0,0),(3,69,8.1,0,0,0,0,0),(4,70,8.1,0,0,0,0,0),(5,71,8.1,0,0,0,0,0),(6,72,8.1,0,0,0,0,0),(7,73,8.1,0,0,0,0,0),(8,74,8.1,0,0,0,0,0),(9,75,8.1,8.1,0,0,0,0),(10,76,8.1,8.1,0,0,0,0),(11,77,8.1,0,0,0,0,0),(12,78,8.1,0,0,0,0,0),(13,79,8.1,1,0,0,7.1,0),(14,80,89.1,0,0,0,89.1,0),(15,81,8.1,0,0,0,8.1,0),(16,82,8.1,0,0,0,8.1,0),(17,83,8.1,0,0,8.1,0,0),(18,84,8.1,0,0,0,0,0),(19,85,8.1,8.1,0,0,0,0),(20,86,8.1,8.1,0,0,0,0),(21,87,8.1,0,0,0,0,0),(22,88,8.1,0,0,0,0,0),(23,89,8.1,0,0,0,0,0),(24,90,8.1,0,0,0,0,0),(25,91,8.1,8.1,0,0,0,0),(26,92,8.1,0,0,0,0,0),(27,93,8.1,0,0,0,0,0),(28,94,8.1,0,0,0,0,0),(29,95,8.1,0,0,0,0,0),(30,96,8.1,8.1,0,0,0,0),(31,97,8.1,8.1,0,0,0,0),(32,98,8.1,0,0,0,0,0),(33,99,8.1,8.1,0,0,0,0),(34,100,8.1,0,0,0,0,0),(35,101,8.1,0,0,0,0,0),(36,102,8.1,0,0,0,0,0),(37,103,8.1,0,0,0,0,0),(38,104,8.1,8.1,0,0,0,0),(39,105,8.1,0,0,0,0,0),(40,106,8.1,0,0,0,0,0),(41,107,8.1,0,0,0,0,0),(42,108,8.1,8.1,0,0,0,0),(43,109,8.1,0,0,0,0,0),(44,110,8.1,0,0,0,0,0),(45,111,8.1,0,0,0,0,0),(46,112,8.1,0,0,0,0,0),(47,113,8.1,0,0,0,0,0),(48,114,8.1,8.1,0,0,0,0);

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
  PRIMARY KEY  (`id`),
  KEY `FK_ven_cobro_detalle_cobro` (`id_cobro`),
  CONSTRAINT `FK_ven_cobro_detalle_cobro` FOREIGN KEY (`id_cobro`) REFERENCES `ven_cobro` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_cobro_detalle` */

insert  into `ven_cobro_detalle`(`id`,`id_cobro`,`formaPago`,`monto`,`saldo`,`id_documento`,`fecha`) values (1,7,'EFECTIVO',8.1,8.1,0,NULL),(2,8,'EFECTIVO',8.1,8.1,0,NULL),(3,9,'EFECTIVO',8.1,8.1,0,NULL),(4,10,'EFECTIVO',8.1,8.1,0,NULL),(5,13,'EFECTIVO',1,1,0,NULL),(6,13,'CREDITO_DIFERIDO',7.1,7.1,0,NULL),(7,14,'CREDITO_DIFERIDO',89.1,89.1,0,NULL),(8,15,'CREDITO_DIFERIDO',8.1,8.1,0,NULL),(9,16,'CREDITO_DIFERIDO',8.1,8.1,0,NULL),(10,17,'ANTICIPO',30,0,16,NULL),(11,19,'EFECTIVO',8.1,8.1,0,'2011-12-04 00:00:00'),(12,20,'EFECTIVO',8.1,8.1,0,'2011-12-04 00:00:00'),(13,25,'EFECTIVO',8.1,8.1,0,'2011-12-04 00:00:00'),(14,30,'EFECTIVO',8.1,8.1,0,'2011-12-04 00:00:00'),(15,31,'EFECTIVO',8.1,8.1,0,'2011-12-04 00:00:00'),(16,33,'EFECTIVO',8.1,8.1,0,'2011-12-04 00:00:00'),(17,38,'EFECTIVO',8.1,8.1,0,'2011-12-04 00:00:00'),(18,42,'EFECTIVO',8.1,8.1,0,'2011-12-04 00:00:00'),(19,48,'EFECTIVO',8.1,0,0,'2011-12-04 00:00:00');

/*Table structure for table `ven_cuota` */

DROP TABLE IF EXISTS `ven_cuota`;

CREATE TABLE `ven_cuota` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_cobro_item` bigint(20) unsigned NOT NULL,
  `monto` double NOT NULL,
  `fecha` datetime NOT NULL,
  `porcentajeInteres` double NOT NULL,
  `porcentajeMora` double NOT NULL,
  `numeroCuota` int(10) unsigned NOT NULL,
  `estado` varchar(45) default NULL,
  `subtotal` double default NULL,
  `tipo` varchar(45) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_ven_cuota_item_cuota` USING BTREE (`id_cobro_item`),
  CONSTRAINT `FK_ven_cuota_item` FOREIGN KEY (`id_cobro_item`) REFERENCES `ven_cobro_detalle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_cuota` */

insert  into `ven_cuota`(`id`,`id_cobro_item`,`monto`,`fecha`,`porcentajeInteres`,`porcentajeMora`,`numeroCuota`,`estado`,`subtotal`,`tipo`) values (1,8,8.1,'2011-11-22 00:00:00',0,0,1,'Registrada',0,''),(2,8,8.1,'2011-11-22 00:00:00',0,0,1,'Registrada',0,''),(3,9,2.7,'2012-02-22 00:00:00',0,0,1,'Registrada',0,''),(4,9,2.7,'2012-02-22 00:00:00',0,0,2,'Registrada',0,''),(5,9,2.7,'2012-02-22 00:00:00',0,0,3,'Registrada',0,'');

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
  `id_aut_sri` bigint(20) unsigned NOT NULL,
  `isImpresa` tinyint(4) default '0',
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
  CONSTRAINT `FK_ven_fac_venta_aut` FOREIGN KEY (`id_aut_sri`) REFERENCES `ven_fac_venta` (`id`),
  CONSTRAINT `FK_ven_fac_venta_lote` FOREIGN KEY (`id_lote`) REFERENCES `ven_lote_caja` (`id`),
  CONSTRAINT `FK_ven_fac_venta_punto` FOREIGN KEY (`id_punto`) REFERENCES `ven_punto_facturacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='InnoDB free: 7168 kB; (`id_cobro`) REFER `xulfac/ven_cobro`(';

/*Data for the table `ven_fac_venta` */

insert  into `ven_fac_venta`(`id`,`id_cliente`,`id_usuario`,`id_local`,`id_periodo`,`fechaEmision`,`fechaCaducidad`,`numeroFactura`,`subtotal`,`sobrecargo`,`iva`,`descuento`,`total`,`id_punto`,`id_lote`,`ivaPorcentaje`,`estado`,`formaPago`,`id_aut_sri`,`isImpresa`) values (1,1,1,1,1,'2011-01-03 00:00:00','2011-01-03 00:00:00','000-000-00000',0,0,0,0,0,NULL,NULL,0,'Registrada','',1,0),(2,1,1,1,1,'2011-01-05 00:00:00','2011-01-05 00:00:00','000-000-00000',0,0,0,0,0,NULL,NULL,0,'Registrada','',1,0),(3,1,1,1,1,'2011-01-08 00:00:00','2011-01-08 00:00:00','000-000-00000',0,0,0,0,0,NULL,NULL,0,'Registrada','',1,0),(4,1,1,1,1,'2011-01-08 00:00:00','2011-01-08 00:00:00','000-000-00000',0,0,0,0,0,NULL,NULL,0,'Registrada','',1,0),(5,1,1,1,1,'2011-01-08 00:00:00','2011-01-08 00:00:00','000-000-1000020',0,0,0,0,0,NULL,NULL,0,'Registrada','',1,0),(6,1,1,1,1,'2011-01-08 00:00:00','2011-01-08 00:00:00','000-000-0000025',0,0,0,0,0,NULL,NULL,0,'Registrada','',1,0),(7,1,1,1,1,'2011-01-08 00:00:00','2011-01-08 00:00:00','000-000-0000002',0,0,0,0,0,NULL,NULL,0,'Registrada','',1,0),(8,1,1,1,1,'2011-01-08 00:00:00','2011-01-08 00:00:00','000-000-0000000',104,0,12.48,0,116.48,NULL,NULL,0,'Anulada','',1,0),(9,1,1,1,1,'2011-01-08 00:00:00','2011-01-08 00:00:00','000-000-0000000',52,0,6.24,0,58.24,NULL,NULL,0,'Anulada','',1,0),(10,1,1,1,1,'2011-01-08 00:00:00','2011-01-08 00:00:00','000-000-0000015',25,0,3,0,280,NULL,NULL,0,'Anulada','',1,0),(11,1,1,1,1,'2011-01-08 00:00:00','2011-02-10 00:00:00','000-000-0000000',52,0,6.24,0,58.24,NULL,NULL,0,'Anulada','',1,0),(12,1,1,1,1,'2011-01-08 00:00:00','2012-02-08 00:00:00','000-000-0000058',277,0,33.24,0,310.24,NULL,NULL,0,'Anulada','',1,0),(13,1,1,1,1,'2011-01-08 00:00:00','2011-01-08 00:00:00','000-000-0000000',312,0,37.44,0,349.44,NULL,NULL,0,'Contabilizada','',1,0),(14,1,1,1,1,'2011-01-08 00:00:00','2011-01-08 00:00:00','000-000-0000128',77,0,9.24,0,86.24,NULL,NULL,0,'Contabilizada','',1,0),(15,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000',745,0,89.4,0,834.4,NULL,NULL,0,'Anulada','',1,0),(16,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000',52,0,6.24,0,58.24,NULL,NULL,0,'Registrada','',1,0),(17,1,1,1,1,'2011-01-16 00:00:00','2011-01-16 00:00:00','000-000-0000000',277,0,33.24,0,310.24,NULL,NULL,0,'Contabilizada','',1,0),(18,1,1,1,1,'2011-04-18 00:00:00','2011-04-18 00:00:00','001-001-0000001',9,0,1.08,0,10.08,1,6,0,'Registrada','',1,0),(19,1,1,1,1,'2011-04-18 00:00:00','2011-04-18 00:00:00','001-001-0000002',9,0,1.08,0,10.08,1,6,0,'Contabilizada','',1,0),(20,1,1,1,1,'2011-04-19 00:00:00','2011-04-19 00:00:00','001-001-0000003',9,0,1.08,0,10.08,1,6,0,'Registrada','',1,0),(21,1,1,1,1,'2011-04-19 00:00:00','2011-04-19 00:00:00','001-001-0000004',25,0,3,0,280,1,6,0,'Contabilizada','',1,0),(22,1,1,1,1,'2011-04-19 00:00:00','2011-04-19 00:00:00','001-001-0000005',9,0,1.08,0,10.08,1,6,0,'Anulada','',1,0),(23,1,1,1,1,'2011-04-26 00:00:00','2011-04-26 00:00:00','001-001-0000006',34,2,4.08,2.15,37.93,1,6,12,'Contabilizada','',1,0),(24,2,1,1,1,'2011-04-26 00:00:00','2011-04-26 00:00:00','001-001-0000007',34,0,11.22,2.15,43.07,1,6,33,'Contabilizada','',1,0),(25,2,1,1,1,'2011-04-26 00:00:00','2011-04-26 00:00:00','001-001-0000008',45,0,5.4,0.9,49.5,1,6,12,'Contabilizada','',1,0),(26,1,1,1,1,'2011-11-14 00:00:00','2011-11-14 00:00:00','001-001-0000009',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(27,1,1,1,1,'2011-11-14 00:00:00','2011-11-14 00:00:00','001-001-0000010',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(28,1,1,1,1,'2011-11-14 00:00:00','2011-11-14 00:00:00','001-001-0000011',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(29,1,1,1,1,'2011-11-14 00:00:00','2011-11-14 00:00:00','001-001-0000012',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(30,1,1,1,1,'2011-11-14 00:00:00','2011-11-14 00:00:00','001-001-0000013',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(31,1,1,1,1,'2011-11-14 00:00:00','2011-11-14 00:00:00','001-001-0000014',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(32,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000015',183.75,0,0,41.25,183.75,1,21,12,'','Contado',3,0),(33,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000016',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(34,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000017',160,0,0,40,160,1,21,12,'','Contado',3,0),(35,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000018',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(36,2,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000019',160,0,0,40,160,1,21,12,'','Contado',3,0),(37,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000020',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(38,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000021',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(39,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000022',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(40,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000023',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(41,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000024',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(42,2,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000025',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(43,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000026',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(44,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000027',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(45,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000028',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(46,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000029',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(47,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000030',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(48,2,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000031',160,0,0,40,160,1,21,12,'','Contado',3,0),(49,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000032',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(50,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000033',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(51,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000034',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(52,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000035',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(53,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000036',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(54,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000037',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(55,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000038',160,0,0,40,160,1,21,12,'','Contado',3,0),(56,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000039',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(57,2,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000040',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(58,1,1,1,1,'2011-11-15 00:00:00','2011-11-15 00:00:00','001-001-0000041',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(59,1,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000042',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(60,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000043',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(61,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000044',160,0,0,40,160,1,21,12,'','Contado',3,0),(62,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000045',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(63,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000046',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(64,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000047',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(65,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000048',8.1,2,0,0.9,10.1,1,21,12,'','Contado',3,0),(66,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000049',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(67,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000050',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(68,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000051',16.2,0,0,1.8,16.2,1,21,12,'','Contado',3,0),(69,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000052',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(70,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000053',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(71,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000054',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(72,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000055',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(73,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000056',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(74,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000057',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(75,2,1,1,1,'2011-11-19 00:00:00','2011-11-19 00:00:00','001-001-0000058',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(76,2,1,1,1,'2011-11-20 00:00:00','2011-11-20 00:00:00','001-001-0000059',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(77,2,1,1,1,'2011-11-20 00:00:00','2011-11-20 00:00:00','001-001-0000060',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(78,2,1,1,1,'2011-11-22 00:00:00','2011-11-22 00:00:00','001-001-0000061',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(79,2,1,1,1,'2011-11-22 00:00:00','2011-11-22 00:00:00','001-001-0000062',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(80,2,1,1,1,'2011-11-22 00:00:00','2011-11-22 00:00:00','001-001-0000063',89.1,0,0,9.9,89.1,1,21,12,'','Contado',3,0),(81,2,1,1,1,'2011-11-22 00:00:00','2011-11-22 00:00:00','001-001-0000064',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(82,2,1,1,1,'2011-11-22 10:09:20','2011-11-22 00:00:00','001-001-0000065',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(83,2,1,1,1,'2010-00-24 00:00:00','2010-00-24 00:00:00','001-001-0000066',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(84,2,1,1,1,'2014-00-04 00:00:00','2014-00-04 00:00:00','001-001-0000067',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(85,2,1,1,1,'2011-00-04 00:00:00','2011-00-04 00:00:00','001-001-0000068',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(86,2,1,1,1,'2011-00-04 00:00:00','2011-00-04 00:00:00','001-001-0000069',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(87,2,1,1,1,'2011-00-04 00:00:00','2011-00-04 00:00:00','001-001-0000070',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(88,2,1,1,1,'2011-00-04 00:00:00','2011-00-04 00:00:00','001-001-0000071',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(89,2,1,1,1,'2012-00-04 00:00:00','2012-00-04 00:00:00','001-001-0000072',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(90,2,1,1,1,'2012-00-04 00:00:00','2012-00-04 00:00:00','001-001-0000073',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(91,2,1,1,1,'2013-00-04 00:00:00','2013-00-04 00:00:00','001-001-0000074',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(92,2,1,1,1,'2013-00-04 00:00:00','2013-00-04 00:00:00','001-001-0000075',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(93,2,1,1,1,'2013-00-04 00:00:00','2013-00-04 00:00:00','001-001-0000076',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(94,2,1,1,1,'2013-00-04 00:00:00','2013-00-04 00:00:00','001-001-0000077',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(95,2,1,1,1,'2013-00-04 00:00:00','2013-00-04 00:00:00','001-001-0000078',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(96,2,1,1,1,'2012-00-04 00:00:00','2012-00-04 00:00:00','001-001-0000079',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(97,2,1,1,1,'2012-00-04 00:00:00','2012-00-04 00:00:00','001-001-0000080',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(98,2,1,1,1,'2010-00-04 00:00:00','2010-00-04 00:00:00','001-001-0000081',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(99,2,1,1,1,'2011-00-04 00:00:00','2011-00-04 00:00:00','001-001-0000082',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(100,2,1,1,1,'2011-00-04 00:00:00','2011-00-04 00:00:00','001-001-0000083',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(101,2,1,1,1,'2011-00-04 00:00:00','2011-00-04 00:00:00','001-001-0000084',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(102,2,1,1,1,'2012-00-04 00:00:00','2012-00-04 00:00:00','001-001-0000085',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(103,2,1,1,1,'2013-00-04 00:00:00','2013-00-04 00:00:00','001-001-0000086',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(104,2,1,1,1,'2014-00-04 00:00:00','2014-00-04 00:00:00','001-001-0000087',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(105,2,1,1,1,'2015-00-04 00:00:00','2015-00-04 00:00:00','001-001-0000088',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(106,2,1,1,1,'2014-00-04 00:00:00','2014-00-04 00:00:00','001-001-0000089',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(107,2,1,1,1,'2014-00-04 00:00:00','2014-00-04 00:00:00','001-001-0000090',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,1),(108,2,1,1,1,'2014-00-04 00:00:00','2014-00-04 00:00:00','001-001-0000091',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(109,2,1,1,1,'2015-00-04 00:00:00','2015-00-04 00:00:00','001-001-0000092',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,1),(110,2,1,1,1,'2014-00-04 00:00:00','2014-00-04 00:00:00','001-001-0000093',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,1),(111,2,1,1,1,'2010-00-04 00:00:00','2010-00-04 00:00:00','001-001-0000094',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,1),(112,2,1,1,1,'2010-00-04 00:00:00','2010-00-04 00:00:00','001-001-0000095',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(113,2,1,1,1,'2011-00-04 00:00:00','2011-00-04 00:00:00','001-001-0000096',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,0),(114,2,1,1,1,'2010-00-04 00:00:00','2010-00-04 00:00:00','001-001-0000097',8.1,0,0,0.9,8.1,1,21,12,'','Contado',3,1);

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
  PRIMARY KEY  (`id`),
  KEY `FK_facventa_detalle_producto` (`id_producto`),
  KEY `FK_ven_fac_venta_detalle_facventa` (`id_facventa`),
  CONSTRAINT `FK_facventa_detalle_producto` FOREIGN KEY (`id_producto`) REFERENCES `inv_producto` (`id`),
  CONSTRAINT `FK_ven_fac_venta_detalle_facventa` FOREIGN KEY (`id_facventa`) REFERENCES `ven_fac_venta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='InnoDB free: 7168 kB; (`id_facventa`) REFER `xulfac/ven_fac_';

/*Data for the table `ven_fac_venta_detalle` */

insert  into `ven_fac_venta_detalle`(`id`,`id_producto`,`id_facventa`,`cantidad`,`costo`,`descuento`,`subtotal`,`tipoPrecio`) values (1,1,23,1,9,0.9,8.1,'venta'),(2,2,23,1,25,1.25,23.75,'venta'),(3,1,24,1,9,0.9,8.1,'venta'),(4,2,24,1,25,1.25,23.75,'venta'),(5,1,25,5,9,0.9,8.1,'venta'),(6,1,26,1,9,0.9,8.1,'venta'),(7,1,27,1,9,0.9,8.1,'venta'),(8,1,28,1,9,0.9,8.1,'venta'),(9,1,29,1,9,0.9,8.1,'venta'),(10,1,30,1,9,0.9,8.1,'venta'),(11,1,31,1,9,0.9,8.1,'venta'),(12,2,32,1,25,1.25,23.75,'venta'),(13,3,32,1,200,40,160,'venta'),(14,1,33,1,9,0.9,8.1,'venta'),(15,3,34,1,200,40,160,'venta'),(16,1,35,1,9,0.9,8.1,'venta'),(17,3,36,1,200,40,160,'venta'),(18,1,37,1,9,0.9,8.1,'venta'),(19,1,38,1,9,0.9,8.1,'venta'),(20,1,39,1,9,0.9,8.1,'venta'),(21,1,40,1,9,0.9,8.1,'venta'),(22,1,41,1,9,0.9,8.1,'venta'),(23,1,42,1,9,0.9,8.1,'venta'),(24,1,43,1,9,0.9,8.1,'venta'),(25,1,44,1,9,0.9,8.1,'venta'),(26,1,45,1,9,0.9,8.1,'venta'),(27,1,46,1,9,0.9,8.1,'venta'),(28,1,47,1,9,0.9,8.1,'venta'),(29,3,48,1,200,40,160,'venta'),(30,1,49,1,9,0.9,8.1,'venta'),(31,1,50,1,9,0.9,8.1,'venta'),(32,1,51,1,9,0.9,8.1,'venta'),(33,1,52,1,9,0.9,8.1,'venta'),(34,1,53,1,9,0.9,8.1,'venta'),(35,1,54,1,9,0.9,8.1,'venta'),(36,3,55,1,200,40,160,'venta'),(37,1,56,1,9,0.9,8.1,'venta'),(38,1,57,1,9,0.9,8.1,'venta'),(39,1,58,1,9,0.9,8.1,'venta'),(40,1,59,1,9,0.9,8.1,'venta'),(41,1,60,1,9,0.9,8.1,'venta'),(42,3,61,1,200,40,160,'venta'),(43,1,62,1,9,0.9,8.1,'venta'),(44,1,63,1,9,0.9,8.1,'venta'),(45,1,64,1,9,0.9,8.1,'venta'),(46,1,65,1,9,0.9,8.1,'venta'),(47,1,66,1,9,0.9,8.1,'venta'),(48,1,67,1,9,0.9,8.1,'venta'),(49,1,68,2,9,1.8,16.2,'venta'),(50,1,69,1,9,0.9,8.1,'venta'),(51,1,70,1,9,0.9,8.1,'venta'),(52,1,71,1,9,0.9,8.1,'venta'),(53,1,72,1,9,0.9,8.1,'venta'),(54,1,73,1,9,0.9,8.1,'venta'),(55,1,74,1,9,0.9,8.1,'venta'),(56,1,75,1,9,0.9,8.1,'venta'),(57,1,76,1,9,0.9,8.1,'venta'),(58,1,77,1,9,0.9,8.1,'venta'),(59,1,78,1,9,0.9,8.1,'venta'),(60,1,79,1,9,0.9,8.1,'venta'),(61,1,80,11,9,9.9,89.1,'venta'),(62,1,81,1,9,0.9,8.1,'venta'),(63,1,82,1,9,0.9,8.1,'venta'),(64,1,83,1,9,0.9,8.1,'venta'),(65,1,84,1,9,0.9,8.1,'venta'),(66,1,85,1,9,0.9,8.1,'venta'),(67,1,86,1,9,0.9,8.1,'venta'),(68,1,87,1,9,0.9,8.1,'venta'),(69,1,88,1,9,0.9,8.1,'venta'),(70,1,89,1,9,0.9,8.1,'venta'),(71,1,90,1,9,0.9,8.1,'venta'),(72,1,91,1,9,0.9,8.1,'venta'),(73,1,92,1,9,0.9,8.1,'venta'),(74,1,93,1,9,0.9,8.1,'venta'),(75,1,94,1,9,0.9,8.1,'venta'),(76,1,95,1,9,0.9,8.1,'venta'),(77,1,96,1,9,0.9,8.1,'venta'),(78,1,97,1,9,0.9,8.1,'venta'),(79,1,98,1,9,0.9,8.1,'venta'),(80,1,99,1,9,0.9,8.1,'venta'),(81,1,100,1,9,0.9,8.1,'venta'),(82,1,101,1,9,0.9,8.1,'venta'),(83,1,102,1,9,0.9,8.1,'venta'),(84,1,103,1,9,0.9,8.1,'venta'),(85,1,104,1,9,0.9,8.1,'venta'),(86,1,105,1,9,0.9,8.1,'venta'),(87,1,106,1,9,0.9,8.1,'venta'),(88,1,107,1,9,0.9,8.1,'venta'),(89,1,108,1,9,0.9,8.1,'venta'),(90,1,109,1,9,0.9,8.1,'venta'),(91,1,110,1,9,0.9,8.1,'venta'),(92,1,111,1,9,0.9,8.1,'venta'),(93,1,112,1,9,0.9,8.1,'venta'),(94,1,113,1,9,0.9,8.1,'venta'),(95,1,114,1,9,0.9,8.1,'venta');

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
  `fecha` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_lote_caja` */

insert  into `ven_lote_caja`(`id`,`id_usuario`,`id_punto`,`estado`,`valorApertura`,`valorCierre`,`valorReal`,`observacion`,`fecha`) values (1,1,1,'Cerrada',25,0,0,'','2011-04-17 00:00:00'),(4,1,4,'Cerrada',0,0,0,'','2011-04-17 00:00:00'),(5,1,4,'Abierta',54,0,0,'','2011-04-18 00:00:00'),(6,0,0,'Abierta',1,447.82,0,'','2011-04-18 00:00:00'),(7,0,0,'Abierta',12,12,0,'','2011-05-01 00:00:00'),(8,0,0,'Abierta',1,1,0,'','2011-05-01 00:00:00'),(9,0,0,'Abierta',0,0,0,'','2011-05-01 00:00:00'),(10,0,0,'Abierta',0,0,0,'','2011-05-01 00:00:00'),(11,0,0,'Abierta',5,25,0,'','2011-05-01 00:00:00'),(12,0,0,'Abierta',5,-1,0,'','2011-05-01 00:00:00'),(13,0,0,'Abierta',1,1,0,'','2011-05-01 00:00:00'),(14,0,0,'Abierta',1,1,0,'','2011-05-01 00:00:00'),(15,0,0,'Abierta',1,1,0,'','2011-05-01 00:00:00'),(16,0,0,'Abierta',0,0,0,'','2011-05-01 00:00:00'),(17,0,0,'Cerrada',0,3,3,'','2011-05-01 00:00:00'),(18,1,1,'Cerrada',1,1,3,'','2011-05-01 00:00:00'),(19,1,1,'Cerrada',0,0,0,'','2011-05-01 00:00:00'),(20,0,0,'Cerrada',1,1,332,'','2011-05-01 00:00:00'),(21,1,1,'Abierta',20,0,0,'','2011-05-15 00:00:00');

/*Table structure for table `ven_lote_caja_detalle` */

DROP TABLE IF EXISTS `ven_lote_caja_detalle`;

CREATE TABLE `ven_lote_caja_detalle` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_lote` bigint(20) unsigned NOT NULL default '0',
  `docid` bigint(20) unsigned NOT NULL default '0',
  `tipo` varchar(45) NOT NULL default '',
  `valor` double NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_cont_lote_caja_detalle_lote` (`id_lote`),
  CONSTRAINT `FK_cont_lote_caja_detalle_lote` FOREIGN KEY (`id_lote`) REFERENCES `ven_lote_caja` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_lote_caja_detalle` */

/*Table structure for table `ven_lote_caja_item` */

DROP TABLE IF EXISTS `ven_lote_caja_item`;

CREATE TABLE `ven_lote_caja_item` (
  `id` bigint(20) NOT NULL auto_increment,
  `tipo` varchar(45) collate utf8_spanish_ci NOT NULL,
  `valor` double NOT NULL,
  `documento` bigint(20) NOT NULL,
  `id_lote` bigint(20) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `ven_lote_caja_item` */

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

insert  into `ven_proforma`(`id`,`id_cliente`,`id_usuario`,`id_local`,`fecha`,`fechaVencimiento`,`nota`,`subtotal`,`iva`,`total`,`estado`) values (1,1,1,1,'2011-05-01 00:00:00','2011-05-01 00:00:00','',34,4.08,38.08,'Registrada'),(2,1,1,1,'2011-05-01 00:00:00','2011-05-01 00:00:00','',0,0,0,'Registrada'),(3,1,1,1,'2011-05-01 00:00:00','2011-05-01 00:00:00','',9,1.08,10.08,'Registrada'),(4,2,1,1,'2011-11-22 00:00:00','2011-11-22 00:00:00','',9,1.08,10.08,'Registrada');

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

insert  into `ven_proforma_detalle`(`id`,`id_proforma`,`id_producto`,`cantidad`,`valorUnitario`,`valorTotal`) values (1,3,1,1,9,9);

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

insert  into `ven_punto_facturacion`(`id`,`id_local`,`codigo`,`nombre`) values (1,2,'001-001','Punto 001'),(3,1,'001-002','Punto 2'),(4,1,'000-000','das');

/*Table structure for table `ven_secuencial` */

DROP TABLE IF EXISTS `ven_secuencial`;

CREATE TABLE `ven_secuencial` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `id_punto` bigint(20) unsigned NOT NULL default '0',
  `id_autorizacion` bigint(20) unsigned NOT NULL default '0',
  `desde` double NOT NULL default '0',
  `hasta` double NOT NULL default '0',
  `secuencial` double NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `FK_ven_secuencial_punto` (`id_punto`),
  KEY `FK_ven_secuencial_autorizacion` (`id_autorizacion`),
  CONSTRAINT `FK_ven_secuencial_autorizacion` FOREIGN KEY (`id_autorizacion`) REFERENCES `ven_autorizacion_sri` (`id`),
  CONSTRAINT `FK_ven_secuencial_punto` FOREIGN KEY (`id_punto`) REFERENCES `ven_punto_facturacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ven_secuencial` */

insert  into `ven_secuencial`(`id`,`id_punto`,`id_autorizacion`,`desde`,`hasta`,`secuencial`) values (1,1,3,1,100,98),(2,3,3,101,200,101),(3,4,3,201,300,201);

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

insert  into `ven_tipo_credito`(`id`,`descripcion`,`tipo`,`numeroCuotas`,`interes`,`mora`) values (1,'Tres menes','MENSUAL',3,5,6),(2,'Cinco quincenas','QUINCENAL',5,3,3),(3,'Diez semanas','SEMANAL',10,6,7),(4,'Un mes diario','DIARIO',30,2,0);

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
  `secuencial` double NOT NULL default '0'
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
  `precioMayorista` double NOT NULL default '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 */;

/*View structure for view vista_menu */

/*!50001 DROP TABLE IF EXISTS `vista_menu` */;
/*!50001 DROP VIEW IF EXISTS `vista_menu` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_menu` AS select `seg_usuario`.`id` AS `ID_USUARIO`,`seg_opcion`.`id` AS `ID_OPCION`,`seg_usuario`.`login` AS `LOGIN`,`seg_opcion`.`codigo` AS `CODIGO`,`seg_opcion`.`padre` AS `PADRE`,`seg_opcion`.`modulo` AS `MODULO`,`seg_opcion`.`etiqueta` AS `ETIQUETA`,`seg_opcion`.`isNuevaVentana` AS `IS_NUEVA_VENTANA` from ((((`seg_opcion` join `seg_usuario`) join `seg_rol`) join `seg_rol_opcion`) join `seg_rol_usuario`) where ((`seg_opcion`.`id` = `seg_rol_opcion`.`id_opcion`) and (`seg_rol_usuario`.`id_rol` = `seg_rol_opcion`.`id_rol`) and (`seg_rol_usuario`.`id_usuario` = `seg_usuario`.`id`)) */;

/*View structure for view vista_secuencial */

/*!50001 DROP TABLE IF EXISTS `vista_secuencial` */;
/*!50001 DROP VIEW IF EXISTS `vista_secuencial` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_secuencial` AS select sql_no_cache `s`.`id` AS `id`,`s`.`id_punto` AS `id_punto`,`s`.`id_autorizacion` AS `id_autorizacion`,`us`.`id` AS `id_usuario`,`s`.`desde` AS `desde`,`s`.`hasta` AS `hasta`,`s`.`secuencial` AS `secuencial` from (((`ven_secuencial` `s` join `ven_autorizacion_sri` `a`) join `ven_punto_facturacion` `p`) join `seg_usuario` `us`) where ((`s`.`id_punto` = `p`.`id`) and (`s`.`id_autorizacion` = `a`.`id`) and (`us`.`id_punto` = `p`.`id`) and (`s`.`desde` <= `s`.`hasta`) and (`a`.`estado` = _latin1'Activo') and (curdate() >= `a`.`fechaInicio`) and (curdate() <= `a`.`fechaFin`)) */;

/*View structure for view vista_stock_producto */

/*!50001 DROP TABLE IF EXISTS `vista_stock_producto` */;
/*!50001 DROP VIEW IF EXISTS `vista_stock_producto` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_stock_producto` AS (select `s`.`id_local` AS `id_local`,`s`.`id_producto` AS `id_producto`,`s`.`existencia` AS `existencia`,`s`.`minimo` AS `minimo`,`s`.`maximo` AS `maximo`,`p`.`codigo` AS `codigo`,`p`.`nombre` AS `nombre`,`p`.`precioCompra` AS `precioCompra`,`p`.`precioVenta` AS `precioVenta`,`p`.`precioPromocion` AS `precioPromocion`,`p`.`precioMayorista` AS `precioMayorista` from (`inv_producto` `p` join `inv_stock_producto` `s`) where (`p`.`id` = `s`.`id_producto`)) */;

/* Procedure structure for procedure `sp_factura` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_factura` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_factura`()
BEGIN
 END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
