package org.ms.factureservice.web;
import feign.Body;
import org.ms.factureservice.Dto.FactureDto;
import org.ms.factureservice.Dto.FactureLigneDTO;
import org.ms.factureservice.entities.Facture;
import org.ms.factureservice.entities.FactureLigne;
import org.ms.factureservice.feign.ClientServiceClient;
import org.ms.factureservice.feign.ProduitServiceClient;
import org.ms.factureservice.model.Client;
import org.ms.factureservice.model.Produit;
import org.ms.factureservice.repository.FactureLigneRepository;
import org.ms.factureservice.repository.FactureRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/factures")
public class FactureRestController {
    private FactureRepository factureRepository;
    private FactureLigneRepository factureLigneRepository;
    private ClientServiceClient clientServiceClient;
    private ProduitServiceClient produitServiceClient;
    public FactureRestController(FactureRepository factureRepository,
                                 FactureLigneRepository factureLigneRepository,
                                 ClientServiceClient clientServiceClient,
                                 ProduitServiceClient produitServiceClient) {

        this.factureRepository = factureRepository;
        this.factureLigneRepository = factureLigneRepository;
        this.clientServiceClient = clientServiceClient;
        this.produitServiceClient = produitServiceClient;
    }

    @GetMapping(value = "/")
    public List<Facture> getAllFactures() {
        List<Facture> factures = factureRepository.findAll();
        factures.forEach(facture -> {
            Client client = clientServiceClient.findClientById(facture.getClientID());
            facture.setClient(client);

            facture.getFacturelignes().forEach(fl -> {
                Produit product = produitServiceClient.findById(fl.getProduitID());
                fl.setProduit(product);
            });
        });
        return factures;
    }
    @GetMapping (value="/{id}")
    public Facture getFacture(@PathVariable(name = "id") Long id)
    {
        Facture facture= factureRepository.findById(id).get();
        Client client = clientServiceClient.findClientById(facture.getClientID());

        facture.setClient(client);
        facture.getFacturelignes().forEach(fl-> {
            System.out.println("Processing FactureLigne: " + fl);
            if (fl != null) {
                Produit product = produitServiceClient.findById(fl.getProduitID());
                fl.setProduit(product);
            }
        });
        return facture;
    }
    @PostMapping(value = "/")
    public Facture newFacture(@RequestBody FactureDto factureDetails) {
        System.out.println(factureDetails);
        Facture facture = new Facture();
        facture.setDateFacture(factureDetails.getDateFacture());
        facture.setPrice(factureDetails.getPrice());
        facture.setClientID(factureDetails.getClientID());
        Client client = clientServiceClient.findClientById(factureDetails.getClientID());
        facture.setClient(client);
        List<FactureLigne> factureLignes = factureDetails.getFacturelignes().stream().map(this::convertToFactureLigne).collect(Collectors.toList());
        facture.setFacturelignes(factureLignes);
        return facture;

    }
    @PutMapping(path = "/{Id}")
    public Facture updateFacture(@PathVariable Long Id, @RequestBody Facture factureDetails) {
        Optional<Facture> existingFactureOptional = factureRepository.findById(Id);
        if (existingFactureOptional.isPresent()) {
            Facture existingFacture = existingFactureOptional.get();
            existingFacture.setDateFacture(new Date());
            existingFacture.setClient(clientServiceClient.findClientById(factureDetails.getClientID()));
            existingFacture.setClientID(factureDetails.getClientID());
            existingFacture.setPrice(factureDetails.getPrice());
            Facture updatedFacture = factureRepository.save(existingFacture);
            factureDetails.getFacturelignes().forEach(p -> {
                if (p.getId() != null) {
                    factureLigneRepository.deleteById(p.getId());
                }

                Produit product = produitServiceClient.findById(p.getProduitID());
                FactureLigne factureLigne = new FactureLigne(
                        null,
                        p.getProduitID(),
                        p.getQuantity(),
                        p.getPrice(),
                        product,
                        updatedFacture);

                factureLigneRepository.save(factureLigne);
            });

            return updatedFacture;
        } else {
            // Facture with the given ID not found
            throw new ResourceNotFoundException("Facture not found with id: " + Id);
        }
    }
    @DeleteMapping (path = "/{Id}")
    public Facture deleteFacture(@PathVariable Long Id) {
        Optional<Facture> existingFactureOptional =  factureRepository.findById(Id);

        if (existingFactureOptional.isPresent()) {
            Facture facture = existingFactureOptional.get();
            Collection<FactureLigne> facturesLignes =  facture.getFacturelignes();
            facturesLignes.forEach(p -> {
                factureLigneRepository.deleteById(p.getId());
            });
            factureRepository.deleteById(Id);
            return facture;

        }else {
            throw new ResourceNotFoundException("Facture not found with id: " + Id);
        }

    }
    private FactureLigne convertToFactureLigne(FactureLigneDTO factureLigneDTO){
        FactureLigne factureLigne = new FactureLigne();
        factureLigne.setProduitID(factureLigneDTO.getProduitID());
        factureLigne.setProduit(produitServiceClient.findById(factureLigne.getProduitID()));
        factureLigne.setQuantity(factureLigneDTO.getQuantity());
        factureLigne.setPrice(factureLigneDTO.getPrice());
        return factureLigne;
    }
}
