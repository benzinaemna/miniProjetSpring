package org.ms.clientservice.entities;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@ToString
@DiscriminatorValue("Fournisseur")
public class Fournisseur extends Tier{
    public Fournisseur() {
    }

    public Fournisseur(Long id, String firstName, String lastName, String email, String numTel, String adresse, String Mf, String Cin) {
        super(id, firstName, lastName, email, numTel, adresse, Mf, Cin);
    }
}
