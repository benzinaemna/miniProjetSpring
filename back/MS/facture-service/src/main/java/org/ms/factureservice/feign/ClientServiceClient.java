package org.ms.factureservice.feign;
import org.ms.factureservice.model.Client;
import org.ms.factureservice.model.Produit;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

@FeignClient(name="CLIENT-SERVICE")
public interface ClientServiceClient {
    @GetMapping(path="/clients/{id}")
    Client findClientById(@PathVariable(name="id") Long id);
    @GetMapping(path="/clients")
    PagedModel<Client> getAllClients();
}