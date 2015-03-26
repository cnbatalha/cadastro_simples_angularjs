/*
 * Script de versoes para Catequese-OnLine
 * 
 */

ALTER TABLE `catequese`.`catequizando` 
ADD COLUMN `situacao_deletado` VARCHAR(1) NULL DEFAULT 'N' AFTER `tel_celular`;


ALTER TABLE `catequese`.`catequista` 
ADD COLUMN `situacao_deletado` VARCHAR(1) NULL DEFAULT 'N' ;
