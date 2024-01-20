package org.ms.clientservice.repository;

import org.ms.clientservice.entities.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur , Long> {
}
