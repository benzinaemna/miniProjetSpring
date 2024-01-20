package org.ms.clientservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

import static jakarta.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Inheritance(strategy=SINGLE_TABLE)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING,
        name = "Tier_Type")
public class Tier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String numTel;

    private String adresse;

    private String Mf;

    private String Cin;

}
