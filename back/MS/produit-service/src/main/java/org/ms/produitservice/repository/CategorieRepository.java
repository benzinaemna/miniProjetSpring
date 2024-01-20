package org.ms.produitservice.repository;

import org.ms.produitservice.entities.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@RepositoryRestController
public interface CategorieRepository extends JpaRepository<Categorie , Long> {
}
