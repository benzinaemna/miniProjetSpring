package org.ms.factureservice;
import org.ms.factureservice.entities.Facture;
import org.ms.factureservice.entities.FactureLigne;
import org.ms.factureservice.feign.ClientServiceClient;
import org.ms.factureservice.feign.ProduitServiceClient;
import org.ms.factureservice.model.Client;
import org.ms.factureservice.model.Produit;
import org.ms.factureservice.repository.FactureLigneRepository;
import org.ms.factureservice.repository.FactureRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.PagedModel;

import java.util.*;

@SpringBootApplication
@EnableFeignClients
public class FactureServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(FactureServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner start(FactureRepository factureRepository,
							FactureLigneRepository factureLigneRepository,
							ClientServiceClient clientServiceClient,
							ProduitServiceClient produitServiceClient)

	{
		return args -> {
			Client listClients = clientServiceClient.findClientById(1L);

			Facture facture= factureRepository.save( new Facture(null,new Date(),null, listClients, listClients.getId() ,200));
			PagedModel<Produit> listeProduits = produitServiceClient.getAllProduits();
			listeProduits.forEach(p->
			{
				FactureLigne factureLigne =new FactureLigne();
				factureLigne.setProduitID(p.getId());
				factureLigne.setPrice(p.getPrixVente());
				factureLigne.setQuantity(1+new Random().nextInt(100));
				factureLigne.getProduit(p);
				factureLigne.setFacture(facture);
				factureLigneRepository.save(factureLigne);
			});
			Facture facture1 = factureRepository.findById(1L).get();
			System.out.println(facture1.toString());
			//facture1.getFacturelignes().forEach(p ->{
			//	System.out.println(p.getProduitID());
			//});

		};
	}
}