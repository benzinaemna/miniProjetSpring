package org.ms.produitservice;

import org.ms.produitservice.entities.Categorie;
import org.ms.produitservice.entities.Produit;
import org.ms.produitservice.repository.CategorieRepository;
import org.ms.produitservice.repository.ProduitRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class ProduitServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProduitServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner start(ProduitRepository produitRepository,
							RepositoryRestConfiguration repositoryRestConfiguration,
							CategorieRepository categorieRepository) {
		repositoryRestConfiguration.exposeIdsFor(Produit.class);
		repositoryRestConfiguration.exposeIdsFor(Categorie.class);
		return args -> {
			Categorie categorie = new Categorie(null, "cat1", "categoerie1");
			Categorie categorie1 = new Categorie(null, "cat2", "categoerie2");
			Categorie categorie2 = new Categorie(null, "cat3", "categoerie3");
			Categorie categorie3 = new Categorie(null, "cat4", "categoerie4");
			Categorie categorie4 = new Categorie(null, "cat5", "categoerie5");
			categorieRepository.save(categorie);
			categorieRepository.save(categorie1);
			categorieRepository.save(categorie2);
			categorieRepository.save(categorie3);
			categorieRepository.save(categorie4);
			produitRepository.save(new Produit(null, "prod222", "produit1", 100, 500, categorie));
			produitRepository.save(new Produit(null, "prod", "produit2", 100, 5550, categorie2));

			for(Categorie p : categorieRepository.findAll()) {
				System.out.println(p);
			}
		};
	}
}