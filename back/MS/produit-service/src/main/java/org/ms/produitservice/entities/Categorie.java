package org.ms.produitservice.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;

@Entity
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String designation;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "categorie")
    private Collection<Produit> produits = new ArrayList<Produit>();
    public Categorie() {
    }
    public Categorie(Long id, String code, String designation) {
        this.id = id;
        this.code = code;
        this.designation = designation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Collection<Produit> getProduits() {
        return produits;
    }

    public void setProduits(Collection<Produit> produits) {
        this.produits = produits;
    }

    public void addProduits(Produit produits) {
        this.produits.add(produits);
    }
}
