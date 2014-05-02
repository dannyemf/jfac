DELIMITER $$

USE `xulfac`$$

DROP VIEW IF EXISTS `vista_relacion`$$

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `xulfac`.`vista_relacion` AS (

SELECT b.table_name, b.column_name, b.constraint_name, b.referenced_table_name, b.referenced_column_name
FROM information_schema.table_constraints a JOIN information_schema.key_column_usage b
ON a.table_schema = b.table_schema AND a.constraint_name = b.constraint_name
WHERE a.constraint_schema = 'xulfac' AND a.table_schema=DATABASE() AND a.constraint_type='FOREIGN KEY'
ORDER BY b.table_name, b.constraint_name

)$$

DELIMITER ;