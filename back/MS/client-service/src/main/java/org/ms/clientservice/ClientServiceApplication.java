package org.ms.clientservice;

import org.ms.clientservice.entities.Client;
import org.ms.clientservice.entities.Fournisseur;
import org.ms.clientservice.repository.ClientRepository;
import org.ms.clientservice.repository.FournisseurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class ClientServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClientServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner start(ClientRepository clientRepository, FournisseurRepository fournisseurRepository,
	RepositoryRestConfiguration repositoryRestConfiguration)
	{
		repositoryRestConfiguration.exposeIdsFor(Client.class);
		repositoryRestConfiguration.exposeIdsFor(Fournisseur.class);
		return args ->
		{
//Insérer trois clients de test dans la BD
			clientRepository.save(new Client(null,"Ali","ben zina", "25756063", "11086196","ali.ms@gmail.com", "route tunis ",""));
			fournisseurRepository.save(new Fournisseur(null,"Mariem","ben zina", "25756063", "11086196","ali.ms@gmail.com", "route tunis ",""));
			clientRepository.save(new Client(null,"Mohamed","ben zina", "25756063", "11086196","ali.ms@gmail.com", "route tunis ",""));
			clientRepository.save(new Client(null,"Ali","ben zina", "25756063", "11086196","ali.ms@gmail.com", "route tunis ",""));
			clientRepository.save(new Client(null,"Mohamed","ben zina", "25756063", "11086196","ali.ms@gmail.com", "route tunis ",""));
			clientRepository.save(new Client(null,"Mohamed","ben zina", "25756063", "11086196","ali.ms@gmail.com", "route tunis ",""));
			clientRepository.save(new Client(null,"Mohamed","ben zina", "25756063", "11086196","ali.ms@gmail.com", "route tunis ",""));
			clientRepository.save(new Client(null,"Mohamed","ben zina", "25756063", "11086196","ali.ms@gmail.com", "route tunis ",""));
			clientRepository.save(new Client(null,"Mohamed","ben zina", "25756063", "11086196","ali.ms@gmail.com", "route tunis ",""));
//Afficher les clients existants dans la BD
			for (Client client : clientRepository.findAll())
			{
				System.out.println(client.toString());
			}
		};
	}
}
