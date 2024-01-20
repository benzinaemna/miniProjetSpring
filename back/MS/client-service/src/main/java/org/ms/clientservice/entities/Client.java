package org.ms.clientservice.entities;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.UUID;


@Entity
@Data
@ToString
@DiscriminatorValue("Client")
public class Client extends Tier{
   // @OneToMany(mappedBy = "client")
   // private Collection<Facture> Documents;


    public Client() {
    }

    public Client(Long id, String firstName, String lastName, String email, String numTel, String adresse, String Mf, String Cin) {
        super(id, firstName, lastName, email, numTel, adresse, Mf, Cin);
    }
}
