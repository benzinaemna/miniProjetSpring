package org.ms.factureservice.feign;
import org.ms.factureservice.model.Produit;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(name = "PRODUIT-SERVICE", configuration = ProduitServiceClientConfig.class)
public interface ProduitServiceClient {
    @GetMapping(path="/produits")
    PagedModel<Produit> getAllProduits();
    @GetMapping(path="/produits/{id}")
    Produit findById(@PathVariable(name="id") Long id);
}