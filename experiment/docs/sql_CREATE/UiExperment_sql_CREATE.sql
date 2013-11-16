SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `uiExperiment` ;
CREATE SCHEMA IF NOT EXISTS `uiExperiment` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
SHOW WARNINGS;
USE `uiExperiment` ;

-- -----------------------------------------------------
-- Table `uiExperiment`.`experiment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `uiExperiment`.`experiment` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `uiExperiment`.`experiment` (
  `idexperiment` INT AUTO_INCREMENT ,
  `time_spent` VARCHAR(45) NOT NULL ,
  `page_clicks` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`idexperiment`) )
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `idexperiment_UNIQUE` ON `uiExperiment`.`experiment` (`idexperiment` ASC) ;

SHOW WARNINGS;
USE `uiExperiment` ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;