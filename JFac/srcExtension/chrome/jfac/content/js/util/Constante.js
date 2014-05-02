function Constante(){};
Constante.prototype = new Object();

Constante.TIPO_DOC_FACTURA = 1;
Constante.TIPO_DOC_NOT_VEN = 2;
Constante.TIPO_DOC_LIQ_COM = 3;
Constante.TIPO_DOC_NOT_CRE = 4;
Constante.TIPO_DOC_NOT_DEB = 5;
Constante.TIPO_DOC_GUI_REM = 6;
Constante.TIPO_DOC_COM_RET = 7;
Constante.TIPO_DOC_ENT_ESP = 8;

/**
 * Obtiene el nombre del tipo de docuemnto a partir de su codigo 1,2,3,4,5,6,7
 * @param {Number} tipoDoc
 * @return {String}
 */
Constante.getNombreDocumento = function(tipoDocumento){
	switch (tipoDocumento) {
		case this.TIPO_DOC_FACTURA: return 'Factura';
		case this.TIPO_DOC_NOT_VEN: return 'Nota de venta';
		case this.TIPO_DOC_LIQ_COM: return 'Liquidación de compra de bienes o prestación';
		case this.TIPO_DOC_NOT_CRE: return 'Nota de crédito';
		case this.TIPO_DOC_NOT_DEB: return 'Nota de débito';
		case this.TIPO_DOC_GUI_REM: return 'Guía de remisión';
		case this.TIPO_DOC_COM_RET: return 'Comprobante de retención';		
		case this.TIPO_DOC_ENT_ESP: return 'Entradas a espectáculos públicos';
		default: return 'Tipo-No-Soportado';
	}
};