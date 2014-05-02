/**
 * =====vista_ventas=====
 */
DROP VIEW IF EXISTS `vista_ventas`;
CREATE VIEW `vista_ventas` AS
    (select 
        `f`.`id` AS `id`,
        `f`.`id_local` AS `id_local`,
        `f`.`id_cliente` AS `id_cliente`,
        `f`.`id_retencion` AS `id_retencion`,
        `f`.`id_usuario` AS `id_usuario`,
        `f`.`id_periodo` AS `id_periodo`,
        `f`.`numeroFactura` AS `numeroFactura`,
        `f`.`fechaEmision` AS `fechaEmision`,
        `f`.`fechaInicio` AS `fechaInicio`,
        `f`.`fechaCaducidad` AS `fechaCaducidad`,
        `f`.`estado` AS `estado`,
        `f`.`iva` AS `iva`,
        `f`.`descuento` AS `descuento`,
        `f`.`sobrecargo` AS `sobrecargo`,
        `f`.`subtotal` AS `subtotal`,
        `f`.`total` AS `total`,
        concat(`c`.`nombres`,
                _latin1' ',
                `c`.`apellidos`) AS `cliente`,
        concat(`l`.`codigo`, _latin1' - ', `l`.`nombre`) AS `local`,
        `u`.`login` AS `usuario`
    from
        (((`ven_fac_venta` `f`
        join `ven_cliente` `c`)
        join `seg_local` `l`)
        join `seg_usuario` `u`)
    where
        ((`f`.`id_cliente` = `c`.`id`)
            and (`f`.`id_local` = `l`.`id`)
            and (`f`.`id_usuario` = `u`.`id`))
    order by `f`.`fechaEmision`);

 /**
 * =====vista_cierres_caja=====
 */
DROP VIEW IF EXISTS `vista_cierres_caja`;  
CREATE VIEW `vista_cierres_caja` AS
    (select 
        `f`.`id` AS `id`,
        `f`.`id_punto` AS `id_punto`,
        `f`.`id_usuario` AS `id_usuario`,
        `f`.`fechaApertura` AS `fechaApertura`,
        `f`.`fechaCierre` AS `fechaCierre`,
        `f`.`estado` AS `estado`,
        `f`.`valorApertura` AS `valorApertura`,
        `f`.`valorCierre` AS `valorCierre`,
        `f`.`valorReal` AS `valorReal`,
        `f`.`observacion` AS `observacion`,
        concat(`l`.`codigo`, _latin1' - ', `l`.`nombre`) AS `punto`,
        `u`.`login` AS `usuario`
    from
        ((`ven_lote_caja` `f`
        join `ven_punto_facturacion` `l`)
        join `seg_usuario` `u`)
    where
        ((`f`.`id_punto` = `l`.`id`)
            and (`f`.`id_usuario` = `u`.`id`)));

/**
 * =====vista_compras=====
 */            
DROP VIEW IF EXISTS `vista_compras`;            
CREATE VIEW `vista_compras` AS
    (select 
        `f`.`id` AS `id`,
        `f`.`id_retencion` AS `id_retencion`,
        `f`.`id_local` AS `id_local`,
        `f`.`id_proveedor` AS `id_proveedor`,
        `f`.`id_usuario` AS `id_usuario`,
        `f`.`numeroFactura` AS `numeroFactura`,
        `f`.`numeroAutorizacion` AS `numeroAutorizacion`,
        `f`.`fechaEmision` AS `fechaEmision`,
        `f`.`fechaRegistro` AS `fechaRegistro`,
        `f`.`fechaCaducidad` AS `fechaCaducidad`,
        `f`.`estado` AS `estado`,
        `f`.`subtotal` AS `subtotal`,
        `f`.`total` AS `total`,
        `p`.`razonSocial` AS `proveedor`,
        `l`.`nombre` AS `local`,
        `u`.`login` AS `usuario`
    from
        (((`com_fac_compra` `f`
        join `com_proveedor` `p`)
        join `seg_local` `l`)
        join `seg_usuario` `u`)
    where
        ((`f`.`id_proveedor` = `p`.`id`)
            and (`f`.`id_local` = `l`.`id`)
            and (`f`.`id_usuario` = `u`.`id`)));

/**
 * =====vista_kardex=====
 */
DROP VIEW IF EXISTS `vista_kardex`;            
CREATE VIEW `vista_kardex` AS
    (select 
        `k`.`id` AS `id`,
        `k`.`id_local` AS `id_local`,
        `k`.`id_producto` AS `id_producto`,
        `k`.`fecha` AS `fecha`,
        `k`.`descripcion` AS `descripcion`,
        concat(`p`.`codigo`, _latin1' - ', `p`.`nombre`) AS `producto`,
        `p`.`codigo` AS `codigoProducto`,
        `p`.`nombre` AS `nombreProducto`,
        concat(`l`.`codigo`, _latin1' - ', `l`.`nombre`) AS `local`,
        `k`.`cantidadActual` AS `cantidadActual`,
        `k`.`cantidadEntra` AS `cantidadEntra`,
        `k`.`cantidadSale` AS `cantidadSale`,
        if((`k`.`cantidadSale` = 0),
            (`k`.`cantidadActual` + `k`.`cantidadEntra`),
            (`k`.`cantidadActual` - `k`.`cantidadSale`)) AS `nuevaCantidad`
    from
        ((`inv_kardex` `k`
        join `inv_producto` `p`)
        join `seg_local` `l`)
    where
        ((`k`.`id_producto` = `p`.`id`)
            and (`k`.`id_local` = `l`.`id`)));

/**
 * =====vista_levantamientos=====
 */            
DROP VIEW IF EXISTS `vista_levantamientos`;            
CREATE VIEW `vista_levantamientos` AS
    (select 
        `i`.`id` AS `id`,
        `i`.`id_local` AS `id_local`,
        `i`.`id_usuario` AS `id_usuario`,
        `i`.`observacion` AS `observacion`,
        `i`.`fecha` AS `fecha`,
        `u`.`login` AS `usuario`,
        concat(`l`.`codigo`, _latin1' - ', `l`.`nombre`) AS `local`
    from
        ((`inv_levantamiento` `i`
        join `seg_local` `l`)
        join `seg_usuario` `u`)
    where
        ((`i`.`id_local` = `l`.`id`)
            and (`i`.`id_usuario` = `u`.`id`)));
            
/**
 * =====vista_menu=====
 */
DROP VIEW IF EXISTS `vista_menu`;            
CREATE VIEW `vista_menu` AS
    select 
        `xulfac`.`seg_usuario`.`id` AS `ID_USUARIO`,
        `xulfac`.`seg_opcion`.`id` AS `ID_OPCION`,
        `xulfac`.`seg_usuario`.`login` AS `LOGIN`,
        `xulfac`.`seg_opcion`.`codigo` AS `CODIGO`,
        `xulfac`.`seg_opcion`.`padre` AS `PADRE`,
        `xulfac`.`seg_opcion`.`modulo` AS `MODULO`,
        `xulfac`.`seg_opcion`.`etiqueta` AS `ETIQUETA`,
        `xulfac`.`seg_opcion`.`isNuevaVentana` AS `IS_NUEVA_VENTANA`,
        `xulfac`.`seg_opcion`.`codigoVentana` AS `CODIGO_VENTANA`,
        `xulfac`.`seg_opcion`.`isLateralControl` AS `IS_LATERAL_CONTROL`,
        `xulfac`.`seg_opcion`.`iconoLateralControl` AS `ICONO_LATERAL_CONTROL`
    from
        ((((`seg_opcion`
        join `seg_usuario`)
        join `seg_rol`)
        join `seg_rol_opcion`)
        join `seg_rol_usuario`)
    where
        ((`xulfac`.`seg_opcion`.`id` = `xulfac`.`seg_rol_opcion`.`id_opcion`)
            and (`xulfac`.`seg_rol_usuario`.`id_rol` = `xulfac`.`seg_rol_opcion`.`id_rol`)
            and (`xulfac`.`seg_rol_usuario`.`id_usuario` = `xulfac`.`seg_usuario`.`id`));

/**
 * =====vista_proformas=====
 */            
DROP VIEW IF EXISTS `vista_proformas`;
CREATE VIEW `vista_proformas` AS
    (select 
        `f`.`id` AS `id`,
        `f`.`id_local` AS `id_local`,
        `f`.`id_cliente` AS `id_cliente`,
        `f`.`id_usuario` AS `id_usuario`,
        `f`.`fecha` AS `fecha`,
        `f`.`fechaVencimiento` AS `fechaVencimiento`,
        `f`.`estado` AS `estado`,
        `f`.`iva` AS `iva`,
        `f`.`subtotal` AS `subtotal`,
        `f`.`total` AS `total`,
        concat(`c`.`nombres`,
                _latin1' ',
                `c`.`apellidos`) AS `cliente`,
        concat(`l`.`codigo`, _latin1' - ', `l`.`nombre`) AS `local`,
        `u`.`login` AS `usuario`
    from
        (((`ven_proforma` `f`
        join `ven_cliente` `c`)
        join `seg_local` `l`)
        join `seg_usuario` `u`)
    where
        ((`f`.`id_cliente` = `c`.`id`)
            and (`f`.`id_local` = `l`.`id`)
            and (`f`.`id_usuario` = `u`.`id`)));

/**
 * =====vista_secuencial=====
 */            
DROP VIEW IF EXISTS `vista_secuencial`;
CREATE VIEW `vista_secuencial` AS
    select sql_no_cache
        `s`.`id` AS `id`,
        `s`.`id_punto` AS `id_punto`,
        `s`.`id_autorizacion` AS `id_autorizacion`,
        `us`.`id` AS `id_usuario`,
        `s`.`desde` AS `desde`,
        `s`.`hasta` AS `hasta`,
        `s`.`secuencial` AS `secuencial`,
        `s`.`tipoDocumento` AS `tipoDocumento`
    from
        (((`ven_secuencial` `s`
        join `ven_autorizacion_sri` `a`)
        join `ven_punto_facturacion` `p`)
        join `seg_usuario` `us`)
    where
        ((`s`.`id_punto` = `p`.`id`)
            and (`s`.`id_autorizacion` = `a`.`id`)
            and (`us`.`id_punto` = `p`.`id`)
            and (`s`.`desde` <= `s`.`hasta`)
            and (`s`.`secuencial` < `s`.`hasta`)
            and (`a`.`estado` = _latin1'Activo')
            and (curdate() >= `a`.`fechaInicio`)
            and (curdate() <= `a`.`fechaFin`));

/**
 * =====vista_stock_producto=====
 */            
DROP VIEW IF EXISTS `vista_stock_producto`;            
CREATE VIEW `vista_stock_producto` AS
    (select 
        `s`.`id_local` AS `id_local`,
        `s`.`id_producto` AS `id_producto`,
        `s`.`existencia` AS `existencia`,
        `s`.`minimo` AS `minimo`,
        `s`.`maximo` AS `maximo`,
        `p`.`codigo` AS `codigo`,
        `p`.`nombre` AS `nombre`,
        `p`.`precioCompra` AS `precioCompra`,
        `p`.`precioVenta` AS `precioVenta`,
        `p`.`precioPromocion` AS `precioPromocion`,
        `p`.`precioMayorista` AS `precioMayorista`,
        if((`p`.`isCobraIva` = 1),
            _utf8'SI',
            _utf8'NO') AS `isCobraIva`
    from
        (`inv_producto` `p`
        join `inv_stock_producto` `s`)
    where
        (`p`.`id` = `s`.`id_producto`));            