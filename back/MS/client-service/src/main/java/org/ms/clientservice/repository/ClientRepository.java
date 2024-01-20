package org.ms.clientservice.repository;

import org.ms.clientservice.entities.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@RepositoryRestController
public interface ClientRepository extends JpaRepository<Client , Long> {
    @RestResource(path="/byName")
    Page<Client> findByfirstNameContains(@Param("mc") String name , Pageable pageable);
}
